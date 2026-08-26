# epk — paquetes locales

`epk` es el gestor de 2.0. No es `apt`. No es `pkg_add` de OpenBSD,
aunque los subcomandos se parezcan. **No abre sockets.**

## Por qué local

En 1.0 el canal `https://www.rogexlaboratories.com/rx-os/packages`
me parecía cómodo y me acabó oliendo a “el OS llama a casa”. En 2.0
el catálogo viaja **en la ISO** (`/media/epk`, `media/epk/INDEX`).
El kernel tiene un mirror en `userland/cli/epk.c`. Si no está en el
medio, no se instala. Punto.

## Comandos

```text
epk list
epk info [pkg]
epk search <palabra>
epk install <pkg>      # alias: epk_add
epk remove <pkg>       # alias: epk_delete
epk apply <edition>    # minimal|complete|edge|server
epk stress [N]         # install/remove, delta Heap-0
```

`epk apply` lee `editions/<ed>.manifest` y mete todo lo que quepa.

## Qué es un “paquete” aquí

RXFS no traga CPython. Un `.epk` de Complete a menudo es **marcador**:
nombre, nota en `/bin`, fila en `/epk/db`. El ELF de verdad, si existe,
se enlaza en **host** contra `echlibc` (`packages/`). Dentro del LIVE,
comandos de toolchain (`tcc`, `python`, `qjs`, `rustc`, `make`, `nasm`,
`git`, `httpd`) pueden ser stubs: el nombre responde, el compilador de
200 MiB no está.

Eso no es un truco para `epk list`. Es el tamaño del FS. Cuando RXFS
crezca, los stubs se caen. Hasta entonces, “not installed” vs stub
LIVE: el stub existe para que no te diga *command not found* cuando
acabas de leer `epk list` y ves `tcc`.

## Dónde vive

```text
/epk/db            registros
/epk/manifests     edición activa
/bin               notas / stubs
/media/epk         catálogo ISO (GRUB module / isodir)
```

Formato host: RXP1, el mismo que `rx-pkg` de 1.0 (`packages/SPEC.md`).
Binario de Linux: `packages/bin/epk`.

## LIVE

`epk_live_all()` marca el catálogo como disponible. `g_live_world`.
No significa que CPython quepa. Significa que la política de edición
no te esconde nombres.

## Relación con `rx app`

`rx app add` es el canal legado, *opcional*, y pide `www on`. En 2.0
no es el camino. Lo dejo por no romper scripts de 1.0. El camino es
`epk`.

## echlibc

`packages/echlibc/`. libc mínima para ELF estáticos *de host hacia
echOS*, no para el kernel. Syscalls de mentira: `sys_open` `sys_read`
`sys_write` `sys_mmap` `sys_spawn`. `mmap` = ventana BSS 64 KiB.
No hay `malloc` de glibc en ese contrato. Los `packages/coretools/*`
en Linux *sí* usan malloc: son binarios de Fedora, fuera de Heap-0.

Triples que quiero (aún host `x86_64-unknown-none`):

- `x86_64-unknown-echos`
- `aarch64-unknown-echos`
- `i686-unknown-echos`

Ver `docs/ECHOS_TARGET.md`.

— R.N.
