# Roadmap — ECHO-2 and ECHO-3

ECHO-1 is closed. What follows is not about making the map larger or letting an
LLM drive. The business objective is autonomous edge robotics, with drones as
the primary platform.

Every item on this page is a **plan** until its bench, report and closure exist.

## ECHO-2 — an animal that maintains viability

ECHO-2 will remain in controlled simulation. It will add internal needs, object
identity and complete lives without breaking the integer fast path.

| Slice | Question it must close |
|---|---|
| VITA-1 | Does a homeostatic state `H` live in the Agent, fall over time and end an episode at zero? |
| PATTERN-1 | Does it recognise the same object or category across different observations, positions and contexts without using its id as the answer? |
| FOOD-1 | Does it discover through consequences which object restores `H` and which reduces it, without `if hungry: eat`? |
| SURV-1 | Does experience retained across lives increase median survival versus resetting Q/T/CAM? |
| SHIFT-S | Does it adapt when risks or resources change without manually clearing memory? |
| STREAM-1 | Does it operate through a long stream with external frames and measured aliasing? |
| SLEEP-2 | Does it consolidate episodes into rules without destroying CAM or calling the cortex? |
| GEN-1 | Does an inheritable integer reduce learning time without copying Q into the descendant? |
| HEAT-1 | Does a second need create a real trade-off after survival is closed with one? |

### Survival is not a reward for remaining alive

`H` will be a viability constraint, not `reward += 1`. Reward will continue to
teach local policy; `H` will decide whether a next turn exists. Death will end a
life and reset body and homeostasis, while the experiment compares retaining
memory with erasing it.

PATTERN-1 is the gate towards real objects: it must first demonstrate identity
and category without pixels or noisy sensors. ECHO-3 will connect that capability
to physical observations.

## ECHO-3 — perception and physical body

ECHO-3 will move the agent onto a drone companion computer. The autopilot will
retain stabilisation, attitude control and failsafes; echoAI will select goals
and high-level actions through the gate.

| Slice | Expected result |
|---|---|
| SIM-3 | the same mission in simulation, software-in-the-loop and hardware-in-the-loop |
| SENSOR-1 | stereo camera, IMU and LiDAR synchronised with timestamps and explicit faults |
| GROUND-1 | convert physical observations into WSP states without opening a second bus |
| PATTERN-1R | associate views and 3D clusters with the same object learned in ECHO-2 |
| FUSION-1 | camera and LiDAR provide independent evidence; disagreement reduces confidence |
| DYNAMIC-1 | detect moving objects and predict short-term trajectories |
| POWER-1 | measure watts and energy per mission; wake heavy compute only when it adds value |
| SAFE-1 | disconnections, frozen sensors and wrong proposals cannot bypass the gate or autopilot |
| DRONE-3 | complete mission in a cage and controlled environment: inspect, avoid, return and land |

### Role of Akida, if it reaches the laboratory

An AKD1000 could act as sparse always-on perception: region classification,
novelty, movement or point-cloud prefiltering. Its output would be integer
identifiers and confidence values entering through the existing sensor adapter.

It would not be the complete brain, would not write CAM, would not decide VERIFY
and would not command motors. Jetson would retain complex fusion,
instrumentation and development models; Pixhawk would retain flight control.

Before attributing a capability to it, a real driver, a model compiled for
AKD1000 and our own power and latency measurements would be required.
Capabilities published for later Akida generations will not automatically be
attributed to AKD1000.

## Target demonstration

A drone takes off in a controlled environment, inspects a route, recognises
persistent objects, detects that a learned passage has changed, avoids a moving
obstacle, decides to return based on available energy, and lands in an
alternative area. All critical control remains local and no cloud connection is
required.

The demo will only be green if it also survives loss of camera, loss of LiDAR,
companion-computer restart, incorrect neural output and complete removal of the
optional accelerator.

— R.N.
