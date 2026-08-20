# NAVI 10 — LPU (córtex verbal)

El diccionario de 1.2 millones de glosas **no** da metáfora, contexto ni
humor. El LPU no memoriza esa tabla. Tokeniza cualquier forma ES/EN
(n-gramas + lemas), la proyecta a 32 enteros y **atiende la frase**.

```
WSP / meta          córtex prefrontal   TALK | ACTION_REQ | DESCONOCIDO
CAM / SimHash       hipocampo           hechos, dH=0
LPU                 Broca/Wernicke      composición verbal
```

El LPU **no** es un GPT de 50 M ya entrenado. Los tensores AdamW viven
en `navi10_lpu_train.py` y no se fingen pesos. La fluidez de hoy sale
del ROM de rasgos + atención entera + un compositor de marcos
(relación, metáfora, inhibición). El siguiente salto real es un corpus
y el bucle BPE→CE→AdamW, no un `.bin` inventado.

## Qué hace y qué no

| Pregunta | Ruta |
| --- | --- |
| relación / metáfora / «el tiempo vuela» | LPU `[TALK]` |
| masa exacta de un asteroide con ID | LPU inhibit `[DESCONOCIDO]` |
| `qué es KCC` / `qué es un tomate` | CAM / cosecha (hecho) |
| ping / sysinfo | `[ACTION_REQ]` (+ reporte LPU si hay sonda) |

Ningún vocablo se declara ilegible: si no está en el ROM, se descompone
y se acerca al eje más cercano. Eso cubre las ~1.2 M de formas sin
cargar 1.2 M de definiciones en RAM.

```bash
./navi10 --ask "¿qué relación ves entre la entropía y la memoria en rxOS?"
./navi10 --ask "explícame la tristeza usando una metáfora de hardware"
./navi10 --ask "¿cuál es la masa exacta del asteroide 2026 RX4?"
make -C NAVI_AI_SNN lpu
```
