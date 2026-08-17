# NAVI 9 — esqueleto + SNN (no un GPT con púas)

**Tesis.** Una IA neuromórfica *sola* no habla. Un LLM *solo* no
pertenece a rxOS. NAVI 9 es las dos cosas **en roles distintos**:

| Capa | Qué es | Qué no es |
| --- | --- | --- |
| **Esqueleto** | parse → WSP 16 B → plan de herramientas | P(token) libre |
| **Campo** | Q6 / LIF / Hamming elige atractor | prosa |
| **Carne** | catálogo + harvest + memoria (KCC) | pretrain de internet |
| **Boca** | render de extracto o plantilla; LLM *opcional* y **atado** | hechos inventados |

El comentario que originó Q6 (*neuromorphic fields, multidimensional
geometries, I Ching, Sri Yantra*) ya está **traducido** en el RFC:
64 hexagramas = vértices de Q₆, no un operador. Lo que sigue son
*más geometrías con test*, no más símbolos.

Ver [`NAVI_AI_SNN/RFC-2026-08-Q6.md`](../NAVI_AI_SNN/RFC-2026-08-Q6.md).
Regla del laboratorio: código que se puede falsear.

---

## 1. Por qué «comprimir el LLM» no es meter pesos en 64 LIF

Un transformer de 8 B parámetros no cabe en `navi_q6_t` ni en un
paquete WSP. Quien prometa eso miente.

Lo que **sí** se comprime es la *función de control* del LLM:

```
texto  →  intención  →  acto  →  palabras
          ^^^^^^^^       ^^^^
          WSP 16 B       Q6 (8 codewords [6,3,3])
```

El LLM grande hace esas dos flechas en float y 10⁵ tokens de contexto.
NAVI las hace en 16 bytes + 64 enteros. La tercera flecha (palabras)
sale de una **ficha** o de un oráculo. Si no hay ficha: DESCONOCIDO.

Eso es el híbrido honesto. No es AGI. Es un esqueleto que un SNN puede
llevar en metal.

---

## 2. Cable: WSP como latente, Q6 como memoria asociativa

```
  tú> frase
       │
       ▼
  PARSE  (8.9 classify + detectors)  ── opcional: LM solo emite WSP
       │
       ▼
  ┌─────────────────────────────────────┐
  │  WSP 16 B                           │
  │  who verb obj when │ E[6] VAD-CUB  │
  │  domain generator  │ flags seq     │
  └───────────┬─────────────────────────┘
              │ 6 bits de (verb,domain) o hash
              ▼
  ┌─────────────────────────────────────┐
  │  Q6  64 LIF  codebook 8             │
  │  atractor = modo:                   │
  │  talk │ logic │ retrieve │ refuse   │
  │  code │ memory │ maze │ harvest     │
  └───────────┬─────────────────────────┘
              │
              ▼
  ACT  (herramienta o ficha) → VERIFY → RENDER
```

**Compresión 1 — vocabulario de actos.**  
Los 32 átomos WSP (`PREGUNTAR`, `RECORDAR`, `CREAR`, `DESCONOCIDO`…)
son el «léxico mental». Un LLM de 50k tokens se proyecta a 32 verbos.
Eso *sí* cabe.

**Compresión 2 — 8 modos.**  
El codebook [6,3,3] no admite un 9º codeword (cota de Hamming). Los 8
modos de arriba son el techo de Q6. Más modos ⇒ otro cubo (ver §4),
no un 9º bit mágico.

**Compresión 3 — retrieve.**  
Hash del WSP o de los tokens del tema → vértice 0..63. Un bit de ruido
en el hash cae en un vecino; el LIF tira al codeword. KPI ya medido
en el RFC (1-bit 48/48). Eso sustituye al “embedding + ANN” del LLM
en el **control**, no en el significado de todas las palabras.

**Compresión 4 — render atado (LLM opcional).**  
Si hay un modelo local pequeño:

- entrada = WSP + extracto + máscara «no inventes sujetos»
- salida = prosa que **tiene** que contener tokens del extracto
- si VERIFY (solape de claves) falla → se tira el texto, se cita el
  extracto crudo

Sin esa pinza, el LLM es ChatGPT con Q6 de adorno.

---

## 3. Dos consciencias, ahora en el cable

8.9 ya tiene propose / critic. En 9 cada voz es una postal:

| Voz | WSP generator | Q6 mode |
| --- | --- | --- |
| propose | `WSP_GEN_PLAN` | retrieve / harvest / maze |
| critic  | `WSP_GEN_REASON` | refuse si no VERIFY |
| explorer (10) | `WSP_GEN_DEBUG` | harvest / tool |

El log del TUI deja de ser strings `propose✓` y pasa a hex de 16 B.
Eso *es* el razonamiento interno, no un CoT fingido.

---

## 4. Más allá de Q6 (geometrías con test)

El colaborador habla de campos, I Ching, Sri Yantra. Q6 ya usó la
primera. Las siguientes solo entran si ganan un banco contra Q6.

| Idea | Traducción medible | Test |
| --- | --- | --- |
| **Hexagramas / líneas mutantes** | vértice + arista de Hamming (ya es Q6). Orden Fuxi vs King Wen = dos *walks* | retrieve: ¿un orden recupera más fichas con 1 typo? |
| **Sri Yantra (9 triángulos)** | 9 atractores. Q6 solo tiene 8 codewords | mismo banco 1-bit/2-bit: 9 vs 8. Si 9 gana, documentar. Si no, se deja |
| **Q7 / [7,4,3]** | 128 vértices, 16 codewords | `sizeof`, julios, 1-bit vs Q6. Solo si 16 modos hacen falta |
| **Producto Q6 × dominio WSP** | 64 × 7 = 448 casillas de direccionamiento, sin nuevo cubo | ¿baja el robo «Deontología por rima»? |
| **Campo en las aristas** | leak 7/8 ya es un campo discreto. Un “potencial” extra es otro `W_EDGE` | misma campaña de inyección; si no gana a Q6, no |
| **Clifford / rotores en 6 bits** | Aut(Q6) = ya el grupo del cubo | no aporta retrieve hasta que un rotor clasifique mejor que Hamming |
| **LLM → WSP decoder** | red minúscula o tabla: frase → 16 B | tasa de verbos correctos en el banco 8.9; 0 hechos nuevos |

Fuera de la campaña: mandalas, chakras, «campo de conciencia». Sin
número, no hay ficha.

---

## 5. Qué construir, en orden (host primero)

1. **WSP en cada turno 8.9** — serializar classify+route a 16 B; el
   TUI muestra el hex. Sin LLM.
2. **Q6-retrieve** — score de ficha = Hamming/LIF + `page_fits`.
   Sustituye al Jaccard cuando hay ruido (typo, acento).
3. **Producto dominio × cubo** — un bit de «social vs fact» en WSP
   para que «eso no rima» no caiga en Deontología.
4. **Render atado (opcional)** — un modelo *local* ≤ 1 B, o ninguno.
   Solo si VERIFY de tokens del extracto pasa. Si no hay GPU, se dice.
5. **Sri Yantra 9 vs Q6 8** — un bench, un párrafo en el RFC, no una
   religión.
6. **Metal** — el mismo DAG en kernel; Akida si hay placa.

9 no empieza por entrenar un transformer. Empieza por **poner el
esqueleto que ya existe (8.9) en WSP+Q6** y medir si el retrieve
miente menos.

---

## 6. Colaboración (campos / yantra / I Ching)

Sí se puede colaborar **si** el otro lado acepta la regla del RFC:
hipótesis → código → KPI. El mapa hexagrama↔vértice ya está. Lo que
faltaría de su lado es *otra* geometría con el mismo protocolo de
inyección (1-bit, 2-bit, julios). Lo que no aceptamos: «el Sri Yantra
*es* la mente» sin un 48/48.

---

## 7. Techo

Este híbrido puede:

- enrutar como un LLM (intención → acto) en 16 B;
- recuperar fichas con 1 bit de ruido;
- hablar con fuente, o callar;
- llevar el mismo DAG a metal.

No puede:

- comprimir GPT-4 en 64 neuronas;
- razonar como un pulpo o un chimpancé por «sumar un LLM»;
- ganar LMSYS sin dejar de ser rxOS.

El esqueleto es WSP. El campo es Q6. La carne es el catálogo. El LLM,
si aparece, es una **boca con candado**. Eso es NAVI 9.
