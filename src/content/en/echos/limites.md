# Limitations — what I do not do

Laboratory policy: if it is not there, say so.

## Hardware

| Item | Status |
|---|---|
| Wi-Fi | no. PCI is listed. Zero drivers. |
| NVMe | class `01:08` in `hwprobe`. No driver. SATA AHCI / IDE / virtio-blk do work. |
| Native UEFI | no. BIOS/CSM / SeaBIOS. |
| USB HID | not as log input. PS/2 keyboard and mouse. |
| Audio | no. |
| GPU acceleration | no. LFB. |
| Akida | PCI probe. Without a board = software LIF. No BrainChip blob. |
| Loihi | outside 2.1. Zero interfaces. |
| ARM64 kernel | the Universal ISO ELF is x86_64. |

## Software

| Item | Status |
|---|---|
| Multiprocess / ring 3 | sketch. One task. |
| POSIX | no. Command aliases, not glibc. |
| TLS 1.3 application data | the handshake works; HTTPS GET may return an empty body. HTTP works. |
| CA pinning | no. |
| IPv6 | no. |
| Several simultaneous TCP connections | no. |
| real sshd/httpd/ftpd | `rcctl` flags. No daemons. |
| `doas` isolation | no. One memory map. |
| RXFS | 64 × 64 KiB. |
| Compilers in LIVE | absent. `epk list --lab` = host notes. |
| Browser / JS | no. `curl` downloads bytes. |
| LIVE persistence | no, intentionally. |
| Commercial use as a general OS | no. Laboratory / robotics / SNN. |

## Heap-0

The contract is **not** satisfied throughout the kernel. `kmalloc` exists.

## What I do sign

- The boot banner does not print `OK` if that stage was not verified.
- It does not pretend that a NIC, NPU or daemon exists.
- `command not found` is not the same as “not installed”.

— R.N.
