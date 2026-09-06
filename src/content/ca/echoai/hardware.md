# Maquinari previst

Aquesta és la plataforma de desenvolupament proposada per avançar cap a
ECHO-3. No és un inventari del laboratori: tret que s'indiqui el contrari, són
compres candidates.

## Escala de proves

### 1. Banc i dron petit

- [**Crazyflie 2.1 Brushless**](https://store.bitcraze.io/products/crazyflie-2-1-brushless)
  amb [Flow Deck](https://store.bitcraze.io/products/flow-deck-v2) per
  experimentar en interior amb poc risc i control bàsic de posició.
- Hèlixs, bateries, carregador, recanvis i una gàbia o xarxa de seguretat.
- Mesurador de potència USB-C i registrador independent.

La seva funció és validar missatges, latència, watchdog i pèrdua d'enllaç. No
ha de carregar l'stack final de sensors.

### 2. Plataforma d'integració

- [**Holybro X500 V2**](https://holybro.com/products/px4-development-kit-x500-v2)
  amb **Pixhawk 6C** i GPS M10 com a cos obert per al desenvolupament PX4.
- **RadioMaster TX16S** i receptor ELRS per a control manual i avortaments.
- Kill switch físic, telemetria independent, bateries i carregador balancejat.

Pixhawk estabilitza i conserva els failsafes. echoAI s'executa com a lògica
d'alt nivell en un companion computer i mai no substitueix el control de vol
dur.

### 3. Computació i visió

- [**Jetson Orin Nano Super Developer Kit**](https://developer.nvidia.com/embedded/jetson-orin-nano-super-developer-kit)
  per a fusió, models de desenvolupament, registres i ROS 2/PX4.
- [**Luxonis OAK-D Pro amb OV9782 i focus fix**](https://shop.luxonis.com/products/oak-d-pro)
  per a RGB, estèreo, profunditat i IMU; el global shutter és preferible per al
  moviment i la vibració.
- Emmagatzematge NVMe, ventilació, convertidors DC regulats i cablejat curt.

El kit Jetson serveix per al desenvolupament; no s'assumeix automàticament com
a maquinari de producció.

### 4. Distància i geometria

- **Benewake TFmini-S** com a telèmetre econòmic per a primeres proves d'altura
  o distància frontal.
- [**Livox Mid-360**](https://www.livoxtech.com/mid-360/specs) per a ECHO-3:
  núvol de punts 3D, camp horitzontal de 360° i IMU integrada.

El LiDAR no substitueix la càmera: geometria i aparença han de poder fallar de
manera independent i contradir-se.

### 5. Neuromòrfic opcional

- [**BrainChip AKD1000**](https://brainchip.com/dev-tools/) PCIe o M.2, només
  si es disposa del maquinari, un driver compatible i una toolchain reproduïble.

El seu primer banc seria percepció sempre activa davant de CPU/Jetson sobre el
mateix dataset: exactitud, latència P99, potència real i degradació en
desconnectar-lo. No s'acceptaran TOPS de fullet com a substitut d'aquesta mesura.

## Ordre recomanat de compra

1. Seguretat, ràdio, bateries i Crazyflie.
2. Jetson i OAK-D per construir el pipeline sobre taula.
3. X500/Pixhawk per a SITL, HIL i gàbia.
4. TFmini-S per a integració primerenca de distància.
5. Mid-360 quan SENSOR-1 i SAFE-1 ja tinguin banc.
6. AKD1000 quan existeixi una tasca perceptiva petita que es pugui comparar amb
   un baseline i que no bloquegi el full de ruta.

## Condició d'ús

Cap component nou no entra directament als motors. La ruta és sempre:

```text
sensor → adaptador → estat WSP → memòria/predicció → gate
       → ordre d'alt nivell → autopilot → actuadors
```

Primer simulació, després hardware-in-the-loop, tot seguit gàbia i només
finalment un entorn exterior autoritzat.

— R.N.
