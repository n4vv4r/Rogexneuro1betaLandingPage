# Network

Own IPv4 stack. One bound NIC. One TCP. HTTP/1.0. HTTPS with SNI.

**WWW is OFF by default.** Without `www on` there is no DHCP, no DNS, no
curl. `ipconf` still shows the MAC.

## Bring it up

```text
www on
ipconf
www status
```

QEMU: `10.0.2.15/24` gw `10.0.2.2` dns `10.0.2.3` if DHCP misses.
Metal: DHCP 4 s; on failure `www config <ip> <mask> <gw> [dns]`.

Drivers: virtio-net, Intel e1000, Realtek 810/8168 (`r8169`), RTL8139.
`nics` lists **every** PCI network chip, including ones I do not drive
(RTL8188EE Wi-Fi: no). `ipconf` is the bound NIC + IP + MAC.

## `ipconf`

```text
ipconf
ipconfig     # alias
ifconfig     # alias
```

QEMU example:

```text
bound:
  iface0  virtio-net
    state    up
    ether    52:54:00:12:34:56
    inet     10.0.2.15
    netmask  255.255.255.0
    gateway  10.0.2.2
    dns      10.0.2.3
    www      ON
```

## `curl`

```text
curl https://example.com
curl -I -L http://example.com
curl -X POST -d "usuario=juan&clave=123" https://ejemplo.com
curl -o /tmp/page.html https://example.com
curl -O https://example.com/index.html
curl -b "sid=1" -c /tmp/jar https://ejemplo.com
curl -dom https://www.rogexlaboratories.com
curl search <query>
```

| Flag | Role |
|---|---|
| `-X` `--request` | GET POST HEAD PUT |
| `-d` `--data` | POST body (`x-www-form-urlencoded`) |
| `-I` `--head` | headers only |
| `-L` `--location` | follow 3xx (off by default, like real curl) |
| `-O` | URL basename → `/tmp/` |
| `-o` | path |
| `-b` | `Cookie:` |
| `-c` | jar (`Set-Cookie`) |
| `-H` | extra header |
| `--html` | raw |
| `-dom` | wait ~2 s, re-GET, visible text + HTML |

Quotes `"…"` and `'…'` work. `usuario=juan$clave=123` (the `$` people type
when they meant `&`) becomes `&` when it looks like a form. The echOS
shell **does not** expand `$VAR`.

`-dom` **does not run JS**. No Vite in the unikernel. Wait and fetch again.
A SPA gives you the index shell plus a note. `-o` keeps HTML up to the
RXFS cap (64 KiB).

User-Agent: `EchOS-nova/2.0 (echOS)`.

## `wdl` / `wget`

Download to a file. Default `/tmp/<basename>`. Follows redirects.

```text
wdl https://example.com
wdl -O /users/live/Downloads/index.html https://example.com
wdl -c -O /tmp/big.bin https://example.com/big.bin
wdl -b <url>
```

| Flag | wget/wdl | curl |
|---|---|---|
| `-O` / `-o` | destination | destination |
| `-c` | **continue** (`Range:`) | **cookie-jar** |
| `-b` | “background” (no fork: still runs to completion) | **Cookie:** |
| `-L` | follow (already default) | follow (must be set) |

## `tls`

```text
www on
tls example.com
```

Offers 1.3 (`TLS_AES_128_GCM_SHA256`) and 1.2
(`ECDHE_RSA_WITH_AES_128_GCM_SHA256`). Prints the negotiated version.
Does not fetch a page. No CA.

QEMU (2026-08-26): `tls example.com` → `handshake OK  TLS 1.3`.

HTTPS `curl -I https://…` may return an empty body even after a closed
handshake: application keys are a separate path. Clear `http://` is fine.
I leave that written so I am not lying.

## DNS, ping, nmap, traceroute

```text
dns google.com
ping 10.0.2.2
nmap 10.0.2.2
traceroute 1.1.1.1
```

`ping <alias>` without a dot is Rogex Wired L2 (ethertype `0x88B5`), not
ICMP. `chat` / `say` too. Lab mesh between two RXos nodes, not the internet.

## Limits

- One socket. IPv4 only. No Wi-Fi.
- Body buffer `WWW_BODY_MAX` = 192 KiB; RXFS writes 64 KiB.
- TLS: AES-128-GCM, P-256. No ChaCha on this client, no 0x1302.
- SNI yes. 0-RTT no. Session resume no.

— R.N.
