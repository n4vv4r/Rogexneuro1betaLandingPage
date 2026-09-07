# echOS 3.0, en execució

Les 13 imatges són bolcats directes del framebuffer de QEMU. No estan compostes ni retocades. Cada captura enllaça el registre sèrie complet de la mateixa arrencada.

## Selector d'arrencada

![Selector LIVE o instal·lació](/media/echos3/00-chooser.png)

La decisió es pren abans d'arrencar. [Registre sèrie](/media/echos3/00-chooser.log)

## Sessió LIVE

![Sessió LIVE acabada d'iniciar](/media/echos3/01-live.png)

La consola després de completar el checklist d'arrencada. [Registre sèrie](/media/echos3/01-live.log)

## Identitat

![Ordre about](/media/echos3/02-about.png)

Versió i propòsit llegits del mateix binari. [Registre sèrie](/media/echos3/02-about.log)

## Estat

![Ordre status](/media/echos3/03-status.png)

Estat i localització de cada subsistema. [Registre sèrie](/media/echos3/03-status.log)

## Memòria

![Ordre mem](/media/echos3/04-mem.png)

Regions Heap‑0, arena `kmalloc` i assignador físic. [Registre sèrie](/media/echos3/04-mem.log)

## Límits compilats

![Ordre limits](/media/echos3/05-limits.png)

Capacitats i sostres d'aquesta build. [Registre sèrie](/media/echos3/05-limits.log)

## Tipografia

![Mostra JetBrains Mono](/media/echos3/06-font.png)

JetBrains Mono 10×22, blocs, Braille i dibuix de caixes. [Registre sèrie](/media/echos3/06-font.log)

## Dispositius

![Ordre devices](/media/echos3/07-devices.png)

Maquinari trobat i allò que el sistema declara que no condueix. [Registre sèrie](/media/echos3/07-devices.log)

## Runtime robòtic

![Ordre robot](/media/echos3/08-robot.png)

Registres, intencions i veredictes del safety gate després de l'escenari. [Registre sèrie](/media/echos3/08-robot.log)

## Informe local

![Ordre report](/media/echos3/09-report.png)

Bloc d'evidència generat dins del sistema. [Registre sèrie](/media/echos3/09-report.log)

## Panells

![Shell i monitor en dos panells](/media/echos3/10-panes.png)

Un shell i un monitor viu compartint pantalla. [Registre sèrie](/media/echos3/10-panes.log)

## Ajuda

![Ordre help](/media/echos3/11-help.png)

La llista d'ordres reals del binari. [Registre sèrie](/media/echos3/11-help.log)

## PX4 SITL

![Enllaç MAVLink amb PX4](/media/echos3/12-px4.png)

Telemetria d'entrada, intencions de sortida i `COMMAND_ACK`. [Registre sèrie](/media/echos3/12-px4.log)

## AArch64 per sèrie

ARM64 no té framebuffer. En lloc de fabricar una pantalla, es publiquen les transcripcions reals:

- [Arrencada directa, status, CPU, xarxa, robot i report](/media/echos3/aarch64-serial-kernel.txt)
- [Arrencada UEFI edk2 i mapa de memòria del firmware](/media/echos3/aarch64-serial-uefi.txt)

— R.N.
