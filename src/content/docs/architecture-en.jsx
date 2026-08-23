import { Link } from 'react-router-dom';
// Docs — Architecture (EN)
export const blocks = [
  {
    h2: 'The EchOS kernel',
    body: (
      <p>
        The EchOS kernel is written from scratch: no Linux, no BSD lineage. It provides cooperative-preemptive
        scheduling, a flat memory manager with paging, a unified device-driver interface and a power-management plane.
        The same kernel image drives desktop-class x86_64 CPUs and neuromorphic silicon such as the{' '}
        <strong>BrainChip Akida</strong>, where a dedicated spiking-core scheduler exposes NPU inference as a
        first-class system resource.
      </p>
    ),
  },
  {
    h2: 'Eclipse Shell — window server & dock',
    body: (
      <>
        <p>
          Eclipse Shell is EchOS's composited window server. It owns the whole screen: it composites every window,
          applies blur/glow passes from the eclipse theme and animates workspace transitions. There is no third-party
          display stack underneath.
        </p>
        <p>The shell ships with a macOS-style dock featuring:</p>
        <ul>
          <li>Icon magnification on hover, with smooth falloff across neighbouring icons.</li>
          <li>Running-app indicators under every open application.</li>
          <li>Hover labels so you never guess what an icon launches.</li>
          <li>White-glow app icons rendered over the signature Eclipse wallpaper.</li>
        </ul>
      </>
    ),
  },
  {
    h2: 'Rogex Nova — proprietary browser engine',
    body: (
      <p>
        Rogex Nova is not a WebKit or Blink wrapper. It is our own engine: HTML parser, CSS layout engine, JS runtime
        bridge and rasterizer, integrated directly with Eclipse Shell's security model so web content is sandboxed by
        the same rules that govern native windows. Development status is reported honestly inside the browser itself —
        for example, when HTTPS/TLS support is still being staged, Nova says so instead of failing silently. See the{' '}
        <code>nova-www</code> screenshot on the home page.
      </p>
    ),
  },
  {
    h2: 'Native video pipeline',
    body: (
      <p>
        A hardware-aware decoding layer plus a custom image/video stack feed the bundled viewers. Playback avoids
        foreign media frameworks entirely; where a GPU offers fixed-function decode, the pipeline uses it, and CPU
        paths are SIMD-optimized fallbacks. The same stack powers thumbnails in File Explorer and previews in the
        multimedia viewer.
      </p>
    ),
  },
  {
    h2: 'ECHO runtime',
    body: (
      <p>
        The AI runtime loads the Navi 10 model from the read-only system vault and executes it entirely on-device. On
        Akida systems, layers are mapped onto spiking neural cores (milliwatt territory); elsewhere, optimized CPU
        kernels are used. No network permission exists in the runtime's sandbox at any point. Read more in{' '}
        <Link to="/docs/echo">ECHO models</Link>.
      </p>
    ),
  },
];
