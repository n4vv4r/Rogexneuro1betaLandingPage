# rxOS 10 — próximo lanzamiento (Eclipse)

**Estado: PRÓXIMO LANZAMIENTO.** No hay ISO 10 pública.
La ISO que se descarga hoy sigue siendo **rxOS 9.0.0 SMOKE**
([release v9.0.0](https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0)).
Este papel describe el contrato del 10, no un binario que puedas flashear.

Pareja: [NAVI 10 Echo](NAVI10.md) (host LIVE) + rxOS 10 (este documento).
Hoja de ruta: [ETERNAL_ECLIPSE.md](ETERNAL_ECLIPSE.md). Cianotipo:
[CIANOTIPO.md](CIANOTIPO.md).

> El cruce **NAVI 10 + rxOS 10** es el Eclipse. Hasta que exista ISO 10,
> decir “ya corre en el escritorio negro” es mentir. NAVI 10 sí corre
> en el **host**. El SO 10 aún no.

## La frase

rxOS 9 es el escritorio. NAVI 10 es la mente. rxOS 10 es cuando las
dos viajan en el mismo artefacto: unikernel + Echo + CAM + TUI, sin
nube, sin LLM de campus.

## Qué se puede tocar hoy

| Pieza | Dónde | Estado |
| --- | --- | --- |
| rxOS **9.0.0** SMOKE | ISO VM + metal | **SHIPPING** |
| NAVI **7-WORLD** | tecla `v` en la ISO 9 | **SHIPPING** |
| NAVI **10 Echo** | `./navi10 --ask` / `--tui` en el host | **HOST LIVE** |
| rxOS **10** ISO | — | **PRÓXIMO** · no hay artefacto |
| Akida AKD1000/1500 | `neurocpu akida` | **PLAN** · 0 placas |
| EchOS (ISO unificada + API) | — | **VISIÓN** |

## Contrato del 10 (cuando exista el ISO)

El salto de 9 → 10 no es un skin. Es el SO que **alojará** la mente 10.

| Invariante | Cómo se sostiene |
| --- | --- |
| Unikernel x86_64 | C freestanding + NASM + Rust `no_std`. No es Linux recortado. |
| WSP 16 B | `_Static_assert` en `wsp.h`. El pensamiento no crece con Wikipedia. |
| Heap-0 en el paso SNN | CAM 4096 × 32 B estático. El tick no hace malloc. |
| 0 FPU en el motor | LIF leak 7/8, Hamming = popcount. El SLM de escritorio es **otro** proceso. |
| VERIFY / DESCONOCIDO | Sin extracto no hay hecho. El loro no entra al kernel. |
| KCC | `destroyed=0`. El CAM crece o se refuerza. |
| Akida honesto | Sin probe `HwVersion` no hay silicio. |

## Qué entra en el 10 (diseño)

1. **Echo in-OS** — el usuario deja de “abrir Navi 7”. Habla con Echo.
   La cara es TUI/GUI; el cerebro es WSP + CAM + SNN. LPU-S (boca) es
   opcional en SKU Desk.
2. **Q_N = Q₈ × Q₈** — 65536 direcciones, 256 LIF en un spoke, Hamming
   del producto en `popcount`. Sustituye el techo de 73 fichas de 7-WORLD.
3. **Harvest local** — Wikipedia + PDF personales → CAM. Sin red:
   `--no-live`. El dump wiki **no** es el modelo.
4. **Dark Aero 10** — el escritorio 9 (Smoke, Photos, Ajustes, wget)
   se queda; el chat deja de ser el catálogo 7 y pasa a Echo.
5. **SKU** — Desk (LPU-S + wiki índice) · Edge/Pi (SNN + CAM, sin SLM)
   · Host (lo que ya corre: `./navi10`).

No se empaqueta PyTorch, The Stack, Piper ni un campus de GPUs.
Ver [NAVI10_SHIP.md](NAVI10_SHIP.md).

## Qué **no** es rxOS 10

- No es Ubuntu con un widget de chat.
- No es ChatGPT en un unikernel.
- No es Akida hasta que haya placa y el driver deje de negarse.
- No es EchOS. EchOS es la ISO unificada *después* del Eclipse.
- No hay fecha inventada. “Pronto” es el anuncio; el SHA-256 es el hecho.

## Historia (no se borra)

```
4.x foundation → 6 desktop → 7 MONAD → 8.0 / 4.5 → 8.5 / 6.5 (RAPL)
    → 9 SMOKE / 7-WORLD (ISO de hoy) → 10 / 10 (Eclipse, próximo)
```

8.5 midió julios en el HP 15-ac195nl (17 ago 2026): idle 3678 mW,
Q6 72.5 µJ/run. Esas cifras son de **8.5**, no del 10. El 10 no
inventa RAPL de Akida.

## Cómo se comprobará (cuando haya ISO)

```
make iso-vm          # artefacto rxOS-10.x.x-vm.iso
make iso-metal
sha256sum            # en SHA256SUMS-10
./navi10 --bench     # en el host, ya
tecla v              # Echo, no el catálogo 7
neurocpu akida       # se niega hasta sonda
```

Mientras esas líneas no existan en un release, este papel es el
contrato, no el producto.

## Lectura

| Doc | Para qué |
| --- | --- |
| [NAVI10.md](NAVI10.md) | Mente 10: Q_N, CAM, VERIFY, TUI |
| [NAVI10_SHIP.md](NAVI10_SHIP.md) | USB / SKU / lo que no se empaqueta |
| [NAVI10_LPU.md](NAVI10_LPU.md) | Córtex verbal (boca, no hechos) |
| [RXOS9.md](RXOS9.md) | ISO que sí se descarga hoy |
| [ETERNAL_ECLIPSE.md](ETERNAL_ECLIPSE.md) | Parejas hasta EchOS |
| [AKIDA.md](AKIDA.md) | Por qué el NPU sigue PLAN |

Experimental. GPLv3 en el árbol rxOS. No clínico.
Knights Labs / Rogex Laboratories · agosto 2026.
