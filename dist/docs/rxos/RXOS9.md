# rxOS 9 SMOKE — qué es (sin teatro)

**Versión actual:** 9.0.0 · ISO VM + metal · [release](https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0)

rxOS no es Linux recortado. Es un **unikernel x86_64** (C freestanding + NASM + Rust `no_std`). Arranca con GRUB (fondo eclipse), pinta un escritorio **Dark Aero** y corre **NAVI 7** en el mismo binario.

## La frase que se puede comprobar

> El sistema operativo *es* la demo. Arrancas. Pulsas `v`. Preguntas. Si no hay ficha, DESCONOCIDO.

## Analogía de un minuto

Windows pesa cientos de megas y te pide una cuenta.  
Un LLM alquila un hangar de GPUs para apostar una sílaba.  
rxOS 9 arranca, pinta cristal negro y te deja hablar con NAVI 7. El anuncio es el binario.

## Lo que ves

| App | Tecla | Qué hace |
| --- | --- | --- |
| Ajustes | `a` | Tema Smoke + fondos |
| Terminal | `t` | ROSH. `www on`, curl, wget |
| Explorer | `e` | Preview JPEG/PNG |
| Navi 7 | `v` | Catálogo + harvest |
| Photos | `i` | Ver no cambia el fondo |
| Neuro | `y` | Membrana LIF |
| Calculator / Disks / About | `k` / `d` | Lo que dice el nombre |

Click derecho en el escritorio: Ajustes / cambiar fondo.

## Números que no inventamos

| Hecho | Dónde se ve |
|---|---|
| Paquete WSP = **16 bytes** | `_Static_assert` en `wsp.h` |
| NAVI 7 = **73 fichas**, bench **15/15** | `./navi7 --bench` |
| Pesos NAVI3 = **474 560 B**, heap modelo **0** | boot |
| L2 HDC = **66 352 B** | `navi l2` |
| Q₆ 1-bit **48/48** | banner de arranque |
| wget tope **192 KiB** | `www.h` |

RAPL del HP 15-ac195nl (sesión 8.5, 17 ago 2026): 3678 mW idle, 72.5 µJ/run Q6. QEMU se niega. Ver [metal 8.5](HP_AC195NL_85.md).

## Qué no es

- No es ChatGPT. No predice el siguiente token.
- No es Ubuntu. No hay systemd.
- No es silicio Akida. 7-NPU sigue PLAN.

## Historia (no el producto)

4 → 6 → 7 MONAD → 8.0 → 8.5 → **9.0 SMOKE**.  
8.5 midió julios en el portátil. 9 es el escritorio y NAVI 7.

Tutorial: [TUTORIAL_MONAD.md](TUTORIAL_MONAD.md).  
ISOs: [ISOS.md](ISOS.md).
