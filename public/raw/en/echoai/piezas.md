# echoAI — architecture

Biological analogies help explain the design, but the code does not pretend to
be anatomy. Every component has a testable contract.

## WSP — the only bus

A fixed 16-byte packet: source, relation, destination, time, six state integers
and domain fields. It is the same representation from perception to action.
There is no second bus for Pattern, the cortex or narration.

## CAM — verified episodes

4,096 slots, with no destructive LRU. VERIFY requires sufficient similarity
and an extract delivered by the world. A cortex hypothesis is never written as
a fact. Across every ECHO-1 closure, `destroyed=0` and `false_facts=0`.

## T — one-step model

`T(s,a)` retains the dominant successor, number of observations and conflicts.
KCC prevents one isolated observation from erasing what was learned. When the
world contradicts a known prediction, the contradiction can wake ATTEND for the
next turn.

## PatternMemory — temporal context

PATTERN-0 adds the previous state to the context: `(previous, current, action)`.
It uses a fixed table, open addressing and integers. A rule is offered only
when mature and uncontradicted; if no rule exists, prediction falls back to T.

It is disabled by default and shares exactly T's observation channel. In the
test riff it obtains 80/80 predictions against T's 40/80.

## Q — policy

Q is an `int8` table separate from CAM. The default bench has three actions:
approach, move away and wait. OPEN-1 demonstrates that a world may opt into a
fourth action, open, without changing the ring contract.

Learning uses integer consequences. The division remainder that lets credit
travel farther is opt-in; WALK-1 without that remainder stays red and documented.

## Body and world

The agent is not its map. BODY-1 introduced pose and orientation; SELF-1
separated displacement produced by the motor from displacement produced by the
ground. ROOM-1 added external frames without consuming the WSP `domain` field.

OBJ-1 and OPEN-1 distinguish being in a place, carrying an object and executing
the physical operation required to deliver it.

## Gate — control and veto

Every proposal ends in `OK`, `MODIFY` or `BLOCK`. The gate can turn waiting into
avoidance in the face of a threat, or block an action. The cortex proposes; the
gate decides; a physical autopilot will also retain its own failsafes.

## ATTEND and cortex

ATTEND decides when the slow clock is worth spending: novelty, missing extract,
low confidence, unknown map or confirmed contradiction. The cortex receives a
serialised turn and returns a valid WSP or silence. Free prose is rejected.

SIGN-C demonstrated the correct causal latency: the world contradicts T, the
animal wakes once for `conflict`, and the proposal is consumed on the following
turn. The consumption record already shows attention as off.

## TALK — post-hoc narration

TALK-1 translates the log after the scene. It reads, validates and narrates, but
does not import the animal or open write paths. Its independent auditor compares
all sixteen clauses in every subtitle with the original record.

## Instrumentation

The web board renders the turn log and can follow it live through local polling.
It is observability, never a control input. The home-page GIF comes from a real
run.

## ECHO-2 neural monitor

CAPACITY-1 selected 512 LIF neurons for perceptual signatures and 128
Adaptive-LIF neurons for temporal context. It is a causal, observable monitor;
Q and the gate retain control of the decision. NEURAL-VIZ-1 displays its layers
and spikes beside WSP, CAM, T, patterns, homeostasis, death and inheritance.

## Future hardware

Today echoAI runs on a host and there is no AKD1500 M.2 in the laboratory. A future
neuromorphic accelerator would be treated as a perceptual coprocessor or bounded
head, never as VERIFY, sovereign memory or pilot.

— R.N.
