# Roadmap — ECHO-3

ECHO-1 and ECHO-2 are closed. This page contains only echoAI's future: moving
the capabilities measured in simulation into perception and edge robotics.
Every item remains a **plan** until its bench, report and closure exist.

## Objective

A drone takes off in a controlled environment, inspects a route, recognises
persistent objects, detects that a learned passage changed, avoids a moving
obstacle, decides to return from its remaining energy and lands. Critical
control remains local and loss of network access does not stop the mission.

The autopilot will retain stabilisation, attitude control and failsafes.
echoAI will select goals or high-level actions through the gate. No LLM will
write directly to the motors.

## ECHO-3 phases

| Slice | Expected result |
|---|---|
| SIM-3 | three declarative 3D maps; learn in A and examine unseen paths in B/C |
| FLIGHT-1 | more voxels and headings, motors, dynamics, aerodynamics and measured wind |
| SENSOR-1 | synchronised camera, IMU and LiDAR with explicit noise, latency and faults |
| GROUND-1 | convert physical observations into WSP without opening a second bus |
| PATTERN-1R | associate 3D views and clusters with the object learned in ECHO-2 |
| FUSION-1 | camera and LiDAR provide independent evidence; disagreement reduces confidence |
| DYNAMIC-1 | detect moving objects and predict short-term trajectories |
| PX4-1 | integrate PID, SITL/HIL and bounded setpoints while retaining failsafes |
| COMMAND-1 | accept verified commands: take off, land, go to coordinates, return or cancel |
| POWER-1 | measure watts and energy per mission; wake heavy compute only when it adds value |
| SAFE-1 | frozen sensors, disconnections and wrong proposals cannot bypass the gate or PX4 |
| DRONE-3 | complete mission in advanced simulation, a cage and a controlled environment |

## 3D laboratory

NEURAL-VIZ-1 will evolve into a native Python application containing the 3D
world, neural network, WSP, sensors, PX4/PID, motors, mission, timeline and
replay. World A is for learning. Worlds B and C contain different paths,
walls and reserved movements to measure transfer without hardcoded scenarios.

The renderer may use a GPU; the documentation will always distinguish
rendering, physics and neural computation. Realistic visuals do not count as
demonstrated flight or intelligence.

## AKD1500 M.2, when it exists in the laboratory

The first step will compare CPU and AKD1500 with the same model, data and host:
accuracy, latency, memory, power and fallback. The accelerator may produce
integer features and confidence values for WSP. Q, T, CAM, VERIFY and the gate
remain under core control.

There is no AKD1500 card in the laboratory today. ECHO-3 can advance through
software, PX4 and simulation without pretending the hardware is present.

## Final gate

The demonstration must survive loss of camera, loss of LiDAR, companion
computer restart, wrong neural output, reserved wind and complete removal of
the optional accelerator. Worlds B and C remain frozen until examination.

— R.N.
