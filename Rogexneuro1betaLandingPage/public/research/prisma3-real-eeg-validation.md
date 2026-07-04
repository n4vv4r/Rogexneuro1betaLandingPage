# PRISMA 3 — Apendice: validacion supervisada sobre EEG REAL

Dataset: **OpenNeuro DS007358** (resting-state, India+Tanzania). Tarea: ec vs eo.
Sujetos usados: **28** (montajes con occipitales; se descartan los frontales
de <12 canales EEG). Ventanas: 3304. Azar: 50%.

## Resultados (Leave-One-Subject-Out entre sujetos)

| Configuracion | Accuracy | F1 |
|---|---|---|
| Global, features crudas (LOSO) | 71.5% | 68.4 |
| Global, normalizado por usuario (LOSO) | 84.2% | 84.1 |
| Personalizado por usuario (intra-CV) | 91.4% | — |

Normalizar por usuario aporta **+12.7 puntos**
sobre features crudas: la reduccion de variabilidad interindividual mejora la
generalizacion a personas nuevas. El modelo personalizado rinde aun mas.

## Comprobacion fisiologica (bloqueo alfa)
rel_alpha occipital: ec=0.338 vs eo=0.083 (correcto, ec>eo). El alfa aumenta con ojos cerrados, como se espera.

Figuras: `outputs/figures/eo_ec_accuracy.png`, `outputs/figures/eo_ec_confusion.png`.

## Limites (leer con rigor)
- **ec/eo es un contraste robusto y relativamente facil** (el bloqueo alfa es uno de
  los efectos EEG mas fiables). Estos numeros validan el METODO y el pipeline, no una
  capacidad de clasificacion clinica dificil.
- N=28 es modesto; para una cifra publicable, usar 50-100 sujetos y reportar
  intervalos de confianza y precision por sujeto.
- El "personalizado" usa CV intra-sujeto (regimen mas facil que LOSO); no debe
  confundirse con generalizacion entre sujetos.
- Sin rechazo de artefactos/ICA en esta corrida.
- **No diagnostico, no clinico.** ec/eo es un estado de tarea, no una medida de salud.
- Preprocesado: seleccion de canales 10-20 (descarta metadatos del dispositivo),
  referencia de promedio comun, paso-banda + notch. Validacion honesta con LOSO.
