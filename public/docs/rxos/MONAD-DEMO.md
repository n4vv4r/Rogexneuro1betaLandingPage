# rxOS 7 MONAD — demo dual (impacto + pruebas frías)

NAVI no es un LLM. L1 es un atractor de 6 bits. L2 es memoria de n-gramas
HDC (~66 KiB, tamaño **fijo**). Esta spec es lo que se enseña y lo que se mide.

## Saturación del bundle (por qué no crece ni se lava)

`sizeof(navi_l2_t)` **no depende del corpus**. Los prototipos son `V × K`
hipervectores fijos (`V=80`, `K=4`). Entrenar 10 o 10 000 líneas no añade RAM.

Lo que sí se degrada, si se hace mal, es la **similitud**: un solo HV por
clase acaba siendo la sopa de todos los contextos que predicen `(`.

Regla que usa el motor:

1. **Sin acumuladores persistentes.** Los `int16[1024]` por clase eran 160 KiB
   y se saturaban. El bundle leaky se calcula en la pila y se tira.
2. **Leaky join 7:1.**  
   `proto ← majority(7×proto, 1×key)`  
   Un ejemplo nuevo empuja un octavo. Lo viejo no se borra de golpe; lo
   nuevo no puede explotar el contador.
3. **K=4 átomos por clase.** Un contexto entra en el átomo más cercano si
   `sim ≥ 580`. Si no, ocupa un hueco vacío o **sustituye el átomo más débil**.
   Nunca hay un 5º átomo. El peor caso de memoria es constante.
4. **Conteo tapado** en 4095. Solo sirve para elegir el átomo débil.

Medido en host, 12 cabeceras/fuentes de rxOS (45 463 B, 6 420 tokens):

```
sizeof_before   66352
sizeof_after    66352
sizeof_flat     YES
RSS_KIB         3464
us_per_predict  733
prompt_next     (
ISO_OK          YES
```

---

## Track 1 — impacto (5 segundos)

**Sitio:** terminal del ISO (`navi l2`) o `make l2` en el host. No hace falta WASM
para el corte actual; la TUI es el propio comando.

```
L2 sizeof 66352  atoms 4  keep 7:1
not an LLM — n-gram HDC, leaky bundle
prompt void kernel_main
next   (
spikes +.+...-+..+............
```

Contraste de recurso (lo que tiene que verse, no un gráfico de marketing):

| Barra | Qué | Orden |
| --- | --- | --- |
| L1 Q₆ | `navi` → heap ~480 B | cientos de **bytes** |
| L2 HDC | `navi l2` → 66 352 B | decenas de **KiB** |
| Calculadora | 15–40 MiB RSS | la vara del eslogan |
| LLM 7B int4 | ~4 GiB | lo que esto no es |

Oscilograma: 32 caracteres `+` / `-` / `.` = último tren de spikes del RWKV.
Si no hay spikes, el mezclador está callado; la predicción sigue saliendo del
n-grama HDC.

Narrativa (sin jerga):

> Escribes el principio de una línea de C. NAVI no “piensa” la función.
> Recuerda trozos que le enseñaste, en impulsos de 0 y 1, en 66 kilobytes.
> Si no se lo enseñaste, no lo inventa.

---

## Track 2 — suite fría (`make l2-bench`)

```bash
cd NAVI_AI_SNN && make l2-bench
# o: l2/navi_l2_bench ../kernel/navi/navi_q6.c ../kernel/rogex.h
```

| Métrica | Dónde | Qué exigir |
| --- | --- | --- |
| `sizeof_before` / `sizeof_after` | bench | **iguales**; hoy 66352 |
| `L2_BYTES` | bench / `navi l2` | < 256 KiB para ISO |
| `RSS_KIB` | host `getrusage` | proceso + libc; no es el kernel |
| `us_per_predict` | 200 predicciones | orden 10²–10³ µs en esta CPU |
| `holdout_hits` | snippet `void kernel_main…` | no 100 % tras un corpus grande |
| `prompt_next` | `void kernel_main` → `(` | debe seguir en pie (refresh) |
| `ISO_OK` | sizeof < 256 KiB y prompt | puerta para el comando in-OS |
| µJ / predicción | `navi joules` en metal | QEMU se niega; no inventar |

L1 sigue en `make fire` / boot: 48/48 y hop 120/120.

---

## Scope y límites (para no comerse un hilo de HN)

- No genera C que no haya visto como n-grama.
- El RWKV ternario **no está entrenado**; si manda, empeora. El saber es HDC.
- `<ident>` colapsa todos los nombres fuera de tabla. No distingue `foo` de `bar`.
- Holdout 6/9 tras 6420 tokens es el precio de mezclar cabeceras reales.
  El prompt anunciado se **re-enseña al final** a propósito.
- El RSS de `navi_l2_bench` incluye libc. En el ISO cuenta `L2 sizeof`.
- El desktop de rxOS (framebuffer) sigue siendo órdenes de magnitud más
  grande que NAVI. El eslogan es de **esta capa**, no de la ISO entera.
- Julios: solo RAPL en silicio Intel real.

Comandos:

```bash
cd NAVI_AI_SNN && make l2 && make l2-bench
make test          # ISO; incluye `navi` y `navi l2`
# en QEMU:
navi
navi l2
navi l2 void kernel_main
```
