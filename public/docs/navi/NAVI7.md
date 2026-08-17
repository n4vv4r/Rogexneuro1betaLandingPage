# NAVI 7 — dos vías (NPU plan / WORLD lab)

Hay **dos** cosas llamadas 7. No se mezclan.

| Vía | Estado | Qué es |
| --- | --- | --- |
| **7-NPU** | PLAN | 6.5 + Akida/Loihi. Sin placa el NPU no se nombra. Sigue abajo. |
| **7-WORLD** | **oficial en rxOS 9** | Catálogo de fichas + harvest Wikipedia/Google + lateral + hop. `./navi7` · ventana Navi 7 |

7-WORLD **no** es un LLM, **no** es backprop, **no** es el NPU. Es el
laboratorio donde NAVI aprende conceptos con fuente: programación,
filosofía, psicología, ciencia, leyes, mundo humano, noticias.

**7.5** (oficial encima de 7-WORLD): voz humana, memoria SQLite, harvest
Wikipedia/DuckDuckGo, fichas extra (España, CCAA). Ver [NAVI75.md](NAVI75.md).

```
./navi7 --train          # laboratorio (oráculos + wiki + news + quiz + bench)
./navi7 --ask "que es fotosintesis"
./navi7 --bench
python3 navi7_lab.py train
python3 tests/test_navi7.py
```

Catálogo: `lab/navi7/catalog.json`. Informe: `lab/navi7/train_report.json`.
KCC: las fichas solo crecen. `destroyed` tiene que ser 0.

Si no hay ficha y el harvest falla: **DESCONOCIDO**. No se rellena.

---

# 7-NPU — lo que sería (no está escrito)

**Estado: PLAN.** No hay blob `NAVI7W01` de Akida, no hay test NPU.

NAVI 6.5 sigue siendo el contrato RLC (once máscaras `G_*`, bucle
PARSE-RETRIEVE-INFER-VERIFY-RENDER). En rxOS 9 la **cara oficial**
es 7-WORLD (catálogo + harvest) encima de ese contrato.
7-NPU sería **la misma mente** con un sitio donde los spikes pueden
salir de la CPU.

## 1. Una frase

NAVI 7 = NAVI 6.5 + backend neuromórfico real (Akida primero, Loihi
como vía secundaria) + un blob que lleva el programa del NPU junto
al DAG.

Si el silicio no está, 7 se comporta como 6.5 y lo dice. Eso ya es
el estilo de `neurocpu akida`.

## 2. Qué hereda, qué añade

| Capa | 6.5 (hoy) | 7 (plan) |
| --- | --- | --- |
| Máscaras | 11 G_* | Las mismas. No se inventa un loro |
| Razonamiento | 5 cajas + DAG | Idéntico, **en CPU** |
| Código / math | catálogo + enteros | Idéntico, **en CPU** |
| SNN / Q6 | LIF software, Numba / C entero | `.fbz` mapeado si hay NPU |
| Blob | `NAVI6W01` (DAG + plantillas) | `NAVI7W01` = 6.5 + secuencias Akida |
| Backend | solo software | software \| akida \| (loihi stub) |
| Si no hay placa | — | fallback obligatorio, status explícito |

Lo que **no** es NAVI 7:

- Un LLM en el chip. Akida 2 tiene TENNs / GenAI en la ficha de
  BrainChip; eso es **su** producto. NAVI no se convierte en un
  transformer porque exista un FPGA de demostración.
- Un reemplazo de `G_rxos`. El operador sigue en lista blanca.
- Un umbral que mande en la red o en el disco.

## 3. Arquitectura prevista

```
usuario
  │  tecla v / ./navi65 / navi7
  ▼
NAVI 6.5 router          ← no se toca el contrato RLC
  │
  ├─ G_talk logic poem news code rxos math plan teach
  │     siempre CPU
  │
  ├─ G_reason / G_debug / G_plan causal
  │     DAG + world-model en CPU
  │     opcional: una densa en el NPU para rankear
  │
  └─ poblaciones SNN / Q6
        ├─ software LIF     (siempre)
        └─ Akida sequence   (si rx_backend == akida)
              program(.fbz) → enqueue(uint8) → fetch
```

El codec está en [AKIDA.md](AKIDA.md) §4. WSP 16 B cabe en un
`InputData` 1×1×16. Q6 cabe en un mapa 8×8 de spikes. El castellano
sigue siendo máscara.

## 4. Blob `NAVI7W01`

Mismo truco que 2/3/6: módulo Multiboot2, sin kmalloc del modelo.

```
offset 0    magic "NAVI7W01"     8 B
offset 8    ver, flags, n_seq    8 B
offset 16   hdr 64 B (como 6)
luego       DAG packed (igual que NAVI6W01)
luego       n_seq × { nbytes, program[] }   # salidas de Model.sequences
```

`flags` bit 0: “incluye programa Akida 1”.
`flags` bit 1: “incluye programa Akida 2”.
Si el `HwVersion` del silicio no coincide, se ignora el programa y
se corre software. No se improvisan pesos.

Entrenar (host, cuando exista el lab):

```
# todavía no hay script. El día que lo haya se llamará así:
python3 navi7_pack.py --fbz navi.fbz --out NAVI_AI_SNN/l3/navi7_weights.bin
make iso-refresh
```

Hasta entonces el comando de arriba **no existe**.

## 5. Criterios para llamar “NAVI 7” a un commit

No basta con renombrar 6.5. Hace falta **todo** esto:

1. `rx_backend_available(AKIDA)` verdadero en una máquina del lab,
   con `HwVersion` impreso.
2. Un test host: mismo vector, software vs NPU, acuerdo escrito
   (Hamming / clase).
3. Un test ISO: tecla `v`, `neurocpu akida`, una pregunta G_debug
   que no cambie de sentido.
4. Tabla de energía CPU vs NPU, ambos lados medidos
   ([AKIDA.md](AKIDA.md) §4, cerradura 4).
5. Fallback: desenchufar la placa y ver a 6.5 en software, sin
   pánico.

Si falta el punto 1, el binario se llama 6.5. Punto.

## 6. Relación con PRISMA

PRISMA Engine ya es SPSC + Δ-mod + LIF en software. El path natural
de 7 no es “NAVI come EEG crudo”. Es:

```
sensor → PRISMA (spikes) → WSP / tensor uint8 → NAVI 7 (NPU o CPU)
```

P5 sigue siendo **otro producto**. No hay descarga “PRISMA 5”. El
HAL de P5 y el `HardwareDriver` de rxOS deben hablar el mismo
vocabulario de buffers (Dense / evento 64 B), o se documenta por
qué no.

## 7. Orden de trabajo (cuando haya placa)

1. Cerradura 0 de [AKIDA.md](AKIDA.md): `.fbz` en el simulador.
2. Probe + `neurocpu akida` de verdad.
3. Offload de Q6 solamente (es el grafo más pequeño y ya tiene
   48/48).
4. Offload de una población NAVI 5.
5. Empaquetar `NAVI7W01`.
6. Recién entonces: tag de versión, ISO, anuncio.

Loihi no entra en este orden. Es un stub honesto hasta que exista
acceso de investigación y un HAL público comparable.

## Lectura

- [Akida × rxOS](AKIDA.md) — el gancho y las cinco cerraduras.
- [Cianotipo](CIANOTIPO.md) — rxOS + NAVI + PRISMA en un mapa.
- [NAVI 6.5](NAVI65.md) — lo que ya se puede correr y medir.
