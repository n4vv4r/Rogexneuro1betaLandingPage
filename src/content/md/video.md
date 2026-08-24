# Video Pipeline — EchOS Multimedia

**Status: BETA.** Images play today (JPEG/PNG/QOI native decoders). Video is
the active workstream for 1.0.0. This document is the honest map of what
exists and what is being built.

## Sample asset

`assets/video/waterfall-sample.mp4` — H.264 1280×640, 12 s, AAC stereo,
1.5 MB (small enough to embed in the kernel image for testing).
`waterfall-poster.jpg` — first frame, shown in Multimedia today.

## Pipeline (target)

```
MP4 container parser  →  H.264 baseline SW decoder  →  YUV420p → RGB32
        │                                                        │
        └── AAC decoder  →  audio out (future)          framebuffer blit
```

| Stage | Status |
|---|---|
| Container parser (MP4/MKV box walker, avcC extraction) | **in progress** |
| H.264 baseline decoder (CAVLC, I/P slices) | **in progress** |
| YUV420p→RGB32 blit (integer, SSE-free) | designed |
| Audio out (AAC decode + PIT/HPET sample clock) | designed |
| Player UI in Multimedia (play/pause/seek bar) | designed |

## Principles

1. From scratch, no external codecs — same rule as the rest of the stack.
2. Baseline profile only for 1.0.0 (no CABAC, no B-frames).
3. Integer math everywhere; the neuromorphic event budget (16 B per
   thought) is not shared with video.
4. The player never claims formats it cannot play: unsupported codecs say
   so in the UI, like Nova does with HTTPS.

## Test target

`waterfall-sample.mp4` playing in the Multimedia window at ≥15 fps in QEMU
capture = the 1.0.0 video milestone.
