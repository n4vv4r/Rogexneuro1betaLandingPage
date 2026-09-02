# PRISMA — documentación técnica

**Versión 0.1.0 · Linux x86_64 · software de investigación, no es un producto sanitario.**

Este documento describe qué hace el programa, cómo lo hace, y dónde no hay
que fiarse. Cada cifra se midió en esta máquina o sobre datos públicos; nada
está estimado ni proyectado. Donde una función es delgada, o una afirmación
se probó y falló, se dice aquí.

---

## 1. Qué es

Dos capas que viajan juntas y se pueden usar por separado.

**PRISMA ENGINE** — núcleo de EEG en tiempo real, orientado a eventos,
escrito en Rust (~8.100 líneas). En vez de hacer FFT sobre ventanas fijas,
codifica la señal en impulsos y la procesa evento a evento.

**PRISMA 5 SNN** — capa clásica de análisis e interfaz de escritorio, en
Python (~5.500 líneas) sobre MNE-Python. Suite de EEG fuera de línea:
limpieza, ERP, espectro, conectividad, localización de fuentes, pipelines
reproducibles y estadística de grupo.

Están separadas a propósito. El motor no depende de Python y corre solo;
la capa de análisis corre sin el motor. El puente es una función que le
pasa la señal limpia al motor.

---

## 2. Cómo funciona el motor

```
señal → modulación delta → LIF (SIMD) → STDP → predicción → telemetría
```

**Modulación delta.** Solo se emite un impulso cuando la señal se mueve más
que un umbral adaptativo θ_adp. Un canal en silencio no produce eventos: el
trabajo es proporcional a cuánto cambia la señal, no a la frecuencia de
muestreo.

**Capa LIF.** Neuronas leaky integrate-and-fire integran el flujo de
impulsos, vectorizadas con AVX2, y caen a código escalar si el CPU no lo
tiene.

**STDP.** La plasticidad según el tiempo de los impulsos ajusta los pesos
sinápticos a partir del orden pre / post.

**Codificación predictiva.** Se compara la tasa observada con una tasa
esperada; un desajuste grande sube el SPEI y marca un *posible artefacto*
(parpadeo, músculo, un cable). No es un detector clínico de eventos.

### Rendimiento medido

En esta máquina (`--headless --bench-samples 200000`), 32 canales:

| | |
|---|---|
| Latencia media del camino caliente | **1,81 µs** |
| Peor latencia observada | 43,9 µs (en 200.000 muestras) |
| Caudal | ~183.000 muestras/s, un núcleo |
| Reserva de memoria en el camino caliente | **cero**, por construcción — solo búferes fijos |
| Tamaño del binario | 9,0 MB, sin runtime que instalar |

En un sistema en tiempo real importa la peor cifra, y se publica junto a
la media, no en su lugar.

### Acondicionamiento de la señal

Apagado por defecto. Alterar la señal en silencio cambiaría también cada
métrica respecto a una corrida anterior.

- Notch (50/60 Hz), paso alto, paso bajo — biquads RBJ, estado f64
- Re-referenciación: media común (sin canales malos) o canales con nombre
- Detección de canales malos sobre **toda la sesión**, no una ventana de
  vista previa

Los filtros aquí son **IIR causal de una pasada**: desplazan la fase con
la frecuencia. No compares latencias ERP medidas con ellos contra
herramientas de fase cero.

### Entrada en vivo

El motor escucha un socket TCP simple: una línea JSON de cabecera y luego
muestras `float32` intercaladas por canal. Cualquier cosa que abra un
socket puede alimentarlo. Un script puente reenvía cualquier flujo LSL, y
puede generar señal sintética para probar el camino en vivo sin hardware.

**Por qué no hay LSL nativo, con honestidad:** `lsl-core` (Rust puro) es
GPL-3.0, incompatible con un binario cerrado; las bindings oficiales
necesitan un `liblsl` cuyo código embebido ya no compila contra glibc
moderna. El socket genérico deja el binario sin dependencias y acepta más
productores.

---

## 3. Cómo funciona la capa de análisis

Todos los métodos numéricos son de MNE-Python, scipy o mne-connectivity.
**No se reimplementa nada numérico.** ICA y localización de fuentes, en
particular, son trabajo numérico de investigación con décadas de
validación; reescribirlos añadiría riesgo y no restaría nada. Lo que
añade PRISMA es el flujo de trabajo, el pipeline declarativo, la etapa de
grupo, la capa de integridad y un límite documentado al lado de cada
método.

### Importación

| Formato | Lector | Comprobado en |
|---|---|---|
| BrainVision `.vhdr` | MNE | ds006018, ds007655 (reales) |
| EDF / EDF+ | MNE | ida y vuelta + real |
| BDF (BioSemi) | MNE | escrito con pyedflib |
| GDF | MNE | BCI Competition IV 2a (real) |
| Neuroscan CNT | MNE | grabaciones de prueba de MNE |
| EEGLAB `.set`, FIF | MNE | ida y vuelta |

**Un fallo real que salió aquí:** a veces la cabecera de Neuroscan no dice
el ancho de muestra, y leer 16 bits como 32 (o al revés) no lanza error:
decodifica en silencio una señal de otra forma y lee la tabla de eventos
en el offset equivocado. PRISMA prueba los dos anchos, se queda con el
que da amplitudes fisiológicamente plausibles y anota la decisión. Si los
dos parecen plausibles, se niega y pregunta, en vez de adivinar.

### Limpieza

- **Filtros**: fase cero (ida y vuelta) por defecto fuera de línea; hay un
  modo causal para reproducir lo que hace el motor en vivo.
- **Canales malos**: barrido de toda la sesión con criterios PREP (plano,
  desviación robusta, ruido de alta frecuencia, correlación por ventanas
  con vecinos), informando *por qué* se marcó cada uno. Estadística
  robusta en todo, para que un canal saturado no esconda otro.
- **Interpolación**: splines esféricos (Perrin et al., 1989).
- **ICA**: Infomax extendido / FastICA / Picard, con etiquetado
  automático. Los parpadeos usan un canal EOG o un proxy frontal. **No se
  intentan componentes cardíacos sin un canal ECG de verdad** — no hay un
  detector fiable solo con EEG, así que no se inventa. Los musculares se
  etiquetan pero no se quitan salvo que lo pidas: en datos reales el
  detector marcó 11 de 20.

### Análisis

Epoching con nombres de evento legibles, corrección de línea base, media
ERP y medida de picos; PSD (Welch/multitaper), potencia por banda,
frecuencia alfa individual; tiempo-frecuencia (Morlet, multitaper,
Stockwell, STFT) y ERD/ERS; conectividad (coh, imcoh, plv, ciplv, ppc,
pli, wpli); localización de fuentes (sLORETA, dSPM, eLORETA, MNE,
beamformer LCMV).

### Pipelines reproducibles

Un YAML lista los pasos; corren sobre un archivo, un glob o un dataset
BIDS entero. Quince tipos de paso: `montage, filter, bad_channels,
interpolate, reference, ica, epochs, baseline, erp, psd, tfr,
connectivity, sources, engine, save_raw`.

Cada corrida escribe `pipeline_summary.json` con la especificación, cada
versión de paquete, y por sujeto los parámetros, tiempos y resultado de
cada paso. Un sujeto que falla se anota y el lote sigue.

### Etapa de grupo

El pipeline por sujeto escribe a disco; la etapa de grupo lo lee y
**nunca recalcula un sujeto**. Volver a lanzar la estadística con otros
parámetros cuesta segundos, no otra pasada sobre los datos.

- **ERP**: permutación de clústeres espacio-temporal sobre canales × tiempo
- **Tiempo-frecuencia**: clústeres sobre frecuencia × tiempo × canales
  *a la vez*, para que un efecto que se extiende a bandas vecinas sea un
  hallazgo, no varios
- **Conectividad**: tests emparejados por enlace con FDR (solo el
  triángulo superior — contar una matriz simétrica dos veces diluiría la
  corrección), más el Network-Based Statistic (Zalesky et al., 2010) para
  subredes conexas

---

## 4. La capa de integridad

Esta parte no existe en otras suites de EEG, y el motivo no es
halagador: la afirmación principal de este proyecto — que calibrar el
umbral por sujeto predice el comportamiento — se probó contra dos
datasets públicos independientes y **no replicó**. La disciplina que
hizo falta para descubrirlo es ahora código.

`integrity_report` toma una *familia* de tests y, en una pasada:

1. **Corrige sobre toda la familia**, no por test. Añadir una métrica
   exploratoria más sube el listón, como debe ser.
2. **Marca resultados que dependen de extremos** — un hueco grande
   Pearson/Spearman significa que el resultado lineal se apoya en unos
   pocos puntos.
3. **Marca resultados que desaparecen bajo un confusor** (correlación
   parcial).
4. **Marca tests sin potencia**, y dice cuántos sujetos harían falta.
5. **Saca de la familia los tests no computables (NaN)** en vez de dejar
   que corrompan el resto de p corregidas — un fallo que ocurrió de
   verdad aquí, ahora una garantía.
6. Termina con `defensible: true/false` y una frase llana.

`defensible: false` es el resultado normal de una exploración honesta,
no un error.

---

## 5. Contra qué se ha comprobado

**135 tests automáticos.** La grabación sintética que usan la mayoría
tiene verdad de suelo plantada — alfa occipital, parpadeos, zumbido de
red, un canal muerto, un canal saturado, respuestas N1/P3 — y los tests
comprueban que cada etapa *recupera lo plantado*, no solo que corre.

Los métodos estadísticos se prueban **en los dos sentidos**: tienen que
encontrar un efecto plantado en el sitio exacto, **y no encontrar nada
en ruido apareado**. Un módulo estadístico validado solo con casos
positivos no vale nada.

### Sobre datos públicos reales

**ds006018** (tarea Flanker, 73 sujetos, actiCHamp, 500 Hz), los 73
procesados sin un solo fallo. Tres tests de grupo sobre la misma
corrida:

| Test | Resultado |
|---|---|
| ERP (canales × tiempo) | 2 de 18 clústeres significativos, p = 0,0005, 0,18–0,80 s, 22 canales centro-parietales |
| Tiempo-frecuencia | 2 de 32 significativos: theta mediofrontal 4–18 Hz (p = 0,0010) y desincronización alfa/beta (p = 0,043) |
| Conectividad (wPLI theta) | **Nada.** Ningún enlace sobrevive FDR en 325 pruebas; el NBS encuentra 3 componentes candidatos, ninguno significativo |

Dos efectos Flanker ya establecidos recuperados, 30 de 32 clústeres
candidatos rechazados, y un negativo claro en el tercero. Una suite que
encontrara efecto en los tres no sería creíble.

**BCI Competition IV 2a** (GDF, Graz, imaginería motora) — pipeline
completo, 288 epochs, 72 por clase, sin errores.

---

## 6. Límites

**No es un producto sanitario.** Software de investigación. No
diagnostica, no trata ni predice ninguna condición, y no está validado
para ningún uso clínico.

**La localización de fuentes usa una cabeza plantilla.** fsaverage, no
la resonancia del sujeto, con un co-registro de plantilla. El error de
localización es del orden de 1–2 cm. Informa los mapas como basados en
plantilla.

**La conectividad en espacio de sensores está contaminada por
conducción de volumen.** Dos electrodos cercanos ven la misma fuente y
mostrarán coherencia o PLV altas sin interacción entre ellos. Para
afirmar interacción usa wPLI o coherencia imaginaria.

**La permutación de clústeres localiza poco.** Un clúster significativo
quiere decir que las condiciones difieren *en algún sitio* de la
ventana. Sus bordes no son los límites del efecto, y un efecto fuerte se
extiende a canales vecinos por diseño.

**El Network-Based Statistic depende de su umbral.** Fíjalo antes de
mirar, y declara el valor usado.

**El etiquetado automático de ICA es una sugerencia**, no un veredicto.

**La calibración por sujeto del motor no está validada.** Adapta el
codificador a la señal que tiene delante. Que eso mejore un resultado
aguas abajo se probó contra dos datasets públicos independientes con
paradigmas distintos y no replicó. No se afirma nada más.

**El backend Akida (neuromórfico) es un esbozo de simulación.** No hay
placa física ni cifras de energía medidas.

**No hay controladores nativos de casco.** La entrada en vivo va por el
protocolo TCP genérico o el script puente LSL. Enchufar un casco y verlo
analizado en directo — el objetivo original — no está construido.

**El render 3D de verdad necesita un contexto GPU/OpenGL.** No hay
alternativa por software.

**No hay deshacer en la interfaz.** El preproceso edita una copia en
memoria; recarga la grabación para empezar de cero.

---

## 7. Requisitos

**Motor**: Linux x86_64, glibc 2.30 o más nueva (2019 — cubre Ubuntu
20.04+, Debian 11+, RHEL/Rocky 9+, Fedora 31+, Arch, Mint 20+). Sus
únicas dependencias dinámicas son bibliotecas de sistema; OpenGL se
carga bajo demanda, así que también corre en un servidor sin pantalla.

**Capa de análisis**: Python 3.10+. Extras opcionales añaden la
interfaz de escritorio (PySide6) y el render 3D real (PyVista/VTK).

Construido sobre MNE-Python (BSD-3-Clause), NumPy, SciPy, scikit-learn,
matplotlib y mne-connectivity.

---

## 8. Estado

El motor, la capa de análisis, la estadística y la interfaz funcionan y
están comprobados. Falta el papeleo — una licencia de verdad, una vía de
pago, un contacto de soporte — y la función que era el punto del
ejercicio: enchufar un casco y verlo analizado en directo, sin un script
puente en medio.
