# Límits d'echOS 3.0

Tancar 3.0 no converteix un sistema de recerca en un producte certificat. Aquests són els límits actuals.

## Plataforma

| Capacitat | Estat actual |
|---|---|
| SMP | Absent: un nucli per arquitectura. |
| Gràfics AArch64 | Absents: consola sèrie PL011, sense framebuffer. |
| Userland AArch64 | Shell de diagnòstic reduït; no replica la consola completa d'x86. |
| Device tree AArch64 | S'usa per a memòria; PL011, GIC i virtio-mmio encara fan servir tres adreces fixes. |
| ACPI | Sense lector. Sota UEFI ARM el mapa de memòria ve del firmware. |
| Wi‑Fi, àudio, GPU | Sense controladors. |
| USB HID | No és l'entrada habitual; x86 usa PS/2. |
| Akida | Només sonda PCI: detectada vol dir **no suportada**, no accelerada. |

## Robòtica

- PX4 SITL s'executa a l'host i no és dins de la ISO.
- El productor autònom inclòs és deliberadament senzill: distància, bateria i enllaç. No és echoAI.
- El geofence és una caixa alineada amb els eixos; no modela terreny ni polígons.
- No s'han certificat el vol real, la normativa aeronàutica, la seguretat funcional ni tots els errors de maquinari.
- L'ABI d'intencions no té accés a PWM ni als motors.

## Sistema

- No és POSIX ni un sistema operatiu general.
- No hi ha aïllament complet de processos ni ring 3 de producció.
- RXFS és petit i deliberadament limitat.
- La pila de xarxa no equival a un navegador ni a un servidor multiusuari.
- El contracte Heap‑0 cobreix el camí robòtic; `kmalloc` continua existint fora d'aquest camí.
- Els percentils publicats són límits de buckets, no precisió inventada. Poden variar entre execucions emulades.

Una absència publicada és una propietat verificable, no una promesa futura disfressada.

— R.N.
