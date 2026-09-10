# Hardware previsto

Esta es la plataforma de desarrollo propuesta para avanzar hacia ECHO-3. No es
un inventario del laboratorio: salvo que se indique lo contrario, son compras
candidatas.

## Escalera de pruebas

### 1. Banco y dron pequeño

- [**Crazyflie 2.1 Brushless**](https://store.bitcraze.io/products/crazyflie-2-1-brushless)
  con [Flow Deck](https://store.bitcraze.io/products/flow-deck-v2) para
  experimentar en interior con poco riesgo y control de posición básico.
- Hélices, baterías, cargador, repuestos y una jaula o red de seguridad.
- Medidor de potencia USB-C y registrador independiente.

Su función es validar mensajes, latencia, watchdog y pérdida de enlace. No debe
cargar el stack final de sensores.

### 2. Plataforma de integración

- [**Holybro X500 V2**](https://holybro.com/products/px4-development-kit-x500-v2)
  con **Pixhawk 6C** y GPS M10 como cuerpo abierto para desarrollo PX4.
- **RadioMaster TX16S** y receptor ELRS para control manual y abortos.
- Kill switch físico, telemetría independiente, baterías y cargador balanceado.

Pixhawk estabiliza y conserva los failsafes. echoAI corre como lógica de alto
nivel en un companion computer y nunca sustituye el control de vuelo duro.

### 3. Computación y visión

- [**Jetson Orin Nano Super Developer Kit**](https://developer.nvidia.com/embedded/jetson-orin-nano-super-developer-kit)
  para fusión, modelos de desarrollo, registros y ROS 2/PX4.
- [**Luxonis OAK-D Pro con OV9782 y foco fijo**](https://shop.luxonis.com/products/oak-d-pro)
  para RGB, estéreo, profundidad e IMU; el global shutter es preferible para
  movimiento y vibración.
- Almacenamiento NVMe, ventilación, convertidores DC regulados y cableado corto.

El kit Jetson sirve para desarrollo, no se asume automáticamente como hardware
de producción.

### 4. Distancia y geometría

- **Benewake TFmini-S** como telémetro económico para primeras pruebas de altura
  o distancia frontal.
- [**Livox Mid-360**](https://www.livoxtech.com/mid-360/specs) para ECHO-3:
  nube de puntos 3D, campo horizontal de 360° e IMU integrada.

El LiDAR no reemplaza la cámara: geometría y apariencia deben fallar de forma
independiente y poder contradecirse.

### 5. Neuromórfico opcional

- [**BrainChip AKD1500 M.2**](https://brainchip.com/dev-tools/), sólo si
  se dispone de hardware, driver compatible y toolchain reproducible.

Su primer banco sería percepción siempre activa frente a CPU/Jetson sobre el
mismo dataset: exactitud, latencia P99, potencia real y degradación al
desconectarlo. No se aceptarán TOPS de folleto como sustituto de esa medida.

## Orden recomendado de compra

1. Seguridad, radio, baterías y Crazyflie.
2. Jetson y OAK-D para construir el pipeline en mesa.
3. X500/Pixhawk para SITL, HIL y jaula.
4. TFmini-S para integración temprana de distancia.
5. Mid-360 cuando SENSOR-1 y SAFE-1 ya tengan banco.
6. AKD1500 M.2 cuando exista una tarea perceptiva pequeña que pueda compararse con
   un baseline y no bloquee el roadmap.

## Condición de uso

Ningún componente nuevo entra directamente en motores. La ruta es siempre:

```text
sensor → adaptador → estado WSP → memoria/predicción → gate
       → orden de alto nivel → autopiloto → actuadores
```

Primero simulación, después hardware-in-the-loop, luego jaula y sólo finalmente
un entorno exterior autorizado.

— R.N.
