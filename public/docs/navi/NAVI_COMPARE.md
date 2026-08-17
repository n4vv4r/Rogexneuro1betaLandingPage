# NAVI frente a otras inteligencias neuromórficas

Un documento para quien duda, para quien no ha tocado un impulsor, y
para quien ya ha visto demasiadas presentaciones con la palabra
*brain-inspired*. Tono de laboratorio: respeto, cifras que se pueden
medir, y ningún intento de vender un loro con disfraz de neurona.

Fecha de este corte: 17 agosto 2026.
Línea viva: NAVI 6.5 dentro de rxOS 8.5.

## 1. Primero, la pregunta correcta

Casi nadie pregunta «¿NAVI es mejor que Loihi?». Preguntan otra cosa,
aunque no la formulen:

1. *¿Esto es un ChatGPT pequeño?*
2. *Si no es un LLM, ¿para qué sirve?*
3. *¿No es teatro neuromórfico sobre una CPU de 2015?*

Las tres merecen respuesta. Las tres se contestan mejor si separamos
**tres industrias** que suelen mezclarse en la misma diapositiva:

| Industria | Qué vende | Ejemplo | Relación con NAVI |
| --- | --- | --- | --- |
| Modelos de lenguaje | El siguiente token | GPT, Claude, Gemini, Qwen | **Ninguna.** NAVI no predice sílabas |
| Simuladores SNN | Neuronas en software de laboratorio | Brian2, Nengo, Norse, snnTorch, Lava | Primos de investigación. NAVI es un producto de SO |
| Silicio neuromórfico | Impulsos en chip | Loihi 2, Akida, SpiNNaker 2, Speck, Pulsar | El destino de nuestro Nivel 3. Hoy no está en el lab |

NAVI no compite en la primera columna. No pretende ganar en la tercera
hasta que haya una placa. Compite —si la palabra sirve— en un hueco
pequeño y verificable: **un operador neuromórfico que vive dentro de un
unikernel, habla paquetes de 16 bytes y se niega a inventar.**

Eso es menos glamour. También es más difícil de falsificar con un
demo reel.

## 2. El mapa, sin catálogo de feria

Hay pocas IAs neuromórficas con nombre propio. Las que existen merecen
que se las cite bien. No son rivales de patio: son programas de
décadas, con papers, chips y equipos que no caben en un piso.

### Intel Loihi 2 (y Lava, y Hala Point)

Chip de investigación. Dinámica de neurona programable, plasticidad
local, mallas grandes (el sistema Hala Point se anuncia en torno al
millón de millones de sinapsis a escala de rack). El software se llama
Lava. El acceso es de comunidad de investigación, no de ISO en un
USB.

**Qué hace mejor que nosotros:** escala, silicio de verdad, un
ecosistema académico.

**Qué no hace:** no es el operador de un escritorio bare-metal que
puedes arrancar esta tarde. No te responde `status` con el mismo
`commands_dispatch` que la Terminal.

### IBM TrueNorth (y, al lado, NorthPole)

TrueNorth (2014) es el clásico: un millón de neuronas, consumo
anunciado en decenas de milivatios, sin aprendizaje en chip en el
diseño original. NorthPole es otra tesis: memoria y cómputo juntos
para redes profundas, no un SNN clásico.

**Qué hace mejor que nosotros:** el precedente histórico. Demostró
que el impulso a escala de chip no era ciencia ficción.

**Qué no hace:** no hay un TrueNorth en el canal de descargas de
Knights Labs, ni un chat de 16 bytes encima.

### BrainChip Akida

El único NPU neuromórfico *comercial* que hemos elegido como
candidato de Nivel 3. Enteros de 1, 2, 4 u 8 bits. Convierte CNN a
SNN (MetaTF). Edge learning en Akida 1, con reglas distintas a
nuestro STDP. El runtime es propietario.

Ya escribimos el gancho con detalle: [AKIDA.md](/docs/akida). Hoy
`neurocpu akida` se niega. Eso no es un eufemismo.

**Qué hace mejor que nosotros:** vatios en el borde, un SoC que se
puede comprar.

**Qué no hace:** no sustituye el razonador de NAVI 6.5. No ejecuta
`G_rxos`. No es un sistema operativo.

### SpiNNaker / SpiNNaker 2

Muchos núcleos ARM simulando redes de impulsos a escala de cerebro
de insecto o más. Universidad, supercomputación neuromórfica,
software de simulación masiva.

**Qué hace mejor que nosotros:** cardinalidad. Simular millones de
neuronas con un reloj y un enrutador de paquetes de spike.

**Qué no hace:** no es un unikernel de 3 MiB con escritorio y un
operador que dice DESCONOCIDO.

### SynSense (Speck, Xylo) e Innatera (Pulsar)

SoCs y microcontroladores de borde para visión o audio por eventos.
Muy cerca del sensor. Muy lejos de un chat de diagnóstico.

**Qué hacen mejor que nosotros:** milivatios junto a un micrófono o
una cámara de eventos.

**Qué no hacen:** no son NAVI. No pretenden serlo. El error sería
compararlos como si todos quisiéramos el mismo producto.

### Software de laboratorio (Nengo, Brian2, Norse…)

Herramientas serias. Si investigas dinámica de redes, ve allí. NAVI
no es un reemplazo de Brian2. Brian2 no es un reemplazo de un
operador de SO.

### Numenta / HTM

Teoría cortical importante, NuPIC en legado. No es un SNN de
impulsos en el sentido de LIF+STDP, y Numenta ya no lo mantiene como
producto central. Lo citamos por honestidad histórica, no para
ganar un debate.

## 3. Dónde se sienta NAVI

Una tabla que un escéptico puede auditar sin pedirnos fe.

| Criterio | NAVI 6.5 / rxOS 8.5 | Loihi / Lava | Akida | LLM de nube |
| --- | --- | --- | --- | --- |
| Unidad | WSP 16 B + LIF entero | spike en chip | evento / CNN cuantizada | token |
| Dónde corre hoy | unikernel x86 + host Python | hardware Intel de investigación | SoC / IP comercial | datacenter |
| Si no sabe | `DESCONOCIDO` | no conversa así | no conversa así | completa la frase |
| Aprendizaje en el ISO | no. Blob preentrenado | plasticidad en chip | edge learning (Akida 1) | no aplica |
| FPU en el motor | 0% | N/A (ASIC) | enteros | GPU/TPU, float |
| Código abierto del SO | sí (GPLv3) | Lava sí; el chip no | runtime propietario | pesos cerrados |
| Se puede falsear esta tarde | `qemu` + tecla `v` + `/prove` | si tienes acceso al hardware | si tienes kit | abres un chat |
| Pretende AGI | no | no (si se lee con cuidado) | no | a veces el marketing sí |

NAVI es **pequeño a propósito**. Q6 repara 1 bit en 48/48. El heap
del operador WSP es 0. El modelo 6.5 entra en la ISO como un módulo
de 1010 bytes más las plantillas. Eso no es una debilidad que
escondemos: es el argumento.

Un sistema que cabe en un sello de correos no puede, ni debe,
fingir que ha leído la biblioteca de Alejandría.

## 4. Ventajas de unir NAVI a un chip (Akida, Loihi, y los que vengan)

Esto es plan, no inventario. No hay placa en el laboratorio. La
opinión que sigue es la de quien escribe el cianotipo, no un
comunicado de Intel ni de BrainChip.

La unión no consiste en «meter NAVI dentro del chip». Consiste en
**repartir el trabajo**. El unikernel sigue siendo el sitio. El NPU
pasa a ser el obrero de los impulsos. Si invertimos los papeles,
perdemos las dos cosas: un SO que no sabe decir que no, y un ASIC
al que le pedimos un ensayo.

### Lo que el chip haría mejor que nuestra CPU

1. **Energía por evento.** Un LIF en Q16.16 sobre un i7 es honesto
   y medible. También es un desperdicio relativo: movemos 64 bits
   por un bus para simular lo que Akida o Loihi ya hacen en SRAM
   local. La ventaja no es «más inteligencia». Es **menos julios
   por spike** cuando el escenario (visión, audio, población SNN,
   Q6 ruidoso) dispara de verdad.
2. **Silencio cuando no hay estímulo.** El marketing neuromórfico
   se resume en eso. Coincide con MONAD: gastar solo si hay
   evento. En software lo aproximamos con `hlt` y actores. En
   silicio, el dato no se mueve. Ahí sí hay una física distinta.
3. **Escala de poblaciones, no de párrafos.** Loihi y SpiNNaker
   ganan cuando hay muchas neuronas. NAVI no necesita un millón
   para hablar. Sí las necesitaría PRISMA (EEG → spikes) o un
   front-end de sensor. El chip absorbe esa masa. El router de
   6.5 no.
4. **Aprendizaje local, etiquetado como suyo.** El edge learning
   de Akida 1 y la plasticidad de Loihi no son nuestro STDP. Si
   algún día entrenan una capa densa en el NPU, se dice *edge
   learning de BrainChip* o *plasticidad Lava*. No se reetiqueta
   como «NAVI aprendió solo». La unión sirve precisamente para
   **no mezclar las reglas**.
5. **Un contrato de 16 bytes hacia el ASIC.** WSP ya es entero,
   acotado y auditable. Encaja con tensores `uint8` de Akida y
   con eventos de Loihi mejor que un embedding de 4096 floats.
   La ventaja es de **interfaz**, no de marketing: menos
   traducción, menos mentira en el camino.

### Lo que se quedaría en la CPU (a propósito)

El DAG, `G_reason`, `G_math`, `G_code`, `G_rxos` y el VERIFY.
Un umbral del NPU no firma Ethernet, no ejecuta `status`, no
decide que un compilador LLVM «parece» válido. Esa frontera es
la ventaja política de la unión: el chip acelera; **el no sigue
siendo nuestro**.

Akida primero, Loihi segundo. Akida es comercial, habla enteros
y ya tiene Engine C++ que un unikernel puede, en principio,
conducir. Loihi es más interesante como laboratorio de
plasticidad y como escala; el acceso es de comunidad, no de
USB en una ISO. SpiNNaker es el primo académico de la
cardinalidad. Ninguno reemplaza a NAVI. NAVI no reemplaza a
ninguno.

### Opinión (mía, no un slide)

Creo que **esta es la única vía honesta hacia el Nivel 3**. Un
chip sin sitio es una placa en un cajón. Un NAVI sin chip es un
relé que ya funciona —y que debemos seguir vendiendo como
relé—. Juntos no producen AGI. Producen algo más raro en 2026:
un operador local que no alucina y, cuando hay sensor o
población de verdad, no quema un portátil para fingir un
cerebro.

También creo que hay que resistir dos tentaciones. La primera:
anunciar «NAVI on Loihi» el día que compile un hello-world en
Lava. La segunda: despreciar el silicio porque hoy no lo
tenemos. El desprecio es tan teatro como el anuncio.

La prueba de que la unión sirve no será un comunicado. Será
`neurocpu akida` imprimiendo un `HwVersion` leído del SoC, un
test Hamming Q6 software-contra-NPU, y dos columnas de julios.
Hasta entonces, esta sección es un plano. Se puede citar. No se
puede cobrar como entregable.

## 5. Objeciones, contestadas en voz baja

### «Es un ChatGPT recortado»

No. Un LLM maximiza P(siguiente token | contexto). NAVI 6.5 hace
otra cosa: PARSE, RETRIEVE, INFER, VERIFY, RENDER. Si VERIFY falla,
pinta `DESCONOCIDO`. Un compilador LLVM, una receta clínica, un
resumen de un PDF de 80 páginas: no hay ficha, no hay respuesta
inventada.

Si al probarlo esperabas un ensayo, el producto te va a parecer
pobre. Si esperabas un relé que no miente, el producto te va a
parecer estricto. Las dos lecturas son coherentes. Solo una es la
nuestra.

### «Entonces no es una IA»

Depende de la definición que traigas a la mesa. Si IA = modelo
fundacional de lenguaje, no lo es. Si IA = sistema que clasifica
una intención, recorre un grafo de causas y actúa sobre un
esquema, lo es —en un sentido viejo, de los años en que *expert
system* no era un insulto.

Preferimos el segundo. No pedimos que nos creas: pedimos que
midas `/prove`, `navi3 bench` y `python3 tests/test_navi65.py`.

### «Es neuromórfico de mentira: corre en un i7»

Hoy, sí: LIF Q16.16 sobre von Neumann. Lo decimos en la hoja de
cuatro niveles. Los Niveles 1 y 2 están cerrados. El Nivel 3
(delegar spikes a un NPU) está a 0 de 5. El Nivel 4 (memristor,
sin reloj) es horizonte de la industria.

Simular una neurona en software no es hacer trampa. Es el único
camino reproducible cuando no tienes Loihi en el cajón. La trampa
sería etiquetar esa simulación como «chip Akida activo».
`neurocpu akida` se niega. Ese *no* es parte del producto.

### «Loihi / Akida / SpiNNaker son órdenes de magnitud más grandes»

Correcto. Un millón de neuronas no se compara con un hipercubo de
64. No estamos en esa liga de silicio. Estamos en otra: **integrar
un motor de impulsos en el sitio donde el usuario ya está** —el
sistema operativo— con un contrato de 16 bytes y una ética de no
inventar.

Escalar neuronas sin un sitio que las use es un paper. Un sitio
sin neuronas honestas es un desktop más. Queremos las dos cosas, en
ese orden: primero el sitio, luego el NPU.

### «El lenguaje es plantillas. Eso no es comprender»

También correcto, y está escrito en el manual. `G_talk` compone
apertura, núcleo y cierre. `G_poetic` cuenta sílabas de un banco.
`G_code` dry-runea un catálogo. El castellano es máscara. El motor
habla WSP.

Comprender, en el sentido humano, no es una afirmación que este
laboratorio vaya a firmar. Clasificar, inferir en un DAG y
verificar: eso sí. La diferencia no es cosmética. Es la diferencia
entre un producto que se puede auditar y un producto que se puede
admirar.

### «Si es tan honesto, ¿por qué suena a IA?»

Porque el usuario necesita un nombre para el relé que le responde
en la tecla `v`. NAVI es ese nombre. La línea 1 a 6.5 existe para
que nadie confunda el hipercubo de 2010-equivalente con el tutor
causal, ni el tutor con un LLM.

Si el nombre estorba, ignóralo y mide los comandos. El nombre no
dispara spikes. El código sí.

### «Esto no sirve para mi empresa»

Puede. NAVI no extrae entidades de un CRM, no redacta contratos, no
sustituye un centro de datos. Sirve si te importa:

- un SO que puedes inspeccionar,
- un operador local sin nube,
- un protocolo de 16 bytes,
- un no como respuesta válida,
- un camino documentado hacia un NPU (Akida) sin vender el chip
  antes de tenerlo.

Si tu problema es otro, hay herramientas mejores. Decirlo no nos
quita el trabajo. Nos ahorra el de los dos.

## 6. Lo que pedimos, con educación

No pedimos que abandones Loihi, ni Akida, ni tu proveedor de LLM.
Pedimos tres cortes limpios en la conversación:

1. **No nos compares con un chatbot** como si el éxito fuera la
   fluidez. El éxito, aquí, es no alucinar.
2. **No nos compares con un ASIC** como si ya lo tuviéramos. El
   hook está; la placa no.
3. **Sí puedes pedirnos una demo que se rompe.** Arranca la ISO
   8.5, pulsa `v`, escribe `/prove`, pide un poema, pide
   `cuanto es 12 por 7 mas 3`, pide un compilador LLVM. Las
   cuatro respuestas son el argumento.

Un escéptico bien informado es un aliado. Un converso que no ha
medido es un riesgo. Preferimos al primero.

## 7. Cómo comprobarlo esta tarde

```
# host
python3 tests/test_navi65.py
./navi65 --ask "quien eres"
./navi65 --ask "escribe un compilador LLVM completo"

# ISO (release v8.5.0)
qemu-system-x86_64 -machine q35 -m 512M -cdrom rxOS-8.5.0-vm.iso -serial stdio
# tecla v, luego: /prove
#              neurocpu akida
```

El segundo comando debe negarse. Si un día dice que el NPU está
activo y no hay placa, eso es un bug, no un hito.

## 8. Lectura y fuentes

Nuestras:

- [NAVI 6.5](/docs/navi65) — el contrato RLC.
- [Cianotipo](/docs/cianotipo) — rxOS, NAVI, PRISMA, Akida.
- [Akida × rxOS](/docs/akida) — el gancho, sin teatro.
- [Catálogo 1 a 6.5](/docs/navi-catalog).

Ajenas, para no hablar de oídas:

- Intel Loihi 2 / Lava — documentación de Intel Labs.
- BrainChip Akida / MetaTF — [brainchip.com/ip](https://brainchip.com/ip/),
  [doc.brainchipinc.com](https://doc.brainchipinc.com/).
- Open Neuromorphic, guía de hardware —
  [open-neuromorphic.org](https://open-neuromorphic.org/neuromorphic-computing/hardware/).
- Merolla et al., TrueNorth, *Science*, 2014.
- Innatera Pulsar; SynSense Speck / Xylo — fichas de producto de
  borde.

Knights Labs no representa a Intel, IBM, BrainChip, SynSense ni
Innatera. Las cifras de sus chips son suyas. Las nuestras están en
el árbol y en la ISO.

Experimental. No clínico. GPLv3 en rxOS. El castellano, otra vez,
es solo la pintura.
