# Roadmap — EchOS

Orden público que se puede fallar en público. Sin fechas del Eclipse:
cada hito se cierra cuando se demuestra, no cuando se anuncia.

## Ahora (1.0.0 — beta)

- **Minimal + Edge**: publicación pública (30 de agosto de 2026).
- **Nova**: TLS 1.2 en vivo; endurecer entrega del cuerpo HTTP
  (reensamblado de records + reuso de conexión).
- **Explorer**: multi-instancia, propiedades de archivo, arrastre global.
- **Multimedia**: decodificador H.264 baseline + contenedor MP4
  (el sample `waterfall-sample.mp4` es la diana de prueba).
- **Dev edition**: atajos completos para driving automatizado del shell.

## Siguiente (1.1)

- **Motor JS** (subconjunto ES): DOM API + event loop — desbloquea
  React/Vite SPAs en Nova.
- **CSS layout**: flow + flexbox básico sobre el framebuffer.
- **Audio**: mezclador propio + salida por PIT/HPET.
- **AHCI/NVMe**: instalación a disco al 100 %.
- **Multi-instancia** real en todas las apps (estado por ventana).

## Después

- **Echo AI v1**: entrenamiento en Kaggle, cuantización INT4,
  backends CPU AVX2/AVX-512 y NPU (BrainChip Akida).
- **SMP**: scheduler preemptivo multi-núcleo con APIC.
- **Ring 3**: aislamiento userland/kernel; drivers en espacio de usuario.
- **UEFI/GOP nativo**: resoluciones nativas sin BIOS legacy.
- **WASM sandbox**: bytecode determinista para apps de terceros.
- **Red mesh WSP**: descubrimiento P2P sin servidores.

## Complete edition

La edición **Complete** (Echo AI v1 + IDE + todo lo anterior) se publica
cuando Echo pase su fase final de entrenamiento y verificación A/B.
Fecha por anunciar — se anuncia con ISO, no con promesas.
