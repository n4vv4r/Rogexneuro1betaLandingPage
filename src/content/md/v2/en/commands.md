# Commands

The live list is `CMD_NAMES` in `userland/shell/commands.c`. Tab reads it.
Grouped the way I think about them. Flags: `man <cmd>`.

## Orientation

```text
help            short list
man / manual    pages
apropos / man -k
echofetch       card + logo
about / status / live
```

## System

```text
mem [map]       Heap-0 / PMM; firmware map
uptime
date / time     date set YYYY-MM-DD HH:MM:SS
uname / hostname
whoami / id
echo
env [K] [V]     volatile, BSS
power [s]       RAPL if Intel and no #GP
reboot / halt / poweroff
clear / cls
sudoers         /etc/sudoers (doas is the binary)
doas <cmd>
```

## Files (BSD names and Unix aliases)

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

## Disk (destructive: not on a casual LIVE)

```text
df / vault / du / dysk
partition / cfdisk / fdisk / gpt / disklabel
format <dev> yes
install / reinstall / echos-install
save / load
```

## Network

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
browse / nova     simple HTML
```

See [Network](/docs/network).

## Packages

```text
epk list|info|install|remove|search|apply
epk_add / epk_delete
rx …              legacy 1.0 channel (optional, www on)
update …
wallpaper [name]  recipes; the CLI has no desktop
```

## Neuromorphic / NAVI

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
tmux / ncdu / git     LIVE: stubs if the .epk is present
```

## Conventions I care about

- **unknown vs not installed:** two sentences. Typo versus `epk`.
- **No `sudo`.** `doas`.
- **No `apt`.** `epk`.
- **No Linux `ifconfig`.** `ipconf` (the alias exists because everyone types it).
- A formatting command wants `yes` or `ERASE-`. Otherwise it does nothing.

If you add a command: `CMD_NAMES`, dispatcher, `man` page. All three.

— R.N.
