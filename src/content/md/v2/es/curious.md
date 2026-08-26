# Para curiosos

Te gusta leer manifiestos a las tres de la mañana. Bien.

## La tesis

Un sistema operativo no tiene por qué ser un zoo de procesos. Puede ser
**un programa** que duerme hasta que pasa algo (tecla, paquete, spike).
Cuando no hay evento, `HLT`. Eso ya estaba en rxOS. En 2.0 lo dejé
desnudo: sin ventanas que disimulen el modelo.

Heap-0 es la otra mitad de la tesis. No malloc en el camino caliente.
Regiones estáticas, nombres, tamaños, listadas. Si NAVI reserva con
`kmalloc` (el actor viejo lo hace), **está documentado como fallo del
contrato**, no escondido. Ver [limites.md](/docs/limits).

## Por qué consola

Porque un WM es un producto distinto. 1.0 ya lo es. Mezclar los dos en
la misma ISO me daba un Frankenstein: el LIVE arrastraba el dock, el
Edge “sin GUI” tenía restos de Aero, y el verde cyberpunk se comía el
framebuffer.

2.0 es cruel a propósito. O hay texto o no hay producto.

## El logo Braille

El droplet de echofetch es Unicode U+2800–U+28FF. En un terminal Linux
se veía. En el OS no: `console_putc` tiraba todo `c >= 0x80`. Lo arreglé
decodificando Braille a puntos 2×4 en el glifo 8×16. Si ves el logo a
la izquierda de las specs, es eso. Si ves huecos, estás en un serial
que no pinta UTF-8.

No es FIGlet. El banner de boot *sí* es FIGlet. Son dos marcas: banner
de máquina, tarjeta de sistema.

## OpenBSD, sin ser OpenBSD

`doas` no aísla anillos. Somos un unikernel: un espacio de direcciones.
`/etc/doas.conf` es **política escrita**, no un LSM. `pfctl` guarda
flags. `rcctl enable httpd` anota un daemon que en Server todavía es
intención más que proceso. Prefiero un flag honesto a un sshd de juguete
que finge OpenSSH.

Los nombres están para que un admin de BSD se siente y no busque `sudo`.

## Neuromórfico sin teatro

El SNN corre en software LIF sobre x86_64. Akida AKD1000 se **sonda**
en PCI (`1e7c:bca1`). Si no hay placa, `hwprobe` dice *absent
(software LIF)* y `neurocpu akida` se niega. Nunca he pintado un NPU
fantasma para la demo.

PRISMA 5 mete EEG → spikes. `bench-snn` te suelta sparsity, microsegundos,
mW estimados y el delta de Heap-0. Números de laboratorio, no de datasheet
BrainChip.

## La red como herramienta, no como producto

`curl` y `wdl` existen porque yo los necesito en LIVE: bajar un HTML,
hacer un POST, mirar cabeceras, sin abrir Nova. TLS 1.3 está ofertado
(AES-128-GCM, P-256, SHA-256). El handshake contra example.com cierra.
El GET https del cuerpo todavía puede volver vacío: las claves de
aplicación no son el handshake. Lo dejo escrito para que no salga un
hilo de “curl https no funciona” como si no lo supiera.

HTTP/1.0, un socket, SNI, sin pin de CA. Un laboratorio, no un Firefox.

## FHS soberano

Odio `/usr/local`. En 2.0 el árbol cabe en una servilleta. `/users` no
es `/home` con otro nombre por moda: es no heredar POSIX donde no hay
multi-user de verdad. `live` es un usuario. `root` es el mismo espacio.
`doas` es teatro útil.

## Si vienes de NAVI 10

`./navi10 --tui` en el host sigue siendo la mente SNN grande (WSP 16
bytes, CAM, DESCONOCIDO como virtud). Dentro de 2.0 tienes `navi2` /
`navi3` / `navi6` como comandos del unikernel. No es el mismo binario.
No prometo que el chat del host y el del kernel compartan pesos byte
a byte. Los blobs van de módulo GRUB (`navi2_weights.bin`, etc.).

La virtud se mantiene: si no hay extracto, se dice que no se sabe.

## Lecturas mías (si te aburres)

- [que-es.md](/docs/overview)
- [heap-0.md](/docs/heap-0)
- [neuromorfico.md](/docs/neuromorphic)
- El diario viejo: `docs/DIARIO.md` (rxOS 10 / NAVI 10, el cuaderno)

— R.N.
