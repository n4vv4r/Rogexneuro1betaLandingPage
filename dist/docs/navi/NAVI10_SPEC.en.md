# NAVI 10 + rxOS 10 — product sheet

Cutoff: **20 August 2026**. Invented figures = no. Akida joules = no.

| Product | What it is | Public status |
| --- | --- | --- |
| **NAVI 10 Echo** | SNN Heap-0, CAM, Q_N, VERIFY, TUI | **HOST LIVE** (`./navi10`) |
| **rxOS 10** | Unikernel that will host Echo | **COMING SOON** (no ISO 10) |
| **rxOS 9.0.0 SMOKE** | Dark Aero desktop + NAVI 7 | **SHIPPING** |
| **Akida / Loihi** | NPU offload | **PLAN** (0 boards) |
| **EchOS** | Unified ISO + API | **VISION** |

## Properties (NAVI 10)

| Property | Value | Where it is checked |
| --- | --- | --- |
| Unit of thought | RogexWSP **16 B** | `_Static_assert` in `wsp.h` |
| Fact memory | CAM **4096 × 32 B**, Heap-0 | `./navi10 --bench` |
| Topology | $Q_N = Q_8\times Q_8$ · **65536** addresses | core `NAVI_AI_SNN/qn/` |
| LIF neurons per step | **256** (one spoke, not 65536) | sizeof / bench |
| Hamming | `popcount`, ball ≤ 3 + extract = VERIFY | contract |
| If there is no card | **UNKNOWN** (`DESCONOCIDO`) | `--ask` without extract |
| FPU in the SNN motor | **0** | integer LIF leak 7/8 |
| KCC | `destroyed=0` | `--train` |
| Harvest | Wikipedia REST + local PDFs | `--index-wiki` `--feed` |
| Network | cuttable | `--no-live` |
| Face | Rust TUI (ratatui), not the SNN | `./navi10 --tui` |
| Mouth (LPU-S) | ~57.68 M, V=32768, ctx=1024, INT8 ~60–80 MiB | scale plan; lab pretrain |
| Hard facts | CAM + index, **not** the SLM | inner-council critic |
| TTS | `espeak-ng` es+f4, no extra WAV | optional |
| History | `lab/navi10/chat.jsonl` | local |
| Akida | PLAN | `neurocpu akida` refuses |

## Can / cannot

**Can**

- Name the act (TALK / fact / emotion) in 16 B.
- Harvest an extract, write an attractor, VERIFY in O(1).
- Stay silent without extract. Not fill an asteroid’s mass.
- Navigate $A\to B$ along the Hamming geodesic.
- Index wiki and personal PDFs on the host.
- Paint a real 4D hypercube in the TUI (face, not brain).

**Cannot (yet, and it is said)**

- Boot as the `v` key inside an ISO 10 (OS 10 does not exist).
- Offload to Akida (0 boards).
- Compress the internet into 57 M weights.
- Invent NPU joules.
- Replace a clinician or win LMSYS.

## rxOS 10 characteristics (contract)

When the ISO exists:

- x86_64 unikernel, Dark Aero inherited from 9.
- Echo in-OS: you stop opening “Navi 7”.
- Same invariants: WSP 16 B, Heap-0, VERIFY, KCC.
- SKU Desk / Edge / Host. Optional wiki dump (2–8 GiB). No PyTorch on the USB.
- VM + metal ISO, SHA-256, GPLv3. Experimental, not clinical.

Today: download **9.0.0**. 10 is announced; it is not faked.

## SKU (pack)

| SKU | What travels | What drops |
| --- | --- | --- |
| **Host** (today) | `navi10` + TUI + CAM + Python motor | ISO 10 |
| **Desk** | + LPU-S INT8 + wiki index | The Stack / Piper / PyTorch |
| **Edge / Pi** | SNN Heap-0 + WSP + CAM | 57 M SLM, wiki dump |
| **Akida** | same WSP; native spikes *if* a board exists | faked joules |

## Commands

```bash
./navi10 --ask "que es un tomate"
./navi10 --bench
./navi10 --demo
./navi10 --tui
./navi10 --no-live --ask "que es titanio"
./navi10 --feed notes.pdf
make navi10-tui-rs
python3 tests/test_navi10.py
```

Today’s ISO:

```
https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0
```

## Docs

- [NAVI10.md](NAVI10.md) · [NAVI10.en.md](NAVI10.en.md)
- [RXOS10.md](RXOS10.md) · [RXOS10.en.md](RXOS10.en.md)
- [NAVI10_LPU.md](NAVI10_LPU.md) · [NAVI10_SHIP.md](NAVI10_SHIP.md)
- [NAVI10_TRAIN.md](NAVI10_TRAIN.md) · [NAVI10_META.md](NAVI10_META.md)
- [NAVI10_SLM.md](NAVI10_SLM.md) · [ETERNAL_ECLIPSE.md](ETERNAL_ECLIPSE.md)

Web: [`/navi`](https://www.rogexlaboratories.com/navi) ·
[`/rx-os`](https://www.rogexlaboratories.com/rx-os) ·
[`/roadmap`](https://www.rogexlaboratories.com/roadmap).
