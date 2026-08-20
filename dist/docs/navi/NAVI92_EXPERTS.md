# NAVI 9.2 para expertos

## Contrato

```
texto → split_prompt (cabeza / carga)
      → route.task ∈ {ask,sum,echo,teach,code,think,talk}
      → acto
      → VERIFY
      → render
```

La cabeza decide. La carga no vota. `classify_kind` mira `instruction_head`,
no el párrafo pegado. Ese fue el bug de Lazar: «frecuencia» en el cuerpo
abría Echo.

## Módulos

| Fichero | Rol |
| --- | --- |
| `navi9_tasks.py` | `Route(task, head, payload)` |
| `navi9_sum.py` | resumen extractivo, fuente = usuario |
| `navi9_echo.py` | encoder RogexWSP + cubo modal 256/384/320 Hz |
| `navi9_onto.py` | categorías BIO/MATTER/… + léxico que crece |
| `navi9_cli.py` | slash + readline Tab + `/think` animado |
| `navi9_prompt.py` | system prompt local (lista de actos, no SFT) |
| `navi9_social.py` | banco VERIFY de charla |
| `navi9_teach.py` | ingesta de docs → fichas |

Hereda 8.9: `propose/critic`, población, maze BFS, harvest 7.5.

## Echo

Si `vendor/RogexWSP` está, `text_to_symbol.encode` manda.
Patrones extra: `ayúdame` → `YO → DESEAR(COMUNICAR)`, `tengo X` →
`YO → TENER → X` si X es BIO. `Hidrógeno` → OBSERVAR + Z=1 (semilla IUPAC).
Palabra nueva + `live`: harvest → `infer_category` → `lab/navi9/lexicon.json`.

Audio: `p(t) ∝ vx+vy+vz`. No se afirma un espacio-tiempo extra.

## KPI

`python3 tests/test_navi9.py` — 32 tests.
`--train-social` — 10/10 en el banco de charla.
`--teach-ecosystem` — SPEC WSP, Q6, NAVI, rxOS.

## Techo

Akida, cámara y robot son **PLAN** (NAVI 10). Hoy el host es 9.2 zorro.
Q6 sigue siendo retrieve/atractor, no la boca.
