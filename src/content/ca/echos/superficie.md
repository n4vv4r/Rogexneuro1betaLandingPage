# Superfície pública — echOS

Cada nom a `help` / `epk list` / `man` porta una etiqueta:

- **REAL** — l'unikernel fa aquesta feina.
- **NOTA** — el nom existeix; la feina és un flag, un bolcat o un reenviament.
- **ABSENT** — fora de Tab i de `help`.

## Ordres

| Ordre | Etiqueta | Què fa |
|-------|----------|--------|
| help about status mem uptime power bench devices env | REAL | nucli / benchmark |
| clear reboot halt | REAL | consola / reset |
| ls cd pwd cat write rm cp mv mkdir rmdir tree | REAL | RXFS |
| head tail less grep find du df nano history | REAL | RXFS |
| date tz kbd termtheme | REAL | rellotge, mapa, paleta |
| man apropos | REAL | pàgines encastades |
| echofetch hwprobe live whoami uname hostname echo | REAL | identitat / PCI |
| www curl wget dns tls ping nics ipconf trace nmap | REAL | IPv4; HTTPS pot tenir el cos buit |
| wired chat say | REAL | L2 0x88B5 |
| epk echos-install install save load format partition | REAL | notes RXFS / disc |
| gpt | NOTA | writer GPT sense CRC32 vàlid |
| doas | NOTA | un espai d'adreces; no aïlla |
| rcctl | NOTA | flags; no hi ha dimonis |
| pfctl | NOTA | booleà RAM; no filtra |
| neuro neurocpu prisma5 bench-snn | REAL | SNN al nucli; Akida = sonda PCI |

## `epk list` (públic)

echos-base, echos-shell, echofetch, echos-diag, echos-net, echos-npu,
echos-io, echos-akida.

`epk install` escriu un text a RXFS, no un ELF.

## `epk list --lab`

Notes de host: tcc, python, rustc, httpd, sshd, … No arrenquen cap procés.

## Absents

tcc / python / git a l'unikernel, sshd/httpd reals, navi/echo al SO,
navegador, loihi, htop/tmux, Wi-Fi, controlador NVMe, UEFI.
