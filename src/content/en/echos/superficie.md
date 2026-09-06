# Public surface — echOS

Every name in `help` / `epk list` / `man` carries a label:

- **REAL** — the unikernel performs that work.
- **NOTE** — the name exists; the work is a flag, dump or forwarding action.
- **ABSENT** — outside Tab completion and `help`.

## Commands

| Command | Label | What it does |
|---------|-------|--------------|
| help about status mem uptime power bench devices env | REAL | kernel / benchmark |
| clear reboot halt | REAL | console / reset |
| ls cd pwd cat write rm cp mv mkdir rmdir tree | REAL | RXFS |
| head tail less grep find du df nano history | REAL | RXFS |
| date tz kbd termtheme | REAL | clock, map, palette |
| man apropos | REAL | embedded pages |
| echofetch hwprobe live whoami uname hostname echo | REAL | identity / PCI |
| www curl wget dns tls ping nics ipconf trace nmap | REAL | IPv4; HTTPS may return an empty body |
| wired chat say | REAL | L2 0x88B5 |
| epk echos-install install save load format partition | REAL | RXFS notes / disk |
| gpt | NOTE | GPT writer without valid CRC32 |
| doas | NOTE | one address space; no isolation |
| rcctl | NOTE | flags; no daemons |
| pfctl | NOTE | RAM boolean; does not filter |
| neuro neurocpu prisma5 bench-snn | REAL | in-kernel SNN; Akida = PCI probe |

## `epk list` (public)

echos-base, echos-shell, echofetch, echos-diag, echos-net, echos-npu,
echos-io, echos-akida.

`epk install` writes text into RXFS, not an ELF.

## `epk list --lab`

Host notes: tcc, python, rustc, httpd, sshd, … They do not start a process.

## Absent

tcc / python / git in the unikernel, real sshd/httpd, navi/echo in the OS,
browser, loihi, htop/tmux, Wi-Fi, NVMe controller, UEFI.
