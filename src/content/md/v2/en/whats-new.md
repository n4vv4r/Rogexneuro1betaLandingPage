# What's new versus EchOS 1.0

**ECLIPSE (1.0) → Universal (2.0).**

1.0 is not dead. Complete / Minimal / Edge 1.x remain the desktop (or Edge
CLI) lines with compile-time flags. 2.0 is the line I use now for LIVE, metal
and the lab console.

## At a glance

| | EchOS 1.0 ECLIPSE | echOS 2.0 Universal |
|---|---|---|
| Interface | Eclipse desktop, dock, windows | Console. Zero WM. |
| Type | Mixed; FB tinted cyberpunk green | Liberation Mono. CLI palette (`termtheme`). |
| Kernel | One ELF **per** edition (`-D` flags) | **One** Heap-0 ELF. Edition = `epk` manifest. |
| Users | `/home` | `/users` |
| Tree | Unix leftovers (`/usr`) | `/boot /sys /bin /etc /epk /var /dev /users /tmp` |
| Installer | graphical wizard | 80×25 TUI, ES/EN, `q` = LIVE |
| GRUB | VM vs metal menus | LIVE / memtest / recovery, one cfg |
| Packages | `rx-pkg` / optional HTTPS channel | `epk` **local only** |
| Manual | truncated `help` | `man` / `manual` / `apropos` |
| HTTP | basic `curl`, `wget`, TLS 1.2 | `curl` flags, `wdl`, TLS 1.3 offered |
| NIC view | `nics` (PCI) | `ipconf`: driver, MAC, IPv4, gw, DNS |
| Editor | `write` / `scribe` | `nano` / `pico` TUI |
| Tree | shallow `tree` | recursive, coloured, cwd default |
| Logo | host ASCII | Braille U+2800 on the framebuffer |
| NPU | stubs | real PCI `1e7c:bca1`; no board → no fake |
| libc | — | `echlibc` (64 KiB BSS mmap, no glibc malloc) |

## Decisions that hurt (on purpose)

**I removed the desktop from this ISO.** The WM still builds in 1.0. In 2.0
the contract is: if there is a window pixel, I failed.

**I removed `/home`.** This is not Unix. The user lives in `/users/<name>/`.
Scripts that write `/home` are reading 1.0 docs.

**`epk` never phones home.** 1.0 had a package channel on
`rogexlaboratories.com`. In 2.0 the catalogue rides **in the ISO**. Missing
from the media means it does not exist. I prefer an honest “not installed”
to a silent curl to my own server.

**Cyberpunk green no longer paints the whole console.** 1.0 used `RGX_FG
#00FF9D` for everything. 2.0 has its own palettes: `night`, `matrix`,
`ocean`, `amber`, `paper`.

## 2.0 adds (1.0 did not have)

`man`, `wdl`, `curl -I -L -O -o -X -d -b -c -dom`, `ipconf`, command
`history`, Tab complete, blinking caret, mouse-wheel scrollback, `termtheme`
on the CLI, `www source`, small `nmap`, `traceroute`, `nano`, TUI wizard,
GRUB memtest/recovery, Heap-0 as a product contract, `doas` / `rcctl` /
`pfctl`, `bench-snn`, `prisma5`, sovereign FHS, LIVE stubs for toolchain
names that cannot fit in RXFS.

## 1.0 still has (2.0 does not carry)

Q16.16 dock magnification, icon drag, Nova as a window, graphical IDE,
wallpaper chrome, ECHO Navi 10 as three desktop heads.

Navi *does* exist in 2.0 as console commands (`navi`, `navi2`, `navi3`,
`navi6`). There is no Eclipse chat window.

## Version numbers

| Product | Version | ISO |
|---|---|---|
| EchOS 1.0 Complete/Minimal/Edge | 1.0.0 | `EchOS-1.0.0-<ed>-{vm,metal}.iso` |
| echOS 2.0 Universal | 2.0.0 | `EchOS-2.0.0-universal-{vm,metal}.iso` |
| echOS 2.0 Server | 2.0.0 | same family, server manifest |

`RXOS_VERSION` in a header still says `"1.0.0"` as a legacy alias. Do not
use it. Use `ECHOS_VERSION`.

— R.N.
