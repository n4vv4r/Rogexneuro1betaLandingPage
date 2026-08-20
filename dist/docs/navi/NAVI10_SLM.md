# NAVI 10 Desktop — SLM predictivo propio (plan de escala)

**Producto de esta línea:** app multiplataforma C/Rust para PCs normales
(Fedora, luego Windows/macOS). Cara: TUI/GUI. Cerebro: WSP + CAM +
SNN + **un SLM pequeño entrenado desde cero**.

**No es** la línea rxOS-robot (IA de control, no chat). Esa se parte
después. Aquí el SLM es el córtex verbal de un asistente de escritorio
que **no inventa hechos**.

**Estado hoy:** el LPU que responde «entropía/memoria» y «tristeza/
hardware» es un compositor de marcos (`navi10_lpu.py` +
`navi10_lpu_lex.py`). No hay corpus, no hay `.bin` de pesos, no hay
predicción del siguiente token. `navi10_lpu_train.py` es un bucle
AdamW de juguete. Eso hay que decirlo para no entrenar encima de una
mentira.

---

## 0. Lo que no se enseña (y por qué Apophis falló)

No se «cargan 1.2 millones de palabras» en una tabla.

| Cosa | Qué es de verdad |
| --- | --- |
| 1.2 M de vocablos | formas (lemas × flexiones × compuestos). Un diccionario. |
| Vocabulario BPE 32 768 / 50 304 | **subpalabras**. Con ellas se *componen* esas 1.2 M de formas. |
| Aprender una palabra | verla cientos–miles de veces **al lado de otras** (semántica distribucional). |
| Saber la masa de Apophis | hecho. Vive en la CAM / cosecha, no en los pesos. |

`2026 RX4` cayó en `lpu_inhibit` porque parece entidad inventada + cifra.
`Apophis` es un asteroide real: el orquestador fue a cosecha, Wikipedia
no dio extracto verificable, y dijo DESCONOCIDO. Eso es correcto como
hecho. El SLM **no** debe rellenar «6.3×10¹⁰ kg» de memoria paramétrica
si la CAM está vacía; como mucho redacta *alrededor* de un extracto
inyectado.

Contrato que no se rompe al añadir el SLM:

- Heap-0 / 0 FPU del **paso SNN** en el unikernel (otra binario).
- En desktop el SLM **sí** usa FPU/SIMD. Es otro proceso/módulo.
- VERIFY exige extracto. DESCONOCIDO si hay cifra y no hay CAM.
- `destroyed=0`. El SLM no borra fichas.
- Akida: PLAN. El mapeo 8 ejes → spikes se diseña, no se finge silicio.

---

## 1. Dos SKUs (elige uno y no lo muevas)

`d=768, L=12, H=12` no es «60 M». Es el orden de GPT-2 small (~110–130 M
con vocab 32k–50k). En un portátil sin GPU duele.

| SKU | Forma | Parámetros | Pesos INT8 | Para quién |
| --- | --- | --- | --- | --- |
| **LPU-S** | L=8, d=512, H=8, GQA 8→2, SwiGLU 1536, vocab 32768, ctx 1024 | ~50–70 M | ~60–80 MiB | CPU de PC normal, primer `.bin` |
| **LPU-M** | L=12, d=768, H=12 GQA 12→3, SwiGLU 2048, vocab 50304, ctx 2048 | ~110–150 M | ~120–180 MiB | desktop ≥16 GiB, GPU opcional |

Empieza por **LPU-S**. Si el tubo de datos y el export C/Rust funcionan,
crecer a M es cambiar el header, no rediseñar.

Fórmula grosera (emb + L × (attn + SwiGLU)):

```
emb   ≈ V · d
attn  ≈ 2·d·d + 2·d·d_kv     (GQA: d_kv = d · n_kv / n_q)
ffn   ≈ 3 · d · d_ff         (SwiGLU: Wg, Wu, Wd)
```

RoPE no añade pesos. RMSNorm es 1 vector por capa.

---

## 2. Piezas que hay que diseñar (artefactos, no ideas)

Cada fila es un archivo o crate que debe existir antes de «ya predice».

| # | Artefacto | Vive en | Contenido |
| --- | --- | --- | --- |
| A | Manifiesto de corpus | `lab/navi10/lpu/corpus.json` | URLs, licencias, bytes, hash, %ES/%EN |
| B | Limpiador | `tools/lpu/clean.py` | UTF-8, quita boilerplate wiki, **conserva** puntuación |
| C | Trainer BPE + 64 IDs WSP | `tools/lpu/bpe.py` + `lab/navi10/lpu/vocab.json` | merges, specials |
| D | Spec del modelo | este papel §3 | L, d, heads, GQA, ctx, dtype |
| E | Trainer pretrain | `tools/lpu/train.py` (PyTorch) | CE, AdamW, cosine, ckpt |
| F | Dataset SFT WSP | `lab/navi10/lpu/sft.jsonl` | pares con `[TALK]` / `[DESCONOCIDO]` / `[INHIBIT]` |
| G | Export `.bin` | `tools/lpu/export.py` | header + tensores INT8/FP16 |
| H | Runtime inferencia | `tui/navi10-lpu/` (Rust) o `NAVI_AI_SNN/lpu/` | mmap, matmul AVX2, decode |
| I | Orquestador | `navi10_engine` / crate `navi10-orch` | CAM → prefix; inhibit → logits |
| J | App desktop | `tui/navi10-rs` ahora; luego crate `navi10-app` | TUI, más tarde ventana nativa |

Python **solo entrena y exporta**. El usuario de la app no instala
PyTorch. El binario C/Rust + `navi_lpu_weights.bin` es el producto.

---

## 3. Arquitectura NAVI-LPU Core (LPU-S, la que se implementa primero)

Decoder-only, prefill + decode.

```
token_id → E[id] + RoPE
for layer in 0..8:
    x = x + GQA_Attn(RMSNorm(x))     # 8 query, 2 kv
    x = x + SwiGLU(RMSNorm(x))       # d_ff=1536
logits = W_out · RMSNorm(x)          # tied or untied con E
```

**64 tokens reservados (IDs 0–63), no se mergean en BPE:**

| ID | Token | Quién lo escribe |
| --- | --- | --- |
| 0 | `<pad>` | batch |
| 1 | `<bos>` | runtime |
| 2 | `<eos>` | runtime |
| 3 | `<unk>` | BPE fallback |
| 4 | `[TALK]` | orquestador / SFT |
| 5 | `[VERIFY]` | orquestador si CAM hit |
| 6 | `[DESCONOCIDO]` | orquestador si inhibit |
| 7 | `[ACTION_REQ]` | orquestador |
| 8 | `[INHIBIT]` | orquestador (bloquea muestreo de dígitos) |
| 9 | `[CAM_MATCH]` | orquestador + texto de la ficha |
| 10 | `[CAM_MISS]` | orquestador |
| 11 | `[FACT]` | orquestador |
| 12–15 | `[E_V]`… ejes (opcional, SFT) | puente SNN |
| 16–63 | reservados | no usar |

El resto (64…32767) son merges BPE sobre el corpus.

**Puente neuromórfico (diseño, no silicio):**

Tras el último RMSNorm, una cabeza lineal `d → 8` (los ejes del LPU
actual). Eso **no** sustituye al SLM. Es el adaptador para rate-code
hacia Q8/Akida cuando haya placa. Hasta entonces se serializa a E[6]+2
auxiliares y se guarda junto al WSP. Cero julios inventados.

---

## 4. Cómo se aprenden de verdad las palabras

### Fase 1 — Corpus y BPE

**No empieces en 30 GB.** El primer tubo se prueba con 1–3 GB. Si el
loss baja y el BPE segmenta «entropía / tristeza / hardware / Apophis»,
entonces escalas.

Orden de descarga (limpio, con licencia):

1. Dump Wikipedia ES + EN (`eswiki`, `enwiki` latest pages-articles).
   Extractor: WikiExtractor o `wikiteam`. 5–15 GB de texto útil.
2. Proyecto Gutenberg (literatura).
3. Un slice de OSCAR / CulturaX **filtrado** (no el crawl entero).
4. Código: subset de The Stack (C, Rust, Python) — el SLM tiene que
   leer `wsp.h` y un `fn` sin romperse.
5. **Dialecto NAVI:** `docs/*.md`, `CHANGELOG.md`, semillas CAM,
   diálogos SFT hechos a mano. Peso alto en el sampler.

Limpieza:

- UTF-8 NFC. Conserva `¿ ¡ … —`.
- Tira navboxes, «References», HTML, tablas rotas.
- Un documento = un artículo / un capítulo. JSONL:
  `{"id","lang","src","text"}`.
- Dedup MinHash. Sin eso el modelo memoriza plantillas wiki.

BPE:

```bash
# objetivo, no comando que exista hoy
python3 tools/lpu/bpe.py train \
  --jsonl lab/navi10/lpu/clean/*.jsonl \
  --vocab-size 32768 --specials 64 \
  --out lab/navi10/lpu/vocab.json
```

Criterio de listo: «apophis», «entropía», «throttling», «dH» no explotan
en 12 bytes sueltos; las 1.2 M de formas **no** necesitan un id cada una.

Disco: reserva 80–150 GB (dumps crudos + limpio + shards + ckpts).

### Fase 2 — Red (en PyTorch primero)

Un solo archivo de config `lab/navi10/lpu/model.json` con los números
de LPU-S. Implementación de referencia en Python:

- RMSNorm, RoPE, GQA, SwiGLU, causal mask.
- `forward(tokens) → logits`.
- Tests: shapes, causalidad (token i no ve i+1), RoPE par/impar.

Nada de esto entra al kernel Heap-0.

### Fase 3 — Pretrain + SFT

**Pretrain (next-token):**

- Loss: CE.
- AdamW, β=(0.9, 0.95), wd=0.1, cosine con warmup 2–4%.
- ctx=1024 (S) / 2048 (M).
- Batch efectivo 256–512 k tokens (grad accum si la GPU es chica).
- Tokens vistos (orden de magnitud, LPU-S):
  - humo: 0.2–0.5 B (un día en 1×RTX 3060/4060)
  - útil: 2–10 B (varios días–2 semanas)
  - CPU only: solo el humo. No intentes 10 B en el iGPU.

Métrica honesta: `loss` y `ppl` en un holdout ES y uno EN. No «ya
conoce 1.2 M palabras». Una sonda: el modelo completa
`La entropía de un sistema aislado tiende a` sin plantilla.

**SFT WSP** (después, corpus pequeño y limpio):

```
<bos>[FACT] masa de Apophis [CAM_MISS][INHIBIT]
[DESCONOCIDO] Certeza 0%. Sin extracto no cifro.<eos>

<bos>[FACT] [CAM_MATCH] Apophis masa ≈ 2.7e10 kg fuente=...
[VERIFY] La masa estimada de Apophis es … (cito la ficha).<eos>

<bos>[TALK] relación entropía memoria en rxOS
…prosa, sin cifras inventadas…<eos>
```

El SFT enseña **cuándo callar**, no la masa.

### Fase 4 — `navi_lpu_weights.bin`

Cabecera fija (little-endian), luego tensores en orden canónico:

```
magic      "NLPU"          4
version    u16             1
dtype      u8              0=f32 1=f16 2=i8
n_layer    u16
d_model    u16
n_head     u16
n_kv       u16
d_ff       u16
n_vocab    u32
ctx        u32
specials   u16             64
qscale     f32             si dtype=i8
pad        …
tensors    row-major
```

Carga: `mmap` + pointer a cada peso. Arranque en decenas de ms.
Inferencia: matmul AVX2 (desktop x86). NEON cuando toque ARM.
GPU (Metal/CUDA/Vulkan) es **fase posterior**, no bloquea el primer
`.bin`.

Cuantización INT8 **después** de que FP16 genere texto legible.
No cuantices un modelo que aún no habla.

### Fase 5 — Bucle cognitivo (esto ya está esbozado en `think()`)

```
texto
  → WSP (intención: TALK / FACT / EXEC)
  → CAM (dH, extracto, flags INHIBIT/ACTION)
  → prefix de tokens especiales
        [CAM_MATCH] + ficha    o   [CAM_MISS][INHIBIT]
  → SLM decode
        si INHIBIT: máscara de dígitos + sesgo a [DESCONOCIDO]
        si CAM_MATCH: el hecho va en el contexto, no se «recuerda» del peso
  → postal WSP de salida + lpu_tokens
```

El SLM **nunca** es la autoridad de una cifra. Si Apophis tiene ficha,
el texto sale fluido **y** la cifra es la de la ficha. Si no, DESCONOCIDO
(el harvest puede crear la ficha; el SLM no).

---

## 5. App desktop C/Rust (multiplataforma)

Hoy: `./navi10` (Python orquesta) + `tui/navi10-rs` (cara).

Destino:

```
tui/navi10-app/          # binario que el usuario lanza
  src/main.rs            # ratatui; después egui si quieres ventana
tui/navi10-lpu/          # crate: mmap + decode
tui/navi10-orch/         # WSP + CAM + inhibit (portar desde Python)
lab/navi10/lpu/
  vocab.json
  navi_lpu_weights.bin   # no se commitea si pesa > GitHub
```

El SNN/CAM/WSP se portan; no se reescriben como un GPT. El SLM es un
crate al lado, no el proceso entero.

Orden de port:

1. Vocab + tokenizer Rust (byte-identical al Python).
2. Forward LPU-S en Rust, comparar logits con PyTorch (atol 1e-3 FP16).
3. Decode greedy + temperature.
4. Enganchar orquestador: Python llama al binario **o** el TUI llama al
   crate (el segundo es el producto).
5. Empaquetar: un tarball `navi10-linux-x64` = binario + `.bin` + vocab.

Windows/macOS: mismo crate, mismo `.bin`. No hay un modelo por OS.

---

## 6. Plan de trabajo por semanas (lo que *tú* haces)

No son sprints de marketing. Son puertas: si la puerta N no abre, no
pases a N+1.

### Semana 0 — Contrato y carpetas

- [x] Congelar LPU-S en `lab/navi10/lpu/model.json`.
- [x] Crear `tools/lpu/` y `lab/navi10/lpu/`.
- [x] Lista de 64 specials (tabla §3) en un JSON, IDs inmutables.
- [ ] Decidir GPU o CPU-humo. `nvidia-smi` / no hay placa.

### Semana 1 — Corpus mínimo + BPE (puerta 2 abierta en dialecto)

Implementado en repo (sin dump de Wikipedia todavía):

- [x] `tools/lpu/clean.py` — NFC, ¿¡, JSONL, manifesto `corpus.json`.
- [x] `tools/lpu/bpe.py` — BPE byte-level, IDs 0..63 congelados (`[TALK]=4`).
- [x] Shard `lab/navi10/lpu/clean/dialect.jsonl` desde `docs/`.
- [x] Tests `tests/test_navi10_lpu_week1.py` + `tools/lpu/probe_bpe.py`.
- [ ] Bajar `eswiki` + `enwiki` (el 1 GB público). El BPE de 32k se
      reentrena entonces; hoy el vocab del dialecto paró en ~8.7 k
      merges (no hay 32 k pares con freq≥2 en 350 KiB).

### Semana 3 — Modelo PyTorch + overfit (puerta: memoriza 32 líneas)

- [x] RMSNorm, RoPE, GQA, SwiGLU en `tools/lpu/model.py`.
- [x] `tools/lpu/train_overfit.py` — 32 líneas de `docs/NAVI10.md`.
- [x] Medido en CPU: loss 9.24 → 0.0098 en 80 pasos; greedy verbatim
      (`lab/navi10/lpu/overfit_report.json`). 33.12 M params (vocab 8784,
      no 32 k). El `.pt` no se commitea.
- [ ] Si re-corres y falla el greedy, RoPE/máscara/RMSNorm están mal.
      No bajes Wikipedia.

### Semana 4 — Shards + motor de pretrain (tubo listo; corpus aún chico)

- [x] `tools/lpu/dataset.py` — JSONL → `.bin` uint16, mmap, holdout 10% por documento.
- [x] `tools/lpu/train.py` — cosine+warmup 1k→3e-4→3e-5, accum, PPL holdout.
- [x] Overfit: greedy **solo al final**. En el bucle, `tf_acc` (un forward).
- [x] Dialect pack: ~164 k train / 4.5 k holdout. **No es 1–3 GB.**
- [x] `tools/lpu/process_wiki.py` — streaming `bz2`+`iterparse`; `--api` para muestra.
- [x] `scripts/fetch_eswiki.sh` — curl `-C -` del dump, o `SAMPLE=1` vía API.
- [x] BPE incremental (heap) + JSONL en stream. `[ACTION_REQ]=7` (congelado; no 8).
- [~] Dump eswiki (~4.9 GiB bz2) en descarga: `DOWNLOAD_ONLY=1 ./scripts/fetch_eswiki.sh`.
- [x] Retrain overfit 57.68 M + export FP16 (`tools/lpu/export.py`).
- [x] KV-cache + `generate.py`. SFT WSP (`train_sft.py`). BPE C/Rust (`bpe_native.bin`).
- [x] Dump bz2 entero extraído → `lab/navi10/lpu/clean/eswiki.jsonl` (~2.05 M artículos).
- [x] Índice local + parsers PDF (`navi10_local.py`, `--index-wiki`, `--feed`).
- [ ] `bpe.py --min-frequency 8` + pack + pretrain 0.5 B+.
- [ ] Inferencia matmul AVX2 en el crate (hoy el crate tokeniza; el forward sigue en PyTorch).

```bash
# dump real (varios GB, reanudable):
./scripts/fetch_eswiki.sh
# muestra API (no sustituye al dump):
SAMPLE=1 MAX_PAGES=4000 ./scripts/fetch_eswiki.sh
python3 tools/lpu/bpe.py lab/navi10/lpu/clean/eswiki.jsonl --vocab-size 32768
python3 tools/lpu/probe_bpe.py
```

```bash
python3 tools/lpu/dataset.py pack lab/navi10/lpu/clean --out lab/navi10/lpu/shards
python3 tools/lpu/train.py --nano --max-steps 50 --seq 128 --accum 4 --warmup 10
# GPU, receta de diseño:
# python3 tools/lpu/train.py --seq 512 --accum 64 --warmup 1000 --max-steps 10000
```

### Semana 7 — SFT WSP (puerta: inhibit no emite dígitos)

- [ ] 2–5 k pares hechos a mano + plantillas CAM_MATCH / CAM_MISS.
- [ ] Incluir Apophis: sin ficha → `[DESCONOCIDO]`; con ficha → cita.
- [ ] Test automático: prompt de masa + `[INHIBIT]` ⇒ cero `\d+ kg`.

### Semana 8 — Export + inferencia Rust (puerta: logits ≈ PyTorch)

- [ ] `export.py` → `navi_lpu_weights.bin`.
- [ ] Crate `navi10-lpu`: mmap, matmul, decode.
- [ ] Diff de logits en 16 prompts.
- [ ] El TUI deja de llamar al compositor de marcos cuando el `.bin`
      existe; si no hay `.bin`, el compositor se queda como fallback
      honesto (no se finge SLM).

### Semana 9 — Orquestador

- [ ] Prefix `[CAM_MATCH]` / `[INHIBIT]` desde `think()`.
- [ ] Harvest de Apophis: si hay extracto con dígitos, VERIFY + SLM
      redacta; si no, inhibit (igual que RX4).
- [ ] Footer `lpu_tokens=` = tokens **muestreados**, no palabras del
      compositor.

### Semana 10 — Empaque desktop

- [ ] `make navi10-app` produce `build/navi10-app` + pesos.
- [ ] `./navi10` en tty lanza la app si el `.bin` está.
- [ ] README: RAM mínima, tamaño del tarball, «no es ChatGPT».

---

## 7. Recursos en *tu* Fedora

| Recurso | Mínimo para el tubo | Cómodo para LPU-S útil |
| --- | --- | --- |
| RAM | 16 GiB | 32 GiB (dataloader + modelo) |
| Disco | 80 GiB libres | 200 GiB |
| GPU | ninguna → solo overfit/humo | 8–12 GiB VRAM (3060/4060/Arc) |
| Tiempo | 1 semana al tubo | 2–4 semanas a un S que hable |

Si no hay NVIDIA/AMD usable: entrena el overfit y el SFT de juguete en
CPU; el pretrain grande se hace el día que haya GPU (colab, un torre,
un runpod). El diseño no cambia.

---

## 8. Criterios de no-mentira

- No commitear un `.bin` aleatorio y llamarlo «entrenado».
- No decir «conoce 1.2 M palabras» porque el vocab sea 32k.
- No dejar que el SLM responda masas sin `[CAM_MATCH]`.
- No mezclar esta app con la IA de robótica de rxOS: otro binario,
  otro loop (sentido → motor), mismo WSP si acaso.
- El compositor actual (`navi10_lpu.py`) se queda hasta que el `.bin`
  pase el diff de logits. Entonces se etiqueta `legacy-frames`.

---

## 9. Primera acción concreta (mañana, no «fase 1 abstracta»)

```bash
mkdir -p tools/lpu lab/navi10/lpu
# 1. nvidia-smi || echo "CPU-only: solo overfit"
# 2. escribir lab/navi10/lpu/model.json  (LPU-S)
# 3. escribir lab/navi10/lpu/specials.json (IDs 0-63)
# 4. bajar UN dump: eswiki pages-articles, no OSCAR
```

Cuando eso esté, se implementa `tools/lpu/clean.py` y `bpe.py` en el
repo. No se toca el orquestador hasta que un modelo **overfittee**
un párrafo. Si no memoriza 32 líneas, no va a aprender el español.
