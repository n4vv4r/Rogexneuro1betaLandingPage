import { Link } from 'react-router-dom';
// Docs — Arquitectura (ES)
export const blocks = [
  {
    h2: 'El kernel de EchOS',
    body: (
      <p>
        El kernel de EchOS está escrito desde cero: sin linaje Linux ni BSD. Proporciona planificación
        cooperativa-preemptiva, un gestor de memoria plano con paginación, una interfaz unificada de drivers y un plano
        de gestión de energía. La misma imagen del kernel maneja CPUs x86_64 de sobremesa y silicio neuromórfico como{' '}
        <strong>BrainChip Akida</strong>, donde un planificador dedicado de núcleos spiking expone la inferencia NPU
        como recurso del sistema de primera clase.
      </p>
    ),
  },
  {
    h2: 'Eclipse Shell — servidor de ventanas y dock',
    body: (
      <>
        <p>
          Eclipse Shell es el servidor de ventanas compuesto de EchOS. Es dueño de toda la pantalla: compone cada
          ventana, aplica pases de blur/glow del tema eclipse y anima las transiciones de escritorio. No hay ninguna
          pila de visualización de terceros por debajo.
        </p>
        <p>El shell incluye un dock estilo macOS con:</p>
        <ul>
          <li>Ampliación de iconos al pasar el cursor, con caída suave entre iconos vecinos.</li>
          <li>Indicadores de apps en ejecución bajo cada aplicación abierta.</li>
          <li>Etiquetas al hacer hover para que nunca adivines qué lanza cada icono.</li>
          <li>Iconos de app con brillo blanco sobre el fondo Eclipse característico.</li>
        </ul>
      </>
    ),
  },
  {
    h2: 'Rogex Nova — motor de navegador propio',
    body: (
      <p>
        Rogex Nova no es un envoltorio de WebKit ni Blink. Es motor propio: parser HTML, motor de layout CSS, puente
        del runtime JS y rasterizador, integrado directamente con el modelo de seguridad de Eclipse Shell para que el
        contenido web quede aislado por las mismas reglas que gobiernan las ventanas nativas. El estado del desarrollo
        se informa con honestidad dentro del propio navegador — por ejemplo, cuando el soporte HTTPS/TLS aún se está
        preparando, Nova lo dice en lugar de fallar en silencio. Véase la captura <code>nova-www</code> en la página
        de inicio.
      </p>
    ),
  },
  {
    h2: 'Pipeline de vídeo nativo',
    body: (
      <p>
        Una capa de decodificación consciente del hardware más una pila propia de imagen/vídeo alimentan los visores
        incluidos. La reproducción evita por completo frameworks multimedia ajenos; cuando la GPU ofrece decodificado
        de función fija, el pipeline lo usa, y las rutas CPU son fallbacks optimizados con SIMD. La misma pila genera
        miniaturas en el Explorador de archivos y previsualizaciones en el visor multimedia.
      </p>
    ),
  },
  {
    h2: 'Runtime de ECHO',
    body: (
      <p>
        El runtime de IA carga el modelo Navi 10 desde la bóveda de sistema de solo lectura y lo ejecuta íntegramente
        en tu dispositivo. En sistemas Akida, las capas se mapean a núcleos neuronales spiking (terreno de los
        milivatios); en otros casos se usan kernels CPU optimizados. El sandbox del runtime no tiene permiso de red en
        ningún momento. Lee más en <Link to="/docs/echo">Modelos ECHO</Link>.
      </p>
    ),
  },
];
