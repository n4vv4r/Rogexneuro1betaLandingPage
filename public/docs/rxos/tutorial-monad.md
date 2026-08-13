# Tutorial — rxOS 7 MONAD

**Autor:** r. navarro  
**ISO:** `rxOS-7.0.0-vm.iso` / `rxOS-7.0.0-metal.iso`  
**Eslogan:** *An AI that consumes less than your calculator app*

Este texto enseña a **arrancar, hablar con NAVI 2 y medir**. No es un LLM. No hay archivos en el chat. Experimental, sin garantía.

---

## 1. Qué es esto

rxOS 7 MONAD es un unikernel x86_64 bare-metal. Lleva:

| Capa | Qué hace | Dónde |
| --- | --- | --- |
| L1 Q₆ | 64 neuronas LIF, 1-bit 48/48, hop 2-bit | `navi` / boot self-test |
| L2 HDC | Memoria asociativa 1024-bit, 66 352 B | `navi l2` |
| L3 | RWKV ternario, pesos en `navi2_weights.bin` | tecla `v`, `navi2` |
| Desktop | Aero, RXFS, WWW opt-in | instalador LIVE |

El eslogan se afirma de **la capa NAVI**, no de toda la ISO.

---

## 2. Bajar la imagen correcta

Release: [v7.0.0 en RXos-Packages](https://github.com/knightslabs/RXos-Packages/releases/tag/v7.0.0)

| Archivo | Uso |
| --- | --- |
| `rxOS-7.0.0-vm.iso` | QEMU / VirtualBox |
| `rxOS-7.0.0-metal.iso` | USB en un PC real (BIOS / Legacy) |

No flashees la ISO VM a un pendrive. Comprueba SHA-256 (`SHA256SUMS.txt`).

Drivers de red en **ambas** ISOs: virtio-net, Intel e1000, Realtek r8169, RTL8139.

---

## 3. Arrancar en QEMU

```bash
# macOS
brew install qemu
# Fedora
sudo dnf install qemu-system-x86-core
# Debian / Ubuntu
sudo apt install qemu-system-x86

qemu-system-x86_64 \
  -machine q35 -m 512M \
  -cdrom rxOS-7.0.0-vm.iso \
  -netdev user,id=net0 -device virtio-net-pci,netdev=net0 \
  -serial stdio
```

Para probar e1000: `-device e1000,netdev=net0`.

En el log de arranque debe aparecer:

```
[rxos] NAVI Q6 self-test (cube + 1-bit + hop): PASS
[rxos] NAVI2 weights: 491584 B (module2)
[rxos] NAVI3-WSP weights: 474560 B (module2)
```

Si no ves `module2`, el `.bin` no cargó. La ISO oficial sí lo incluye.

---

## 4. Primeros minutos en el escritorio

1. Registro (usuario + contraseña) si es LIVE.
2. Escritorio Aero: iconos, taskbar, reloj.
3. Tecla **`t`** — terminal.
4. Tecla **`v`** — **NAVI-3 Chat** (WSP + máscara ES). `/demo` prueba SOLEDAD.
5. `F12` o `capture` — miniatura en `/screenshots`.

Comandos útiles:

```
help
navi
navi l2
navi calc 1+2*3
navi2
navi2 chat
navi2 bench
www on
```

---

## 5. Cómo chatear con NAVI-3 (WSP)

El chat habla **paquetes WSP**. El castellano es máscara. Ver [`NAVI3_WSP_ARCHITECTURE.md`](NAVI3_WSP_ARCHITECTURE.md).

| Dónde | Cómo |
| --- | --- |
| GUI | tecla `v` · escribe · Enter o ENVIAR |
| Demo | `/demo` → «estoy solo y necesito ayuda» |
| Shell | `navi3 chat` luego `navi3 tu mensaje` (`navi2` es alias) |
| Borrar S | `navi3 .` o `/clear` |

Atajos: `/bench` (rdtsc/paquete), `/fetch`, `/www`, F12 captura.
- `/help` — aviso

Lee el aviso: [USER_NOTICE.md](USER_NOTICE.md).

Qué esperar: respuestas **cortas**. El modelo actual es un train corto (generador real, a menudo ruidoso). L2 puede vetar un carácter. No es ChatGPT.

---

## 6. Internet = RAG, no reentrenar

```
www on
navi2 fetch http://ejemplo/texto.txt
```

El HTML se limpia a ASCII y se inyecta en L2 (n-grams + hipervector 1024-bit). **W ternario no cambia.** HTTPS sin TLS completo: usa `http://`.

---

## 7. Entrenar sin recompilar el kernel

En el PC anfitrión:

```bash
python3 NAVI_AI_SNN/l3/train.py --steps 2000
make iso-refresh
```

Eso escribe `navi2_weights.bin` y rehace la ISO. `rxos.elf` no se toca.

---

## 8. Cómo hacer benchmark

**Dentro del OS**

```
navi2 bench
```

Sale: ciclos min/med/max por token (`rdtsc`), L2 + pesos, vetos, docs RAG.

**En el host**

```bash
cd NAVI_AI_SNN && make l2-bench
make test          # humo QEMU, incluye NAVI2 weights + notice + bench
```

**Tabla de lectura**

| Métrica | Dónde |
| --- | --- |
| 1-bit 48/48, hop 120/120 | boot / `navi` |
| L2 sizeof 66 352 B | `navi l2` |
| Ciclos/token | `navi2 bench` |
| Pesos 491 584 B | línea `NAVI2 weights` |

Julios RAPL: `navi joules` — en QEMU se niega (honesto).

---

## 9. Metal (USB)

```bash
sudo dd if=rxOS-7.0.0-metal.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

`of=` es el disco entero. Secure Boot off, Legacy/CSM on. Hardware de referencia: HP 15-ac195nl (r8169).

---

## 10. Lecturas siguientes

| Si quieres… | Abre |
| --- | --- |
| Click en 3 minutos | [para-curiosos.md](para-curiosos.md) |
| Ver benches y capturas | [demostracion.md](demostracion.md) |
| Arquitectura NAVI 2 | [NAVI2_ARCHITECTURE.md](NAVI2_ARCHITECTURE.md) |
| Teoría Q₆ | [RFC-2026-08-Q6](/docs/navi/RFC-2026-08-Q6.md) |
| Cómo medir | [MEASURE.md](/docs/navi/MEASURE.md) |

Código: [github.com/navywakura/RXos](https://github.com/navywakura/RXos)
