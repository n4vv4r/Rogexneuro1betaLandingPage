# Comandos

La lista viva está en `CMD_NAMES`. Tab lee eso. Para flags: `man <cmd>`.

## Orientación

```text
help            lista corta
man / manual    páginas
apropos / man -k
echofetch       tarjeta + logo
about / status / live
```

## Sistema

```text
mem [map]       Heap-0 / PMM
uptime
date / time     date set YYYY-MM-DD HH:MM:SS
uname / hostname
whoami / id
echo
env [K] [V]
power [s]       RAPL si el CPU es Intel y no #GP
reboot / halt
clear / cls
doas <cmd>      un espacio de direcciones; no aísla
```

## Ficheros

```text
ls cd pwd cat write rm cp mv mkdir rmdir tree
head tail less grep find
nano history
```

## Disco

```text
df du
partition cfdisk gpt disklabel
format <dev> yes
install / reinstall / echos-install
save / load
```

## Red

```text
www on|off|status
curl / wdl / wget
ipconf  nics  dns  tls  ping  traceroute  nmap
wired / chat / say
```

No hay navegador. `curl` baja bytes.

## Paquetes

```text
epk list | list --lab | info | install | remove | apply
```

`epk list` son notas del kernel. `epk list --lab` son notas de host.

## Neuromórfico

```text
hwprobe
bench / bench-snn
prisma5 [alpha|null|stress]    # drive sintético del cubo Q6
neuro / neurocpu [software|akida]
```

## Estilo OpenBSD

```text
rcctl enable|disable|status|start|stop   # flags; no hay daemons
pfctl -e|-d|-f|-s|-sr                    # boolean RAM; no filtra
```

— R.N.
