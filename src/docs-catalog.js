/** Public markdown + PDF catalog for the in-site viewer. */
export const DOC_CATEGORIES = [
  { id: 'tutorial', label: 'Tutorial', color: '#c43c24' },
  { id: 'demo', label: 'Demostración', color: '#2a7a4b' },
  { id: 'bench', label: 'Benchmarks', color: '#b58900' },
  { id: 'theory', label: 'Teoría', color: '#3d5a99' },
  { id: 'research', label: 'Investigación', color: '#7a3d8c' },
  { id: 'impl', label: 'Implementación', color: '#1a6b7a' },
  { id: 'wsp', label: 'RogexWSP', color: '#c45c14' },
  { id: 'prisma', label: 'PRISMA', color: '#8b3a4a' },
];

export const DOCS = [
  {
    id: 'tutorial-monad',
    title: 'Tutorial rxOS 8 DESKTOP',
    category: 'tutorial',
    path: '/docs/rxos/tutorial-monad.md',
    blurb: 'Arrancar la ISO 8, tecla v, /prove, cómo medir.',
  },
  {
    id: 'rxos8',
    title: 'rxOS 8 DESKTOP — qué es',
    category: 'tutorial',
    path: '/docs/rxos/RXOS8.md',
    blurb: 'Unikernel, números comprobables, historia de versiones.',
  },
  {
    id: 'navi45',
    title: 'NAVI-4.5 — el operador',
    category: 'impl',
    path: '/docs/rxos/NAVI45.md',
    blurb: 'WSP 16 B, G_rxos, /prove. No es un LLM.',
  },
  {
    id: 'user-notice',
    title: 'Aviso NAVI-4.5 — qué esperar',
    category: 'tutorial',
    path: '/docs/rxos/USER_NOTICE.md',
    blurb: 'Habla WSP. El castellano es máscara. Lista blanca.',
  },
  {
    id: 'para-curiosos',
    title: 'rxOS 8 para curiosos',
    category: 'demo',
    path: '/docs/rxos/para-curiosos.md',
    blurb: 'Tres minutos, capturas reales, cero teatro.',
  },
  {
    id: 'demostracion',
    title: 'Demostración y benches rxOS 8',
    category: 'demo',
    path: '/docs/rxos/demostracion.md',
    blurb: 'QEMU, /prove, Q₆, capturas 11–17 del 13 ago 2026.',
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
    title: 'RFC-2026-08-Q6 — PoC medido',
    category: 'theory',
    path: '/docs/navi/RFC-2026-08-Q6.md',
    blurb: 'Hipercubo Q₆, Hamming, codebook [6,3,3]. Lo que ya corre.',
  },
  {
    id: 'rfc-q6-campana',
    title: 'RFC-2026-08-Q6 — campaña abierta',
    category: 'research',
    path: '/docs/navi/RFC-2026-08-Q6-CAMPANA.md',
    pdf: '/docs/navi/RFC-2026-08-Q6_CAMPANA.pdf',
    blurb: 'Convocatoria: hipótesis Q₆, fases, KPI y dónde enviar resultados.',
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
    title: 'rxOS MONAD — mapa de código',
    category: 'research',
    path: '/docs/rxos/MONAD.md',
    blurb: 'Dónde está el código y cómo comprobarlo.',
  },
  {
    id: 'navi3',
    title: 'NAVI-3/4 WSP — arquitectura',
    category: 'impl',
    path: '/docs/rxos/NAVI3_WSP_ARCHITECTURE.md',
    blurb: 'Transductor S→S′, 16 B, máscara ES, ext v0.5.',
  },
  {
    id: 'navi2',
    title: 'NAVI 2 — arquitectura (legado ASCII)',
    category: 'impl',
    path: '/docs/rxos/NAVI2_ARCHITECTURE.md',
    blurb: 'Motor de bytes legado. El chat del ISO usa NAVI-3.',
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
  {
    id: 'wsp-readme',
    title: 'RogexWSP — protocolo',
    category: 'wsp',
    path: '/docs/wsp/README.md',
    blurb: 'Un núcleo de significado, muchas máscaras. Repo navywakura/RogexWSP.',
  },
  {
    id: 'wsp-philosophy',
    title: 'RogexWSP — filosofía',
    category: 'wsp',
    path: '/docs/wsp/PHILOSOPHY.md',
    blurb: 'I+E→S. La palabra es solo una máscara.',
  },
  {
    id: 'wsp-spec',
    title: 'RogexWSP — SPEC v0.1',
    category: 'wsp',
    path: '/docs/wsp/SPEC.md',
    blurb: '32 átomos, 6 ejes, JSON y binario normativo.',
  },
  {
    id: 'wsp-binary',
    title: 'RogexWSP — formato binario',
    category: 'wsp',
    path: '/docs/wsp/BINARY_FORMAT.md',
    blurb: 'Magic WSP, flags, átomos 5-bit, emoción i8.',
  },
  {
    id: 'wsp-snippets',
    title: 'RogexWSP — snippets',
    category: 'wsp',
    path: '/docs/wsp/SNIPPETS.md',
    blurb: 'primitives, Emotion, Symbol, encode/decode. Código real.',
  },
];

export function catById(id) {
  return DOC_CATEGORIES.find((c) => c.id === id) || null;
}

export function docById(id) {
  return DOCS.find((d) => d.id === id) || null;
}

export function docByPath(pathname) {
  const clean = pathname.replace(/\/+$/, '');
  return DOCS.find((d) => d.path.replace(/\.md$/, '') === clean || d.path === clean) || null;
}
