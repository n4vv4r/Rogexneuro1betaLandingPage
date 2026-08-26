# Editions

One kernel. Four manifests. LIVE is Minimal in RAM.

## 1.0 vs 2.0 (again, because they get mixed)

In **1.0**, Complete / Minimal / Edge are *compile-time flags*. Three ISOs,
three ELFs. Minimal is not a crippled Complete: same desktop, ECHO and IDE
compiled out.

In **2.0 Universal** the ELF is one. The edition is applied with
`epk apply` in the wizard or by hand. Runtime: `/etc/echos-edition`.

Server 2.0 is also Heap-0 CLI. It is not 1.0.

## The four (2.0)

### Minimal

Kernel, ROSH, Heap-0, `epk`, `echofetch`, `doas` / `rcctl` / `pfctl`.
This is LIVE. This is what you get if you press `q`.

### Complete (text)

Minimal plus extended CLI (`less grep find du htop tmux…`) and toolchain
**notes** (tcc, make, python, qjs, nasm, rustc). Real compilers: host +
`echlibc`, or LIVE stubs.

### Edge

Minimal plus SNN runtime, static I/O, Akida AKD1000 probe, `bench-snn` /
`prisma5`. No daemons. 2.0 has no WM in any edition; Edge also does not
pretend it will grow one.

Honest memory budget: LIVE `gfxpayload=text` if 16 MiB matters. The
1280×720×32 backbuffer is ~3.6 MiB.

### Server

Minimal plus net, `httpd` / `ftpd` / `sshd` / `pqc` flags.
`rcctl enable httpd` **records**. I have not promised nginx.
ROGEX-PQC = ML-KEM in `rogex-core`.

## Manifests

```text
editions/minimal.manifest
editions/complete.manifest
editions/edge.manifest
editions/server.manifest
```

## How you choose

Wizard step 5, or:

```text
epk apply edge
```

ISO build:

```sh
make edition-universal    # 2.0 CLI — this documentation
make edition-server
make edition-complete     # 1.0 desktop
make edition-minimal      # 1.0 desktop, no ECHO
make edition-edge         # 1.x CLI-only
```

If someone asks for “the Edge ISO”, ask: 1.x or 2.0 apply? Not the same
binary.

## 1.0 Eclipse (still shipping)

| | Complete | Minimal | Edge |
|---|---|---|---|
| Desktop | Eclipse Shell + dock | same shell | none — CLI |
| ECHO | Navi 10 | no | Navi Mini |
| IDE | yes | no | no |
| Target | CPU + NPU | daily desktop | IoT / robots / cameras |

Minimal 1.0 is not a broken Complete. Edge 1.x has no hidden GUI.

— R.N.
