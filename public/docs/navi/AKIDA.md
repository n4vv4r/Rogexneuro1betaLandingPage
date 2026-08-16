# Cómo se enchufa BrainChip Akida a rxOS y NAVI

**Estado: PLAN.** No hay placa Akida en el laboratorio. El interruptor
`neurocpu akida` existe y **se niega** si el silicio no aparece. Este
documento describe el gancho real, el contrato público de BrainChip y
los pasos que habría que cerrar para que NAVI 6.5 (y el 7) descarguen
spikes en el NPU. Nada de esto está entregado.

Fuentes oficiales (agosto 2026):

- IP: [brainchip.com/ip](https://brainchip.com/ip/)
- MetaTF 2.19.3: [doc.brainchipinc.com](https://doc.brainchipinc.com/)
- Engine C++: [doc.brainchipinc.com/user_guide/engine.html](https://doc.brainchipinc.com/user_guide/engine.html)

La librería Akida es **propietaria**. Los ejemplos van con Apache 2.0.
No copiamos su runtime al unikernel. Implementamos **nuestro**
`HardwareDriver` y hablamos el contrato que ellos publican.

## 1. Qué es Akida (hechos de su ficha, no de marketing nuestro)

Akida es un procesador neural **digital**, event-based, pensado para
borde. No es un memristor. No es un QPU. Encaja con rxOS porque **ya
habla enteros**.

| Generación | Pesos / activaciones | Qué aporta | Encaje rxOS |
| --- | --- | --- | --- |
| Akida 1 | 4, 2, 1 bit | CNP (convolución) + FNP (denso). Edge learning en la última FC | Candidato para Q6 / poblaciones SNN cuantizadas |
| Akida 2 | 8, 4, 1 bit | Skip connections, activaciones por LUT, TENNs / redes temporales | Candidato para PRISMA (series) y BufferTempConv |
| Akida Pico | 8 bit | Núcleo uW–mW. Keyword spotting, anomalías | MCU / wearables. No es el path del unikernel x86 |

Malla publicada: **1–128 nodos**, **128 MAC por nodo**, SRAM local
**50–130 KiB** por nodo, DMA, AXI hacia cualquier MCU o AP. Varias
capas sin despertar al host.

SoCs de referencia en MetaTF: `AKD1000()`, `AKD1500()`, mallas
virtuales `TwoNodesIPv1/v2` … `TwelveNodesIPv2()`, `PicoIP()`.

Aprendizaje en chip (Akida 1, no 2): solo la **última**
`FullyConnected`, pesos e inputs **binarios**, optimizador
`AkidaUnsupervised` (`num_weights`, plasticidad que solo baja). Eso
**no** es STDP de rxOS. Es another thing. Si lo usamos, se etiqueta
como *edge learning de BrainChip*, no como STDP del fabric.

Cifra suya, no nuestra: en el CLI de MetaTF, un DS-CNN en placa de
referencia marca **floor ~914 mW** y ~62 fps. Un AkidaNet/ImageNet
marca ~912 mW de suelo y ~23 mJ/frame. Eso es **su** tablero. Hasta
que midamos RAPL+NPU en el mismo chasis, no la repetimos como
resultado de Knights Labs.

## 2. El hook que ya está en el árbol

Hoy el único camino neuromórfico **ejecutable** es software LIF
Q16.16. El conmutador es real:

```
neurocpu            # imprime backend + por qué
neurocpu software   # siempre disponible
neurocpu akida      # "requested but not present — still on software"
neurocpu loihi      # igual
neurocpu cycle      # tecla b en el escritorio
```

Archivos:

| Pieza | Dónde | Qué hace hoy |
| --- | --- | --- |
| IDs | `kernel/event/rx_backend.h` | `RX_BACKEND_SOFTWARE \| AKIDA \| LOIHI` |
| Switch | `kernel/event/rx_backend.c` | `available(akida) == false` hasta que haya probe |
| Shell | `userland/shell/commands.c` | `cmd_neurocpu` |
| Fabric | `kernel/event/rx_actor.c` | LIF / STDP en CPU. Un umbral **nunca** cierra IRQ, disco ni red |

Contrato que no se rompe: *un umbral neuronal no decide un camino de
corrección*. Akida acelerará servicios blandos (NAVI, PRISMA, G_debug).
No va a firmar un ACK de Ethernet.

## 3. Dos pilas, dos sitios

BrainChip publica **dos** runtimes. Mezclarlos es el error habitual.

```
HOST Linux (laboratorio)
  TF-Keras / PyTorch
       │  quantizeml  (cuantiza)
       │  cnn2snn     (CNN → modelo Akida)
       ▼
  paquete `akida`  →  Model.save("navi7.fbz")
       │  Model.map(device)   # simulador o placa USB
       ▼
  sequences[].program        # blob que el chip entiende

UNIKERNEL rxOS (Nivel 3)
  Akida Engine (C++, MCU-oriented, `akida engine deploy`)
       │  HardwareDriver { read, write, scratch, visible_mem }
       │  HardwareDevice::program / enqueue / fetch
       ▼
  spikes o tensores uint8  ←→  tejido de eventos / WSP
```

El host **entrena y convierte**. El unikernel **solo programa e
infiere**. El Engine se despliega como fuentes C++ + FlatBuffers.
Licencia de BrainChip: hay que cumplirla; no la relicenciamos GPLv3.

## 4. Cómo se implementaría de verdad (cinco cerraduras)

Cada cerradura es un proyecto. Ninguna es “un fichero que falta”.

### Cerradura 0 — Laboratorio host (sin tocar el kernel)

1. Instalar MetaTF 2.19+ (`pip install metatf`). Simulador CPU, sin placa.
2. Tomar una red **entera** que ya existe: codebook Q6, o una
   población LIF de NAVI 5/6 cuantizada a 4/2/1 bit.
3. `quantizeml` → `cnn2snn` → `.fbz`. `akida run -m navi.fbz`.
4. Comparar `Model.forward` contra el LIF software. Si el acuerdo
   Hamming / top-1 baja de un umbral escrito, el mapa no sirve.
5. Opcional: kit USB AKD1000 en un Linux. Sigue sin ser rxOS.

**Criterio de cierre:** un `.fbz` reproducible + tabla “software vs
simulador” en `tests/`. Aún no hay NPU en la ISO.

### Cerradura 1 — Descubrir el silicio

`rx_backend_available(AKIDA)` pasa a true solo si el probe encuentra
el dispositivo.

- Kits de desarrollo: USB (XHCI + bulk). **Hoy no hay pila USB** en
  rxOS. La hoja de ruta de 4 niveles lo marca como prerrequisito
  duro del Nivel 3.
- IP embebida: AXI / PCIe. Haría falta BAR MMIO + IDs de
  `HwVersion { vendor_id, product_id, major_rev, minor_rev }`
  (cabeceras `akd1000` / `akd1500` del Engine).
- Sin documentación de registros, el driver no se inventa. Eso se
  pide a BrainChip **antes** de prometer una fecha.

**Criterio de cierre:** `neurocpu akida` imprime el `HwVersion` leído
del silicio, o se queda en software y lo dice.

### Cerradura 2 — HardwareDriver bare-metal

El Engine exige cuatro verbos. Eso **es** el gancho:

```
read(addr, dst, n)     // registros + memoria visible
write(addr, src, n)
scratch_memory()       // temporal de program/infer
akida_visible_memory() // buffers de entrada/salida
```

Encima: `HardwareDevice::create(driver)` → `program(sequence)` →
`set_batch_size` → `enqueue(Dense uint8)` → `fetch`.

En rxOS eso vive en un actor del fabric (`rx_actor`), no en una
ISR. El pump entrega un lote; el fetch publica un `rx_event_t`
blando. Si el NPU no contesta, el backend vuelve a software y el
status lo cuenta.

**Criterio de cierre:** un `navi6 bench` / `navi65` con backend
akida produce la misma clase de salida que el software en un
vector de test fijo, más `inference_clk` y julios **medidos**.

### Cerradura 3 — Codec: WSP / SNN → tensor Akida

Akida come tensores `uint8` forma `(n, x, y, c)` con 1, 2, 4 u 8
bits. NAVI habla **otra cosa**:

| Origen | Qué es | Cómo entra a Akida |
| --- | --- | --- |
| WSP 16 B | 4 átomos + E[6] int8 | `InputData` 1×1×16, o 6 canales de ejes |
| Q6 | 64 neuronas, codebook [6,3,3] | mapa 8×8×1 de bits de spike |
| NAVI 5/6 SNN | LIF+STDP host | raster cuantizado, o solo la capa densa |
| PRISMA | Δ-mod → spikes | `InputData` o `BufferTempConv` (Akida 2) |
| G_math / G_reason / DAG | no es una CNN | **se quedan en CPU** |

Regla: el NPU no sustituye a NAVI 6.5. Sustituye las **poblaciones
que disparan**. El bucle PARSE-RETRIEVE-INFER-VERIFY-RENDER sigue
en el host. `G_rxos` sigue siendo la lista blanca. Un umbral de
Akida no ejecuta `status`.

### Cerradura 4 — Energía comparada, o no se publica el número

Nivel 3 de la hoja de ruta pide **CPU contra NPU, ambas medidas**.
Protocolo:

1. Misma carga (un `.fbz` + el LIF software equivalente).
2. Host: RAPL (`navi joules` / `power`). QEMU se rechaza.
3. NPU: `device.soc.power_measurement_enabled` si el kit lo da;
   si no, shunt en la placa y se dice.
4. Se publican floor, media, mJ/inferencia, `inference_clk`.
5. Si falta un lado, no hay tabla.

## 5. Qué haría NAVI 6.5 el día que haya placa

6.5 ya es el modelo RLC oficial. Akida no le cambia las máscaras.

- `G_debug` / `G_reason`: el world-model y el DAG se quedan en
  CPU. El NPU puede rankear opciones si mapeamos el escenario a
  una densa pequeña.
- `G_code` / `G_math` / `G_talk`: no hay nada que offload.
- SNN interna (`navi6_snn`, Q6): candidata a `.fbz`.
- `./navi65 --ask` en host puede, **antes** que el unikernel,
  llamar al simulador MetaTF. Eso es laboratorio, no ISO.

El blob futuro (`NAVI7W01`, ver [NAVI 7](/docs/navi7)) llevaría el
`.fbz` como módulo GRUB, igual que hoy `navi6_weights.bin`.

## 6. Qué no vamos a afirmar

- Que “rxOS corre en Akida”. El SO corre en x86_64. Akida es un
  **coprocesador**.
- Que Q-WSP son qubits en el NPU.
- Que el edge learning de BrainChip es nuestro STDP.
- Que hay fecha de ISO con NPU sin placa en el lab y sin pila USB
  o MMIO.
- Que Loihi está al mismo nivel de acceso: es vía de investigación,
  peor documentada para un unikernel.

## 7. Cómo comprobar que este papel no es teatro

```
neurocpu akida
# hoy: "akida requested but not present — still on software"

python3 tests/test_navi65.py
# 16/16, sin NPU. El RLC no depende del chip.

# el día que exista la placa, la prueba nueva será:
#   neurocpu akida          → HwVersion impreso
#   navi65 --ask "…"        → misma máscara, backend=akida
#   navi joules             → dos columnas, no una
```

Siguiente lectura: [Cianotipo](/docs/cianotipo) · [NAVI 7](/docs/navi7) ·
[NAVI 6.5](/docs/navi65) · [hoja de 4 niveles](/docs/rxos/rxos_hoja_de_ruta_4_niveles_rev1.3.pdf).
