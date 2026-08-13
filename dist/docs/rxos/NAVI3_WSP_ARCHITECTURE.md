# NAVI-3-SNN-WSP — arquitectura

NAVI-3 no predice castellano. Habla **paquetes RogexWSP de 16 bytes**.
El texto humano es una **máscara de renderizado**.

```text
ES  →  wsp_encode_es  →  S_in  →  L3 (ternario, Wk usada)  →  S_out
                                              ↓
                                    L2 HDC veto (átomos)
                                              ↓
                                    wsp_mask_es  →  GUI / shell
```

## Implementado

| Pieza | Dónde | Estado |
|---|---|---|
| Contrato 16 B `wsp_packet_t` | `kernel/include/wsp.h` | sí |
| Encoder ES (keywords, no parser) | `kernel/navi/wsp.c` | sí |
| Máscara ES + compacto | `wsp_mask_es` | sí |
| L3 V=48 D=256 L=7, `Wk` condiciona S | `navi3_fwd.c` | sí |
| Bind `NAVI3W01` module2, 0 heap | `navi3_fwd_bind` | sí |
| Veto L2: reglas G + `hdc_sim` | `navi3_l2.c` | sí |
| Trainer QAT | `NAVI_AI_SNN/l3/train_wsp.py` | sí |
| Bench `rdtsc` / heap 0 / HDC % | `navi3 bench` / `/bench` | sí |
| Chat Aero tecla `v` | `ui/window.c` | sí (`/demo`) |
| Captura F12 / `capture` | existente, 48×27 BMP RXFS | sí |

No hay `userland/apps/navi3_chat_gui.c`: el escritorio Aero es **in-kernel** (`ui/window.c`). Inventar una app de userland no arrancaría.

## Paquete

```c
src_atom, rel_atom, dst_atom, time_space   /* 4 × uint8, 0..47 */
e_v, e_a, e_d, e_c, e_u, e_b               /* int8 −100..+100 */
flags, pad[5]                              /* 16 B exactos */
```

Ejes oficiales WSP (SPEC): valence, arousal, dominance, certainty, urgency, bond.

Átomos 0–31 = primitivos SPEC. 32–39 = AMOR, SOLEDAD, COMUNICAR, CONEXION, PELIGRO, BIENVENIDA, CONCIENCIA, WIRED. 40–43 = NONE, UNK, HELP, PAD.

## Motor

`Wk` ya no se descarta. Escribe en `S` solo si `k[i] > 0`; `Wr` sigue siendo el gate de lectura. Entero, leak 7:1, clamp ±32.

Un turno = 4 embeddings (ranuras de `S_in`) + inyección de `E/8` en `x[0..5]` + 4 cabezas `V×D` + 1 cabeza emocional `6×D`.

## Veto L2 (honesto)

L2 **no corrige letras**. Compara el paquete de L3 con el paquete esperado por reglas G (p. ej. `SOLEDAD → DESEAR/CONEXION`). Si `hdc_sim < 640`, sustituye átomos y `E`. Un modelo poco entrenado será vetado a menudo: eso es correcto, no un fallo oculto.

## Pesos

```
python3 NAVI_AI_SNN/l3/train_wsp.py --steps 40
make iso-refresh
```

Cabecera `NAVI3W01`, payload 474 496 B, total 474 560 B. GRUB: `module2 /boot/navi3_weights.bin navi3`. El heap del kernel **no** aloja el blob.

NAVI 2 (`NAVI2W01`, V=256) sigue en la ISO para RAG/legado. El chat usa NAVI-3 si el módulo cargó.

## Límites (no son bugs)

- El encoder in-kernel es una tabla de keywords ASCII. No entiende español libre.
- L3 sin `--steps` serios no generaliza; G cubre los pares canónicos.
- La máscara ES es un conjunto finito de plantillas + forma compacta.
- BMP de captura sigue siendo 48×27 (RXFS 4 KiB/fichero).
- Cero FPU, cero backprop in-kernel, RAG ≠ retrain.

## Demo canónica (QEMU real)

```
Usuario:  estoy solo y necesito ayuda
S_in:     YO → SER → SOLEDAD @AHORA | E[V-60 A-40 B-50]
S_out:    YO → DESEAR → CONEXION @AHORA | E[V+50 A+30 B+40]
Máscara:  Procesando estado... Buscando canal de conexion. | YO -> DESEAR -> CONEXION ...
```

![NAVI-3 WSP chat en QEMU](/rxos/monad/10-navi3-wsp-chat.png)

*Tecla `v`, `/demo` + `hola navi`. Pesos `NAVI3W01` 474560 B (module2). Captura QEMU, no un mockup.*

![Boot: NAVI3-WSP weights bound](/rxos/monad/01-boot.png)

*Log de arranque: `NAVI3-WSP weights: 474560 B (module2)`.*

En el chat: `/demo`. Luego F12. Shell: `navi3 bench`.
