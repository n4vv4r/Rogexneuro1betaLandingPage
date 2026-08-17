# NAVI 7.5 — asistente con memoria

**Estado: oficial en host y en el chat in-OS de rxOS 9.** No es un LLM.
7-NPU (Akida) sigue PLAN en [NAVI7.md](NAVI7.md).

7.5 es 7-WORLD con más bytes de “cerebro”: catálogo extra, harvest que
funciona, voz humana y una base SQLite. El bucle sigue siendo
PARSE-RETRIEVE-INFER-VERIFY-RENDER. Sin extracto: se dice que no se sabe.

```
./navi75 --ask "hola como te llamas"
./navi75 --ask "que comunidades autonomas tiene Spain"
./navi75 --ask "/search pedro sanchez"
python3 navi7_tui.py          # TUI Smoke Aero, motor 7.5
python3 tests/test_navi75.py
```

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
