# echOS 3.0, running

These 13 images are direct QEMU framebuffer dumps. They were not composed or retouched. Every screenshot links to the complete serial record from that same boot.

## Boot chooser

![LIVE or installation chooser](/media/echos3/00-chooser.png)

The decision is made before boot. [Serial log](/media/echos3/00-chooser.log)

## LIVE session

![Fresh LIVE session](/media/echos3/01-live.png)

The console after the boot checklist completes. [Serial log](/media/echos3/01-live.log)

## Identity

![about command](/media/echos3/02-about.png)

Version and purpose read from the binary itself. [Serial log](/media/echos3/02-about.log)

## Status

![status command](/media/echos3/03-status.png)

State and location of each subsystem. [Serial log](/media/echos3/03-status.log)

## Memory

![mem command](/media/echos3/04-mem.png)

Heap‑0 regions, the `kmalloc` arena and physical allocator. [Serial log](/media/echos3/04-mem.log)

## Compiled limits

![limits command](/media/echos3/05-limits.png)

Capabilities and ceilings in this build. [Serial log](/media/echos3/05-limits.log)

## Typography

![JetBrains Mono specimen](/media/echos3/06-font.png)

JetBrains Mono 10×22, blocks, Braille and box drawing. [Serial log](/media/echos3/06-font.log)

## Devices

![devices command](/media/echos3/07-devices.png)

Detected hardware, including what the system declares it cannot drive. [Serial log](/media/echos3/07-devices.log)

## Robotic runtime

![robot command](/media/echos3/08-robot.png)

Records, intents and safety-gate verdicts after the scenario. [Serial log](/media/echos3/08-robot.log)

## Local report

![report command](/media/echos3/09-report.png)

The evidence block generated inside the system. [Serial log](/media/echos3/09-report.log)

## Panes

![Shell and monitor in two panes](/media/echos3/10-panes.png)

One shell and one live monitor sharing the screen. [Serial log](/media/echos3/10-panes.log)

## Help

![help command](/media/echos3/11-help.png)

The real command list from the binary. [Serial log](/media/echos3/11-help.log)

## PX4 SITL

![MAVLink connection to PX4](/media/echos3/12-px4.png)

Inbound telemetry, outbound intents and `COMMAND_ACK`. [Serial log](/media/echos3/12-px4.log)

## AArch64 over serial

ARM64 has no framebuffer. Rather than fabricate a screen, the real transcripts are published:

- [Direct boot, status, CPU, network, robot and report](/media/echos3/aarch64-serial-kernel.txt)
- [edk2 UEFI boot and firmware memory map](/media/echos3/aarch64-serial-uefi.txt)

— R.N.
