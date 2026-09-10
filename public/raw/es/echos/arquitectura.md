# Arquitectura técnica

## Separación por plataforma

El código genérico vive en `kernel/`, `fs/`, `userland/` y `ui/`. Las implementaciones concretas viven bajo `arch/x86_64`, `arch/aarch64` y los drivers de plataforma. La comprobación `make portability` impide que los árboles genéricos dependan accidentalmente de una arquitectura.

En x86, GRUB entrega un handoff Multiboot2 tanto bajo BIOS como bajo OVMF. En AArch64, la misma imagen puede arrancar directamente o como aplicación UEFI; el stub preserva el mapa de memoria que entrega el firmware.

## Runtime determinista

El pipeline robótico usa cuatro colas acotadas:

1. sensores hacia el runtime;
2. intenciones producidas;
3. intenciones pendientes del safety gate;
4. intenciones aprobadas hacia el autopiloto.

Los registros no contienen punteros ni floats. El tiempo es monótono, las unidades están fijadas y cada intención conserva la secuencia y tiempo del evento causal. Las guardas de pila, drops, expiraciones y marcas de agua se publican en cada informe.

## Safety gate

El gate valida ABI, rango, frescura, deadline, batería, enlace y geofence. Puede aceptar, limitar o bloquear; una decisión corregida no se acredita como aceptación del productor. El watchdog produce una intención segura cuando se agota el plazo.

## MAVLink y PX4

El parser MAVLink 2 es incremental, valida CRC y flags incompatibles, sigue secuencia por emisor y sólo decodifica los mensajes declarados. Convierte telemetría en Sensor ABI y traduce intenciones aprobadas a consignas de alto nivel. PX4 sigue siendo el controlador de vuelo.

## Disco

El stack de almacenamiento comparte una interfaz de bloques. NVMe aporta identificación, colas de órdenes, timeouts y propagación de errores. Sobre él, GPT y RXFS permiten verificar persistencia tras un reinicio real de la VM.

## Relación con echoAI

echOS es el cuerpo; echoAI es otra línea de investigación y permanece separado. La costura futura es una ABI de sensores e intenciones, no un chatbot dentro del kernel.

— R.N.
