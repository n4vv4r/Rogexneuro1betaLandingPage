# NAVI 6.5 para expertos — contrato RLC

Host Python. Kernel C entero, heap 0. Once `WSP_GEN_*`. El chat
(tecla `v`) pasa por `navi6_reply`: 6.5 posee el turno y **delega**
`G_talk`…`G_rxos` a `wsp_render_packet`.

## Archivos

| Pieza | Dónde | Contrato |
| --- | --- | --- |
| Router host | `navi65_engine.py` | Cada turno: 5 pasos + máscara |
| Razonador | `navi65_reason.py` | Math AST entero; slots A/B/C; DESCONOCIDO |
| Código | `navi65_code.py` | Catálogo + dry-run. Sin fallback a reverse |
| Máscaras | `navi65_masks.py` | route_mask + G_* render |
| CLI | `./navi65` | `--ask` `--trace` `--reflect` |
| Kernel | `kernel/navi/navi6.c` | claim = todo turno; math entero; resto G_* |
| IDs | `kernel/include/wsp.h` | `WSP_GEN_REASON`…`WSP_GEN_TEACH` (0x06..0x0A) |
| Lex | `kernel/navi/wsp_lex.c` | cuanto es, razona, ensena, pasos para |

## Hook

`navi3_reply_ex` ya no reserva `G_rxos` para 4.5. Si `navi6_ready()`
(siempre), `navi6_reply` gana. `G_rxos` se pinta con `wsp_gen_rxos`
(lista blanca + `commands_dispatch`). `/prove` no se rompe.

## Math

Host: `ast` solo `int` y `+ - * / %`. División = `//`.
Kernel: recursive descent, 0% FPU. `por` → `*`, `mas` → `+`.

## Código

No hay generación libre. `match_primitives` exige clave del catálogo.
Dry-run: reverse, clamp, LIF, strlen, sat_add16, gcd, fib, crc8.
Pedir Kubernetes o LLVM → `DESCONOCIDO`.

## Auto-razonar

`NAVI65Engine.reflect()` = `navi6.ask_self()` (pregunta del DAG) +
`think(..., show_trace=True)`. No hay cadena de pensamiento de loro:
hay traza de operadores.

## Cómo medir

```
python3 tests/test_navi65.py     # 16/16: masks, math, code, DESCONOCIDO, reflect
python3 tests/test_navi6.py      # tutor causal intacto
./navi65 --ask "cuanto es 12*7+3"
./navi65 --ask "razona cuanto es 2+2"
```

En ISO: tecla `v` → “cuanto es 8*9-2” debe pintar `G_math … = 70`.
`status` sigue ejecutando el Terminal.

## Lo que no es

No es un modelo de lenguaje de propósito general. No es un coder de
repo. No hay backprop en el kernel. Q-WSP no son qubits.
