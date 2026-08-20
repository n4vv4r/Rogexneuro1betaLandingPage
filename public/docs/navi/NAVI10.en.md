# NAVI 10 — Echo (SNN Heap-0)

**Status: HOST LIVE (software).** Akida AKD1000/AKD1500 remains **PLAN**:
there is no board; `neurocpu akida` refuses. This paper does not turn
NAVI into GPT-5.6. It evolves *topology* and the *memory engine* so
more of the world is covered **without** probabilistic parameters or
a KV-cache.

Parent: [ECHO.md](ECHO.md) · [NAVI9.md](NAVI9.md) · [AKIDA.md](AKIDA.md)
· [NAVI9_HYBRID.md](NAVI9_HYBRID.md). C core: `NAVI_AI_SNN/qn/`.

```bash
./navi10 --ask "hola"
./navi10 --ask "que es un tomate"    # harvest Wikipedia → CAM → VERIFY
./navi10 --ask "que es KCC"
./navi10 --demo
./navi10 --bench
make navi10-tui-rs && ./navi10 --tui   # host face: 4D tesseract + WSP
python3 tests/test_navi10.py
```

`--ask` is no longer raw ingest. RogexWSP names the act (talk / fact /
emotion). A “hola” is TALK. A datum without a card is harvested; without
an extract it is UNKNOWN (`DESCONOCIDO`). `--no-live` cuts the network.

Train (no backprop): [`NAVI10_TRAIN.md`](NAVI10_TRAIN.md) · `./navi10 --train`.
Metacognition (4 tests): [`NAVI10_META.md`](NAVI10_META.md) · `./navi10 --meta`.
LPU (verbal cortex, frames today): [`NAVI10_LPU.md`](NAVI10_LPU.md).
Desktop scale + own SLM: [`NAVI10_SLM.md`](NAVI10_SLM.md). **Not a
shipped trained mouth yet** — pretrain is a lab job, not the ISO.

## Contract that does not break

| Invariant | How it is held |
| --- | --- |
| Heap-0 | Static CAM 4096 × 32 B. The step does not malloc. |
| 0 FPU | LIF leak 7/8, Hamming = popcount, integer SimHash. |
| WSP 16 B | `event → postcard` identical to `wsp.h`. `_Static_assert` still in the kernel. |
| VERIFY / UNKNOWN | Hamming ≤ 3 **and** extract. Otherwise there is no fact. |
| KCC | `destroyed=0`. The CAM only grows or is reinforced. |
| Honest Akida | No probe, no silicon. Today’s STDP is integer LIF. |

No transformer is added to the motor. No BrainChip joules are faked.

## 1. What was missing (and what was built)

### Dimensions $Q_6/Q_8 \to Q_N$

Q6 is 64 LIF and 8 codewords `[6,3,3]`. A ninth codeword in 6 bits
**breaks** the Hamming bound (`d_min=3`). NAVI 10 does not invent that bit.

$Q_N$ is the **product** $Q_8 \times Q_8$:

- address space: $2^{16} = 65536$ vertices
- LIF: **one spoke** of 256 neurons (never 65536)
- product Hamming: $\mathrm{popcount}(a \oplus b)$ — $O(1)$
- mode decoder: extended `[8,4,4]`, 16 codewords, $d_{\min}=4$
- 1-bit in each half is recovered by `product_nearest` without simulating the whole cube

That is the mesh of interlaced hypercubes. It is not an embedding of
thousands of floats.

### Heap-free index engine (CAM)

GPT-5.6 reserves a KV-cache on the GPU. NAVI reserves **4096 static
slots** (replacing the 73-card ceiling of 7-WORLD):

```
WSP 16 B  +  uint16 vertex  +  latency  +  E[6]  +  STDP weight
```

Exact lookup by FNV of the packet. Noisy lookup by Hamming ball
(limit 3) + time offset. On silicon the CAM compares in parallel; on
the host the pass is bounded by `CAM_SLOTS`.

### Event → spikes (not parsedown)

There are no rigid lexical converters on the hot path. Text, if it
arrives, is a **byte signal**: folded (sensor) and split on
delimiters `≤ 0x20`. Each window is a spike train:

- vertex = SimHash-16 (Hamming locality; a typo does not avalanche)
- latency = high nibble of the byte (0..15 ticks)
- 256 neurons of the spoke, $T_{\max}=16$

That is Stream-to-Spoke. The output is a 16 B WSP, not a token.

## 2. Akida: add / change / do not fake

| Module | Today (host) | When there is AKD1000/1500 |
| --- | --- | --- |
| STDP | int8 LTP/LTD, gated by E[C] | edge-learning of the last FC (BrainChip label, not “fabric STDP”) |
| Stream-to-Spoke | integer ticks | same native cadence of the chip |
| DAG | reserve CAM slot | the weight lives in the node’s local SRAM |
| Attractors | vertex + latency in the CAM | local weights; Hamming **and** delay |

`E[6]` is neuromodulation:

- **C** low (`< 20`) → plasticity ON → write pattern
- **U** high (`≥ 60`) → Hamming geodesic, ignore weights
- **A** → extra $I_{\mathrm{STIM}}$

High certainty and no teaching signal: a node is not invented. That
is the opposite of an LLM that fills.

## 3. Autonomous loop

```
[Input] ──> [Spike ingest] ──> [Q_N / CAM evaluation]
                                     │
                    match            ┴     no match
                    VERIFY O(1) WSP        UNKNOWN
                                                │
                                           STDP / DAG
                                                │
                                           new attractor
                                           (fact only if extract)
```

To reason is to **navigate** $A \to B$ along the Hamming geodesic
(`popcount(A\oplus B)` hops, one bit per step). It is not P(token).

## 4. How it is measured (not LMSYS)

```bash
./navi10 --bench
./navi10 --demo
```

Board:

1. Additive topology and `graph_ok`
2. Q8 1-bit + product 1-bit
3. CAM insert/recall, `destroyed=0`
4. SNN: unknown → teach → VERIFY; another invention stays UNKNOWN
5. E[6] opens/closes plasticity
6. Geodesic = Hamming
7. C core `sizeof` (Heap-0, 0 FPU)

If a fluency axis goes up and truth goes down, 10 does not advance.

## 5. Honest ceiling

NAVI 10 can: route in 16 B, recover with 1 bit of noise, learn a
pattern in the step, stay silent without extract, carry the same DAG
to metal.

NAVI 10 is not GPT-5.6 Sol: it does not compress the internet, it
does not emit free prose from parameters, it has no Akida until the
probe reads `HwVersion`. The capacity jump is **topological and of
memory**, not of parameters.

The **mouth** (LPU-S, ~57 M, vocab 32768) is a separate cortex. Facts
live in CAM + wiki index. The SLM does not own hard numbers.

## 6. Host TUI (face, not brain)

`tui/navi10-rs` is a ratatui compositor. It launches `./navi10 --ask`
via tokio, paints stdout and **is not** the SNN. The cube on the left
is a real hypercube: 16 vertices $(\pm 1)^4$, 32 edges $d_H=1$,
rotation in 6 planes, projection $4\mathrm{D}\to 3\mathrm{D}\to 2\mathrm{D}$,
Bresenham. The reactor changes $\Delta\theta$ and the glyph with state
(IDLE/THINKING/TALKING). CPU/RAM via `sysinfo`; GPU via NVML if
`libnvidia-ml` is present, else `nvidia-smi` / sysfs, else an em dash.

```bash
make navi10-tui-rs
./navi10 --tui
```

Keys: Esc quits · ↑↓ history · PgUp/PgDn chat · Alt+↑↓ WSP ·
Ctrl+Y copy · wheel scroll. `/live` `/nolive` `/clear` `/copy`.

## Pair with rxOS 10

NAVI 10 is live on the host. [rxOS 10](RXOS10.en.md) is the **coming
soon** OS that will carry this mind. Until that ISO exists, the
shipping desktop is [rxOS 9 SMOKE](RXOS9.md) with NAVI 7-WORLD.

Experimental. Not clinical. GPLv3 in the rxOS tree.
Knights Labs / Rogex Laboratories · August 2026.
