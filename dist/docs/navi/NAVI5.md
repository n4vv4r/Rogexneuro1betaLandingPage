# NAVI 5 — laboratorio cooperativo, no un loro más grande

NAVI 5 no sustituye a NAVI-4.5 en la ISO. Es el **laboratorio host** de la
línea: varias instancias SNN (LIF + STDP) que aprenden juntas **sin matar
a ninguna**. Principio **KCC** (*Knights Cooperative Consensus*):
cero pruning destructivo.

Corre en Python/Numba. Opcionalmente en contenedores `network_mode: none`
(air-gap). El operador in-OS sigue siendo [NAVI-4.5](/docs/navi45).

## Principios

| Principio | Qué significa en código |
| --- | --- |
| **Zero-pruning** | `lab_harness.py` no elimina subredes. Una señal de *reeducación* sustituye al prune. |
| **SNN esparso** | LIF \(V \leftarrow V_{rest}+(V-V_{rest})e^{-dt/\tau}+I\), STDP LTP/LTD, homeostasis, \(\mu\)J/spike. |
| **WSP 16 B** | Misma postal que el kernel: 4 átomos + E[V A D C U B] + CRC8. |
| **Q6 consenso** | Tareas por voto ponderado de *fitness*. Objetivo de acuerdo ≥ 98% en tareas simbólicas. |
| **Memoria continua** | Decaimiento en working memory; patrones fuertes van a largo plazo. |

## Piezas

| Módulo | Archivo | Función |
| --- | --- | --- |
| SNN JIT | `navi5_snn.py` | LIF + STDP Numba, Watts–Strogatz, exportación de pesos |
| Motor | `navi5_engine.py` | WSP, bus RX-DIB, inferencia híbrida, Q6, `ContinualMemory` |
| Evolución | `cooperative_evolution.py` | Reeducación, destilación, especialización, fusión |
| Entrenamiento | `run_peaceful_training.py` | 6 fases del manual |
| Harness | `lab_harness.py` | Telemetría **solo lectura** |
| Estrés | `pre_training_stress.py` | CPU / RAM / shm **antes** de entrenar |

## Inferencia híbrida

```
bytes → trama WSP 16 B → corriente de membrana
     → paso LIF/STDP → spikes → trama WSP de salida
```

El castellano, si aparece, es máscara. El bus RX-DIB mueve tramas, no JSON
de chat.

## Cómo comprobarlo (host)

```bash
python3 tests/test_navi5_manual.py
python3 run_peaceful_training.py --epochs 40 --instances 4
```

Criterios que el propio reporte exige:

- instancias destruidas = 0
- reeducación y destilación > 0
- régimen esparso, sin picos caóticos
- acuerdo Q6 ≥ 0.98 en tareas `symbolic_encode`
- volcado de `weights_*.npy` + `wsp_map_*.json`

## Límites honestos

- Simulación en software. **No** es un port a Loihi / TrueNorth / Akida.
- No es un razonador de propósito general ni un LLM.
- Compresión WSP < 1× en payloads únicos y cortos; reuso de diccionario
  sí baja a 16 B por retransmisión.
- El laboratorio Docker (`network_mode: none`) está cableado; el operador
  de la ISO no ejecuta este Python.

Manual de arquitectura: [NAVI5_ARCHITECTURE](/docs/navi5-arch).  
Plan de entrenamiento: [NAVI5_TRAINING](/docs/navi5-train).  
Línea completa: [CATALOG](/docs/navi-catalog) · página [`/navi`](/navi).
