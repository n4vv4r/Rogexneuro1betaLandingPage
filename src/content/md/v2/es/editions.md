# Ediciones

Un kernel. Cuatro manifiestos. LIVE es Minimal en RAM.

## 1.0 vs 2.0 (otra vez, porque se confunde)

En **1.0** Complete / Minimal / Edge son *flags de compilación*.
Tres ISOs, tres ELFs. Minimal no es Complete capado a medias: el
desktop es el mismo, ECHO e IDE salen del compile.

En **2.0 Universal** el ELF es uno. La edición se aplica con
`epk apply` en el wizard o a mano. El runtime queda en
`/etc/echos-edition`.

Server 2.0 también es Heap-0 CLI. No es 1.0.

## Las cuatro

### Minimal

Kernel, ROSH, Heap-0, `epk`, `echofetch`, `doas` / `rcctl` / `pfctl`.
Es el LIVE. Es lo que arranca si pulsas `q`.

Para: ver el OS, instalar después, máquina pequeña.

### Complete (texto)

Minimal más CLI extendida (`less grep find du htop tmux…`) y
**notas** de toolchain (tcc, make, python, qjs, nasm, rustc).
Compiladores de verdad: host + `echlibc`, o stubs LIVE.

Para: desarrollar *en* echOS cuando RXFS deje de ser 64 KiB.

### Edge

Minimal más runtime SNN, I/O estático, sonda Akida AKD1000,
`bench-snn` / `prisma5`. Sin daemons. Sin WM (2.0 ya no tiene WM
en ninguna edición; Edge además no finge que los va a tener).

Para: robot, cámara, placa con NPU. Presupuesto de memoria
honesto: LIVE `gfxpayload=text` si 16 MiB importan. El
backbuffer 1280×720×32 son ~3.6 MiB.

### Server

Minimal más net, flags `httpd` / `ftpd` / `sshd` / `pqc`.
`rcctl enable httpd` **anota**. No te he prometido un nginx.
ROGEX-PQC = ML-KEM en `rogex-core`.

Para: el día que los daemons existan. Hoy: el manifiesto y el
net stack.

## Manifiestos

```text
editions/minimal.manifest
editions/complete.manifest
editions/edge.manifest
editions/server.manifest
```

Texto plano, una lista. `epk apply complete` los recorre.

## Cómo se elige

Wizard paso 5, o:

```text
epk apply edge
```

Build de ISO:

```sh
make edition-universal    # 2.0 CLI, la que documenta este docs2.0/
make edition-server
make edition-complete     # 1.0 desktop
make edition-minimal      # 1.0 desktop sin ECHO
make edition-edge         # 1.x CLI-only
```

Si pides “la ISO de Edge” a secas, pregunta: ¿1.x o 2.0 apply?
No son el mismo binario.

— R.N.
