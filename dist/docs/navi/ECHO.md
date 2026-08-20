# Echo — evolución de RogexWSP

**Estado: HOST LIVE (NAVI 9).** Padre: [RogexWSP](https://github.com/navywakura/RogexWSP)
y `kernel/include/wsp.h`.

```
humano  →  átomos + E[6] + tipo de acto  →  postal Echo
                 │
                 ├─ glifo (cubo, geometría)
                 └─ cuerpo 3D: 3 modos ortogonales
                        f0 = 256 Hz
                        x: 1/1 = 256 Hz
                        y: 3/2 = 384 Hz
                        z: 5/4 = 320 Hz
                        p(t) ∝ vx + vy + vz   → WAV
```

WSP ya era «un significado, muchas máscaras». Echo añade el **tipo de
pregunta** y sustituye el seno suelto por un **objeto que vibra**: un
cubo con tres modos medibles. El altavoz sigue oyendo una presión 1D
(así es el aire). El modelo no es esa raya: son tres ejes + tiempo +
los seis E.

No se afirma un espacio-tiempo de 4+ dimensiones. Se afirma un
oscilador modal con frecuencias justas, enteras, falseables.

## Tipos de acto

`meaning` · `hypothesis` · `philosophy` · `advice` · `technical` ·
`translation` · `emotional`

NAVI 9 no mezcla un consejo con un dato, ni una hipótesis con un
extracto de Wikipedia.

## Enseñar (el padre)

```bash
./navi9 --teach-ecosystem     # WSP, Q6, NAVI, rxOS, SPEC de RogexWSP
./navi9 --teach ruta/al.md    # un documento
./navi9 --echo "estoy solo"
./navi9 --ask "qué es WSP"
```

Cada ficha trae fuente. KCC: el léxico solo crece.

## Techo

Echo puede traducir una frase a postal + glifo + cuerpo 3D y hablar
del ecosistema con fichas. No «entiende la conciencia humana» como un
cerebro. Si no hay extracto de neurociencia, lo dice.
