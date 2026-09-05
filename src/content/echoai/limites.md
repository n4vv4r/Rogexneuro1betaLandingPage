# echoAI — límites

La política del laboratorio es separar resultados, planes e hipótesis.

## Lo que ECHO-1 no demuestra

- No es inteligencia general ni una persona artificial.
- No reconoce objetos en imágenes reales.
- No hace SLAM, control de vuelo ni navegación certificada.
- No opera todavía con ruido, viento, latencia física o sensores incompletos.
- No demuestra supervivencia autónoma; eso pertenece a ECHO-2.
- No contiene un AKD1000 ni otro NPU físico.
- No convierte el rendimiento de un mundo sintético en una afirmación de
  seguridad robótica.

## Deuda visible

WALK-1 sin resto entero no propaga valor hasta el objetivo y permanece como
`expectedFailure`. La variante opt-in CREDIT-1 sí camina, pero no se cambió el
algoritmo por defecto.

El Qwen local acertó los ejemplos canónicos de SIGN-C y ganó al stub en
paráfrasis, pero eligió `approach` en dos amenazas no canónicas y recibió
`-16`. Eso demuestra por qué su salida es una propuesta y no una orden segura.

CAM tiene 4.096 ranuras y no usa LRU. Los mundos actuales todavía son pequeños;
SLEEP-2 sólo se justificará cuando exista presión de memoria medida.

## Condiciones para robótica

Antes de volar, ECHO-3 deberá demostrar:

- deadlines y latencia P99 bajo carga;
- sincronización y caducidad de sensores;
- watchdog, retorno y aterrizaje ante pérdida del companion computer;
- veto independiente ante observaciones contradictorias;
- límites de batería, masa, temperatura y vibración;
- registro reproducible de cada decisión;
- simulación, HIL y jaula antes de campo abierto;
- cumplimiento de la normativa aplicable y operación humana de emergencia.

Un modelo neuronal, un LLM o un NPU no será la única barrera contra una
colisión. El autopiloto y los mecanismos de seguridad permanecen separados.

## Akida

No hay AKD1000 en el laboratorio. Las cifras de consumo o aprendizaje del
fabricante no son resultados de RxLabs. Si llega una placa, se publicarán
compatibilidad, modelo exacto, toolchain, potencia medida y comparación contra
CPU/Jetson antes de hablar de ventaja.

## Estado de las palabras

- **Hecho:** existe informe reproducible y puerta verde.
- **Rojo medido:** el experimento corre y no alcanza el KPI.
- **Plan:** orden propuesto; todavía no es una capacidad.
- **Ausente:** no existe en el laboratorio.

— R.N.
