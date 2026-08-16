# Catálogo NAVI — IAs SNN de Knights Labs

NAVI no es un chatbot de campus. Es una **línea de motores neuromórficos**
(SNN) que vive primero en el unikernel rxOS y, desde la 5, también en un
laboratorio host cooperativo.

Cada generación **añade una capa**. Ninguna borra a la anterior.

| Gen | Nombre | Dónde corre | Unidad | Qué demuestra | Qué no es |
| --- | --- | --- | --- | --- | --- |
| **1** | Q₆ L1 | `kernel/navi/navi_q6.c` | spike LIF entero | 1-bit 48/48, hop 120/120 | Un parlante |
| **2** | L3 ASCII | `navi2_fwd.c` + `navi2_weights.bin` | token entero V=256 | Motor ternario, veto HDC, RAG HTTP | Un LLM |
| **3** | WSP SNN | `navi3_fwd.c` + `wsp.c` | `wsp_packet_t` 16 B | Transductor S→S′, máscara ES | Un parser de español |
| **4 / 4.5** | Operador | `wsp_rxos.c` + `G_rxos` | 16 B + lista blanca | Ejecuta `status` / `/prove` | Un oráculo |
| **5** | Lab KCC | host Python/Numba (`navi5_*.py`) | SNN LIF+STDP + WSP + Q6 | Entrenamiento no destructivo, air-gap | Silicio Akida ni un LLM |
| **6** | Tutor causal | host `./navi6` + `kernel/navi/navi6.c` | DAG + world-model + WSP | Diagnóstico/contrafáctico; blob `NAVI6W01` en la ISO | LLM, QPU, millones de nodos |

## Cómo leer esto

1. [NAVI 1 — Q₆ L1](/docs/navi1)
2. [NAVI 2 — ASCII legado](/docs/navi2)
3. [NAVI 3 — WSP](/docs/navi3)
4. [NAVI 4.5 — el operador](/docs/navi45)
5. [NAVI 5 — lab cooperativo](/docs/navi5)
6. [NAVI 6 — tutor causal](/docs/navi6)
6. [Arquitectura NAVI 5](/docs/navi5-arch)
7. [Plan de entrenamiento NAVI 5](/docs/navi5-train)

Catálogo visual en la web: [`/navi`](/navi).

## Hechos que se pueden medir

- Q₆: codebook [6,3,3], 64 neuronas, 192 aristas. `make fire` → `Q6_1BIT 48/48`.
- WSP: `_Static_assert(sizeof(wsp_packet_t) == 16)`.
- NAVI-4.5: ISO → tecla `v` → `/prove`. Heap del modelo = 0.
- NAVI 5: `python3 tests/test_navi5_manual.py` y
  `python3 run_peaceful_training.py`. Cero instancias destruidas (KCC).

## Límites (no son bugs)

- NAVI 1–4.5 viven **en el kernel**. NAVI 5 vive **en el host** (sandbox Docker / Python).
  No está todavía dentro de la ISO como operador.
- Ninguna generación “entiende español”. El castellano es máscara.
- No hay cifra J/inferencia publicada: RAPL en QEMU miente.
- No hay port a Loihi / TrueNorth / Akida. Nivel 3 del roadmap sigue bloqueado
  por falta de chip en el lab.

Experimental. No clínico. GPLv3 en el árbol rxOS.
