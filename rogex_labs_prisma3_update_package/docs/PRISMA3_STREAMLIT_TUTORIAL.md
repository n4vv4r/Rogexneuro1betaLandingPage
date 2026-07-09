# PRISMA 3 Streamlit Tutorial

Start the interface from the PRISMA 3 root directory:

```bash
cd rogex_prisma_3
.venv/bin/python3 -m streamlit run run_app.py
```

or:

```bash
streamlit run run_app.py
```

Expected terminal output:

```text
You can now view your Streamlit app in your browser.
Local URL: http://localhost:8501
Network URL: http://<your-ip>:8501
```

## Tutorial screenshots

Suggested screenshot assets:

```text
public/tutorial/prisma3/00_terminal_streamlit_run.png
public/tutorial/prisma3/01_home.png
public/tutorial/prisma3/02_tutorial.png
public/tutorial/prisma3/03_import_csv.png
public/tutorial/prisma3/04_eeg_real.png
public/tutorial/prisma3/05_datasets.png
```

## Basic user flow

1. Open the local URL shown by Streamlit.
2. Start at **Home** to understand the boundaries and scientific limits.
3. Open **Tutorial** for the guided workflow.
4. Use **Importar CSV** for demo CSV or local EEG CSV.
5. Use **EEG real** for MNE-supported files (`.edf`, `.bdf`, `.set`, `.vhdr`, `.fif`).
6. Use CLI scripts for OpenNeuro/BIDS datasets.
7. Read the output carefully: PRISMA is experimental and dataset-dependent.

## Important scientific boundary

PRISMA 3 is not a medical tool. It does not diagnose, treat, cure, predict disease or read thoughts. It is a research pipeline for EEG feature extraction, baseline modeling and experimental classification.
