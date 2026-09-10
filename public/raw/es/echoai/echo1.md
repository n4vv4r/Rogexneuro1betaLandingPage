# ECHO-1 — cierre

ECHO-1 es la primera integración completa del animal. No es una puntuación
única: es una cadena de capacidades en la que cada paso conserva los candados
anteriores.

```text
SELF-1 → ROOM-1 → GUI-3 → GUI-3.5 → OBJ-1 → OPEN-1
       → SIGN-C → TALK-1 → PATTERN-0 → XFER-1
```

## Base situada

Antes de ECHO-1 se cerraron el anillo de aprendizaje, la pregunta externa,
ATTEND, el modelo T, el gate, el cuerpo 2D, el crédito entero, el cubo 3D y la
atribución entre movimiento propio y movimiento del mundo.

El banco principal continúa funcionando sin córtex y sin hardware
neuromórfico. Sus candados siguen siendo WSP de 16 bytes, CAM de 4.096
ranuras, tres acciones por defecto, `destroyed=0`, `false_facts=0` y cero
llamadas al córtex.

## Cadena de capacidades

| Slice | Qué añadió | Evidencia de cierre |
|---|---|---|
| SELF-1 | yo frente al movimiento del mundo | offset motor 1 frente a 0; T 56 frente a 46 |
| ROOM-1 | dos habitaciones y frame externo | 324 sitios, 162 paquetes, transferencia 64 frente a 0 |
| GUI-3.5 | volumen 3D y diario vivo | 27 posiciones × 6 orientaciones; `--live` no detiene el animal |
| OBJ-1b | transportar X hasta Y | 51 entregas; control 0; dejar el objeto no cobra |
| OPEN-1 | operación física nueva | 46 entregas, 47 aperturas; control de tres acciones 0 |
| SIGN-C | contradicción conocida despierta lenguaje | una llamada; propuesta al turno siguiente; ROI `+16` |
| TALK-1c | narración póstuma independiente | 496/496 cláusulas; 256/256 registros; cero escrituras causales |
| PATTERN-0b | regularidad contextual | 80/80 frente a T 40/80; examen congelado |
| XFER-1d | mismo animal en tres mundos | ganancias `+56` y `+72`; agregado `+128` |

## SIGN-C y el modelo local

La contradicción sólo existe después de actuar: T predice un sucesor y el
mundo entrega otro. El origen tenía una predicción conocida, margen de política
suficiente y un letrero real; entonces se arma un latch de un turno. En el
siguiente turno se consume la propuesta sin afirmar que la atención sigue
encendida.

El stub determinista demuestra el cable en CI. Una ejecución separada con
Qwen3-4B-Instruct Q4_K_M, servida localmente, dio:

```text
8 llamadas · 0 rechazos · 6/8 respuestas correctas
4/6 paráfrasis frente a 0/6 del stub
dos canónicos correctos · CortexROI +16 · false_facts 0
```

La gramática específica de acción permite `UNIR`, `TEMER`, `OBSERVAR` o
`NONE`, siempre como relación local. La gramática general permanece intacta.
Las dos amenazas no canónicas equivocadas siguen visibles en el informe.

## PATTERN-0

T sólo puede guardar una respuesta para `(estado, acción)`. El riff necesita
saber de dónde venía el cuerpo:

```text
... B → A → C → A → B → A → C → A ...
```

PatternMemory usa `(previo, actual, acción)` y predice los dos sucesores de A.
El examen contiene cuatro rotaciones independientes, no aprende durante la
prueba y mantiene los desconocidos en el denominador. El control sin contexto
colapsa exactamente sobre T.

## XFER-1

Un solo objeto Agent conserva las mismas instancias de CAM, Q, T y
PatternMemory al cruzar tres físicas. Cada frontera se compara con un animal
nuevo y con otro que ha vivido el mismo número de turnos sin recibir la
regularidad útil.

| Frontera | Transferido | Nuevo | Ganancia | Control de edad |
|---|---:|---:|---:|---:|
| B | 208 | 152 | +56 | 152 → +0 |
| C | 224 | 152 | +72 | 152 → +0 |

Antes de caminar en el mundo nuevo, la memoria transferida resuelve 96/96
contextos; las memorias nueva y envejecida declaran 96 desconocidos. La
ablación usa la misma CAM para aislar PatternMemory: entrenada 96, vacía 0,
cero escrituras.

XFER-1 pasó cuatro rondas de endurecimiento del certificado. La puerta final
recomputa protocolos, recorridos, denominadores, ablación y canal desde las
filas; no cree los resúmenes del propio informe. El informe contiene 51
mutantes requeridos, todos muertos.

## Cierre reproducible

```bash
cd /ruta/al/repo/RXos
PYTHONPATH=. python3 -m echoai.nexus0.xfer1
PYTHONPATH=. python3 -m echoai.tests.test_nexus0
```

Resultado auditado: `xfer1 rc=0`, `green=true`, 488 pruebas correctas y un
fallo esperado documentado.

— R.N.
