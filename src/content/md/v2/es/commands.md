# Comandos

La lista viva está en `CMD_NAMES` (`userland/shell/commands.c`). Tab
lee eso. Aquí, agrupados como yo los pienso. Para flags: `man <cmd>`.

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
mem [map]       Heap-0 / PMM; mapa firmware
uptime
date / time     date set YYYY-MM-DD HH:MM:SS
uname / hostname
whoami / id
echo
env [K] [V]     volátil, BSS
power [s]       RAPL si el CPU es Intel y no #GP
reboot / halt / poweroff
clear / cls
sudoers         /etc/sudoers (doas es el binario)
doas <cmd>
```

## Ficheros (nombres BSD y alias Unix)

```text
ls / catalog / dir
cd / wander
pwd / whereami
cat / unveil
write / scribe
rm / vanish / del
cp / forge / copy
mv / relabel / rename
mkdir / homestead
rmdir / raze
tree
head / peep / tail / less
grep / find
nano / pico
history
```

## Disco (destructivos: no en LIVE de paseo)

```text
df / vault / du / dysk
partition / cfdisk / fdisk / gpt / disklabel
format <dev> yes
install / reinstall / echos-install
save / load
```

## Red

```text
www on|off|status|config|dns|get|post|source|channel
curl …            man curl
wdl …             man wdl
wget …
ipconf / ipconfig / ifconfig
nics / lspci-net
dns <host>
tls <host>
ping
traceroute / trace
nmap <host>
wired / mesh / chat / say
browse / nova     HTML simple
```

Ver [red.md](/docs/network).

## Paquetes y updates

```text
epk list|info|install|remove|search|apply
epk_add / epk_delete
rx …              canal legado 1.0 (opcional, www on)
update …
wallpaper [name]  recetas; el CLI no tiene escritorio
```

## Neuromórfico / NAVI

```text
hwprobe / lspci
bench / bench-snn
prisma5 [alpha|null|stress]
neuro / neurocpu [software|akida|loihi]
navi / monad
navi2 / navi3
navi6 / navi65
wsp-tool
```

## OpenBSD-ish

```text
rcctl start|stop|enable|disable|status
pfctl -e|-d|-f|-s|-sr
htop / top / rxmon
tmux / ncdu / git     LIVE: stubs si el .epk está
```

## Apps Roxenite (legado 1.0, sigue el runtime)

```text
apps
run <file.rxc>
rx …
```

## Split (restos de Terminator del desktop)

`split` / `vsplit` / `hsplit` / `unsplit` — en 2.0 CLI_ONLY no esperes
paneles gráficos. Si responden, es el código 1.0 todavía enlazado.
No construyas flujo de trabajo encima.

## Convenciones que me importan

- **unknown vs not installed:** dos frases. La primera es un typo. La
  segunda es `epk`.
- **No hay `sudo`.** `doas`.
- **No hay `apt`.** `epk`.
- **No hay `ifconfig` de Linux.** `ipconf` (el alias existe porque
  todo el mundo lo escribe).
- Un comando que formatea pide `yes` o `ERASE-`. Si no, no hace nada.

Si añades un comando: `CMD_NAMES`, dispatcher, `man` page. Los tres.
Si omites el man, el usuario tiene que leer el C. Eso es fallar.

— R.N.
