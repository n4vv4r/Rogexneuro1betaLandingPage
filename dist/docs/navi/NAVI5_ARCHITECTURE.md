# NAVI 5 — arquitectura del laboratorio

El laboratorio es un ecosistema **modular y contenido**. El harness lee;
no escribe en el estado de las instancias.

```
host (solo lectura)
  lab_harness.py ──lee──► /tmp/metrics  /tmp/rxdib
                              ▲
         ┌────────────────────┼────────────────────┐
         │ sandbox 0          │ sandbox 1 …        │
         │ network_mode: none │ read_only, cap_drop ALL
         │ navi5_snn.py       │ RX-DIB por volumen
         └────────────────────┴────────────────────┘
```

## Capas

| Capa | Componente | Notas |
| --- | --- | --- |
| Monitoreo | `lab_harness.py` | Telemetría pasiva. Un prune se **rechaza** y se convierte en `reeducate_*.signal`. |
| Contención | Docker | `network_mode: none`, `read_only`, `cap_drop: ALL`, `no-new-privileges`. |
| Orquestación | `Q6Orchestrator` | Broadcast WSP, voto ponderado por fitness, destilación a disidentes. |
| Bus | RX-DIB | Cola in-process + ficheros atómicos en tmpfs (`/tmp/rxdib`). Sin red. |
| Núcleo | `NAVI5SNN` | LIF + STDP Numba. `V_th`, `tau`, µJ/spike, Watts–Strogatz. |
| Memoria | `ContinualMemory` | Decay + fusión de vecinos + almacén de largo plazo. |
| Códec | `ROGEXWSPCodec` | Contrato 16 B idéntico a `kernel/include/wsp.h`. |

## LIF (lo que se simula)

```
V := V_rest + (V - V_rest) * exp(-dt/tau) + I
```

Si `V >= V_th`: spike, `V := V_reset`, refractario.
STDP cada 10 pasos: LTP `A+ * exp(-dt/tau+)`, LTD `A- * exp(dt/tau-)`.
Sinapsis ociosas decaen → menos rutas activas → menos µJ/spike.

Homeostasis escala pesos hacia una tasa objetivo (~5%). Una corriente de
fondo baja evita el régimen “red muerta” (esparso porque no dispara nadie).

## WSP v0.5 en el host

Misma postal que el unikernel:

```
src rel dst time     4 × u8  (átomos 0..47)
E[6]                 V A D C U B, i8 ±100
flags                1 B
ext                  domain, generator, style, slot
CRC8                 byte 16
```

Diccionario por hash de payload. Reconstrucción ante ruido: CRC + vecino
Hamming ≤ 8 bits. Densidad de carga útil ≈ 0.55 (bits semánticos / 128).

## Q6 (consenso, no geometría sagrada)

1. Broadcast de la tarea por RX-DIB.
2. Cada instancia `propose()` (átomos WSP o cubetas SNN).
3. Acuerdo = fitness de quienes coinciden / fitness total.
4. Si acuerdo < 0.98: destilar del ganador a los disidentes y repetir.

El hipercubo Q₆ de 64 neuronas sigue siendo [NAVI 1](/docs/navi1).
Aquí “Q6” nombra al **orquestador** de instancias.

## KCC vs el harness antiguo

El harness original podía *prunar* subredes. Eso contradice el manual.
Hoy `EvolutionaryController.should_prune` devuelve `False` y
`execute_pruning` redirige a reeducación. Invariante: `instances_destroyed = 0`.

## Seguridad

| Parámetro | Valor |
| --- | --- |
| Red | `network_mode: none` (no bridge interno) |
| Rootfs | `read_only: true` |
| Caps | `cap_drop: ALL` |
| Usuario | `navi5user` (uid 1000) |
| Bus | volumen tmpfs, no sockets de red |

Ver también [NAVI5](/docs/navi5) y [entrenamiento](/docs/navi5-train).
