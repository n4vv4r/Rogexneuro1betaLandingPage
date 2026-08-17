# NAVI 8.5 → 9.2 zorro → 10

La línea **host viva** es [NAVI 9.2](NAVI92.md) (zorro: una tarea por
turno, Echo, resume). Este papel sigue siendo el puente a metal / 10.

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

## Navi 9 — «cuervo»: aprende, no inventa

Estado: **HOST LIVE.** Metal/WSP/Q6-retrieve sigue el plan de abajo.

8.9 es avispa: sonda. Si no hay ficha, corta («no invento»). El desk
además llamaba con `--no-live`, así que ni siquiera cosechaba.

9 es cuervo / chimpancé: **sin ficha no inventa; va a buscar**.
Cosecha Wikipedia / DDG / scrape / `context.db`, VERIFY del extracto,
guarda la ficha (KCC) y entonces habla. Cualquier pregunta que no sea
oráculo o charla entra por ese tubo.

```
PARSE → (oráculo | ella | código) 
      → RETRIEVE catálogo+BD
      → si miss: LEARN (harvest)
      → MOUTH (extracto; LLM opcional atado)
      → si aún miss: DESCONOCIDO
```

| Pieza | Qué entra |
| --- | --- |
| Cara | `./navi9` + desk Tab 8.8/8.9/9 (9 va **con red**) |
| Ella | Navi, femenino, castellano, modelo de sí en `lab/navi9/self.json` |
| Aprende | sin `/learn`: curiosidad automática. Persistencia en catálogo + BD |
| Boca | extracto crudo, o `XAI_API_KEY` → grok atado (VERIFY de tokens) |
| Código | no pega un `for` de C si pediste COBOL: o primitiva del idioma, o harvest |
| Busca | wiki/URL/DDG; variantes («color de manzana» → manzana) |
| Q6 retrieve | score Hamming/LIF — sigue PLAN (el retrieve de 9 ya es Jaccard+VERIFY) |
| WSP | postal 16 B entre módulos — sigue PLAN |

Fuera de 9: backprop, CoT de 8k, opinión fingida, disfraz de personaje.

Híbrido SNN+esqueleto (WSP latente, Q6 atractor, LLM solo como
boca atada): [`NAVI9_HYBRID.md`](NAVI9_HYBRID.md).

**9.2 zorro** — elige la tarea (resume ≠ Echo). CLI: `./navi9` con `/ask /resume /echo /think` (Tab completa).

```bash
./navi9 --ask "color de manzana"
./navi9 --teach-ecosystem
./navi9 --echo "estoy solo"
./navi9 --repl
./navi9 --tui          # Tab → 9 cuervo (live)
XAI_API_KEY=… ./navi9 --ask "qué es un hipercubo"
python3 tests/test_navi9.py
```

Echo (evolución de WSP): [`ECHO.md`](ECHO.md).

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
