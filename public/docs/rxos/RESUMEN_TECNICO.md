# Resumen técnico — Knights Labs / Rogex / rxOS / NAVI

**Corte:** 17 agosto 2026.
**Sitio vivo:** [rogexlaboratories.com](https://www.rogexlaboratories.com).
**Roadmap público:** [/roadmap](https://www.rogexlaboratories.com/roadmap).

Este papel resume **qué dice la web**, **qué hay en el binario**, **cómo
funcionan NAVI, Q₆, WSP y RX-DIB**, **dónde está la empresa**, **qué falta**
y **qué va después**. Si una casilla no tiene ISO, comando o cifra medida,
no está hecha.

---

## 0. Identidad, en una página

| Nombre | Qué es hoy | Qué no es |
| --- | --- | --- |
| **Knights Labs / Knights Computer Club** | Marco de producto, comunidad, licencias | Una corporación con P&L cerrado |
| **Rogex Laboratories** | Laboratorio técnico (EEG, bare-metal, SNN) | Marca clínica |
| **rogexlaboratories.com** | Sitio oficial. Dominio vivo | EternalEclipse.com (visión) |
| **rxOS** | Unikernel x86_64. El SO *es* la demo | Linux recortado |
| **NAVI** | Línea SNN / operador in-OS | Un LLM |
| **PRISMA** | Engine EEG nativo 0.1 + pipeline 3.2 | Dispositivo médico |
| **Eternal Eclipse** | Nombre futuro de la logia de I+D | Dominio o empresa registrados como marca viva |
| **EchOS / Echo** | Visión: ISO unificada SO+modelo+API | Artefacto. No existe |

Tres productos, un idioma (eventos enteros). Ninguno es un LLM.
Ninguno es clínico. GPLv3 en el árbol rxOS.

---

## 1. Qué dice la web

El sitio (Vite + React 19, Vercel) separa **hecho**, **plan** y **visión**.
Esa separación es política de laboratorio, no cortesía.

### Mapa de rutas

| Ruta | Qué cuenta |
| --- | --- |
| `/` | Tesis: 16 B por pensamiento, ~3 MiB al boot, DESCONOCIDO si no hay ficha. Fotos metal del HP. |
| `/rx-os` | Producto rxOS 9 SMOKE: Dark Aero, capturas QEMU, metal 8.5, descargas, límites. |
| `/navi` | Catálogo SNN 1 → 7. 7-WORLD oficial. 7-NPU PLAN. |
| `/roadmap` | Línea de tiempo interactiva. Pin honesto. Kit de posts X/LinkedIn. |
| `/prisma` | Engine 0.1 descargable. PRISMA 5 = roadmap, sin instalador. |
| `/downloads` | ISO 9.0.0 VM+metal + PRISMA Engine Win/macOS/Linux + SHA-256. |
| `/suite` | Productos y capas de licencia (Community / Pro / OEM). |
| `/architecture` | Pila boot → fabric → Q₆ → WSP → desktop → Akida (bloqueado). |
| `/docs` | Visor markdown: tutoriales, benches, cianotipo, NAVI, WSP, PRISMA. |
| `/rx-os/packages` | Canal `.rxc` (`rx app add`). |
| `/about` | Roger Navarro. Contacto `knightsys@proton.me`. |
| `/investors` · `/pitch` | Pre-seed 150 k€, GTM developer-first, riesgos en voz alta. |
| `/startup-idea` | Manifiesto: cómputo por eventos, EEG, licensing Robin Hood. |
| `newspaper.rogexlaboratories.com` | Despachos + RSS + email. |

### La frase que la web se atreve a imprimir

> El sistema operativo *es* la demo. Arrancas. Pulsas `v`. Preguntas.
> Si no hay ficha: **DESCONOCIDO**.

Números que la web **sí** publica (y se pueden comprobar):

| Cifra | Qué es | Dónde |
| --- | --- | --- |
| 16 B | Un pensamiento WSP | `_Static_assert` en `wsp.h` |
| 73 | Fichas NAVI 7-WORLD | `./navi7 --bench` → 15/15 |
| 0 | Heap del modelo NAVI3 | banner / `/prove` |
| 474 560 B | Pesos NAVI3 (module2) | boot |
| 66 352 B | L2 HDC | `navi l2` |
| 1010 B | Blob `NAVI6W01` | `navi6 bench` |
| 48/48 | Q₆ 1-bit | banner de arranque |
| 3678 mW | Idle package MWAIT C7 | metal HP, 17 ago 2026 |
| 72.5 µJ/run | Q6 burst RAPL pkg | 18554 µJ / 256 runs |
| ~3 MiB | RAM al boot (paper) | paper neuromórfico rev 1.0 |

Números que la web **no** inventa: J/NPU, kWh de marketing, fechas del
Eclipse, “post-quantum secure system”, malla anónima.

### Roadmap que la web enseña (pin)

```
6.5 / 8.5     →   7 / 9 SMOKE     →   8 / 9     →   9 / 10     →   10 / 10
HECHO (metal)     EN CURSO (ISO)      PLAN          PLAN/VISIÓN    ECLIPSE
```

Después del 10/10: rebrand a **EternalEclipse.com** (logia de I+D) sobre
**Knights Computer Club** (plaza). Después: **EchOS** (una ISO, una API,
una voz: Echo). II y III son visión.

---

## 2. Estado de la empresa y del proyecto

**Forma.** Laboratorio independiente / pre-seed pre-revenue. Un constructor
principal (Roger Navarro). No hay equipo de gestión. El core no se
subcontrata.

**Comercial.**

- Producto cobrable hoy: **PRISMA 3** (licencias Community / Indie / Lab)
  y, en menor medida, el canal de papeles + kernel open.
- **PRISMA 5** no tiene descarga pública. Precio de referencia en `/suite`,
  no se cobra.
- **rxOS** es open core GPLv3. ISO de inspección, no un SKU de escritorio.
- Pitch público: **150 000 €** para lanzamiento proyectado **diciembre 2026**.
  Uso de fondos: metal, NPU, IP, pilots — no capas de management.
- GTM: kernel open como embudo; conversión a Pro / OEM cuando hay soporte,
  source o hardware.

**Legal / científico.**

- PRISMA es experimental, **no clínico**, no diagnostica.
- Crypto (ML-KEM-768, ChaCha20-Poly1305) pasa KAT en cada boot.
  **Sin auditoría externa.**
- Runtime Akida es propietario de BrainChip. No entra en el tarball GPLv3.
  Nuestro `HardwareDriver` sería el gancho (no escrito).

**Repos y canales.**

| Qué | Dónde |
| --- | --- |
| Sitio | `navywakura/ROGEX-LABORATORIES` → Vercel → rogexlaboratories.com |
| Kernel | `knightslabs/rxos-8.5` + mirror `navywakura/RXos` |
| ISOs | `knightslabs/RXos-Packages` tag `v9.0.0` |
| Contacto | knightsys@proton.me · X @rogexlabs |

**Qué es verdad sobre “la empresa”.** Hay un lab que publica binarios,
papers y límites. No hay ronda cerrada en este documento. No hay NPU en
la mesa. No hay marca Eternal Eclipse operativa.

---

## 3. rxOS — qué está hecho

Unikernel x86_64: C freestanding + NASM + Rust `no_std`. Boot GRUB
Multiboot2 → long mode. No hay userspace Linux. No hay systemd. No hay
libc.

### Línea de producto

| Versión | Qué cerró | Estado |
| --- | --- | --- |
| 4.x | Foundation: boot, PMM, RXFS, IRQ, persistencia ATA, WM, fabric LIF | Historia. Hecho |
| 6.x | Desktop Aero, WWW opt-in, NICs virtio/e1000/r8169/rtl8139 | Historia |
| 7 MONAD | SNN in-kernel, Q₆, WSP, tecla `v` | Historia. Sustituida |
| 8.0 | Operador NAVI-4.5, `/prove` | Historia |
| **8.5** | NAVI 6.5 RLC + **RAPL en metal** (HP 15-ac195nl) | **Última línea medida** |
| **9.0 SMOKE** | Dark Aero, NAVI 7-WORLD, Photos, Ajustes, wget | **ISO actual** |

### Kernel / SO (verificado)

- **Memoria:** PMM, paging 4 niveles, heap `kmalloc`/`kfree`. Identity map
  4 GiB (en un portátil de 8 GiB ~3 GiB usables).
- **Interrupciones:** PIC, PIT 100 Hz, teclado IRQ1, ratón IRQ12, `hlt` idle.
- **Scheduler:** cooperativo real (`switch.asm`), spawn/yield/block/wake.
  Preemption **fuera de alcance** a propósito.
- **Event fabric:** `rx_event_t` 64 B, anillos SPSC, LIF Q16.16, STDP local.
  Bench 6/6 cada boot. IRQ/disco/wired **nunca** umbralizados.
- **Almacenamiento:** ATA PIO + virtio-blk. RXFS. Persistencia opt-in
  (`format` + `save`). Amnésico por defecto. AHCI en el HP: pendiente.
- **Red:** virtio-net, e1000, r8169, rtl8139. `www on` = IPv4/DNS/TCP/HTTP.
  Rogex Wired L2 EtherType `0x88B5` (ping por alias, sin IP).
  HTTPS: ClientHello + ServerHello; **el body no baja**.
- **Escritorio 9:** Dark Aero, iconos PNG, Start, Ajustes, Terminal ROSH
  (split, temas, scroll), Explorer (preview JPEG/PNG), Photos, Neuro,
  Calculator, Disks, About. Click derecho → fondos.
- **Userland:** Roxenite (RX-C) intérprete, `rgx://` local, REVM sellada
  bajo ML-KEM, paquetes `.rxc`, `rx app add` / `rx update`.
- **Power:** ACPI FADT, MWAIT/HLT, RAPL con #GP guard. QEMU se niega a
  fingir julios.

### Niveles neuromórficos (hoja de 4)

| Nivel | Nombre | Estado |
| --- | --- | --- |
| 1 | Tejido de eventos | **Cerrado** |
| 2 | Límites x86_64 + energía | **Cerrado** (RAPL metal) |
| 3 | Delegar spikes a un NPU | **Objetivo. 0/5.** Sin placa |
| 4 | Memristor / in-memory / sin reloj | **Horizonte de industria** |

---

## 4. NAVI — cómo funciona

NAVI **no predice el siguiente token**. No hay KV-cache. No hay backprop
en el kernel. El castellano es **máscara**. El motor es un router de
intención + un paquete de 16 bytes + (desde 6.5) cinco cajas.

```
usuario  →  PARSE → RETRIEVE → INFER → VERIFY → RENDER
                                              │
                                    sin esquema: DESCONOCIDO
```

Once máscaras `G_*` (contrato RLC 6.5). El router elige **una** por turno.

| Máscara | Qué hace | Límite |
| --- | --- | --- |
| `G_talk` | Composición OPEN+NUC+CLOSE | No es ChatGPT |
| `G_logic` | Unificador (MP, AND/OR/NOT, transitividad) | No es un solver IMO |
| `G_poetic` | Haiku / terceto contado | Banco de versos |
| `G_news` | Titulares (RSS si `www on`) | No inventa agencia |
| `G_code` | Catálogo + dry-run entero | No es Copilot |
| `G_rxos` | Lista blanca → `commands_dispatch()` | Un comando por turno |
| `G_reason` | Traza visible de las 5 cajas | Esquema o DESCONOCIDO |
| `G_math` | Enteros `+ - * /` | 0 % FPU |
| `G_debug` | DAG + world-model (NAVI 6) | Currículo curado |
| `G_plan` | Pasos de procedimientos conocidos | No planifica tu vida |
| `G_teach` | Explica WSP/SNN/NAVI en cajas | No es un campus |

### Generaciones (cada una **añade** una capa)

| Gen | Unidad | Dónde | Estado |
| --- | --- | --- | --- |
| 1 Q₆ | spike LIF entero, hipercubo 64 | `navi_q6.c` | Cerrado |
| 2 L3 | token entero V=256, HDC | legado, sigue el binario | Legado |
| 3 WSP | `wsp_packet_t` 16 B | `wsp.c` / `navi3_*.c` | Contrato cerrado |
| 4.5 | operador `G_rxos` | tecla `v`, `/prove` | Cerrado |
| 5 | lab cooperativo KCC, air-gap | host Python (`navi5_*.py`) | Host. No es el chat de la ISO |
| 6 | tutor causal, DAG, world-model | host + kernel, blob `NAVI6W01` | Cerrado |
| **6.5 RLC** | 11 G_* + 5 cajas | debajo de 7 | **Contrato vivo** |
| 6.6 | lengua + TUI (lexico cerrado) | host + `navi66_lang.c` | Host rico; kernel anuncia 6.6 |
| **7-WORLD** | 73 fichas + harvest HTTP | `./navi7`, tecla `v` en rxOS 9 | **Oficial en la ISO** |
| **7-NPU** | 6.5 + Akida `.fbz` | no hay código | **PLAN** |

7-WORLD **no** es 7-NPU. Si no hay ficha y el harvest falla: DESCONOCIDO.
KCC: las fichas solo crecen (`destroyed` = 0).

En el portátil de referencia, un turno de máscara midió ~16.8 ms
(mediana navi3 ~40.4 M ciclos @ 2.40 GHz). Heap del modelo = 0.

---

## 5. Protocolo Q₆

**Q₆** es el hipercubo de 6 bits que usa NAVI 1 (y el self-test de boot).

- **64** vértices (estados `v ∈ {0,1}⁶`).
- **192** aristas: hay arista iff distancia de Hamming = 1 (grado 6).
- **Codebook lineal [6,3,3]:** 8 codewords, distancia mínima 3.
  Un noveno codeword con d_min=3 es **imposible** (cota de Hamming ≤ 9;
  el lineal ya usa 8).
- Neuronas LIF **enteras**, 0 % FPU. El contexto es el potencial de membrana.

**Qué se midió**

| Test | Resultado |
| --- | --- |
| Ruido 1-bit → codeword | **48/48** |
| Hop 2-bit (vecino Hamming) | **120/120** |
| Julios Q6 (metal RAPL pkg) | **72.5 µJ/run** (256 runs) |

El hop 2-bit **solo se enciende** si el paso 1-bit no disparó ningún
codeword. Si `Q6_1BIT` deja de ser 48/48, se revierte el hop.

**Hipótesis abierta** (RFC-2026-08-Q6): un espacio de 64 nodos con
simetría de hipercubo actúa como atractor topológico y filtra ruido
simbólico mejor que una capa densa, con O(V log V) aristas en vez de
O(V²). Es una **campaña de investigación**, no geometría sagrada.

Q₆ no habla. No es un chatbot. Es la capa más pequeña del eslogan
*less than your calculator* — y el eslogan se afirma **de esa capa**.

---

## 6. Protocolo WSP (RogexWSP)

**Wired Symbolic Protocol.** Un pensamiento = **16 bytes exactos**.

Tesis: el castellano es la carátula; el cable lleva átomos + emoción.

### Layout in-kernel (`wsp_packet_t`, v0.5)

```
byte  0     src     átomo sujeto     (0..47)
byte  1     rel     átomo verbo
byte  2     dst     átomo objeto
byte  3     time    átomo tiempo/espacio
bytes 4–9   E[6]    V A D C U B      int8, clamp ±100
byte 10     flags   L2 / RULE / VETO
bytes 11–15 ext     domain, generator, style, slot, seq
```

`_Static_assert(sizeof(wsp_packet_t) == 16)`.

**32 átomos primitivos** (5 bit): SER/NO_SER, YO/OTRO, AQUI/ALLI,
DENTRO/FUERA, AHORA/ANTES/DESPUES, UNIR/SEPARAR/CAMBIAR, OBSERVAR,
PREGUNTAR/RESPONDER, DESEAR/TEMER, RECORDAR/OLVIDAR, CREAR/DESTRUIR,
SUBIR/BAJAR, ABRIR/CERRAR, CAUSA/EFECTO, POSIBLE/IMPOSIBLE,
**DESCONOCIDO**.

**Ejes E (emoción = carga de importancia):** Valence, Arousal, Dominance,
Certainty, Urgency, Bond.

**ext.generator_id** nombra la máscara `G_*` (talk…teach). El castellano
se pinta encima; no viaja como token.

Hay un formato de archivo host más viejo (`WSP` + versión + N paquetes)
en `public/docs/wsp/BINARY_FORMAT.md`. El contrato del kernel es el
struct de 16 B.

---

## 7. RX-DIB (Data Interchange Bus)

**RX-DIB** es el bus de intercambio de la **línea host NAVI 5**, no un
driver del unikernel.

Vive en `navi5_engine.py` (`RXDIBPacket`, `RXDIBBus`, `ROGEXWSPCodec`).
Sirve para que varias instancias del lab cooperativo se hablen **sin
red** (air-gap): cola in-process + volcado atómico a tmpfs
(`/tmp/rxdib`, Docker volume `rxdib_volume`).

Un paquete DIB lleva:

- `src_id` / `dst_id`
- lista de **símbolos WSP** (frames de 16 B)
- `priority`, `sequence_num`
- checksum SHA-256 recortado a 16 hex

El códec WSP del host mapea bytes/texto → 4 átomos + 6 ejes + dominio,
reutiliza diccionario, y ante ruido intenta vecino más cercano + CRC8.

**Entrenamiento “pacífico”** (`run_peaceful_training.py`):

1. Fase 1 — oráculos / corpus.
2. Fase 2 — **ingesta WSP → inyección RX-DIB**.
3. Instancias cooperan. KCC: **0 destruidas**.

RX-DIB **no** es Rogex Wired (eso es Ethernet 0x88B5 en el kernel).
**No** está en la ISO 9 como syscall. Es fontanería del laboratorio
host / Docker.

---

## 8. PRISMA (la otra pata)

| Pieza | Estado |
| --- | --- |
| PRISMA 3.2 research (Python/MNE) | Activo. 73.3 % raw LOSO → 91 % personalizado (EC/EO) |
| PRISMA Engine 0.1.0 (Rust) | **Shipped** Win/macOS/Linux. SPSC, Δ-mod, LIF AVX2, STDP, GUI egui |
| PRISMA 5 SNN | **Roadmap.** Sin instalador. Kernels del Engine ≠ producto P5 |
| Path clínico | **Nunca** en este lab, con este corte |

El día del NPU, PRISMA entrega spikes. NAVI decide. rxOS transporta.
No se fusionan.

---

## 9. Qué falta (inventario honesto)

### Silicio y Nivel 3

- 0 placas Akida / Loihi en el lab.
- `neurocpu akida` se niega. Eso es correcto.
- Sin USB XHCI bare-metal (o probe PCIe) no hay kit USB.
- Sin HPET/LAPIC el sustrato sigue a 10 ms (PIT 100 Hz).
- Sin tabla CPU vs NPU **medida en los dos lados**, no se publica un vatio NPU.

### Sistema operativo

- TLS de cuerpo HTTPS.
- DHCP genérico (hoy: static / slirp QEMU).
- Wi-Fi (RTL8188EE): no es “un driver”, es 802.11 + WPA2 + regulatory.
- UEFI nativo (BIOS/CSM funciona).
- AHCI (el disco del HP de referencia no habla IDE).
- Mapear > 4 GiB (hace falta higher-half).
- SMP, ring 3, preemption.
- Instalación a disco al 100 % (hay wizard; no es el default cerrado).
- Auditoría externa de crypto.

### NAVI

- 7-NPU: criterios de `NAVI7.md` (placa + Hamming software vs NPU +
  ISO + julios + fallback). Falta el punto 1 → no se llama 7-NPU.
- NAVI 8 / 9 / 10: **nombres de pareja**, no ramas.
- Pesos ternarios *aprendidos* de verdad (el `.bin` es un run corto).
- Léxico abierto / castellano real. 6.6 es un tablero de relés.
- Texto más largo que n-gramas / fichas.

### RX-DIB / host lab

- No hay DIB en el kernel.
- El air-gap Docker es el recinto. No es una malla de producción.

### Producto / empresa

- EternalEclipse.com no es la marca viva.
- EchOS no tiene ISO ni API.
- PRISMA 5 no se descarga.
- No hay ronda cerrada documentada aquí.
- Lanzamiento “diciembre 2026” es **objetivo de suite**, no una fecha de Eclipse.

---

## 10. Qué haremos a continuación (orden, no calendario)

El lab publica **orden que se puede fallar en público**. No hay fecha
del 10/10.

### Ahora — frente vivo (9 / 7-WORLD)

1. Pulir rxOS 9: red útil (`www`, HTTPS body), Explorer/Ajustes, Photos.
2. Crecer el catálogo 7-WORLD (fichas + harvest) **sin** rellenar huecos.
3. Mantener el pin: 8.5/6.5 = julios; 9/7 = ISO.

### Siguiente ingeniería de SO (exige el Nivel 3)

1. USB XHCI o MMIO PCIe.
2. Reloj < 10 ms (HPET / LAPIC).
3. AHCI en el HP de referencia.
4. Comprar / pedir kit AKD1000. Hasta entonces el hook se niega.

### Cianotipo Akida (fases A → G)

| Fase | Qué cierra | Bloqueado por |
| --- | --- | --- |
| A | `.fbz` de Q6 en simulador MetaTF | Nadie. Se puede empezar |
| B | Kit en un Linux del lab | Comprar la caja |
| C | USB/PCIe en rxOS | Pila + IDs |
| D | `HardwareDriver` + `program` | C + docs BrainChip |
| E | Offload Q6 48/48 en silicio | D |
| F | Blob `NAVI7W01` + ISO | E + energía medida |
| G | PRISMA → mismo driver | F + HAL P5 |

Sin E no se nombra NAVI 7-NPU.

### Parejas estratégicas (visión pública)

- **NAVI 8 + rxOS 9** — siguiente órbita sobre el 9. Sin spec de código.
- **NAVI 9 + rxOS 10** — el SO salta.
- **NAVI 10 + rxOS 10** — El Eclipse. Único hito que autoriza el rebrand.
- **Eternal Eclipse + Knights** — logia de I+D / plaza. No se borra el club.
- **EchOS** — una ISO, Echo, API a Internet. Se cuenta. No se cobra.

### Empresa

- Seguir el GTM developer-first: papers, ISO, `/roadmap`, newspaper.
- PRISMA Engine como único binario nativo cobrable-adyacente; P5 no se
  reetiqueta.
- Pre-seed 150 k€: validar metal + (si llega) NPU. Sin NPU el pitch
  sigue siendo software medible, no silicio.

---

## 11. Cómo comprobar este papel

```bash
# ISO 9
# https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0

./navi7 --bench          # 15/15, 73 fichas
./navi65 --ask "1+9*2"   # 19, entero
make fire                # Q6_1BIT 48/48
# dentro de la ISO: tecla v · /prove · navi joules (metal) · neurocpu akida
```

Lectura:

| Doc | Para qué |
| --- | --- |
| [ETERNAL_ECLIPSE.md](ETERNAL_ECLIPSE.md) | Pin de parejas + rebrand |
| [CIANOTIPO.md](CIANOTIPO.md) | Plano rxOS / NAVI / PRISMA / Akida |
| [NAVI7.md](NAVI7.md) | 7-WORLD vs 7-NPU |
| [NAVI65.md](NAVI65.md) | Contrato RLC |
| [RXOS9.md](RXOS9.md) | Qué es la ISO de hoy |
| [HP_AC195NL_85.md](HP_AC195NL_85.md) | Julios de un portátil real |
| [SPEC WSP](/docs/wsp-spec) | Átomos y ejes |
| RFC Q₆ | Hipótesis + campaña abierta |

Experimental. No clínico. GPLv3 en el árbol rxOS.
Knights Labs / Rogex Laboratories · 2026.
El pin no se mueve con un rename.
