# Comandos de echOS 3.0

La lista viva está en `CMD_NAMES`. `Tab` usa esa misma tabla y `man <orden>` muestra la ayuda disponible.

## Para empezar

```text
help                 lista de órdenes reales
about                identidad y propósito del sistema
status               estado de subsistemas
limits               límites compilados
devices              hardware visto y soporte declarado
mem                   Heap-0, kmalloc y memoria física
report                bloque de evidencia medido por este arranque
```

## Robótica y PX4

```text
robot                contadores del runtime y del safety gate
robot run            escenario sintético, declarado como tal
px4                   estado MAVLink y contadores del enlace
px4 start HOST PORT   conecta con PX4 SITL por UDP
px4 stop              detiene el puente
```

`robot run` sirve para inspeccionar el pipeline sin sensores físicos. `px4 start 10.0.2.2 14580` es la forma usada por la galería y las pruebas QEMU; la dirección puede cambiar según la red del laboratorio.

## Consola y ficheros

```text
clear  history  font  termtheme
pane split | next | close | monitor | shell
ls  cd  pwd  cat  write  rm  cp  mv  mkdir  rmdir  tree
head  tail  less  grep  find  nano
df  du  save  load  format  partition
```

## Diagnóstico de red

```text
nics  ipconf  ping  dns  tls  curl  wget  trace  nmap
wired  chat  say
```

No hay navegador. Una descarga HTTP no implica un motor web.

## Construcción y certificación desde el host

```sh
make build-universal-x86_64
make build-universal-aarch64
make test-universal-x86_64 test-uefi-universal-x86_64
make test-storage-universal-x86_64
make test-px4-universal-x86_64
make test-universal-aarch64 test-uefi-universal-aarch64
make test-px4-universal-aarch64
make portability
make repro-universal-x86_64
```

Las pruebas de PX4 requieren PX4 SITL en el host; UEFI requiere OVMF/edk2 y las pruebas de arquitectura requieren QEMU.

— R.N.
