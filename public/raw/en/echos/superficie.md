# echOS 3.0 surface

## Verified platforms

| Platform | Boot | Console | Robotic demo | Network/PX4 |
|---|---|---|---|---|
| x86_64 | BIOS + GRUB Multiboot2 | framebuffer and VGA | yes | yes |
| x86_64 | UEFI + OVMF | framebuffer | yes | base certification |
| AArch64 `virt` | direct image and edk2 UEFI | PL011 serial | yes | yes |

## Hot path

```text
Sensor ABI (64 B)
        ↓
sensor queue, cap. 32
        ↓
producer runtime
        ↓
Intent ABI (72 B)
        ↓
safety gate: OK / MODIFY / BLOCK
        ↓
MAVLink 2 → PX4
```

All four queues are static and report capacity, input, output, drops, expirations and high-water mark. The watchdog emits a safe behaviour when a valid intent stops arriving.

## Storage

The NVMe driver identifies the controller and namespace, executes commands with timeouts and propagates errors. The installer writes a valid GPT; certification mounts a 128 MiB namespace, writes a sentinel, reboots and checks that exactly the same content persists.

## x86 console

The human-facing surface retains its graphical console, JetBrains Mono, panes, history, RXFS, diagnostics, networking and embedded help. `pane split` divides the view; there is still one shell, while another pane can act as a live monitor.

Names that perform no real work must not be presented as services. The [Commands](./comandos) page separates daily use from verification.

— R.N.
