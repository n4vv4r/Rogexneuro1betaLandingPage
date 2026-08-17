# Cómo medir NAVI (y por qué no hay un IQ universal)

No existe una métrica única de «inteligencia» que valga igual para
ChatGPT, una SNN, un motor de ajedrez y NAVI. El g-factor humano no se
traslada. Quien vende un número solo suele estar midiendo otra cosa
(tokens, MMLU, impresiones).

Lo que sí se puede seguir, y sirve para comparar **sistemas distintos**
sin convertir a NAVI en un LLM, es un tablero de cuatro ejes.

## Tablero (sí vale para cualquier IA)

| Eje | Pregunta | Cómo se mide aquí | Cómo se mide en un LLM |
| --- | --- | --- | --- |
| **Verdad** | ¿Afirma solo lo que puede mostrar? | tasa de UNKNOWN honesto + 0 puentes inventados | alucinación / citas falsas |
| **Habilidad** | ¿Hace la tarea pedida? | coach / drill / math / código VERIFY | HumanEval, SWE-bench, GPQA |
| **Calibración** | ¿No sobreactúa? | hola corto; «conciencia» filosófica ≠ identidad | sycophancy, overthinking |
| **Coste** | ¿Cuánta energía y RAM? | host Python ahora; Q6 entero / WSP 16 B en meta | tokens × GPU |

El más cercano a «inteligencia fluida» *universal* es **ARC-AGI**
(Chollet): problemas nuevos, no memorizados. NAVI hoy **no** es un
sistema ARC. Forzar MMLU/LMSYS contra GPT es ley de Goodhart: ganarías
hinchando texto y perderías lo que rxOS quiere (ficha, fuente, 0 FPU).

## Números que ya tienes

```bash
./navi85 --coach          # diálogo + código + honradez
./navi85 --drill          # VERIFY o cosecha
./navi85 --reps N         # refuerzo; la tasa solo sube si el banco tiene huecos
```

Informes: `lab/navi8/coach_report.json`, `reps_report.json`, `train_report.json`.

Regla práctica:

- **Habilidad** = `coach.rate` y `drill.rate` (tareas que sí están en ficha).
- **Verdad** = fallos del tipo «inventar puente» o «Ciudad por hola mundo» = 0.
- **Calibración** = social/saludo/ánimo sin Wikipedia.
- **Coste** = segundos del coach y, en metal, julios del paso Q6.

Si un eje sube y otro baja, no promedies. Un 1.00 en 28 fichas ya
sabidas no es más inteligencia; es techo del banco.

## En qué nivel está NAVI 8.5

No está en el nivel de ChatGPT. No predice el siguiente token. No tiene
un modelo de mundo entrenado en internet entero.

Está en el nivel de **transductor local con catálogo**:

- sí: identidad, memoria de nombre, ánimo léxico, math entero, esqueletos
  de código (C/HTML/JS/Python/Rust, Q6, WSP), harvest con VERIFY, UNKNOWN
  honesto, KCC (nadie se poda).
- no: diálogo abierto estilo GPT, código fuera de primitiva, unir
  hermetismo y Rogex sin extracto, ARC-AGI, razonamiento largo inventado.

Eso no es un suspenso. Es otra máquina.

## ¿Tiene sentido «LLM neuromórfico» con WSP y Q6?

Tiene sentido **si** el objetivo es rxOS: postal de 16 B, LIF entero,
cero FPU, ficha con fuente, metal/unikernel.

No tiene sentido **si** el objetivo es clonar ChatGPT. Un transformer
sobre spikes sigue siendo un modelo de lenguaje: misma función (P(token)),
otro hardware. Entrenar a NAVI «para que hable como GPT» con backprop
anula WSP/Q6 y el contrato de no inventar.

El camino coherente:

1. WSP = mensaje (quién, verbo, objeto, cuando + amplitudes clásicas).
2. Q6 = cómputo de patrón (64 LIF, Hamming, umbral), no prosa.
3. Catálogo + harvest + memoria = lo que se *dice*.
4. VERIFY = la métrica de verdad. El coach es el feedback, no el gradiente.

Cuando Q6/Akida esté en metal, mide **acuerdo de spikes y julios**, no
Elo de LMSYS. El chat se sigue midiendo con el tablero de arriba.
