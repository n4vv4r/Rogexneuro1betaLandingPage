# Questions I get asked

## Is this Linux?

No. x86_64 unikernel. GRUB loads an ELF. Not kernel.org.

## Where is the desktop?

On EchOS 1.0 Complete/Minimal. 2.0 Universal is a console. On purpose.

## Why not `/home`?

Because this is not Unix. Users live in `/users`. `HOME` points there.

## Can I install packages from the internet?

Not with `epk`. The catalogue is the ISO. `curl`/`wdl` fetch *files*, not
signed packages. `rx app add` is 1.0 legacy and wants `www on`; it is not
the 2.0 path.

## `tcc` shows in `epk list` and does not compile

LIVE stub. RXFS 64 KiB. The real compiler is linked on the host against
`echlibc`. `epk` is not lying: the name is there, the gigabyte does not fit.

## Is there Wi-Fi?

No. Ethernet. `nics` shows the Wi-Fi chip so you know I saw it and do not
drive it.

## `ping google.com` fails in QEMU

slirp filters ICMP. Try `dns google.com` or `curl -I http://example.com`.

## `curl https://…` prints no HTML

Clear `http://` does. TLS 1.3 *handshake* does (`tls example.com`). An
https body can still come back empty. Not your URL. See [Network](/docs/network).

## `-dom` does not “load Vite”

There is no JS engine. It waits two seconds and re-fetches. The SPA shell
is what you get.

## How do I complete commands?

Tab. The list is `CMD_NAMES`. If it does not complete, the command is
missing from the array (a bug) or you mistyped.

## Is `man` Linux man?

No. Embedded pages. No real sections. `man 1 curl` ignores the `1`.

## Can I lose the disk?

Yes. `install`, `reinstall`, `format … yes`, `ERASE-`. LIVE with `q`
does not touch a disk. Do not mix them.

## Is Akida supported?

PCI probe. No board, no NPU. I do not paint a fake one.

## Does 2.0 replace 1.0?

No. Two lines. 1.0 is Eclipse Shell. 2.0 is the LIVE / Edge / Server
console. Same lab, different ISO.

## ISO SHA-256

ISOs are not in git. After `make iso`:

```sh
sha256sum build/EchOS-2.0.0-universal-*.iso
```

If someone hands you an ISO without a sum, it is not a serious release
of mine.

— R.N.
