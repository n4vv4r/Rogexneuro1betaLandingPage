# echoAI — arquitectura

Las analogías biológicas ayudan a leer el diseño, pero el código no finge
anatomía. Cada pieza tiene un contrato comprobable.

## WSP — el único bus

Un paquete fijo de 16 bytes: origen, relación, destino, tiempo, seis enteros de
estado y campos de dominio. Es la misma representación desde percepción hasta
acción. No existe un segundo bus para Pattern, el córtex o la narración.

## CAM — episodios verificados

4.096 ranuras, sin LRU destructivo. VERIFY necesita similitud suficiente y un
extracto entregado por el mundo. Una hipótesis del córtex nunca se escribe como
hecho. En todos los cierres de ECHO-1, `destroyed=0` y `false_facts=0`.

## T — modelo de un paso

`T(s,a)` conserva el sucesor dominante, el número de observaciones y los
conflictos. KCC impide que una observación aislada borre lo aprendido. Cuando
el mundo contradice una predicción conocida, la contradicción puede despertar
ATTEND en el turno siguiente.

## PatternMemory — contexto temporal

PATTERN-0 añade el estado anterior al contexto: `(prev, actual, acción)`. Usa
una tabla fija, direccionamiento abierto y enteros. Una regla sólo se ofrece
cuando está madura y no ha sido contradicha; si no hay regla, la predicción cae
a T.

Está apagada por defecto y comparte exactamente el canal de observación de T.
En el riff de prueba obtiene 80/80 predicciones frente a 40/80 de T.

## Q — política

Q es una tabla `int8` separada de CAM. El banco por defecto tiene tres acciones:
acercarse, apartarse y esperar. OPEN-1 demuestra que un mundo puede optar por
una cuarta acción, abrir, sin cambiar el contrato del anillo.

El aprendizaje usa consecuencias enteras. El resto de división que permite
propagar crédito más lejos es opt-in; WALK-1 sin ese resto permanece rojo y
documentado.

## Cuerpo y mundo

El agente no es su mapa. CUERPO-1 introdujo pose y orientación; SELF-1 separó
el desplazamiento producido por el motor del producido por el suelo. ROOM-1
añadió frames externos sin gastar el campo `domain` del WSP.

OBJ-1 y OPEN-1 distinguen estar en un sitio, transportar una cosa y ejecutar
la operación física necesaria para entregarla.

## Gate — control y veto

Toda propuesta termina en `OK`, `MODIFY` o `BLOCK`. El gate puede convertir una
espera en evitación ante una amenaza o bloquear una acción. El córtex propone;
el gate decide; el autopiloto físico conservará además sus propios failsafes.

## ATTEND y córtex

ATTEND decide cuándo vale la pena gastar el reloj lento: novedad, falta de
extracto, baja confianza, mapa desconocido o contradicción confirmada. El
córtex recibe un turno serializado y devuelve un WSP válido o silencio. La
prosa libre se rechaza.

SIGN-C demostró la latencia causal correcta: el mundo contradice T, el animal
despierta una vez por `conflict`, y la propuesta se consume al turno siguiente.
El registro de consumo ya muestra atención apagada.

## TALK — narración póstuma

TALK-1 traduce el diario después de la escena. Lee, valida y narra, pero no
importa el animal ni abre vías de escritura. Su auditor independiente compara
las dieciséis cláusulas de cada subtítulo con el registro original.

## Instrumentación

La placa web representa el diario de turnos y puede seguirlo en vivo mediante
polling local. Es observabilidad, nunca una entrada de control. El GIF de la
home procede de una corrida real.

## Monitor neuronal de ECHO-2

CAPACITY-1 seleccionó 512 neuronas LIF para firmas perceptivas y 128
Adaptive-LIF para contexto temporal. Es un monitor causal y observable: Q y el
gate conservan la decisión. NEURAL-VIZ-1 muestra sus capas y disparos junto a
WSP, CAM, T, patrones, homeostasis, muerte y herencia.

## Hardware futuro

Hoy echoAI corre en host y no hay AKD1500 M.2 en el laboratorio. Un acelerador
neuromórfico futuro se trataría como coprocesador perceptivo o head acotado,
nunca como VERIFY, memoria soberana o piloto.

— R.N.
