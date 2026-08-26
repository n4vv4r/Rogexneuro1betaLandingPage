# Filesystem

RXFS. Native. Not ext4, not FAT (except whatever the installer puts around
the MBR). VFS on top: `vfs_read`, `vfs_write`, paths.

## 2.0 tree

```text
/
├── boot/                 kernel, GRUB, NAVI weights
├── sys/
│   ├── editions/
│   ├── modules/
│   └── network/
├── bin/
├── etc/                  doas.conf pf.conf sudoers echos-edition os-release
├── epk/
│   ├── db/
│   └── manifests/
├── var/
│   ├── log/
│   └── run/
├── dev/
├── users/                ← not /home
│   └── <name>/
│       ├── Desktop
│       ├── Documents
│       ├── Downloads
│       └── …
└── tmp/
```

Seeded by `userland/cli/layout.c`. Idempotent. `HOME=/users/<user>`.
`OS=echOS 2.0`.

No `/usr`. No `/usr/local`. No `/home`. 1.0 scripts that hard-code
`/home` are wrong on 2.0.

## Size (this generation)

64 files. 64 KiB each. Seriously.

That is why `curl -o` of a large homepage truncates on write. That is why
CPython does not live in RXFS. That is why NAVI weights go through a GRUB
module.

When those numbers rise, this paragraph is rewritten. Until then it is
the ceiling.

## Persistence

Default: **amnesic**. LIVE is RAM.

With an installed disk: `save` writes the RXFS image, `load` reads it.
`format <dev> yes` empties it.

MBR + one EchOS partition. `partition`, `cfdisk`, `gpt`, `disklabel`
exist and **erase**. They are not a game.

## Permissions

Unikernel: one space. `/etc/sudoers` and `doas.conf` are policy text.
`/tmp` is annotated 1777 in `layout.c`; there is no Linux DAC.

LIVE user `live`: NOPASSWD on that list. That does not mean two rings.

## Directory names

Spanish wizard: Escritorio/Documentos/… English: Desktop/Documents.
Same place, labels. Wizard `lang`.

## `/dev`

Synthetic nodes: thermal, rapl, … `dev` / `cat /dev/…`. No udev.

## Backups

No `rsync`. `save` is the snapshot. Outside: `dd` the disk. RXFS is not
a FS you mount on Linux today. The host sees a blob.

— R.N.
