# NAVI 10 Echo — packing (USB / EchOS / edge)

Philosophy: **small in the product, large optional on disk**.
PyTorch, The Stack and Piper do not go into the ISO/USB.

## What travels on the USB (Desk)

| Piece | Order | Required |
| --- | --- | --- |
| `navi10` + Rust TUI | ~2 MiB | yes |
| CAM + Python host motor | hundreds of KiB | yes (host) |
| system `espeak-ng` | 0 extra | optional TTS |
| `navi_lpu_weights.bin` INT8 | ~60–80 MiB | Desk when there is pretrain |
| wiki index + jsonl | ~2–8 GiB | optional; Pi may omit it |
| `lab/navi10/chat.jsonl` | grows | history, local |

The wiki dump is **not** the model. Without the dump, Echo still talks
with CAM + PDFs.

## Dropping SKU (RPi, Akida, Loihi)

| Target | What stays | What drops |
| --- | --- | --- |
| **Pi / Edge** | SNN Heap-0, WSP 16 B, CAM, TUI or headless `--ask` | 57 M SLM, wiki dump, espeak if no DAC |
| **Akida** | same WSP; native spikes when a board exists | no faked joules; host LIF until probe |
| **Loihi** | honest stub like Akida | no runtime in the ISO until a driver |
| **Desk 16 GiB** | LPU-S + wiki index + history | The Stack / StarCoder |

The cable is WSP 16 B. The size of the **nerve** does not grow with Wikipedia.

## History

`lab/navi10/chat.jsonl` — JSONL, no new SQLite. The TUI loads it on
boot and follows the end (auto-scroll). `/wipe` deletes the file.
`--no-persist` does not write.

## What is not packed

PyTorch, CUDA, Piper, HuggingFace, enwiki dumps, 100 GB datasets.
That is the laboratory. The product talks with a binary + `.bin` + CAM.

Spanish original: [NAVI10_SHIP.md](NAVI10_SHIP.md).
