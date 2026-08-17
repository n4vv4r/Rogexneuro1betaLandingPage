# Tutorial — rxOS 9 SMOKE

**Autor:** r. navarro  
**ISO:** `rxOS-9.0.0-vm.iso` / `rxOS-9.0.0-metal.iso`  
**Eslogan:** *An AI that consumes less than your calculator app*

Este texto enseña a **arrancar rxOS 9, hablar con NAVI 7 y medir**.  
NAVI **no** es un LLM. Sin ficha: **DESCONOCIDO**. Experimental, sin garantía.

---

## 1. Qué es esto

rxOS 9 SMOKE es un unikernel x86_64 bare-metal. Escritorio **Dark Aero** (cristal negro, iconos PNG). NAVI 7 es la cara oficial del chat.

| Capa | Qué hace | Dónde |
| --- | --- | --- |
| Desktop Smoke | Dark Aero, Start, Ajustes, Photos | arranque gráfico |
| NAVI 7-WORLD | 73 fichas + harvest HTTP + RLC | tecla `v` |
| NAVI 6.5 RLC | 11 máscaras G_*, 5 cajas | dentro de 7 |
| L1 Q₆ | 64 neuronas LIF, 1-bit 48/48 | `navi` / boot |
| L2 HDC | 1024-bit, 66 352 B | `navi l2` |
| WWW | HTTP GET/POST, curl, wget | `www on` |

**7-NPU (Akida) sigue PLAN.** Sin placa, `neurocpu akida` se niega. Eso es honesto.

El eslogan se afirma de **la capa NAVI**, no de toda la ISO.

---

## 2. Bajar la imagen correcta

Release: [v9.0.0 en RXos-Packages](https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0)

| Archivo | Uso |
| --- | --- |
| `rxOS-9.0.0-vm.iso` | QEMU / VirtualBox |
| `rxOS-9.0.0-metal.iso` | USB en un PC real (BIOS / Legacy) |

No flashees la ISO VM a un pendrive. SHA-256: [ISOS.md](ISOS.md).

```
6cb64e0cd007d09088e0b931fd8e49d9c07db45a65f959999f272ba16910c24c  rxOS-9.0.0-vm.iso
49f8f80f1e8c0ba4ebdf1f11592da1b0fb39c1a73d26b259205b88147bf87230  rxOS-9.0.0-metal.iso
```

Drivers en **ambas** ISOs: virtio-net, Intel e1000, Realtek r8169, RTL8139.

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
  -cdrom rxOS-9.0.0-vm.iso \
  -netdev user,id=net0 -device virtio-net-pci,netdev=net0 \
  -serial stdio
```

Para e1000: `-device e1000,netdev=net0`.

GRUB enseña el **eclipse** y el menú `rxOS 9.0.0 SMOKE - NAVI 7`. 8 segundos. Enter.

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
2. Escritorio **Smoke Aero**: iconos PNG (Ajustes, Terminal, Explorer, Neuro, Navi, Calculator, Disks, Photos, About).
3. Click derecho en el vacío: Ajustes / cambiar fondo.
4. Tecla **`t`** — Terminal (ROSH).
5. Tecla **`v`** — **Navi 7**. Pregunta `que es fotosintesis`.
6. Tecla **`a`** — Ajustes (tema + fondo).
7. Tecla **`i`** — Photos. Pasar fotos **no** cambia el fondo. Enter o «Usar como fondo» sí.
8. Tecla **`e`** — Explorer. JPEG/PNG se previsualizan.
9. `F12` o `capture` — miniatura en `/screenshots`.

Comandos útiles:

```
help
about
status
navi
navi l2
www on
curl search fotosintesis
wget http://ejemplo/foto.jpg
```

---

## 5. Cómo hablar con NAVI 7

NAVI 7 hereda el bucle PARSE-RETRIEVE-INFER-VERIFY-RENDER de 6.5 y añade un **catálogo de fichas** (ciencia, leyes, filosofía, programación, psicología, mundo). Si no hay ficha y el harvest HTTP falla: **DESCONOCIDO**.

| Dónde | Cómo |
| --- | --- |
| GUI | tecla `v` · escribe · Enter o ENVIAR |
| Pregunta de mundo | `que es habeas corpus` · `que es un algoritmo` |
| Internet | `/www` luego `/search tema` o `/curl http://…` |
| Demo operador | `/prove` (lista blanca G_rxos) |
| Borrar | `/clear` |

Atajos: `/help`, `/bench`, `/fetch`, F12.

Lee el aviso: [USER_NOTICE.md](USER_NOTICE.md).  
Contrato: [NAVI 7](NAVI7.md).

Qué esperar: respuestas **con fuente** si hay ficha. No es ChatGPT. No rellena el hueco.

En el **host** (no dentro de la ISO):

```bash
./navi7 --ask "que es fotosintesis"
./navi7 --bench
python3 navi7_tui.py
```

Bench medido: **15/15**, 73 fichas, `destroyed=0`.

---

## 6. Internet: harvest y descargas

```
www on
curl search fotosintesis
curl http://example.com/
wget http://example.com/foto.jpg
curl -o /home/foto.jpg http://example.com/foto.jpg
```

- Google HTML por HTTP (`gbv=1`). HTTPS sin TLS completo: usa `http://`.
- `wget` / `curl -o` guardan la URL **exacta**. Tope honesto: **192 KiB** por GET.
- Las fotos descargadas se ven en Explorer.

---

## 7. Entrenar NAVI 7 (host)

El unikernel **no** hace backprop. El laboratorio vive en el PC anfitrión:

```bash
./navi7 --train
python3 tests/test_navi7.py
```

Las fichas solo crecen (KCC). Luego `make iso` empaca el catálogo compacto en el kernel.

---

## 8. Cómo hacer benchmark

**Dentro del OS**

```
navi
navi l2
```

En Navi 7: `/bench` o `/prove`.

**En el host**

```bash
./navi7 --bench
./navi65
cd NAVI_AI_SNN && make l2-bench
make test
```

| Métrica | Dónde |
| --- | --- |
| 1-bit 48/48, hop 120/120 | boot / `navi` |
| L2 66 352 B | `navi l2` |
| 73 fichas, 15/15 | `./navi7 --bench` |
| RAPL julios | `navi joules` — QEMU se niega |

---

## 9. Metal (USB)

```bash
sudo dd if=rxOS-9.0.0-metal.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

`of=` es el disco entero. Secure Boot off, Legacy/CSM on. Referencia: HP 15-ac195nl (r8169, cable Ethernet).

Medidas 8.5 en ese portátil: [HP_AC195NL_85.md](HP_AC195NL_85.md). Siguen siendo el RAPL de referencia (el chip no cambió).

---

## 10. Lecturas siguientes

| Si quieres… | Abre |
| --- | --- |
| Dónde están las ISOs | [ISOS.md](ISOS.md) |
| Qué es NAVI 7 | [NAVI7.md](NAVI7.md) |
| Relés, no loro | [NAVI65_DUMMIES.md](NAVI65_DUMMIES.md) |
| Plano del lab | [CIANOTIPO.md](CIANOTIPO.md) |
| Metal medido | [HP_AC195NL_85.md](HP_AC195NL_85.md) |

Código: [github.com/navywakura/RXos](https://github.com/navywakura/RXos)  
Espejo: [github.com/knightslabs/rxos-8.5](https://github.com/knightslabs/rxos-8.5)
