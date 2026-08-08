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
| **`PRISMA-Engine-0.1.0-Setup.exe`** | **Windows x86_64 NSIS installer** |
| `PRISMA-Engine-0.1.0-windows-x86_64-portable.zip` | Windows portable |
| `prisma-engine-0.1.0-x86_64.exe` | Windows raw binary |
| **`PRISMA-Engine-0.1.0.dmg`** | **macOS arm64 UDZO disk image** |
| `PRISMA-Engine-0.1.0-macos.zip` | macOS .app zip |
| `prisma-engine-0.1.0-macos` | macOS raw binary (arm64) |
| `prisma-engine-0.1.0-x86_64-linux.tar.gz` | Linux x86_64 |
| `prisma-engine-0.1.0-x86_64-linux` | Linux raw binary |
| `PRISMA-Engine-0.1.0-SHA256SUMS.txt` | All checksums |

### Verify
```bash
# Linux
sha256sum -c prisma-engine-0.1.0-x86_64-linux.tar.gz.sha256
tar -xzf prisma-engine-0.1.0-x86_64-linux.tar.gz
cd prisma-engine-0.1.0
./prisma-engine --headless --bench-samples 20000

# Windows — run Setup.exe, or:
prisma-engine-0.1.0-x86_64.exe --headless --bench-samples 20000

# macOS — open the DMG, drag to Applications, then:
# First launch may need: right-click → Open (ad-hoc signature)
```

### Bench reference (release, AVX2 Linux)
- mean hot-path ≈ **2 µs**/sample · max ≈ **80 µs**
- throughput &gt; 150k samples/s
- idle ratio (delta mod) ≈ 55% on quiet epochs

## Windows / macOS notes
- **Windows**: NSIS per-user install under `%LOCALAPPDATA%\PRISMA Engine`. Built with MSVC.
- **macOS**: DMG contains `PRISMA Engine.app` (arm64 Apple Silicon) + Applications symlink. Ad-hoc codesigned; not notarized with Apple Developer ID yet.
- Rebuild CI: https://github.com/navywakura/prisma-engine-releases/actions

## Scientific boundary
Experimental research software. **Not a medical device.** Does not diagnose, treat or predict disease.

Knights Labs / Rogex Laboratories · 2026
