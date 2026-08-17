# NAVI 8.5 → 9 → 10

**No es el camino hacia ChatGPT.** El techo no es un transformer más
gordo. Es un agente local que no inventa, con WSP en el cable y Q6 en
el silicio.

Hoy (8.9 host): 8.8 enseña políticas por supervivencia (torneo VERIFY,
el malo se duerme) y 8.9 pone **dos voces** (propose/critic) más un
chat de escritorio C/Rust que cambia de modelo. Eso es el puente a 9
multiagente, no un o3 de OpenAI. Q6 sigue siendo LIF entero, no el que
habla.

## Qué haría más potente a NAVI (en orden)

1. **Harvest que no mienta** — título encaja, chrome fuera, `busca X`
   abre wiki/URL, no «sabre». Más potente = menos Dayro/Ciudad/Medium
   basura, no más tokens.
2. **Memoria de usuario de verdad** — nombre, lugar, temas de la
   sesión, última URL. El follow-up («what do you feel about that»)
   cita el extracto y niega la opinión.
3. **Q6 en el retrieve** — Hamming/LIF para *elegir* ficha, no para
   generar prosa. Eso sí es neuromórfico.
4. **Herramientas con parada** — `/learn`, dry-run de código, math,
   curl. Un plan de 8.5 que *ejecuta* y VERIFY corta.
5. **Akida/metal** — el mismo DAG en NPU si hay placa; si no, se dice.
6. **Nunca** SFT/GRPO «para que suene a GPT». Eso cambia de máquina.

## Techo (lo máximo que tiene sentido)

Navi puede llegar a ser:

- un asistente **local** que explica con fuente, escribe esqueletos
  del catálogo, calcula en enteros, recuerda quién eres y lo que
  pediste guardar;
- un **enrutador neuromórfico**: WSP 16 B entre módulos, Q6/Akida
  clasifica y verifica, la prosa sale de fichas;
- un agente de **horizonte medio**: varias herramientas, criterio de
  parada, 0 puentes inventados.

No puede (y no debe) llegar a:

- un modelo de mundo del internet entero;
- código arbitrario sin primitiva;
- «sentir» el UAP disclosure;
- ganar LMSYS contra GPT sin dejar de ser rxOS.

Ese techo es más alto que un chatbot de plantillas y más bajo que
GPT-5. Es el techo *correcto* para un unikernel.

## Puente 8.8 / 8.9 (ya en host)

- 8.8: población de organismos (`lab/navi88/pop.json`). Entrena con
  `--survive` y conversaciones reales (`--from-talk`).
- 8.9: las dos conciencias se hablan; el desk (`make navi89-desk`)
  deja ver 8.8 vs 8.9.
- 9 usará ese debate como postal WSP (quién/verbo/objeto) entre
  módulos, no como CoT de tokens.

## Navi 9 — «VERIFY en metal»

Estado: **PLAN.** Una sola mente (RLC), dos sitios de cómputo.

| Pieza | Qué entra |
| --- | --- |
| Cara | 8.5 in-OS (no solo host): misma voz, misma DB, harvest wiki/URL |
| Busca | `busca X` / URL / inglés «search» sin spellfix |
| Usuario | hechos (nombre, lugar, última página) en `context.db` |
| Q6 retrieve | score de ficha = Hamming/LIF + VERIFY de tokens |
| WSP | cada turno es una postal 16 B (quién/verbo/objeto/cuando) hacia el log |
| Coach | banco ≥ 40; ejes verdad/habilidad/calibración/coste |
| 7-NPU | si hay Akida, Q6-retrieve corre ahí; si no, software y se dice |

Fuera de 9: backprop, CoT de 8k tokens, opinión fingida.

Híbrido SNN+esqueleto (WSP latente, Q6 atractor, LLM solo como
boca atada): [`NAVI9_HYBRID.md`](NAVI9_HYBRID.md).

## Navi 10 — «agente WSP»

Estado: **PLAN**, después de 9 en metal.

| Pieza | Qué entra |
| --- | --- |
| Orquestación | plan de 8.5 ejecuta herramientas (learn, curl, code dry-run, math) |
| Parada | estado absorbente VERIFY o UNKNOWN (damping ya en 8.5) |
| Q8 / más cubo | solo si la cota de Hamming lo permite; no se inventa un 9º codeword en Q6 |
| Multi-sesión | `context.db` + KCC: páginas y lecciones no se podan |
| Coste | `navi joules` en el portátil de referencia; el número no se finge |

10 no es «Navi-GPT». Es el mismo transductor con manos (herramientas)
y un NPU opcional.

## Cómo se mide el salto

No MMLU. El tablero de [`NAVI_METRICS.md`](NAVI_METRICS.md):

- 8.5 hoy: coach 24/24 en el banco host.
- 9: ese coach **in-OS** + busca/URL + Q6-retrieve sin bajar verdad.
- 10: un flujo de 3 herramientas con VERIFY al final y julios medidos.

Si un eje (fluidez) sube y la verdad baja, 9/10 no avanzan. KCC:
destroyed=0 en todas las letras.
