# NAVI 5 — plan de entrenamiento y resultados

Seis fases. Ninguna destruye una instancia.

```bash
python3 run_peaceful_training.py --epochs 100 --instances 6
```

## Fases

| Fase | Acción | Detalle |
| --- | --- | --- |
| **1** | Estrés previo | `pre_training_stress.py`: CPU, RAM, shm, probe SNN. |
| **2** | Ingesta WSP | Corpus → `ROGEXWSPCodec` → bus RX-DIB. |
| **3** | Config Q6 / SNN | `V_th`, `tau`, curvas STDP, población. |
| **4** | Peaceful Training | Épocas + ciclo cooperativo (reeducar / destilar / especializar). |
| **5** | Telemetría pasiva | Tasa de disparo, homeostasis, µJ/spike. Sin writes al sandbox. |
| **6** | Consolidación | `ContinualMemory` + volcado de pesos, conectividad y mapa WSP. |

## Resultados esperados (y qué se midió)

Valores de un run de **40 épocas / 4 instancias** en el host del lab
(2026-08-17). No es “horas de GPU”. Es el contrato ejecutable.

| Área | Indicador | Esperado | Medido |
| --- | --- | --- | --- |
| Estabilidad | homeostasis, picos caóticos | esparso, sin caos | 0.999 · 0 picos · sparse 100% |
| Energía | µJ/spike | no crece al optimizar rutas | 1.00 → 0.988 |
| Población | retención | 100%, 0 destruidas | 4/4, KCC ok |
| Q6 | acuerdo simbólico | ≥ 98% | **1.00** en 4/4 tareas, 1 iter |
| WSP | trama + densidad | 16 B, densa, ruido ok | 16 B, densidad 0.55 |

Eventos cooperativos en ese run: 12 reeducaciones, 8 destilaciones,
16 especializaciones. Cero prunes.

## Cómo leer el reporte

El JSON sale en `/tmp/navi5_peaceful_training/training_report_*.json`:

- `ethics_compliance.instances_destroyed` tiene que ser 0.
- `expected_results.q6.last_agreement` ≥ 0.98 en tareas `symbolic_encode`.
- `phases.6_consolidation.artifacts` lista pesos y mapas WSP.

Suite automática:

```bash
python3 tests/test_navi5_manual.py
```

14 tests: LIF/STDP, WSP 16 B, ruido, RX-DIB, consenso, harness KCC,
estrés y pipeline de 6 fases.

## Lo que no prometemos

- Que 100 épocas en un portátil igualen “horas de entrenamiento” de un paper.
- Que el acuerdo 98% se sostenga en clasificación SNN fina (48 átomos crudos).
  El lab usa tareas simbólicas deterministas y cubetas gruesas en híbrido.
- Despliegue en NPU. Eso es Nivel 3 del [roadmap rxOS](/docs/rxos8).
