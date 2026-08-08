# PRISMA Engine 0.1.0

**Native ultra-low-latency EEG/BCI neuromorphic runtime** (Rust · x86_64).

Replaces heavy Python/Streamlit stacks on the critical path:

| Module | Role |
|---|---|
| SPSC ring | Lock-free zero-copy sample buffer |
| Delta modulation | Adaptive θ_adp · idle when \|ΔV\| &lt; θ |
| LIF SNN | AVX2/FMA vector update · scalar fallback |
| STDP + local inhibition | Artifact soft-gate |
| Predictive coding | Spike-rate prediction error |
| HAL | `simd` backend (active) · `akida` stub (AKD1000 hook) |
| GUI | egui/eframe multichannel waveform · spike raster · spectrum |

## Download (this release)

| Artifact | Platform |
|---|---|
| `prisma-engine-0.1.0-x86_64-linux.tar.gz` | Linux x86_64 (recommended) |
| `prisma-engine-0.1.0-x86_64-linux` | Same binary, unpacked |
| `*.sha256` | Integrity checksums |
| packaging/ inside tar | Inno Setup / NSIS / DMG scripts for Win·macOS builds |

### Verify
```bash
sha256sum -c prisma-engine-0.1.0-x86_64-linux.tar.gz.sha256
tar -xzf prisma-engine-0.1.0-x86_64-linux.tar.gz
cd prisma-engine-0.1.0
./prisma-engine --headless --bench-samples 20000
```

### Bench reference (release, AVX2)
- mean hot-path ≈ **2 µs**/sample · max ≈ **80 µs**
- throughput &gt; 150k samples/s
- idle ratio (delta mod) ≈ 55% on quiet epochs

## Windows / macOS
Cross-build sources are inside the tarball under `packaging/`.
- Windows: `iscc prisma.iss` or `makensis prisma.nsi` after producing `.exe`
- macOS: `bash create_dmg.sh --bin ./prisma-engine --version 0.1.0`

## Scientific boundary
Experimental research software. **Not a medical device.** Does not diagnose, treat or predict disease.

Knights Labs / Rogex Laboratories · 2026
