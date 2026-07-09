# PRISMA 3 Validation Notes

PRISMA 3 is experimental EEG research software. It is not a medical device and it is not diagnostic software.

## Current reference validation

The current reference validation is based on OpenNeuro `ds007358`, a resting-state EEG dataset using an eyes-closed vs eyes-open contrast.

Reference command:

```bash
.venv/bin/python3 analyze_dataset.py --path ds007358 --min-channels 12 --n-subjects 20 --dataset ds007358
```

Current observed result:

```text
Dataset: ds007358
Contrast: ec vs eo
Valid subjects after filtering: 18
Windows: 2124
Chance level: 50%
GLOBAL raw LOSO: 73.3% accuracy, F1 69.7
GLOBAL subject-normalized LOSO: 87.7% accuracy, F1 87.6
PERSONALIZED intra-CV: 91.0%
Alpha blocking sanity check: rel_alpha ec=0.271 vs eo=0.093 -> OK
```

## Correct scientific wording

Recommended wording:

> PRISMA 3 demonstrates an initial real-world cross-subject EEG validation on ds007358 EC/EO, reaching 73.3% raw LOSO accuracy and 87.7% subject-normalized LOSO accuracy, with the expected alpha-blocking pattern confirmed.

Avoid wording such as:

> PRISMA solves EEG variability universally.

The stronger result, 87.7%, should be described as **subject-normalized LOSO** or **calibrated LOSO**, not as universal zero-calibration generalization.

## Required next validation controls

Before claiming broad scientific robustness, the pipeline should add:

- `--shuffle-labels`: labels should fall close to chance.
- `--permutation-test N`: empirical p-value for the observed accuracy.
- `--debug-folds`: print train/test subject split and window counts per fold.
- `--subject-report`: per-held-out-subject accuracy/F1.
- Train-fold-only normalization: fit preprocessing statistics only on training subjects inside each LOSO fold.
- Rejection reports for failed datasets.

## Limits

PRISMA 3 currently demonstrates a real result on one compatible EEG paradigm. It does not yet prove universal EEG decoding or universal dataset compatibility.
