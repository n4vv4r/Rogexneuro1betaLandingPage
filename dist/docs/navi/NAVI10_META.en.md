# NAVI 10 — metacognition (Heap-0)

This is not a chain of thought in prose. It is a loop of **≤4 passes**
over $Q_8\times Q_8$: certainty by Hamming, INHIBIT of decoys,
ACTION gates (WSP 16 B), person mask.

```bash
./navi10 --meta
./navi10 --ask "…Haldane-Koff…"
./navi10 --teach "Haldane-Koff" --extract "INHIBIT: CONCEPTO_INEXISTENTE" --flags 0x04
./navi10 --teach "REQ_USER_LOCATION" --extract "curl ifconfig.me" --flags 0x02
```

## The 4 tests

1. **Epistemic** — declare C% and the missing datum. Proxima b → C=0, UNKNOWN.
2. **Decoy** — Haldane-Koff INHIBIT. No invented definition.
3. **Audit / trap** — `path_stack` + discarded 1.00/0.10 shortcut; 1.05/0.05.
4. **Tool / person** — `ACTION_REQ` + `WSP_SYS_EXEC` (does not run curl blind).

rxOS does not launch `curl ifconfig.me` from the Python host. The
packet is emitted; re-ingest is `--teach` or a future driver. Akida
remains PLAN.

Spanish original: [NAVI10_META.md](NAVI10_META.md).
