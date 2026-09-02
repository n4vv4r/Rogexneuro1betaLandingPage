# PRISMA

**Software de análisis de EEG. Uso en investigación — no es un producto sanitario.**

---

## Qué es, en una frase

PRISMA abre una grabación de EEG, la limpia, la analiza y te dice si lo que
encontraste **aguanta un examen serio** o no.

---

## Para quién

- Quien graba EEG y no quiere escribir código para mirarlo
- Quien ya usa MNE-Python o EEGLAB y quiere un flujo reproducible encima
- Quien enseña electrofisiología y necesita que el alumno vea la señal, no un script
- Quien construye BCI o neurofeedback y necesita procesar en tiempo real

---

## Qué hace

**Abre casi cualquier cosa.** BrainVision, EDF/EDF+, BDF de BioSemi, GDF,
Neuroscan CNT, EEGLAB, FIF. Arrastras el archivo y ves lo que hay dentro:
canales, frecuencia, marcadores, y también las decisiones que tuvo que tomar
el lector por su cuenta.

**Limpia la señal, explicándose.** Filtros, re-referenciación, detección de
canales malos **sobre toda la sesión** — y te dice *por qué* marcó cada uno.
ICA para quitar parpadeos y músculo, con sus etiquetas y sus advertencias:
los componentes musculares se señalan pero no se eliminan sin que tú lo pidas.

**Analiza.** ERP, espectro de potencia, tiempo-frecuencia, conectividad
funcional, y localización de fuentes con vista 3D del cerebro.

**Repite el trabajo por ti.** Escribes los pasos una vez en un archivo y se
aplican igual a 1 sujeto o a 73. Cada corrida guarda qué versión de qué
programa hizo qué, con qué parámetros: dentro de un año sabrás exactamente
cómo saliste de A a B.

**Y lo que casi nadie hace: te dice cuándo NO tienes nada.**

---

## Lo que nos diferencia de verdad

Cualquier programa te calcula un valor de p. PRISMA responde a la pregunta
difícil: **¿esto sobreviviría a una revisión?**

Cuando pides varias comparaciones, PRISMA las corrige **como familia** — no
una a una. Si añades una métrica exploratoria más, el listón sube, como debe
ser. Y marca, por separado:

- Si el resultado depende de **unos pocos puntos extremos**
- Si **desaparece** al controlar un factor de confusión obvio
- Si tu muestra **nunca tuvo potencia** para detectar eso, y cuántos sujetos harían falta

Termina con una frase clara y un veredicto: **defendible sí o no**.

**Por qué existe esto.** La hipótesis principal de este proyecto — que
calibrar el umbral por sujeto predecía el comportamiento — se probó contra dos
datasets públicos independientes y **no replicó**. En vez de esconderlo, la
disciplina que hizo falta para descubrirlo es ahora parte del producto.

`defendible: no` es el resultado **normal** de una exploración honesta. No es
un error del programa.

---

## Cómo sabemos que funciona

Con datos públicos reales, no con demos preparadas.

Sobre **ds006018** (tarea Flanker, 73 sujetos), procesados los 73 sin un solo
fallo, PRISMA recuperó **dos efectos ya establecidos en la literatura**:
la respuesta ERP de conflicto y el theta mediofrontal. Descartó correctamente
30 de 32 clústeres candidatos. Y en el tercer análisis, conectividad, dijo
claramente: **aquí no hay nada**.

Que no encuentre efecto en los tres es precisamente lo que lo hace fiable.

---

## Las dos mitades

**PRISMA** — la aplicación de escritorio y la capa de análisis. Seis paneles:
Sesión, Señal, Preproceso, Análisis, Grupo, Límites. Tema claro y oscuro.

**PRISMA ENGINE** — un motor de tiempo real escrito en Rust, con **1,8
microsegundos** de latencia media y cero reservas de memoria en el camino
crítico. En vez de analizar ventanas fijas, convierte la señal en impulsos y
procesa evento a evento. Es un binario único, sin nada que instalar.

Se usan juntas o por separado.

---

## Lo que NO hace

Está escrito en la propia aplicación, en un panel llamado **Límites**, porque
una herramienta que solo enumera sus virtudes no es honesta:

- **No es un producto sanitario.** No diagnostica ni predice nada.
- **La localización de fuentes usa una cabeza plantilla**, no la resonancia de
  tu sujeto: cuenta con 1-2 cm de error.
- **La conectividad entre electrodos está contaminada** por conducción de
  volumen. Para afirmar interacción, usa las medidas robustas que incluye.
- **Un clúster significativo no localiza con precisión.** Sus bordes no son
  los límites del efecto.
- **El etiquetado automático de ICA es una sugerencia**, no un veredicto.
- **Todavía no puedes enchufar un casco y verlo en vivo** sin un script
  puente. Ése era el objetivo original y aún no está.

---

## Requisitos

Linux de 64 bits (prácticamente cualquiera desde 2020). El motor no necesita
instalar nada. La capa de análisis necesita Python 3.10 o superior.

Construido sobre MNE-Python, la biblioteca estándar de la comunidad de
electrofisiología.

---

## Estado

**Todavía no está a la venta.** El software funciona y está probado; lo que
falta es el papeleo — licencia, forma de pago, contacto de soporte — y la
función que era el objetivo original: conectar un casco y verlo analizado en
directo.
