# PRISMA 5 SNN — Hoja de ruta de desarrollo y finalidades

**Producto:** PRISMA 5 (event-driven SNN / BCI)  
**Estado actual:** **No hay descarga pública de producto PRISMA 5.**  
**Base de I+D:** kernels en PRISMA Engine 0.1 (software mode).  
**Documento hermano:** [PRISMA_5_SNN_TECHNICAL.md](./PRISMA_5_SNN_TECHNICAL.md)

---

## 1. Finalidades (por qué existe PRISMA 5)

### 1.1 Problema

El software EEG/BCI de escritorio clásico suele:

- Procesar por **ventanas** (decenas–cientos de ms de delay inherente).
- Consumir **RAM y CPU** de monólitos pesados.
- Tratar la variabilidad interindividual y los artefactos con pipelines offline.

### 1.2 Respuesta de producto

PRISMA 5 existe para ofrecer un **camino event-driven** donde:

1. La señal se convierte en **spikes** (Delta Modulation) y el cómputo se activa con eventos.
2. La latencia objetivo del path crítico es **&lt; 1 ms** (software optimizado; NPU cuando exista).
3. STDP + predictive coding actúan como **filtros temporales**, no solo FFT + heurísticas.
4. El mismo modelo de eventos se puede mover a **RXos** y a **silicio neuromórfico** (HAL).
5. Se mantiene la ética PRISMA: **límites explícitos, no clínico, evidencia etiquetada**.

### 1.3 Finalidades por stakeholder

| Stakeholder | Finalidad |
|---|---|
| **Investigador** | Prototipar BCI/SNN con replay reproducible y métricas de latencia/artefacto |
| **Developer** | Integrar un runtime de eventos (API/HAL) en demos HCI |
| **OEM** | Path edge de bajo footprint hacia NPU/MCU sin reescribir el codec |
| **Lab / commercial** | Neurofeedback experimental con licencia Pro (cuando exista release) |
| **Sociedad / lab open** | Documentar honestamente qué está shipped vs roadmap |

---

## 2. Principios de la hoja de ruta

1. **No vender el Engine como P5.** Los instaladores públicos son *PRISMA Engine*.
2. **Gates de release:** cada fase cierra con criterios medibles (abajo).
3. **Evidencia antes de claim.** Accuracy/paradigmas de P3 no se copian a P5 sin estudio.
4. **Hardware opcional.** P5 software-first; Akida es acelerador, no bloqueante del diseño.
5. **Robin Hood licensing** al productizar (community / research / commercial / OEM).

---

## 3. Fases de desarrollo

### Fase 0 — Fundamentos (HECHO en Engine 0.1)

**Entregables**

- Runtime Rust: SPSC, Δ-mod, LIF AVX2, STDP, PC, GUI, HAL stub.
- Instaladores Linux/Windows/macOS del **Engine**.
- Microbench latencia &lt; 1 ms (de hecho µs).

**Criterio de cierre:** binarios públicos Engine + docs Engine.  
**No cierra:** producto P5, descarga “PRISMA 5 SNN”.

---

### Fase 1 — P5-α “Lab Core” (próxima)

**Objetivo:** primer *producto interno* usable por el lab, aún no store pública.

| Trabajo | Detalle |
|---|---|
| Graph SNN | Grafo configurable (YAML/JSON): capas, delays, pesos iniciales |
| Subject profile | θ_adp / tasas base por sujeto; persistencia de sesión |
| LSL ingress | Entrada Live en vivo (además de synth) |
| Offline replay | Mismo path determinista desde archivo |
| UI lab mínima | Raster, tasas, PC error, start/stop sesión (no Streamlit) |
| Export | Log de eventos + metadatos sesión (JSON/CSV) |
| Tests | Suite de regresión latencia + idle + STDP clamp |

**Criterios de salida (gate α)**

- [ ] p99 latencia documentada en máquina de referencia.
- [ ] Replay bit-a-bit (orden de spikes) en fixture sintético.
- [ ] LSL smoke test con stream sintético o dispositivo de lab.
- [ ] Documento de límites actualizado; **sin** claim clínico.
- [ ] **Aún sin** descarga pública “PRISMA 5” (tag pre-release privado o nightly interno).

**Finalidad de la fase:** validar el *producto lab* antes de marketing.

---

### Fase 2 — P5-β “Resonance & Artifacts”

**Objetivo:** valor científico/demo diferencial frente a solo FFT.

| Trabajo | Detalle |
|---|---|
| Rhythm resonance | Unidades δ/θ/α/β sin windowing largo en path de eventos |
| Artifact suite | Blink/EMG sintéticos + scores STDP/PC calibrados |
| Benchmark matrix | Strict vs ceiling etiquetados (como cultura P3) |
| Confound notes | Documentar qué *no* se puede concluir |
| GUI | Paneles de ritmo + confianza de artefacto |
| Packaging | Builds internos firmados; changelog semver P5 |

**Criterios de salida (gate β)**

- [ ] Al menos un paradigma público (p.ej. EC/EO) evaluado en dominio spikes con metodología honesta.
- [ ] Test-retest o estabilidad de umbrales en N≥ pequeño documentado.
- [ ] Comparativa Engine kernels vs P5-β graph (latencia y utilidad).

**Finalidad de la fase:** demostrar que el approach SNN aporta *algo medible* además de marketing.

---

### Fase 3 — P5-γ “Product Preview” (primera descarga pública de P5)

**Objetivo:** tech preview **etiquetada PRISMA 5**, no confusión con Engine.

| Trabajo | Detalle |
|---|---|
| Branding | Instalador y UI dicen “PRISMA 5 SNN Tech Preview” |
| Docs usuario | Quickstart, límites, troubleshooting |
| Licencias | Community / Research keys o freemium según política |
| Support surface | Issues / canal lab; sin promesa clínica |
| Security | Sandbox de export; sin cloud por defecto |
| CI | Builds Win/macOS/Linux de **P5**, no solo Engine |

**Criterios de salida (gate γ) — habilita botón de descarga P5**

- [ ] Versionado `prisma5-x.y.z` independiente del Engine.
- [ ] SHA-256 y notas de release públicas.
- [ ] Checklist legal/ética revisada (no-clínico, experimental).
- [ ] Página web: card P5 `available: true` **solo entonces**.

**Finalidad de la fase:** preview controlada para early adopters técnicos.

---

### Fase 4 — P5-1.0 “Research Release”

**Objetivo:** release estable para labs (aún no medical device).

| Trabajo | Detalle |
|---|---|
| Stability | API HAL + session format estables (semver major) |
| RXos binding | Path de eventos hacia fabric RXos v4.5+ |
| Calibration UX | Flujo sujeto: baseline → umbrales → sesión |
| OEM hooks | Config de canales, branding white-label opcional |
| QA | Matriz de regresión ampliada; fuzz de codecs |

**Criterios de salida**

- [ ] Soporte documentado 3 OS.
- [ ] Performance budget cumplido en hardware de referencia publicado.
- [ ] Política de vulnerabilidades y contacto security.

---

### Fase 5 — Hardware path (paralelo desde β)

**Objetivo:** Akida / FPGA / MCU como *acelerador*, no reescritura.

| Trabajo | Detalle |
|---|---|
| Driver Akida | Implementar `AkidaTransport` real (PCIe/SPI) |
| Map de red | Compilar graph P5 → blob on-chip |
| Bench J/inf | Comparativa CPU SIMD vs NPU (energía, latencia) |
| Fallback | Si no hay NPU, mismo API software |

**Bloqueante:** disponibilidad física del chip en el lab.

**Finalidad:** edge de ultra bajo consumo y credibilidad neuromórfica real.

---

### Fase 6 — Largo plazo (conceptos)

| Concepto | Finalidad | Nota |
|---|---|---|
| **ASTRA** | Feedback hardware + protocolos cerrados | Ética y regulación primero |
| **NOOSPHERE** | Red federada de labs / procedencia de resultados | No lectura mental |
| **Medical path** | Solo si hay partner, QMS y trials | Fuera del scope actual |

---

## 4. Cronograma orientativo (no compromiso contractual)

| Ventana | Hito |
|---|---|
| **Ahora** | Engine 0.1 shipped · P5 docs + roadmap públicos · **sin** descarga P5 |
| **+1–2 trimestres** | P5-α lab core (LSL, graph, UI mínima) — interno |
| **+2–4 trimestres** | P5-β resonance/artifacts + evidencia honesta |
| **Cuando gate γ** | Primera **tech preview descargable** de PRISMA 5 |
| **Post 1.0** | RXos binding maduro · OEM · Akida si hay silicio |

Las fechas se ajustan a evidencia y hardware; la web debe reflejar **gates**, no promesas de calendario rígidas.

---

## 5. Matriz shipped vs no shipped (comunicación)

| Capacidad | Engine 0.1 | P5-α | P5-γ (preview) | P5-1.0 |
|---|---|---|---|---|
| Δ-mod + LIF SIMD | sí | sí | sí | sí |
| STDP / PC básicos | sí | sí | sí | sí |
| GUI demo egui | sí | evoluciona | sí | sí |
| Instaladores Engine | sí | — | — | — |
| Instalador / marca **PRISMA 5** | **no** | no público | **sí** | sí |
| Graph SNN de usuario | no | sí | sí | sí |
| LSL production | no | sí | sí | sí |
| Rhythm resonance | no | parcial | sí | sí |
| RXos bare-metal path | no | no | experimental | sí |
| Driver Akida real | stub | stub | stub/proto | target |

---

## 6. Criterios para volver a mostrar descarga P5 en la web

El botón **“Descargar PRISMA 5 SNN”** solo se habilita si:

1. Existe artefacto versionado `PRISMA-5-…` (no reutilizar solo el tarball del Engine).
2. Release notes separan Engine vs P5.
3. Gate γ cerrado (checklist § Fase 3).
4. Card de producto en web con `available: true` y badge de **Tech Preview** o **Research Release**.
5. Documentación de límites visible en la misma página de descarga.

Hasta entonces: badge **“Roadmap · no disponible”** y enlace a **este documento**.

---

## 7. Dependencias y riesgos de calendario

| Dependencia | Impacto |
|---|---|
| Datasets / paradigmas spike-friendly | Retrasa gate β |
| Chip Akida | Retrasa solo fase hardware, no α/β software |
| Manpower (lab pequeño) | Secuencia α → β → γ es deliberada |
| Sobreclaim externo | Daña credibilidad; docs y UI deben ser honestos |

---

## 8. Resumen ejecutivo

- **Finalidad de PRISMA 5:** BCI/EEG event-driven de ultra baja latencia, portable a edge y NPU, con ética de límites explícitos.
- **Ahora:** solo se descarga **PRISMA Engine 0.1** (laboratorio de kernels).
- **PRISMA 5** avanza por fases α→β→γ→1.0 con gates; la descarga pública de P5 aparece en **γ**, no antes.

---

*Knights Labs / Rogex Laboratories · 2026*
