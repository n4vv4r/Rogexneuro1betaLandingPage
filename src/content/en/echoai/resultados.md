# ECHO-1 — results

This page turns the closure reports into a visual reading of the agent. It is a
**deterministic canonical acceptance benchmark**: it measures capabilities and
causal controls, does not compare echoAI with an LLM, and does not yet
demonstrate a physical robot.

## Minimal legend

| Term | Meaning |
|---|---|
| WSP | shared 16-byte packet representing what was perceived |
| CAM | episodic memory; retains what happened with verifiable evidence |
| Q | table scoring approach, avoid and wait in each state |
| T | model predicting the next state for an action |
| PatternMemory | additional context when a one-step transition is ambiguous |
| gate | final gate that accepts, modifies or blocks a proposal |
| ATTEND | condition that may wake the slow clock |
| cortex | optional slow clock; proposes, never directly controls the body |
| δ | difference between the expected and observed consequence |
| scratch | control starting from zero under the same protocol |
| held-out | frozen exam whose cases are not used for learning |
| ROI | additional reward over the control in the same window |

## Main figures

- The policy in the face of danger changes from `[0,0,0]` to `[-12,+5,0]`
  for approach, avoid and wait.
- T reaches 99.68% over 312 turns with a known prediction.
- PATTERN-0 goes from 40/80 with T to 80/80 with context: +40 correct answers.
- XFER-1 scores 208 versus 152 in B and 224 versus 152 in C: an aggregate
  gain of +128.
- SIGN-C produces one conflict call and +16 against the control's 0.
- TALK-1 preserves 496/496 clauses and makes no causal writes to the agent.
- Integrity: `false_facts=0`, `destroyed=0` and zero cortical calls in the
  main bench.

The web version includes line and bar charts, a decision-cycle diagram and a
player for all 352 turns of the canonical trace. The data can be downloaded as
JSON and includes the SHA-256 fingerprints of its source reports.

— R.N.
