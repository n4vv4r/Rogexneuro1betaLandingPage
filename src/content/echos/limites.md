# Límites de echOS 3.0

Cerrar 3.0 no convierte un sistema de investigación en un producto certificado. Estos son los bordes actuales.

## Plataforma

| Capacidad | Estado actual |
|---|---|
| SMP | Ausente: un núcleo por arquitectura. |
| AArch64 gráfico | Ausente: consola PL011 serie, sin framebuffer. |
| AArch64 userland | Shell de diagnóstico reducido; no replica la consola completa de x86. |
| AArch64 device tree | Se usa para memoria; PL011, GIC y virtio-mmio aún usan tres direcciones fijas. |
| ACPI | Sin lector. En UEFI ARM el mapa de memoria procede del firmware. |
| Wi‑Fi, audio, GPU | Sin controladores. |
| USB HID | No es la entrada habitual; x86 usa PS/2. |
| Akida | Sólo sonda PCI: detectada significa **no soportada**, no acelerada. |

## Robótica

- PX4 SITL se ejecuta en el host y no está dentro de la ISO.
- El productor autónomo incluido es deliberadamente sencillo: distancia, batería y enlace. No es echoAI.
- El geofence es una caja alineada a ejes; no modela terreno ni polígonos.
- No se ha certificado vuelo real, normativa aeronáutica, seguridad funcional ni tolerancia a todos los fallos de hardware.
- No hay acceso a PWM o motores desde la ABI de intenciones.

## Sistema

- No es POSIX ni un sistema operativo general.
- No hay aislamiento completo de procesos ni anillo 3 de producción.
- RXFS es pequeño y deliberadamente limitado.
- La pila de red no equivale a un navegador ni a un servidor multiusuario.
- El contrato Heap‑0 cubre el camino robótico; `kmalloc` sigue existiendo fuera de él.
- Los percentiles publicados son límites de buckets, no una precisión inventada. Bajo emulación pueden cambiar entre corridas.

El criterio es sencillo: una ausencia publicada es una propiedad verificable, no una promesa futura disfrazada.

— R.N.
