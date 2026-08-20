# NAVI 8.9 — host assistant (not an LLM)

Local catalog + harvest + VERIFY. Dual voices (propose/critic). TUI with
reasoning log. Optional Q6 / WSP on the path to NAVI 9.

## Run

```bash
# from a clone of https://github.com/navywakura/RXos
python3 ./navi89 --stats
python3 ./navi89 --repl
python3 ./navi89 --tui          # Rust desk: scroll, Ctrl+Y copy, paste
python3 ./navi89 --ask "hola"
python3 ./navi89 --ask "sal del laberinto"
```

Needs Python 3.11+ and network only for Wikipedia/DDG harvest.

```bash
# TUI (after cargo build --release -p navi89-tui in tui/navi89-rs)
./tui/navi89-rs/target/release/navi89-tui
# or
make navi89-desk && ./build/navi89-desk   # C host
```

| Key | Action |
| --- | --- |
| Tab | 8.8 ↔ 8.9 |
| PgUp / PgDn / wheel | scroll chat |
| Alt+↑↓ | scroll reason pane |
| Ctrl+Y or `/copy` | copy last reply |
| paste (Shift+Insert / bracketed) | into input |
| Esc / Ctrl+Q | quit |

## Train / grow catalog

```bash
./navi89 --train              # continue population (does not reset 8.8)
./navi89 --bulk 80            # new Wikipedia cards only
./navi89 --train --from-88    # reset from 8.8 (you usually do not want this)
```

## Docs

- `docs/NAVI89.md` — dual + desk
- `docs/NAVI88.md` — survival
- `docs/NAVI9.md` / `docs/NAVI9_HYBRID.md` — metal + WSP/Q6 skeleton

Not ChatGPT. No extract → DESCONOCIDO.
