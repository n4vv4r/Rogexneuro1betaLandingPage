# For the curious

You read manifests at three in the morning. Good.

## The thesis

An operating system does not have to be a zoo of processes. It can be
**one program** that sleeps until something happens (key, packet, spike).
When nothing is happening: `HLT`. That was already rxOS. In 2.0 I left it
bare: no windows to hide the model.

Heap-0 is the other half. No malloc on the hot path. Named static regions.
If NAVI still calls `kmalloc` (the old actor does), that is documented as
a **contract failure**, not hidden. See [Limits](/docs/limits).

## Why a console

Because a WM is a different product. 1.0 already is one. Mixing both in
the same ISO gave me a chimera: LIVE dragged the dock, “headless” Edge
still had Aero leftovers, and cyberpunk green ate the framebuffer.

2.0 is cruel on purpose. Either there is text or there is no product.

## The logo

The echofetch droplet is free-to-use Unicode Braille. The boot banner
is FIGlet. Empty cells instead of a logo means a serial that does not
paint UTF-8.

## OpenBSD, without being OpenBSD

`doas` does not isolate rings. Unikernel: one address space.
`/etc/doas.conf` is **written policy**, not an LSM. `pfctl` stores flags.
`rcctl enable httpd` records a daemon that, on Server, is still intent
more than a process. I prefer an honest flag to a toy sshd pretending
to be OpenSSH.

The names exist so a BSD admin sits down and does not hunt for `sudo`.

## Neuromorphic without theatre

The SNN is software LIF on x86_64. Akida AKD1000 is **probed** on PCI
(`1e7c:bca1`). No board: `hwprobe` says *absent (software LIF)* and
`neurocpu akida` refuses. I have never painted a ghost NPU for a demo.

PRISMA 5 is EEG → spikes. `bench-snn` prints sparsity, microseconds,
estimated mW and the Heap-0 delta. Lab numbers, not a BrainChip datasheet.

## Network as a tool

`curl` and `wdl` exist because I need them on LIVE: fetch HTML, POST,
read headers, without opening Nova. TLS 1.3 is offered (AES-128-GCM,
P-256, SHA-256). The handshake against example.com completes. An https
GET body can still come back empty: application keys are not the
handshake. I write that down so a thread of “curl https is broken”
does not surprise me.

HTTP/1.0, one socket, SNI, no CA pin. A laboratory, not Firefox.

## Sovereign FHS

I dislike `/usr/local`. In 2.0 the tree fits on a napkin. `/users` is
not `/home` renamed for fashion: it is refusing POSIX where there is
no real multi-user. `live` is a user. `root` is the same space.
`doas` is useful theatre.

## If you come from NAVI 10

`./navi10 --tui` on the host is still the large SNN mind (16-byte WSP,
CAM, UNKNOWN as a virtue). Inside 2.0 you have `navi2` / `navi3` /
`navi6` as unikernel commands. Not the same binary. Weights arrive as
GRUB modules (`navi2_weights.bin`, …).

The virtue holds: no extract, we say we do not know.

— R.N.
