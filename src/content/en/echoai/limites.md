# echoAI — limitations

The laboratory's policy is to separate results, plans and hypotheses.

## What ECHO-1 does not demonstrate

- It is not general intelligence or an artificial person.
- It does not recognise objects in real images.
- It does not perform SLAM, flight control or certified navigation.
- It does not yet operate with noise, wind, physical latency or incomplete sensors.
- It does not demonstrate autonomous survival; that belongs to ECHO-2.
- It does not contain an AKD1000 or another physical NPU.
- It does not turn performance in a synthetic world into a robotics safety claim.

## Visible debt

WALK-1 without an integer remainder does not propagate value all the way to the
goal and remains an `expectedFailure`. The opt-in CREDIT-1 variant does walk,
but the default algorithm was not changed.

The local Qwen solved SIGN-C's canonical examples and beat the stub on
paraphrases, but selected `approach` for two non-canonical threats and received
`-16`. This demonstrates why its output is a proposal rather than a safe order.

CAM has 4,096 slots and does not use LRU. Current worlds are still small;
SLEEP-2 will only be justified once measured memory pressure exists.

## Conditions for robotics

Before flying, ECHO-3 must demonstrate:

- deadlines and P99 latency under load;
- sensor synchronisation and expiry;
- watchdog, return and landing after loss of the companion computer;
- independent veto under contradictory observations;
- battery, mass, temperature and vibration limits;
- a reproducible log of every decision;
- simulation, HIL and cage tests before open-field operation;
- compliance with applicable regulations and emergency human operation.

A neural model, an LLM or an NPU will not be the only barrier against a
collision. The autopilot and safety mechanisms remain separate.

## Akida

There is no AKD1000 in the laboratory. Manufacturer power or learning figures
are not RxLabs results. If a board arrives, compatibility, exact model,
toolchain, measured power and a comparison against CPU/Jetson will be published
before any advantage is claimed.

## Status vocabulary

- **Fact:** a reproducible report and a green gate exist.
- **Measured red:** the experiment runs and does not reach its KPI.
- **Plan:** proposed order; not yet a capability.
- **Absent:** does not exist in the laboratory.

— R.N.
