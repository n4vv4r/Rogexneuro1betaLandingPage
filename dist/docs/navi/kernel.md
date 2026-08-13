# kernel/navi — NAVI Q₆ en el unikernel (rxOS 8 DESKTOP)

Actor **blando**. No está en IRQ, disco ni #PF. El self-test de boot
exige 48/48 en 1-bit y 120/120 de acuerdo Hamming en 2-bit+hop.

| Archivo | Rol |
| --- | --- |
| `navi_q6.h/.c` | LIF entero, hop gated, codebook [6,3,3] |
| `navi_actor.h/.c` | kmalloc de la capa, mailbox, pump del fabric |
| `navi_pipe.h/.c` | ASCII = lo6 + hi2; `navi_calc` entero |
| `navi_l2.h/.c` | HDC 1024 + RWKV ternario, ~66 KiB BSS, bundle leaky 7:1 |
| `navi2.h/.c` | L3 + veto L2; carga `navi2_weights.bin` (MB2), no heap |
| `navi2_fwd.h/.c` | motor ternario O(1); `navi2_fwd_bind` |
| `navi2_rag.c` | HTTP → strip HTML → HDC L2 (no backprop) |
| `navi2_bench.c` | rdtsc por token + footprint |
| `navi2_weights.h` | constantes del formato (sin arrays) |

Comando in-OS: `navi` / `monad` (ver `userland/shell/navi_cmd.c`).

Medir: `navi`, `mem`, `status`. Julios: `navi joules` (RAPL o negativa honesta).
