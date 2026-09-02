# PRISMA — technical documentation

**Version 0.1.0 · Linux x86_64 · research software, not a medical device.**

This document describes what the software does, how it does it, and where it
should not be trusted. Every number in it was measured on this machine or on
public data; nothing is estimated or projected. Where a feature is thin, or a
claim was tested and failed, that is stated here rather than left for the user
to discover.

---

## 1. What it is

Two layers that ship together and can be used apart.

**PRISMA ENGINE** — a real-time, event-driven EEG core written in Rust
(~8,100 lines). Instead of running FFTs over fixed windows, it encodes the
signal into spikes and processes it per event.

**PRISMA 5 SNN** — the classical analysis layer and desktop interface, written
in Python (~5,500 lines) on top of MNE-Python. This is a conventional
offline EEG suite: cleaning, ERP, spectral, connectivity, source estimation,
reproducible pipelines and group statistics.

They are deliberately separate. The engine has no Python dependency and runs
on its own; the analysis layer runs without the engine. The bridge between
them is one function that hands the cleaned signal to the engine.

---

## 2. How the engine works

```
signal → delta modulation → LIF (SIMD) → STDP → predictive coding → telemetry
```

**Delta modulation.** A spike is emitted only when the signal moves more than
an adaptive threshold θ_adp. A quiet channel produces no events at all: the
work is proportional to how much the signal changes, not to the sampling rate.

**LIF layer.** Leaky integrate-and-fire neurons integrate the spike stream,
AVX2-vectorised, falling back to scalar code when the CPU lacks it.

**STDP.** Spike-timing-dependent plasticity adjusts synaptic weights from the
relative timing of pre- and post-synaptic spikes.

**Predictive coding.** Observed spike rate is compared against an expected
rate; a large mismatch raises SPEI, which flags a *likely artefact* — a blink,
muscle, a cable moving. It is not a clinical event detector.

### Measured performance

Run on this machine (`--headless --bench-samples 200000`), 32 channels:

| | |
|---|---|
| Mean hot-path latency | **1.81 µs** |
| Worst observed latency | 43.9 µs (over 200,000 samples) |
| Throughput | ~183,000 samples/s, single core |
| Heap allocation on the hot path | **zero**, by construction — fixed buffers only |
| Binary size | 9.0 MB, no runtime to install |

The worst-case figure is the one that matters for a real-time system, and it
is reported alongside the mean rather than instead of it.

### Signal conditioning

Off by default. Silently altering a signal would also silently change every
metric compared against a previous run.

- Notch (50/60 Hz), high-pass, low-pass — RBJ biquads, f64 state
- Re-referencing: common average (bad channels excluded), or named channels
- Bad-channel detection over the **whole session**, not a preview window

Filters here are **causal, single-pass IIR**: they shift phase with frequency.
Do not compare ERP latencies measured through them against zero-phase tools.

### Live input

The engine listens on a plain TCP socket: one JSON header line, then raw
`float32` samples, channel-interleaved. Anything that can open a socket can
feed it. A bridge script forwards any LSL stream in, and can generate a
synthetic signal so the live path can be tested with no hardware.

**Why not native LSL, honestly:** `lsl-core` (pure Rust) is GPL-3.0, which is
incompatible with distributing a closed binary; the official bindings need a
`liblsl` whose vendored copy no longer compiles against modern glibc. The
generic socket keeps the binary dependency-free and accepts more producers.

---

## 3. How the analysis layer works

Every numerical method is MNE-Python's, scipy's, or mne-connectivity's.
**Nothing numerical is reimplemented.** ICA and source localisation in
particular are research-grade numerical work with decades of validation behind
them; rewriting them would add risk and subtract nothing. What PRISMA adds is
the workflow, the declarative pipeline, the group stage, the integrity layer,
and a documented limitation next to each method.

### Import

| Format | Reader | Verified on |
|---|---|---|
| BrainVision `.vhdr` | MNE | ds006018, ds007655 (real) |
| EDF / EDF+ | MNE | round-trip + real |
| BDF (BioSemi) | MNE | written with pyedflib |
| GDF | MNE | BCI Competition IV 2a (real) |
| Neuroscan CNT | MNE | MNE's own real test recordings |
| EEGLAB `.set`, FIF | MNE | round-trip |

**A real quirk this surfaced:** Neuroscan's header sometimes does not state
the sample byte width, and reading 16-bit data as 32-bit (or vice versa) does
not raise — it silently decodes a differently-shaped signal and reads the
event table at the wrong offset. PRISMA tries both widths, keeps whichever
gives physiologically plausible amplitudes, and records the decision in the
session notes. When both look plausible it refuses and asks, rather than
guessing.

### Cleaning

- **Filters**: zero-phase (forward-backward) by default for offline work;
  a causal mode exists to reproduce what the engine does live.
- **Bad channels**: whole-session scan on PREP criteria (flat, robust
  deviation, high-frequency noise, windowed correlation with neighbours),
  reporting *why* each channel was flagged. Robust statistics throughout, so
  one railed channel cannot hide another.
- **Interpolation**: spherical splines (Perrin et al., 1989).
- **ICA**: extended Infomax / FastICA / Picard, with automatic labelling.
  Blinks use an EOG channel or a frontal proxy. **Cardiac components are not
  attempted at all without a real ECG channel** — there is no reliable
  EEG-only detector, so nothing is invented. Muscle components are labelled
  but never removed unless asked: on real data the detector flagged 11 of 20.

### Analysis

Epoching with friendly event names, baseline correction, ERP averaging and
peak measurement; PSD (Welch/multitaper), band power, individual alpha
frequency; time-frequency (Morlet, multitaper, Stockwell, STFT) and ERD/ERS;
connectivity (coh, imcoh, plv, ciplv, ppc, pli, wpli); source estimation
(sLORETA, dSPM, eLORETA, MNE, LCMV beamformer).

### Reproducible pipelines

A YAML file lists the steps; they run over one file, a glob, or a whole BIDS
dataset. Fifteen step types: `montage, filter, bad_channels, interpolate,
reference, ica, epochs, baseline, erp, psd, tfr, connectivity, sources,
engine, save_raw`.

Each run writes `pipeline_summary.json` with the spec, every package version,
and per subject each step's parameters, timing and result. A subject that
fails is recorded and the batch continues.

### Group stage

The per-subject pipeline writes to disk; the group stage reads it back and
**never recomputes a subject**. Re-running statistics with different
parameters costs seconds, not another pass over the data.

- **ERP**: spatio-temporal cluster permutation over channels × time
- **Time-frequency**: clusters over frequency × time × channels *at once*, so
  an effect spreading into neighbouring bands is one finding, not several
- **Connectivity**: per-edge paired tests with FDR (upper triangle only —
  counting a symmetric matrix twice would dilute the correction), plus the
  Network-Based Statistic (Zalesky et al., 2010) for connected subnetworks

---

## 4. The integrity layer

This is the part that does not exist in other EEG suites, and the reason it
exists is not flattering: this project's own headline claim — that per-subject
threshold calibration predicts behaviour — was tested against two independent
public datasets and **did not replicate**. The discipline required to find
that out is now code.

`integrity_report` takes a *family* of tests and, in one pass:

1. **Corrects across the whole family**, not per test. Adding one more
   exploratory metric raises the bar, as it should.
2. **Flags outlier-dependent results** — a large Pearson/Spearman gap means
   the linear result leans on a few points.
3. **Flags results that vanish under a confound** (partial correlation).
4. **Flags underpowered tests**, and says how many subjects would be needed.
5. **Excludes non-computable (NaN) tests from the family** instead of letting
   them corrupt every other corrected p-value — a bug that really happened
   here, now a guarantee.
6. Ends with `defensible: true/false` and a plain sentence.

`defensible: false` is the normal outcome of honest exploration, not an error.

---

## 5. What it has been tested against

**135 automated tests.** The synthetic recording used by most of them has
known ground truth planted in it — occipital alpha, blinks, mains hum, a dead
channel, a railed channel, N1/P3 responses — and the tests check that each
stage *recovers what was planted*, not merely that it runs.

Statistical methods are tested in **both directions**: they must find a
planted effect at the exact place it was planted, **and find nothing at all in
matched noise**. A statistics module validated only on positive cases is
worthless.

### On real public data

**ds006018** (Flanker task, 73 subjects, actiCHamp, 500 Hz), all 73 processed
without a single failure. Three group tests on the same run:

| Test | Result |
|---|---|
| ERP (channels × time) | 2 of 18 clusters significant, p = 0.0005, 0.18–0.80 s, 22 centro-parietal channels |
| Time-frequency | 2 of 32 significant: midfrontal theta 4–18 Hz (p = 0.0010) and alpha/beta desynchronisation (p = 0.043) |
| Connectivity (wPLI theta) | **Nothing.** No edge survives FDR across 325 tested; the NBS finds 3 candidate components, none significant |

Two well-established Flanker effects recovered, 30 of 32 candidate clusters
correctly rejected, and a clear negative on the third test. A suite that found
an effect in all three would not be credible.

**BCI Competition IV 2a** (GDF, Graz, motor imagery) — full pipeline, 288
epochs, 72 per class, no errors.

---

## 6. Limitations

**Not a medical device.** Research software. It does not diagnose, treat or
predict any condition, and has not been validated for any clinical use.

**Source localisation is on a template head.** fsaverage, not the subject's
MRI, with a template co-registration. Localisation error is on the order of
1–2 cm. Report source maps as template-based.

**Sensor-space connectivity is contaminated by volume conduction.** Two nearby
electrodes see the same source and will show high coherence or PLV with no
interaction between them. For an interaction claim use wPLI or imaginary
coherency.

**Cluster permutation localises weakly.** A significant cluster means the
conditions differ *somewhere* in the tested window. Its edges are not the
effect's boundaries, and a strong effect spreads into neighbouring channels by
design.

**The Network-Based Statistic depends on its threshold.** Fix it before
looking, and state the value used.

**Automatic ICA labelling is a suggestion**, not a verdict.

**The engine's per-subject calibration is not validated.** It adapts the
encoder to the signal in front of it. That this improves any downstream result
was tested against two independent public datasets with different paradigms
and did not replicate. Nothing more is claimed.

**The Akida (neuromorphic) backend is a simulation stub.** No physical chip,
no measured energy figures.

**No native device drivers.** Live input goes through the generic TCP protocol
or the LSL bridge script. Plugging a headset in directly and watching it
analysed live — the original goal — is not built yet.

**Real 3D rendering needs a GPU/OpenGL context.** There is no software
fallback.

**No undo in the interface.** Preprocessing edits an in-memory working copy;
reload the recording to start over.

---

## 7. Requirements

**Engine**: Linux x86_64, glibc 2.30 or newer (2019 — covers Ubuntu 20.04+,
Debian 11+, RHEL/Rocky 9+, Fedora 31+, Arch, Mint 20+). Its only dynamic
dependencies are core system libraries; OpenGL is loaded on demand, so it also
runs on a headless server.

**Analysis layer**: Python 3.10+. Optional extras add the desktop interface
(PySide6) and real 3D rendering (PyVista/VTK).

Built on MNE-Python (BSD-3-Clause), NumPy, SciPy, scikit-learn, matplotlib and
mne-connectivity.

---

## 8. Status

Not for sale. The engine, the analysis layer, the statistics and the interface
work and are tested. What is missing is the paperwork — a real licence, a
payment route, a support contact — and the one feature that was the point of
the exercise: plugging a headset in and watching it analysed live, with no
bridge script in between.
