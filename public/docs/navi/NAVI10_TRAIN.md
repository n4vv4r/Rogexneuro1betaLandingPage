# NAVI 10 Echo — cómo se entrena

**No hay backprop.** No se ajustan billones de pesos en GPU.
Entrenar es **consolidar atractores** en la malla $Q_8\times Q_8$ con
STDP entero y una ranura del CAM Heap-0 (4096 × 32 B).

Akida AKD1000/AKD1500 sigue PLAN (0 placas). Hoy el STDP es LIF
software. `destroyed=0`: el CAM no se poda.

```bash
./navi10 --train                 # los 4 métodos, falseable
./navi10 --bare --cam --ask "rxOS-metal"
./navi10 --bare --teach "rxOS-metal" --extract "Unikernel Ring 0 en C, Assembly y Rust."
./navi10 --bare --cam --ask "rxOS-metal"
```

`--ask` solo es la boca (charla + cosecha). El entrenamiento se
comprueba con `--cam` (solo CAM) o `--train`. `--bare` arranca sin
semilla para ver el DESCONOCIDO de verdad.

## Mecánica

1. **Stream-to-Spoke** — bytes → SimHash-16 + latencia.
2. **Gating E[6]** — $C < 20$ abre STDP y reserva ranura; $U \ge 60$
   fuerza la geodésica Hamming.
3. **`--extract`** — sin extracto el patrón existe pero no es un hecho
   (`DESCONOCIDO` / `BASELINE`). Con extracto: `VERIFY`, $C=100$, ham=0.

## Cuatro métodos

### 1. Inyección factual (cero alucinación)

```bash
./navi10 --teach "akida" --extract "NPU event-based de BrainChip."
./navi10 --cam --ask "akida"
```

Ranura $O(1)$, $C=100$. Si no hay extracto: no inventa.

### 2. Ingesta pasiva (línea base / anomalía)

```bash
printf 'eeg-alpha-ok\nnet-ack-ok\n' > /tmp/base.txt
./navi10 --bare --ingest /tmp/base.txt
./navi10 --bare --cam --ask "eeg-alpha-ok"      # BASELINE
./navi10 --bare --cam --ask "eeg-spike-FAULT"   # ANOMALY / DESCONOCIDO
```

La repetición fija la línea. Una señal nueva supera el límite de
Hamming en tiempo constante (popcount, ~150 ns/xor en este host; no
se copia un 164 ns de marketing).

### 3. Geodésica WSP (decisiones)

```bash
./navi10 --link "estado-A" "estado-B"
./navi10 --e6 0,10,0,50,80,0 --path estado-A estado-B
```

No genera texto. `hops = popcount(A ⊕ B)` sobre $Q_8\times Q_8$.

### 4. Modulación E[6]

```bash
./navi10 --e6 0,10,0,5,10,0 --cam --ask "patron-nuevo"   # C=5 → STDP
./navi10 --e6 0,40,0,70,90,0 --link A B                  # U=90 → geodésica corta
```

$E = (V,A,D,C,U,B)$. No es un sentimiento fingido: es el gate.

## Comprobación (lección)

`--train` ejecuta DESCONOCIDO → teach → VERIFY y exige `destroyed=0`.

`rxOS` ya está en la semilla de identidad; por eso el ejemplo de
consola usa `--bare` o una clave nueva (`rxOS-metal`). Si preguntas
`rxOS` con semilla, ya es VERIFY.

Tests: `python3 tests/test_navi10.py TestTrain`.
