# NAVI 8.7 — cómputo en inferencia (no es o1)

**No se convierte un catálogo en GPT-o1.** o1 es un transformer + SFT
de cadenas de pensamiento + PPO sobre tokens + un reward model.

8.7 toma *la ley de escala que sí aplica aquí*: más presupuesto **al
preguntar** (más ramas), premio 0/1 VERIFY, podar callejones y
reordenar estrategias que ya acertaron.

| o1 | 8.7 |
| --- | --- |
| P(token) | no hay tokens |
| CoT de miles de palabras | traza `closed✓ harvest✗ retrieve✓` |
| PPO / gradientes | contadores `pol_*` en context.db |
| Outcome 0/1 | VERIFY (extracto, eval, oracle) |
| Process RM | process=1 si el paso verifica |
| Árbol AlphaGo | ramas closed / count / memory / retrieve / harvest / opinión |
| Más segundos → más tino | `--think N` más ramas |

```
./navi87 --think 6 --ask "cuantas letras R hay en strawberry"
./navi87 --bulk 200
./navi87 --coach
./navi87 --repl
```

Barato (hola, código, puzzle, math): 1 paso.
Caro (pregunta abierta): hasta N ramas; la primera con outcome=1 gana.
