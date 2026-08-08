# PRISMA Engine — Documentación técnica

**Versión documentada:** 0.1.0 (tech preview)  
**Estado:** Runtime nativo publicado (Linux / Windows / macOS)  
**Clasificación:** Software experimental de investigación. **No es un dispositivo médico.**

---

## 1. Propósito

PRISMA Engine es el **runtime de ultra baja latencia** del stack PRISMA. Sustituye el camino crítico basado en Python/Streamlit por un binario nativo (Rust) orientado a:

1. Ingesta multicanal de EEG (síntesis demo hoy; ADC/LSL en el roadmap).
2. Codificación a eventos (Delta Modulation) con idle cuando no hay cambio.
3. Procesado neuromórfico en software (LIF + STDP + predictive coding) sobre x86_64 SIMD.
4. Telemetría y GUI nativa ligera (egui/eframe).
5. Capa HAL preparada para NPU (BrainChip Akida AKD1000 stub).

PRISMA Engine **no es** el producto completo “PRISMA 5 SNN”. Expone **kernels de investigación** que alimentarán PRISMA 5; la descarga pública actual es del **Engine 0.1.0**, no de un release de producto PRISMA 5.

---

## 2. Objetivos de diseño

| Métrica | Objetivo | 0.1.0 (medido, ref. Ryzen 5 AVX2) |
|---|---|---|
| Latencia hot-path | &lt; 1 ms / evento | media ≈ **1.7–2.5 µs**/sample |
| Asignaciones en hot-path | cero | buffers preasignados |
| RAM | &lt; 64 MB | footprint binario + estado fijo |
| GUI | ≥ 60 FPS, CPU UI baja | egui @ ~60 FPS en capturas |
| Portabilidad | x86_64 + HAL | Linux, Windows x64, macOS arm64 |

---

## 3. Arquitectura

```
ADC / Synth
    │ SampleFrame (POD, stack-friendly)
    ▼
┌───────────────────┐
│ SPSC ring lock-free│  capacity 2^n · zero-copy push_with/pop
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Delta Modulation  │  θ_adp adaptativo · idle si |ΔV| < θ
│  → SpikeEvent[]   │
└─────────┬─────────┘
          ▼
┌───────────────────────────────┐
│ NeuromorphicHal (trait)       │
│  ├─ SimdSnBackend (activo)    │  LIF AVX2 + STDP + PC
│  └─ AkidaStubBackend (hook)   │  PCIe/SPI futuro
└─────────┬─────────────────────┘
          ▼
  TelemetrySnapshot ──► egui GUI / headless bench
```

### 3.1 Módulos (crate `prisma-engine`)

| Módulo | Rol |
|---|---|
| `types.rs` | `SampleFrame`, `SpikeEvent`, `EngineConfig`, límites `MAX_CHANNELS` |
| `spsc_ring.rs` | SPSC lock-free, padding de línea de caché, semántica zero-copy |
| `delta_mod.rs` | Codificador Δ-mod multi-step acotado, EMA de θ_adp |
| `snn_lif_avx2.rs` | Población LIF · AVX2/FMA (detect runtime) · fallback scalar |
| `stdp.rs` | Plasticidad STDP + inhibición local + soft-gate por artefacto |
| `predictive_coding.rs` | Error de predicción de tasa de spikes → `AnomalyScore` |
| `hal/` | Trait + backends SIMD y Akida stub |
| `pipeline.rs` | Hilos productor/consumidor, scratch preasignado |
| `gui_renderer.rs` | egui: waveforms, raster, espectro, latencia |
| `synth.rs` | EEG sintético (demo / bench) |

### 3.2 Hot-path contract

En `DeltaModulator::encode`, `SnLifEngine::step` y `NeuromorphicHal::process_spikes`:

- No `Vec::push` / no `String` / no heap grow.
- Spikes escritos en slices caller-owned (`&mut [SpikeEvent]`).
- Corrientes sinápticas limpiadas in-place cada tick.
- Backpressure del SPSC: si full, drop-oldest en el productor demo.

---

## 4. Codificación: Delta Modulation

Para cada canal:

```
residual = sample[ch] − reconstruction[ch]
si |residual| < θ_adp  →  idle (sin spike)
si residual ≥ θ_adp    →  Spike UP,   reconstruction += θ_adp
si residual ≤ −θ_adp   →  Spike DOWN, reconstruction −= θ_adp
```

- **θ_adp** se adapta por EMA hacia la energía reciente (clamp `[θ_min, θ_max]`).
- Saltos grandes: multi-step acotado (máx. 8 steps/sample) para evitar floods.
- Idle ratio típico en señal mixta demo: ~55%.

---

## 5. Motor LIF SIMD

Regla por neurona y tick:

```
v ← leak · v + I_syn
si v ≥ V_th  →  spike, v ← V_reset
```

- Anchura AVX2: 8 lanes `f32` (`_mm256_fmadd_ps` + blend de reset).
- Detección runtime: `avx2 && fma`; si no, path scalar.
- Proyección canal→banda de neuronas + STDP weights.
- Inhibición local tras spike postsináptico.

---

## 6. STDP y predictive coding

**STDP (filtro de artefactos / soft plasticity):**

```
Δw =  A⁺ exp(−Δt/τ⁺)   si t_post > t_pre
Δw = −A⁻ exp( Δt/τ⁻)   si t_pre  > t_post
```

Pesos clamp `[0, 2]`. En anomalía: depresión global suave de pesos.

**Predictive coding:**

- EMA de tasa de spikes por canal (predicción).
- Error = media |actual − predicted| en ventana (~40 ms).
- `is_artifact` si error ≥ umbral configurado.

---

## 7. HAL

```rust
trait NeuromorphicHal {
    fn open(&mut self, cfg: &EngineConfig) -> Result<(), HalError>;
    fn process_spikes(&mut self, input: &[SpikeEvent], n_ch: usize,
                      ts_ns: u64, out: &mut [SpikeEvent]) -> Result<usize, HalError>;
    fn last_anomaly(&self) -> AnomalyScore;
    fn notify_artifact(&mut self, confidence: f32);
    fn close(&mut self) -> Result<(), HalError>;
}
```

| Backend | Estado |
|---|---|
| `simd` / `auto` | **Activo** — emulador SNN software |
| `akida` | **Stub** — `DeviceMissing` salvo `PRISMA_AKIDA_SIM=1` |

---

## 8. CLI y builds

```bash
prisma-engine                         # GUI
prisma-engine --headless --bench-samples 50000
prisma-engine --backend simd --mode alpha --channels 8 --neurons 256
PRISMA_AKIDA_SIM=1 prisma-engine --backend akida --headless
```

**Features Cargo:** `gui`, `simd-avx2`, `simd-avx512` (opcional), `synth`.

**Instaladores 0.1.0 (públicos en `/downloads`):**

| Plataforma | Artefacto |
|---|---|
| Windows x86_64 | `PRISMA-Engine-0.1.0-Setup.exe` (NSIS) |
| macOS arm64 | `PRISMA-Engine-0.1.0.dmg` (UDZO) |
| Linux x86_64 | `prisma-engine-0.1.0-x86_64-linux.tar.gz` |

---

## 9. Límites científicos y legales

- Experimental / no clínico: no diagnostica, no trata, no predice enfermedad.
- EEG demo sintético o datasets de investigación; no sustituye EEG clínico.
- Akida: sin chip físico no hay métricas J/inf. NPU reales.
- Firma de instaladores: ad-hoc (macOS) / sin Authenticode (Windows) en 0.1.0.

---

## 10. Relación con PRISMA 3 y PRISMA 5

| Pieza | Qué es | Descarga pública |
|---|---|---|
| **PRISMA 3.x research** | Pipeline Python/MNE, features, baseline, ML | App/research (no este instalador) |
| **PRISMA Engine 0.1** | Runtime nativo + kernels SNN de investigación | **Sí** — `/downloads` |
| **PRISMA 5 SNN** | Producto event-driven completo (UI lab, LSL, RXos, OEM) | **No** — en roadmap |

Documentos relacionados:

- [PRISMA 5 SNN — técnica](./PRISMA_5_SNN_TECHNICAL.md)
- [PRISMA 5 — hoja de ruta y finalidades](./PRISMA_5_ROADMAP.md)

---

*Knights Labs / Rogex Laboratories · 2026*
