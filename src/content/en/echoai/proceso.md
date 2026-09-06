# How it was built

echoAI is developed at RxLabs as an experimental engineering programme: every
advance begins with a bounded claim, includes a causal control, produces its own
evidence and ends at a gate that must be able to say no.

## Direction and traceability

Roger Navarro directs the product and its architecture, establishes the
invariants, operates the laboratory and accepts or rejects each phase. Technical
evolution is traced through specifications, code, tests, reports and
reproducible commits.

Auxiliary tools from the internal process are not part of the published
evidence. Public claims rest solely on system behaviour, controls and
reproducible results.

## The work cycle

```text
objective → invariant → causal hypothesis → bounded specification
          → implementation → bench and controls → counterexample
          → harden or reject → next increment
```

Every increment has one primary KPI. An experiment may not be repaired by
moving the reward, hard-coding a world's name or weakening a condition after
seeing the result.

## Green does not mean “the script finished”

A green report is valuable only if its predicate can disagree with it. Review
therefore tries to construct contradictory certificates:

- summary counters that do not match their rows;
- three controls that agree with one another but are all configured incorrectly;
- gate actions wrongly credited to the cortex;
- unknowns removed from the denominator;
- an ablation that also changes perception and no longer isolates memory;
- future live mutants hidden by a closed list;
- narration that shares tables with its own auditor.

TALK-1 needed three closures and XFER-1 four. The causal figures did not change;
the evidence was hardened until those false greens could no longer pass.

## Regular controls

1. **Transfer versus scratch.** Same protocol, different experience.
2. **Age control.** Same number of turns, without the regularity being measured.
3. **Perceptually matched ablation.** Change one memory, not the input.
4. **Frozen held-out set.** The exam never calls `observe()`.
5. **Mutation.** Every lock must kill at least one alteration that might
   otherwise have passed.
6. **Regression.** The ring and previous reports retain their figures.

## Architectural discipline

- A single 16-byte WSP bus.
- CAM, Q and T are different structures.
- No floating point in the fast decision path.
- The cortex is disabled by default and only proposes.
- A hypothesis is never written as a fact.
- Narration happens afterwards and does not return to the animal.
- A new world changes physics, not agent code.
- Absent hardware is declared absent.

## Reproducibility

Every phase writes a separate report under `echoai/lab/`. Canonical benches do
not require a network, model weights or a board. Runs with Qwen are retained as
operator reports and do not replace the deterministic suite.

The published ECHO-1 state corresponds to 488 passing tests, one known
`expectedFailure`, and green ROOM-1, OBJ-1, OPEN-1, SIGN-C, TALK-1, PATTERN-0
and XFER-1 reports.

— R.N.
