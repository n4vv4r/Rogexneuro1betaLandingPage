# NAVI 6.6 para expertos

## Lengua

`navi66_lang.py`:

- `fold` quita tildes para la clave.
- `TYPOS` (jerga) antes que Damerau-Levenshtein (limite 2, vecino unico).
- `LEX` / `VERBS` / `LEMMA_NOUN` / `LEMMA_ADJ`.
- `np(lemma, definite, adj)` concuerda art+nombre+adj.
- `conjugate(lemma, tense, person)` persona 1-6.
- `rewrite_tense` sustituye formas verbales del lexico.

No hay n-gramas. No hay backprop. El castellano de salida es plantilla
+ reglas.

## Motor

`NAVI66Engine` hereda 6.5. Preprocesa con `correct_text`. Si el intent
es lang (conjuga / corrige / rewrite / grammar) pinta `G_lang`. Si es
talk, `compose_human` arma oraciones. Math/code/logic no se tocan.

Kernel: `navi66_correct` en `navi6_reply`. Tabla TY + LEX + dist 1.
Prefijo `supongo kien->quien |` si hubo tachon. Heap 0, 0% FPU.

## TUI

Tres skins, un cerebro (`./navi66 --json --ask`):

| Skin | Stack | Concurrencia |
| --- | --- | --- |
| `navi66_tui.py` | ANSI + termios + thread | select 30 ms + worker |
| `tui/navi66.c` | ANSI + pthread, sin ncurses | poll + pthread + ring de bloques |
| `tui/navi66-rs` | ratatui + crossterm | poll 30 ms + std::thread + mpsc |

Double paint (alt screen / ratatui frame). Spinner braille. Streaming
por caracteres. Footer: proyecto, rama, slash cmds. Highlighter naive
para ```python / js / rust.

El input no espera al motor: el worker publica el bloque y el loop
sigue leyendo teclas.

## Medir

```
python3 tests/test_navi66.py
./navi66 --ask "ola kien eres"
./navi66 --ask "conjuga hablar en preterito"
./navi66 --ask "pon en futuro: yo escribo"
```
