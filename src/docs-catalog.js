/** Public markdown + PDF catalog for the in-site viewer. */
export const DOC_CATEGORIES = [
  { id: 'tutorial', label: 'Tutorial' },
  { id: 'demo', label: 'Demostración' },
  { id: 'bench', label: 'Benchmarks' },
  { id: 'theory', label: 'Teoría' },
  { id: 'research', label: 'Investigación' },
  { id: 'impl', label: 'Implementación' },
  { id: 'prisma', label: 'PRISMA' },
];

export const DOCS = [
  {
    id: 'tutorial-monad',
    title: 'Tutorial rxOS 7 MONAD',
    category: 'tutorial',
    path: '/docs/rxos/tutorial-monad.md',
    blurb: 'Arrancar la ISO, chatear con NAVI 2, RAG y cómo medir.',
  },
  {
    id: 'user-notice',
    title: 'Aviso NAVI 2 — qué esperar',
    category: 'tutorial',
    path: '/docs/rxos/USER_NOTICE.md',
    blurb: 'Solo texto plano. No es un LLM. Límites honestos.',
  },
  {
    id: 'para-curiosos',
    title: 'MONAD para curiosos',
    category: 'demo',
    path: '/docs/rxos/para-curiosos.md',
    blurb: 'Tres minutos, capturas reales, cero teatro.',
  },
  {
    id: 'demostracion',
    title: 'Demostración y benches MONAD',
    category: 'demo',
    path: '/docs/rxos/demostracion.md',
    blurb: 'QEMU, self-test, L1/L2, capturas del 13 ago 2026.',
  },
  {
    id: 'monad-demo',
    title: 'Spec de demo dual',
    category: 'demo',
    path: '/docs/rxos/MONAD-DEMO.md',
    blurb: 'Público curioso + métricas para quien mide.',
  },
  {
    id: 'measure',
    title: 'MEASURE — cómo medir Q₆ / L2',
    category: 'bench',
    path: '/docs/navi/MEASURE.md',
    blurb: 'Protocolo de medida del banco host NAVI.',
  },
  {
    id: 'l2',
    title: 'NAVI L2 — HDC + RWKV',
    category: 'bench',
    path: '/docs/navi/L2.md',
    blurb: '66 352 B planos, leaky 7:1, no es un LLM.',
  },
  {
    id: 'l3',
    title: 'NAVI L3 — entrenar el SLM',
    category: 'bench',
    path: '/docs/navi/L3.md',
    blurb: 'train.py → navi2_weights.bin, sin Hugging Face.',
  },
  {
    id: 'rfc-q6',
    title: 'RFC-2026-08-Q6',
    category: 'theory',
    path: '/docs/navi/RFC-2026-08-Q6.md',
    blurb: 'Hipercubo Q₆, Hamming, codebook [6,3,3].',
  },
  {
    id: 'manifesto',
    title: 'Manifiesto neuromórfico',
    category: 'theory',
    path: '/docs/rxos/neuromorphic_manifesto.md',
    blurb: 'Eventos, LIF entero, límites del slogan.',
  },
  {
    id: 'event-fabric',
    title: 'Event fabric',
    category: 'theory',
    path: '/docs/rxos/event_fabric.md',
    blurb: 'Anillos SPSC, actores blandos, Q16.16.',
  },
  {
    id: 'monad',
    title: 'rxOS 7 MONAD — mapa',
    category: 'research',
    path: '/docs/rxos/MONAD.md',
    blurb: 'Dónde está el código y cómo comprobarlo.',
  },
  {
    id: 'navi2',
    title: 'NAVI 2 — arquitectura',
    category: 'impl',
    path: '/docs/rxos/NAVI2_ARCHITECTURE.md',
    blurb: 'Pesos .bin, chat, RAG HTTP → HDC, no backprop.',
  },
  {
    id: 'kernel-navi',
    title: 'kernel/navi README',
    category: 'impl',
    path: '/docs/navi/kernel.md',
    blurb: 'Actor blando Q₆ en el unikernel.',
  },
  {
    id: 'prisma-engine',
    title: 'PRISMA Engine técnico',
    category: 'prisma',
    path: '/docs/prisma/PRISMA_ENGINE_TECHNICAL.md',
    blurb: 'Runtime Rust: SPSC, Δ-mod, LIF AVX2.',
  },
  {
    id: 'prisma5-snn',
    title: 'PRISMA 5 SNN',
    category: 'prisma',
    path: '/docs/prisma/PRISMA_5_SNN_TECHNICAL.md',
    blurb: 'Producto SNN event-driven (sin descarga P5).',
  },
  {
    id: 'prisma5-roadmap',
    title: 'PRISMA 5 roadmap',
    category: 'prisma',
    path: '/docs/prisma/PRISMA_5_ROADMAP.md',
    blurb: 'Fases α → 1.0 y gates de release.',
  },
];

export function docById(id) {
  return DOCS.find((d) => d.id === id) || null;
}

export function docByPath(pathname) {
  const clean = pathname.replace(/\/+$/, '');
  return DOCS.find((d) => d.path.replace(/\.md$/, '') === clean || d.path === clean) || null;
}
