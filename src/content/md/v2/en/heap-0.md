# Heap-0

A marketing name for a simple idea: **critical memory is reserved at
compile time**. BSS. A table. O(1). No fragmentation.

Files: `kernel/memory/heap0.c`, `heap0.h`.

## Why

A unikernel that mallocs on the NIC IRQ or the spike path is a joke.
Heap-0 is the contract: I/O, WSP, device manager have a fixed seat.

`heap0_init()` registers regions. `heap0_get_region(i)` returns name,
base, size, purpose. `echofetch` / `mem` show them.

## Numbers (this generation)

| Region | Size | For |
|---|---|---|
| WSP pool | 64 KiB | RogexWSP messages |
| device manager | 64 slots | `devices` |
| (historic) icon cache | 16 | 1.0; the layout remains |

The framebuffer backbuffer is **not** pure Heap-0: LFB map + copy. It
still counts in RAM (~3.6 MiB at 1280×720×32). Edge at 16 MiB: GRUB text.

## What is not Heap-0

- `kernel/memory/heap.c` — `kmalloc` / `kfree`, 512 KiB arena. Still
  there. Old NAVI actor drinks from it.
- PMM — Multiboot2 physical frames.
- VMM — 4K pages for MMIO / LFB.
- RXFS — slots, not a heap.
- `echlibc` mmap — 64 KiB BSS for user ELFs, another contract.

If you measure “zero malloc” for a paper, bound the path: `bench-snn` and
`prisma5` in BSS. Not the whole kernel.

## Determinism

O(1) means: no first-fit, no coalescing, no “third `epk install` fails
because the heap is striped”. `epk stress` must return the same
`heap_used`. Otherwise it is a bug.

Zero fragmentation *by construction*, not by compacting.

## Relation to the SNN

Large buffers (`g_net`, `g_eeg`, weights that fit) go to BSS or a GRUB
module. An `rx_actor_t` of 16 KiB on the stack already gave us a #GP.
A network does not go on the stack again.

```text
mem
echofetch
hwprobe
```

If you add a region, the table. A lone `static uint8_t buf[1<<20]` is
lying to the contract even if the binary boots.

— R.N.
