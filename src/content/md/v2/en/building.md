# Building echOS 2.0

Typical host: Linux x86_64, clang, nasm, ld.lld, grub2-mkrescue, xorriso,
qemu-system-x86_64, rustc/cargo for `rogex-core`.

```sh
make EDITION=universal
make EDITION=universal iso-vm iso-metal
make EDITION=universal run
```

Output:

```text
build/rxos.elf
build/rxos.bin
build/EchOS-2.0.0-universal-vm.iso
build/EchOS-2.0.0-universal-metal.iso
```

## Flags that matter

`EDITION=universal` defines `-DECHOS_EDITION_UNIVERSAL=1` →
`ECHOS_CLI_ONLY`, `ECHOS_VERSION 2.0.0`, no desktop.

Others: `complete` `minimal` `edge` `server` `dev`. Dev enables keyboard
shortcuts I do not want on a real user machine.

## Toolchain

```text
clang --target=x86_64-none-elf
nasm -f elf64
ld.lld -T linker.ld
llvm-objcopy -O binary
grub-mkrescue | grub2-mkrescue
```

`CFLAGS`: freestanding, no pic, no red zone, no sse, kernel mcmodel, C17,
`-O2`. Rust: `rogex-core` target `x86_64-unknown-none` `--release`.

## Where 2.0 lives in the tree

```text
userland/cli/          wizard tui epk echofetch nano man netcli live
drivers/npu/akida.*
arch/echos_arch.h
editions/*.manifest
boot/grub/grub-universal.cfg
packages/echlibc/
packages/epk/
media/epk/
docs2.0/               source markdown for this site
```

`docs/` (without 2.0) is the historic archive. Do not use it as the
Universal specification.

## Tests I actually run

QEMU + serial: `q`, then `man` / `ipconf` / `www on` / `tls` / `halt`.

`tools/smoke_test.sh` still talks about `/home` and RXos 7 halt. It is
not the 2.0 bible.

## Host helpers

```sh
cc -std=c99 -o echos-install tools/echos-install-host.c
cd packages && make && make test    # Linux coretools
```

## macOS

Apple Silicon: TCG, `make run-macos`. No HVF.

## Do not

- `make` without `EDITION=universal` and expect 2.0 (falls to Minimal 1.0).
- Flash the *vm* ISO to a USB and wonder about VESA.
- Plug NVMe and file “cannot install” — there is no driver.
- Measure Heap-0 with a `kmalloc` in the middle and quote the slogan.

## Licence

GNU GPLv3. NAVI weight blobs are modules; swap the `.bin` and
`iso-refresh` if you train your own.

Site: https://www.rogexlaboratories.com

— R.N.
