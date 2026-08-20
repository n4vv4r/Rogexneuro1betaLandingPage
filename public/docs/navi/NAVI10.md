# NAVI 10 — Echo (SNN Heap-0)

**Estado: HOST LIVE (software).** Akida AKD1000/AKD1500 sigue **PLAN**:
no hay placa; `neurocpu akida` se niega. Este papel no convierte a
NAVI en GPT-5.6. Evoluciona la *topología* y el *motor de memoria*
para cubrir más mundo **sin** parámetros probabilísticos ni KV-cache.

Padre: [ECHO.md](ECHO.md) · [NAVI9.md](NAVI9.md) · [AKIDA.md](AKIDA.md)
· [NAVI9_HYBRID.md](NAVI9_HYBRID.md). Núcleo C: `NAVI_AI_SNN/qn/`.

```bash
./navi10 --ask "hola"
./navi10 --ask "que es un tomate"    # cosecha Wikipedia → CAM → VERIFY
./navi10 --ask "que es KCC"
./navi10 --demo
./navi10 --bench
make navi10-tui-rs && ./navi10 --tui   # cara host: tesseract 4D + WSP
python3 tests/test_navi10.py
```

`--ask` ya no es ingest crudo. RogexWSP nombra el acto (charla / hecho /
emoción). Un «hola» es TALK. Un dato sin ficha se cosecha; sin extracto
es DESCONOCIDO. `--no-live` corta la red.

Entrenar (no backprop): [`NAVI10_TRAIN.md`](NAVI10_TRAIN.md) · `./navi10 --train`.
Metacognición (4 tests): [`NAVI10_META.md`](NAVI10_META.md) · `./navi10 --meta`.
LPU (córtex verbal, marcos hoy): [`NAVI10_LPU.md`](NAVI10_LPU.md).
Escala desktop + SLM propio: [`NAVI10_SLM.md`](NAVI10_SLM.md). **No entrenado.**

## Contrato que no se rompe

| Invariante | Cómo se sostiene |
| --- | --- |
| Heap-0 | CAM 4096 × 32 B estático. El paso no hace malloc. |
| 0 FPU | LIF leak 7/8, Hamming = popcount, SimHash entero. |
| WSP 16 B | `event → postal` idéntica a `wsp.h`. `_Static_assert` sigue en el kernel. |
| VERIFY / DESCONOCIDO | Hamming ≤ 3 **y** extracto. Si no, no hay hecho. |
| KCC | `destroyed=0`. El CAM solo crece o se refuerza. |
| Akida honesto | Sin probe no hay silicio. El STDP de hoy es LIF entero. |

No se añade un transformer. No se fingen julios de BrainChip.

## 1. Lo que faltaba (y qué se construyó)

### Dimensiones $Q_6/Q_8 \to Q_N$

Q6 son 64 LIF y 8 codewords `[6,3,3]`. Un noveno codeword en 6 bits
**rompe** la cota de Hamming (`d_min=3`). NAVI 10 no inventa ese bit.

$Q_N$ es el **producto** $Q_8 \times Q_8$:

- espacio de direcciones: $2^{16} = 65536$ vértices
- LIF: **un spoke** de 256 neuronas (nunca 65536)
- Hamming del producto: $\mathrm{popcount}(a \oplus b)$ — $O(1)$
- decoder de modo: `[8,4,4]` extendido, 16 codewords, $d_{\min}=4$
- 1-bit en cada mitad se recupera por `product_nearest` sin simular el cubo entero

Eso es la malla de hipercubos entrelazados. No es un embedding de
miles de floats.

### Motor de indexación sin heap (CAM)

GPT-5.6 reserva KV-cache en la GPU. NAVI reserva **4096 ranuras
estáticas** (sustituye el techo de 73 fichas de 7-WORLD):

```
WSP 16 B  +  vértice uint16  +  latencia  +  E[6]  +  peso STDP
```

Lookup exacto por FNV del paquete. Lookup ruidoso por bola de Hamming
(límite 3) + desfase temporal. En silicio el CAM compara en paralelo;
en host el pase está acotado por `CAM_SLOTS`.

### Evento → spikes (no parsedown)

No hay conversores léxicos rígidos en el camino caliente. El texto,
si llega, es una **señal de bytes**: se pliega (sensor) y se parte por
delimitadores `≤ 0x20`. Cada ventana es un tren de impulsos:

- vértice = SimHash-16 (localidad Hamming; un typo no avalancha)
- latencia = nibble alto del byte (0..15 ticks)
- 256 neuronas del spoke, $T_{\max}=16$

Eso es Stream-to-Spoke. La salida es un WSP de 16 B, no un token.

## 2. Akida: añadir / cambiar / no fingir

| Módulo | Hoy (host) | Cuando haya AKD1000/1500 |
| --- | --- | --- |
| STDP | LTP/LTD int8, gated por E[C] | edge-learning de la última FC (etiqueta *BrainChip*, no “STDP del fabric”) |
| Stream-to-Spoke | ticks enteros | misma cadencia nativa del chip |
| DAG | reserva ranura CAM | el peso vive en SRAM local del nodo |
| Atractores | vértice + latencia en el CAM | pesos locales; Hamming **y** retraso |

`E[6]` es la neuromodulación:

- **C** baja (`< 20`) → plasticidad ON → graba patrón
- **U** alta (`≥ 60`) → geodésica Hamming, ignora pesos
- **A** → extra de $I_{\mathrm{STIM}}$

Certeza alta y sin enseña: no se inventa un nodo. Eso es el contrario
de un LLM que rellena.

## 3. Bucle autónomo

```
[Entrada] ──> [Ingesta spikes] ──> [Evaluación Q_N / CAM]
                                         │
                        coincidencia     ┴     sin coincidencia
                        VERIFY O(1) WSP        DESCONOCIDO
                                                    │
                                               STDP / DAG
                                                    │
                                               nuevo atractor
                                               (hecho solo si hay extracto)
```

Razonar es **navegar** $A \to B$ por la geodésica de Hamming
(`popcount(A\oplus B)` hops, un bit por paso). No es P(token).

## 4. Cómo se mide (no LMSYS)

```bash
./navi10 --bench
./navi10 --demo
```

Tablero:

1. Topología aditiva y `graph_ok`
2. Q8 1-bit + producto 1-bit
3. CAM insert/recall, `destroyed=0`
4. SNN: desconocido → enseña → VERIFY; otro invento sigue DESCONOCIDO
5. E[6] abre/cierra plasticidad
6. Geodésica = Hamming
7. Núcleo C `sizeof` (Heap-0, 0 FPU)

Si un eje de fluidez sube y la verdad baja, 10 no avanza.

## 5. Techo honesto

NAVI 10 puede: enrutar en 16 B, recuperar con 1 bit de ruido, aprender
un patrón en el paso, callar sin extracto, llevar el mismo DAG a metal.

NAVI 10 no es GPT-5.6 Sol: no comprime internet, no genera prosa libre,
no tiene Akida hasta que el probe lea `HwVersion`. El salto de
capacidad es **topológico y de memoria**, no de parámetros.

## 6. TUI host (cara, no cerebro)

`tui/navi10-rs` es un compositor ratatui. Lanza `./navi10 --ask` por
tokio, pinta el stdout y **no** es el SNN. El cubo de la izquierda es
un hipercubo real: 16 vértices $(\pm 1)^4$, 32 aristas $d_H=1$,
rotación en 6 planos, proyección $4\mathrm{D}\to 3\mathrm{D}\to 2\mathrm{D}$,
Bresenham. El reactor cambia $\Delta\theta$ y el glifo con el estado
(IDLE/THINKING/TALKING). CPU/RAM via `sysinfo`; GPU via NVML si hay
`libnvidia-ml`, si no `nvidia-smi` / sysfs, si no un em dash.

```bash
make navi10-tui-rs
./navi10 --tui
# o, si el binario está en build/ o target/release, ./navi10 en un tty
```

Teclas: Esc sale · ↑↓ historial · PgUp/PgDn chat · Alt+↑↓ WSP ·
Ctrl+Y copia · rueda scroll. `/live` `/nolive` `/clear` `/copy`.
