# echOS 3.0 commands

The live list is `CMD_NAMES`. `Tab` reads that same table and `man <command>` shows the available help.

## First steps

```text
help                 real command list
about                system identity and purpose
status               subsystem state
limits               compiled limits
devices              detected hardware and declared support
mem                   Heap-0, kmalloc and physical memory
report                evidence block measured during this boot
```

## Robotics and PX4

```text
robot                runtime and safety-gate counters
robot run            explicitly synthetic scenario
px4                   MAVLink state and link counters
px4 start HOST PORT   connect to PX4 SITL over UDP
px4 stop              stop the bridge
```

`robot run` exposes the pipeline without physical sensors. `px4 start 10.0.2.2 14580` is the form used by the gallery and QEMU tests; the address may differ on another laboratory network.

## Console and files

```text
clear  history  font  termtheme
pane split | next | close | monitor | shell
ls  cd  pwd  cat  write  rm  cp  mv  mkdir  rmdir  tree
head  tail  less  grep  find  nano
df  du  save  load  format  partition
```

## Network diagnostics

```text
nics  ipconf  ping  dns  tls  curl  wget  trace  nmap
wired  chat  say
```

There is no browser. An HTTP download does not imply a web engine.

## Host-side build and certification

```sh
make build-universal-x86_64
make build-universal-aarch64
make test-universal-x86_64 test-uefi-universal-x86_64
make test-storage-universal-x86_64
make test-px4-universal-x86_64
make test-universal-aarch64 test-uefi-universal-aarch64
make test-px4-universal-aarch64
make portability
make repro-universal-x86_64
```

PX4 tests require PX4 SITL on the host; UEFI requires OVMF/edk2 and architecture tests require QEMU.

— R.N.
