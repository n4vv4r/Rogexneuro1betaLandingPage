# NAVI 8.5 — Markov + Monte Carlo sobre fichas

**No es un LLM.** 8.5 es 8 con un espacio de estados discreto. Cada paso
del bucle PARSE-RETRIEVE-INFER-VERIFY-RENDER es un estado \(S_t\). Se
simulan N trayectorias y se elige la de mayor VERIFY.

```
./navi85 --ask "qué significa ataraxia"
./navi85 --ask "haz codigo en c de hipercubo de 6 (Q6)"
./navi85 --repl
./navi85 --train
./navi85 --reps 8              # más ensayos → retrieve más picado
./navi85 --train --reps 5      # laboratorio y luego ensayos
```

## Más repeticiones = más preciso (sin backprop)

Cada ensayo es VERIFY, no un gradiente:

1. Se pregunta una ficha / un fallo viejo / el drill.
2. Si el extracto verifica: `score++` en esa ficha. El retrieve la prioriza.
3. Si falla: se cosecha (con red) y se reintenta.
4. La curva `rate` por ronda se guarda en `lab/navi8/reps_report.json`.

Por eso 3 reps y 20 reps no son lo mismo: las fichas que ya acertó pesan más
frente a vecinas ruidosas. KCC: nadie se poda. Un «no lo sé» honesto sigue
siendo un acierto de calibración si no hay extracto.

## Qué es (y qué no)

| Pedido (vídeo / metafísica) | Aquí |
| --- | --- |
| Cadenas de Markov de razonamiento | Estados `retrieve → harvest → verify → answer\|unknown` |
| Monte Carlo / lookahead | N caminos: catálogo, tema anterior, harvest |
| Entropía de Shannon | Sobre scores de retrieve: picado → ficha; plano → harvest o UNKNOWN |
| Damping / PageRank | 3 repeticiones sin ficha nueva → UNKNOWN |
| k-Markov | El follow-up («y qué relación…») arrastra el tema anterior |
| e-prop / SLAYER / STDP / tensores | **PLAN.** Viven en `NAVI_AI_SNN/` (Q6 entero). No son el chat. |
| Fase compleja \(Ae^{i\theta}\) | WSP 16 B ya lleva amplitudes **clásicas**. No son qubits. |

Sin extracto que verifique el tema: lo dice. No inventa Dayro Moreno
para «ataraxia» ni Konoe para «komo estas».

## 8 vs 8.5

| | 8 | 8.5 |
| --- | --- | --- |
| Skills / calibración / plan | sí | sí |
| Follow-up («y la relación…») | frágil | k-Markov: tema anterior + nuevo |
| Retrieve plano (muchas fichas a 0.2) | a veces se queda la primera | alta entropía → harvest o UNKNOWN |
| Código Q6 / WSP | DESCONOCIDO o wiki Compilador | primitivas del catálogo (enteras) |
