# echOS 3.0

echOS 3.0 és un **unikernel per a robòtica a l'edge**. Arrenca directament sobre la màquina, sense Linux, `systemd`, BusyBox ni cap distribució amagada a sota. La seva funció és rebre observacions, produir intencions limitades i lliurar-les a un controlador de vol sense assumir el control directe dels motors.

> Un cos petit, mesurable i portable per a sistemes robòtics. No és un chatbot i no conté cap LLM o SLM.

## Què ha canviat a 3.0

- Una mateixa base arrenca en **x86_64 BIOS**, **x86_64 UEFI** i **AArch64 UEFI**.
- El camí `sensor → intenció → safety gate → autopilot` usa registres i cues de mida fixa.
- Aquest camí fa **zero reserves dinàmiques de memòria**, mesurades pel mateix nucli.
- El pont MAVLink 2 intercanvia telemetria, intencions i confirmacions amb PX4 SITL.
- NVMe, GPT i la persistència es proven contra un dispositiu emulat real i després de reiniciar.
- Els artefactes se separen per arquitectura i edició, i les builds netes són reproduïbles.
- NAVI i l'experiment d'assistent conversacional ja no formen part del producte.

## El contracte robòtic

Els sensors entren com a registres enters de 64 bytes. Les decisions surten com a intencions de 72 bytes amb origen causal, temps de captura, venciment, confiança i límits. L'ABI només pot expressar ordres d'alt nivell com `HOLD`, `APPROACH`, `AVOID`, `RETURN_HOME`, `LAND` o `ABORT`.

No hi ha cap camp per a PWM, servos o accelerador. **PX4 conserva l'autoritat sobre l'estabilització i els actuadors.**

## Estat

La versió 3.0 està tancada respecte de la seva definició de finalització: 19 requisits complerts i sis certificats verds. Això no vol dir “producte aeronàutic certificat i llest per desplegar”. Vol dir que l'abast publicat està implementat, mesurat i acompanyat de límits explícits.

Consulta la [guia d'ús](./guia), l'[arquitectura](./arquitectura), l'[evidència](./evidencia) i la [galeria real](./galeria).

— R.N.
