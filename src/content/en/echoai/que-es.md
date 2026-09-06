# echoAI

echoAI is a two-clock situated agent. It is not a chatbot and it is not a
language model with tools.

The fast clock perceives, remembers, predicts, acts and learns using tables and
integers. When connected, the slow clock can read language and propose a
hypothesis. The gate retains the final say, and no cortex proposal becomes a
fact by itself.

```text
perceive → remember → predict → act → consequence → learn
                                      ↑
                      slow hypothesis, only when requested by ATTEND
```

## Current status

**ECHO-1 was closed on 5 September 2026.** The canonical suite ends with 488
passing tests and one explicit `expectedFailure`: WALK-1 without the opt-in
integer remainder. It is not hidden as green.

ECHO-1 demonstrates that the same animal:

- preserves CAM, Q, T and PatternMemory when crossing between worlds;
- distinguishes its own changes from changes in the environment;
- learns to carry an object and open a container;
- wakes the cortex after a known contradiction, not before it;
- narrates what happened without allowing the narration to modify the animal;
- learns a temporal regularity that one-step T cannot represent;
- gains a causal advantage over new or merely aged controls.

The transfer closure uses three worlds. At the two measured boundaries, the
transferred animal scores `208 vs 152` (`+56`) and `224 vs 152` (`+72`). The
aggregate gain is `+128`. No LLM or human labels are involved.

## Three channels that do not mix

| Channel | Question | Where it lives |
|---|---|---|
| Representation | What is happening? | 16-byte WSP |
| Epistemology | Do I know it? | CAM + VERIFY + extract |
| Control | What should I do? | Q + gate |

CAM records what happened. Q learns what is worth doing. T predicts the result
of an action. A convincing-sounding sentence changes none of those contracts.

## Figures that can be measured again

| Bench | Result |
|---|---|
| Ring, learned policy in the face of danger | `[-12, +5, 0]` |
| Asking versus not asking | `+80` versus `-80` |
| ATTEND with the cortex enabled | 36 wakes in 256 turns |
| SIGN-C, decision the fast clock could not solve | cortex `+16`, fast `0` |
| TALK-1 | 496/496 clauses; 256/256 records |
| PATTERN-0 | 80/80 versus T 40/80 |
| XFER-1 | `+56` and `+72` at independent boundaries |
| False facts / destroyed slots | `0 / 0` |

The main run keeps the cortex disabled. Qwen3-4B was tested separately, locally
and quantised, behind the same plug and an output grammar. In SIGN-C it solved
both canonical examples, 4 of 6 paraphrases the stub could not solve, and
produced `CortexROI +16`; two wrong non-canonical threat answers remain recorded
as safety debt rather than hidden.

## What this does and does not mean

This is evidence of memory, control, prediction, composition and transfer in
synthetic worlds. It is not yet a robot, does not demonstrate visual perception,
and does not authorise placing a generative model in motor control.

ECHO-2 will take the same contract into autonomous survival and object
recognition. ECHO-3 will connect it to sensors and a physical body at the edge.

— R.N.
