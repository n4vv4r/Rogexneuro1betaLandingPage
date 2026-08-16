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
| World model | `navi6_world.py` | Rollouts ruidosos; \(F \approx \mathbb{E}[\|s-s_0\|^2] + 0.1\mathrm{Var}\) |
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
~10 pases. `counterfactual` devuelve \(\Delta\) respecto a priors.
Currículo semilla: cola CPU → spin-lock → ram_spike / gpu_stall;
`ring_buffer` inhibe el lock; `shared_mem` alza `cache_incoherence`.

## Q-WSP (clásico)

Vector \(\mathbb{C}^{48}\). Encode: \(e^{2\pi i (k+1)/4}\) en el átomo \(k\).
Medida = \(\arg\max |a_i|^2\). Entropía Shannon de \(|a|^2\).
**No hay entrelazamiento físico.** El nombre es el protocolo, no el silicio.

## Enjambre

3 clusters × 2 instancias `Q6Orchestrator`, tarea `symbolic_encode`,
meta-voto por moda. Escala de laboratorio. Acuerdo típico 1.00 en
tareas deterministas.

## Hook in-kernel

`navi6_claim(user)` (subcadenas `gpu|ram|hilo|lock|pasaria|ring|compart|spike`).
Si true y el generador no es `G_rxos`, `navi6_reply` gana.
`G_rxos` / `/prove` / talk poético siguen en 4.5.

Comando shell: `navi6`, `navi6 bench`.

## Cómo medir

```bash
python3 tests/test_navi6.py          # 6 tests: grow, do(), F, tutor, magic
python3 navi6_train.py --epochs5 12 --rounds6 16
./navi6 --ask "…"
# kernel
make                                 # linka navi6.o
make iso-refresh                     # stage NAVI6W01
```

No se publica J/inferencia: RAPL en QEMU no es honesto.

## Límites que son contrato

- El tutor acierta en el **soporte del DAG**. Fuera de eso, dice el
  perímetro; no alucina un profiler de CUDA.
- World model = escenarios discretos etiquetados, no física continua.
- “Inteligente” = causa nombrable + contrafáctico medible, no AGI.
