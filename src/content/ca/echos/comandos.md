# Ordres d'echOS 3.0

La llista viva és a `CMD_NAMES`. `Tab` llegeix aquesta mateixa taula i `man <ordre>` mostra l'ajuda disponible.

## Per començar

```text
help                 llista d'ordres reals
about                identitat i propòsit del sistema
status               estat dels subsistemes
limits               límits compilats
devices              maquinari vist i suport declarat
mem                   Heap-0, kmalloc i memòria física
report                bloc d'evidència mesurat en aquesta arrencada
```

## Robòtica i PX4

```text
robot                comptadors del runtime i del safety gate
robot run            escenari sintètic, declarat com a tal
px4                   estat MAVLink i comptadors de l'enllaç
px4 start HOST PORT   connecta amb PX4 SITL per UDP
px4 stop              atura el pont
```

`robot run` permet inspeccionar el pipeline sense sensors físics. `px4 start 10.0.2.2 14580` és la forma usada a la galeria i a les proves QEMU; l'adreça pot canviar en una altra xarxa de laboratori.

## Consola i fitxers

```text
clear  history  font  termtheme
pane split | next | close | monitor | shell
ls  cd  pwd  cat  write  rm  cp  mv  mkdir  rmdir  tree
head  tail  less  grep  find  nano
df  du  save  load  format  partition
```

## Diagnòstic de xarxa

```text
nics  ipconf  ping  dns  tls  curl  wget  trace  nmap
wired  chat  say
```

No hi ha navegador. Una baixada HTTP no implica un motor web.

## Construcció i certificació des de l'host

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

Les proves de PX4 requereixen PX4 SITL a l'host; UEFI requereix OVMF/edk2 i les proves d'arquitectura requereixen QEMU.

— R.N.
