# Planned hardware

This is the proposed development platform for moving towards ECHO-3. It is not
an inventory of the laboratory: unless stated otherwise, these are candidate
purchases.

## Test ladder

### 1. Bench and small drone

- [**Crazyflie 2.1 Brushless**](https://store.bitcraze.io/products/crazyflie-2-1-brushless)
  with a [Flow Deck](https://store.bitcraze.io/products/flow-deck-v2) for low-risk
  indoor experiments and basic position control.
- Propellers, batteries, charger, spares and a safety cage or net.
- USB-C power meter and independent logger.

Its job is to validate messages, latency, watchdog and link loss. It is not
expected to carry the final sensor stack.

### 2. Integration platform

- [**Holybro X500 V2**](https://holybro.com/products/px4-development-kit-x500-v2)
  with **Pixhawk 6C** and M10 GPS as an open body for PX4 development.
- **RadioMaster TX16S** and an ELRS receiver for manual control and aborts.
- Physical kill switch, independent telemetry, batteries and balanced charger.

Pixhawk stabilises the aircraft and retains the failsafes. echoAI runs as
high-level logic on a companion computer and never replaces hard flight control.

### 3. Compute and vision

- [**Jetson Orin Nano Super Developer Kit**](https://developer.nvidia.com/embedded/jetson-orin-nano-super-developer-kit)
  for fusion, development models, logs and ROS 2/PX4.
- [**Luxonis OAK-D Pro with OV9782 and fixed focus**](https://shop.luxonis.com/products/oak-d-pro)
  for RGB, stereo, depth and IMU; global shutter is preferable under motion and
  vibration.
- NVMe storage, cooling, regulated DC converters and short cables.

The Jetson kit is for development; it is not automatically assumed to be
production hardware.

### 4. Range and geometry

- **Benewake TFmini-S** as an economical rangefinder for early altitude or
  forward-distance tests.
- [**Livox Mid-360**](https://www.livoxtech.com/mid-360/specs) for ECHO-3: a 3D
  point cloud, 360° horizontal field of view and integrated IMU.

LiDAR does not replace the camera: geometry and appearance must be able to fail
independently and contradict one another.

### 5. Optional neuromorphic hardware

- [**BrainChip AKD1000**](https://brainchip.com/dev-tools/) over PCIe or M.2,
  only if the hardware, a compatible driver and a reproducible toolchain are
  available.

Its first bench would compare always-on perception against CPU/Jetson on the
same dataset: accuracy, P99 latency, real power and degradation when removed.
Brochure TOPS will not substitute for those measurements.

## Recommended purchase order

1. Safety equipment, radio, batteries and Crazyflie.
2. Jetson and OAK-D to build the pipeline on a bench.
3. X500/Pixhawk for SITL, HIL and cage testing.
4. TFmini-S for early range integration.
5. Mid-360 once SENSOR-1 and SAFE-1 have a bench.
6. AKD1000 when a small perceptual task exists that can be compared against a
   baseline and does not block the roadmap.

## Condition of use

No new component connects directly to motors. The route is always:

```text
sensor → adapter → WSP state → memory/prediction → gate
       → high-level command → autopilot → actuators
```

Simulation first, then hardware-in-the-loop, then a cage, and only finally an
authorised outdoor environment.

— R.N.
