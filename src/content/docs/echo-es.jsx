import { Link } from 'react-router-dom';
// Docs — Modelos ECHO (ES)
export const blocks = [
  {
    h2: '¿Qué es ECHO?',
    body: (
      <p>
        ECHO es el asistente de IA integrado en EchOS. A diferencia de los asistentes en la nube, los modelos de ECHO
        viajan dentro de la imagen del sistema y se ejecutan por completo en tu hardware. No hay cuenta, ni clave de
        API, ni dependencia de red — la inferencia nunca sale de la máquina.
      </p>
    ),
  },
  {
    h2: 'Navi 10 — el modelo de escritorio',
    body: (
      <>
        <p>Navi 10 impulsa a ECHO en la edición Complete:</p>
        <ul>
          <li>Asistente conversacional con panel de chat en Eclipse Shell.</li>
          <li>Automatización de tareas: abre apps, ajusta preferencias y consulta el estado del sistema a petición.</li>
          <li>Conciencia contextual de archivos locales que tú compartas explícitamente en la conversación.</li>
          <li>Se ejecuta en CPUs x86_64 estándar; descarga trabajo a NPUs BrainChip Akida cuando están presentes.</li>
        </ul>
        <p>
          En silicio Akida, el runtime mapea capas a núcleos neuronales spiking, reduciendo el consumo a niveles de
          milivatios. En máquinas solo-CPU, kernels optimizados mantienen respuestas ágiles.
        </p>
      </>
    ),
  },
  {
    h2: 'Navi Mini — el modelo edge',
    body: (
      <>
        <p>Navi Mini es el hermano compacto que acompaña a la edición Edge:</p>
        <ul>
          <li>Huella mínima — cabe junto a tu carga de trabajo en memoria limitada.</li>
          <li><strong>Reentrenable en el dispositivo</strong>: adáptalo a tus sensores, comandos o vocabulario sin enviar datos a ningún sitio.</li>
          <li>Se invoca desde la CLI o desde tus propios scripts de automatización.</li>
        </ul>
      </>
    ),
  },
  {
    h2: 'Garantías de privacidad',
    body: (
      <p>
        Ambos modelos se ejecutan dentro de un sandbox sin permiso de red. Preguntas, archivos de contexto y respuestas
        permanecen solo en memoria o en tu perfil local. Consulta nuestra{' '}
        <Link to="/privacy">Política de Privacidad</Link> para los compromisos formales.
      </p>
    ),
  },
];
