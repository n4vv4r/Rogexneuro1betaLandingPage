# PRISMA 3 - How to Read the Results

PRISMA 3 is experimental research software.

It is not a medical device.
It is not diagnostic software.
It does not read minds.
It does not measure CB1, CB2 or neurotransmitters directly.

## Core thesis

PRISMA 3 does not search for one universal brain pattern.

It learns the neurophysiological language of each individual.

## Main flow

simulated EEG or imported EEG
-> preprocessing
-> feature extraction
-> personal baseline
-> within-subject normalization
-> machine learning
-> individual translator
-> explainable report

## What the current synthetic results mean

The current demo shows that normalizing EEG features by user can improve classification in synthetic data.

It does not prove clinical performance.

## Current demo values

Raw global model: about 76.7 percent.
User-normalized global model: about 94.4 percent.
Personalized model: about 96.1 percent.

Correct reading:

Within-subject normalization helps handle synthetic inter-individual variability.

Incorrect reading:

PRISMA 3 has 96 percent clinical EEG accuracy.

## What the figures mean

user_variability_comparison.png:
Shows that the same simulated state can look different across users.

confusion_matrix.png:
Shows model hits and errors.

bandpower_over_time.png:
Shows how simulated EEG bands change over time.

baseline_deviation.png:
Shows deviation from personal baseline. It does not mean disease.

personal_clusters.png:
Shows exploratory clustering of simulated states.

## Next scientific step

Use real EEG data, repeated sessions, clear tasks, LOSO evaluation, test-retest validation and external review.
