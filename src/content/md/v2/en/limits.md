# Limits — what I do not do

Lab policy: if it is not there, we say so. This page is as much product
as `echofetch`.

## Hardware

| Item | Status |
|---|---|
| Wi-Fi | no. PCI is listed. Zero driver. |
| NVMe | class `01:08` in `hwprobe`. No driver. SATA AHCI / IDE / virtio-blk yes. |
| Native UEFI | no. BIOS/CSM / SeaBIOS. |
| USB HID | not daily input. PS/2 keyboard and mouse. |
| Audio | not in 2.0 CLI. |
| GPU accel | no. LFB. |
| Akida | PCI probe. No board = software LIF. No BrainChip blob. |
| Loihi | a name. No silicon in this tree. |
| ARM64 kernel | documented triple; the Universal ISO ELF is x86_64. |

## Software

| Item | Status |
|---|---|
| Multi-process / ring-3 | stub. One task. |
| Real SMP | QEMU can `-smp`; the scheduler is not Linux. |
| POSIX | no. Command aliases, not glibc. |
| JS in `-dom` | no VM. Wait + refetch. |
| TLS 1.3 app-data | handshake OK; https GET can return empty. HTTP yes. |
| CA pin | no. |
| IPv6 | no. |
| Several TCPs at once | no. |
| Real sshd/httpd/ftpd | `rcctl` flags. Server manifest. |
| `doas` isolation | no. One memory map. |
| Large RXFS | 64 × 64 KiB. |
| Compilers on LIVE | stubs / notes. Host ELF + echlibc. |
| GNU `less` pager | own command, 8192 console. |
| Full locale | wizard ES/EN. Commands in English. |
| LIVE persistence | no, on purpose. |

## Heap-0

The contract is **not** met across the whole kernel. `kmalloc` lives.
The old NAVI actor takes a layer there. That is in `docs/AUDIT_2.0.md`.
I will not delete it from the audit so Heap-0 looks “clean” on a README.

## Network

One cooperative thread. Synchronous TX. RXFS is not IRQ-safe: a NIC IRQ
during `vfs_write` is the risk. Low, not zero.

virtio-blk INTx is masked because it shared a line with the NIC and boot
died. Polled. Correct, not elegant.

## Cryptography

`rogex-core` has no third-party audit. Boot KAT ≠ pentest. ML-KEM
self-test ≠ “we are post-quantum in production”.

## 1.0

The Eclipse desktop is **not abandoned**; it is not *on this ISO*. If a
1.0 user opens 2.0 and asks where the dock went, the answer is this
folder, not a patch.

## What I will sign

- The boot banner does not print `OK` unless that stage was actually checked.
- We do not fake a NIC, an NPU or a daemon.
- `command not found` ≠ `not installed`.
- `man` pages lie less than a two-line `--help`.

If you find a lying `OK`, that is a product bug, not copy.

— R.N.
