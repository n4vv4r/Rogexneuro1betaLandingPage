# Rogex PRISMA 3

**Subject-normalized EEG decoding software for research.**

Rogex PRISMA 3 is an experimental EEG research framework by **Roger Navarro / Rogex Laboratories**. It is designed to study how EEG signals can be interpreted relative to each subject's own baseline instead of relying only on universal thresholds.

PRISMA 3 is **not a medical device**, does **not** provide diagnosis, and does **not** make clinical claims.

---

## What PRISMA 3 does

PRISMA 3 provides a research pipeline for:

- EEG simulation with controlled user variability
- Real EEG ingestion through CSV, MNE-compatible files and dataset adapters
- Signal preprocessing and windowing
- Spectral feature extraction
- Personal baseline modelling
- Subject-normalized interpretation
- Uncertainty and signal-quality reporting
- Machine-learning evaluation with LOSO and personalized regimes
- Exportable reports and figures

Core idea:

> Model the person before interpreting the state.

---

## Real EEG validation appendix

A first real EEG validation was run on **OpenNeuro DS007358**, using a resting-state **eyes closed vs eyes open** task.

| Configuration | Accuracy | F1 | Notes |
|---|---:|---:|---|
| Global raw features (LOSO) | 71.5% | 68.4 | Cross-subject baseline |
| Global subject-normalized (LOSO) | 84.2% | 84.1 | Subject normalization improves generalization |
| Personalized per-user model (intra-CV) | 91.4% | - | Easier within-subject regime |

Validation details:

- Dataset: OpenNeuro DS007358
- Task: ec vs eo
- Subjects used: 28
- Windows: 3304
- Chance level: 50%
- Evaluation: Leave-One-Subject-Out between subjects
- Measured gain from subject normalization: **+12.7 percentage points** vs raw features

Physiological check:

- Occipital relative alpha: `ec=0.338` vs `eo=0.083`
- This matches the expected increase of alpha power during eyes-closed resting state.

Important: ec/eo is a robust EEG contrast. These results validate the **method and pipeline**, not a clinical diagnostic capability.

---

## Synthetic demonstration benchmark

The package also includes a synthetic supervised benchmark over five state labels. These numbers validate the simulator and method mechanics; they are not clinical EEG accuracy.

| Configuration | Accuracy | Notes |
|---|---:|---|
| Global raw features (LOSO) | 76.7% | Between-subject synthetic baseline |
| Global normalized by user (LOSO) | 94.4% | Normalization benefit in synthetic demo |
| Personalized intra-user CV | 96.1% | Personalized model priority |

---

## Architecture

```text
EEG input
  -> preprocessing/import adapter
  -> sliding windows
  -> feature extraction
  -> personal baseline
  -> individual translator
  -> uncertainty/confidence
  -> ML evaluation
  -> explainable report
```

Main modules:

| Module | Purpose |
|---|---|
| `src/core/eeg_simulator.py` | Synthetic EEG generator with controlled variability |
| `src/core/feature_extraction.py` | Bandpower, ratios, entropy, Hjorth, RMS, artifact and SQI features |
| `src/core/baseline_engine.py` | Personal baseline and within-subject deviation |
| `src/core/individual_translator.py` | Subject-relative interpretation and confidence logic |
| `src/ml/` | Dataset building, training, LOSO evaluation and personalization |
| `src/utils/io.py` | Real EEG ingestion via MNE-compatible data |
| `analyze_eegdash.py` | EEGDash/OpenNeuro-style dataset analysis |
| `analyze_bids.py` | Local BIDS dataset analysis |
| `analyze_eo_ec.py` | Real ec/eo validation workflow |
| `run_app.py` | Streamlit user interface |

---

## Installation

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run the application:

```bash
streamlit run run_app.py
```

Run the synthetic demo:

```bash
python demo_prisma3.py
```

Train and evaluate demo models:

```bash
python train_model.py
python evaluate_model.py
```

Analyze EEGDash/OpenNeuro-style data:

```bash
python analyze_eegdash.py --dataset NM000147 --cache ./data --n 3
```

Analyze local BIDS data:

```bash
python analyze_bids.py --path ./data/dataset --n 3
```

---

## Scientific limits

PRISMA 3:

- is not a medical device
- does not diagnose disease
- does not provide clinical decisions
- does not directly measure neurotransmitters or receptors
- does not claim treatment, cure or health prediction
- must be interpreted with signal quality, uncertainty and artifact limits

The real ec/eo validation is an initial method validation on a robust EEG contrast. Stronger claims require larger cohorts, confidence intervals, per-subject metrics, test-retest evaluation, artifact rejection/ICA and independent review.

---

## Repository hygiene before public release

Recommended `.gitignore` exclusions:

```gitignore
__pycache__/
*.pyc
.venv/
.env
.DS_Store
__MACOSX/
data/cache/
data/private/
ds*/.git/
outputs/models/*.pkl
```

Do not publish private EEG recordings, subject-identifying metadata, local caches, credentials, API tokens or large dataset mirrors unless their licenses and privacy status are explicitly verified.

---

## License

Copyright © 2026 **Roger Navarro / Rogex Laboratories**.

This project is released under the **Rogex PRISMA Research Source License v1.0**.

Summary:

- Free for personal, academic and non-commercial research use.
- Modification is allowed for research and internal non-commercial study.
- Attribution and preservation of notices are required.
- Commercial resale, commercial embedding, paid SaaS use, or selling products that include PRISMA require explicit written permission.
- No trademark rights are granted.
- No warranty is provided.

See [`LICENSE`](./LICENSE) for the full terms.

---

## Citation / attribution

If you use PRISMA 3 in research, please cite:

```text
Roger Navarro / Rogex Laboratories. Rogex PRISMA 3: Subject-normalized EEG decoding software for research. 2026.
```

---

## Contact

Rogex Laboratories

Website: https://www.rogexlaboratories.com
