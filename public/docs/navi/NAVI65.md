# NAVI 6.5 — modelo RLC (razonamiento + lenguaje + código)

NAVI 6.5 **no** es un LLM. Es el transductor oficial de rxOS que
**razona siempre**, **habla con máscaras G_*** y **emite código solo
si hay esquema**. El castellano es pintura. El motor es un bucle de
cinco cajas:

```
PARSE → RETRIEVE → INFER → VERIFY → RENDER
```

Si VERIFY falla: `DESCONOCIDO`. Eso es una feature.

## Qué hay de 4.5, qué es nuevo

| Máscara | Origen | Qué hace | Límite honesto |
| --- | --- | --- | --- |
| `G_talk` | 4.5 | Composición OPEN+NUC+CLOSE + banco de hechos | No es un chat GPT |
| `G_logic` | 4.5 | Unificador (transitividad, modus ponens, AND/OR/NOT) | Huecos A/B/C, no un solver de IMO |
| `G_poetic` | 4.5 | Haiku / terceto contado | Banco de versos, no un poeta |
| `G_news` | 4.5 | Titulares RSS (unikernel `www on`) | Host: no inventa RSS |
| `G_code` | 4.5+6.5 | Catálogo + dry-run entero (C/Python) | reverse, clamp, LIF, gcd, fib, crc8. No Copilot |
| `G_rxos` | 4.5 | Lista blanca → `commands_dispatch` | En host solo nombra el comando |
| `G_reason` | **6.5** | Traza visible de las 5 cajas | Esquema o DESCONOCIDO |
| `G_math` | **6.5** | Enteros `+ - * /` (división `//`) | 0% FPU. Nada de 1.5+2 |
| `G_debug` | **6.5** | DAG + world-model de NAVI 6 | Currículo curado (GPU/hilos/RAM) |
| `G_plan` | **6.5** | Pasos numerados de procedimientos conocidos | No planifica tu vida |
| `G_teach` | **6.5** | Explica WSP/SNN/NAVI en cajas cortas | No es un tutor de campus |

Once máscaras. El router elige una. El razonador corre **igual** en
todas: cada turno deja traza PARSE…RENDER.

## Cómo es “oficialmente” un modelo de razonamiento

1. **Razonamiento** = el bucle de 5 pasos + DAG/`do()` + math entero.
   `./navi65 --reflect` se pregunta solo (aristas del DAG).
2. **Lenguaje** = las máscaras de 4.5 (talk, poema, noticias, lógica)
   más teach/plan. Composición, no predicción de tokens.
3. **Código** = catálogo + composición + dry-run. Si pides un
   compilador LLVM: `DESCONOCIDO`.

No hay billones de parámetros. No hay QPU. Q-WSP sigue siendo
amplitudes clásicas.

## Ejecutable

```
chmod +x navi65
./navi65 --ask "quien eres"
./navi65 --ask "cuanto es 12 por 7 mas 3"
./navi65 --ask "escribe una funcion en python que haga clamp"
./navi65 --ask "si a es mayor que b y b es mayor que c"
./navi65 --ask "activo varios hilos la GPU se bloquea y la RAM se dispara"
./navi65 --ask "razona cuanto es 2+2"
./navi65 --reflect
```

Dentro de rxOS: tecla `v`, o `navi6` / `navi65`. `/prove` sigue
siendo el tour (G_rxos).

## Pruebas

```
python3 tests/test_navi65.py
python3 tests/test_navi6.py
```

## Lectura

- [Para dummies](/docs/navi65-dummies)
- [Para expertos](/docs/navi65-experts)
- [NAVI 6](/docs/navi6) — el tutor causal que 6.5 usa como G_debug
