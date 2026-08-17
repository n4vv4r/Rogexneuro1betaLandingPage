# NAVI-4.5 — el operador, no el oráculo

NAVI no “habla español”. Habla **paquetes RogexWSP de 16 bytes**. El castellano es una **máscara**. Si no hay esquema, dice `DESCONOCIDO` en vez de inventar.

## Analogía de un minuto

Un LLM es un loro que ha leído internet y apuesta la siguiente sílaba.  
NAVI es un **tablero de relés**: clasifica la intención, elige un generador, y si pides el sistema operativo **lo ejecuta**.

| | ChatGPT / Kimi | NAVI-4.5 |
|---|---|---|
| Unidad | token (sílaba estadística) | `wsp_packet_t` (16 B) |
| Dónde corre | GPU / API / 8+ GiB | unikernel, heap del modelo = 0 |
| Si no sabe | alucina con confianza | `DESCONOCIDO` o no está en la lista blanca |
| Prueba | “parece inteligente” | `/prove` imprime ciclos y `status` |

## Capas (todas enteras, 0% FPU)

1. **Q₆ (L1)** — 64 neuronas, hipercubo de 6 bits, codebook [6,3,3]. Recupera 1 bit de ruido: 48/48.
2. **HDC L2** — memoria asociativa 1024-bit, 66 KiB que **no crecen**.
3. **L3 ternario** — transductor S→S′. Pesos `NAVI3W01` en module2 GRUB (474 560 B).
4. **G_\*** — máscaras: talk, lógica, poema, código, noticias, **`G_rxos`**.

## G_rxos (lo que cierra el 4.5)

Lista blanca. Un comando por turno. Misma función que la Terminal:

`status` · `mem` · `nics` · `navi3 bench` · `uptime` · `devices` · `help` · `about` · `navi` · `www status` · `power`

No hay `rm`. No hay `halt`. Un umbral neuronal **nunca** decide si el comando corre: tú lo pediste, se ejecuta.

## Cómo comprobarlo

ISO → tecla `v` → `/prove`.  
Aviso oficial: [USER_NOTICE.md](./USER_NOTICE.md).

## Carbono, sin kWh de marketing

475 KiB de pesos. Heap del modelo = 0. Un pensamiento = 16 bytes. Si no hay estímulo, el LIF no dispara y el escritorio no pinta. En QEMU, RAPL se niega. En el HP 15-ac195nl (17 ago 2026) el paquete midió 18554 µJ / 256 corridas Q6 = 72.5 µJ/run. Eso no es J/NPU. Akida sigue ausente. Ver [metal 8.5](/docs/hp-metal-85).
