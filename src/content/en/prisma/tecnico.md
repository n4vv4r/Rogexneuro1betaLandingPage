# PRISMA — technical documentation

**Version 0.1.0 · Linux x86_64 · research software, not a medical device.**

This document describes what the program does, how it does it and where it
should not be trusted. Every figure was measured on this machine or on public
data; nothing is estimated or projected. When a feature is thin, or a claim was
tested and failed, it is stated here.

---

## 1. What it is

Two layers that ship together and can be used separately.

**PRISMA ENGINE** — event-oriented real-time EEG core, written in Rust (~8,100
lines). Instead of applying FFT to fixed windows, it encodes the signal into
impulses and processes it event by event.

**PRISMA 5 SNN** — classic analysis and desktop-interface layer, written in
Python (~5,500 lines) on top of MNE-Python. An offline EEG suite: cleaning, ERP,
spectrum, connectivity, source localisation, reproducible pipelines and group
statistics.

They are deliberately separate. The engine does not depend on Python and runs
on its own; the analysis layer runs without the engine. The bridge is one
function that sends the cleaned signal to the engine.

---

## 2. How the engine works

```
signal → delta modulation → LIF (SIMD) → STDP → prediction → telemetry
```

**Delta modulation.** An impulse is emitted only when the signal moves beyond
an adaptive threshold θ_adp. A silent channel produces no events: work is
proportional to how much the signal changes, not to the sampling rate.

**LIF layer.** Leaky integrate-and-fire neurons integrate the impulse stream,
vectorised with AVX2, and fall back to scalar code if the CPU lacks it.

**STDP.** Spike-timing-dependent plasticity adjusts synaptic weights from
pre/post order.

**Predictive coding.** The observed rate is compared with an expected rate; a
large mismatch raises SPEI and marks a *possible artefact* (blink, muscle, a
cable). It is not a clinical event detector.

### Measured performance

On this machine (`--headless --bench-samples 200000`), 32 channels:

| | |
|---|---|
| Mean hot-path latency | **1.81 µs** |
| Worst observed latency | 43.9 µs (over 200,000 samples) |
| Throughput | ~183,000 samples/s, one core |
| Hot-path memory allocations | **zero**, by construction — fixed buffers only |
| Binary size | 9.0 MB, with no runtime to install |

In a real-time system the worst figure matters, so it is published alongside
the mean rather than replaced by it.

### Signal conditioning

Off by default. Silently altering the signal would also alter every metric
relative to a previous run.

- Notch (50/60 Hz), high-pass, low-pass — RBJ biquads, f64 state
- Re-referencing: common average (excluding bad channels) or named channels
- Bad-channel detection across the **whole session**, not a preview window

These filters are **one-pass causal IIR**: their phase shift depends on
frequency. Do not compare ERP latencies measured through them against
zero-phase tools.

### Live input

The engine listens on a simple TCP socket: one JSON header line followed by
channel-interleaved `float32` samples. Anything that can open a socket can feed
it. A bridge script forwards any LSL stream and can generate a synthetic signal
to test the live path without hardware.

**Why there is no native LSL, honestly:** `lsl-core` (pure Rust) is GPL-3.0,
incompatible with a closed binary; official bindings need a `liblsl` whose
embedded source no longer builds against modern glibc. The generic socket keeps
the binary dependency-free and accepts more producers.

---

## 3. How the analysis layer works

All numerical methods come from MNE-Python, SciPy or mne-connectivity.
**Nothing numerical is reimplemented.** ICA and source localisation in
particular are research numerical methods with decades of validation; rewriting
them would add risk without removing anything. PRISMA adds the workflow,
declarative pipeline, group stage, integrity layer and a documented limitation
beside each method.

### Import

| Format | Reader | Verified with |
|---|---|---|
| BrainVision `.vhdr` | MNE | ds006018, ds007655 (real) |
| EDF / EDF+ | MNE | round trip + real |
| BDF (BioSemi) | MNE | written with pyedflib |
| GDF | MNE | BCI Competition IV 2a (real) |
| Neuroscan CNT | MNE | MNE test recordings |
| EEGLAB `.set`, FIF | MNE | round trip |

**A real failure uncovered here:** sometimes the Neuroscan header omits sample
width. Reading 16 bits as 32 (or vice versa) does not raise an error: it silently
decodes a differently shaped signal and reads the event table at the wrong
offset. PRISMA tries both widths, keeps the one yielding physiologically
plausible amplitudes, and records the decision. If both look plausible, it
refuses and asks rather than guessing.

### Cleaning

- **Filters**: zero-phase (forward and backward) by default offline; a causal
  mode reproduces what the live engine does.
- **Bad channels**: full-session sweep using PREP criteria (flatness, robust
  deviation, high-frequency noise, windowed correlation with neighbours),
  reporting *why* each was marked. Robust statistics throughout, so one
  saturated channel cannot hide another.
- **Interpolation**: spherical splines (Perrin et al., 1989).
- **ICA**: extended Infomax / FastICA / Picard, with automatic labelling. Blinks
  use an EOG channel or frontal proxy. **Cardiac components are not attempted
  without a real ECG channel** — EEG alone offers no reliable detector, so one
  is not invented. Muscle components are labelled but not removed unless
  requested: on real data the detector marked 11 of 20.

### Analysis

Epoching with readable event names, baseline correction, ERP average and peak
measurement; PSD (Welch/multitaper), band power, individual alpha frequency;
time-frequency (Morlet, multitaper, Stockwell, STFT) and ERD/ERS; connectivity
(coh, imcoh, plv, ciplv, ppc, pli, wpli); source localisation (sLORETA, dSPM,
eLORETA, MNE, LCMV beamformer).

### Reproducible pipelines

A YAML file lists the steps; they run over one file, a glob or an entire BIDS
dataset. Fifteen step types: `montage, filter, bad_channels, interpolate,
reference, ica, epochs, baseline, erp, psd, tfr, connectivity, sources, engine,
save_raw`.

Every run writes `pipeline_summary.json` containing the specification, every
package version, and per-subject parameters, times and outcome for each step.
A failed subject is recorded and the batch continues.

### Group stage

The per-subject pipeline writes to disk; the group stage reads it and **never
recomputes a subject**. Rerunning statistics with different parameters takes
seconds, not another pass through the data.

- **ERP**: spatiotemporal cluster permutation over channels × time
- **Time-frequency**: clusters over frequency × time × channels *together*, so
  an effect extending into neighbouring bands is one finding, not several
- **Connectivity**: paired tests per edge with FDR (upper triangle only —
  counting a symmetric matrix twice would dilute the correction), plus the
  Network-Based Statistic (Zalesky et al., 2010) for connected subnetworks

---

## 4. The integrity layer

This part does not exist in other EEG suites, and the reason is not flattering:
the main claim of this project — that calibrating the threshold per subject
predicts behaviour — was tested against two independent public datasets and
**did not replicate**. The discipline needed to discover that is now code.

`integrity_report` takes a *family* of tests and, in one pass:

1. **Corrects across the complete family**, not per test. Adding another
   exploratory metric raises the threshold, as it should.
2. **Flags results that depend on extremes** — a large Pearson/Spearman gap
   means the linear result relies on a few points.
3. **Flags results that disappear under a confounder** (partial correlation).
4. **Flags underpowered tests**, and reports how many subjects would be needed.
5. **Removes non-computable tests (NaN) from the family** rather than letting
   them corrupt the remaining corrected p-values — a real failure encountered
   here, now a guarantee.
6. Ends with `defensible: true/false` and a plain sentence.

`defensible: false` is the normal result of honest exploration, not an error.

---

## 5. What it has been tested against

**135 automated tests.** The synthetic recording used by most of them contains
planted ground truth — occipital alpha, blinks, mains hum, a dead channel, a
saturated channel, N1/P3 responses — and tests verify that each stage *recovers
what was planted*, not merely that it runs.

Statistical methods are tested **in both directions**: they must find a planted
effect in the exact location **and find nothing in paired noise**. A statistical
module validated only on positive cases is worthless.

### On real public data

**ds006018** (Flanker task, 73 subjects, actiCHamp, 500 Hz), all 73 processed
without a single failure. Three group tests from the same run:

| Test | Result |
|---|---|
| ERP (channels × time) | 2 of 18 significant clusters, p = 0.0005, 0.18–0.80 s, 22 centroparietal channels |
| Time-frequency | 2 of 32 significant: midfrontal theta 4–18 Hz (p = 0.0010) and alpha/beta desynchronisation (p = 0.043) |
| Connectivity (theta wPLI) | **Nothing.** No edge survives FDR over 325 tests; NBS finds 3 candidate components, none significant |

Two established Flanker effects recovered, 30 of 32 candidate clusters
rejected, and a clear negative result in the third analysis. A suite that found
an effect in all three would not be credible.

**BCI Competition IV 2a** (GDF, Graz, motor imagery) — complete pipeline, 288
epochs, 72 per class, without errors.

---

## 6. Limitations

**Not a medical device.** Research software. It does not diagnose, treat or
predict any condition and is not validated for clinical use.

**Source localisation uses a template head.** fsaverage, not the subject's MRI,
with template co-registration. Localisation error is on the order of 1–2 cm.
Maps are reported as template-based.

**Sensor-space connectivity is contaminated by volume conduction.** Two nearby
electrodes see the same source and will show high coherence or PLV without an
interaction between them. Use wPLI or imaginary coherence before claiming
interaction.

**Cluster permutation localises poorly.** A significant cluster means that the
conditions differ *somewhere* inside the window. Its edges are not the effect's
boundaries, and a strong effect spreads into neighbouring channels by design.

**The Network-Based Statistic depends on its threshold.** Fix it before looking
and report the value used.

**Automatic ICA labelling is a suggestion**, not a verdict.

**The engine's per-subject calibration is not validated.** It adapts the encoder
to the signal in front of it. Whether that improves a downstream outcome was
tested against two independent public datasets with different paradigms and did
not replicate. No stronger claim is made.

**The Akida (neuromorphic) backend is a simulation sketch.** There is no physical
board and no measured energy figures.

**There are no native headset drivers.** Live input uses the generic TCP
protocol or LSL bridge script. Plugging in a headset and seeing it analysed live
— the original goal — is not built.

**True 3D rendering needs a GPU/OpenGL context.** There is no software fallback.

**The interface has no undo.** Preprocessing edits an in-memory copy; reload the
recording to start over.

---

## 7. Requirements

**Engine**: Linux x86_64, glibc 2.30 or newer (2019 — covering Ubuntu 20.04+,
Debian 11+, RHEL/Rocky 9+, Fedora 31+, Arch and Mint 20+). Its only dynamic
dependencies are system libraries; OpenGL loads on demand, so it also runs on a
headless server.

**Analysis layer**: Python 3.10+. Optional extras add the desktop interface
(PySide6) and true 3D rendering (PyVista/VTK).

Built on MNE-Python (BSD-3-Clause), NumPy, SciPy, scikit-learn, matplotlib and
mne-connectivity.

---

## 8. Status

The engine, analysis layer, statistics and interface work and have been tested.
What remains is the paperwork — a real licence, payment route and support
contact — and the function that was the point of the exercise: plugging in a
headset and seeing it analysed live, without a bridge script in the middle.
