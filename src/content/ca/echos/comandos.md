# Ordres

La llista viva és a `CMD_NAMES`. Tab la llegeix. Per als flags: `man <cmd>`.

## Orientació

```text
help            llista curta
man / manual    pàgines
apropos / man -k
echofetch       targeta + logo
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
power [s]       RAPL si la CPU és Intel i no fa #GP
reboot / halt
clear / cls
doas <cmd>      un espai d'adreces; no aïlla
```

## Fitxers

```text
ls cd pwd cat write rm cp mv mkdir rmdir tree
head tail less grep find
nano history
```

## Disc

```text
df du
partition cfdisk gpt disklabel
format <dev> yes
install / reinstall / echos-install
save / load
```

## Xarxa

```text
www on|off|status
curl / wdl / wget
ipconf  nics  dns  tls  ping  traceroute  nmap
wired / chat / say
```

No hi ha navegador. `curl` baixa bytes.

## Paquets

```text
epk list | list --lab | info | install | remove | apply
```

`epk list` són notes del nucli. `epk list --lab` són notes de host.

## Neuromòrfic

```text
hwprobe
bench / bench-snn
prisma5 [alpha|null|stress]    # drive sintètic del cub Q6
neuro / neurocpu [software|akida]
```

## Estil OpenBSD

```text
rcctl enable|disable|status|start|stop   # flags; no hi ha dimonis
pfctl -e|-d|-f|-s|-sr                    # booleà RAM; no filtra
```

— R.N.
