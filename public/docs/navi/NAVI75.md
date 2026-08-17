# NAVI 7.5 — asistente con memoria

**Estado: oficial en host y en el chat in-OS de rxOS 9.** No es un LLM.
7-NPU (Akida) sigue PLAN en [NAVI7.md](NAVI7.md).

7.5 es 7-WORLD con más bytes de “cerebro”: catálogo extra, harvest que
funciona, voz humana y una base SQLite. El bucle sigue siendo
PARSE-RETRIEVE-INFER-VERIFY-RENDER. Sin extracto: se dice que no se sabe.

```
./navi75 --ask "hola como te llamas"
./navi75 --ask "qué es fotosintesis"
./navi75 --ask "/search pedro sanchez"
./navi75 --repl                 # mismo proceso: recuerda el hilo
./navi75 --learn "mitocondria"  # una ficha nueva (hace falta red)
./navi75 --train                # laboratorio: Wikipedia + oráculos + bench
./navi75 --drill                # si VERIFY falla, cosecha y repite (máx 3)
python3 navi7_tui.py
python3 tests/test_navi75.py
```

`--ask` suelto **no** es un chat: cada invocación carga el catálogo y
responde. Para un hilo: `--repl` o la TUI.

## Entrenar una versión más capaz (desde la terminal)

NAVI no hace backprop. Entrenar = **crecer el catálogo con extractos
con fuente**. Más fichas = más “cerebro”. KCC: las fichas no se borran.

```bash
# 1) laboratorio completo (red; las fichas viejas se saltan)
./navi75 --train
# equivale a: python3 navi7_lab.py train

# 1b) taladro de razonamiento: si VERIFY falla, cosecha y repite
./navi75 --drill

# 2) fichas sueltas que te importen
./navi75 --learn "mitocondria"
./navi75 --learn "habeas data"
./navi75 --learn "comunidad autonoma"

# 3) comprobar
./navi75 --ask "qué es mitocondria"
python3 tests/test_navi75.py
```

Catálogo: `lab/navi7/catalog.json`. Memoria (tu nombre, turnos):
`lab/navi75/memory.db`.

Para meter un dominio entero, añade títulos a `HARVEST` en
`navi7_lab.py` y vuelve a `--train`. Sin extracto no se aprende.

Memoria: `lab/navi75/memory.db` (fichas, turnos, hechos como tu nombre).

## Qué arregla respecto a 7

| Síntoma en 7 | 7.5 |
| --- | --- |
| `/search` → Google HTTP 0, tcp connect fail | Wikipedia REST + DuckDuckGo; Google es último recurso |
| `curl https://www.rogexlaboratories.com/` → dns no A | DNS sigue CNAME y la sección additional |
| «hola como te llamas» → collage WSP `YO -> PREGUNTAR` | «Me llamo NAVI. Soy la 7.5…» |
| «comunidades autonomas / Spain» → DESCONOCIDO de plantilla | Ficha 7.5 + harvest si hace falta |

## Qué no es

- No predice el siguiente token.
- No es backprop ni un transformer más gordo.
- El “modelo más pesado” son más fichas + SQLite + harvest, no una GPU.

KCC: las fichas solo crecen. Los turnos de chat se recortan por antigüedad.

## Cómo se hizo (y se replica) la captura de conversa

No fue un screendump de QEMU. Fue una **conversación real** del motor host
y un render Dark Aero de esas respuestas.

### 1. Preguntar de verdad (esto es lo que hay que replicar)

```bash
cd /home/roger/REALRXOS/RXos   # o el clone del repo

./navi75 --ask "hola como te llamas"
./navi75 --ask "que es fotosintesis"
./navi75 --ask "/search pedro sanchez"
./navi75 --ask "cuanto es 12 por 7 mas 3"
```

TUI (misma mente, chat interactivo):

```bash
python3 navi7_tui.py
```

### 2. Guardar el JSON y pintar el banner (opcional)

```bash
python3 - <<'PY'
import json
from pathlib import Path
from navi75_engine import NAVI75Engine
from navi75_memory import Memory
from navi7_lab import CAT_PATH

db = Path("/tmp/navi75-banner.db")
if db.exists():
    db.unlink()
eng = NAVI75Engine(live=True, db_path=db)
if CAT_PATH.exists():
    eng.load(CAT_PATH)
asks = [
    "hola como te llamas",
    "que es fotosintesis",
    "/search pedro sanchez",
    "cuanto es 12 por 7 mas 3",
]
out = []
for q in asks:
    t = eng.think(q)
    out.append({"q": q, "reply": t.reply, "mask": t.mask, "live": t.live})
    print("Q:", q)
    print("A:", t.reply[:200].replace("\n", " | "))
    print("---")
Path("/tmp/navi75-banner.json").write_text(json.dumps(out, ensure_ascii=False, indent=2))
PY

python3 tools/render_navi75_banner.py
# sale: docs/screenshots/rxos9/15-navi75-live.png
```

`live=True` exige red en el host. Sin red, fotosíntesis y las CCAA salen
del catálogo; `/search` no inventa.

### 3. Dentro de la ISO (USB / QEMU)

Tecla `v` → Navi 7.5. Primero `www on` en el Terminal si quieres harvest.

```
hola como te llamas
que es fotosintesis
/search pedro sanchez
cuanto es 12 por 7 mas 3
```

La ISO publicada en GitHub (v9.0.0 de las 04:00) **no** lleva este kernel.
La metal que se flashea desde `build/rxOS-9.0.0-metal.iso` **sí**, si se
reconstruyó después del commit 7.5.
