# NAVI 6.5 para dummies — once relés, no un loro

Un LLM apuesta la siguiente sílaba. NAVI 6.5 mueve **once relés**
(máscaras `G_*`) y **siempre** pasa por cinco cajas antes de hablar.

## Las cinco cajas

1. **PARSE** — ¿qué pediste? ¿un verso, una suma, un diagnóstico?
2. **RETRIEVE** — ¿tengo ficha? DAG, catálogo de código, hechos WSP.
3. **INFER** — hago la cuenta, recorro la causa, o monto el esqueleto.
4. **VERIFY** — si la ficha no existe, paro.
5. **RENDER** — pinto con la máscara correcta. El castellano sale aquí.

Si la caja 4 está vacía: **DESCONOCIDO**. Mejor eso que inventar.

## Los once relés

De 4.5: hablar, lógica, poema, noticias, código, operador rxOS.

Nuevos: razonar (enseña la traza), math entero, debug (el mecánico de
NAVI 6), plan, enseñar.

## Un minuto de ejemplos

- “quién eres” → `G_talk`. Dice 6.5, no GPT.
- “cuánto es 12 por 7 más 3” → `G_math`. 87. Sin coma flotante.
- “función en python que haga clamp” → `G_code` + dry-run.
- “haiku” → tres versos del banco. No memorizó internet.
- “status” → `G_rxos`. En la ISO ejecuta el Terminal. En el portátil lo nombra.
- “hilos GPU RAM” → `G_debug`. Spin-lock, no falta de VRAM.
- “escribe un compilador LLVM” → `DESCONOCIDO`.

## Lo que no vende

Cero qubits. Cero tesina. No escribe tu paper. No es clínico.
`./navi65 --ask "…"` o tecla `v` en la ISO.
