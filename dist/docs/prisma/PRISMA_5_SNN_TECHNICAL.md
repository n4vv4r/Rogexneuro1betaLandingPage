# PRISMA 5 SNN — Documentación técnica (visión de producto)

**Estado:** **No publicado** como producto descargable.  
**Núcleo de investigación:** kernels LIF/STDP/Δ-mod viven en *PRISMA Engine 0.1* como laboratorio de software; **no constituyen un release de PRISMA 5**.  
**Clasificación:** Diseño de producto experimental. **No es un dispositivo médico.**

---

## 1. Qué es PRISMA 5 (y qué no es)

### Es

Un **motor de BCI/EEG event-driven** basado en redes de impulsos (SNN):

- Entrada asíncrona por **trenes de espigas** (no ventanas FFT obligatorias en el camino crítico).
- Actualización **por evento** con objetivo de latencia **&lt; 1 ms**.
- Plasticidad local (**STDP**), inhibición y **predictive coding** para artefactos y anomalías.
- Despliegue objetivo: software de alta performance → event fabric **RXos** → opcionalmente **NPU** (Akida AKD1000).

### No es

- Un instalador o descarga pública en 2026-Q3 (aún no existe el producto).
- Un sustituto de software clínico de EEG.
- Un lector de pensamientos ni decodificador de contenido mental.
- El mismo binario que “PRISMA Engine 0.1” con otro nombre de marketing.

> **Política de comunicación:** PRISMA Engine puede mencionar “kernels SNN de investigación”.  
> La etiqueta de producto **PRISMA 5 SNN** se reserva al release de producto cuando cumpla la hoja de ruta ([PRISMA_5_ROADMAP.md](./PRISMA_5_ROADMAP.md)).

---

## 2. Finalidades del producto

| Finalidad | Descripción | Público |
|---|---|---|
| **BCI de ultra baja latencia** | Cerrar bucles HCI/BCI donde 100–500 ms de software clásico son inaceptables | Research / makers / OEM |
| **Neurofeedback experimental** | Feedback en tiempo real sobre estructuras de spikes y ritmos por resonancia | Labs, demos controladas |
| **Edge / on-device** | Footprint y energía compatibles con MCU/FPGA/NPU, no solo PCs de varios GB | OEM hardware |
| **Puente a silicio neuromórfico** | Mismo modelo de eventos hacia Akida u otros NPU vía HAL | Integradores |
| **Ciencia reproducible** | Límites explícitos, benchmarks etiquetados, sin claims clínicos | Academia |

**Fuera de alcance (v1 producto):** diagnóstico médico, claims de consciencia, producción regulada MDR/FDA.

---

## 3. Modelo de señal: de microvoltios a spikes

### 3.1 Delta Modulation (codificación)

```
ΔV(t) = V(t) − V(t_prev)
si |ΔV| < θ_adp     → silencio (idle / zero events)
si ΔV ≥ +θ_adp      → spike UP
si ΔV ≤ −θ_adp      → spike DOWN
```

θ_adp es **adaptativo por sujeto/canal** (homeostasis de tasa).  
Objetivo: la red solo “despierta” cuando la señal cambia — base del ahorro energético.

### 3.2 LIF (Leaky Integrate-and-Fire)

```
τ_m · dv/dt = −(v − v_rest) + R · I_syn(t)
si v ≥ v_th → spike, v ← v_reset
```

En software mode (Engine): discretización por sample + SIMD.  
En producto P5: priorizar **actualización event-driven** (sin tick neural periódico global cuando el fabric lo permita).

### 3.3 STDP como filtro

Plasticidad dependiente de timing:

- Pre → post (causal): potencia (A⁺, τ⁺).
- Post → pre: deprime (A⁻, τ⁻).
- Uso en P5: **soft-gate de artefactos** (parpadeo, EMG, cable) y firma temporal individual — no “aprendizaje profundo” opaco de caja negra.

### 3.4 Predictive coding

Población o modelo generativo de tasa de spikes esperada.  
**Anomalía = error de predicción** (|spikes_obs − spikes_pred|), no solo umbral de potencia espectral.

### 3.5 Resonancia de ritmos (producto, no solo Engine 0.1)

Objetivo de producto: bandas δ/θ/α/β vía **poblaciones sintonizadas** (resonancia), reduciendo dependencia de windowing FFT de cientos de ms en el path de eventos.

---

## 4. Arquitectura de producto (objetivo)

```
Sensores EEG / LSL / ADC
        │
        ▼
   Front-end codificación (Δ-mod, θ_adp personal)
        │ spikes
        ▼
┌─────────────────────────────────────┐
│ PRISMA 5 Runtime                    │
│  · Graph SNN (LIF, delays, STDP)    │
│  · Predictive coding stack          │
│  · Rhythm resonance units           │
│  · Session / subject profile        │
└──────────────┬──────────────────────┘
               │
     ┌─────────┼─────────┐
     ▼         ▼         ▼
  Software   RXos      Akida / FPGA
  (x86/ARM)  fabric    (HAL)
               │
               ▼
     UI lab · feedback · export
```

### Capas

1. **Ingress** — LSL, serial ADC, archivo offline replay, reloj monotónico.
2. **Codec** — Δ-mod, compresión de eventos, sincronización multicanal.
3. **SNN core** — grafo, plasticidad, predicción, ritmos.
4. **Subject layer** — baseline de tasa, umbrales personales, confianza/incertidumbre.
5. **Application** — neurofeedback UI, logging, export BIDS-lite / sesión.
6. **HAL** — mismo contrato que Engine: `process_spikes` zero-alloc.

---

## 5. Requisitos no funcionales (producto)

| Req | Meta v1 producto |
|---|---|
| Latencia evento→decisión | p99 &lt; 1 ms en path software optimizado; documentar p99 en NPU cuando exista |
| Memoria | &lt; 64 MB en perfil edge; perfiles lab pueden ser mayores |
| Determinismo | Orden de eventos reproducible en replay offline |
| Observabilidad | Raster, tasas, error PC, SQI-like scores |
| Seguridad | Sin telemetría clínica por defecto; export opt-in |
| Licencia | Robin Hood (community / research / commercial / OEM) — ver web Suite |

---

## 6. Qué aporta hoy el Engine 0.1 (sin ser P5)

El Engine publica un **laboratorio ejecutable**:

- Δ-mod + LIF AVX2 + STDP + PC + GUI + instaladores.
- Útil para medir latencias, idle ratio y validar HAL.
- **No incluye** (aún): producto UI de laboratorio P5, LSL production, grafo SNN configurable por el usuario, resonancia de ritmos completa, binding RXos bare-metal, driver Akida real, calibración sujeto end-to-end de producto.

Por eso **no hay botón de descarga “PRISMA 5 SNN”** en la web pública.

---

## 7. Interfaces previstas (borrador)

### 7.1 Evento canónico

```text
SpikeEvent { tick: u64, timestamp_ns: u64, source_id: u16, polarity: Up|Down, amplitude: f32 }
```

### 7.2 Config de sesión (YAML/JSON, cold path)

- `n_channels`, `sample_rate_hz`, `neuron_count` / graph file
- `theta_adp_*`, `lif_*`, `stdp_*`, `pred_*`
- `subject_id`, `session_id`, `export_path`

### 7.3 HAL (estable desde Engine)

Ver [PRISMA_ENGINE_TECHNICAL.md](./PRISMA_ENGINE_TECHNICAL.md) §7. PRISMA 5 reutilizará el trait; no reinventará el transporte de spikes.

---

## 8. Evaluación y evidencia (plan)

| Nivel | Qué medir | Cuándo |
|---|---|---|
| L0 | Latencia microbench (Engine) | Ya en 0.1 |
| L1 | Idle ratio vs SNR sintético | Ya / ampliar |
| L2 | Artefactos (blink/EMG) → PC/STDP scores | Roadmap P5-α |
| L3 | EC/EO u otros paradigmas con spikes (no solo bandpower) | Roadmap P5-β |
| L4 | Test-retest, incertidumbre, confounds | Pre-release producto |
| L5 | NPU J/inf vs CPU (Akida) | Cuando haya silicio |

Cualquier accuracy numérico de PRISMA 3 (LOSO, personalizado) **no se reetiqueta** como rendimiento de PRISMA 5 sin estudio específico sobre representaciones de spikes.

---

## 9. Riesgos técnicos

1. **Sobreclaim de “SNN product”** mientras solo hay kernels en Engine — mitigado con política de descarga y docs.
2. **Sim-to-real** en Akida (cuantización, topología).
3. **θ_adp / homeostasis** inestable en sujetos reales.
4. **Falta de ground truth** de “artefacto” en datasets públicos.
5. **Regulación** si alguien usa el software en contexto clínico sin autorización.

---

## 10. Referencias internas

- [PRISMA Engine — técnica](./PRISMA_ENGINE_TECHNICAL.md)
- [PRISMA 5 — hoja de ruta y finalidades](./PRISMA_5_ROADMAP.md)
- Papers RXos (event fabric): `/docs/rxos/`

---

*Knights Labs / Rogex Laboratories · 2026*
