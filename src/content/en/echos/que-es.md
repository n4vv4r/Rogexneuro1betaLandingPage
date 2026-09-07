# echOS 3.0

echOS 3.0 is a **robotic edge unikernel**. It boots directly on the machine, with no Linux, `systemd`, BusyBox or hidden distribution underneath. Its role is to receive observations, produce bounded intents and hand them to a flight controller without taking direct control of the motors.

> A small, measurable and portable body for robotic systems. It is not a chatbot and contains no LLM or SLM.

## What changed in 3.0

- One codebase boots on **x86_64 BIOS**, **x86_64 UEFI** and **AArch64 UEFI**.
- The `sensor → intent → safety gate → autopilot` path uses fixed-size records and queues.
- That path performs **zero dynamic memory allocations**, measured by the kernel itself.
- A MAVLink 2 bridge exchanges telemetry, intents and acknowledgements with PX4 SITL.
- NVMe, GPT and persistence are tested against an actual emulated device and across a reboot.
- Artifacts are separated by architecture and edition, and clean builds are reproducible.
- NAVI and the conversational assistant experiment are no longer part of the product.

## The robotic contract

Sensors enter as 64-byte integer records. Decisions leave as 72-byte intents with causal origin, capture time, deadline, confidence and limits. The ABI can only express high-level actions such as `HOLD`, `APPROACH`, `AVOID`, `RETURN_HOME`, `LAND` or `ABORT`.

There is no field for PWM, servos or throttle. **PX4 retains authority over stabilisation and actuators.**

## Status

Version 3.0 is closed against its definition of done: 19 requirements met and six green certificates. This does not mean “flight-ready certified product”. It means the published scope is implemented, measured and accompanied by explicit limitations.

See the [user guide](./guia), [architecture](./arquitectura), [evidence](./evidencia) and [real gallery](./galeria).

— R.N.
