# NAVI 8.6 — juicio razonado + más red

**No finge sentimientos.** Opina aplicando fichas de ética, KCC,
derechos humanos y método científico a un hecho con fuente.

«Inventar» aquí = **inferir** desde extractos (APPLY). Si no hay puente
en ficha, lo dice y cita ambos. No rellena el veredicto.

Más red que Wikipedia: abstract DuckDuckGo + scrape del primer
resultado que VERIFY acepta + URL directa.

```
./navi86 --ask "está bien podar una instancia débil?"
./navi86 --ask "de donde soy"
./navi86 --learn "neuromorfico"
./navi86 --bulk 500          # ~60k palabras nuevas (wiki + fuente)
./navi86 --repl
```

`--bulk N` no es pretrain. Son N extractos con URL. ~120 palabras/ficha:
10 000 fichas ≈ 1 millón de palabras. Repite `--bulk` (salta las ya
aprendidas). KCC: no se borra. Ctrl+C guarda.

## Cómo se forma un juicio

1. Hecho: ficha, `context.db` o harvest (wiki / DDG / URL).
2. Principio: Ética, KCC, método científico, derechos humanos…
3. Aplicación: solo si hay una regla cerrada (p. ej. KCC+poda, método+UAP).
4. Si no: se exponen hecho y principio. No se fabrica el fallo.

«How do you feel about that» sobre un tema = este juicio, no «no siento»
vacío. El interior de NAVI sigue sin vida: el juicio es de las fichas.
