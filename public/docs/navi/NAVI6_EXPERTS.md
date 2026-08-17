# NAVI 6 para expertos — contrato, no slide

NAVI 6 es el tutor causal de la línea Knights Labs. Host: Python/Numba.
Kernel: C entero, heap 0, blob `NAVI6W01` por Multiboot2. No hay FPU en
el unikernel. No hay QPU en ningún sitio.

Documento hermano, sin jerga de marketing: [NAVI6.md](/docs/navi6).  
Versión para humanos: [NAVI6_DUMMIES.md](/docs/navi6-dummies).

## Superficies

| Superficie | Path | Rol |
| --- | --- | --- |
| SNN + metabolismo | `navi6_snn.py` | Extiende `NAVI5SNN`: `grow_synapse`, `retire_weak_synapses`, `spawn_microcircuit`, `autotune_metabolism` |
| DAG | `navi6_causal.py` | `CausalDAG.add/intervene/counterfactual/root_causes` |
| World model | `navi6_world.py` | Rollouts ruidosos; `F ≈ mean(||s-s0||²) + 0.1 Var` |
| Tutor | `navi6_engine.py` | `QWSP`, `FractalSwarm`, `NAVI6Engine.think` |
| Train + pack | `navi6_train.py`, `navi6_pack.py` | Destila 5 → 6; escribe `NAVI_AI_SNN/l3/navi6_weights.bin` |
| CLI | `./navi6` | REPL / `--ask` |
| Kernel | `kernel/navi/navi6.c` | `navi6_claim` + plantillas; `navi3_reply_ex` intercepta |
| ISO | `module2 /boot/navi6_weights.bin navi6` | Magic `NAVI6W01`, header 64 B |

KCC se mantiene: se retiran **sinapsis** débiles, no instancias.

## Blob `NAVI6W01`

```
[0:8)   magic NAVI6W01
[8:32)  ver, n_templates, payload_len, crc32(payload), pad
payload:
  u32 n_tmpl;  {u16 len; ascii[len]} *
  u32 n_edges; {u32 crc(cause), u32 crc(effect), i8 q100, u8 domain, u8 tmpl} *
  u8 v_th_q100, u8 tau
```

El kernel **no** ejecuta Numba. El blob es el conocimiento publicable
(DAG + máscaras). Reentrenar + `make iso-refresh` actualiza el mundo
sin relink si el `.c` no cambió.

## Do-calculus (host)

`intervene(node, value)` mutila padres de `node` y relaja el resto
~10 pases. `counterfactual` devuelve el delta respecto a priors.
Currículo semilla: cola CPU → spin-lock → ram_spike / gpu_stall;
`ring_buffer` inhibe el lock; `shared_mem` alza `cache_incoherence`.

## Q-WSP (clásico)

Vector complejo de 48 amplitudes. Encode: `exp(2πi (k+1)/4)` en el átomo `k`.
Medida = `argmax |a_i|²`. Entropía Shannon de `|a|²`.
**No hay entrelazamiento físico.** El nombre es el protocolo, no el silicio.

## Enjambre

3 clusters × 2 instancias `Q6Orchestrator`, tarea `symbolic_encode`,
meta-voto por moda. Escala de laboratorio. Acuerdo típico 1.00 en
tareas deterministas.

## Hook in-kernel

`navi6_claim(user)` en 6.5 es todo turno no vacío. `navi6_reply` posee
el chat y delega `G_talk`…`G_rxos` a `wsp_render_packet`. `/prove` sigue
por `G_rxos`. Ver [NAVI 6.5](/docs/navi65).

Comando shell: `navi6`, `navi65`, `navi6 bench`.

## Cómo medir

```bash
python3 tests/test_navi6.py          # 6 tests: grow, do(), F, tutor, magic
python3 navi6_train.py --epochs5 12 --rounds6 16
./navi6 --ask "…"
# kernel
make                                 # linka navi6.o
make iso-refresh                     # stage NAVI6W01
```

QEMU se niega a RAPL. Metal HP 15-ac195nl (17 ago 2026): 18554 µJ / 256 Q6 = 72.5 µJ/run de paquete. No es J/NPU. Ver [metal 8.5](/docs/hp-metal-85).

## Límites que son contrato

- El tutor acierta en el **soporte del DAG**. Fuera de eso, dice el
  perímetro; no alucina un profiler de CUDA.
- World model = escenarios discretos etiquetados, no física continua.
- “Inteligente” = causa nombrable + contrafáctico medible, no AGI.
