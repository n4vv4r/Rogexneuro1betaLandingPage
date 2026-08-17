# HP 15-ac195nl — metal 8.5 medido

**Maquina:** HP 15-ac195nl, Intel Core i7-5500U @ 2.40 GHz, 8 GB, panel 1366x768  
**ISO:** rxOS 8.5.0-metal (USB, BIOS/Legacy)  
**Cuando:** 2026-08-17, reloj del guest 01:07:23 — 01:08:50  
**Como:** fotos de la pantalla del portatil. Las cifras de abajo se leyeron de esas fotos, no de QEMU.

Esto cierra la frase "unverified until the laptop produces it". El portatil ya produjo.

Fotos en `/rxos/hp-ac195nl-85/`. Galería en [/rx-os#hp-metal](/rx-os#hp-metal).

![NAVI 6.5 RLC en el HP 15-ac195nl](/rxos/hp-ac195nl-85/01-chat-rlc.jpg)

## Que se midio y que no

- RAPL de **paquete Intel** en silicio Broadwell. No es RAPL de QEMU. No es J/inferencia de un NPU.
- `neurocpu` activo: **Software LIF (CPU)**. Akida pedido, no presente. Loihi stub. Eso es el contrato.
- El banner del chat dice `rxOS 8.5 · NAVI-6.5 RLC (entrenado)`. Cadenas viejas siguen en ROSH (`rxOS 6`) y en `/prove status` (`rxOS 7 MONAD`). Son restos de identidad, no la ISO.

## Energia — comando `power`

Foto `02-power-rapl.jpg`. Prompt `[01:07:28]`.

![power RAPL en el i7-5500U](/rxos/hp-ac195nl-85/02-power-rapl.jpg)

| Campo | Valor leido |
| --- | --- |
| cpu | Intel(R) Core(TM) i7-5500U CPU @ 2.40GHz |
| idle via | MWAIT C7 (ACPI HPQOEM, C2 101us / C3 57us) |
| rapl | available (pkg + cores + gpu) |
| msr guard | OK (#GP raised and recovered) |
| temp | 42 C core, 44 C package (TjMax 105 C) |
| tdp | 15000 mW (package thermal spec) |
| idle 1 s C7 package | 3678 mW |
| idle 1 s C7 cores | 73 mW |

Texto del SO: *Measured, not estimated: energy delta over a known PIT interval.*

## navi3 bench — rdtsc / packet

Foto `03-navi3-bench.jpg`. Prompt `[01:07:52]`.

| Campo | Valor |
| --- | --- |
| cycles min | 40372172 |
| cycles med | 40378672 |
| cycles max | 40436068 |
| L2 BSS | 66352 B |
| weights | 474560 B (module2) |
| heap navi3 | 0 |
| packets | 8 |
| L3 steps | 8 |
| HDC sim last | 492/1024 |
| veto last | 8 |
| atom fixes | 4 |
| HDC correct | 100% (8 probes, SOLEDAD pair) |

A 2.40 GHz, la mediana 40378672 ciclos es ~16.82 ms por paquete. Eso casa con las us de las mascaras (~16823–16829).

## navi6 bench — blob 6.5

Foto `04-navi6-bench.jpg`. Prompt `[01:08:04]`.

```
NAVI6.5 RLC  src=module2 NAVI6W01  bytes=1010  heap 0  11 mascaras G_*  math entero
```

## neurocpu

Foto `05-neurocpu.jpg`. Prompt `[01:08:23]`.

| Campo | Valor |
| --- | --- |
| active | Software LIF (CPU) |
| status | akida requested but not present · still on software |
| spikes | 0 |
| idle entries | 830 |
| software | [ready] Q16.16 LIF actors |
| akida | [stub] no Akida device probed |
| loihi | [stub] no Loihi interface probed |

## navi joules — Q6 burst

Foto `06-navi-joules.jpg`. Prompt `[01:08:50]`.

![navi joules Q6 burst](/rxos/hp-ac195nl-85/06-navi-joules.jpg)

| Campo | Valor |
| --- | --- |
| Q6 burst | 256 runs |
| pkg before | 1006724426 uJ |
| pkg after | 1006742980 uJ |
| delta | 18554 uJ (measured) |
| uJ / run (dividido) | 18554 / 256 = 72.5 uJ |

Eso es **delta de paquete RAPL** durante 256 corridas Q6. Incluye lo que el paquete estuviera haciendo. No es J por inferencia Akida. No lo vendemos como cifra de NPU.

## /prove + status

Foto `07-prove-status.jpg`.

| Campo | Valor |
| --- | --- |
| cycles min | 40364920 |
| cycles med | 40371088 |
| cycles max | 40375568 |
| L2 / weights | 66352 B / 474560 B |
| heap navi3 | 0 |
| packets / L3 steps | 24 / 24 |
| HDC sim last | 494/1024 |
| HDC correct | 100% (8 probes, SOLEDAD pair) |
| boot | OK (GRUB/Multiboot2, long mode) |

La linea `rxOS 7 MONAD status` es una cadena vieja. El chat de la misma sesion anuncia 8.5 + 6.5.

## Chat RLC y mascaras

Foto `01-chat-rlc.jpg` y `08-masks-demo.jpg`.

Cabecera: `NAVI-4.5 [operador rxOS] · 463 KiB W + 64 KiB L2`.

| Entrada | Salida leida |
| --- | --- |
| hola | Equilibrado. … no memorizo internet. Camino E. |
| quien eres? | NAVI 6.5. RLC: razon + lengua + codigo. No soy un LLM. |
| cuanto es 1 mas 9 por 2? | G_math (entero, 0% FPU) 1 + 9 * 2? = 19 |
| si A es mayor que B y B es mayor que C | G_logic: A es estrictamente mayor que C (transitividad). cyc=40386784 us=16829 |
| escribe una funcion en C para invertir un array | G_code: `void rev_u8(uint8_t *a, int n)` con swap in-place. cyc=40374524 us=16823 |
| que noticias hay hoy | G_news: Briefing local (sin red). Titulos de inventario (ISO MONAD / rxOS 7). cyc=40383624 us=16827 |

Precedencia entera correcta: 1 + 9 * 2 = 19, no 20.

## Como repetirlo

```
power
navi3 bench
navi6 bench
neurocpu
navi joules
```

En el chat (tecla v): `hola` · `quien eres?` · `cuanto es 1 mas 9 por 2?` · `/prove` · las tres mascaras de arriba.

En QEMU, `navi joules` se niega. Eso sigue siendo honesto. Estas cifras son del i7-5500U.

## Limites

- Una sesion, un chasis, fotos de telefono. No es una campana de N corridas.
- WiFi RTL8188EE sigue sin driver. Ethernet r8169.
- Sin placa Akida no hay columna J CPU vs NPU.
- Experimental. No clinico. No produccion.
