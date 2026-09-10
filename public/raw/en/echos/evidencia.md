# echOS 3.0 evidence

The release is complete **against its published scope**, not because of a label. Closure requires multi-platform boot, a bounded runtime, persistence, PX4 and the absence of false promises.

## Closure result

| Certificate | Checks | Failures |
|---|---:|---:|
| x86_64 BIOS | 130 | 0 |
| x86_64 UEFI | 130 | 0 |
| NVMe + GPT + reboot | 20 | 0 |
| PX4 x86_64 | 25 | 0 |
| AArch64 direct + PX4 | 76 | 0 |
| AArch64 UEFI | 60 | 0 |
| **Total** | **541** | **0** |

A later audit also rebuilt x86 twice from clean trees: `rxos.elf`, `rxos.bin` and the ISO were byte-for-byte identical.

## What was measured

- 61 injected records: 50 accepted, 3 refused and 8 dropped by an intentionally saturated queue.
- Safety gate: 43 unchanged accepts, 4 modifications and 1 block.
- Zero `kmalloc` calls along the sensor-to-intent path.
- High-water marks, drops, expirations, deadlines and watchdog behaviour published.
- Zero CRC errors and zero sequence gaps in the final PX4 trials.
- Persistence: 21 bytes written to NVMe, rebooted, then read back identically.

## Reading latency

Percentiles are bucket bounds (`<31 µs`, `<127 µs`, and so on) under emulation. They are not part of the deterministic set: the host may move a sample across a bucket boundary. Structure, balances, gate decisions and build artifacts are the reproducible evidence.

## Downloadable sources

- [Full JSON report](/data/echos3/report.json)
- [Screenshots and serial logs](./galeria)

The images are not mockups: each comes from an independent boot and retains the full serial log from that session.

— R.N.
