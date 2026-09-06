# echOS

An x86_64 console unikernel. One ELF. GRUB Multiboot2. There is no Linux
underneath. No BusyBox. No systemd. The machine *is* the program.

It is not a commercial operating system. It is not a browser. It is designed
for neuromorphic software and robotics.

> Console unikernel. Neuromorphic software. Akida when a board exists.

## In one sentence

A JetBrains / Liberation Mono console over a framebuffer (or VGA text), with
ROSH, local `epk`, an IPv4/DNS/TCP/HTTP stack, and an in-kernel event fabric / SNN
— no window, no dock, and no pretending about the hardware.

## What it is not

- It is not a desktop.
- It is not Alpine, OpenBSD, Haiku or embedded Linux.
- It is not a product for browsing the internet. `curl` downloads bytes.
- There is no Echo AI in this ISO.

## Components that matter

| Component | What it is |
|---|---|
| Heap-0 | Static layout in BSS. A 512 KiB `kmalloc` still exists and is disclosed. |
| RXFS | Native FS, 64 files × 64 KiB. |
| `epk` | Notes in RXFS. `epk list` = what the kernel has. `--lab` = host. |
| LIVE | Boots into RAM. Minimal. |
| SNN | Q6 cube of 64 LIF cells, synthetic `prisma5`, `bench-snn`. |
| Akida | PCI probe `1e7c:bca1`. Without a board = software LIF. |

## Honest surface

A stranger can boot LIVE, type `help` and cannot accuse it of theatre.
`rcctl start` does not pretend to start a daemon. `doas` does not isolate.
`pfctl` does not filter. `tcc` / `python` / `sshd` are not in Tab completion.

— R.N.
