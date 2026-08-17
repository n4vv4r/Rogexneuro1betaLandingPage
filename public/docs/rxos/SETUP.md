# Arrancar rxOS 9 — QEMU, VirtualBox, PC real

Tres caminos. Elige uno. Las ISOs están en el release
[v9.0.0](https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0).

| Qué quieres | Archivo | Dónde |
| --- | --- | --- |
| Probar en 2 minutos | `rxOS-9.0.0-vm.iso` | QEMU (recomendado) o VirtualBox |
| Instalar en un PC | `rxOS-9.0.0-metal.iso` | USB, BIOS/Legacy, Secure Boot off |
| Hablar con NAVI 7.5 en el host | no hace falta ISO | `./navi75` o `python3 navi7_tui.py` |

SHA-256 (9.0.0):

```
6cb64e0cd007d09088e0b931fd8e49d9c07db45a65f959999f272ba16910c24c  rxOS-9.0.0-vm.iso
49f8f80f1e8c0ba4ebdf1f11592da1b0fb39c1a73d26b259205b88147bf87230  rxOS-9.0.0-metal.iso
```

## 1. QEMU (el camino corto)

Linux:

```bash
# Fedora
sudo dnf install qemu-system-x86-core
# Debian / Ubuntu
sudo apt install qemu-system-x86
```

macOS (Apple Silicon emula x86_64 con TCG):

```bash
brew install qemu
```

Arranque:

```bash
curl -LO https://github.com/knightslabs/RXos-Packages/releases/download/v9.0.0/rxOS-9.0.0-vm.iso

qemu-system-x86_64 \
  -machine q35 \
  -m 512M \
  -cdrom rxOS-9.0.0-vm.iso \
  -device virtio-net-pci,netdev=n0 \
  -netdev user,id=n0 \
  -serial stdio
```

En macOS: `make run-macos` desde el árbol, o el mismo comando. Detalle: [macos-m1.md](macos-m1.md).

Dentro del escritorio: tecla `v` abre Navi. En el Terminal:

```text
www on
nics
ping www.rogexlaboratories.com
```

## 2. VirtualBox

1. Nueva VM → tipo **Other / Unknown (64-bit)** → **512 MB** RAM → sin disco.
2. Ajustes → Sistema → **EFI desactivado** (BIOS).
3. Almacenamiento → controladora **IDE** → monta `rxOS-9.0.0-vm.iso` como CD.
4. Red → adaptador **Intel PRO/1000 (82540EM)** o virtio-net.
5. Arranca. No uses la ISO metal aquí.

Línea de comandos:

```bash
VBoxManage createvm --name rxOS9 --ostype Other_64 --register
VBoxManage modifyvm rxOS9 --memory 512 --firmware bios --graphicscontroller vboxvga --nic1 nat --nictype1 82540EM
VBoxManage storagectl rxOS9 --name IDE --add ide
VBoxManage storageattach rxOS9 --storagectl IDE --port 1 --device 0 \
  --type dvddrive --medium rxOS-9.0.0-vm.iso
VBoxManage startvm rxOS9
```

Más detalle: [virtualbox.md](virtualbox.md).

## 3. Hardware real (USB)

Hace falta un PC x86_64 con **CSM / Legacy BIOS**. Secure Boot **off**.

```bash
lsblk    # confirma el stick, p.ej. /dev/sdb — NO el disco del sistema
sudo dd if=rxOS-9.0.0-metal.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

Arranca con F9/F12. La ISO metal **es el instalador LIVE**. Elige idioma, reloj y disco. Eso borra el disco elegido.

Red en el HP 15-ac195nl de referencia: **Ethernet por cable** (RTL8106E). El WiFi RTL8188EE no tiene driver.

Si la pantalla queda negra: en GRUB elige **safe graphics (1024×768)**.

## 4. NAVI 7.5 en el host (sin ISO)

Desde el árbol [navywakura/RXos](https://github.com/navywakura/RXos):

```bash
python3 tests/test_navi75.py
./navi75 --ask "hola como te llamas"
./navi75 --ask "/search pedro sanchez"
python3 navi7_tui.py
```

Memoria: `lab/navi75/memory.db`. Harvest: Wikipedia + DuckDuckGo. No es un LLM.

## Si algo falla

| Síntoma | Qué mirar |
| --- | --- |
| No arranca en VirtualBox | EFI off, ISO **VM**, chipset BIOS, IDE |
| `www on` / ping fallan | NIC virtio o e1000; en metal, cable Ethernet |
| `/search` vacío en la ISO 9.0.0 | la ISO publicada aún cosecha por HTTP; en host usa `./navi75` |
| Pantalla negra en metal | GRUB → safe graphics; VESA 1024×768 |

Experimental. Primero en VM. Sin garantía.
