# Kernel Event Fabric + Neuromorphic Actors (v4.6 MVP)

Status: **IMPLEMENTED** — self-tested at every boot, network RX bridged and
verified end-to-end by both two-node ping tests. This is Phase A + B (+ the
Phase C actor machinery) of the neuromorphic refactor from
`docs/neuromorphic_manifesto.md` §3, running on today's von Neumann x86.

## What it is

```
Hardware IRQ (virtio INTx)                      idle-loop pump (UI hook)
        |                                               |
        v                                               v
  ISR: build rx_event_t, enqueue          1-PIT-tick RX_EVENT_DEADLINE
  (SPSC ring, no cli/sti, no loops)       (direct stimulate; see SPSC note)
        \                                       /
         \--> net_rx actor: lazy Q16.16 LIF --/
                    | spike (deterministic: every event fires)
                    v
              wired_service()  — the verified drain/PING-answer path
```

- `kernel/event/rx_event.h` — Q16.16 fixed-point helpers (the kernel builds
  with `-mno-sse`; no float exists), the 64-byte cache-line-aligned
  `rx_event_t` (compile-time `_Static_assert`), the 256-slot lock-free SPSC
  ring, the memristive software synapse (STDP traces, lazy decay) and the
  LIF actor control block.
- `kernel/event/rx_actor.c` — ring enqueue/dequeue with `mfence` publish
  ordering, `calculate_lazy_decay()` (rational approximation
  `V·tau/(tau+dt)`: exact at dt=0, monotone, one multiply + one divide),
  `rx_actor_dispatch()`, `rx_actor_stimulate()`, the (future) master
  `rx_kernel_event_loop()`, and `rx_event_selftest()`.
- `drivers/net/virtio_net_actor.c` — the Phase B bridge that replaces
  `events_set_idle_hook(wired_service)` with the fabric pump.

## The policy decision that matters (read before "improving" it)

The net_rx actor is **deterministic**: stimulus == threshold, refractory 0 —
every event fires the drain. The INTx event is a **latency hint**; the
1-tick deadline stimulus is the **correctness guarantee** (~10 ms worst-case
drain, the same bound the old always-drain idle hook had; e1000 has no IRQ
at all and lives on the deadline path alone).

This is not caution for its own sake — it is a measured fact. The Wired
panel's live telemetry after a full two-node ping run on q35 reads:

```
Fabric:  1449 ev (0 hint / 1449 deadline), 1449 spikes, 0 drop
```

**Zero hint events**: INTx never fired once on this machine type. A build
that gated draining on the interrupt (as an earlier revision did, and as a
naive reading of "process only when the threshold event arrives" suggests)
drops all traffic silently — that regression is documented in
`docs/wired_network.md` and it is why the critical boundary exists:
*a neural threshold never gates a correctness path.* Genuine thresholding
(suppression, integration, refractory) is exercised by the boot self-test
and is reserved for soft, deferrable services.

## Concurrency contract (single core)

`rx_spsc_ring_t` allows exactly ONE producer context per ring — here, the
virtio ISR. The producer writes the slot, `mfence`, then publishes `head`;
the consumer reads `head`, `mfence`, then the slot. No cli/sti, no loops in
the ISR, drop-newest (+counter) on a full ring. The pump's own deadline
stimuli deliberately bypass the ring via `rx_actor_stimulate()` — an ISR
preempting the pump mid-enqueue would otherwise be a second concurrent
producer on the same ring.

## Fixed-point notes

Q16.16 (`1.0 == 65536`). Multiplies go through int64 (no overflow for any
two Q16 operands); membrane integration clamps at `Q16_POTENTIAL_CAP` so
stimulus streams cannot creep toward the int32 ceiling. The decay
approximation's error vs true `exp(-dt/tau)` is small for `dt <= tau` and
irrelevant here: nothing correctness-critical reads a membrane potential.

## Verification guide (all run here, all green)

```bash
make                  # clean build, 0 warnings; links kernel/event + bridge
make test             # 26 smoke checks; boot line:
                      #   [rxos] event fabric self-test (SPSC ring + Q16.16 LIF): PASS
make net-test         # two QEMU nodes, virtio-net: bob pings alice by alias
make net-test-e1000   # same over the e1000 (VirtualBox's NIC)
make test-disk        # persistence regression (14 checks, ATA + virtio-blk)
```

The self-test covers: ring integrity across 3 wraparound laps, the full-ring
drop policy, decay exactness (`V0=1.0, tau=100, dt=100 -> 0.5` bit-exact),
sub-threshold suppression, integrate-and-fire, refractory suppression, and
the ring→dispatch→spike path end to end. In-OS, the `wired` panel shows the
live fabric counters (events, hint/deadline split, spikes, drops).

## Interactive proof: the `neuro` command

"Comprobar que es neuromórfico" is a shell command, not a slide. `neuro`
opens a live LIF neuron on the same fabric; **your keystrokes are the
stimuli** (+0.35 each, Q16.16):

- Type slowly → the leak wins between keys; the membrane bar decays and the
  event is counted as *suppressed*. No spike.
- Type fast → the potential integrates across events, crosses 1.00 →
  **SPIKE** (callback fires, membrane resets, 300 ms refractory).
- The STDP synapse weight moves on every pre/post pairing, on screen.

Verified by screendump, and the numbers are bit-exact against the model:
5 keystrokes ~0.25 s apart with tau = 1 s produced `SPIKES: 1,
suppressed: 4, events: 5, weight 0.50→0.52`; after 3 stimulus-free seconds
the membrane read 0.04 — exactly `0.15·100/(100+300)` from the rational
decay. Thresholding, leak, refractory and plasticity are all observable and
falsifiable in the running OS.

## What this MVP is NOT

- Not the machine's master loop yet: the desktop shell still owns the main
  loop and embeds fabric passes via the idle hook. `rx_kernel_event_loop()`
  exists, is real, and takes over the day the fabric becomes the scheduler.
- Not a change to input: keyboard/mouse stay on the verified IRQ→IPC queue.
  Migrating them onto typed events is a later, separate bite.
- Not neuromorphic hardware. Same manifesto rule as always: this is the
  event-driven software bridge, labeled IMPLEMENTED; memristive silicon
  stays OBJETIVO I+D.
