# For researchers

What is here that is not a toy OS with a pretty prompt. And what is **not**,
which matters as much.

## Position

echOS 2.0 is a von Neumann unikernel (x86_64, clock, HLT). On top of it runs
a **software model** of event-driven compute and an integer LIF / STDP SNN.
Neuromorphic silicon (Akida AKD1000, Loihi) is an *R&D target* when the
device is on the bus; otherwise the backend is CPU LIF and we say so.

Lab rule, copied from my own manifesto and not relaxed:

- **VALIDATED (software):** measurable in QEMU or on metal.
- **R&D TARGET (hardware):** memristors, crossbar, in-memory. Not shipped.
- **x86 is still x86.** “Zero power” is never thermodynamic. It means
  *no busy-loop in idle*.

Longer papers (1.x, still the mental model): `docs/neuromorphic_manifesto.md`
in the tree.

## Heap-0 as an object of study

Static layout, O(1), zero fragmentation by construction. Named regions.
64 KiB WSP pool. 64 device-manager slots.

**Not** a general allocator. `kmalloc` (512 KiB) remains for unmigrated
code. The historic NAVI Q6 actor takes a layer from there. The SNN bench
(`navi_q6_t`) is BSS. If you publish “zero malloc” numbers, name the path:
`bench-snn` and `prisma5` yes; the old chat actor no.

`epk stress` measures `heap_used` before/after install/remove. The delta
must return.

## Event fabric

SPSC ring, typed events (`kernel/event/`). Q16.16 LIF actors. virtio-net
ISR may produce `RX_EVENT_NET_RX_READY`. Idle posts a 1-tick PIT deadline
for e1000 (no IRQ). Spike threshold does **not** mute keyboard or RX.

## PRISMA 5

EEG → spikes. `prisma5`, `prisma5 stress`, `bench-snn`. Metrics: sparsity,
latency µs, mW (estimate), Heap-0 delta. 64 bursts in stress. `g_net` /
`g_eeg` live in BSS, not on a 16 KiB `rx_actor_t` stack (that already
#GP'd once). Not a clinical EEG.

## Akida AKD1000

PCI `0x1E7C:0xBCA1`. BAR0 1 MiB, preferred `0xFED00000` if firmware left
it unprogrammed. MMIO map is **ours** (`AKID` magic), not a dump of MetaTF:

| Off | Register |
|---|---|
| 0x00 | MAGIC |
| 0x10 | POWER_MW (budget &lt; 100 mW at inference peak) |
| 0x14 | TEMP_C |
| 0x20 | LAT_NS |

No board: `akida_present() == false`. `neurocpu akida` fails. Software LIF.
No BrainChip blob in this tree. I will not add one.

## RogexWSP

One thought = 16 bytes. CAM of facts. No extract: UNKNOWN. That is not an
LLM fallback. It is policy.

On the host: `./navi10`. In-kernel: `navi2` / `navi3` (WSP transducer) /
`navi6` (G_* masks). Weights via GRUB module — a 480 KiB blob does not fit
a 64 KiB RXFS slot.

## Cryptography

`rogex-core` Rust `no_std`: ML-KEM-768 (FIPS 203) boot self-test,
ChaCha20-Poly1305 (RFC 8439 KAT on boot), SHA-3.

Web TLS client: C, AES-128-GCM, P-256, SHA-256, HKDF for 1.3. **No third-party
audit.** No CA pin. ROGEX-PQC on Server is that core, not a magic PQC sshd.

## Reproduce numbers

```text
hwprobe          PCI, disks, Akida, NIC
bench-snn        sparsity / us / mW / Heap-0
prisma5 stress   64 bursts
epk stress [N]   install/remove
tls example.com  negotiated version
```

QEMU: `q35`, KVM, virtio-net, 512 MiB. ISO
`EchOS-2.0.0-universal-vm.iso`. LIVE: `q` at the language step.

## Do not cite as a result

- “echOS runs on Akida” — it runs *with* Akida if PCI appears.
- “TLS 1.3 at browser grade” — handshake yes; https bodies can still fail. Clear HTTP yes.
- “doas is security” — one ring.
- “RXFS is a production filesystem” — 64 slots.
- NVMe: PCI class recognised, **no driver**. AHCI/IDE/virtio-blk yes.

Cite the command and the log date. Not the slogan.

— R.N.
