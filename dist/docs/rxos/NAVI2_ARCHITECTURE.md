# NAVI 2 — arquitectura (rxOS 7 MONAD)

**Autor:** r. navarro

## 1. Técnica

NAVI 2 no “aprende a hablar” en el unikernel. El tubo es:

```
texto → lexicon C99 (tabla estática)
     → L3 ternario (W ∈ {-1,0,1}, sumas/restas, LIF ya en L2)
     → veto HDC L2 (sim Hamming; si el prototipo gana ≥640, aplasta L3)
     → L1 Q6 (eventos, no el chat)
     → shell / ventana Aero
```

| Capa | Qué hay hoy | RAM |
| --- | --- | --- |
| L1 | Q₆ LIF en `kernel/navi/navi_q6.c` | ~480 B heap |
| L2 | HDC 1024, 4 átomos, leaky 7:1 | **66 352 B** fijos |
| L3 | RWKV ternario V=256 D=256 L=7 | **491 584 B** module2 (no heap) |

L3 se **entrena desde cero** en el host (`NAVI_AI_SNN/l3/train.py`): Spiking-RWKV propio,
QAT a `W ∈ {-1,0,1}`, corpus = C de rxOS + `l3/data/dialogue.txt`. Exporta
`NAVI_AI_SNN/l3/navi2_weights.bin` (cabecera 64 B + 491 520 B packed, 1.97 M pesos).
El kernel **no** recompila esos bytes: GRUB los carga como `module2 /boot/navi2_weights.bin`
y `navi2_fwd_bind` apunta al módulo (sin `kmalloc`; el heap es 512 KiB).
RXFS recorta a 4 KiB/archivo — no es un sitio para el modelo.

```
python3 NAVI_AI_SNN/l3/train.py --steps 2000
make iso-refresh          # ISO nueva, mismo rxos.elf
```

Chat (WhatsApp mínimo, solo texto): tecla `v`. Burbujas user/NAVI/aviso,
barra inferior + ENVIAR. Sin archivos. Aviso oficial: [`USER_NOTICE.md`](USER_NOTICE.md).

`navi2 chat` en la shell conserva S en los siguientes `navi2 …`. `navi2 +`
hace lo mismo un turno. `navi2 .` / `/clear` borra S.

Internet = RAG, **no** backprop:

```
www on  →  navi2 fetch http://…   (o /fetch en el chat)
        →  strip HTML C99
        →  n-grams + hipervector 1024-bit en L2
        →  veto L2 acota a L3
```

W ternario no se toca. HTTPS sin TLS completo: usa `http://`.

Bench: `navi2 bench` / `/bench` — `rdtsc` min/med/max por token, L2+W, vetos, RAG.

No hay `if (hola)`. `navi2_fwd_next` es argmax de logits enteros. L2 puede vetar.

Un run corto (40 steps) **no** deja un modelo elocuente. Deja un generador real
subentrenado. Más steps = menos pérdida. Cero pesos ajenos.

Memoria O(1) por token: estado L2 de 32 enteros, no KV-cache. Heap del kernel 512 KiB: un modelo de 20 MB **no cabe** en `kmalloc`. Cuando exista, irá a disco, no al heap.

Métricas actuales (host `make l2-bench` + `navi` in-OS): L2 sizeof plano 66 352; 1-bit 48/48; hop 120/120; ~740 µs/predicción en el host.

Comandos: `navi2 [texto]`, tecla `v` / icono NAVI2, `capture` / F12 (BMP 48×27 en `/screenshots` porque RXFS recorta a 4 KiB).

`make navi2-gui` y `make capture` construyen el kernel (el GUI va en el ISO, no hay X11).

## 2. For dummies

Imagina tres porteros.

El de abajo (L1) es un cubo de interruptores de 472 bytes. Arregla ruido de 1 bit. No habla.

El del medio (L2) recuerda trozos de C y de la shell en 66 kilobytes que **no crecen** aunque le eches más cabeceras.

El de arriba (L3) es quien *intentaría* charlar. Todavía no tiene los 20 megas de deberes hechos en un PC. Así que hoy te responde cuatro cosas del sistema y completa C que ya vio. Si se inventa un comando, L2 le cambia la palabra.

Una calculadora de escritorio: 15–40 MB. NAVI 2 ahora: decenas de KiB. El día que L3 pese 20 MB y quepa en disco, seguimos por debajo de muchas apps. Si se pasa de 25 MB, o se recorta el dominio, o se deja de llamar MONAD.

No es ChatGPT. Es un SO que se sujeta la lengua.
