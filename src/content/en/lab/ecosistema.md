# The laboratory

Rogex Laboratories / RxLabs. An independent laboratory in Girona. Three lines
of research, with executable code and published limitations.

There is no single binary joining them. They share a method: a small hot path,
events instead of polling when they add value, bounded memory, and no hardware
claim for equipment that is not on the bench.

| Line | What it is | Status |
|---|---|---|
| **echOS** | Robotic edge unikernel | 3.0 closed; x86_64 BIOS/UEFI and AArch64 UEFI |
| **PRISMA Engine** | EEG to events, Rust and reproducible analysis | Engine 0.1.0 measured; not a medical device |
| **echoAI** | Two-clock situated agent | ECHO-1 closed; ECHO-2 in design |

## Where they meet

echOS and echoAI do not share a process: echoAI currently runs on a host and
is not inside the ISO. echOS 3.0 publishes a bounded sensor-and-intent contract
that can become their future seam without placing a chatbot inside the OS.

PRISMA and echoAI do not import one another either: one analyses a continuous
signal; the other learns to act in a discrete world. All three lines remain
separate and meet only through explicit contracts.

## echoAI status

ECHO-1 integrates episodic memory, policy, a world model, body, objects,
operations, bounded language, post-hoc narration, temporal patterns and
transfer. Its closure reproduces 488 passing tests, one documented expected
failure, and transfer gains of `+56` and `+72`.

ECHO-2 is planned around object recognition, homeostasis and survival across
lives. ECHO-3 will move those capabilities to edge robotics: simulation and
HIL first, then camera, LiDAR and a drone controlled by PX4/Pixhawk.

## Hardware

There is no AKD1000 in the laboratory. Akida appears only as a probe, stub or
future hardware. If one is added, our own measurements will be published
instead of figures inherited from a brochure.

— R.N.
