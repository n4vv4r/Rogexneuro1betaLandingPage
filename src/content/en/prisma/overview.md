# PRISMA

**EEG analysis software. Research use — not a medical device.**

---

## In one sentence

PRISMA opens an EEG recording, cleans it, analyses it and tells you whether what
you found **survives serious scrutiny**.

---

## Who it is for

- People recording EEG who do not want to write code just to inspect it
- People already using MNE-Python or EEGLAB who want a reproducible workflow on top
- People teaching electrophysiology who need students to see the signal, not a script
- People building BCI or neurofeedback who need real-time processing

---

## What it does

**Opens almost anything.** BrainVision, EDF/EDF+, BioSemi BDF, GDF, Neuroscan
CNT, EEGLAB and FIF. Drag in a file and see what is inside: channels, sampling
rate, markers, and the decisions the reader had to make on its own.

**Cleans the signal and explains itself.** Filters, re-referencing and bad-channel
detection **across the whole session** — including *why* each channel was marked.
ICA removes blinks and muscle activity, with labels and warnings: muscle
components are marked but not removed unless you ask.

**Analyses.** ERP, power spectrum, time-frequency, functional connectivity and
source localisation with a 3D brain view.

**Repeats the work for you.** Write the steps once in a file and apply them in
the same way to one subject or 73. Every run records which version of which
program did what, with which parameters: a year later, you can reconstruct
exactly how you went from A to B.

**And something almost nobody does: it tells you when you have NOTHING.**

---

## What genuinely makes it different

Any program can calculate a p-value. PRISMA answers the difficult question:
**would this survive review?**

When you request several comparisons, PRISMA corrects them **as one family** —
not one by one. Add another exploratory metric and the threshold rises, as it
should. It also flags separately:

- Whether the result depends on **a few extreme points**
- Whether it **disappears** after controlling an obvious confounder
- Whether the sample **never had enough power** to detect it, and how many
  subjects would be needed

It ends with a clear sentence and a verdict: **defensible, yes or no**.

**Why this exists.** The main hypothesis behind this project — that calibrating
the threshold per subject predicted behaviour — was tested against two
independent public datasets and **did not replicate**. Instead of hiding that,
the discipline required to discover it became part of the product.

`defensible: no` is the **normal** result of honest exploration. It is not a
program error.

---

## How we know it works

With real public data, not prepared demos.

On **ds006018** (Flanker task, 73 subjects), all 73 were processed without a
single failure. PRISMA recovered **two effects already established in the
literature**: the conflict ERP response and midfrontal theta. It correctly
discarded 30 of 32 candidate clusters. In the third analysis, connectivity, it
said clearly: **there is nothing here**.

Not finding an effect in all three analyses is precisely what makes it credible.

---

## The two halves

**PRISMA** — the desktop application and analysis layer. Six panels: Session,
Signal, Preprocessing, Analysis, Group and Limitations. Light and dark themes.

**PRISMA ENGINE** — a real-time engine written in Rust, with **1.8 microseconds**
mean latency and zero memory allocations on the critical path. Instead of
analysing fixed windows, it converts the signal into impulses and processes it
event by event. It is a single binary with nothing to install.

They can be used together or separately.

---

## What it does NOT do

This is written into the application itself, in a panel called **Limitations**,
because a tool that lists only its virtues is not honest:

- **It is not a medical device.** It neither diagnoses nor predicts anything.
- **Source localisation uses a template head**, not the subject's MRI: expect
  1–2 cm of error.
- **Connectivity between electrodes is contaminated** by volume conduction.
  Use the included robust measures before claiming interaction.
- **A significant cluster does not localise precisely.** Its edges are not the
  boundaries of the effect.
- **Automatic ICA labelling is a suggestion**, not a verdict.
- **You still cannot plug in a headset and watch it live** without a bridge
  script. That was the original objective and is not yet built.

---

## Requirements

64-bit Linux (practically any distribution since 2020). The engine requires no
installation. The analysis layer requires Python 3.10 or newer.

Built on MNE-Python, the standard library in the electrophysiology community.

---

## Status

**Not yet for sale.** The software works and is tested; what remains is the
paperwork — licence, payment method and support contact — plus the function that
was the original goal: connecting a headset and seeing it analysed live.
