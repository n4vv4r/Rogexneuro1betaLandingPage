import { Link } from 'react-router-dom';
// Docs — Paquetes (ES)
export const blocks = [
  {
    h2: 'El formato de paquete .rxp',
    body: (
      <p>
        EchOS usa su propio formato de paquetes: archivos <code>.rxp</code>. Un archivo .rxp agrupa el contenido del
        paquete, un manifiesto de dependencias, una firma criptográfica y hooks de instalación opcionales (scripts
        pre/post ejecutados en un sandbox restringido).
      </p>
    ),
  },
  {
    h2: 'rx-pkg — el gestor de paquetes',
    body: (
      <>
        <p><code>rx-pkg</code> es la herramienta de línea de comandos que gestiona el ciclo de vida completo:</p>
        <ul>
          <li><code>rx-pkg install &lt;nombre&gt;</code> — resuelve, verifica e instala un paquete.</li>
          <li><code>rx-pkg remove &lt;nombre&gt;</code> — desinstala y reclama espacio.</li>
          <li><code>rx-pkg search &lt;término&gt;</code> — consulta repositorios locales o configurados.</li>
          <li><code>rx-pkg verify</code> — revalida los archivos instalados contra los manifiestos firmados.</li>
          <li><code>rx-pkg list</code> — inventario de todo lo instalado en el sistema.</li>
        </ul>
        <p>
          Antes de tocar tu sistema, rx-pkg valida checksums contra manifiestos firmados. Una firma inválida aborta la
          instalación sin escrituras parciales.
        </p>
      </>
    ),
  },
  {
    h2: 'Repositorios offline-first',
    body: (
      <p>
        En builds Edge, rx-pkg funciona totalmente sin conexión: apúntalo a un directorio de repositorio local o a un
        medio extraíble y resolverá dependencias desde ahí. Las ediciones de escritorio pueden usar además
        repositorios en red cuando tú te conectas — nunca automáticamente.
      </p>
    ),
  },
  {
    h2: 'Herramientas base',
    body: (
      <>
        <p>Además de rx-pkg, cada edición incluye un pequeño conjunto de herramientas base:</p>
        <ul>
          <li><code>files</code> — explorador de archivos + visor multimedia en terminal (la única interfaz de archivos en Edge).</li>
          <li><code>settings</code> — CLI de configuración del sistema; las ediciones de escritorio exponen el mismo motor que la app Ajustes.</li>
          <li><code>explorer</code> — Explorador de archivos gráfico sobre la bóveda RXFS (Complete/Minimal).</li>
          <li><code>echo</code> — habla con el asistente desde cualquier terminal.</li>
        </ul>
      </>
    ),
  },
];
