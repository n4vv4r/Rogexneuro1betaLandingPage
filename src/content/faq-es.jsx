import { Link } from 'react-router-dom';
// FAQ content — Spanish
export const faqEs = [
  {
    q: '¿Qué es exactamente EchOS?',
    a: (
      <p>
        EchOS es un sistema operativo independiente desarrollado desde cero por Rogex Laboratories (una marca de Knights
        Labs). La versión 1.0 incluye un entorno de escritorio completo (la <strong>Eclipse Shell</strong>, con un dock
        estilo macOS), un motor de navegador web propio llamado <strong>Rogex Nova</strong>, un asistente de IA en el
        dispositivo llamado <strong>ECHO</strong> impulsado por el modelo Navi 10, un IDE nativo y visores de
        vídeo/imagen. Antes se llamaba <em>rxOS</em> y fue renombrado a EchOS para la versión 1.0.
      </p>
    ),
  },
  {
    q: '¿Cuáles son los requisitos de hardware?',
    a: (
      <ul>
        <li><strong>Complete / Minimal:</strong> CPU x86_64 (se recomiendan 2 núcleos como mínimo), 4 GB de RAM (8 GB cómodos), 16 GB de almacenamiento, cualquier GPU soportada por nuestros drivers. Complete también funciona en procesadores neuromórficos como el <strong>BrainChip Akida</strong>, donde ECHO se ejecuta nativamente en la NPU.</li>
        <li><strong>Edge:</strong> placas x86_64 con tan solo 256 MB de RAM, además de objetivos ARM. Diseñado para dispositivos IoT, robótica, drones y cámaras.</li>
      </ul>
    ),
  },
  {
    q: '¿En qué se diferencian las tres ediciones?',
    a: (
      <ul>
        <li><strong>Complete:</strong> todo — escritorio, navegador Rogex Nova, IA ECHO (Navi 10), IDE, visores multimedia, soporte CPU + Akida.</li>
        <li><strong>Minimal:</strong> el mismo entorno de escritorio y conjunto de drivers, pero sin el asistente de IA ECHO y sin IDE incluido. Afinada para la eficiencia del uso diario.</li>
        <li><strong>Edge:</strong> compilación solo-CLI para objetivos embebidos y sin pantalla. Sin escritorio. Incluye el modelo edge reentrenable <strong>Navi Mini</strong> y el comando <code>files</code> integrado (explorador de archivos y visor multimedia en la terminal).</li>
      </ul>
    ),
  },
  {
    q: '¿De verdad está construido desde cero?',
    a: (
      <p>
        Sí. El kernel, el servidor de ventanas Eclipse Shell, el motor de navegador Rogex Nova, el pipeline de vídeo y el
        runtime de IA están diseñados por Rogex Laboratories. EchOS no es un fork de Linux, BSD ni de ninguna
        distribución existente — es una base de código independiente, y su fuente está disponible bajo GNU GPLv3.
      </p>
    ),
  },
  {
    q: '¿Cómo funciona ECHO sin conexión?',
    a: (
      <p>
        ECHO funciona sobre el modelo <strong>Navi 10</strong>, que viaja dentro de la propia imagen del sistema. La
        inferencia ocurre localmente: nada sale de tu máquina, nunca. En CPUs estándar el runtime usa kernels
        optimizados; cuando hay una NPU BrainChip Akida presente, la inferencia se descarga a ella, reduciendo
        drásticamente el consumo. No existe componente en la nube ni alternativa a APIs remotas.
      </p>
    ),
  },
  {
    q: '¿EchOS soporta NPUs como BrainChip Akida?',
    a: (
      <p>
        Sí. El kernel y la pila de drivers incluyen soporte de primera clase para procesadores neuromórficos, con
        BrainChip Akida como plataforma de referencia. En sistemas con Akida, la edición Complete dirige la inferencia de
        Navi 10 por los núcleos neuronales spiking. Los sistemas solo-CPU también están totalmente soportados — la NPU
        simplemente acelera más las cosas.
      </p>
    ),
  },
  {
    q: '¿Cómo funciona el sistema de paquetes? ¿Qué es .rxp / rx-pkg?',
    a: (
      <p>
        EchOS usa su propio formato de paquetes: archivos <code>.rxp</code>, gestionados por la herramienta de línea de
        comandos <code>rx-pkg</code>. Los paquetes declaran dependencias, firmas y hooks de instalación; rx-pkg verifica
        checksums contra manifiestos firmados antes de tocar tu sistema. En builds Edge, rx-pkg funciona totalmente sin
        conexión con repositorios locales o medios extraíbles.
      </p>
    ),
  },
  {
    q: '¿Qué licencia usa EchOS? ¿Puedo usarlo comercialmente?',
    a: (
      <p>
        EchOS se publica bajo la <strong>Licencia Pública General GNU v3</strong>. Puedes usarlo, estudiarlo, modificarlo
        y redistribuirlo — incluso comercialmente — siempre que cumplas los términos de la GPLv3: las obras derivadas
        deben seguir siendo software libre bajo la misma licencia y debe ofrecerse el código fuente. "Rogex
        Laboratories", "Knights Labs", "EchOS", "Rogex Nova", "Eclipse Shell" y "ECHO" son marcas de sus respectivos
        titulares; el uso de marca va separado de la licencia de código.
      </p>
    ),
  },
  {
    q: '¿Cómo puedo contribuir?',
    a: (
      <p>
        El repositorio oficial de desarrollo vive en{' '}
        <a href="https://github.com/knightslabs/echos" target="_blank" rel="noopener noreferrer">github.com/knightslabs/echos ↗</a>.
        Haz un fork, crea una rama desde <code>main</code> y abre pull requests. Buenas primeras contribuciones:
        mejoras de drivers, puertos de objetivos Edge, traducciones de documentación e informes de bugs con pasos
        reproducibles. Todas las contribuciones se aceptan bajo GPLv3.
      </p>
    ),
  },
  {
    q: '¿Dónde obtengo soporte?',
    a: (
      <ul>
        <li>
          <strong>GitHub Issues:</strong> bugs y peticiones de funcionalidades en{' '}
          <a href="https://github.com/knightslabs/echos/issues" target="_blank" rel="noopener noreferrer">
            github.com/knightslabs/echos/issues ↗
          </a>.
        </li>
        <li>
          <strong>Correo:</strong> escribe a <a href="mailto:knightsys@proton.me">knightsys@proton.me</a>. Rogex
          Laboratories es una empresa unipersonal, así que date unos días de margen para la respuesta.
        </li>
      </ul>
    ),
  },
  {
    q: '¿Por qué el tema del eclipse?',
    a: (
      <p>
        Un eclipse es el momento en que un cuerpo se vuelve plenamente visible al bloquear su propia fuente de luz — una
        metáfora adecuada para un SO que te muestra exactamente qué se ejecuta en tu hardware, sin procesos ocultos que
        llamen a casa. También queda genial en CSS puro.
      </p>
    ),
  },
  {
    q: 'EchOS no recopila datos — ¿en serio?',
    a: (
      <p>
        En serio. EchOS es amnésico por defecto y contiene cero telemetría. Lee todos los detalles en nuestra{' '}
        <Link to="/privacy">Política de Privacidad</Link>. Este sitio web tampoco instala cookies de rastreo.
      </p>
    ),
  },
];
