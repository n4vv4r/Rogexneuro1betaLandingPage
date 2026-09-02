# Material para redes sociales

Copia y pega. Cada bloque va solo. **Nada de aquí exagera**: si una cifra
aparece, se midió; si un análisis no encontró nada, se dice.

Una regla para todo lo que publiques: **no lo llames producto sanitario, ni
sugieras uso clínico.** Es software de investigación, y decirlo suma
credibilidad en vez de restarla.

---

## Hilo largo (X / Twitter, Mastodon, Bluesky)

**1/**
He construido PRISMA: software de análisis de EEG que hace algo que casi
ninguno hace.

No solo te da un valor de p.

Te dice si tu resultado **aguantaría una revisión**. 🧵

**2/**
Abre BrainVision, EDF, BDF, GDF, Neuroscan, EEGLAB, FIF.

Limpia la señal explicándose: cuando marca un canal como malo, te dice **por
qué** lo marcó.

**3/**
Detección de canales malos sobre TODA la sesión, no sobre los primeros
segundos.

Un electrodo que se despega en el minuto 40 aparece. En muchos flujos, no.

**4/**
ICA para parpadeos y músculo.

Detalle importante: los componentes cardíacos **no se intentan** si no hay
canal de ECG. No existe un detector fiable solo con EEG, así que no me lo
invento.

**5/**
ERP, espectro, tiempo-frecuencia, conectividad, localización de fuentes con
vista 3D del cerebro.

Todo lo numérico es de MNE-Python. No reimplemento ICA ni sLORETA: décadas de
validación no se rehacen por gusto.

**6/**
Escribes los pasos una vez. Se aplican igual a 1 sujeto o a 73.

Cada corrida guarda qué versión de qué programa hizo qué, con qué parámetros.

Dentro de un año sabrás exactamente cómo llegaste de A a B.

**7/**
Y aquí está la parte que me importa.

Cuando pides varias comparaciones, PRISMA las corrige **como familia**. Si
añades una métrica exploratoria más, el listón sube.

Como debe ser.

**8/**
Además marca por separado si tu resultado:

· depende de unos pocos puntos extremos
· desaparece al controlar un confusor
· nunca tuvo potencia estadística (y cuántos sujetos harían falta)

Termina con: **defendible, sí o no.**

**9/**
¿Por qué construí esto?

Porque la hipótesis principal de mi propio proyecto se probó contra dos
datasets públicos independientes y **no replicó**.

En vez de esconderlo, convertí en código la disciplina que hizo falta para
descubrirlo.

**10/**
Prueba real: dataset público de 73 sujetos, tarea Flanker. Los 73 procesados
sin un fallo.

Recuperó dos efectos ya establecidos en la literatura.
Descartó 30 de 32 clústeres candidatos.
Y en conectividad dijo: **aquí no hay nada.**

**11/**
Que no encuentre efecto en los tres análisis es exactamente lo que lo hace
fiable.

Una herramienta que siempre encuentra algo no es una herramienta. Es un
generador de falsos positivos.

**12/**
Hay un panel dentro de la app que se llama **Límites**.

Lista dónde NO hay que fiarse: cabeza plantilla en fuentes, conducción de
volumen en conectividad, que un clúster no localiza con precisión.

Una herramienta que solo enumera virtudes no es honesta.

**13/**
Además lleva un motor de tiempo real en Rust: 1,8 µs de latencia media, cero
reservas de memoria en el camino crítico.

Convierte la señal en impulsos y procesa evento a evento, en vez de analizar
ventanas fijas.

**14/**
Todavía no está a la venta.

Funciona y está probado — 135 tests automatizados — pero falta el papeleo, y
falta lo que era el objetivo original: enchufar un casco y verlo analizado en
directo.

Cuando eso esté, lo contaré.

---

## Post corto (LinkedIn)

He construido PRISMA, software de análisis de EEG para investigación.

Hace lo habitual — importar casi cualquier formato, limpiar la señal, ERP,
espectro, tiempo-frecuencia, conectividad, localización de fuentes,
estadística de grupo — sobre MNE-Python, sin reimplementar nada numérico.

Lo que casi nadie hace es lo que más me importaba: cuando pides varias
comparaciones, las corrige como familia y te marca si tu resultado depende de
unos pocos puntos extremos, si desaparece al controlar un confusor, o si tu
muestra nunca tuvo potencia. Termina con un veredicto explícito: defendible o
no.

Lo construí porque la hipótesis principal de mi propio proyecto se probó
contra dos datasets públicos independientes y no replicó. En vez de
esconderlo, convertí esa disciplina en código.

Prueba con datos públicos reales: 73 sujetos, tarea Flanker, todos procesados
sin fallos. Recuperó dos efectos ya establecidos, descartó 30 de 32 clústeres
candidatos y, en el análisis de conectividad, dijo claramente que no había
nada. Que no encuentre efecto en los tres es lo que lo hace fiable.

Software de investigación, no producto sanitario. Aún no a la venta.

---

## Post para foros técnicos (Reddit r/neuro, r/BCI, Discord, HN)

**Título:** PRISMA — análisis de EEG con una capa de integridad estadística
integrada

He construido una suite de análisis de EEG sobre MNE-Python. Nada numérico
está reimplementado: ICA, sLORETA y las wavelets son de MNE, y ahí se quedan.

Lo que añado encima:

**Pipelines reproducibles.** YAML con los pasos, corre sobre un archivo o un
dataset BIDS entero. Cada corrida guarda spec, versiones de paquetes, y por
sujeto cada paso con parámetros, tiempos y resultado.

**Etapa de grupo que no recomputa nada.** Lee de vuelta lo que ya escribió el
pipeline. Cambiar los parámetros de la estadística cuesta segundos.

**Permutación por clústeres** sobre canales×tiempo, sobre frecuencia×tiempo×canales
a la vez, y para conectividad tanto FDR por enlace como el Network-Based
Statistic de Zalesky.

**Capa de integridad.** Corrige por familia, marca dependencia de outliers vía
divergencia Pearson/Spearman, pérdida bajo confusor vía correlación parcial, y
potencia insuficiente. Devuelve `defensible: true/false`.

Los métodos estadísticos están probados **en los dos sentidos**: tienen que
encontrar un efecto plantado en el sitio exacto donde se plantó, y no
encontrar nada en ruido apareado. Un módulo estadístico validado solo con
casos positivos no vale nada.

Sobre ds006018 (73 sujetos, Flanker): recupera el efecto ERP de congruencia y
el theta mediofrontal, descarta 30 de 32 clústeres candidatos, y en
conectividad wPLI no encuentra nada — ni por FDR ni por NBS.

Uso en investigación, no producto sanitario. Localización de fuentes sobre
fsaverage con el error de 1-2 cm que eso implica, y está escrito en la propia
app. Aún no está a la venta.

Me interesa saber si esto le sirve a alguien, o si estoy resolviendo un
problema que nadie tiene. Las críticas del tipo "esto no sirve porque X" son
exactamente lo que busco.

---

## Frases sueltas (para imágenes, cabeceras, bio)

> Te dice cuándo NO tienes nada.

> Cualquier programa te da un valor de p. PRISMA te dice si sobreviviría a una revisión.

> `defendible: no` es el resultado normal de una exploración honesta.

> Lo construí porque mi propia hipótesis no replicó.

> 73 sujetos. Dos efectos recuperados. Uno descartado. Eso es lo que lo hace fiable.

> Una herramienta que siempre encuentra algo no es una herramienta.

> Hay un panel llamado "Límites". Lista dónde no fiarse.

---

## Ideas de captura

Ordenadas por fuerza:

1. **Panel Group con el veredicto** — el diferencial real, y se entiende sin
   saber EEG. Especialmente el "No difference to report" de conectividad junto
   a los clústeres significativos.
2. **Panel Límites** — desarma la objeción de "otro programa que promete todo".
3. **Cerebro 3D con las fuentes** — es lo más vistoso.
4. **Panel Signal con EEG real** — parpadeos visibles en los frontales.
5. **ERP de dos condiciones superpuestas** — cualquiera ve dos curvas distintas.
6. **Topografías** — visualmente atractivas y reconocibles.
7. **Tema claro y oscuro lado a lado** — bueno para carrusel.

**Qué NO publicar:** capturas con rutas que revelen nombres de sujetos, y
cualquier gráfico sin decir sobre qué datos se hizo.
