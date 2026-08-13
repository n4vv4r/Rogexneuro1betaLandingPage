# Cómo comprobar tú mismo que NAVI no come gigas

Eslogan de **rxOS 7 MONAD**: *An AI that consumes less than your calculator app*.

Eso es una tesis, no un hecho de producto. Aquí está cómo falsearla en tu máquina, sin creerse un README.

## Qué se está midiendo (y qué no)

| Cosa | ¿Es “la IA”? | Orden de magnitud |
| --- | --- | --- |
| `sizeof(navi_q6_t)` — 64 LIF + aristas Q₆ | **sí, el sustrato** | cientos de **bytes** |
| `c/navi_q6_demo` en Linux | el prototipo host + libc | unos **1–4 MiB** RSS |
| CPython corriendo `q6_bench.py` | el intérprete, no NAVI | **20–50 MiB** (irrelevante) |
| Calculadora de escritorio | la vara del eslogan | **15–40 MiB** RSS típicos |
| Un LLM 7B cuantizado | lo que NAVI **no** es | **4–8 GiB** |

Si comparas el Python del banco contra la calculadora, estás midiendo CPython. La cifra que sostiene la tesis es la **capa C** y, como techo honesto del prototipo, el **RSS de `navi_q6_demo`**.

## Receta (5 minutos)

Desde `NAVI_AI_SNN/`:

```bash
make mem
```

Tiene que imprimir, entre otras:

```
LAYER_BYTES 472
RSS_KIB     < 15360          # 15 MiB = suelo bajo de una calculadora
VS_CALCULATOR BELOW
```

Ejemplo en esta máquina (13 ago 2026, no es una cifra de producto):

```
capa estatica   472 bytes
RSS proceso     1660–2604 KiB   (/usr/bin/time -v vs getrusage)
binario         21528 bytes
VS_CALCULATOR   BELOW
```

Compruébalo sin el Makefile:

```bash
# 1. tamaño estático de la capa (el número del kernel)
grep NAVI_LAYER_BYTES c/navi_q6.h
# o:
./c/navi_q6_demo mem

# 2. RSS real del proceso (Linux: ru_maxrss está en KiB)
/usr/bin/time -v ./c/navi_q6_demo
# mira: "Maximum resident set size (kbytes):"

# 3. tamaño del binario en disco (incluye libc dinámica, no pesos)
ls -l c/navi_q6_demo

# 4. opcional: tu calculadora, misma herramienta
/usr/bin/time -v gnome-calculator     # o kcalc, galculator...
# cierra la ventana; compara Maximum resident set size
```

En `/proc` mientras corre un loop:

```bash
# en una terminal:
while true; do ./c/navi_q6_demo >/dev/null; done
# en otra:
ps -o pid,rss,cmd -C navi_q6_demo
# RSS de `ps` está en KiB. 1024 KiB = 1 MiB.
```

## Criterio de paso / fallo

* **PASS de sustrato:** `LAYER_BYTES` < 16 KiB (cabe en una L1; el RFC pedía < 16 KiB en C).
* **PASS de eslogan (host):** RSS de `navi_q6_demo` < 15 MiB.
* **PASS de eslogan (ISO):** `navi` muestra sizeof/heap de la capa en cientos de bytes. El framebuffer del desktop es otra factura.
* **FAIL honesto:** afirmar que “la IA de rxOS usa pocos megas” cuando lo que corre es un LLM.

## In-OS (ISO 7.0.0 MONAD)

El puerto kernel está hecho. Mide **dentro** del SO:

```text
navi          # sizeof + heap kmalloc + KPIs + RAPL
mem           # línea NAVI Q6
status        # fila NAVI Q6 (soft actor, not on IRQ)
```

`navi joules` solo da un delta en µJ si RAPL existe. En QEMU se niega.
