# Cómo funciona (pipeline)

1. **Señal** — real (importada) o simulada (`eeg_simulator`, 7 estados + artefactos parpadeo/músculo/drift, alfa centrada en la IAF del sujeto).
2. **Preprocesado** (`utils/filters`) — paso-banda 0.5–45 Hz + notch 50 Hz (60 donde aplique).
3. **Ventaneo** (`utils/dsp`) — ventanas deslizantes (por defecto 2 s).
4. **Features** (`feature_extraction`) — bandpower absoluto/relativo (δ θ α β γ), theta/alpha, beta/alpha, entropía espectral, Hjorth (actividad/movilidad/complejidad), RMS, varianza, artifact_score, signal_quality_index, alpha asymmetry.
5. **Baseline personal** (`baseline_engine`) — estadística por usuario y estado; z-score intrasujeto; desviación respecto a la base.
6. **Traductor individual** (`individual_translator`, Tb) — normalización específica de sujeto, umbrales adaptativos (percentiles personales), confianza, incertidumbre, detección de drift; construye Mp.
7. **ML** (`ml/`) — clasificación de estados (LogReg/RandomForest/GB), evaluación LOSO (entre-sujetos) y CV intra-sujeto (personalizado), IsolationForest para anomalías, KMeans/PCA para clusters personales.
8. **Teoría Dual + explicabilidad** (`theory/`) — ensambla Sp = Tb(Is, A, E, Mp) y genera una explicación en lenguaje claro, con confianza y avisos, siempre relativa al baseline del usuario.
9. **Ejercicios** (`exercise_engine`) — 5 ejercicios (alpha_calm, focus_beta, theta_imagery, noise_control, baseline_builder) con feedback pseudo-tiempo-real y resumen.
10. **Sesiones** (`session_store`) — registro JSON + exportación CSV.

## Extender a EEG real
- **Importar**: reutilizar el cargador de PRISMA v3 (`io.py`: .edf/.bdf/.vhdr/.set/.fif vía MNE, .mat vía scipy). Sustituir el simulador por datos reales manteniendo el resto del pipeline.
- **Muse / OpenBCI / LSL**: leer el stream con `pylsl` (Lab Streaming Layer), trocear en ventanas y alimentar `feature_extraction`. Muse (4 canales) → asimetría limitada; OpenBCI (8–16) → más features espaciales.
- **Validar**: correr LOSO sobre datasets reales (OpenNeuro, EEG-Dash) y test-retest entre sesiones; comparar con baselines publicados.
