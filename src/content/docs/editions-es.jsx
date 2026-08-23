import { Link } from 'react-router-dom';
// Docs — Ediciones (ES)
export const blocks = [
  {
    h2: 'Una base de código, tres formas',
    body: (
      <p>
        Todas las ediciones de EchOS se construyen desde el mismo árbol fuente y comparten kernel, drivers y
        herramientas de actualización. Solo difieren en qué se empaqueta en la imagen final.
      </p>
    ),
  },
  {
    h2: 'Complete',
    body: (
      <>
        <p>La edición insignia. Incluye:</p>
        <ul>
          <li>Escritorio completo Eclipse Shell con dock.</li>
          <li>Navegador Rogex Nova.</li>
          <li>Asistente ECHO sobre Navi 10 — totalmente sin conexión.</li>
          <li>IDE nativo con el SDK de EchOS.</li>
          <li>Visores de vídeo e imagen, stack multimedia.</li>
          <li>Inferencia en CPU o NPU BrainChip Akida.</li>
        </ul>
        <p>Objetivo: sobremesas y portátiles x86_64, 4 GB de RAM mínimo recomendado (8 GB cómodos).</p>
      </>
    ),
  },
  {
    h2: 'Minimal',
    body: (
      <>
        <p>Edición eficiente para el uso diario:</p>
        <ul>
          <li>Mismo entorno de escritorio y conjunto de drivers que Complete.</li>
          <li>Sin el asistente de IA ECHO.</li>
          <li>Sin IDE incluido.</li>
          <li>Afinada para la respuesta en hardware cotidiano.</li>
        </ul>
        <p>Objetivo: sobremesas y portátiles x86_64 con 4 GB de RAM.</p>
      </>
    ),
  },
  {
    h2: 'Edge',
    body: (
      <>
        <p>Compilación solo-CLI para objetivos embebidos y sin pantalla:</p>
        <ul>
          <li>Sin escritorio; flujo de trabajo por serie/SSH.</li>
          <li>Navi Mini — modelo edge reentrenable en el dispositivo.</li>
          <li>Comando <code>files</code> integrado: explorador de archivos + visor multimedia dentro de la terminal.</li>
          <li>Funciona con tan solo 256 MB de RAM según el objetivo.</li>
        </ul>
        <p>
          Objetivos: placas IoT, plataformas robóticas, drones y cámaras. Consulta{' '}
          <Link to="/downloads">Descargas</Link> para ver las imágenes exactas disponibles por edición.
        </p>
      </>
    ),
  },
];
