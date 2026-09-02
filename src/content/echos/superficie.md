# Superficie pública — echOS 2.1.0-honest

Cada nombre en `help` / `epk list` / `man` lleva una etiqueta:

- **REAL** — el unikernel hace ese trabajo.
- **NOTA** — el nombre existe; el trabajo es un flag, un dump o un re-dispatch.
- **AUSENTE** — fuera de Tab y de `help`.

## Comandos

| Comando | Etiqueta | Qué hace |
|---------|----------|----------|
| help about status mem uptime power bench devices env | REAL | kernel / benchmark |
| clear reboot halt | REAL | consola / reset |
| ls cd pwd cat write rm cp mv mkdir rmdir tree | REAL | RXFS |
| head tail less grep find du df nano history | REAL | RXFS |
| date tz kbd termtheme | REAL | reloj, mapa, paleta |
| man apropos | REAL | páginas embebidas |
| echofetch hwprobe live whoami uname hostname echo | REAL | identidad / PCI |
| www curl wget dns tls ping nics ipconf trace nmap | REAL | IPv4; HTTPS puede cuerpo vacío |
| wired chat say | REAL | L2 0x88B5 |
| epk echos-install install save load format partition | REAL | notas RXFS / disco |
| gpt | NOTA | writer GPT sin CRC32 válido |
| doas | NOTA | un espacio de direcciones; no aísla |
| rcctl | NOTA | flags; no hay daemons |
| pfctl | NOTA | boolean RAM; no filtra |
| neuro neurocpu prisma5 bench-snn | REAL | SNN in-kernel; Akida = sonda PCI |

## `epk list` (público)

echos-base, echos-shell, echofetch, echos-diag, echos-net, echos-npu,
echos-io, echos-akida.

`epk install` escribe un texto en RXFS, no un ELF.

## `epk list --lab`

Notas de host: tcc, python, rustc, httpd, sshd, … No arrancan un proceso.

## Ausentes

tcc / python / git in-OS, sshd/httpd reales, navi/echo-in-OS, navegador,
loihi, htop/tmux, Wi-Fi, NVMe driver, UEFI.
