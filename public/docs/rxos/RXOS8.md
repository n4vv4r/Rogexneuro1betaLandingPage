# rxOS 8 DESKTOP — qué era (historia)

**El producto que se descarga hoy es [rxOS 9 SMOKE](/docs/rxos9).**  
8.0 / 8.5 son historia. El RAPL del HP se midió en 8.5.

**Esta ficha describe 8.x.** ISO de entonces: [v8.5.0](https://github.com/knightslabs/RXos-Packages/releases/tag/v8.5.0)

rxOS no es Linux recortado. Es un **unikernel x86_64** escrito en C freestanding + NASM + Rust `no_std`. Arranca con GRUB, pinta un escritorio Aero y corre NAVI-4.5 **dentro del mismo binario**.

## La frase que se puede comprobar

> El sistema operativo *es* la demo. `/prove` no es una diapositiva: es un comando.

Tecla `v` → `/prove` → ves `navi3 bench` (`heap navi3 0`) y `status` salidos de la **misma** `commands_dispatch()` que la Terminal.

## Analogía de un minuto

Windows pesa cientos de megas y te pide una cuenta.  
Un LLM alquila un hangar de GPUs para apostar una sílaba.  
rxOS arranca, pinta Aero y te deja pulsar `/prove`. El anuncio es el binario.

## Números que no inventamos

| Hecho | Dónde se ve |
|---|---|
| Paquete WSP = **16 bytes** exactos | `_Static_assert` en `wsp.h` |
| Pesos NAVI3 = **474 560 B**, heap del modelo **0** | boot + `/prove` |
| L2 HDC = **66 352 B** fijos | `navi l2` / bench |
| Q₆ 1-bit **48/48**, hop **120/120** | banner de arranque |
| RAM al boot ~**3 MiB** (paper) | `status` / paper rev 1.0 |
| Bench temporal LIF **6/6 PASS** | comando `bench` |

## Las cuatro piezas (y el carbono)

1. **rxOS 8** — unikernel + Aero. No es Ubuntu. No hay 800 daemons.
2. **NAVI-4.5** — operador, no loro. Lista blanca sobre la Terminal. Si no sabe: `DESCONOCIDO`.
3. **WSP v0.5** — un pensamiento = 16 bytes. El castellano es la carátula.
4. **Q₆** — hipercubo de 6 bits, codebook [6,3,3]. Un bit de ruido: 48/48.

**Impacto ecológico (órdenes, no kWh de marketing):** 475 KiB de pesos frente a decenas de GiB. ~3 MiB de RAM frente a 1–8 GiB de un desktop. Reposo en metal (HP 15-ac195nl, 17 ago 2026): 3678 mW de paquete, 73 mW de cores (MWAIT C7). Q6 burst: 72.5 µJ/run de paquete RAPL. QEMU se niega. Nivel 3 (Akida) será la primera cifra J/NPU. Ver [metal 8.5](/docs/hp-metal-85).

> Si no hay evento, no hay vatio.

## Qué no es

- No es ChatGPT. No predice el siguiente token.
- No es Ubuntu. No hay systemd, no hay 800 daemons.
- No es silicio Akida. El reloj de x86 sigue ahí. Nivel 3 del roadmap está **bloqueado** sin el chip.

## Versiones anteriores (historia, no el producto)

| Ver | Nombre | Estado |
|---|---|---|
| 4.x | Foundation | historia — boot, RXFS, primer escritorio |
| 6.0 | Desktop + WWW | historia — Aero, ISO dual, HTTP GET |
| 6.5 | NICs | historia — virtio / e1000 / r8169 / rtl8139 |
| 7.0 | MONAD / NAVI-3 | historia — SNN in-kernel, WSP 16 B, chat tecla `v` |
| **8.0** | **DESKTOP / NAVI-4.5** | **actual** — `G_rxos`, `/prove`, discurso, capturas 11–17 |

Las ISOs 6.5 y 7.0 siguen en el historial de releases. Esta página habla de **8**.
