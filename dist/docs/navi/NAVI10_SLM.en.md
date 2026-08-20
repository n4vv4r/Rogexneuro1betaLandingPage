# NAVI 10 Desktop — own predictive SLM (scale plan)

**Product of this line:** a C/Rust cross-platform app for ordinary PCs
(Fedora, then Windows/macOS). Face: TUI/GUI. Brain: WSP + CAM + SNN +
**a small SLM trained from scratch**.

**It is not** the rxOS-robot line (control AI, not chat). The SLM is
the verbal cortex of a desktop assistant that **does not invent facts**.

**Status today:** the LPU that answers “entropy/memory” and
“sadness/hardware” is a frame composer (`navi10_lpu.py` +
`navi10_lpu_lex.py`). There is no claimed shipped `.bin` of trained
wiki weights on the product USB. Lab pretrain is a separate job.

## Two SKUs

| SKU | Shape | Parameters | INT8 weights | For whom |
| --- | --- | --- | --- | --- |
| **LPU-S** | L=8, d=512, H=8, GQA 8→2, SwiGLU 1536, vocab 32768, ctx 1024 | ~50–70 M | ~60–80 MiB | ordinary PC CPU, first `.bin` |
| **LPU-M** | L=12, d=768, H=12 GQA 12→3, SwiGLU 2048, vocab 50304, ctx 2048 | ~110–150 M | ~120–180 MiB | desktop ≥16 GiB, optional GPU |

Start with **LPU-S**.

Contract that does not break when the SLM is added:

- Heap-0 / 0 FPU of the **SNN step** in the unikernel (another binary).
- On desktop the SLM **does** use FPU/SIMD. It is another process/module.
- VERIFY requires extract. UNKNOWN if there is a figure and no CAM.
- `destroyed=0`. The SLM does not delete cards.
- Akida: PLAN.

Hard numbers (mass of Apophis, 2026 RX4) live in CAM / harvest, not in
parametric memory. The SLM drafts *around* an injected extract.

Spanish original: [NAVI10_SLM.md](NAVI10_SLM.md).
