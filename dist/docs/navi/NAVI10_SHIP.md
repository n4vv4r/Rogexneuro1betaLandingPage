# NAVI 10 Echo — empaque (USB / EchOS / borde)

Filosofía: **pequeño en el producto, grande opcional en el disco**.
No se mete PyTorch, The Stack ni Piper en el ISO/USB.

## Qué viaja en el USB (Desk)

| Pieza | Orden | Obligatorio |
| --- | --- | --- |
| `navi10` + TUI Rust | ~2 MiB | sí |
| CAM + motor Python host | cientos de KiB | sí (host) |
| `espeak-ng` del sistema | 0 extra | TTS opcional |
| `navi_lpu_weights.bin` INT8 | ~60–80 MiB | Desk cuando haya pretrain |
| índice wiki + jsonl | ~2–8 GiB | opcional; Pi puede omitirlo |
| `lab/navi10/chat.jsonl` | crece | historial, local |

El dump wiki **no** es el modelo. Sin dump, Echo sigue hablando con CAM + PDFs.

## Bajar de SKU (RPi, Akida, Loihi)

| Objetivo | Qué se queda | Qué se cae |
| --- | --- | --- |
| **Pi / Edge** | SNN Heap-0, WSP 16 B, CAM, TUI o headless `--ask` | SLM 57 M, dump wiki, espeak si no hay DAC |
| **Akida** | mismo WSP; spikes nativos cuando hay placa | no se fingen julios; host LIF hasta probe |
| **Loihi** | stub honesto como Akida | no hay runtime en el ISO hasta driver |
| **Desk 16 GiB** | LPU-S + wiki índice + historial | The Stack / StarCoder |

El cable es WSP 16 B. El tamaño del **nervio** no crece con Wikipedia.

## Historial

`lab/navi10/chat.jsonl` — JSONL, sin SQLite nuevo. TUI lo carga al arrancar
y sigue al final (auto-scroll). `/wipe` borra el archivo. `--no-persist` no escribe.

## Lo que no se empaqueta

PyTorch, CUDA, Piper, HuggingFace, dumps enwiki, datasets de 100 GB.
Eso es laboratorio. El producto habla con binario + `.bin` + CAM.
