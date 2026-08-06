# PRISMA 3 Public Usage Guide

**PRISMA 3 Research Core** is experimental EEG research software by **Rogex Laboratories**.  
This guide shows the basic public workflow for launching the Streamlit interface, opening the tutorial, importing EEG data, running real EEG analysis, and reviewing dataset compatibility.

> **Scientific boundary:** PRISMA 3 is not a medical device. It does not diagnose, treat, cure or predict disease. Results are dataset-dependent and must be interpreted as research outputs, not clinical conclusions.

---

## 1. Start PRISMA 3

Open a terminal inside the PRISMA 3 folder and run:

```bash
streamlit run run_app.py
```

This starts the local Streamlit web interface. Streamlit will print a local URL, usually similar to:

```text
http://localhost:8501
```

Open that URL in your browser.

![Terminal running Streamlit](../public/tutorial/prisma3/00_terminal_streamlit_run.png)

---

## 2. Open the PRISMA 3 dashboard

After launching Streamlit, the PRISMA 3 interface opens in the browser.

From here, the user can access the main research workflows:

- tutorial / guided usage
- CSV EEG import
- real EEG analysis
- dataset compatibility notes
- reports and figures

![PRISMA 3 Home Dashboard](../public/tutorial/prisma3/01_home.png)

---

## 3. Follow the built-in tutorial

The tutorial section explains the intended PRISMA workflow before running analysis on your own data.

Recommended order:

1. Read the scientific limits.
2. Check the available input modes.
3. Start with demo or reference data.
4. Only then import your own EEG files.
5. Treat every output as experimental.

![PRISMA 3 Tutorial](../public/tutorial/prisma3/02_tutorial.png)

---

## 4. Import CSV EEG data

PRISMA 3 can be used experimentally with CSV EEG-like data.

Typical CSV workflow:

1. Prepare the CSV file.
2. Make sure channels and timestamps are consistent.
3. Import the file in the CSV section.
4. Review signal quality.
5. Generate features and plots.
6. Export the report.

This mode is useful for early testing, demos and custom research data, but CSV compatibility depends on how the file is structured.

![Import CSV EEG](../public/tutorial/prisma3/03_import_csv.png)

---

## 5. Run real EEG analysis

The real EEG workflow is intended for structured EEG datasets and reproducible experiments.

The current reference validation is based on **OpenNeuro ds007358**, using an eyes-closed vs eyes-open resting-state EEG contrast.

Current reference result:

```text
Dataset: ds007358
Contrast: eyes closed vs eyes open
Evaluation: leave-one-subject-out
GLOBAL raw LOSO: 73.3%
GLOBAL subject-normalized LOSO: 87.7%
PERSONALIZED intra-subject CV: 91.0%
Alpha blocking: EC > EO confirmed
```

Correct wording:

> PRISMA 3 demonstrates an initial real-world cross-subject EEG validation on ds007358 EC/EO, reaching 73.3% raw LOSO accuracy and 87.7% subject-normalized LOSO accuracy, with expected alpha-blocking confirmed.

Avoid saying:

> PRISMA solves all EEG variability.

![Real EEG Analysis](../public/tutorial/prisma3/04_eeg_real.png)

---

## 6. Review dataset compatibility

Not every EEG dataset is immediately compatible.

Some datasets may fail because of:

- missing signal files
- DataLad / git-annex placeholders
- unsupported EEG file formats
- metadata-only downloads
- non-standard channel names
- missing `channels.tsv`
- missing `events.tsv`
- too few subjects
- only one class available after filtering
- task labels that do not match the selected contrast
- audio or behaviour files being present alongside EEG

PRISMA 3 is being expanded toward broader **BIDS / OpenNeuro** compatibility, but the current public validation should be understood as an early research result, not universal EEG decoding.

![Dataset Compatibility](../public/tutorial/prisma3/05_datasets.png)

---

## Recommended first commands

### Run the Streamlit interface

```bash
streamlit run run_app.py
```

### Run the reference ds007358 validation

```bash
.venv/bin/python3 analyze_dataset.py \
  --path ds007358 \
  --dataset ds007358 \
  --min-channels 12 \
  --n-subjects 20 \
  --report
```

### Discover a new BIDS dataset

```bash
.venv/bin/python3 analyze_dataset.py \
  --path DATASET_FOLDER \
  --dataset DATASET_ID \
  --discover
```

### Try a file-level task contrast

```bash
.venv/bin/python3 analyze_dataset.py \
  --path DATASET_FOLDER \
  --dataset DATASET_ID \
  --mode file \
  --tasks taskA,taskB \
  --min-channels 1 \
  --window 1.0 \
  --overlap 0.5 \
  --report
```

---

## Early Access Research License

PRISMA 3 Early Access is intended for researchers, independent technical users and qualified experimental users who understand the limits of early research software.

The Early Access Research License may include:

- PRISMA 3 codebase
- Streamlit interface
- analysis scripts
- reference validation workflow
- dataset discovery tools
- editable research code
- documentation
- controlled delivery package

It does **not** include:

- clinical approval
- diagnostic use
- guaranteed accuracy on external datasets
- guaranteed compatibility with every EEG dataset
- public redistribution rights
- automatic public download

---

## Responsible use

PRISMA 3 should be used as a research tool for experimentation, reproducibility, signal exploration and early EEG modelling.

It should not be used for:

- medical decisions
- diagnosis
- treatment planning
- mental health prediction
- claims of consciousness detection
- claims of universal brain decoding

The correct current claim is:

> PRISMA 3 has an initial validated EEG research pipeline on ds007358 EC/EO and is under active development toward broader dataset compatibility.

---

## Public image paths

When deployed through Vite / Vercel, the tutorial images should also be available directly at:

```text
/tutorial/prisma3/00_terminal_streamlit_run.png
/tutorial/prisma3/01_home.png
/tutorial/prisma3/02_tutorial.png
/tutorial/prisma3/03_import_csv.png
/tutorial/prisma3/04_eeg_real.png
/tutorial/prisma3/05_datasets.png
```

If this Markdown file is stored inside `docs/`, the relative GitHub image paths are:

```text
../public/tutorial/prisma3/00_terminal_streamlit_run.png
../public/tutorial/prisma3/01_home.png
../public/tutorial/prisma3/02_tutorial.png
../public/tutorial/prisma3/03_import_csv.png
../public/tutorial/prisma3/04_eeg_real.png
../public/tutorial/prisma3/05_datasets.png
```
