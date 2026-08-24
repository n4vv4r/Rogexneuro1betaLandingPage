# Instalar EchOS 1.0

Guía rápida para poner EchOS **Minimal**, **Edge** o **Dev** en una máquina
virtual o en hardware real.

## Requisitos

| | Mínimo | Recomendado |
|---|---|---|
| CPU | x86_64 con SSE2 | 2+ núcleos |
| RAM | 512 MB | 1 GB |
| Almacenamiento | ISO 40 MB | USB 4 GB para instalar |
| Firmware | BIOS legacy o UEFI-CSM | — |

## Descargar

Ve a [Downloads](/downloads). Elige tu edición:

- **Minimal** — escritorio completo para uso diario.
- **Edge** — CLI para IoT, robótica, drones, cámaras.
- **Dev** — Minimal + atajos de teclado + IDE.

Cada edición viene como `EchOS-1.0.0-<edición>-vm.iso` (QEMU/VirtualBox) y
`-metal.iso` (hardware real), más `EchOS-1.0.0-usb.img.gz` para USB.

## Verificar

```bash
sha256sum -c SHA256SUMS.txt
```

## QEMU (Linux)

```bash
qemu-system-x86_64 -machine q35 -m 1024 \
  -cdrom EchOS-1.0.0-minimal-vm.iso \
  -vga std -display gtk
```

## VirtualBox / VMware

Crea una VM x86_64 con ≥512 MB de RAM, sin EFI (BIOS/CSM), y monta la ISO
`-vm` como disco óptico. Arranca.

## USB (hardware real)

```bash
gunzip EchOS-1.0.0-usb.img.gz
sudo dd if=EchOS-1.0.0-usb.img of=/dev/sdX bs=4M status=progress conv=fsync
```

⚠️ `/dev/sdX` es tu pendrive — `lsblk` primero, dd destruye lo que apuntes.

## Primer arranque

1. GRUB → entrada `EchOS 1.0.0 <EDICIÓN>`.
2. El sistema crea tu cuenta local (usuario + contraseña). Es **local**,
   vinculada al hardware UID — no hay cuenta en la nube.
3. Escritorio Eclipse Shell: dock abajo, Start arriba a la derecha.

## Red

```text
www on                      # DNS + TCP + HTTP + TLS 1.2
ping google.com
dns rogexlaboratories.com
browse https://example.com  # o abre Nova desde el dock
```

## Amnésico por diseño

Nada se escribe a disco salvo que lo pidas (`install` a disco, o `save`).
Sin persistencia, cada arranque es limpio.
