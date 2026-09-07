# Technical architecture

## Platform separation

Generic code lives in `kernel/`, `fs/`, `userland/` and `ui/`. Concrete implementations live under `arch/x86_64`, `arch/aarch64` and the platform drivers. `make portability` prevents generic trees from accidentally depending on one architecture.

On x86, GRUB provides a Multiboot2 handoff under both BIOS and OVMF. On AArch64, the same image can boot directly or as a UEFI application; the stub preserves the firmware-provided memory map.

## Deterministic runtime

The robotic pipeline uses four bounded queues:

1. sensors into the runtime;
2. produced intents;
3. intents awaiting the safety gate;
4. approved intents towards the autopilot.

Records contain neither pointers nor floats. Time is monotonic, units are fixed, and every intent retains the sequence and time of its causal event. Stack guards, drops, expirations and high-water marks are published in every report.

## Safety gate

The gate validates ABI, range, freshness, deadline, battery, link and geofence. It may accept, limit or block; a corrected decision is not credited as an accepted producer decision. The watchdog produces a safe intent when its deadline expires.

## MAVLink and PX4

The MAVLink 2 parser is incremental, validates CRC and incompatibility flags, follows sequence per sender and only decodes declared messages. It converts telemetry into the Sensor ABI and approved intents into high-level setpoints. PX4 remains the flight controller.

## Storage

The storage stack shares a block interface. NVMe provides identification, command queues, timeouts and error propagation. GPT and RXFS above it make persistence verifiable across a real VM reboot.

## Relationship with echoAI

echOS is the body; echoAI is a separate research line and remains outside it. Their future seam is a sensor-and-intent ABI, not a chatbot inside the kernel.

— R.N.
