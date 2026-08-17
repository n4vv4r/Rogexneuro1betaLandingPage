# NAVI 8.8 — supervivencia de políticas

**No se entrena un transformer.** 8.8 es una *población* de organismos
de política (orden de detectores + ejemplos de conversación). El premio
es VERIFY 0/1. El que falla se **duerme**. El que acierta copia el
enunciado. Las fichas no se tocan (KCC: destroyed=0).

Esto es el paso hacia 9: la curva es biológica, no un learning-rate.

| LLM / o1 | 8.8 |
| --- | --- |
| SFT sobre tokens | ejemplos de conversación en el organismo |
| PPO / GRPO | torneo: fitness EMA + umbral sigmoide |
| matar pesos | organismo `alive=false` (el JSON se queda) |
| RM de preferencias | need/forbid + sin Wikipedia en social |
| dataset de internet | `memory.db` + lessons + banco de Roger |

```
./navi88 --survive 8 --from-talk
./navi88 --ask "heyyy"
./navi88 --repl
./navi88 --json --ask "hola"
```

Población: `lab/navi88/pop.json`.

Al principio (gen baja) la presión es floja: se explora. Luego la
sigmoide sube y los harvest-depredadores (los que abren Wikipedia en
un «entiendo») se duermen. Por eso la curva cuesta y después pega.
