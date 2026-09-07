# Guía de uso

Esta guía explica qué verá una persona al arrancar echOS 3.0. No es una guía de vuelo ni sustituye una revisión de seguridad.

## 1. Elegir el arranque

En x86 aparece un selector antes del kernel: ejecutar una sesión **LIVE** o entrar en el flujo de instalación. Para conocer el sistema sin escribir en disco, usa LIVE.

## 2. Comprobar la máquina

Al llegar a la consola:

```text
about
status
devices
limits
```

`status` enseña qué subsistemas están activos. `devices` distingue hardware detectado de hardware soportado. `limits` publica los techos fijos de esa compilación.

## 3. Leer la evidencia local

```text
mem
robot run
robot
report
```

`robot run` inyecta un escenario **sintético**. Después, `robot` muestra qué aceptó, modificó o bloqueó el safety gate. `report` genera el bloque que alimenta el informe técnico.

## 4. Trabajar con la consola

`help` y `man` son la fuente de verdad. Puedes trabajar con RXFS, consultar red y dividir la consola:

```text
pane split
pane monitor
pane next
```

Hay un shell y varias vistas; el monitor se actualiza mientras se usa otro panel.

## 5. Conectar PX4 en laboratorio

Con PX4 SITL ya arrancado en el host:

```text
px4 start 10.0.2.2 14580
px4
```

La pantalla debe mostrar telemetría recibida, intenciones transmitidas y `COMMAND_ACK`. Para probar la conducta segura se interrumpe el enlace y se observa la degradación a `HOLD`; no se ordena un motor desde echOS.

## 6. AArch64

En ARM la interacción es por serie PL011. Es normal no ver framebuffer: la transcripción real está publicada en la [galería](./galeria).

— R.N.
