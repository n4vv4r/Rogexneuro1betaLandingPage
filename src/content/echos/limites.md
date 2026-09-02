# Límites — lo que no hago

Política del laboratorio: si no está, se dice.

## Hardware

| Cosa | Estado |
|---|---|
| WiFi | no. PCI se lista. Cero driver. |
| NVMe | clase `01:08` en `hwprobe`. Sin driver. SATA AHCI / IDE / virtio-blk sí. |
| UEFI nativo | no. BIOS/CSM / SeaBIOS. |
| USB HID | no como input de diario. PS/2 teclado y ratón. |
| Audio | no. |
| GPU accel | no. LFB. |
| Akida | probe PCI. Sin placa = software LIF. Sin blob BrainChip. |
| Loihi | fuera de 2.1. Cero interfaz. |
| ARM64 kernel | el ELF de la ISO Universal es x86_64. |

## Software

| Cosa | Estado |
|---|---|
| Multi-proceso / anillo 3 | esbozo. Una tarea. |
| POSIX | no. Alias de comandos, no glibc. |
| TLS 1.3 datos de aplicación | el apretón de manos funciona; GET https puede volver vacío. HTTP sí. |
| Pin de CA | no. |
| IPv6 | no. |
| Varios TCP a la vez | no. |
| sshd/httpd/ftpd reales | flags `rcctl`. No hay daemons. |
| `doas` aislamiento | no. Un mapa de memoria. |
| RXFS | 64 × 64 KiB. |
| Compiladores en LIVE | ausentes. `epk list --lab` = notas de host. |
| Navegador / JS | no. `curl` baja bytes. |
| Persistencia LIVE | no, a propósito. |
| Uso comercial como OS general | no. Laboratorio / robótica / SNN. |

## Heap-0

El contrato **no** se cumple en todo el kernel. `kmalloc` vive.

## Lo que sí firmo

- El banner de boot no imprime `OK` si esa etapa no se comprobó.
- No se finge un NIC, un NPU ni un daemon.
- `command not found` no es lo mismo que «no instalado».

— R.N.
