# echOS 3.0

echOS 3.0 es un **unikernel para robótica al edge**. Arranca directamente sobre la máquina, sin Linux, `systemd`, BusyBox ni una distribución escondida debajo. Su trabajo es recibir observaciones, producir intenciones limitadas y entregarlas a un controlador de vuelo sin asumir el control directo de los motores.

> Un cuerpo pequeño, medible y portable para sistemas robóticos. No es un chatbot y no contiene un LLM o SLM.

## Qué cambió en 3.0

- Una misma base arranca en **x86_64 BIOS**, **x86_64 UEFI** y **AArch64 UEFI**.
- El camino `sensor → intención → safety gate → autopiloto` usa registros y colas de tamaño fijo.
- Ese camino realiza **cero reservas dinámicas de memoria**, medido por el propio kernel.
- El puente MAVLink 2 intercambia telemetría, intenciones y confirmaciones con PX4 SITL.
- NVMe, GPT y persistencia se prueban contra un dispositivo emulado real y tras reiniciar.
- Los artefactos se separan por arquitectura y edición, y los builds limpios son reproducibles.
- NAVI y el experimento de asistente conversacional ya no forman parte del producto.

## El contrato robótico

Los sensores entran como registros enteros de 64 bytes. Las decisiones salen como intenciones de 72 bytes con origen causal, tiempo de captura, vencimiento, confianza y límites. La ABI sólo puede expresar órdenes de alto nivel como `HOLD`, `APPROACH`, `AVOID`, `RETURN_HOME`, `LAND` o `ABORT`.

No existe un campo para PWM, servo o acelerador. **PX4 conserva la autoridad sobre estabilización y actuadores.**

## Estado

La versión 3.0 está cerrada respecto a su definición de terminado: 19 requisitos cumplidos y seis certificados verdes. Eso no significa “producto aeronáutico listo para desplegar”. Significa que el alcance publicado está implementado, medido y acompañado por límites explícitos.

Consulta la [guía de uso](./guia), la [arquitectura](./arquitectura), la [evidencia](./evidencia) y la [galería real](./galeria).

— R.N.
