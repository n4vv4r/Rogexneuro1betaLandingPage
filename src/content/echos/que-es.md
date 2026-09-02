# echOS 2.1.0-honest

Unikernel x86_64 de consola. Un ELF. GRUB Multiboot2. No hay Linux
debajo. No hay busybox. No hay systemd. La máquina *es* el programa.

No es un sistema comercial. No es un navegador. Está pensado para
software neuromórfico y robótica.

> Console unikernel. Neuromorphic software. Akida when the card exists.

## Qué es, en una frase

Una consola JetBrains / Liberation Mono sobre framebuffer (o VGA texto),
con ROSH, `epk` local, pila IPv4/DNS/TCP/HTTP, y un tejido de eventos /
SNN in-kernel — sin ventana, sin dock, sin mentir sobre el hardware.

## Qué no es

- No es un desktop.
- No es Alpine, OpenBSD, Haiku ni un Linux embebido.
- No es un producto para navegar por internet. `curl` baja bytes.
- No hay Echo AI en esta ISO.

## Piezas que importan

| Pieza | Qué es |
|---|---|
| Heap-0 | Layout estático en BSS. `kmalloc` 512 KiB sigue existiendo y se dice. |
| RXFS | FS nativo, 64 ficheros × 64 KiB. |
| `epk` | Notas en RXFS. `epk list` = lo que el kernel tiene. `--lab` = host. |
| LIVE | Arranca en RAM. Minimal. |
| SNN | Cubo Q6 de 64 células LIF, `prisma5` sintético, `bench-snn`. |
| Akida | Sonda PCI `1e7c:bca1`. Sin placa = software LIF. |

## Superficie honesta

Un extraño arranca LIVE, escribe `help` y no puede acusar de teatro.
`rcctl start` no finge un daemon. `doas` no aísla. `pfctl` no filtra.
`tcc` / `python` / `sshd` no están en Tab.

— R.N.
