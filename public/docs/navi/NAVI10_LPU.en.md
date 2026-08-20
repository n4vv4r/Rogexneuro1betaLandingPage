# NAVI 10 — LPU (verbal cortex)

The 1.2 million-gloss dictionary does **not** give metaphor, context or
humour. The LPU does not memorise that table. It tokenises any ES/EN
form (n-grams + lemmas), projects it to 32 integers and **attends the
sentence**.

```
WSP / meta          prefrontal cortex   TALK | ACTION_REQ | UNKNOWN
CAM / SimHash       hippocampus         facts, dH=0
LPU                 Broca/Wernicke      verbal composition
```

The LPU is **not** a trained 50 M GPT. AdamW tensors live in
`navi10_lpu_train.py` and weights are not faked. Today’s fluency comes
from a feature ROM + integer attention + a frame composer (relation,
metaphor, inhibition). The next real jump is a corpus and the
BPE→CE→AdamW loop, not an invented `.bin`.

## What it does and does not

| Question | Route |
| --- | --- |
| relation / metaphor / “time flies” | LPU `[TALK]` |
| exact mass of an asteroid with an ID | LPU inhibit `[UNKNOWN]` |
| `qué es KCC` / `qué es un tomate` | CAM / harvest (fact) |
| ping / sysinfo | `[ACTION_REQ]` (+ LPU report if there is a probe) |

No word is declared unreadable: if it is not in the ROM it is decomposed
and pulled toward the nearest axis. That covers ~1.2 M forms without
loading 1.2 M definitions in RAM.

```bash
./navi10 --ask "¿qué relación ves entre la entropía y la memoria en rxOS?"
./navi10 --ask "explícame la tristeza usando una metáfora de hardware"
./navi10 --ask "¿cuál es la masa exacta del asteroide 2026 RX4?"
make -C NAVI_AI_SNN lpu
```

Spanish original: [NAVI10_LPU.md](NAVI10_LPU.md). Scale plan:
[NAVI10_SLM.md](NAVI10_SLM.md).
