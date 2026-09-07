# echOS 3.0 limitations

Closing 3.0 does not turn a research system into a certified product. These are its current boundaries.

## Platform

| Capability | Current state |
|---|---|
| SMP | Absent: one core per architecture. |
| AArch64 graphics | Absent: PL011 serial console, no framebuffer. |
| AArch64 userland | Reduced diagnostic shell; it does not reproduce the full x86 console. |
| AArch64 device tree | Used for memory; PL011, GIC and virtio-mmio still use three fixed addresses. |
| ACPI | No reader. Under ARM UEFI the memory map comes from firmware. |
| Wi‑Fi, audio, GPU | No drivers. |
| USB HID | Not the normal input path; x86 uses PS/2. |
| Akida | PCI probe only: detected means **unsupported**, not accelerated. |

## Robotics

- PX4 SITL runs on the host and is not part of the ISO.
- The bundled autonomous producer is deliberately simple: distance, battery and link. It is not echoAI.
- The geofence is an axis-aligned box; it models neither terrain nor polygons.
- Real flight, aviation regulation, functional safety and every hardware fault mode have not been certified.
- The intent ABI has no access to PWM or motors.

## System

- This is neither POSIX nor a general-purpose operating system.
- There is no complete process isolation or production ring 3.
- RXFS is intentionally small and bounded.
- The network stack is not a browser or a multi-user server.
- The Heap‑0 contract covers the robotic path; `kmalloc` still exists elsewhere.
- Published percentiles are bucket bounds, not invented precision. They may move between emulated runs.

A published absence is a verifiable property, not a future promise in disguise.

— R.N.
