# Límits — el que no faig

Política del laboratori: si no hi és, es diu.

## Maquinari

| Cosa | Estat |
|---|---|
| Wi-Fi | no. PCI es llista. Zero drivers. |
| NVMe | classe `01:08` a `hwprobe`. Sense driver. SATA AHCI / IDE / virtio-blk sí. |
| UEFI natiu | no. BIOS/CSM / SeaBIOS. |
| USB HID | no com a entrada de diari. Teclat i ratolí PS/2. |
| Àudio | no. |
| Acceleració GPU | no. LFB. |
| Akida | sonda PCI. Sense placa = LIF per programari. Sense blob BrainChip. |
| Loihi | fora de 2.1. Zero interfícies. |
| Nucli ARM64 | l'ELF de la ISO Universal és x86_64. |

## Programari

| Cosa | Estat |
|---|---|
| Multiprocés / anell 3 | esbós. Una tasca. |
| POSIX | no. Àlies d'ordres, no glibc. |
| Dades d'aplicació TLS 1.3 | la negociació funciona; GET https pot tornar buit. HTTP sí. |
| Pin de CA | no. |
| IPv6 | no. |
| Diversos TCP alhora | no. |
| sshd/httpd/ftpd reals | flags `rcctl`. No hi ha dimonis. |
| Aïllament `doas` | no. Un mapa de memòria. |
| RXFS | 64 × 64 KiB. |
| Compiladors a LIVE | absents. `epk list --lab` = notes de host. |
| Navegador / JS | no. `curl` baixa bytes. |
| Persistència LIVE | no, expressament. |
| Ús comercial com a SO general | no. Laboratori / robòtica / SNN. |

## Heap-0

El contracte **no** es compleix a tot el nucli. `kmalloc` existeix.

## El que sí que signo

- El bàner d'arrencada no imprimeix `OK` si aquella etapa no s'ha comprovat.
- No es fingeix un NIC, un NPU ni un dimoni.
- `command not found` no és el mateix que «no instal·lat».

— R.N.
