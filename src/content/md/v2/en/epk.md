# epk — local packages

`epk` is the 2.0 manager. Not `apt`. Not OpenBSD `pkg_add`, though the
subcommands rhyme. **It never opens a socket.**

## Why local

In 1.0 the channel `https://www.rogexlaboratories.com/rx-os/packages`
felt convenient and started smelling like “the OS phones home”. In 2.0
the catalogue travels **in the ISO** (`/media/epk`). The kernel keeps a
mirror in `userland/cli/epk.c`. Not on the media, not installed.

## Commands

```text
epk list
epk info [pkg]
epk search <word>
epk install <pkg>      # alias: epk_add
epk remove <pkg>       # alias: epk_delete
epk apply <edition>    # minimal|complete|edge|server
epk stress [N]         # install/remove, Heap-0 delta
```

`epk apply` walks `editions/<ed>.manifest`.

## What a “package” is here

RXFS will not swallow CPython. A Complete `.epk` is often a **marker**:
name, note in `/bin`, row in `/epk/db`. Real ELFs, when they exist, are
linked on the **host** against `echlibc`. On LIVE, toolchain commands
(`tcc`, `python`, `qjs`, `rustc`, `make`, `nasm`, `git`, `httpd`) may be
stubs: the name answers, the 200 MiB compiler is not there.

That is filesystem size, not a trick for `epk list`. When RXFS grows, the
stubs go. Until then I would rather a LIVE stub than `command not found`
right after you read `tcc` in `epk list`.

## Where it lives

```text
/epk/db            records
/epk/manifests     active edition
/bin               notes / stubs
/media/epk         ISO catalogue
```

Host format: RXP1, same as 1.0 `rx-pkg`. Linux binary: `packages/bin/epk`.

## LIVE

`epk_live_all()` marks the catalogue available. It does not mean CPython
fits. It means edition policy is not hiding names.

## `rx app`

Legacy channel, optional, wants `www on`. Not the 2.0 path. Left so 1.0
scripts do not break. The path is `epk`.

## echlibc

`packages/echlibc/`. Minimal libc for static ELFs *from host toward echOS*,
not for the kernel. Fake syscalls: `sys_open` `sys_read` `sys_write`
`sys_mmap` `sys_spawn`. `mmap` = 64 KiB BSS window. No glibc `malloc` in
that contract. `packages/coretools/*` on Linux *do* malloc: they are
Fedora binaries, outside Heap-0.

Triples I want (host still `x86_64-unknown-none`):
`x86_64-unknown-echos`, `aarch64-unknown-echos`, `i686-unknown-echos`.

— R.N.
