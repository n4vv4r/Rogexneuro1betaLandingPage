# Límites — lo que no hago

Política del laboratorio: si no está, se dice. Esta página es tan
producto como `echofetch`.

## Hardware

| Cosa | Estado |
|---|---|
| WiFi | no. PCI se lista. Cero driver. |
| NVMe | clase `01:08` en `hwprobe`. Sin driver. SATA AHCI / IDE / virtio-blk sí. |
| UEFI nativo | no. BIOS/CSM / SeaBIOS. |
| USB HID | no como input de diario. PS/2 teclado y ratón. |
| Audio | no en 2.0 CLI. |
| GPU accel | no. LFB. |
| Akida | probe PCI. Sin placa = software LIF. Sin blob BrainChip. |
| Loihi | nombre. Sin silicio en este árbol. |
| ARM64 kernel | triple documentado; el ELF de la ISO Universal es x86_64. |

## Software

| Cosa | Estado |
|---|---|
| Multi-process / ring-3 | stub. Un task. |
| SMP real | QEMU puede `-smp`; el scheduler no es un Linux. |
| POSIX | no. Alias de comandos, no glibc. |
| JS en `-dom` | no hay VM. Espera + refetch. |
| TLS 1.3 app-data | handshake OK; GET https puede volver vacío. HTTP sí. |
| Pin de CA | no. |
| IPv6 | no. |
| Varios TCP a la vez | no. |
| sshd/httpd/ftpd reales | flags `rcctl`. Server manifiesto. |
| `doas` aislamiento | no. Un mapa de memoria. |
| RXFS grande | 64 × 64 KiB. |
| Compiladores en LIVE | stubs / notas. ELF host + echlibc. |
| Pager `less` GNU | comando propio, consola 8192. |
| Locale completo | wizard ES/EN. Comandos en inglés. |
| Persistencia LIVE | no, a propósito. |

## Heap-0

El contrato **no** se cumple en todo el kernel. `kmalloc` vive.
NAVI actor viejo reserva capa ahí. Está en `docs/AUDIT_2.0.md`.
No lo voy a borrar de la auditoría para que Heap-0 quede “limpio”
en un README.

## Red

Un hilo cooperativa. TX síncrono. RXFS no es IRQ-safe: un IRQ de
NIC durante `vfs_write` es el riesgo. Bajo, no cero.

virtio-blk INTx se enmascara porque compartía línea con la NIC y
el boot moría. Polled. Correcto, no elegante.

## Criptografía

`rogex-core` no tiene auditoría de terceros. KAT en boot ≠ pentest.
ML-KEM self-test ≠ “somos post-cuánticos en producción”.

## 1.0

El escritorio Eclipse **no está abandonado**; no está *en esta ISO*.
Si un usuario 1.0 abre 2.0 y pregunta dónde está el dock, la
respuesta es esta carpeta, no un parche.

## Lo que sí firmo

- El banner de boot no imprime `OK` si esa etapa no se comprobó.
- No se finge un NIC, un NPU ni un daemon.
- `command not found` ≠ `not installed`.
- Las páginas `man` mienten menos que un `--help` de dos líneas.

Si encuentras un `OK` mentiroso, es un bug de producto, no de
copy.

— R.N.
