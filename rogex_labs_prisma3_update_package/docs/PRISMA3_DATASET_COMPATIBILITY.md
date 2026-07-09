# PRISMA 3 Dataset Compatibility

PRISMA 3 should be treated as a developing research pipeline, not as a universal EEG reader yet.

## Current state

| Dataset | Status | Notes |
|---|---:|---|
| ds007358 | Reference validation | EC/EO resting EEG, alpha blocking sanity check confirmed. |
| ds007808 | Adapter needed | Speech/language EEG. Not EC/EO. Needs BIDS/DataLad diagnostics. |
| Generic BIDS EEG | Experimental | Needs robust discovery and rejection reports. |

## Why datasets fail

Many EEG datasets are not directly comparable. Common failure reasons:

- DataLad/git-annex metadata exists but signal files are not downloaded.
- Signal files are huge and not safe to download automatically.
- Files are audio/behaviour (`.wav`) instead of EEG.
- EEG channels use non-standard names like `EEG001`, `E1`, `Ch1`.
- `channels.tsv` is required to identify EEG channels.
- MNE can read the file but channel types are missing.
- Only one class remains after filtering.
- Windows cannot be built because files are too short or event labels do not match.

## Required diagnostic output

When samples cannot be built, PRISMA should print:

```text
selected mode / contrast
candidate tasks/events
signal candidates found
files downloaded vs placeholders
files per class before filtering
files per class after filtering
windows per class
subjects per class
rejection reasons and counts
next datalad get candidates
```

It should never only print:

```text
No se construyeron muestras.
```

## ds007808 notes

Useful contrasts:

```bash
--mode file --tasks speechopen,listeningcovert
--mode file --tasks speechopen,listening
--mode file --tasks listening,listeningcovert
```

Do not apply alpha-blocking checks to ds007808. It is a speech/language EEG dataset, not resting EC/EO.

## Engineering roadmap

Recommended modules:

```text
core/bids_discovery.py
core/raw_loader.py
core/diagnostics.py
core/features.py
core/evaluation.py
adapters/ds007358.py
adapters/ds007808.py
adapters/generic_bids.py
```

Recommended CLI additions:

```text
--debug
--dry-run
--debug-folds
--subject-report
--shuffle-labels
--permutation-test N
--normalization {none,train-fold,subject-transductive,subject-calibration}
```
