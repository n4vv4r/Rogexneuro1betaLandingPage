# NAVI 8.9 — dos conciencias + escritorio

8.9 **nace de 8.8** y añade la ley que el usuario pidió: la inteligencia
son *dos voces que se hablan* para quedarse con la que VERIFY acepta.

```
PROPOSE  →  CRITIC  →  acuerdo o dual→ganador
```

No es o3. Es el germen del multiagente de [`NAVI9.md`](NAVI9.md).

La cara es un chat de escritorio (C ANSI + Rust ratatui). El usuario
cambia 8.8 ↔ 8.9 y ve organismo, fitness y generación.

```
./navi89 --train
./navi89 --stats                 # tabla color
./navi89 --reason --ask "hola"   # log VERIFY
./navi89 --tui                   # Rust: chat + razón + métricas
./navi89 --ask "sal del laberinto"
make navi89-desk && ./build/navi89-desk
# o
cd tui/navi89-rs && cargo build --release
./tui/navi89-rs/target/release/navi89-tui
./navi89 --desk
```

En el desk: `/8.8` `/8.9` (C) o **Tab** (Rust).

| 8.8 | 8.9 |
| --- | --- |
| una voz, el campeón | propose + critic |
| `lab/navi88/pop.json` | `lab/navi89/pop.json` (hereda 8.8) |
| barato | dos rutas, elige VERIFY |

Cada generación extra de `--survive` debería subir el fitness del
campeón social/puzzle. Si baja la verdad (Wikipedia en un hola), no
cuenta: el crítico la tira.
