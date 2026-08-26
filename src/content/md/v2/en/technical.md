# For engineers

Tree, contracts, and where the C lives. Build steps: [Building](/docs/building).

## Shape

```
boot/boot.asm          Multiboot2 trampoline
kernel/kernel.c        [echOS] status block, akida_init, RXFS
kernel/memory/heap0.*  static regions
kernel/event/          SPSC fabric (SEB)
drivers/               video, net, storage, pci, npu/akida
userland/cli/          TUI, wizard, epk, echofetch, nano, man, netcli
userland/shell/        ROSH / commands.c (single dispatcher)
userland/runtime/www.c HTTP/1.0 + TLS
drivers/net/tls_min.c  TLS 1.3 / 1.2
rogex-core/            Rust no_std (ML-KEM, ChaCha20-Poly1305)
```

Unikernel: **no ring-3**. `syscall` is a stub table. One task. “Userland”
is a folder convention.

C17 freestanding, `x86_64-none-elf`, clang, nasm, ld.lld. No SIMD
(`-mno-sse`). Kernel mcmodel. `kmalloc` (512 KiB) is **not** Heap-0 —
they coexist. The historic NAVI Q6 actor uses kmalloc; the new SNN bench
lives in BSS. Audit: `docs/AUDIT_2.0.md` in the tree.

## Contracts I do not break lightly

1. **One ELF for Universal.** `make EDITION=universal`. On disk the
   edition is `/etc/echos-edition` plus the applied manifest.
2. **Liberation Mono.** 8×16 cell on the FB. Serial is ANSI.
3. **CLI_ONLY.** `ECHOS_HAS_DESKTOP=0`. Console `fb_clear` uses `g_con_bg`,
   not RGX green.
4. **`epk` offline.** ISO catalogue `/media/epk` + in-kernel mirror.
5. **`CMD_NAMES` is the truth.** Tab complete, `help` and the dispatcher
   read the same array.

## Dispatcher

`userland/shell/commands.c` → `commands_dispatch`. Output via `o_str`
into 8192 bytes (`g_term`). `man curl` fits; a 192 KiB HTML does not:
`curl -o` onto RXFS.

| File | Role |
|---|---|
| `userland/cli/man.c` | manual pages |
| `userland/cli/netcli.c` | curl / wdl / wget / ipconf |
| `userland/cli/nano.c` | editor |
| `userland/cli/wizard.c` | installer |
| `userland/cli/epk.c` | packages |
| `userland/cli/tui.c` | 80×25, keys, serial |

## Boot

GRUB `boot/grub/grub-universal.cfg`: `echos.mode=live|memtest|recovery`.

virtio-blk: PCI Command Interrupt Disable (bit 10). Without it, a shared
IRQ with virtio-net hung the boot after `[echOS] nic…`. Polled I/O.

## Network stack

```
netif (virtio-net | e1000 | r8169 | rtl8139)
  → ipstack (ARP, ICMP, UDP, DHCP, traceroute)
    → tcp.c  (one client socket)
      → tls_min.c
        → www.c  HTTP/1.0
          → netcli.c  curl/wdl
```

ClientHello offers `0x1301` then `0xC02F`. Extensions: `supported_versions`,
P-256 `key_share`, `psk_key_exchange_modes`. Dummy CCS after ServerHello.
HKDF-SHA256. GCM 12-byte IV XOR seq. Transcript for `s ap traffic` **stops
at server Finished**; `c ap` includes Client Finished. Mix those hashes
and the handshake says OK while https GET returns empty. I already did
that once.

No CA pin. Leaf RSA is used in 1.2 to check ServerKeyExchange.

## FS

RXFS: 64 inodes, 64 KiB each (this generation). `layout.c` seeds the 2.0
tree. `HOME=/users/<user>`.

## IRQ / cooperative

PIT 100 Hz. One thread. virtio may IRQ; e1000 polls. Event fabric is SPSC:
ISR produces, idle consumes. LIF thresholds **never** gate correctness
paths (key, RX).

## Things you will hate (fairly)

- One TCP at a time.
- HTTP/1.0, `Connection: close`.
- `g_term[8192]` — that is why `man` exists.
- Large POST: 1400-byte request buffer, then chunks. Short forms are fine.
- Not glibc Unicode. Latin-1 + logo Braille + UTF-8 that does not crash.

— R.N.
