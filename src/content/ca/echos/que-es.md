# echOS

Unikernel x86_64 de consola. Un ELF. GRUB Multiboot2. No hi ha Linux a sota.
No hi ha BusyBox. No hi ha systemd. La màquina *és* el programa.

No és un sistema comercial. No és un navegador. Està pensat per a programari
neuromòrfic i robòtica.

> Unikernel de consola. Programari neuromòrfic. Akida quan hi ha placa.

## Què és, en una frase

Una consola JetBrains / Liberation Mono sobre framebuffer (o text VGA), amb
ROSH, `epk` local, pila IPv4/DNS/TCP/HTTP i un teixit d'esdeveniments / SNN al
nucli — sense finestra, sense dock i sense mentir sobre el maquinari.

## Què no és

- No és un escriptori.
- No és Alpine, OpenBSD, Haiku ni un Linux encastat.
- No és un producte per navegar per internet. `curl` baixa bytes.
- No hi ha Echo AI en aquesta ISO.

## Peces que importen

| Peça | Què és |
|---|---|
| Heap-0 | Layout estàtic a BSS. `kmalloc` de 512 KiB continua existint i es declara. |
| RXFS | FS natiu, 64 fitxers × 64 KiB. |
| `epk` | Notes a RXFS. `epk list` = el que té el nucli. `--lab` = host. |
| LIVE | Arrenca en RAM. Mínim. |
| SNN | Cub Q6 de 64 cèl·lules LIF, `prisma5` sintètic, `bench-snn`. |
| Akida | Sonda PCI `1e7c:bca1`. Sense placa = LIF per programari. |

## Superfície honesta

Un desconegut arrenca LIVE, escriu `help` i no pot acusar-lo de teatre.
`rcctl start` no fingeix un dimoni. `doas` no aïlla. `pfctl` no filtra.
`tcc` / `python` / `sshd` no són a Tab.

— R.N.
