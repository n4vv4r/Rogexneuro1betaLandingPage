# ECHO Models — Navi 10 Reference

**Rogex Laboratories · 2026-08-22 · covers datasets, A/B training, specialized
architectures and inference APIs**

## 1. What ECHO is

ECHO is the assistant personality of EchOS Complete. Underneath is **Navi
10**: a hyperdimensional neuromorphic operator — Q8 sparse distributed
representations (SDRs), CAM factual slots, integer STDP consolidation,
hypercube geodesic linking. No GPU. No backprop. No external ML libraries.
A turn costs single-digit microjoules on the reference laptop.

## 2. Datasets

Managed in `echo/datasets/MANIFEST.md`. Summary:

- `lab/navi10/chat.jsonl` — conversation turns with E[6] emotional tags.
- `lab/navi10/cam.json` + `train_cam.json` — factual CAM slots.
- `lab/navi10/user.json` — user register/tone profile.
- `data/harvest_dialect.jsonl` — code & language harvest corpus.
- Wikipedia harvest (`scripts/fetch_eswiki.sh`) for breadth.

Rules: no synthetic padding; unknown stays **DESCONOCIDO**; A and B ingest
identical streams.

## 3. Echo A / B training contract

Echo A and Echo B are two co-trained instances of one architecture. Both
consolidate independently; their agreement is the verification step
(dual-VERIFY, from NAVI 8.8/8.9). Training is on-the-fly, four methods:

| Method | Command | What consolidates |
|---|---|---|
| Factual injection | `--teach KEY --extract TEXT` | CAM slot write |
| Passive ingestion | `--ingest` | baseline/anomaly stats |
| Geodesic linking | `--link A B` | hypercube edge between concepts |
| E[6] modulation | `--e6 V,A,D,C,U,B` | tone axes: Valence, Arousal, Dominance, Certainty, Urgency, Bond |

The E[6] axes plus the extended lexicon packs (`navi10_lpu_lex.py`,
`lab/navi10/lpu/`) are what give Echo its 2023-GPT-3.5-class *conduct*:
conversational memory (`context.json`), personality persistence
(`user.json`), and structured reasoning traces (`G_reason` five-box).

Driver: `navi10_train.py` · engine: `navi10_engine.py`.

## 4. Specialized models

All three heads share the Navi 10 substrate; they differ in masks, corpora
and output contracts.

### Echo-Lang (`echo-lang`)
Conversation, reasoning, explanation. Mask set led by `G_talk`, `G_logic`,
`G_reason`, `G_poetic`. Target conduct: speak, understand, reason, follow
multi-turn context, hold a human-like personality with extended vocabulary.

### Echo-Code (`echo-code`)
C, Rust, ASM, Python, HTML/CSS/JS generation, debugging and syntax. Backed by
`navi10_code.py` (catalog composition + repository harvest) and the
`G_code` dry-run contract: it never claims to have executed anything —
proposals are integer dry-runs or harvested excerpts with sources.

### Echo-Sys (`echo-sys`)
Natural language → EchOS system actions through a whitelist mapped to
`commands_dispatch()`. One action per turn, always confirmed by the shell.
Low-latency by design (small mask set, no live harvest).

### Navi Mini (Edge)
Reduced SDR width + smaller CAM bank; retrainable on-device via operator
datasets in the same JSONL shape. Lives behind the `files` command and the
Edge CLI.

## 5. Inference APIs

| Layer | Entry point | Contract |
|---|---|---|
| Kernel (in-OS) | key `v` → navi window; `navi` shell command | same engine, zero-copy events |
| Host CLI | `./navi10 --ask "…"` | one turn, prints answer + WSP trace |
| Router | `python3 echo/echo_router.py [--model lang\|code\|sys] "…"` | intent-first routing to the right head |
| REPL | `python3 navi10_chat.py` | rolling session context |
| Edge | `files` / `navi-mini ask` (Edge edition) | local vision/control tasks |

## 6. Verification checklist

```sh
./navi10 --ask "quien eres"        # identity + fichas count, no invention
python3 echo/echo_router.py "escribe hola mundo en C"   # routes → code
python3 echo/echo_router.py --model sys "abre los ajustes"
python3 tests/test_navi10_chat.py  # conversation store round-trip
```

A release ships only if identity stays truthful, routing lands on the right
head, and A/B divergence is zero.
