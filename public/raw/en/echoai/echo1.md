# ECHO-1 — closure

ECHO-1 is the animal's first complete integration. It is not a single score:
it is a chain of capabilities in which every step preserves the earlier locks.

```text
SELF-1 → ROOM-1 → GUI-3 → GUI-3.5 → OBJ-1 → OPEN-1
       → SIGN-C → TALK-1 → PATTERN-0 → XFER-1
```

## Situated foundation

Before ECHO-1, the learning ring, external query, ATTEND, the T model, gate, 2D
body, integer credit, 3D cube and attribution between self-motion and world
motion were closed.

The main bench continues to work without a cortex and without neuromorphic
hardware. Its locks remain a 16-byte WSP, 4,096-slot CAM, three default actions,
`destroyed=0`, `false_facts=0` and zero cortex calls.

## Capability chain

| Slice | What it added | Closure evidence |
|---|---|---|
| SELF-1 | self versus world motion | motor offset 1 versus 0; T 56 versus 46 |
| ROOM-1 | two rooms and external frame | 324 sites, 162 packets, transfer 64 versus 0 |
| GUI-3.5 | 3D volume and live log | 27 positions × 6 orientations; `--live` does not stop the animal |
| OBJ-1b | carrying X to Y | 51 deliveries; control 0; dropping the object earns nothing |
| OPEN-1 | new physical operation | 46 deliveries, 47 openings; three-action control 0 |
| SIGN-C | known contradiction wakes language | one call; proposal on next turn; ROI `+16` |
| TALK-1c | independent post-hoc narration | 496/496 clauses; 256/256 records; zero causal writes |
| PATTERN-0b | contextual regularity | 80/80 versus T 40/80; frozen exam |
| XFER-1d | same animal in three worlds | gains `+56` and `+72`; aggregate `+128` |

## SIGN-C and the local model

The contradiction only exists after acting: T predicts one successor and the
world delivers another. The origin had a known prediction, sufficient policy
margin and a real sign; a one-turn latch is then armed. The proposal is consumed
on the next turn without claiming that attention remains on.

The deterministic stub proves the connection in CI. A separate run with
Qwen3-4B-Instruct Q4_K_M, served locally, produced:

```text
8 calls · 0 rejections · 6/8 correct responses
4/6 paraphrases versus the stub's 0/6
both canonical cases correct · CortexROI +16 · false_facts 0
```

The action-specific grammar allows `UNIR`, `TEMER`, `OBSERVAR` or `NONE`, always
as a local relation. The general grammar remains intact. Both wrong
non-canonical threat answers remain visible in the report.

## PATTERN-0

T can only retain one answer for `(state, action)`. The riff needs to know where
the body came from:

```text
... B → A → C → A → B → A → C → A ...
```

PatternMemory uses `(previous, current, action)` and predicts both successors of
A. The exam contains four independent rotations, does not learn during testing,
and keeps unknowns in the denominator. The control without context collapses
exactly onto T.

## XFER-1

One Agent object preserves the same CAM, Q, T and PatternMemory instances while
crossing three different physics. At every boundary it is compared with a new
animal and another animal that has lived for the same number of turns without
receiving the useful regularity.

| Boundary | Transferred | New | Gain | Age control |
|---|---:|---:|---:|---:|
| B | 208 | 152 | +56 | 152 → +0 |
| C | 224 | 152 | +72 | 152 → +0 |

Before walking in the new world, transferred memory resolves 96/96 contexts;
new and aged memories declare 96 unknowns. The ablation uses the same CAM to
isolate PatternMemory: trained 96, empty 0, zero writes.

XFER-1 went through four rounds of certificate hardening. The final gate
recomputes protocols, walks, denominators, ablation and channel from the rows;
it does not trust summaries written by the report itself. The report contains
51 required mutants, all killed.

## Reproducible closure

```bash
cd /path/to/repo/RXos
PYTHONPATH=. python3 -m echoai.nexus0.xfer1
PYTHONPATH=. python3 -m echoai.tests.test_nexus0
```

Audited result: `xfer1 rc=0`, `green=true`, 488 passing tests and one documented
expected failure.

— R.N.
