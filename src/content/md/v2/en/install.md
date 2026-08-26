# Installing echOS 2.0

Three ways in, and they are not equivalent.

1. **LIVE** — RAM. Amnesic. What I want you to try first.
2. **Installed to disk** — MBR + kernel + RXFS. Destructive.
3. **Recovery / memtest** — GRUB entries 2 and 3.

## The ISOs

```text
build/EchOS-2.0.0-universal-vm.iso      QEMU / VirtualBox
build/EchOS-2.0.0-universal-metal.iso   real PC / USB
```

In 2.0 the GRUB cfg is the same (`grub-universal.cfg`). Still: use *vm* in
the emulator and *metal* on a laptop.

```sh
make EDITION=universal iso-vm iso-metal
```

About 36 MiB each. ELF ~4.5 MiB. Not in git.

1.0 desktop ISOs remain `EchOS-1.0.0-<edition>-{vm,metal}.iso`. Different
product. Downloads page lists what is published.

## QEMU (daily path)

```sh
qemu-system-x86_64 -machine q35 -m 512M -accel kvm \
  -cdrom EchOS-2.0.0-universal-vm.iso \
  -serial stdio \
  -netdev user,id=net0 \
  -device virtio-net-pci,netdev=net0,bus=pcie.0,mac=52:54:00:12:34:56
```

TUI: **q** = LIVE Minimal. Enter walks language → zone → keyboard → locale
→ edition → disk.

### Network in QEMU

slirp: guest `10.0.2.15/24`, gw `10.0.2.2`, DNS `10.0.2.3`.
`www on` applies that if DHCP fails (OUI `52:54:00` or virtio/e1000).

ICMP is often filtered by slirp. `ping google.com` may fall back to UDP/53.

### Disk in QEMU (optional)

Without virtio-blk, LIVE is simpler (fewer IRQs). The driver masks INTx and
polls. If boot hangs after `nic`, shared IRQ: that mask exists for a reason.

## USB / metal

```sh
lsblk
sudo dd if=EchOS-2.0.0-universal-metal.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

BIOS/CSM Legacy. Native UEFI is not done. HP 15-ac195nl: Ethernet cable, not
Wi-Fi. `nics` lists `10EC:8136` (r8169) and Wi-Fi `10EC:8179` which I do not
drive.

## The wizard

1. Language (English / Español)
2. Timezone
3. Keyboard en/es
4. Locale
5. Edition: Minimal, Complete, Edge, Server, or LIVE
6. Disk (if not LIVE) — `ERASE-` or `REINSTALL-`

From an already-running LIVE: `echos-install` opens it again.

Host preview (no QEMU):

```sh
cc -std=c99 -Wall -o echos-install tools/echos-install-host.c
./echos-install
```

It does not format your Fedora. Menu only.

## LIVE vs installed

| | LIVE | Disk |
|---|---|---|
| Persistence | no (unless `save` to a disk that already exists) | `save` / `load` |
| User | `live` | wizard name |
| Packages | full catalogue *visible*; toolchain often stub | `epk apply <edition>` |
| Danger | low | high (MBR) |

`format <dev> yes` empties RXFS. `reinstall <dev>` stomps leftover GPT/MBR.
Do not run them “to see what happens”.

## GRUB

Timeout 2 s. Entries: Installer / LIVE, Memory Test, Recovery, text console
only (same live, `gfxpayload=text`).

## Apple Silicon

x86_64 does not HVF. TCG: `make EDITION=universal run-macos`. Slow TUI.

## If it does not boot

- QEMU: machine `q35`.
- Metal: CSM on, Secure Boot off.
- Black screen, live serial: VESA failed; GRUB entry 4 (text).
- Hang after NIC: rebuild (blk INTx mask).

1.0 desktop install (Eclipse Shell) is a different ISO and a graphical
wizard. Do not mix the two manuals.

— R.N.
