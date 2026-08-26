# Neuromorphic in 2.0

The OS *feels* events; it does not `while(1) poll`. That comes from rxOS.
2.0 does not invent it: it leaves it in the open, with no desktop to hide
it.

Long manifesto (lab, not product): `docs/neuromorphic_manifesto.md` in
the tree.

## Three layers — do not mix them

1. **Kernel event fabric** — SPSC, LIF actors, idle = HLT. Always on.
   Keyboard and RX do not depend on a threshold.
2. **Application SNN** — PRISMA 5, `bench-snn`, NAVI Q6 in BSS.
3. **Silicon** — Akida AKD1000 if PCI `1e7c:bca1`. Else LIF on x86_64
   and we print `absent`.

Loihi is a backend name. No driver. `neurocpu loihi` refuses.

## Commands

```text
hwprobe
neurocpu                # software | akida | loihi
bench-snn
prisma5
prisma5 stress          # 64 EEG bursts
navi / navi2 / navi3 / navi6
```

`bench-snn` prints sparsity, latency, mW, Heap-0 delta. Use it if you
are going to say “numbers”.

## Akida

Driver: `drivers/npu/akida.c`. PCI probe, BAR0 1 MiB, magic `AKID`.
Power and latency registers are an **EchOS contract**, not BrainChip's
proprietary runtime. No MetaTF here.

Self-imposed budget on the map: **&lt; 100 mW at inference peak**
(`POWER_MW`). No board, no register.

## NAVI in the kernel

Weights: GRUB modules (`navi2_weights.bin` ~480 KiB, navi3, navi6).
RXFS cannot hold them.

WSP: 16 bytes per thought. CAM. UNKNOWN if there is no card.
`navi3` is the WSP transducer. `navi6` is G_* masks. Not GPT.

Host `./navi10` is another artefact (Python, local wiki, TUI). Larger
mouth. The kernel does not embed all of it. echOS 2.0 *will host* that
mind; today it hosts the pieces that fit.

## PRISMA 5

Synthetic or null EEG → spikes. Stress 64. No deadlock (or it is a bug).
Do not publish this as clinical validation.

## Energy

Idle: `HLT` (C1). ACPI C2/C3 if firmware exposes them; absurd QEMU
latencies are not a paper. RAPL: real Intel; QEMU Virtual CPU often #GP
and the guard catches it. `power` says so.

“Neuromorphic = 0 watts” is false. “No userspace busy-loop because there
is no userspace” is literally the unikernel.

## Honesty for citations

Software LIF: yes. Event fabric: yes. Akida probe: yes. Analogue
crossbar: **no**. If a paper needs a physical memristor, this repo is
not the dataset.

— R.N.
