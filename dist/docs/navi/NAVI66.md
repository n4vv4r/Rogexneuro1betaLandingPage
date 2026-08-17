# NAVI 6.6 — lengua + TUI

NAVI 6.6 **no** es un LLM. Es 6.5 (PARSE-RETRIEVE-INFER-VERIFY-RENDER)
mas un **compositor gramatical** y un **chat TUI**.

## Que anade

- Ortografia: si «kien» entra, se detecta el error y se **supone** «quien».
  Distancia de Damerau 1-2 contra un lexico cerrado, o tabla de jerga.
- Articulos y concordancia: `la mascara`, `el esquema oficial`, `la neurona local`.
- Tiempos: presente, preterito, futuro, condicional, subjuntivo. Verbos del lexico.
- Conectores: porque, entonces, aunque, ademas, sin embargo, por tanto.
- G_lang: `conjuga escribir`, `pon en pasado: yo hablo`, `corrige: ...`.
- TUI de colores (footer, cajas, spinner, streaming, `/clear` `/exit`).
- Internet (unikernel + host): `curl` GET/POST, HTML → texto, `curl search`
  / `busca Q` consulta Google por HTTP (`gbv=1`). HTTPS TLS sigue a medias.

## Como correrlo

```
./navi66                  # TUI ANSI (tty)
./navi66 --plain          # REPL
./navi66 --ask "ola kien eres"
make navi66-tui           # TUI C (ANSI + pthread)
make navi66-tui-rs        # TUI Rust (ratatui)
python3 tests/test_navi66.py
```

## Que no es

- No predice el siguiente token.
- El lexico es **cerrado**. Una palabra que no existe aqui no se inventa.
- La TUI del host no es el chat Aero del unikernel. El kernel tiene el
  mismo corrector (`navi66_lang.c`) y anuncia 6.6; el compositor rico
  vive en el host.
- Tokio no es obligatorio: el event loop + un hilo de inferencia basta.

## Limite honesto

Una sesion de lengua no es un modelo de castellano. Es un tablero de
relés: det, nombre, adjetivo, verbo, conector. Si VERIFY no tiene ficha:
DESCONOCIDO.
