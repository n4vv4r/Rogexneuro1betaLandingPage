# NAVI 10 Echo — how it is trained

**There is no backprop.** Billions of GPU weights are not fitted.
Training is **consolidating attractors** on the $Q_8\times Q_8$ mesh
with integer STDP and one Heap-0 CAM slot (4096 × 32 B).

Akida AKD1000/AKD1500 remains PLAN (0 boards). Today STDP is software
LIF. `destroyed=0`: the CAM is not pruned.

```bash
./navi10 --train                 # the 4 methods, falsifiable
./navi10 --bare --cam --ask "rxOS-metal"
./navi10 --bare --teach "rxOS-metal" --extract "Unikernel Ring 0 in C, Assembly and Rust."
./navi10 --bare --cam --ask "rxOS-metal"
```

`--ask` is only the mouth (talk + harvest). Training is checked with
`--cam` (CAM only) or `--train`. `--bare` boots without seed so you
see a real UNKNOWN.

## Mechanics

1. **Stream-to-Spoke** — bytes → SimHash-16 + latency.
2. **E[6] gating** — $C < 20$ opens STDP and reserves a slot; $U \ge 60$
   forces the Hamming geodesic.
3. **`--extract`** — without extract the pattern exists but is not a
   fact (`UNKNOWN` / `BASELINE`). With extract: `VERIFY`, $C=100$, ham=0.

## Four methods

1. **Factual injection** (zero hallucination) — `--teach` + `--extract`.
2. **Passive ingest** (baseline / anomaly) — `--ingest` a log; a new
   signal exceeds the Hamming limit in constant time.
3. **WSP geodesic** (decisions) — `--link` A B; hops = `popcount(A ⊕ B)`.
4. **E[6] modulation** — low C opens plasticity; high U shortens the path.

`--train` runs UNKNOWN → teach → VERIFY and demands `destroyed=0`.

Tests: `python3 tests/test_navi10.py TestTrain`.

Spanish original: [NAVI10_TRAIN.md](NAVI10_TRAIN.md).
