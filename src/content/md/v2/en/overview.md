# What echOS 2.0 is

**Rogex Laboratories · August 2026**

echOS 2.0 Universal is a **bare-metal x86_64** operating system. Unikernel.
One ELF. GRUB Multiboot2. There is no Linux underneath. No busybox. No systemd.
The machine *is* the program.

The 1.0 line (ECLIPSE) is a desktop: dock, windows, Nova, Eclipse Shell.
2.0 is **another product line**. Same laboratory, same family, different ISO.

The line I put in `kernel/version.h`:

> One kernel. Four editions. Zero graphics.

## Why it exists

The 1.0 desktop is the right tool for a laptop with a mouse and for showing
the lab. It is the wrong tool for:

- a LIVE image that fits in RAM and never touches a disk,
- an Edge build with Akida and no window manager,
- a Server that should not drag a compositor,
- a TUI installer that does not depend on “accept the licence in a window”.

I wanted a **shared Heap-0 kernel** and the edition chosen *at install time*,
not four forked trees. That is 2.0.

## In one sentence

A Liberation Mono console on the framebuffer (or VGA text), with ROSH, local
`epk`, an IPv4/DNS/TCP/HTTP(S) stack, OpenBSD-flavoured tools, and the same
event fabric / SNN as rxOS — no window, no dock, no fake hardware.

## What it is not

- Not “EchOS 1.0 with `startx` turned off”.
- Not Alpine, not OpenBSD, not Haiku. OpenBSD inspired *names* (`doas`,
  `rcctl`, `pfctl`). The kernel is ours.
- Not a desktop. If you want the dock, use 1.0 Complete.
- Not embedded Linux. If you want `apt`, this is the wrong page.

## The pieces that matter

| Piece | Role |
|---|---|
| Heap-0 | Static BSS layout. O(1). No fragmentation on the hot path. |
| RXFS | Native FS, fixed slots. Not ext4. 64 files × 64 KiB in this generation. |
| `epk` | **Local** packages. Never opens a socket. |
| LIVE | Boots in RAM. Minimal. `q` in the wizard and you are in. |
| Editions | Minimal / Complete / Edge / Server — a manifest, not a fork. |
| CLI | Liberation Mono, Braille logo, `termtheme`, `man`, `nano`. |
| Network | `www on`, `curl`, `wdl`, `ipconf`. HTTPS offers TLS 1.3, falls back to 1.2. |

## Naming

Older trees say `rxOS`, `RXos`, `EchOS`. This ISO is **echOS 2.0**. The boot
banner prints `[echOS]`. So does `uname`. So does `/etc/os-release`.

The git repository is still called RXos because that is how it was born.
I am not rewriting history for the landing page.

See also: [What's new vs 1.0](/docs/whats-new) · [Limits](/docs/limits)

— R.N.
