# Dónde están las ISOs — rxOS 9

Tras `make iso` (o `make iso-vm` / `make iso-metal`) las imágenes quedan **aquí**:

```
build/rxOS-9.0.0-vm.iso      QEMU / VirtualBox / cualquier emulador
build/rxOS-9.0.0-metal.iso   PC real (USB, BIOS/Legacy)
```

Release público: https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0

No uses la ISO de VM en un portátil y no uses la metal en QEMU si puedes evitarlo: el menú GRUB y la lista VESA son distintas.

| Ocasión | Archivo | Cómo arrancarla |
|---|---|---|
| Desarrollo / pruebas | `build/rxOS-9.0.0-vm.iso` | `make run` |
| **MacBook Air M1 / macOS ARM** | `build/rxOS-9.0.0-vm.iso` | `make run-macos` |
| VirtualBox | `build/rxOS-9.0.0-vm.iso` | IDE, chipset PIIX3 o ICH9, NIC e1000 o virtio-net, BIOS no EFI |
| PC real / HP 15-ac195nl | `build/rxOS-9.0.0-metal.iso` | `dd` al USB entero; CSM/Legacy ON |

Tamaños típicos: ~35 MB cada ISO.

SHA-256 de esta build (2026-08-17, 9.0.0):

```
6cb64e0cd007d09088e0b931fd8e49d9c07db45a65f959999f272ba16910c24c  build/rxOS-9.0.0-vm.iso
49f8f80f1e8c0ba4ebdf1f11592da1b0fb39c1a73d26b259205b88147bf87230  build/rxOS-9.0.0-metal.iso
```

(Las ISOs no van en git; se generan con `make iso`.)

## Flashear USB (metal)

```bash
lsblk                              # confirma el stick (p.ej. /dev/sda)
sudo dd if=build/rxOS-9.0.0-metal.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

GRUB: fondo eclipse, menú `rxOS 9.0.0 SMOKE - NAVI 7`.
