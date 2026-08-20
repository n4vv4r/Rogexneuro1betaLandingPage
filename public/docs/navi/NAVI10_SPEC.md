# NAVI 10 + rxOS 10 — ficha de producto

Corte: **20 agosto 2026**. Cifras inventadas = no. Julios de Akida = no.

| Producto | Qué es | Estado público |
| --- | --- | --- |
| **NAVI 10 Echo** | SNN Heap-0, CAM, Q_N, VERIFY, TUI | **HOST LIVE** (`./navi10`) |
| **rxOS 10** | Unikernel que alojará Echo | **PRÓXIMO LANZAMIENTO** (no hay ISO 10) |
| **rxOS 9.0.0 SMOKE** | Escritorio Dark Aero + NAVI 7 | **SHIPPING** |
| **Akida / Loihi** | Offload NPU | **PLAN** (0 placas) |
| **EchOS** | ISO unificada + API | **VISIÓN** |

## Propiedades (NAVI 10)

| Propiedad | Valor | Dónde se comprueba |
| --- | --- | --- |
| Unidad de pensamiento | RogexWSP **16 B** | `_Static_assert` en `wsp.h` |
| Memoria de hechos | CAM **4096 × 32 B**, Heap-0 | `./navi10 --bench` |
| Topología | $Q_N = Q_8\times Q_8$ · **65536** direcciones | núcleo `NAVI_AI_SNN/qn/` |
| Neuronas LIF por paso | **256** (un spoke, no 65536) | sizeof / bench |
| Hamming | `popcount`, bola ≤ 3 + extracto = VERIFY | contrato |
| Si no hay ficha | **DESCONOCIDO** | `--ask` sin extracto |
| FPU en el motor SNN | **0** | LIF leak 7/8 entero |
| KCC | `destroyed=0` | `--train` |
| Harvest | Wikipedia REST + PDF locales | `--index-wiki` `--feed` |
| Red | cortable | `--no-live` |
| Cara | TUI Rust (ratatui), no es el SNN | `./navi10 --tui` |
| Boca (LPU-S) | ~57.68 M, V=32768, ctx=1024, INT8 ~60–80 MiB | plan de escala; pretrain de lab |
| Hechos duros | CAM + índice, **no** el SLM | crítica del consejo interno |
| TTS | `espeak-ng` es+f4, sin WAV extra | opcional |
| Historial | `lab/navi10/chat.jsonl` | local |
| Akida | PLAN | `neurocpu akida` se niega |

## Qué puede / qué no

**Puede**

- Nombrar el acto (TALK / hecho / emoción) en 16 B.
- Cosechar un extracto, grabar atractor, VERIFY en O(1).
- Callar sin extracto. No rellenar masa de un asteroide.
- Navegar $A\to B$ por geodésica de Hamming.
- Indexar wiki y PDFs personales en el host.
- Pintar un hipercubo 4D real en la TUI (cara, no cerebro).

**No puede (todavía, y se dice)**

- Arrancar como tecla `v` dentro de una ISO 10 (el SO 10 no existe).
- Offload a Akida (0 placas).
- Comprimir internet en 57 M de pesos.
- Inventar julios de NPU.
- Sustituir a un clínico ni ganar LMSYS.

## Características de rxOS 10 (contrato)

Cuando exista el ISO:

- Unikernel x86_64, Dark Aero heredado de 9.
- Echo in-OS: dejas de abrir “Navi 7”.
- Mismos invariantes: WSP 16 B, Heap-0, VERIFY, KCC.
- SKU Desk / Edge / Host. Wiki dump opcional (2–8 GiB). Sin PyTorch en el USB.
- ISO VM + metal, SHA-256, GPLv3. Experimental, no clínico.

Hoy: descarga **9.0.0**. El 10 se anuncia; no se finge.

## SKU (empaque)

| SKU | Qué viaja | Qué se cae |
| --- | --- | --- |
| **Host** (hoy) | `navi10` + TUI + CAM + motor Python | ISO 10 |
| **Desk** | + LPU-S INT8 + índice wiki | The Stack / Piper / PyTorch |
| **Edge / Pi** | SNN Heap-0 + WSP + CAM | SLM 57 M, dump wiki |
| **Akida** | mismo WSP; spikes nativos *si* hay placa | julios fingidos |

## Comandos

```bash
./navi10 --ask "que es un tomate"
./navi10 --bench
./navi10 --demo
./navi10 --tui
./navi10 --no-live --ask "que es titanio"
./navi10 --feed notas.pdf
make navi10-tui-rs
python3 tests/test_navi10.py
```

ISO de hoy:

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
