# Construir echOS 2.0

Host típico: Linux x86_64, clang, nasm, ld.lld, grub2-mkrescue,
xorriso, qemu-system-x86_64, rustc/cargo para `rogex-core`.

```sh
make EDITION=universal
make EDITION=universal iso-vm iso-metal
make EDITION=universal run
```

Salida:

```text
build/rxos.elf
build/rxos.bin
build/EchOS-2.0.0-universal-vm.iso
build/EchOS-2.0.0-universal-metal.iso
```

## Flags que importan

`EDITION=universal` define `-DECHOS_EDITION_UNIVERSAL=1` →
`ECHOS_CLI_ONLY`, `ECHOS_VERSION 2.0.0`, sin desktop.

Otras: `complete` `minimal` `edge` `server` `dev`. Dev activa
atajos de teclado que en usuario real no quiero.

## Herramientas

```text
clang --target=x86_64-none-elf
nasm -f elf64
ld.lld -T linker.ld
llvm-objcopy -O binary
grub-mkrescue | grub2-mkrescue
```

`CFLAGS`: freestanding, no pic, no red zone, no sse, mcmodel
kernel, C17, `-O2`. Headers: cada directorio de `C_DIRS` en el
Makefile.

Rust: `rogex-core` target `x86_64-unknown-none` `--release`.
Se enlaza el `.a`.

## Dónde está el 2.0 en el árbol

```text
userland/cli/          wizard tui epk echofetch nano man netcli live
drivers/npu/akida.*
arch/echos_arch.h
editions/*.manifest
boot/grub/grub-universal.cfg
packages/echlibc/
packages/epk/
media/epk/
docs2.0/               esto
```

`docs/` (sin 2.0) es el archivo histórico. No lo uses como
especificación de Universal.

## Tests que yo corro

```sh
# smoke viejo (1.x, serial, a veces desfasado)
# tools/smoke_test.sh

# lo que de verdad uso para 2.0:
# QEMU + serial: q, luego man / ipconf / www on / tls / halt
```

El smoke de `tools/smoke_test.sh` todavía habla de `/home` y halt
de RXos 7. No es la biblia de 2.0. Si falla, mira la fecha.

## Host helpers

```sh
cc -std=c99 -o echos-install tools/echos-install-host.c
cd packages && make && make test    # coretools Linux, 1.0/2.0
```

## macOS

Apple Silicon: TCG, `make run-macos`. No HVF. Ver `docs/macos-m1.md`.

## No hagas

- `make` sin `EDITION=universal` y esperar 2.0 (cae a Minimal 1.0).
- Flashear la ISO *vm* a un USB y extrañarse del VESA.
- Montar NVMe y abrir issue de “no instala” — no hay driver.
- Medir Heap-0 con un `kmalloc` en el medio y citar el slogan.

## Licencia

GNU GPLv3. El código es el árbol. Los blobs de pesos NAVI son
módulos; si entrenas los tuyos, sustituye el `.bin` y
`iso-refresh`.

Sitio: https://www.rogexlaboratories.com

— R.N.
