# rxOS 10 — coming soon (Eclipse)

**Status: COMING SOON.** There is no public ISO 10.
The ISO you can download today is still **rxOS 9.0.0 SMOKE**
([release v9.0.0](https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0)).
This paper is the contract for 10, not a binary you can flash.

Pair: [NAVI 10 Echo](NAVI10.en.md) (host LIVE) + rxOS 10 (this document).
Roadmap: [ETERNAL_ECLIPSE.md](ETERNAL_ECLIPSE.md). Blueprint:
[CIANOTIPO.md](CIANOTIPO.md).

> The crossing **NAVI 10 + rxOS 10** is the Eclipse. Until ISO 10
> exists, saying “it already runs on the black desktop” is a lie.
> NAVI 10 *does* run on the **host**. The OS 10 does not, yet.

## The sentence

rxOS 9 is the desktop. NAVI 10 is the mind. rxOS 10 is when both
travel in the same artifact: unikernel + Echo + CAM + TUI, no cloud,
no campus LLM.

## What you can touch today

| Piece | Where | Status |
| --- | --- | --- |
| rxOS **9.0.0** SMOKE | VM + metal ISO | **SHIPPING** |
| NAVI **7-WORLD** | `v` key on ISO 9 | **SHIPPING** |
| NAVI **10 Echo** | `./navi10 --ask` / `--tui` on the host | **HOST LIVE** |
| rxOS **10** ISO | — | **COMING SOON** · no artifact |
| Akida AKD1000/1500 | `neurocpu akida` | **PLAN** · 0 boards |
| EchOS (unified ISO + API) | — | **VISION** |

## Contract of 10 (when the ISO exists)

9 → 10 is not a skin. It is the OS that will **host** mind 10.

| Invariant | How it is held |
| --- | --- |
| x86_64 unikernel | Freestanding C + NASM + Rust `no_std`. Not trimmed Linux. |
| WSP 16 B | `_Static_assert` in `wsp.h`. Thought size does not grow with Wikipedia. |
| Heap-0 on the SNN step | Static CAM 4096 × 32 B. The tick does not malloc. |
| 0 FPU in the motor | LIF leak 7/8, Hamming = popcount. The desktop SLM is a **different** process. |
| VERIFY / UNKNOWN | No extract, no fact. The parrot does not enter the kernel. |
| KCC | `destroyed=0`. The CAM only grows or is reinforced. |
| Honest Akida | No `HwVersion` probe, no silicon. |

## What 10 is designed to take in

1. **Echo in-OS** — you stop “opening Navi 7”. You talk to Echo.
   Face: TUI/GUI. Brain: WSP + CAM + SNN. LPU-S (mouth) is optional
   on the Desk SKU.
2. **Q_N = Q₈ × Q₈** — 65536 addresses, 256 LIF on one spoke, product
   Hamming via `popcount`. Replaces the 73-card ceiling of 7-WORLD.
3. **Local harvest** — Wikipedia + personal PDFs → CAM. Offline:
   `--no-live`. The wiki dump is **not** the model.
4. **Dark Aero 10** — the 9 desktop (Smoke, Photos, Settings, wget)
   stays; chat leaves the 7 catalog and becomes Echo.
5. **SKU** — Desk (LPU-S + wiki index) · Edge/Pi (SNN + CAM, no SLM)
   · Host (what already runs: `./navi10`).

No PyTorch, The Stack, Piper, or a GPU campus in the product.
See [NAVI10_SHIP.md](NAVI10_SHIP.md).

## What rxOS 10 is **not**

- Not Ubuntu with a chat widget.
- Not ChatGPT inside a unikernel.
- Not Akida until a board exists and the driver stops refusing.
- Not EchOS. EchOS is the unified ISO *after* the Eclipse.
- No invented date. “Soon” is the announcement; the SHA-256 is the fact.

## History (not erased)

```
4.x foundation → 6 desktop → 7 MONAD → 8.0 / 4.5 → 8.5 / 6.5 (RAPL)
    → 9 SMOKE / 7-WORLD (today’s ISO) → 10 / 10 (Eclipse, next)
```

8.5 measured joules on the HP 15-ac195nl (17 Aug 2026): idle 3678 mW,
Q6 72.5 µJ/run. Those figures belong to **8.5**, not 10. 10 does not
invent Akida RAPL.

## How it will be checked (when there is an ISO)

```
make iso-vm          # artifact rxOS-10.x.x-vm.iso
make iso-metal
sha256sum            # in SHA256SUMS-10
./navi10 --bench     # already on the host
key v                # Echo, not the 7 catalog
neurocpu akida       # refuses until probe
```

Until those lines exist in a release, this paper is the contract,
not the product.

## Reading

| Doc | Why |
| --- | --- |
| [NAVI10.en.md](NAVI10.en.md) | Mind 10: Q_N, CAM, VERIFY, TUI |
| [NAVI10_SHIP.md](NAVI10_SHIP.md) | USB / SKU / what is not packed |
| [NAVI10_LPU.md](NAVI10_LPU.md) | Verbal cortex (mouth, not facts) |
| [RXOS9.md](RXOS9.md) | The ISO you can download today |
| [ETERNAL_ECLIPSE.md](ETERNAL_ECLIPSE.md) | Pairings through EchOS |
| [AKIDA.md](AKIDA.md) | Why the NPU stays PLAN |

Experimental. GPLv3 in the rxOS tree. Not clinical.
Knights Labs / Rogex Laboratories · August 2026.
