# User guide

This guide explains what a person sees when booting echOS 3.0. It is not a flight manual and does not replace a safety review.

## 1. Choose how to boot

On x86, a chooser appears before the kernel: run a **LIVE** session or enter the installation flow. To inspect the system without writing to disk, use LIVE.

## 2. Check the machine

At the console, run:

```text
about
status
devices
limits
```

`status` shows which subsystems are active. `devices` distinguishes detected hardware from supported hardware. `limits` publishes the fixed ceilings of that build.

## 3. Read local evidence

```text
mem
robot run
robot
report
```

`robot run` injects an explicitly **synthetic** scenario. Afterwards, `robot` shows what the safety gate accepted, modified or blocked. `report` generates the block consumed by the technical report.

## 4. Use the console

`help` and `man` are the source of truth. You can work with RXFS, inspect networking and split the console:

```text
pane split
pane monitor
pane next
```

There is one shell and several views; the monitor continues to refresh while another pane is in use.

## 5. Connect PX4 in the laboratory

With PX4 SITL already running on the host:

```text
px4 start 10.0.2.2 14580
px4
```

The screen should show received telemetry, transmitted intents and `COMMAND_ACK`. Link loss is tested by interrupting that connection and observing degradation to `HOLD`; echOS does not command a motor.

## 6. AArch64

ARM interaction is through PL011 serial. No framebuffer is expected: the real transcripts are published in the [gallery](./galeria).

— R.N.
