# RXos v4.1.1 — Rogex Laboratories

**Sistema operativo experimental bare-metal x86_64. La visión: el SO es un
navegador con una cuenta en la red descentralizada `rgx://`.**

Este documento acompaña a la ISO (`RXos-v4-foundation.iso`) y explica qué
contiene, cómo se hizo, y hacia dónde va — separando siempre, con etiquetas,
lo **IMPLEMENTADO** (verificado en QEMU con tests automatizados) de lo
**PLANIFICADO** (diseño, aún no código). Esa honestidad es política de
proyecto, no cortesía.

> Copia canónica: `docs/VISION.md` en el repositorio. Documentación técnica
> completa: `README.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `BUILDING.md`,
> `CHANGELOG.md` y `docs/` del repo.

---

## 1. Cómo ejecutar esta ISO

```bash
# QEMU (recomendado):
qemu-system-x86_64 -machine q35 -m 512M -cdrom RXos-v4-foundation.iso -serial stdio

# Con persistencia real (disco ATA):
qemu-img create -f raw rxos-disk.img 512K          # o `make disk` desde el repo
qemu-system-x86_64 -machine pc -m 512M -cdrom RXos-v4-foundation.iso \
    -drive file=rxos-disk.img,format=raw,if=ide -serial stdio
# dentro de RXos:  format hda yes  →  save   (y al reiniciar: "Welcome back")

# USB / hardware real (BIOS/CSM):
dd if=RXos-v4-foundation.iso of=/dev/sdX bs=4M status=progress
```

Al arrancar: banner de estado verificado (cada `OK` se imprime solo si esa
etapa se comprobó de verdad), setup de pseudónimo ligado al UID hardware, y
el escritorio. Prueba: `help`, `status`, `ls`, `write hola.txt hola`,
`go rgx://hello`, `devices`, `uptime`.

---

## 2. Todo lo que ya está IMPLEMENTADO (verificado)

**Núcleo**
- Boot GRUB/Multiboot2 → modo largo x86_64; GDT plana; IDT con excepciones.
- Interrupciones hardware: remapeo del PIC 8259; PIT a 100 Hz en IRQ0
  (uptime real); **teclado por IRQ1 y ratón por IRQ12** que publican eventos
  en la cola IPC del kernel; la CPU duerme con `hlt` cuando no hay eventos.
- Memoria: gestor físico (mapa Multiboot2), paginación de 4 niveles
  (mapeos de 4 KiB para LFB/MMIO), heap del kernel (`kmalloc`/`kfree`).
- Logging (`klog_*`), pánico, registro de dispositivos (`devices`).

**Almacenamiento y ficheros**
- Capa de dispositivos de bloque + ramdisk de 512 KiB.
- **Driver ATA PIO** (LBA28, flush tras escritura, timeouts acotados).
- RXFS: filesystem nativo (crear/leer/escribir/listar/borrar/renombrar/
  copiar) tras una capa VFS.
- **Persistencia real entre reinicios** (opt-in): imagen "RXF1" en disco,
  `save`/`load`/`format hda yes` con guarda anti-MBR, restauración
  automática al arrancar y perfil con "Welcome back". Amnésico por defecto.

**Interfaz**
- Framebuffer 1280×720×32 con fuente Latin-1, 4 temas en vivo, cursor
  software estilo Win95 y **todo clicable** (nav izquierda, tiles, botones).
- Escritorio con vistas: Home, Social, Laws, You (cuenta), Settings
  (tema/email/teclado/periféricos), Terminal, **Editor** (mini-IDE: números
  de línea, caret por click, Save/Run).
- Shell: 20+ comandos robustos (`help about status mem uptime devices ls
  cat write rm rename copy run apps save load format clear reboot halt`…).
- Teclado US/ES completo (ñ, ¿¡, acentos con teclas muertas, Supr).

**Runtime y contenido**
- **Roxenite (RX-C)**: lenguaje nativo de apps (sección 3).
- Enrutado `rgx://` local: vistas → paquetes `.rgxsite` verificados →
  apps RX-C servidas desde RXFS → páginas integradas → error amable.
- REVM: VM de bytecode sellado bajo ML-KEM (fuzzeada: 0 crashes).
- Núcleo criptográfico Rust `no_std`: ML-KEM-768 (FIPS 203),
  ChaCha20-Poly1305 (KAT RFC 8439 en cada boot), SHA3, identidad por UID
  hardware + consenso Proof-of-Report. **Sin auditoría externa** — se dice
  tal cual.

**Calidad**
- Self-tests en cada arranque (heap, IPC, RXFS completo, crypto, REVM,
  tamper). Dos suites automatizadas: `make test` (26 asserts, boot+shell+
  ficheros+rgx) y `make test-disk` (9 asserts, doble arranque con
  persistencia). Build con cero warnings.

**STUB / honesto**: scheduler, tabla de procesos y syscalls son superficies
de API reservadas (unikernel monohilo); lo dicen en el arranque y en
`status`. Sin red aún (sección 4). Solo BIOS boot.

---

## 3. Cómo se hizo Roxenite (RX-C), el lenguaje

**Filosofía**: una persona hablándole a la máquina — palabras antes que
símbolos, declarativo antes que imperativo, seguro por defecto. No es "C
reescrito": una página *es* una app, y una app se describe.

```
app "Hola"
state visitas is 1
page home:
  title "Hola desde rgx://hola"
  text "Esta página la sirve Roxenite desde RXFS."
  value visitas
  button "Contar visita":
    add 1 to visitas
  button "Leer las Leyes" opens "rgx://laws"
```

**Cómo está construido** (`userland/runtime/roxenite.c`, C freestanding):

1. **Tokenizador** línea a línea: palabras, cadenas entre comillas, `:` como
   token propio, comentarios `//` y `note`.
2. **Parser** de una pasada a un AST de arrays fijos (sin heap: 16 estados,
   8 páginas, 96 nodos, 32 botones, 64 acciones) — en un kernel, la memoria
   dinámica es el primer enemigo; los límites fijos hacen imposible el OOM.
3. **Intérprete** que camina el AST: renderiza cada página con el renderer
   del escritorio (los botones son hitboxes clicables) y ejecuta acciones
   (`add`, `set`, `open`, `print`, `clear`) al pulsar.
4. **Errores humanos**: cualquier fuente mal formada produce `RX-C error:
   ...` legible; jamás tumba el OS (regla verificada por test).
5. **Sandbox por construcción**: el lenguaje no tiene punteros, memoria,
   E/S ni acceso al kernel — una app solo puede pintar UI, navegar rgx:// y
   mutar sus propios estados.

**El futuro del lenguaje** (v4.3, PLANIFICADO): compilar RX-C a bytecode
`.rxbc` para el **REVM** — la VM ya existente que solo ejecuta contenedores
sellados con ChaCha20-Poly1305 bajo la clave ML-KEM de sesión (si el
contenedor fue manipulado, la autenticación falla y el código nunca corre).
La tabla de opcodes está especificada en `docs/OPCODES.md` y el intérprete
sobrevivió fuzzing con sanitizers. Ese pipeline (fuente → rxbc → VM sellada)
es también la puerta a otros lenguajes (sección 7).

---

## 4. El protocolo de red `rgx://` — cómo se hará

**Hoy (IMPLEMENTADO, local)**: `rgx://<nombre>` se resuelve en este orden —
vistas del sistema → paquetes `.rgxsite` (cada asset verificado por
SHA3-256 + dirección de contenido; 1 byte alterado = rechazo, probado en
cada boot) → apps Roxenite en RXFS → páginas integradas → "Not found".
No hay driver de red: **nada pretende salir de la máquina**.

**El diseño (PLANIFICADO, v4.4)** — decisiones ya tomadas:

1. **Driver NIC**: virtio-net (y/o e1000) — frames Ethernet crudos que el
   handler de IRQ publica como `MSG_FROM_NIC` en la **misma cola IPC** que
   ya transporta teclado y ratón. El patrón productor-ISR → cola →
   consumidor ya está probado end-to-end.
2. **Sin stack TCP/IP completo**: la malla no necesita HTTP ni DNS. Un
   protocolo minimalista sobre capa 2 (EtherType propio): descubrimiento de
   vecinos por broadcast, y sesiones por pares.
3. **Identidad = criptografía, no IP**: cada terminal se presenta con su
   pseudónimo ligado al UID hardware; cada sesión abre con un **handshake
   ML-KEM-768** (el que ya pasa self-test en cada boot) y cifra con
   ChaCha20-Poly1305. La admisión a la malla consulta la blacklist de
   Proof-of-Report (ya implementada en memoria).
4. **Garlic wrapping**: los datagramas viajan envueltos por saltos con
   claves por-hop (el scaffold existe en `rogex-core/mesh.rs`) — privacidad
   de metadatos como objetivo de diseño, no promesa de anonimato.
5. **Resolución de nombres**: DHT donde `rgx://<nombre>` mapea a una
   **dirección de contenido** (hash del sitio) — exactamente el content-id
   que los `.rgxsite` ya calculan y verifican hoy. Las firmas de publicador
   (ML-DSA/FIPS 204) añadirán "quién", no solo "qué".
6. **Criterio de "hecho"**: dos instancias de QEMU intercambiando una
   página `rgx://` autenticada — hasta que exista esa demo reproducible, la
   red seguirá etiquetada TODO. Sin excepciones.

---

## 5. Roadmap: de aquí al Desktop + File Manager + RXbrowser

| Versión | Contenido | Estado |
|---|---|---|
| v4.0 Foundation | arquitectura por capas, boot verificado, memoria, IRQs, VFS/RXFS, shell, init, docs, tests | ✅ HECHO |
| v4.1 Persistence | driver ATA PIO, save/load/format, perfil "Welcome back" | ✅ HECHO |
| v4.1.1 Input | IRQ1/IRQ12 → cola IPC, `hlt` idle | ✅ HECHO |
| v4.2 Desktop | **virtio-blk** (persistencia también en q35) · **sistema de ventanas** (ui/window.c: paneles móviles, z-order sobre los widgets/hitboxes ya existentes) · **file manager** (RXFS visual: abrir/renombrar/copiar/borrar con ratón) · **launcher** de apps .rxc | ⏳ SIGUIENTE |
| v4.3 Roxenite | funciones/bucles/listas, compilación a `.rxbc`, sandbox con presupuesto de instrucciones y namespace de FS por app, rutas rgx:// multi-segmento | planificado |
| v4.4 Red | virtio-net/e1000, malla L2, handshake ML-KEM por sesión, DHT de nombres, **demo de dos nodos** | planificado |
| v5 RXbrowser | ver abajo | planificado |

**RXbrowser — el único programa.** La tesis de RXos desde el día uno es que
el SO *es* un navegador con cuenta. El shell actual ya se comporta así
(barra de navegación, `go rgx://…`, cuenta, páginas). RXbrowser es la
culminación: cuando existan ventanas (v4.2) y red (v4.4), el escritorio se
reorganiza en **una sola aplicación** — pestañas de páginas rgx://,
historial, marcadores, tu identidad como sesión — y todo lo demás (editor,
file manager, settings, terminal) pasa a ser páginas `rgx://` internas
renderizadas por el mismo motor. Un programa, una red, una identidad.

---

## 6. Multiusuario — cómo lo prevemos

Por fases, cada una útil por sí sola (PLANIFICADO):

1. **Multi-perfil local** (tras v4.2): varios perfiles en RXFS
   (`profile.<nombre>`), pantalla de selección al arrancar, espacios de
   ficheros separados por prefijo de namespace en el VFS (la capa ya
   normaliza rutas — añadir prefijos por usuario es un cambio contenido).
2. **Identidad criptográfica por usuario**: cada perfil = su par ML-KEM +
   pseudónimo ligado al UID del terminal (la primitiva `pseudonym_bind` ya
   existe). "Iniciar sesión" = desbloquear tu clave, no una contraseña
   simulada — no fingiremos seguridad multiusuario antes de tenerla.
3. **Aislamiento real**: primero por software (apps .rxbc con presupuesto y
   namespace propios — v4.3), después por hardware (ring 3 + espacios de
   direcciones por usuario). Las superficies ya reservadas (`process.h`,
   `syscall.h`) existen exactamente para esto: la API no cambiará cuando
   llegue la implementación.
4. **Multiusuario de malla**: en la visión final, un "usuario" es una
   cuenta de la red rgx:// — tu identidad viaja contigo entre terminales;
   el terminal solo la hospeda.

---

## 7. Otros lenguajes de programación — cómo lo prevemos

Tres vías complementarias, de menor a mayor ambición (PLANIFICADO):

1. **Todo compila a REVM (.rxbc)**: el bytecode es la ABI estable de RXos.
   Cualquier lenguaje con un backend que emita opcodes RXIR (la tabla está
   versionada en `docs/OPCODES.md`) corre sellado bajo ML-KEM, con los
   mismos límites de memoria/instrucciones. Roxenite será el primer
   frontend; nada impide un segundo.
2. **WebAssembly como target universal**: un intérprete WASM mínimo (sin
   WASI completo; solo las syscalls de RXos) permitiría compilar C, Rust o
   Zig existentes hacia RXos sin portar libc. Encaja con la sandbox por
   verificación de límites que ya practica el REVM.
3. **Intérpretes embebidos como apps**: lenguajes pequeños y freestanding
   (un Lua o MicroPython `no_std`) enlazados contra la tabla de syscalls —
   que se mantiene como STUB congelado precisamente para que estos puertos
   tengan una interfaz que no se mueva.

Lo que **no** haremos: emular POSIX/Linux. RXos no quiere ejecutar
programas de otros sistemas; quiere que otros lenguajes escriban programas
*de RXos*.

---

## 8. Por qué este proyecto no va a quedar abandonado

No se puede prometer futuro; se puede **construir estructura que haga
barato continuar y caro romper**. Es lo que hemos hecho:

- **Tests que guardan la puerta**: 35 aserciones automatizadas en dos
  suites (`make test`, `make test-disk`). Cualquier regresión se ve en
  minutos; cada feature nueva añade sus aserciones. Nada se declara hecho
  sin demo reproducible en QEMU.
- **Honestidad ejecutable**: cada subsistema se etiqueta IMPLEMENTED /
  PARTIAL / STUB / TODO *en el propio OS* (`status`, `devices`, banner de
  boot) y en los docs. Quien lee el código encuentra exactamente lo que los
  docs prometen — eso es lo que hace que un contribuidor se quede.
- **Interfaces congeladas**: `blockdev_t`, `vfs_ops_t`, la cola IPC,
  `irq_register`, la tabla de syscalls. Cada pieza nueva (el driver ATA, el
  input por IRQ) entró como módulo contenido sin tocar a sus vecinos — y
  así entrarán virtio-blk, la NIC y las ventanas.
- **Roadmap de bocados pequeños**: cada versión (v4.0 → v4.1 → v4.1.1) fue
  un incremento completo, testeado, documentado y commiteado. Un proyecto
  muere cuando su siguiente paso es demasiado grande; aquí el siguiente
  paso siempre cabe en una sesión de trabajo.
- **Build a prueba de futuro**: toolchain estándar de Fedora (clang, nasm,
  lld, cargo, QEMU), cero dependencias exóticas, headers generados
  commiteados (compila sin Python), `tools/check_toolchain.sh` y
  `BUILDING.md` para reconstruir el entorno desde cero en minutos.
- **Historial disciplinado**: CHANGELOG por versión, commits descriptivos,
  capturas y logs de verificación en el repo. La arqueología del proyecto
  está escrita — cualquiera (incluidos nosotros en seis meses) puede
  retomar el hilo exacto.

---

*RXos v4.1.1 — Rogex Laboratories. Software de investigación experimental.
No es un producto, no es clínico, no está auditado. Licencia: pendiente de
elegir (ver LICENSE). El código dice la verdad.*
