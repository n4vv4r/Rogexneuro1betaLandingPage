# rxOS 7 MONAD

**Eslogan:** An AI that consumes less than your calculator app.

NAVI no es un LLM. Es una SNN de 64 neuronas LIF sobre Q₆, aritmética
entera, en el kernel.

## Dónde está el código

- Motor: `kernel/navi/`
- Shell: `userland/shell/navi_cmd.c` (`navi`, `monad`)
- Banco host (sigue siendo válido): `NAVI_AI_SNN/`

## Dónde están los markdowns

- Este archivo
- `kernel/navi/README.md`
- `NAVI_AI_SNN/README.md`
- `NAVI_AI_SNN/RFC-2026-08-Q6.md`
- `NAVI_AI_SNN/MEASURE.md`
- `ROADMAP.md` § rxOS 7.0.0 MONAD
- `CHANGELOG.md` § 7.0.0

## Cómo comprobarlo

```bash
make test                 # incluye "NAVI Q6 self-test ... PASS"
# en el OS (L1):
navi
navi calc 1+2*3
navi fire 1
navi joules
# en el host (L2, no es un LLM):
cd NAVI_AI_SNN && make l2
```

L3 (pesos sueltos): `python3 NAVI_AI_SNN/l3/train.py` → `make iso-refresh`.
El kernel no se recompila. Chat: tecla `v`. Internet = RAG a L2, no backprop.
Aviso: [`USER_NOTICE.md`](USER_NOTICE.md). Bench: `navi2 bench`.

L2: [`NAVI_AI_SNN/l2/README.md`](../NAVI_AI_SNN/l2/README.md).  
Demo dual (spec): [`MONAD-DEMO.md`](MONAD-DEMO.md).  
**Pack con capturas (r. navarro):** [`monad/README.md`](monad/README.md) — curiosos y demostración.
