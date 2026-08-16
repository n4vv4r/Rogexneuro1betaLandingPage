# NAVI 1 — Q₆ L1, la capa que no habla

NAVI 1 es el **hipercubo de 6 bits**. 64 neuronas LIF enteras, 192 aristas,
codebook lineal [6,3,3]. No genera texto. Repara ruido.

Código de referencia: `kernel/navi/navi_q6.c` (unikernel) y
`NAVI_AI_SNN/c/navi_q6.c` (banco host, bit-idéntico).

## Analogía

Imagina 64 habitaciones. Cada pasillo cambia un solo interruptor.
Ocho de esas habitaciones son “puertas correctas” (codewords).
Te equivocas en **un bit**: 48 de 48 veces vuelves a casa.

Eso es todo lo que promete NAVI 1. No recetas. No charla.

## Dinámica

Entero, 0% FPU, `-mno-sse` en el kernel:

```
V ← (V * 7) / 8          leak
V += I_STIM | I_HOP | W_EDGE
si V ≥ VTH: spike, V ← 0
```

El hop Hamming-1 **solo se enciende** si tras el paso 1-bit no disparó
ningún codeword. Si `make fire` deja de imprimir `Q6_1BIT 48/48`, se
revierte el hop.

## Qué está medido

| KPI | Valor | Cómo |
| --- | --- | --- |
| 1-bit | 48/48 | `make fire` / self-test de boot |
| 2-bit + hop (Hamming) | 120/120 | mismo banco |
| Heap de la capa | ~472–480 B | `make mem` / `navi` in-OS |
| FPU | 0% | kernel `-mno-sse` |

## Qué no es

- No es un LLM.
- No decide teclado, disco ni #PF. Es un **actor blando**.
- El 2-bit no es único a radio 2: por eso se puntúa también
  `Q6_2BIT_HAM` (¿cayó en el vecino Hamming?).

Siguiente capa: [NAVI 2](/docs/navi2) (motor ASCII). Hipótesis abierta:
[RFC-2026-08-Q6](/docs/rfc-q6).
