# Neuromórfico en 2.0

El OS *siente* eventos, no un `while(1) poll`. Eso viene de rxOS.
2.0 no lo inventa: lo deja a la vista, sin desktop que lo disimule.

Manifiesto largo (laboratorio, no producto): `docs/neuromorphic_manifesto.md`.

## Tres capas, no mezclarlas

1. **Tejido de eventos del kernel** — SPSC, actores LIF, idle = HLT.
   Siempre on. Teclado y RX no dependen de umbral.
2. **SNN de aplicación** — PRISMA 5, `bench-snn`, NAVI Q6 en BSS.
3. **Silicio** — Akida AKD1000 si PCI `1e7c:bca1`. Si no, LIF en
   x86_64 y se imprime `absent`.

Loihi es nombre de backend. No hay driver. `neurocpu loihi` se niega.

## Comandos

```text
hwprobe                 # PCI + Akida + discos + NIC
neurocpu                # software | akida | loihi
neurocpu software
bench-snn
prisma5
prisma5 alpha
prisma5 null
prisma5 stress          # 64 ráfagas EEG
navi / navi2 / navi3 / navi6
```

`bench-snn` suelta sparsity, latencia, mW, delta Heap-0. Úsalo si
vas a decir “números”.

## Akida

Driver: `drivers/npu/akida.c`. Probe PCI, BAR0 1 MiB, magic `AKID`.
Registros de potencia y latencia son **contrato EchOS**, no el
runtime propietario de BrainChip. No hay MetaTF aquí. No lo voy a
vincular.

Presupuesto que me autoimpuse en el mapa: **< 100 mW en pico de
inferencia** (`POWER_MW`). Sin placa el registro no existe.

## NAVI dentro del kernel

Pesos: módulos GRUB (`navi2_weights.bin` ~480 KiB, navi3, navi6).
RXFS no los aguanta. `make iso` los mete en `/boot`.

WSP: 16 bytes el pensamiento. CAM. DESCONOCIDO si no hay ficha.
`navi3` es transductor WSP. `navi6` máscaras G_*. No es GPT. No
completa “como un LLM” y si lo parece, es que el extracto estaba.

Host `./navi10` es otro artefacto (Python, wiki local, TUI). Más
grande, más boca. El kernel no lo embebe entero. EchOS 2.0 *alojará*
esa mente; hoy aloja las piezas que caben.

## PRISMA 5

EEG sintético o nulo → spikes. Stress 64. Sin deadlock (o es bug).
No publiques esto como validación clínica.

## Energía

Idle: `HLT` (C1). ACPI si el firmware (BOCHS/QEMU) expone C2/C3;
latencias absurdas en QEMU no las uses como paper. RAPL: Intel
real; en QEMU Virtual CPU suele #GP y el guard lo atrapa.
`power` lo dice.

La historia “neuromórfico = 0 vatios” es falsa. La historia
“no hay busy loop de userspace porque no hay userspace” es
literalmente el unikernel.

## Honestidad para citas

El software LIF está. El evento-tejido está. El probe Akida está.
El crossbar analógico **no**. Si un paper necesita memristor
físico, este repo no es el dataset.

— R.N.
