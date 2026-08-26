# For users

If you do not write C, this is enough.

## What you will see

Boot the ISO. GRUB waits two seconds and enters **Installer / LIVE**.
A TUI asks language, timezone, keyboard, edition. The hint says **q** is
LIVE. If you only want to look, press `q`. Nothing is written to disk.

You land on a black console:

```text
live@echos /users/live#
```

That is the product. No desktop. No icons. If that is not what you wanted,
1.0 Complete is your ISO.

## Try these first

```text
echofetch
help
man
man curl
ipconf
tree
```

`echofetch` paints the official droplet (Braille dots) on the left and the
specs on the right.

## Files

There is no Explorer. Commands — Unix names plus the BSD-flavoured ones I
prefer:

| You want | You type |
|---|---|
| list | `ls` or `catalog` |
| enter | `cd` or `wander` |
| where | `pwd` or `whereami` |
| read | `cat` or `unveil` |
| edit | `nano notes.txt` |
| tree | `tree` (or `tree /`) |
| delete | `rm` |

Your folder is `/users/live/` (or the name you chose at install). Desktop,
Documents, Downloads — labelled in the wizard language.

**RXFS is small.** One file is 64 KiB. This is a laboratory, not a NAS.

## Network

```text
www on
ipconf
ping 10.0.2.2
curl -I http://example.com
wdl https://example.com
```

`www on` brings IPv4 up. QEMU usually lands on `10.0.2.15`. A laptop needs
a wired NIC (virtio, e1000, Realtek 810/8139). **There is no Wi-Fi.** The
HP 15's RTL8188EE shows up in `nics` and is not driven.

## Real install

Only if you intend to erase a disk.

```text
echos-install
```

The wizard wants an `ERASE-` confirmation. LIVE does not install.
`reinstall` is destructive on purpose.

## Shutdown

```text
halt
reboot
```

LIVE is amnesic: anything you did not `save` onto an installed disk is gone.

## If a command “does not exist”

Two different sentences:

- **command not found** — not in the kernel, not in `epk`.
- **not installed** — the package exists in the catalogue; LIVE may only
  have a stub (the name answers; a 200 MiB compiler does not fit).

`man <command>` and `epk list` settle it.

## Theme and keyboard

```text
termtheme night
termtheme matrix
termtheme ocean
termtheme amber
termtheme paper
kbd es
kbd us
```

Mouse wheel and PgUp/PgDn scroll. Tab completes command names. Arrows walk
`history`.

## What I will not sell you

There is no graphical browser in 2.0. `browse` / `nova` are simple HTML on
the console. `curl -dom` waits two seconds and dumps text; **it does not
run JavaScript**. A Vite SPA will show the shell. That is not a CLI bug.
There is no V8 in this unikernel.

— R.N.
