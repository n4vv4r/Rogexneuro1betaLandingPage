# PRISMA 3 — Model report

Tarea: clasificar 5 estados neurofisiológicos. Azar = 20%.

| Configuración | Accuracy | Notas |
|---|---|---|
| Global, features crudas (LOSO) | 76.7% | línea base entre-sujetos |
| Global, normalizado por usuario (LOSO) | 94.4% | reduce variabilidad |
| Personalizado por usuario (intra-CV) | 96.1% | **prioridad** |

Accuracy por usuario (personalizado): {"user_alpha_responder": 0.983, "user_beta_responder": 0.95, "user_noisy_signal": 0.95}

LOSO = Leave-One-Subject-Out (generalización a personas nuevas). Validación honesta, sin fuga por identidad de sujeto.
