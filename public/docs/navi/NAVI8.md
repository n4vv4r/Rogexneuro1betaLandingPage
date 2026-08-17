# NAVI 8 — 7.5 + contexto local + plan

**No es un LLM.** 8 es 7.5 con una base SQLite y un presupuesto de
razonamiento. Aprender = escribir un extracto en disco y reintentar.

La taxonomía Skills → Calibration → Strategy → Abstraction (Lambert /
post-training de modelos de razonamiento) se traduce al bucle RLC.
**No hay SFT, GRPO ni tokens de pensamiento.** Recompensa = VERIFY:
extracto con fuente, eval entero, o un «no lo sé» honesto.

```
./navi8 --ask "qué es knightscomputer.club"
./navi8 --learn https://www.rogexlaboratories.com/
./navi8 --repl
./navi8 --drill
./navi8 --train
./navi8 --reps 8
```

`--reps N` es el ensayo: acierto refuerza la ficha, fallo cosecha.
Más N → retrieve más picado. No es backprop. Informe: `lab/navi8/reps_report.json`.

Base: `lab/navi8/context.db` (páginas, hechos, lecciones).
Catálogo: el de 7.5 (`lab/navi7/catalog.json`).

## Las 4 fases (sin pesos)

| Fase | Qué hace aquí | Qué no hace |
| --- | --- | --- |
| **Skills** | Math, código, harvest con verificador. `--train` cosecha títulos extra. | Fine-tune, backprop |
| **Calibration** | Hola corto. «Eres consciente» ≠ «conciencia según el Corpus». `/learn` no se corrige a *lean*. | CoT de 2k tokens en un saludo |
| **Strategy** | Pregunta compuesta → plan de temas → una ficha por tema | Inventar el puente |
| **Abstraction** | `context.db` + harvest si VERIFY falla. Parar cuando hay extracto o se declara el hueco | Agente de 100k tokens |

Anti-sincofantería: si no hay extracto que una Rogex y el hermetismo, lo
dice. Goodhart: el 10/10 del drill no manda sobre un desconocido honesto.

## Si VERIFY falla

1. Busca en `context.db`.
2. Si el tema es una URL/host, **abre la página** (no DuckDuckGo).
3. Guarda el extracto (sin chrome de navbar) y responde.
4. Si no hay extracto: lo dice. No inventa.

## 7.5 vs 8

| | 7.5 | 8 |
| --- | --- | --- |
| Catálogo + harvest | sí | sí |
| Memoria de chat | `lab/navi75/memory.db` | eso + `context.db` |
| Tras un fallo | a veces «Te escucho» | mira la DB y cosecha |
| URL `.club` / sitio JS | a menudo DDG | scrape directo, DDG vetado |
| Pregunta compuesta | una sola ficha | plan + síntesis o hueco honesto |
| `--train` | laboratorio 7-WORLD | 4 fases + drill |
