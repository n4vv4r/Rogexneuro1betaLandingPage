# echOS 3.0, en ejecución

Las 13 imágenes son volcados directos del framebuffer de QEMU. No están compuestas ni retocadas. Cada captura enlaza el registro serie completo de ese mismo arranque.

## Selector de arranque

![Selector LIVE o instalación](/media/echos3/00-chooser.png)

La decisión se toma antes de arrancar. [Registro serie](/media/echos3/00-chooser.log)

## Sesión LIVE

![Sesión LIVE recién iniciada](/media/echos3/01-live.png)

La consola tras completar el checklist de boot. [Registro serie](/media/echos3/01-live.log)

## Identidad

![Orden about](/media/echos3/02-about.png)

Versión y propósito leídos del propio binario. [Registro serie](/media/echos3/02-about.log)

## Estado

![Orden status](/media/echos3/03-status.png)

Estado y localización de cada subsistema. [Registro serie](/media/echos3/03-status.log)

## Memoria

![Orden mem](/media/echos3/04-mem.png)

Regiones Heap‑0, arena `kmalloc` y asignador físico. [Registro serie](/media/echos3/04-mem.log)

## Límites compilados

![Orden limits](/media/echos3/05-limits.png)

Capacidades y techos de esta build. [Registro serie](/media/echos3/05-limits.log)

## Tipografía

![Muestra JetBrains Mono](/media/echos3/06-font.png)

JetBrains Mono 10×22, bloques, Braille y dibujo de cajas. [Registro serie](/media/echos3/06-font.log)

## Dispositivos

![Orden devices](/media/echos3/07-devices.png)

Hardware encontrado y aquello que el sistema declara que no conduce. [Registro serie](/media/echos3/07-devices.log)

## Runtime robótico

![Orden robot](/media/echos3/08-robot.png)

Registros, intenciones y veredictos del safety gate tras el escenario. [Registro serie](/media/echos3/08-robot.log)

## Informe local

![Orden report](/media/echos3/09-report.png)

Bloque de evidencia generado dentro del sistema. [Registro serie](/media/echos3/09-report.log)

## Paneles

![Shell y monitor en dos paneles](/media/echos3/10-panes.png)

Un shell y un monitor vivo compartiendo pantalla. [Registro serie](/media/echos3/10-panes.log)

## Ayuda

![Orden help](/media/echos3/11-help.png)

La lista de comandos reales del binario. [Registro serie](/media/echos3/11-help.log)

## PX4 SITL

![Enlace MAVLink con PX4](/media/echos3/12-px4.png)

Telemetría de entrada, intenciones de salida y `COMMAND_ACK`. [Registro serie](/media/echos3/12-px4.log)

## AArch64 por serie

ARM64 no tiene framebuffer. Publicar una pantalla inventada ocultaría ese límite, así que se ofrecen las transcripciones reales:

- [Arranque directo, status, CPU, red, robot y report](/media/echos3/aarch64-serial-kernel.txt)
- [Arranque UEFI edk2 y mapa de memoria del firmware](/media/echos3/aarch64-serial-uefi.txt)

— R.N.
