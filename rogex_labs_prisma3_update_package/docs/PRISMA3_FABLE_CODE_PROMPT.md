# Fable 5 / Claude Code Prompt for PRISMA 3

Use this prompt inside the PRISMA 3 repository.

```text
You are Fable 5 running inside my PRISMA 3 repository.

Goal:
Turn PRISMA 3 from a dataset-specific prototype into a robust, honest, multi-dataset EEG research pipeline.

Critical requirements:
1. Do not break ds007358.
2. Audit whether 87.7% subject-normalized LOSO has leakage.
3. Add train-fold-only normalization.
4. Add --shuffle-labels, --permutation-test N, --debug-folds, --subject-report, --dry-run and --debug.
5. Replace vague “No se construyeron muestras” with exact rejection reports.
6. Improve BIDS discovery for .edf, .bdf, .vhdr/.vmrk/.eeg, .set/.fdt and .fif.
7. Detect DataLad/git-annex placeholders and list safe datalad get candidates.
8. Fix channel counting: do not rely only on standard 10-20 names; use MNE channel types and channels.tsv.
9. Do not treat WAV/audio/behaviour files as EEG.
10. Add adapters for ds007358, ds007808 and generic BIDS.

For ds007358, preserve:
- raw LOSO
- subject-normalized LOSO
- personalized intra-CV
- alpha blocking only for EC/EO

For ds007808, support or fail clearly for:
.venv/bin/python3 analyze_dataset.py --path ds007808 --dataset ds007808 --mode file --tasks speechopen,listeningcovert --min-channels 1 --window 1.0 --overlap 0.5 --max-seconds 60 --report --debug

Be conservative. Prefer correct science over impressive numbers.
```
