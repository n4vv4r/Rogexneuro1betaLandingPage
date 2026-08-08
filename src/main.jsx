import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Brain,
  CheckCircle,
  CircleDot,
  Code2,
  Cpu,
  Database,
  Download,
  Factory,
  FlaskConical,
  Heart,
  Leaf,
  Rocket,
  Target,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  Lock,
  Mail,
  Menu,
  Microscope,
  Network,
  Radio,
  Send,
  Shield,
  Terminal,
  Waves,
  Zap,
  X,
} from 'lucide-react';
import './styles.css';
import NewspaperApp, { shouldMountNewspaper } from './newspaper/NewspaperApp.jsx';

const NAV_ITEMS = [
  ['/', 'HOME'],
  ['/suite', 'SUITE'],
  ['/architecture', 'ARCHITECTURE'],
  ['/prisma', 'PRISMA'],
  ['/rx-os', 'RX OS'],
  ['/investors', 'INVESTORS'],
  ['/pitch', 'PITCH'],
  ['/startup-idea', 'STARTUP'],
  ['/about', 'ABOUT'],
  ['https://newspaper.rogexlaboratories.com', 'NEWSPAPER'],
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/rogexlaboratories', mark: 'IG' },
  { label: 'GitHub', href: 'https://github.com/n4vv4r', mark: 'GH' },
  { label: 'X', href: 'https://x.com/rogexlabs', mark: 'X' },
  { label: 'Newspaper', href: 'https://newspaper.rogexlaboratories.com', mark: 'NP' },
  { label: 'Linktree', href: 'https://linktr.ee/rogynavy', icon: LinkIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@rollitodprimavera', mark: 'YT' },
];

const PRODUCT_SUITE = [
  {
    id: 'rxos-desktop',
    code: 'RX-01',
    name: 'rxOS Desktop Experience',
    tier: 'CLOSED SOURCE · BOOTABLE x86-64',
    status: 'v4.5.0 · HARDWARE + QEMU',
    text: 'Entorno bare-metal de laboratorio (RXos v4.5): boot Multiboot2, shell, RXFS, compositor y tejido de eventos en caminos vivos. Verificado en HP 15-ac195nl y QEMU.',
    tags: ['x86_64', 'GRUB / Multiboot2', 'Event fabric', 'HP 15 ref'],
    href: '/rx-os',
    icon: Cpu,
    tone: 'dark',
  },
  {
    id: 'rxos-kernel',
    code: 'RX-02',
    name: 'rxOS Neuromorphic Kernel',
    tier: 'OPEN · EVENT FABRIC LIF/STDP',
    status: 'NIVEL 1–2 CERRADOS · NIVEL 3 BLOQUEADO',
    text: 'Sustrato neuromórfico verificable sobre von Neumann: eventos 64 B, anillos SPSC, LIF Q16.16, STDP local y bench 6/6. No es silicio Akida — ese chip es el siguiente escalón.',
    tags: ['LIF Q16.16', 'STDP', 'SPSC rings', 'bench 6/6'],
    href: '/architecture',
    icon: Network,
    tone: 'acid',
  },
  {
    id: 'prisma3',
    code: 'P3',
    name: 'PRISMA 3',
    tier: 'POSIX / SIMD · HIGH PERFORMANCE EEG',
    status: 'ACTIVE · OPEN-CORE PATH',
    text: 'Motor de alto rendimiento frente a software EEG comercial pesado: zero-copy SPSC, DSP SIMD, ICA en vivo, geometría Riemanniana y normalización por sujeto. Objetivo <64 MB en stack rxOS.',
    tags: ['Zero-copy', 'SIMD FFT', 'ICA RT', '73.3%→91% personal'],
    href: '/prisma#prisma3',
    icon: Brain,
    tone: 'paper',
  },
  {
    id: 'prisma5',
    code: 'P5',
    name: 'PRISMA 5',
    tier: 'EVENT-DRIVEN SNN · BCI <1 ms',
    status: 'R&D · NEUROMORPHIC ENGINE',
    text: 'Abandona ventanas/FFT: spike trains por Delta Modulation, LIF, STDP, predictive coding y resonancia de ritmos. Corre sobre el event fabric de RXos v4.5. Target Akida cuando haya silicio.',
    tags: ['Delta mod', 'LIF/STDP', 'Predictive coding', '<1 ms event'],
    href: '/prisma#prisma5',
    icon: Zap,
    tone: 'accent',
  },
];

const LICENSE_TIERS = [
  {
    product: 'PRISMA 3',
    rows: [
      ['Community / Student', 'Gratis / Open', 'Estudiantes, makers, países en desarrollo'],
      ['Indie / Developer', '€49 – €89', 'Integración en prototipos (pago único)'],
      ['Research Lab / Pro', '€149 – €199', 'Labs y equipos · licencia por puesto/año'],
    ],
  },
  {
    product: 'PRISMA 5',
    rows: [
      ['Academic / Personal', '€129 – €199', 'Investigación SNN / BCI (pago único)'],
      ['Commercial / Lab', '€299 – €399', 'Neurofeedback, BCI, labs comerciales'],
      ['OEM / Integrator', 'Royalty / custom', 'Hardware (OpenBCI, Muse, BrainBit…)'],
    ],
  },
  {
    product: 'rxOS',
    rows: [
      ['Event fabric docs', 'Open papers', 'Paper + hoja de ruta 4 niveles'],
      ['Desktop Experience', 'Closed source', 'Bootable lab surface v4.5'],
      ['OEM / Akida path', 'Custom arch', 'Nivel 3 bare-metal NPU'],
    ],
  },
];

/** Fichas de producto con descarga "coming soon" — Prisma 3 y Prisma 5 */
const PRISMA_DOWNLOAD_PRODUCTS = [
  {
    id: 'prisma3',
    code: 'P3',
    name: 'Prisma 3',
    version: 'High-Performance POSIX / SIMD',
    status: 'IN DEVELOPMENT',
    badge: 'Próximamente / Coming Soon',
    tagline: 'Alternativa moderna a software EEG comercial pesado: pipeline multiplataforma, zero-copy, SIMD y firma biológica por sujeto — no una caja negra de varios GB.',
    description:
      'Prisma 3 reescribe el camino de la señal: buffers SPSC lock-free en C/Rust, FFT/filtros vectorizados (AVX2/NEON), ICA en tiempo real y geometría Riemanniana en espacio tangente. Evidencia actual: ~73.3% raw LOSO → ~91% personalizado. Experimental, no clínico.',
    features: [
      'Zero-copy SPSC + streaming multicanal sin alloc en hot path',
      'DSP SIMD (IIR/FIR + FFT) · latencia de ventana ~5–10 ms objetivo',
      'ICA / wavelet en vivo para artefactos oculares y EMG',
      'Normalización por sujeto + Riemann covariance · footprint objetivo <64 MB en rxOS',
    ],
    downloadLabel: 'Descargar Prisma 3',
    tone: 'paper',
    icon: Brain,
  },
  {
    id: 'prisma5',
    code: 'P5',
    name: 'Prisma 5',
    version: 'Neuromorphic Event Engine',
    status: 'IN DEVELOPMENT',
    badge: 'Aún no disponible',
    tagline: 'Motor SNN event-driven: el EEG deja de ser bloques FFT y pasa a ser trenes de espigas. Latencia de evento <1 ms · idle en mW sobre RXos.',
    description:
      'Prisma 5 codifica microvoltios → spikes (Delta Modulation), filtra artefactos con STDP, detecta ritmos por resonancia de poblaciones LIF y anomalías por error de predicción de espigas. Puente hacia silicio Akida cuando el lab disponga del chip.',
    features: [
      'ΔV(t)=V(t)−V(t_prev) → spike UP/DOWN si |ΔV|≥θ_adp',
      'Predictive coding LIF: anomalía = spike-error, no solo espectro',
      'STDP + homeostasis local (τ_m, θ₀) como firma biológica inicial',
      'Ritmos δ/θ/α/β por resonancia (sin windowing FFT) · target MCU/FPGA/Akida',
    ],
    downloadLabel: 'Descargar Prisma 5',
    tone: 'dark',
    icon: Zap,
  },
];

/** Comparativa de clase arquitectónica — sin nombrar competidores concretos */
const PRISMA_VS_LEGACY = [
  {
    criterion: 'Arquitectura',
    others: 'Monolítica / OS comercial pesado',
    p3: 'POSIX nativo / SIMD vectorial',
    p5: 'SNN event-driven sobre RXos',
  },
  {
    criterion: 'Entrada',
    others: 'Muestreo por ventanas / batch',
    p3: 'Zero-copy vectorial · SPSC rings',
    p5: 'Spike streams (Delta Modulation)',
  },
  {
    criterion: 'Ritmos',
    others: 'FFT / power spectrum clásico',
    p3: 'FFT acelerada SIMD',
    p5: 'Resonancia de poblaciones LIF',
  },
  {
    criterion: 'Artefactos',
    others: 'Manual / filtros estáticos',
    p3: 'ICA / wavelet en tiempo real',
    p5: 'Inhibición de espigas (STDP)',
  },
  {
    criterion: 'Latencia',
    others: '~100–500 ms / ventana (típico)',
    p3: '~5–10 ms objetivo',
    p5: '<1 ms por evento',
  },
  {
    criterion: 'Hardware',
    others: 'PC potentes · varios GB de RAM',
    p3: 'x86_64 / ARM64 · objetivo <64 MB en rxOS',
    p5: 'MCU / FPGA / coprocesador SNN / Akida',
  },
  {
    criterion: 'Energía',
    others: 'Alto (CPU continua / idle waste)',
    p3: 'Medio-bajo (SIMD + idle controlado)',
    p5: 'Ultra-bajo (mW, wake-on-event)',
  },
];

const ARCH_STACK = [
  {
    layer: '01',
    title: 'BOOT / x86_64',
    text: 'GRUB Multiboot2 → long mode, mapa identidad 4 GiB (páginas 2 MiB), GDT 64-bit y kmain(). Sin volver al firmware.',
    detail: 'NASM · Multiboot2 · PAE + long mode',
  },
  {
    layer: '02',
    title: 'EVENT FABRIC',
    text: 'rx_event_t de 64 B alineado a línea de caché. Anillos SPSC ISR→pump, mfence, IF=0 en puertas. Sin tick neural periódico.',
    detail: 'SPSC · 64 B/event · auto-test al boot',
  },
  {
    layer: '03',
    title: 'LIF + STDP',
    text: 'Unidades LIF en Q16.16 (kernel -mno-sse). Fuga perezosa V·τ/(τ+Δt). Plasticidad STDP local por actor.',
    detail: 'Integer exact · no FPU · codificación temporal',
  },
  {
    layer: '04',
    title: 'LIVE OS PATHS',
    text: 'Teclado/ratón tipados (nunca umbralizados), NIC always-fire, WM umbralizado, lazo: shell como tarea + rx_kernel_event_loop().',
    detail: 'IRQ1/12 · net actor · WM refresh · power_idle',
  },
  {
    layer: '05',
    title: 'NIVEL 3 · AKIDA (PENDING)',
    text: 'Delegación a silicio neuromórfico: USB/XHCI, HPET, driver BrainChip Akida AKD1000 y trenes de impulsos. Chip físico aún no disponible en el lab.',
    detail: 'OBJETIVO · falta NPU + pila USB bare-metal',
  },
];

const RXOS_LEVELS = [
  {
    level: '01',
    title: 'NÚCLEO DEL TEJIDO',
    state: 'CERRADO',
    tone: 'ok',
    text: 'Eventos 64 B, SPSC, LIF Q16.16, STDP, red/entrada/WM por el tejido, inversión del lazo. Evidencia: bench 6/6, auto-test PASS, status tasks=2.',
  },
  {
    level: '02',
    title: 'x86_64 + ENERGÍA',
    state: 'CERRADO',
    tone: 'ok',
    text: 'Scheduler cooperativo real, ACPI C-states, MONITOR/MWAIT/HLT, RAPL con #GP guard, tolerancia a fallos etiquetada como redundancia clásica. Verificado en i7-5500U.',
  },
  {
    level: '03',
    title: 'DELEGACIÓN NEUROMÓRFICA',
    state: 'OBJETIVO · BLOQUEADO',
    tone: 'warn',
    text: 'USB XHCI, resolución <10 ms (HPET/APIC), driver Akida AKD1000, encode/decode de impulsos y J/inferencia CPU vs NPU. Falta el chip Akida en el laboratorio.',
  },
  {
    level: '04',
    title: 'SILICIO SIN RELOJ',
    state: 'HORIZONTE',
    tone: 'open',
    text: 'Memristores, cómputo en memoria, sin reloj. Dependencia de la industria de semiconductores — no se comunica como entregado.',
  },
];

const RXOS_PAPERS = [
  {
    code: 'PAPER / REV 1.0',
    title: 'RXos: un sustrato neuromórfico verificable sobre hardware von Neumann',
    text: 'Cómo funciona el código y cómo comprobar — no creer — que el comportamiento neuromórfico es real. Criterio: codificación temporal falsable con bench.',
    href: '/docs/rxos/rxos_paper_neuromorfico_rev1.0.pdf',
    meta: '6 páginas · HP 15-ac195nl + QEMU',
  },
  {
    code: 'ROADMAP / REV 1.3',
    title: 'Hoja de ruta neuromórfica — cuatro niveles',
    text: 'Nivel 1–2 cerrados. Nivel 3 (Akida bare-metal) objetivo. Nivel 4 horizonte industrial. Casillas [x]/[~]/[ ] sin aspiracionalismo.',
    href: '/docs/rxos/rxos_hoja_de_ruta_4_niveles_rev1.3.pdf',
    meta: '3 páginas · estado verificado',
  },
];

const RXOS_BENCH = [
  { test: 'temporal: 3 stim, fast', model: '1 spike', kernel: '1 spike', result: 'PASS' },
  { test: 'temporal: 3 stim, slow', model: '0 spikes', kernel: '0 spikes', result: 'PASS' },
  { test: 'decay vs V·τ/(τ+Δt)', model: '5/5 exact', kernel: '5/5 exact', result: 'PASS' },
  { test: 'determinism, 72 steps', model: 'bit-exact', kernel: 'bit-exact', result: 'PASS' },
  { test: 'refractory lockout', model: '0 then 1', kernel: '0 then 1', result: 'PASS' },
  { test: 'sparsity: 200 sub-thr', model: '200 absorbed', kernel: '200 absorbed', result: 'PASS' },
];

const RXOS_HERO_IMAGE = '/rxos/pc_with_rxos_installed.jpg';
const RXOS_OG_IMAGE = 'https://www.rogexlaboratories.com/rxos/pc_with_rxos_installed.jpg';
const RXOS_VERSION = 'v4.5.0';

const CTA_AUDIENCES = [
  {
    id: 'developers',
    icon: Code2,
    title: 'DEVELOPERS',
    text: 'Kernel open source, APIs de eventos, runtime Roxenite y builds reproducibles en QEMU. Contribuye drivers, tests y toolchains.',
    action: 'Open architecture',
    href: '/architecture',
    mailSubject: 'Developer collaboration — Knights Labs / rxOS',
  },
  {
    id: 'researchers',
    icon: Microscope,
    title: 'RESEARCHERS',
    text: 'PRISMA 3.2 para pipelines EEG trazables; PRISMA 5 como motor neuromórfico experimental. Sin claims clínicos.',
    action: 'Explore PRISMA',
    href: '/prisma',
    mailSubject: 'Research collaboration — PRISMA / EEG',
  },
  {
    id: 'oem',
    icon: Factory,
    title: 'OEM / INTEGRATORS',
    text: 'Nivel 3 RXos: Akida AKD1000 bare-metal, royalties y arquitectura custom. El lab busca acceso a silicio neuromórfico real.',
    action: 'Contact OEM desk',
    href: 'mailto:knightsys@proton.me?subject=OEM%20/%20Akida%20/%20Hardware%20%E2%80%94%20Knights%20Labs',
    mailSubject: null,
  },
];

const PRISMA_EVIDENCE = [
  {
    value: '51 passed',
    label: 'verification',
    note: 'Pytest documentado tras integrar la auditoría de confounding; compileall limpio.',
  },
  {
    value: '73.3%',
    label: 'raw LOSO',
    note: 'Modelo genérico inter-sujeto (ds007358 EC/EO) sin calibrar al sujeto de test.',
  },
  {
    value: '87.7%',
    label: 'calibración',
    note: 'Régimen subject-transductive; ceiling etiquetado — no se vende como generalización pura.',
  },
  {
    value: '91.0%',
    label: 'personalizado',
    note: 'Intra-sujeto / firma biológica. Variabilidad individual no es ruido: es la señal.',
  },
];

const PRISMA_32_MODULES = [
  {
    icon: Activity,
    code: 'ZERO-COPY PIPELINE',
    title: 'SPSC LOCK-FREE · SIN ALLOC EN HOT PATH',
    text: 'Buffers circulares C/Rust para streaming multicanal. Elimina el abstraction penalty del batch Windows y las copias en el path crítico de señal.',
  },
  {
    icon: Cpu,
    code: 'DSP SIMD',
    title: 'FFT / IIR / FIR VECTORIZADOS',
    text: 'AVX2/AVX-512 o ARM NEON sobre el pipeline espectral-temporal. Objetivo de latencia de ventana ~5–10 ms frente a los 100–500 ms típicos de software comercial pesado.',
  },
  {
    icon: CircleDot,
    code: 'ICA REAL-TIME',
    title: 'ARTEFACTOS EN VIVO, NO A MANO',
    text: 'ICA/wavelet en hilos dedicados para separar actividad ocular y EMG del EEG útil, en lugar de exclusiones manuales o filtros estáticos de caja negra.',
  },
  {
    icon: Database,
    code: 'RIEMANN + SUBJECT',
    title: 'GEOMETRÍA + FIRMA BIOLÓGICA',
    text: 'Matrices de covarianza en espacio tangente y normalización por sujeto. Confound Auditor + Benchmark Matrix separan raw LOSO, calibración y personalización.',
  },
];

const PRISMA_5_MODULES = [
  {
    icon: Zap,
    code: 'DELTA MODULATION',
    title: 'EEG → SPIKE TRAINS',
    text: 'ΔV(t)=V(t)−V(t_prev). Spike UP si ΔV≥+θ_adp; DOWN si ΔV≤−θ_adp. Solo hay eventos cuando la señal cambia — no hay muestreo inútil.',
  },
  {
    icon: Network,
    code: 'PREDICTIVE CODING',
    title: 'ANOMALÍA = SPIKE ERROR',
    text: 'Población LIF recurrente predice la cadencia del sujeto. Error entre espigas predichas e ingresadas dispara la detección — experimental, no diagnóstico clínico.',
  },
  {
    icon: Activity,
    code: 'STDP FILTER',
    title: 'ARTEFACTOS POR PLASTICIDAD',
    text: 'Parpadeos y EMG generan descargas masivas características. STDP inhibe esos patrones al vuelo sin FFT ni matrices pesadas en el path de eventos.',
  },
  {
    icon: Radio,
    code: 'RHYTHM RESONANCE',
    title: 'δ θ α β SIN WINDOWING',
    text: 'Los ritmos no se extraen esperando 512 ms de FFT: resonancia de poblaciones sintonizadas elimina el windowing delay. Objetivo BCI: <1 ms por evento.',
  },
];

const PRISMA_ROADMAP = [
  {
    year: 'NOW',
    title: 'PRISMA 3.2 RESEARCH',
    state: 'IMPLEMENTED / ACTIVE',
    text: 'Pipeline Python/MNE, Feature Registry, Event Mode, Confound Auditor, Benchmark Matrix. Evidencia 73.3%→91% personalizado en referencia EC/EO.',
  },
  {
    year: 'NEXT',
    title: 'PRISMA 3 PERF ENGINE',
    state: 'ENGINEERING',
    text: 'Zero-copy SPSC, SIMD DSP, ICA en vivo, UI ligera y path LSL hacia footprint &lt;64 MB sobre rxOS.',
  },
  {
    year: 'R+D',
    title: 'PRISMA 5 SNN',
    state: 'NEUROMORPHIC CORE',
    text: 'Delta mod, LIF, STDP, predictive coding y resonancia de ritmos. Event fabric RXos v4.5.',
  },
  {
    year: 'H/W',
    title: 'AKIDA AKD1000',
    state: 'NIVEL 3 · CHIP FALTANTE',
    text: 'Delegación bare-metal de spikes al NPU. El lab aún no dispone del chip BrainChip para silicio real.',
  },
  {
    year: 'L/T',
    title: 'ASTRA',
    state: 'LONG-TERM CONCEPT',
    text: 'Capa experimental de hardware, feedback y protocolos cerrados. Requiere ética, validación y límites regulatorios.',
  },
  {
    year: 'L/T',
    title: 'NOOSPHERE',
    state: 'LONG-TERM CONCEPT',
    text: 'Red federada de investigación entre laboratorios. Comparación de resultados y procedencia — no lectura mental.',
  },
];

const RX_IMPLEMENTED = [
  'RXos v4.5.0: Multiboot2 → long mode, mapa 4 GiB, GDT/IDT, heap y paths vivos.',
  'Tejido de eventos (Nivel 1 cerrado): rx_event_t 64 B, SPSC lock-free, auto-test al boot.',
  'LIF Q16.16 con fuga perezosa V·τ/(τ+Δt); sin tick neural; STDP local por actor.',
  'Entrada IRQ1/IRQ12 tipada (nunca umbralizada); NIC always-fire; WM umbralizado.',
  'Inversión del lazo: shell como tarea; rx_kernel_event_loop() posee la máquina.',
  'Nivel 2 cerrado: scheduler cooperativo, ACPI C-states, MONITOR/MWAIT/HLT, RAPL.',
  'bench 6/6 PASS; ~299 ciclos/evento; ~3 MiB RAM al arrancar; 26+21+net tests.',
  'Hardware de referencia: HP 15-ac195nl (i7-5500U, 8 GB) — install MBR 0x7F + RXFS.',
  'Compositor double-buffer + damage tracking; terminal en el WM; power en metal.',
];

const RX_LIMITS = [
  'Nivel 3 abierto: falta chip BrainChip Akida AKD1000 en el lab para test en silicio real.',
  'Sin pila USB/XHCI bare-metal (prerrequisito del NPU USB).',
  'Resolución temporal del sustrato = 10 ms (PIT 100 Hz); HPET/APIC local pendiente.',
  'No es hardware neuromórfico: silicio con reloj, actores en serie, von Neumann intacto.',
  'No masivamente paralelo ni asíncrono a nanosegundos; ring 0 cooperativo monohilo.',
  'Arranque UEFI nativo aplazado (Legacy/CSM funciona); Wi-Fi y >4 GiB en roadmap.',
  'Instalar RXos como SO arrancable del disco: pedido para próxima versión.',
  'Criptografía (si presente) sin auditoría externa; no es SO de producción ni clínico.',
];

const PROJECTS = [
  {
    name: 'RGX WSP',
    type: 'SYMBOLIC PROTOCOL',
    text: 'Protocolo experimental información + emoción con salidas en texto, JSON, binario, sonido y glifos.',
    stack: ['Python 3.10+', 'stdlib', 'CLI', 'JSON', 'WAV', 'SVG', 'unittest'],
    public: false,
  },
  {
    name: 'RGX GASLIGHT',
    type: 'DEFENSIVE SECURITY',
    text: 'Framework defensivo orientado a engaño, telemetría y perfiles modulares para estudiar automatización ofensiva.',
    stack: ['Python', 'Linux', 'YAML', 'CLI', 'HTML reports', 'event intelligence'],
    public: false,
  },
];

const SKILLS = [
  'Python',
  'Rust',
  'C',
  'x86_64 ASM',
  'React',
  'Vite',
  'Node.js',
  'Linux / Fedora',
  'MNE-Python',
  'NumPy',
  'scikit-learn',
  'EEG signal processing',
  'BIDS / OpenNeuro',
  'QEMU / bare metal',
  'SNN / neuromorphic',
  'Defensive security',
  'YAML / CLI tooling',
  'Git / GitHub',
  'Technical writing',
  'Reproducible research',
];

function useRoute() {
  const [path, setPath] = useState(window.location.pathname || '/');

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (href) => {
    if (href.startsWith('mailto:') || href.startsWith('http')) {
      window.location.href = href;
      return;
    }

    const [base, hash] = href.split('#');
    const target = base || path;

    if (target === path) {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    window.history.pushState({}, '', href);
    setPath(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  return [path, navigate];
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  });
}

function SocialIcon({ item }) {
  const Icon = item.icon;
  return (
    <a
      className="social-icon"
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={item.label}
      title={item.label}
    >
      {Icon ? <Icon size={16} strokeWidth={1.8} /> : <span className="x-mark">{item.mark}</span>}
    </a>
  );
}

function Header({ path, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [path]);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <button className="wordmark" onClick={() => navigate('/')} aria-label="Knights Labs / Rogex Laboratories home">
          <img
            className="wordmark-knights"
            src="/knightslabs_logo.png"
            alt="Knights Labs"
            width={36}
            height={36}
          />
          <span className="wordmark-stack">
            <strong>KNIGHTS LABS</strong>
            <em>ROGEX LABORATORIES</em>
          </span>
        </button>

        <button
          className="menu-toggle"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={menuOpen ? 'nav-drawer is-open' : 'nav-drawer'}>
          <nav className="main-nav" aria-label="Main navigation">
            {NAV_ITEMS.map(([href, label]) => (
              <button
                key={href}
                className={path === href ? 'nav-link is-active' : 'nav-link'}
                onClick={() => navigate(href)}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="social-nav" aria-label="Social links">
            {SOCIALS.map((item) => <SocialIcon item={item} key={item.label} />)}
          </div>
        </div>
      </div>
    </header>
  );
}

function PageHero({ index, eyebrow, title, text, image, children }) {
  return (
    <section className="page-hero" style={{ '--hero-image': `url("${image}")` }}>
      <div className="page-hero-media" aria-hidden="true" />
      <div className="page-hero-grain" aria-hidden="true" />
      <div className="page-hero-content wrap">
        <div className="hero-index">{index}</div>
        <div className="hero-copy">
          <span className="kicker">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{text}</p>
          {children}
        </div>
      </div>
      <div className="hero-caption">KNIGHTS LABS · ROGEX · NEUROMORPHIC R&amp;D · 2026</div>
    </section>
  );
}

function SectionTitle({ code, title, text }) {
  return (
    <div className="section-title" data-reveal>
      <span>{code}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function StatusBadge({ children, tone = 'open' }) {
  return <span className={`status-badge status-${tone}`}>{children}</span>;
}

function DownloadSoonButton({ label, badge = 'Coming Soon' }) {
  return (
    <div className="download-soon">
      <button
        type="button"
        className="brutal-button download-btn-disabled"
        disabled
        aria-disabled="true"
        title={`${label} — ${badge}`}
      >
        <Download size={16} strokeWidth={2} />
        {label}
        <Lock size={14} strokeWidth={2} />
      </button>
      <span className="coming-soon-badge" role="status">
        {badge}
      </span>
    </div>
  );
}

function PrismaProductCard({ product, index }) {
  const Icon = product.icon;
  return (
    <article
      id={product.id}
      className={`prisma-product-card prisma-product-card-${product.tone}`}
      data-reveal
      style={{ '--delay': `${index * 80}ms` }}
    >
      <header className="prisma-product-head">
        <div className="prisma-product-codes">
          <span className="prisma-product-code">{product.code}</span>
          <StatusBadge tone={product.tone === 'dark' ? 'warn' : 'open'}>{product.status}</StatusBadge>
        </div>
        <Icon size={32} strokeWidth={1.35} aria-hidden="true" />
      </header>

      <div className="prisma-product-titles">
        <h3>{product.name}</h3>
        <span className="prisma-product-version">{product.version}</span>
      </div>

      <p className="prisma-product-tagline">{product.tagline}</p>
      <p className="prisma-product-desc">{product.description}</p>

      <div className="prisma-product-features">
        <span className="panel-label">KEY FEATURES</span>
        <ul>
          {product.features.map((feature) => (
            <li key={feature}>
              <CheckCircle size={16} strokeWidth={1.8} aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="prisma-product-footer">
        <DownloadSoonButton label={product.downloadLabel} badge={product.badge} />
        <p className="prisma-product-note">
          Release de distribución pública pendiente · software experimental, no clínico
        </p>
      </footer>
    </article>
  );
}

function PrismaDownloadSection({ code = '00 / MODULES', title = 'PRISMA 3 Y PRISMA 5', text }) {
  return (
    <section className="section wrap prisma-download-section" id="prisma-downloads">
      <SectionTitle
        code={code}
        title={title}
        text={text || 'Fichas de producto con descarga pública. Los binarios aún no están publicados: los botones permanecen deshabilitados hasta el release.'}
      />
      <div className="prisma-product-grid">
        {PRISMA_DOWNLOAD_PRODUCTS.map((product, index) => (
          <PrismaProductCard product={product} index={index} key={product.id} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, navigate, index }) {
  const Icon = product.icon;
  return (
    <article
      className={`suite-card suite-card-${product.tone}`}
      data-reveal
      style={{ '--delay': `${index * 70}ms` }}
    >
      <div className="suite-card-top">
        <span>{product.code}</span>
        <Icon size={26} strokeWidth={1.4} />
      </div>
      <StatusBadge>{product.status}</StatusBadge>
      <h3>{product.name}</h3>
      <div className="suite-tier">{product.tier}</div>
      <p>{product.text}</p>
      <div className="tag-row">
        {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <button className="text-link" onClick={() => navigate(product.href)}>
        OPEN DOSSIER <ArrowUpRight size={15} />
      </button>
    </article>
  );
}

function CtaBand({ navigate }) {
  return (
    <section className="section section-black cta-band" id="join">
      <div className="wrap">
        <SectionTitle
          code="CTA / JOIN"
          title="DEVELOPERS. RESEARCHERS. OEM."
          text="Tres puertas de entrada. El mismo laboratorio. Sin promesas clínicas y con límites explícitos."
        />
        <div className="cta-grid">
          {CTA_AUDIENCES.map(({ id, icon: Icon, title, text, action, href }, index) => (
            <article className="cta-card" key={id} data-reveal style={{ '--delay': `${index * 80}ms` }}>
              <Icon size={28} strokeWidth={1.35} />
              <h3>{title}</h3>
              <p>{text}</p>
              <button className="brutal-button primary" onClick={() => navigate(href)}>
                {action} <ArrowUpRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Sección estilizada como knightscomputer.club (CRT / terminal verde), deliberadamente distinta del resto del lab. */
function KccFindUsSection() {
  return (
    <section className="kcc-find-section" id="kcc" aria-labelledby="kcc-find-title">
      <div className="kcc-find-scanlines" aria-hidden />
      <div className="kcc-find-vignette" aria-hidden />
      <div className="wrap kcc-find-inner" data-reveal>
        <div className="kcc-find-panel">
          <div className="kcc-find-header">
            <span className="kcc-find-live" aria-hidden>
              <span className="kcc-find-pulse" />
              NODE ONLINE
            </span>
            <span className="kcc-find-path">desk@lobby:~$ open kcc</span>
          </div>

          <pre className="kcc-find-ascii" aria-hidden>{` ██╗  ██╗ ██████╗ ██████╗
 ██║ ██╔╝██╔════╝██╔════╝
 █████╔╝ ██║     ██║     
 ██╔═██╗ ██║     ██║     
 ██║  ██╗╚██████╗╚██████╗
 ╚═╝  ╚═╝ ╚═════╝ ╚═════╝`}</pre>

          <p className="kcc-find-eyebrow">COMUNIDAD · NODO UNDERGROUND</p>
          <h2 className="kcc-find-title" id="kcc-find-title">
            Encuéntranos en <span className="kcc-find-glow">KCC</span>
          </h2>
          <p className="kcc-find-text">
            <strong>knightscomputer.club</strong> es el nodo tecnoactivista del lab: foro, lobby,
            paste y debate sin vigilancia. RXos, PRISMA y computación libre — misma tribu, otra
            estética.
          </p>

          <div className="kcc-find-actions">
            <a
              className="kcc-btn"
              href="https://www.knightscomputer.club"
              target="_blank"
              rel="noopener noreferrer"
            >
              ENTRAR AL LOBBY
              <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden />
            </a>
            <a
              className="kcc-btn kcc-btn-secondary"
              href="https://www.knightscomputer.club/forum"
              target="_blank"
              rel="noopener noreferrer"
            >
              IR AL FORO
            </a>
          </div>

          <p className="kcc-find-prompt">
            <span className="kcc-find-cmd">kcc@node:~$</span> soft jazz · no ads · no surveil
            <span className="kcc-find-cursor" aria-hidden />
          </p>
        </div>
      </div>
    </section>
  );
}

function Home({ navigate }) {
  return (
    <>
      <PageHero
        index="00"
        eyebrow="KNIGHTS LABS · ROGEX LABORATORIES"
        title={<>LOW-CARBON<br />NEUROTECH.<br />BOOTABLE LAB.</>}
        text="Rogex Laboratories opera bajo Knights Labs: software EEG reproducible, un kernel neuromórfico de código abierto y una experiencia desktop bare-metal. Lanzamiento de la suite proyectado para diciembre 2026."
        image="/home-campaigns.svg"
      >
        <div className="hero-actions">
          <button className="brutal-button primary" onClick={() => navigate('/suite')}>VIEW PRODUCT SUITE</button>
          <button className="brutal-button" onClick={() => navigate('/architecture')}>TECHNICAL ARCHITECTURE</button>
        </div>
        <div className="hero-tags">
          <span>PRISMA 3.2</span>
          <span>PRISMA 5 SNN</span>
          <span>RXos v4.5.0</span>
          <span>EVENT FABRIC · BENCH 6/6</span>
          <span>AKIDA PENDING</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap" id="identity">
          <SectionTitle
            code="01 / IDENTITY"
            title="DE ROGEX AL MARCO KNIGHTS LABS"
            text="Misma ingeniería, identidad de producto más clara: investigación abierta donde aporta, licencias estratificadas donde sostiene el hardware accesible."
          />
          <div className="identity-grid">
            <article className="paper-panel" data-reveal>
              <span className="panel-label">BRAND TRANSITION</span>
              <h3>ROGEX BUILD.<br />KNIGHTS LABS SHIP.</h3>
              <p>Rogex Laboratories sigue siendo el laboratorio técnico. Knights Labs es el marco comercial y de producto que agrupa PRISMA, rxOS y el camino OEM hacia silicio neuromórfico.</p>
              <ul className="check-list compact-list">
                <li><CheckCircle size={18} /> Evidencia pública y límites no clínicos.</li>
                <li><CheckCircle size={18} /> Kernel neuromórfico open source.</li>
                <li><CheckCircle size={18} /> Desktop y capas Pro / OEM con licencias claras.</li>
              </ul>
            </article>
            <article className="black-panel eco-panel" data-reveal>
              <span className="panel-label">TECHNOACTIVISM</span>
              <h3>LOW-CARBON COMPUTING.</h3>
              <p>Arquitectura determinista, latencia sub-milisegundo y footprint de memoria objetivo &lt;64 MB frente a stacks inflados. Menos capas, menos desperdicio, más auditabilidad.</p>
              <div className="eco-metrics">
                <div><Leaf size={20} /><strong>LOW-CARBON</strong><span>compute-first design</span></div>
                <div><Zap size={20} /><strong>&lt;1 ms</strong><span>latency path goal</span></div>
                <div><Cpu size={20} /><strong>&lt;64 MB</strong><span>memory footprint target</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="02 / SUITE"
              title="CUATRO SUPERFICIES, UN PIPELINE"
              text="De la adquisición EEG al spike train y de vuelta a la telemetría — sin confudir MVP, roadmap y visión."
            />
            <div className="suite-grid">
              {PRODUCT_SUITE.map((product, index) => (
                <ProductCard product={product} navigate={navigate} index={index} key={product.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="03 / PIPELINE"
            title="DEL SENSOR AL SPIKE"
            text="Stack RXos v4.5: boot → event fabric → LIF/STDP → paths vivos → Akida (Nivel 3 pendiente)."
          />
          <div className="mini-arch" data-reveal>
            {ARCH_STACK.map((item) => (
              <div className="mini-arch-layer" key={item.layer}>
                <span>{item.layer}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <code>{item.detail}</code>
              </div>
            ))}
          </div>
          <div className="hero-actions section-actions">
            <button className="brutal-button primary" onClick={() => navigate('/architecture')}>
              FULL ARCHITECTURE <ArrowUpRight size={15} />
            </button>
            <button className="brutal-button" onClick={() => navigate('/rx-os')}>
              DOWNLOAD RXos TEST BUILD
            </button>
          </div>
        </section>

        <section className="statement-section">
          <div className="wrap statement-grid" data-reveal>
            <div className="statement-mark"><Leaf size={54} strokeWidth={1.2} /></div>
            <blockquote>
              “Ambición sin trazabilidad es ruido. Knights Labs publica límites, estados de implementación y resultados negativos — porque también son parte del trabajo.”
            </blockquote>
            <div className="statement-meta">METHOD · EVIDENCE · LIMITS · LOW-CARBON</div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="04 / LICENSING"
            title="CAPAS QUE FINANCIAN ACCESO"
            text="Precios de referencia para el lanzamiento proyectado en diciembre 2026. Modelo de financiación cruzada: B2B/OEM subsidia investigación independiente y causas de acceso."
          />
          <div className="license-grid">
            {LICENSE_TIERS.map((block, index) => (
              <article className="license-card" key={block.product} data-reveal style={{ '--delay': `${index * 70}ms` }}>
                <span className="panel-label">{block.product}</span>
                <table>
                  <tbody>
                    {block.rows.map(([name, price, note]) => (
                      <tr key={name}>
                        <th>{name}</th>
                        <td>{price}</td>
                        <td>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>
          <p className="license-note" data-reveal>
            Las licencias se confirman al lanzamiento. PRISMA no es un dispositivo médico ni software de diagnóstico.
          </p>
        </section>

        <KccFindUsSection />

        <CtaBand navigate={navigate} />
      </main>
    </>
  );
}

function Suite({ navigate }) {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="PRODUCT SUITE / KNIGHTS LABS"
        title={<>THE STACK,<br />NOT THE HYPE.</>}
        text="rxOS Desktop, kernel neuromórfico open source, PRISMA 3.2 y PRISMA 5. Cada pieza tiene estado, licencia y público: desarrolladores, investigadores e integradores OEM."
        image="/rxos-concept.svg"
      >
        <div className="hero-actions">
          <button className="brutal-button primary" onClick={() => navigate('/#join')}>JOIN AS PARTNER</button>
          <a className="brutal-button" href="mailto:knightsys@proton.me?subject=Product%20inquiry%20%E2%80%94%20Knights%20Labs">
            EMAIL THE LAB
          </a>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / PRODUCTS"
            title="SUITE COMPLETA"
            text="Cuatro productos, dos líneas (sistemas + señal) y un objetivo de lanzamiento: diciembre 2026."
          />
          <div className="suite-grid suite-grid-page">
            {PRODUCT_SUITE.map((product, index) => (
              <ProductCard product={product} navigate={navigate} index={index} key={product.id} />
            ))}
          </div>
        </section>

        <PrismaDownloadSection
          code="02 / PRISMA MODULES"
          title="DESCARGA PRISMA"
          text="Prisma 3 y Prisma 5: fichas de producto con botones de descarga públicos. Estado actual: no disponibles."
        />

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="03 / WHO IT'S FOR"
              title="TRES PERFILES, TRES CONTRATOS"
              text="El copy no vende milagros. Declara interfaces, artefactos y caminos de colaboración."
            />
            <div className="audience-table" data-reveal>
              <div className="audience-row audience-head">
                <span>AUDIENCE</span><span>PRIMARY SURFACE</span><span>WHAT YOU GET</span>
              </div>
              <div className="audience-row">
                <span>Developers</span>
                <span>rxOS Kernel · event APIs</span>
                <span>Código abierto, QEMU builds, contribución a drivers y runtime</span>
              </div>
              <div className="audience-row">
                <span>Researchers</span>
                <span>PRISMA 3 / 5</span>
                <span>Pipelines EEG, métricas con régimen, límites no clínicos</span>
              </div>
              <div className="audience-row">
                <span>OEM / Integrators</span>
                <span>Custom arch · royalty</span>
                <span>Integración en silicio neuromórfico y soporte de arquitectura</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="04 / PRICING LAYERS"
            title="REFERENCIA COMERCIAL 2026"
            text="Estructura pública de capas. Confirmación contractual al release."
          />
          <div className="license-grid">
            {LICENSE_TIERS.map((block, index) => (
              <article className="license-card" key={block.product} data-reveal style={{ '--delay': `${index * 70}ms` }}>
                <span className="panel-label">{block.product}</span>
                <table>
                  <tbody>
                    {block.rows.map(([name, price, note]) => (
                      <tr key={name}>
                        <th>{name}</th>
                        <td>{price}</td>
                        <td>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>
        </section>

        <CtaBand navigate={navigate} />
      </main>
    </>
  );
}

function Architecture({ navigate }) {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="ARCHITECTURE / RXos v4.5 NEUROMORPHIC"
        title={<>EVENT FABRIC<br />ON VON NEUMANN.<br />FALSIFIABLE.</>}
        text="RXos no dibuja neuronas: ejecuta un sustrato de eventos con LIF Q16.16, STDP local y codificación temporal comprobable con bench 6/6. Silicio = x86_64 con reloj. Nivel 3 (Akida) aún sin chip en el lab."
        image={RXOS_HERO_IMAGE}
      >
        <div className="hero-tags">
          <span>v4.5.0</span>
          <span>SPSC 64 B</span>
          <span>LIF Q16.16</span>
          <span>STDP LOCAL</span>
          <span>BENCH 6/6</span>
          <span>AKIDA PENDING</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / STACK"
            title="DEL BOOT AL NPU (PENDIENTE)"
            text="Cinco capas del sustrato real en RXos v4.5. La última es objetivo de Nivel 3, no entregable."
          />
          <div className="architecture full-architecture" data-reveal>
            {ARCH_STACK.map((item, index) => (
              <div className="architecture-layer" key={item.layer}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <code className="arch-detail">{item.detail}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="02 / LIF DYNAMICS"
              title="MEMBRANA ENTERA, SIN TICK NEURAL"
              text="La fuga no se aplica con un bucle periódico: se reconstruye al llegar el siguiente evento. Misma entrada, distinto tiempo → distinto resultado."
            />
            <div className="formula-grid">
              <article className="formula-card" data-reveal>
                <span>01</span>
                <h3>LAZY DECAY</h3>
                <code>V(Δt) = V · τ / (τ + Δt)</code>
                <p>Aproximación racional a la exponencial, exacta en enteros de 64 bits. Kernel compilado -mno-sse.</p>
              </article>
              <article className="formula-card" data-reveal>
                <span>02</span>
                <h3>TEMPORAL CODE</h3>
                <code>3 × 0.35θ · Δt ≈ 0 → spike</code>
                <p>Tres estímulos que suman 1,05×θ disparan juntos y no hacen nada separados. Criterio falsable del paper.</p>
              </article>
              <article className="formula-card" data-reveal>
                <span>03</span>
                <h3>COST</h3>
                <code>~299 cycles / event</code>
                <p>Medido con RDTSC sobre 20 000 estímulos. RAM al boot ~3 MiB. Sin estado FPU.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="03 / FOUR LEVELS"
            title="HOJA DE RUTA NEUROMÓRFICA"
            text="Rev 1.3: Niveles 1–2 cerrados. Nivel 3 bloqueado sin Akida. Nivel 4 horizonte industrial."
          />
          <div className="levels-grid">
            {RXOS_LEVELS.map((item, index) => (
              <article className={`level-card level-${item.tone}`} key={item.level} data-reveal style={{ '--delay': `${index * 70}ms` }}>
                <div className="level-card-top">
                  <span>NIVEL {item.level}</span>
                  <StatusBadge tone={item.tone === 'ok' ? 'ok' : item.tone === 'warn' ? 'warn' : 'open'}>{item.state}</StatusBadge>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="04 / BOUNDARIES"
              title="QUÉ ES Y QUÉ NO ES"
              text="Neuromórfico sobre von Neumann: exactitud sin marketing de silicio."
            />
            <div className="open-closed-grid">
              <article data-reveal>
                <span className="panel-label">RXos SÍ ES</span>
                <h3>EVENT-DRIVEN · TEMPORAL · EXACT</h3>
                <ul className="check-list">
                  <li><CheckCircle size={18} /> Sin tick neural; sin trabajo si no hay eventos</li>
                  <li><CheckCircle size={18} /> Dinámica temporal real (codificación por llegada)</li>
                  <li><CheckCircle size={18} /> Enteros bit-exact; STDP local; paths vivos del SO</li>
                  <li><CheckCircle size={18} /> bench predice y mide — 6/6 PASS</li>
                </ul>
              </article>
              <article data-reveal>
                <span className="panel-label">RXos NO ES</span>
                <h3>NO AKIDA · NO ASYNC NS</h3>
                <ul className="cross-list">
                  <li>No es hardware neuromórfico (reloj + von Neumann intacto)</li>
                  <li>No es masivamente paralelo (pump cooperativo en serie)</li>
                  <li>No es asíncrono a ns — resolución 10 ms (PIT 100 Hz)</li>
                  <li>Sin chip Akida en lab → Nivel 3 no cerrado</li>
                </ul>
              </article>
            </div>
            <div className="hero-actions section-actions">
              <button className="brutal-button primary" onClick={() => navigate('/rx-os')}>
                RXos v4.5 PAGE <ArrowUpRight size={15} />
              </button>
              <a className="brutal-button" href="/docs/rxos/rxos_paper_neuromorfico_rev1.0.pdf" target="_blank" rel="noreferrer">
                READ PAPER PDF
              </a>
            </div>
          </div>
        </section>

        <PapersSection code="05 / DOCS" title="PDFS PÚBLICOS" />

        <CtaBand navigate={navigate} />
      </main>
    </>
  );
}

function EvidenceCard({ item, index }) {
  return (
    <article className="evidence-card" data-reveal style={{ '--delay': `${index * 80}ms` }}>
      <strong>{item.value}</strong>
      <span>{item.label}</span>
      <p>{item.note}</p>
    </article>
  );
}

function Prisma({ navigate }) {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return undefined;
    const el = document.getElementById(hash);
    if (el) {
      const timer = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  return (
    <>
      <PageHero
        index="03"
        eyebrow="PRISMA 3 · HIGH-PERF · PRISMA 5 · SNN"
        title={<>MEASURE THE SIGNAL.<br />MODEL THE PERSON.<br />SPIKE THE EVENT.</>}
        text="PRISMA 3 es el motor POSIX/SIMD de EEG (alternativa ligera al software comercial pesado). PRISMA 5 es el engine neuromórfico event-driven sobre RXos. Ninguno es dispositivo médico ni lee pensamientos."
        image="/tutorial/prisma3/04_eeg_real.png"
      >
        <div className="hero-tags">
          <span>ZERO-COPY SPSC</span>
          <span>SIMD FFT</span>
          <span>ICA RT</span>
          <span>DELTA MOD</span>
          <span>LIF / STDP</span>
          <span>&lt;1 ms EVENT</span>
        </div>
        <div className="hero-actions">
          <a className="brutal-button primary" href="#prisma-downloads">VER MÓDULOS</a>
          <a className="brutal-button" href="#prisma3">PRISMA 3</a>
          <a className="brutal-button" href="#prisma5">PRISMA 5</a>
          <a className="brutal-button" href="#compare">VS OTROS SOFTWARES</a>
        </div>
      </PageHero>

      <main>
        <PrismaDownloadSection
          code="01 / DOWNLOAD"
          title="PRISMA 3 · PRISMA 5"
          text="Arquitecturas en desarrollo. Precios accesibles (Robin Hood): community gratis; Pro/OEM financian el ecosistema. Descarga pública aún no publicada."
        />

        <section className="section wrap">
          <SectionTitle
            code="02 / EVIDENCE"
            title="FIRMA BIOLÓGICA, NO PROMEDIO UNIVERSAL"
            text="Cada cerebro es único. La variabilidad no es ruido que borrar: es la calibración. Evidencia de referencia del pipeline PRISMA."
          />
          <div className="evidence-grid">
            {PRISMA_EVIDENCE.map((item, index) => <EvidenceCard item={item} index={index} key={item.label} />)}
          </div>
          <div className="protocol-strip" data-reveal>
            <span>GENERIC</span><strong>73.3% RAW LOSO</strong>
            <span>CALIBRATION</span><strong>87.7% TRANSDUCTIVE</strong>
            <span>PERSONAL</span><strong>91.0% INTRA-SUBJECT</strong>
          </div>

          <div className="current-grid" style={{ marginTop: 28 }}>
            <article className="paper-panel" data-reveal>
              <span className="panel-label">WHAT EXISTS TODAY</span>
              <h3>PIPELINE DE INVESTIGACIÓN TRAZABLE.</h3>
              <ul className="check-list">
                <li><CheckCircle size={18} /> Welch PSD, filtros, bandpower, ratios, entropía, Hjorth, RMS y SQI.</li>
                <li><CheckCircle size={18} /> Baseline personal, Feature Registry (7 familias), Event Mode y visor de épocas.</li>
                <li><CheckCircle size={18} /> Confound Auditor + Benchmark Matrix (strict vs ceiling etiquetados).</li>
                <li><CheckCircle size={18} /> BIDS/OpenNeuro discovery · CLI Python 3.10+ · tests documentados.</li>
                <li><CheckCircle size={18} /> Camino en curso: zero-copy SPSC, SIMD y ICA en vivo (motor de alto rendimiento).</li>
              </ul>
            </article>

            <article className="black-panel" data-reveal>
              <span className="panel-label">SCIENTIFIC BOUNDARY</span>
              <h3>LO QUE PRISMA NO DICE.</h3>
              <ul className="cross-list">
                <li>No resuelve toda la variabilidad interindividual.</li>
                <li>No convierte calibración transductiva en generalización.</li>
                <li>No extrapola alpha blocking a cualquier tarea.</li>
                <li>No diagnostica, trata ni predice enfermedad.</li>
                <li>No detecta consciencia ni descifra contenido mental.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section section-black" id="compare">
          <div className="wrap">
            <SectionTitle
              code="03 / COMPARE"
              title="OTROS SOFTWARES VS PRISMA 3 VS PRISMA 5"
              text="Comparación de clases de arquitectura, no un ataque a marcas concretas. Cifras de latencia/footprint son objetivos de diseño o tipologías de mercado — no un ensayo clínico."
            />
            <div className="compare-table" data-reveal>
              <div className="compare-row compare-head">
                <span>CRITERIO</span>
                <span>OTROS SOFTWARES (CLASE)</span>
                <span>PRISMA 3</span>
                <span>PRISMA 5</span>
              </div>
              {PRISMA_VS_LEGACY.map((row) => (
                <div className="compare-row" key={row.criterion}>
                  <span>{row.criterion}</span>
                  <span>{row.others}</span>
                  <span>{row.p3}</span>
                  <span>{row.p5}</span>
                </div>
              ))}
            </div>
            <p className="license-note" style={{ color: 'rgba(255,254,248,.72)', marginTop: 18 }}>
              Muchas herramientas EEG de escritorio tradicionales son monólitos atados a un SO comercial, con varios GB de RAM, FFT por ventanas y UI pesada.
              PRISMA apunta a latencia sub-ventana, footprint objetivo &lt;64 MB en rxOS y (en P5) wake-on-event en mW.
            </p>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="04 / PRISMA 3 ARCHITECTURE"
            title="HIGH-PERFORMANCE EEG ENGINE"
            text="De Streamlit/Python hacia un stack de bajo nivel: zero-copy, SIMD, ICA y geometría — sin vender milagros clínicos."
          />
          <div className="prisma-module-grid">
            {PRISMA_32_MODULES.map(({ icon: Icon, code, title, text: moduleText }, index) => (
              <article className="prisma-module-card" key={code} data-reveal style={{ '--delay': `${index * 70}ms` }}>
                <div className="prisma-module-head"><Icon size={28} strokeWidth={1.35} /><span>{code}</span></div>
                <h3>{title}</h3>
                <p>{moduleText}</p>
              </article>
            ))}
          </div>
          <div className="dataset-table" data-reveal style={{ marginTop: 28 }}>
            <div className="dataset-row dataset-head">
              <span>DATASET / PARADIGM</span><span>STATE</span><span>INTERPRETATION</span>
            </div>
            <div className="dataset-row">
              <span>ds007358 / resting EC–EO</span>
              <span><StatusBadge tone="ok">REFERENCE</StatusBadge></span>
              <span>Raw LOSO 73.3%; calibración 87.7%; personalizado 91.0%; alpha EC &gt; EO confirmado.</span>
            </div>
            <div className="dataset-row">
              <span>ds007808 / speech</span>
              <span><StatusBadge tone="warn">EXPLORATORY</StatusBadge></span>
              <span>Features específicas en exploración; no se usa como evidencia principal.</span>
            </div>
            <div className="dataset-row">
              <span>ds007554 / cognitive–motor</span>
              <span><StatusBadge tone="danger">NEAR CHANCE</StatusBadge></span>
              <span>Features genéricas no separan el paradigma — señal para adaptadores específicos.</span>
            </div>
          </div>
        </section>

        <section className="section section-black" id="prisma5-engine">
          <div className="wrap">
            <SectionTitle
              code="05 / PRISMA 5 ARCHITECTURE"
              title="EVENT-DRIVEN NEUROMORPHIC ENGINE"
              text="El cerebro no corre FFT cada 512 ms. PRISMA 5 solo gasta ciclos cuando hay eventos. Sobre el tejido de RXos v4.5."
            />
            <div className="formula-grid" style={{ marginBottom: 28 }}>
              <article className="formula-card" data-reveal>
                <span>01 · ENCODE</span>
                <h3>ΔV(t)</h3>
                <code>ΔV = V(t) − V(t_prev)</code>
                <p>Diferencia local de microvoltios. Sin evento si la señal no se mueve.</p>
              </article>
              <article className="formula-card" data-reveal>
                <span>02 · SPIKES</span>
                <h3>UP / DOWN</h3>
                <code>ΔV ≥ +θ_adp → UP · ΔV ≤ −θ_adp → DOWN</code>
                <p>Umbral adaptativo por sujeto (θ_adp). Entrada asíncrona al SNN.</p>
              </article>
              <article className="formula-card" data-reveal>
                <span>03 · LATENCY</span>
                <h3>&lt;1 ms</h3>
                <code>no windowing delay</code>
                <p>Cada spike actualiza la red. Objetivo BCI/HCI de ultra-baja latencia.</p>
              </article>
            </div>
            <div className="prisma5-grid">
              {PRISMA_5_MODULES.map(({ icon: Icon, code, title, text: moduleText }) => (
                <article className="prisma5-card" key={code} data-reveal>
                  <span className="prisma5-card-icon"><Icon size={22} strokeWidth={1.4} /> {code}</span>
                  <h3>{title}</h3>
                  <p>{moduleText}</p>
                </article>
              ))}
            </div>
            <div className="akida-callout" data-reveal style={{ marginTop: 28 }}>
              <AlertTriangle size={22} />
              <div>
                <strong>SILICIO NEUROMÓRFICO PENDIENTE</strong>
                <p>
                  PRISMA 5 se diseña para MCU/FPGA y, en Nivel 3 de RXos, para BrainChip Akida AKD1000.
                  El laboratorio aún no dispone del chip: no hay benchmarks J/inferencia NPU vs CPU en metal neuromórfico real.
                </p>
              </div>
            </div>
            <div className="hero-actions section-actions">
              <button className="brutal-button primary" onClick={() => navigate('/architecture')}>
                RXos EVENT FABRIC <ArrowUpRight size={15} />
              </button>
              <button className="brutal-button" onClick={() => navigate('/suite')}>
                LICENSE LAYERS
              </button>
              <a className="brutal-button" href="#prisma5">
                FICHA DE DESCARGA <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="06 / INTERFACE"
            title="CAPTURAS REALES DE PRISMA 3.2"
            text="Estas imágenes son capturas auténticas del software en desarrollo. No son renders ni mockups promocionales."
          />

          <div className="prisma-capture-grid">
            <figure className="screenshot scientific-capture" data-reveal>
              <img src="/tutorial/prisma3/04_feature_lab_complete.png" alt="Captura real de PRISMA 3.2 Feature Lab con forma de onda, PSD y vector de características" loading="lazy" />
              <figcaption className="capture-caption">
                <span>01</span>
                <div><strong>FEATURE LAB / REAL UI CAPTURE</strong><p>Forma de onda multicanal, densidad espectral de potencia y vector spectral-temporal. Demostración sintética no clínica.</p></div>
              </figcaption>
            </figure>

            <figure className="screenshot scientific-capture" data-reveal>
              <img src="/tutorial/prisma3/05_event_epoch_viewer.png" alt="Captura real del visor de eventos y épocas de PRISMA 3.2" loading="lazy" />
              <figcaption className="capture-caption">
                <span>02</span>
                <div><strong>EVENT &amp; EPOCH VIEWER / REAL UI CAPTURE</strong><p>Línea temporal de eventos, épocas válidas, baseline −200–0 ms y respuesta evocada promedio por clase.</p></div>
              </figcaption>
            </figure>
          </div>

          <div className="archive-label">ADDITIONAL WORKFLOW CAPTURES</div>
          <div className="screenshot-grid compact-screenshot-grid">
            {[
              ['/tutorial/prisma3/01_home.png', 'Dashboard / entrada al flujo'],
              ['/tutorial/prisma3/02_tutorial.png', 'Tutorial / límites y pasos'],
              ['/tutorial/prisma3/03_import_csv.png', 'Importación / CSV experimental'],
              ['/tutorial/prisma3/04_eeg_real.png', 'Análisis / EEG real'],
              ['/tutorial/prisma3/05_datasets.png', 'Compatibilidad / datasets'],
            ].map(([src, caption], index) => (
              <figure className={index === 0 ? 'screenshot featured' : 'screenshot'} key={src} data-reveal>
                <img src={src} alt={caption} loading="lazy" />
                <figcaption><span>{String(index + 3).padStart(2, '0')}</span>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section research-method">
          <div className="wrap">
            <SectionTitle
              code="07 / METHOD"
              title="POR QUÉ ESTO ES INVESTIGACIÓN SERIA"
              text="Serio no significa infalible. Significa que cada afirmación puede rastrearse hasta un protocolo, una partición de datos, una métrica y una limitación."
            />
            <div className="method-grid">
              {[
                [Database, 'DATA PROVENANCE', 'Datasets identificables, estructura BIDS, sujetos y paradigmas documentados.'],
                [FlaskConical, 'CONTROLS', 'LOSO, train-fold preprocessing, controles negativos y separación de regímenes.'],
                [Code2, 'REPRODUCIBILITY', 'CLI, configuración, tests, reportes y rutas de ejecución repetibles.'],
                [AlertTriangle, 'NEGATIVE RESULTS', 'Resultados cercanos al azar permanecen visibles; no se ocultan detrás de marketing.'],
                [Microscope, 'EXTERNAL VALIDATION', 'El siguiente paso exige más datasets, revisión académica y sesiones en vivo.'],
                [Shield, 'BOUNDARIES', 'Software experimental, no clínico y sin etiquetado diagnóstico.'],
              ].map(([Icon, title, text]) => (
                <article className="method-card" key={title} data-reveal>
                  <Icon size={28} strokeWidth={1.4} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="08 / ROADMAP"
              title="DE PRISMA 3.2 AL HARDWARE"
              text="Las etapas futuras son direcciones de investigación, no funcionalidades ya disponibles."
            />
            <div className="roadmap-list">
              {PRISMA_ROADMAP.map((item, index) => (
                <article className="roadmap-item" key={item.title} data-reveal>
                  <div className="roadmap-index">{String(index + 1).padStart(2, '0')}</div>
                  <div className="roadmap-year">{item.year}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <span>{item.state}</span>
                  </div>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section wrap prisma-video-section">
          <SectionTitle
            code="09 / EXTRA / ARCHIVE"
            title="PRISMA 1 — VIDEO DEMONSTRATION"
            text="Material histórico. Este vídeo no representa PRISMA 3 ni PRISMA 5."
          />
          <div className="video-layout">
            <div className="video-frame" data-reveal>
              <iframe
                src="https://www.youtube-nocookie.com/embed/3Jw7r_unoPg?rel=0"
                title="PRISMA 1 historical demonstration"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <aside className="video-note" data-reveal>
              <span className="panel-label">IMPORTANT VERSION NOTE</span>
              <h3>THIS IS PRISMA 1.<br />NOT PRISMA 3.</h3>
              <p>El vídeo documenta una versión temprana. PRISMA 3.2 continúa en desarrollo; el material público actual son capturas reales y teasers en Instagram y TikTok.</p>
              <a className="archive-video-link" href="https://youtu.be/3Jw7r_unoPg" target="_blank" rel="noreferrer">OPEN ON YOUTUBE <ArrowUpRight size={16} /></a>
            </aside>
          </div>
        </section>

        <CtaBand navigate={navigate} />
      </main>
    </>
  );
}

function BootLog() {
  return (
    <div className="rx-window boot-window" data-reveal>
      <div className="rx-window-head"><span>BOOT / SERIAL · RXos v4.5.0</span><span>event fabric</span></div>
      <div className="boot-lines">
        {[
          ['RXos v4.5.0 neuromorphic', ''],
          ['Boot Multiboot2 / long mode', 'OK'],
          ['GDT / IDT / map 4 GiB', 'OK'],
          ['Event fabric self-test', 'OK'],
          ['LIF Q16.16 / STDP actors', 'OK'],
          ['KBD / mouse typed events', 'OK'],
          ['WM threshold actor', 'OK'],
          ['Scheduler / power_idle', 'OK'],
          ['bench 6/6 temporal coding', 'OK'],
          ['Akida AKD1000 NPU', 'TODO'],
          ['USB XHCI / HPET <10 ms', 'TODO'],
        ].map(([label, state]) => (
          <div key={label}><span>&gt; {label}</span><strong className={state === 'TODO' ? 'todo' : ''}>{state}</strong></div>
        ))}
      </div>
    </div>
  );
}

function ArchitectureDiagram() {
  const layers = [
    ['UI / WM', 'compositor double-buffer · damage tracking · terminal'],
    ['TASKS', 'shell as task · sched_spawn/yield · cooperative ABI'],
    ['EVENT FABRIC', '64 B events · SPSC rings · pump · no neural tick'],
    ['LIF + STDP', 'Q16.16 membrane · lazy decay · local plasticity'],
    ['DRIVERS', 'IRQ1/12 · NIC actor · RXFS · AHCI/ATA · framebuffer'],
    ['POWER', 'MONITOR/MWAIT/HLT · RAPL (#GP-safe) · ACPI C-states'],
    ['BOOT', 'NASM Multiboot2 · x86_64 long mode · 4 GiB identity map'],
  ];
  return (
    <div className="architecture" data-reveal>
      {layers.map(([title, text], index) => (
        <div className="architecture-layer" key={title}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{title}</strong>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

function PapersSection({ code = 'PAPERS', title = 'DOCUMENTACIÓN TÉCNICA', text }) {
  return (
    <section className="section wrap papers-section" id="docs">
      <SectionTitle
        code={code}
        title={title}
        text={text || 'Papers y hojas de ruta verificables. Lectura pública — PDF nativo, sin paywall.'}
      />
      <div className="papers-grid">
        {RXOS_PAPERS.map((paper, index) => (
          <article className="paper-doc-card" key={paper.href} data-reveal style={{ '--delay': `${index * 70}ms` }}>
            <span className="panel-label">{paper.code}</span>
            <h3>{paper.title}</h3>
            <p>{paper.text}</p>
            <div className="paper-doc-meta">{paper.meta}</div>
            <a className="brutal-button primary" href={paper.href} target="_blank" rel="noreferrer">
              ABRIR PDF <ArrowUpRight size={15} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function RXOS({ navigate }) {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="RXos v4.5.0 / NEUROMORPHIC SUBSTRATE"
        title={<>A LABORATORY<br />THAT BOOTS.<br />A KERNEL THAT SPIKES.</>}
        text="RXos v4.5 es un SO experimental bare-metal x86_64 con tejido de eventos LIF/STDP verificable (Niveles 1–2 cerrados). No es silicio Akida: el chip neuromórfico falta en el lab y bloquea el Nivel 3. No es un reemplazo de Linux ni un producto de producción."
        image={RXOS_HERO_IMAGE}
      >
        <div className="hero-tags">
          <span>v4.5.0</span><span>LIF Q16.16</span><span>SPSC EVENTS</span><span>BENCH 6/6</span><span>HP 15 REF</span><span>AKIDA PENDING</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap rxos-principal-section">
          <SectionTitle
            code="01 / HARDWARE"
            title="RXos ON REAL METAL"
            text="Imagen principal: PC con RXos instalado. Referencia documentada: HP 15-ac195nl (i7-5500U, 8 GB) + QEMU."
          />
          <figure className="rxos-principal-shot" data-reveal>
            <img
              src={RXOS_HERO_IMAGE}
              alt="PC with RXos v4.5 installed — bare-metal neuromorphic substrate"
              width={1600}
              height={1200}
              loading="eager"
              fetchPriority="high"
            />
            <figcaption>
              <span>PRINCIPAL · v4.5.0</span>
              <div>
                <strong>PC WITH RXos INSTALLED</strong>
                <p>Hardware real. Tejido de eventos en caminos vivos del SO. Experimental, no clínico, no auditado.</p>
              </div>
            </figcaption>
          </figure>
        </section>

        <PapersSection
          code="02 / DOCS"
          title="PAPERS Y HOJA DE RUTA"
          text="Documentos técnicos rev 1.0 / 1.3. Abre el PDF en el navegador o descárgalo."
        />

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="03 / FOUR LEVELS"
              title="ESTADO NEUROMÓRFICO REAL"
              text="Nada marcado OBJETIVO u HORIZONTE se comunica como entregado. Nivel 3 espera silicio Akida."
            />
            <div className="levels-grid">
              {RXOS_LEVELS.map((item, index) => (
                <article className={`level-card level-${item.tone}`} key={item.level} data-reveal style={{ '--delay': `${index * 70}ms` }}>
                  <div className="level-card-top">
                    <span>NIVEL {item.level}</span>
                    <StatusBadge tone={item.tone === 'ok' ? 'ok' : item.tone === 'warn' ? 'warn' : 'open'}>{item.state}</StatusBadge>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="akida-callout" data-reveal>
              <AlertTriangle size={22} />
              <div>
                <strong>FALTA EL CHIP AKIDA</strong>
                <p>
                  BrainChip Akida AKD1000 es el candidato documentado para Nivel 3 (delegación bare-metal).
                  Sin NPU física + pila USB/XHCI + HPET, no hay test de impulsos en silicio neuromórfico real ni cifra J/inferencia CPU vs NPU.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="04 / FOUNDATION"
            title="RXos v4.5.0 — HECHOS MEDIDOS"
            text="Cifras del paper técnico rev 1.0. Toda magnitud procede de una ejecución citada."
          />
          <div className="rx-metrics">
            <div data-reveal><strong>6/6</strong><span>bench PASS</span></div>
            <div data-reveal><strong>~299</strong><span>cycles / event</span></div>
            <div data-reveal><strong>~3 MiB</strong><span>RAM al boot</span></div>
            <div data-reveal><strong>10 ms</strong><span>PIT tick (sustrato)</span></div>
          </div>
          <BootLog />
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="05 / BENCH"
              title="MODELO CONTRA KERNEL"
              text="Cada fila predice desde el modelo y contrastar con el binario. Una discrepancia es un fallo."
            />
            <div className="bench-table" data-reveal>
              <div className="bench-row bench-head">
                <span>TEST</span><span>MODEL</span><span>KERNEL</span><span>RESULT</span>
              </div>
              {RXOS_BENCH.map((row) => (
                <div className="bench-row" key={row.test}>
                  <span>{row.test}</span>
                  <span>{row.model}</span>
                  <span>{row.kernel}</span>
                  <span><StatusBadge tone="ok">{row.result}</StatusBadge></span>
                </div>
              ))}
            </div>
            <p className="license-note" style={{ color: 'rgba(255,254,248,.7)', marginTop: 20 }}>
              Comandos en shell: <code>bench</code> · <code>neuro</code> · <code>status</code> · <code>mem</code> · <code>power 5</code> (solo metal)
            </p>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="06 / TWO SURFACES"
            title="DESKTOP + EVENT KERNEL"
            text="Misma base RXos v4.5. Desktop closed · tejido neuromórfico documentado en papers open."
          />
          <div className="edition-grid">
            <article className="edition-card" data-reveal>
              <span>01 / DESKTOP EXPERIENCE</span>
              <h3>CLOSED SOURCE.<br />BOOTABLE LAB.</h3>
              <p>Superficie de escritorio x86-64: shell, RXFS, compositor, install en metal de referencia. Public test package disponible.</p>
              <div className="tag-row"><span>CLOSED</span><span>v4.5.0</span><span>HP 15 + QEMU</span></div>
            </article>
            <article className="edition-card edition-dark" data-reveal>
              <span>02 / NEUROMORPHIC FABRIC</span>
              <h3>VERIFICABLE.<br />NO ES AKIDA.</h3>
              <p>Event fabric LIF/STDP sobre von Neumann. Niveles 1–2 cerrados. Nivel 3 requiere chip Akida que el lab aún no tiene.</p>
              <div className="tag-row"><span>OPEN DOCS</span><span>LIF/STDP</span><span>N3 BLOCKED</span></div>
              <button className="text-link" onClick={() => navigate('/architecture')} style={{ marginTop: 18 }}>
                READ ARCHITECTURE <ArrowUpRight size={15} />
              </button>
            </article>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="07 / REAL CAPTURES"
              title="HARDWARE + QEMU"
              text="Foto principal en metal y capturas de RXos en QEMU. Línea actual: v4.5.0 neuromórfica."
            />
            <div className="screenshot-grid rxos-capture-grid">
              <figure className="screenshot scientific-capture featured" data-reveal>
                <img src={RXOS_HERO_IMAGE} alt="PC with RXos v4.5 installed — principal hardware photo" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 00</span>
                  <div><strong>PC WITH RXos v4.5 INSTALLED</strong><p>Imagen principal: sistema en hardware real. Tejido de eventos en paths vivos.</p></div>
                </figcaption>
              </figure>
              <figure className="screenshot scientific-capture" data-reveal>
                <img src="/rxos/boot-banner.png" alt="RXos boot banner and first-run setup in QEMU" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 01</span>
                  <div><strong>VERIFIED BOOT + FIRST-RUN SETUP</strong><p>Cada OK se imprime después de comprobar la etapa correspondiente.</p></div>
                </figcaption>
              </figure>
              <figure className="screenshot scientific-capture" data-reveal>
                <img src="/rxos/desktop-home.png" alt="RXos clickable desktop home screen in QEMU" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 02</span>
                  <div><strong>CLICKABLE DESKTOP HOME</strong><p>Navegación lateral, tiles de sistema y rutas rgx:// del runtime actual.</p></div>
                </figcaption>
              </figure>
              <figure className="screenshot scientific-capture" data-reveal>
                <img src="/rxos/shell-status.png" alt="RXos terminal status view in QEMU" loading="lazy" />
                <figcaption className="capture-caption">
                  <span>REAL / 03</span>
                  <div><strong>STATUS / EVENT FABRIC</strong><p>Contadores del tejido, tareas y superficies IMPLEMENTED / STUB / TODO.</p></div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section wrap rxos-download-section">
          <SectionTitle
            code="08 / PUBLIC TEST BUILD"
            title="DOWNLOAD + DOCS"
            text="Paquete ISO de prueba (artefacto público) y PDFs técnicos v4.5. QEMU recomendado para evaluación segura."
          />
          <div className="rxos-docs-row" data-reveal>
            <a className="brutal-button primary" href="/docs/rxos/rxos_paper_neuromorfico_rev1.0.pdf" target="_blank" rel="noreferrer">
              PAPER NEUROMÓRFICO PDF <ArrowUpRight size={15} />
            </a>
            <a className="brutal-button" href="/docs/rxos/rxos_hoja_de_ruta_4_niveles_rev1.3.pdf" target="_blank" rel="noreferrer">
              HOJA DE RUTA 4 NIVELES PDF <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="rxos-download-layout">
            <article className="download-card" data-reveal>
              <div className="download-card-top"><span>OFFICIAL ZIP · TEST</span><strong>v4.5 line</strong></div>
              <h3>BOOT IT.<br />INSPECT IT.<br />BREAK NOTHING.</h3>
              <p>Build experimental bare-metal x86_64. No es un sistema de producción, no está auditado y no debe utilizarse para almacenar información importante.</p>
              <dl className="download-facts">
                <div><dt>CONTENTS</dt><dd>ISO + README + screenshots</dd></div>
                <div><dt>BOOT</dt><dd>BIOS / SeaBIOS / CSM</dd></div>
                <div><dt>RECOMMENDED</dt><dd>QEMU x86_64 · 512 MiB RAM</dd></div>
                <div><dt>SHA-256</dt><dd><code>a275d6b1783d439625e0bcc7395535a085bd87a2ba4db6ff88a8b402de8745af</code></dd></div>
              </dl>
              <div className="download-actions">
                <a className="brutal-button primary" href="/downloads/RXos-v4.1.1.zip" download>DOWNLOAD OFFICIAL ZIP <ArrowUpRight size={16} /></a>
                <a className="brutal-button" href="/downloads/RXos-v4.1.1-README.md" target="_blank" rel="noreferrer">READ INCLUDED GUIDE <ArrowUpRight size={16} /></a>
                <a className="checksum-link" href="/downloads/RXos-v4.1.1.zip.sha256" download>DOWNLOAD CHECKSUM</a>
              </div>
            </article>

            <article className="qemu-guide" data-reveal>
              <span className="panel-label">QUICKSTART / QEMU</span>
              <h3>RUN WITHOUT INSTALLING RXos ON YOUR MACHINE.</h3>
              <p>Instala QEMU, descomprime el paquete y arranca la ISO. La opción <code>-serial stdio</code> refleja el log de arranque.</p>
              <div className="platform-install">
                <div><span>macOS</span><code>brew install qemu</code></div>
                <div><span>Fedora</span><code>sudo dnf install qemu-system-x86-core</code></div>
                <div><span>Debian / Ubuntu</span><code>sudo apt install qemu-system-x86</code></div>
              </div>
              <pre><code>{`mkdir rxos-v4.1.1 && cd rxos-v4.1.1
unzip ../RXos-v4.1.1.zip

qemu-system-x86_64 \\
  -machine q35 \\
  -m 512M \\
  -cdrom RXos-v4-foundation.iso \\
  -serial stdio`}</code></pre>
              <div className="qemu-commands">
                <span>TRY INSIDE RXos</span>
                <code>help</code><code>status</code><code>ls</code><code>write hola.txt hola</code><code>cat hola.txt</code><code>go rgx://hello</code><code>devices</code><code>uptime</code>
              </div>
              <details>
                <summary>OPTIONAL ATA PERSISTENCE IN QEMU</summary>
                <pre><code>{`qemu-img create -f raw rxos-disk.img 512K
qemu-system-x86_64 -machine pc -m 512M \\
  -cdrom RXos-v4-foundation.iso \\
  -drive file=rxos-disk.img,format=raw,if=ide \\
  -serial stdio

# Inside RXos:
format hda yes
save`}</code></pre>
              </details>
            </article>
          </div>
          <p className="download-boundary" data-reveal><AlertTriangle size={17} /> Experimental research build. Run it in a virtual machine first. Provided for inspection, education and reproducible testing, without warranty.</p>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="09 / ARCHITECTURE"
            title="DE BOOT.ASM AL TEJIDO LIF"
            text="Pila RXos v4.5: boot, event fabric, LIF/STDP, drivers vivos y power."
          />
          <ArchitectureDiagram />
        </section>

        <section className="section rx-state-section">
          <div className="wrap">
            <SectionTitle
              code="10 / ENGINEERING STATUS"
              title="WHAT WORKS — AND WHAT DOES NOT"
              text="Separación explícita: Niveles 1–2 cerrados · Nivel 3 bloqueado sin Akida · OS roadmap."
            />
          </div>
          <div className="wrap rx-state-grid">
            <article data-reveal>
              <div className="state-heading state-ok"><CheckCircle /> IMPLEMENTED / CLOSED</div>
              <ul>{RX_IMPLEMENTED.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
            <article data-reveal>
              <div className="state-heading state-todo"><AlertTriangle /> NOT YET / BLOCKED</div>
              <ul>{RX_LIMITS.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="11 / NEXT IN ORDER"
              title="LO SIGUIENTE (PAPER REV 1.3)"
              text="Orden documentado: disco arrancable → HPET → high-half kernel → USB → Akida."
            />
            <div className="rx-roadmap">
              {[
                ['01', 'DISK BOOT', 'Instalar RXos como SO arrancable del disco (GRUB/kernel en partición 0x7F).'],
                ['02', 'HPET / APIC', 'Resolución <10 ms del sustrato — prerrequisito de trenes de impulsos útiles.'],
                ['03', 'HIGH-HALF MAP', 'Kernel en mitad alta + mapa directo; liberar techo de 4 GiB / 8 GB RAM.'],
                ['04', 'USB XHCI', 'Pila bare-metal: bloqueo grande del Nivel 3 (NPU USB).'],
                ['05', 'AKIDA AKD1000', 'Driver + encode/decode de impulsos. Requiere el chip físico en el lab.'],
                ['06', 'J/INFER COMPARE', 'Energía por inferencia: CPU vs NPU, ambas medidas — no datasheet heredado.'],
              ].map(([number, title, text]) => (
                <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <CtaBand navigate={navigate} />
      </main>
    </>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    recipient: 'knightsys@proton.me',
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const subject = form.subject || `Contacto desde Knights Labs / Rogex — ${form.name || 'sin nombre'}`;
    const body = [
      `Nombre: ${form.name || '—'}`,
      `Email: ${form.email || '—'}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = `mailto:${form.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={submit} data-reveal>
      <div className="form-row">
        <label>
          DESTINATION
          <select name="recipient" value={form.recipient} onChange={update}>
            <option value="knightsys@proton.me">Knights Labs — knightsys@proton.me</option>
            <option value="rogynavarro@gmail.com">Personal — rogynavarro@gmail.com</option>
          </select>
        </label>
        <label>
          YOUR NAME
          <input name="name" value={form.name} onChange={update} autoComplete="name" required />
        </label>
      </div>
      <div className="form-row">
        <label>
          YOUR EMAIL
          <input type="email" name="email" value={form.email} onChange={update} autoComplete="email" required />
        </label>
        <label>
          SUBJECT
          <input name="subject" value={form.subject} onChange={update} required />
        </label>
      </div>
      <label>
        MESSAGE
        <textarea name="message" value={form.message} onChange={update} rows="8" required />
      </label>
      <div className="form-submit">
        <p>El formulario abre tu cliente de correo. La web no almacena el mensaje.</p>
        <button className="brutal-button primary" type="submit">OPEN EMAIL <Send size={16} /></button>
      </div>
    </form>
  );
}

function Pitch({ navigate }) {
  const [slide, setSlide] = useState(0);
  const [anim, setAnim] = useState('enter');
  const total = 11;

  const go = (next) => {
    const target = Math.max(0, Math.min(total - 1, next));
    if (target === slide) return;
    setAnim('exit');
    window.setTimeout(() => {
      setSlide(target);
      setAnim('enter');
    }, 180);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        go(slide + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(slide - 1);
      }
      if (e.key === 'Home') go(0);
      if (e.key === 'End') go(total - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slide]);

  const mail = 'mailto:knightsys@proton.me?subject=Pitch%20Pre-Seed%20%E2%80%94%20Knights%20Labs%20/%20Club%20de%20inversores';

  const slides = [
    // 0 TITLE
    <div className="deck-slide deck-title" key="title">
      <div className="deck-kicker">PRE-SEED · CLUBES DE INVERSORES · DEEPTECH</div>
      <h1>KNIGHTS LABS</h1>
      <p className="deck-lead">
        De software verificable a <strong>dispositivo EEG en tiempo real</strong> con PRISMA 5 (SNN) sobre RXos v4.5.
        Pre-revenue por diseño de DeepTech — capital para cerrar el salto a metal y lanzamiento <strong>Dic 2026</strong>.
      </p>
      <div className="deck-badge-row">
        <span>PRE-SEED 150.000 €</span>
        <span>RUNWAY 12–18 MESES</span>
        <span>LAUNCH DEC 2026</span>
        <span>PRE-REVENUE = STANDARD</span>
      </div>
      <p className="deck-hint">← → o espacio para navegar · clic en puntos inferiores</p>
    </div>,

    // 1 PROBLEM
    <div className="deck-slide" key="problem">
      <div className="deck-kicker">01 / PROBLEM</div>
      <h2>POR QUÉ EL MERCADO DOLIÓ</h2>
      <div className="deck-grid-3">
        <article>
          <span>01</span>
          <h3>SOFTWARE EEG PESADO</h3>
          <p>Suites de escritorio tradicionales: varios GB de RAM, latencias de cientos de ms por ventana, path crítico hinchado. Acceso de élite.</p>
        </article>
        <article>
          <span>02</span>
          <h3>CEREBRO “PROMEDIO”</h3>
          <p>Modelos genéricos ignoran la firma individual. Nuestra referencia: <strong>73.3% raw LOSO</strong> vs <strong>91.0% personalizado</strong>.</p>
        </article>
        <article>
          <span>03</span>
          <h3>NUBE ≠ REAL-TIME LOCAL</h3>
          <p>BCI serio no tolera round-trips a data centers. El path de eventos debe vivir en el borde: metal, mW, determinismo.</p>
        </article>
      </div>
    </div>,

    // 2 SOLUTION
    <div className="deck-slide" key="solution">
      <div className="deck-kicker">02 / SOLUTION</div>
      <h2>STACK COMPLETO · NO UN APP</h2>
      <div className="deck-stack">
        <div>
          <span>HOY · SOFTWARE</span>
          <h3>RXos v4.5 + PRISMA 3→5</h3>
          <p>Event fabric LIF/STDP (bench 6/6). High-perf EEG zero-copy/SIMD. Path SNN: delta mod, predictive coding, &lt;1 ms/evento.</p>
        </div>
        <div className="deck-stack-hi">
          <span>ASK · HARDWARE</span>
          <h3>DISPOSITIVO EEG TIEMPO REAL</h3>
          <p>Adquisición multicanal en vivo + PRISMA 5 on-device/edge. Sin batch de nube en el camino crítico.</p>
        </div>
        <div>
          <span>PATH · SILICIO</span>
          <h3>AKIDA / NPU · RXos N3</h3>
          <p>USB bare-metal, HPET, driver NPU y J/inferencia medida. El raise incluye acceso a silicio neuromórfico real.</p>
        </div>
      </div>
    </div>,

    // 3 TRACTION / DE-RISKING
    <div className="deck-slide" key="traction">
      <div className="deck-kicker">03 / TRACTION · DE-RISKING TÉCNICO</div>
      <h2>PRE-REVENUE · NO PRE-PRODUCTO</h2>
      <p className="deck-sub">En DeepTech pre-seed los inversores no buscan facturación: buscan riesgo técnico ya reducido. Estos son hitos <em>ya alcanzados</em>.</p>
      <ul className="deck-checks">
        <li><CheckCircle size={18} /> <strong>73.3% raw LOSO / 91.0% intra-CV</strong> en benchmarks de clasificación EEG (referencia EC/EO).</li>
        <li><CheckCircle size={18} /> <strong>bench 6/6 PASS</strong> — codificación temporal LIF falsable en RXos (modelo vs kernel).</li>
        <li><CheckCircle size={18} /> <strong>~299 ciclos/evento · ~3 MiB RAM</strong> al boot · arquitectura event-driven sin tick neural.</li>
        <li><CheckCircle size={18} /> <strong>Path SNN documentado</strong>: Delta Modulation, LIF/STDP, predictive coding (PRISMA 5 sobre event fabric).</li>
        <li><CheckCircle size={18} /> <strong>Footprint objetivo &lt;64 MB</strong> PRISMA@rxOS frente a suites comerciales de varios GB.</li>
        <li><CheckCircle size={18} /> <strong>Metal real</strong>: HP 15-ac195nl + PC con RXos instalado; papers PDF públicos (rev 1.0 / 1.3).</li>
        <li><CheckCircle size={18} /> <strong>60 FPS telemetría</strong> como objetivo de UI liviana (Tauri/WebGL path) sin GIL en el core C/Rust.</li>
      </ul>
      <p className="deck-note">Sin claims clínicos. Resultados negativos y Nivel 3 (Akida) se publican como pendientes — honestidad = activo.</p>
    </div>,

    // 4 PRE-SEED ASK
    <div className="deck-slide" key="ask">
      <div className="deck-kicker">04 / THE PRE-SEED ASK</div>
      <h2>RONDA PRE-SEED: 150.000 €</h2>
      <p className="deck-sub">
        <strong>Objetivo:</strong> llevar el Core Engine de PRISMA y el Kernel de RXos de prototipo/validación interna al
        <strong> lanzamiento comercial y open source en Diciembre 2026</strong>.
        <br /><strong>Runway:</strong> 12–18 meses de desarrollo e integración.
      </p>
      <div className="deck-funds">
        <article>
          <strong>40%</strong>
          <span>60.000 €</span>
          <h3>Core C/Rust</h3>
          <p>Consolidación engines, IPC ring buffers lock-free, arquitectura SNN/STDP, hardening del path live.</p>
        </article>
        <article>
          <strong>30%</strong>
          <span>45.000 €</span>
          <h3>Hardware NPU</h3>
          <p>BrainChip Akida / Intel Loihi: latencia, consumo, RAPL y footprint &lt;64 MB en bancada real.</p>
        </article>
        <article>
          <strong>15%</strong>
          <span>22.500 €</span>
          <h3>IP & Legal</h3>
          <p>Propiedad intelectual, licencias duales (Open Source / OEM Commercial), testing e infra.</p>
        </article>
        <article>
          <strong>15%</strong>
          <span>22.500 €</span>
          <h3>GTM & Pilots</h3>
          <p>Beta cerrada para labs de investigación y partners OEM; demos y embudo developer-first.</p>
        </article>
      </div>
    </div>,

    // 5 ROADMAP COMMERCIAL
    <div className="deck-slide" key="roadmap">
      <div className="deck-kicker">05 / ROADMAP → REVENUE</div>
      <h2>CÓMO 150K € SE VUELVEN MERCADO</h2>
      <div className="deck-table">
        <div className="deck-tr deck-th">
          <span>PERIODO</span><span>HITO TÉCNICO / COMERCIAL</span><span>IMPACTO DE NEGOCIO</span>
        </div>
        <div className="deck-tr">
          <span>Q3 2026</span>
          <span>Hardening Core C/Rust + pruebas en hardware neuromórfico</span>
          <span>Prototipo comercial listo para producción</span>
        </div>
        <div className="deck-tr">
          <span>Q4 2026</span>
          <span><strong>Lanzamiento:</strong> RXos Neuromorphic Kernel (Open Source) + PRISMA 3</span>
          <span>Comunidad devs + primeras ventas Indie/Pro (€60 / €150 ref.)</span>
        </div>
        <div className="deck-tr">
          <span>Q1 2027</span>
          <span>PRISMA 5 + acuerdos OEM B2B + path dispositivo EEG</span>
          <span>Ingresos por source (€300 ref.) y royalties OEM</span>
        </div>
      </div>
      <p className="deck-note">Precios de referencia del modelo Robin Hood — confirmación al release. No se comunica silicio inexistente como entregado.</p>
    </div>,

    // 6 GTM
    <div className="deck-slide" key="gtm">
      <div className="deck-kicker">06 / GO-TO-MARKET</div>
      <h2>DEVELOPER-FIRST · KERNEL OPEN</h2>
      <blockquote className="deck-quote">
        “Utilizamos el <strong>RXos Neuromorphic Kernel</strong> bajo licencia Open Source como embudo de captación técnico.
        Al permitir que desarrolladores e investigadores adopten la tecnología sin barreras de pago, creamos adopción orgánica
        y convertimos a licencias de pago (<strong>PRISMA 3 Pro / PRISMA 5 Commercial / OEM</strong>) cuando requieren soporte prioritario,
        código fuente completo o integración en hardware comercial.”
      </blockquote>
      <div className="deck-grid-3">
        <article>
          <span>EMBUDO</span>
          <h3>OPEN KERNEL</h3>
          <p>Papers + event fabric open → devs, labs, makers entran sin fricción.</p>
        </article>
        <article>
          <span>CONVERSIÓN</span>
          <h3>PRO / OEM</h3>
          <p>Soporte, source y royalty cuando el uso pasa a producto o lab profesional.</p>
        </article>
        <article>
          <span>LOCK-IN</span>
          <h3>EEG DEVICE</h3>
          <p>Adquisición + engine + OS edge: el hardware cierra el ciclo comercial.</p>
        </article>
      </div>
    </div>,

    // 7 FOUNDER
    <div className="deck-slide" key="founder">
      <div className="deck-kicker">07 / FOUNDER · CAPACIDAD DE EJECUCIÓN</div>
      <h2>EN DEEPTECH SE APUESTA POR QUIÉN PICA</h2>
      <p className="deck-sub">
        Pre-seed pre-revenue: ~80% de la apuesta es el constructor. Knights Labs no subcontrata el motor principal.
      </p>
      <div className="deck-grid-2">
        <article>
          <h3>PERFIL TÉCNICO</h3>
          <ul>
            <li>C / Rust / x86_64 bare-metal</li>
            <li>Kernel event-driven (LIF, STDP, SPSC)</li>
            <li>EEG: MNE, pipelines, benchmarks LOSO</li>
            <li>Integración SO + neurotech de forma independiente</li>
          </ul>
        </article>
        <article className="deck-card-hi">
          <h3>EFICIENCIA DEL CAPITAL</h3>
          <p>
            Los 150.000 € rinden como un equipo mayor en startups convencionales:
            el core no se outsourcea. Cada euro va a metal, NPU, IP y pilots — no a capas de gestión.
          </p>
          <p className="deck-note">Roger Navarro · Rogex Laboratories / Knights Labs</p>
        </article>
      </div>
    </div>,

    // 8 WHY INVEST
    <div className="deck-slide" key="why">
      <div className="deck-kicker">08 / WHY THIS ROUND</div>
      <h2>LO QUE COMPRA EL CLUB</h2>
      <div className="deck-grid-3">
        <article>
          <span>01</span>
          <h3>VALIDACIÓN TÉCNICA</h3>
          <p>Prototipo que arranca y se mide — no teoría de paper sin binario.</p>
        </article>
        <article>
          <span>02</span>
          <h3>EJECUCIÓN</h3>
          <p>Capacidad full-stack C/Rust/kernel/EEG sin dependencia de consultoras.</p>
        </article>
        <article>
          <span>03</span>
          <h3>PLAN DE HITOS</h3>
          <p>150k € → Dic 2026 launch con uso de fondos y roadmap revenue Q1 2027.</p>
        </article>
      </div>
      <div className="deck-badge-row" style={{ marginTop: 28 }}>
        <span>NO HYPE CLÍNICO</span>
        <span>NO GROWTH FAKE</span>
        <span>PATIENT CAPITAL</span>
        <span>TECNOACTIVISMO</span>
      </div>
    </div>,

    // 9 RISKS
    <div className="deck-slide" key="risks">
      <div className="deck-kicker">09 / RISKS & EDGE</div>
      <h2>RIESGOS QUE NOMBRAMOS</h2>
      <div className="deck-grid-2">
        <article>
          <h3>RIESGOS</h3>
          <ul>
            <li>Mercado EEG conservador y ciclo de venta B2B largo</li>
            <li>Chip Akida/Loihi aún no en el lab (Nivel 3 abierto)</li>
            <li>USB bare-metal y disco boot son proyectos enteros</li>
            <li>No somos SO de producción ni producto clínico</li>
          </ul>
        </article>
        <article className="deck-card-hi">
          <h3>EDGE</h3>
          <ul>
            <li>Kernel + EEG + path SNN en el mismo lab</li>
            <li>Papers falsables y límites públicos</li>
            <li>Modelo Robin Hood (open embudo / OEM paga)</li>
            <li>Deep tech con moral de trinchera, no de slide vacío</li>
          </ul>
        </article>
      </div>
    </div>,

    // 10 CTA
    <div className="deck-slide deck-title" key="cta">
      <div className="deck-kicker">10 / NEXT STEP</div>
      <h1>AGENDEMOS<br />EL DECK EN VIVO</h1>
      <p className="deck-lead">
        Pre-Seed <strong>150.000 €</strong> · 12–18 meses · Launch <strong>Dic 2026</strong>.
        Materiales: site, papers PDF, demo RXos/PRISMA, use of funds y roadmap.
      </p>
      <div className="deck-cta-row">
        <a className="brutal-button primary" href={mail}>
          knightsys@proton.me <ArrowUpRight size={16} />
        </a>
        <button type="button" className="brutal-button" onClick={() => navigate('/investors')}>MEMO INVERSORES</button>
        <button type="button" className="brutal-button" onClick={() => navigate('/prisma')}>PRISMA</button>
        <button type="button" className="brutal-button" onClick={() => navigate('/rx-os')}>RXos</button>
      </div>
      <p className="deck-hint">Contacto oficial Knights Labs · sin claims clínicos · pre-revenue DeepTech</p>
    </div>,
  ];

  return (
    <div className="deck-root">
      <div className="deck-topbar">
        <button type="button" className="deck-brand" onClick={() => navigate('/')}>
          <img src="/knightslabs_logo.png" alt="" width={28} height={28} />
          <span>KNIGHTS LABS · PITCH</span>
        </button>
        <div className="deck-top-actions">
          <span className="deck-counter">{String(slide + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <a className="deck-mail" href={mail}>knightsys@proton.me</a>
          <button type="button" className="deck-exit" onClick={() => navigate('/investors')}>SALIR</button>
        </div>
      </div>

      <div className={`deck-stage deck-anim-${anim}`} key={slide}>
        {slides[slide]}
      </div>

      <div className="deck-chrome">
        <button type="button" className="deck-nav-btn" onClick={() => go(slide - 1)} disabled={slide === 0} aria-label="Anterior">
          <ChevronLeft size={22} />
        </button>
        <div className="deck-dots" role="tablist" aria-label="Slides">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === slide}
              className={i === slide ? 'is-active' : ''}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button type="button" className="deck-nav-btn" onClick={() => go(slide + 1)} disabled={slide === total - 1} aria-label="Siguiente">
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

function Investors({ navigate }) {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="PARA INVERSORES · TECNOACTIVISMO"
        title={<>NO FINANCIAMOS<br />EL DESPILFARRO.<br />FINANCIAMOS EL CORTE.</>}
        text="Knights Labs no es una promesa de unicornio en la nube. Es ingeniería de bajo carbono, software EEG trazable y un kernel neuromórfico verificable — con un modelo Robin Hood que hace pagar a quien puede y abre camino a quien investiga."
        image={RXOS_HERO_IMAGE}
      >
        <div className="hero-tags">
          <span>ROBIN HOOD</span>
          <span>RXos v4.5</span>
          <span>PRISMA 3 / 5</span>
          <span>BENCH 6/6</span>
          <span>DEC 2026 TARGET</span>
        </div>
        <div className="hero-actions">
          <a className="brutal-button primary" href="mailto:knightsys@proton.me?subject=Inversi%C3%B3n%20/%20Partnership%20%E2%80%94%20Knights%20Labs">
            HABLAR CON EL LAB <Send size={15} />
          </a>
          <button className="brutal-button" onClick={() => navigate('/pitch')}>PITCH DECK</button>
          <button className="brutal-button" onClick={() => navigate('/startup-idea')}>STARTUP IDEA</button>
          <button className="brutal-button" onClick={() => navigate('/architecture')}>ARQUITECTURA</button>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / WHY NOW"
            title="LA CRISIS ES EL PRODUCTO DE OTROS"
            text="La industria aceptó software cada vez más pesado, nubes opacas y EEG de caja negra. Nosotros construimos lo contrario: eventos, eficiencia y libertad de inspección."
          />
          <div className="invest-grid">
            <article className="invest-card" data-reveal>
              <Leaf size={28} strokeWidth={1.35} />
              <h3>LOW-CARBON IS NOT A SLIDE</h3>
              <p>
                RXos mide energía con RAPL en metal, se duerme con MONITOR/MWAIT cuando no hay eventos y publica un sustrato con ~3 MiB al boot y bench 6/6.
                No pedimos fe: pedimos <code>bench</code>, <code>power</code> y papers PDF.
              </p>
            </article>
            <article className="invest-card" data-reveal>
              <Brain size={28} strokeWidth={1.35} />
              <h3>CADA CEREBRO ES ÚNICO</h3>
              <p>
                PRISMA demuestra que la firma personal importa: 73.3% raw LOSO frente a 91.0% personalizado en la referencia EC/EO.
                La variabilidad no es ruido de marketing — es el núcleo del producto.
              </p>
            </article>
            <article className="invest-card" data-reveal>
              <Zap size={28} strokeWidth={1.35} />
              <h3>CATEGORÍA, NO INCREMENTO</h3>
              <p>
                PRISMA 3 ataca el stack pesado (zero-copy, SIMD, ICA). PRISMA 5 cambia de paradigma: spikes, STDP, &lt;1 ms por evento sobre el event fabric de RXos.
                Frente a “otros softwares” monolíticos, esto es otra liga de arquitectura.
              </p>
            </article>
            <article className="invest-card invest-card-dark" data-reveal>
              <Shield size={28} strokeWidth={1.35} />
              <h3>HONESTIDAD COMO ACTIVO</h3>
              <p>
                Nivel 3 (Akida) está bloqueado porque falta el chip. Los resultados negativos se publican. No hay claims clínicos.
                Un inversor serio prefiere un lab que diga “aún no” a uno que invente milagros.
              </p>
            </article>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="02 / THESIS"
              title="TECNOACTIVISMO CON P&L"
              text="El modelo no es maximizar licencias opacas. Es financiar el bien público con capas B2B/OEM."
            />
            <div className="thesis-strip" data-reveal>
              <blockquote>
                “No picamos código para encajar en la industria. Picamos código para demostrar que otro modelo de tecnología es posible.
                La ingeniería es la trinchera. La eficiencia es la palabra.”
              </blockquote>
              <div className="thesis-meta">KNIGHTS LABS · ROBIN HOOD · OPEN WHERE IT MATTERS</div>
            </div>
            <div className="license-grid" style={{ marginTop: 36 }}>
              {LICENSE_TIERS.map((block, index) => (
                <article className="license-card license-card-on-dark" key={block.product} data-reveal style={{ '--delay': `${index * 70}ms` }}>
                  <span className="panel-label">{block.product}</span>
                  <table>
                    <tbody>
                      {block.rows.map(([name, price, note]) => (
                        <tr key={name}>
                          <th>{name}</th>
                          <td>{price}</td>
                          <td>{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </article>
              ))}
            </div>
            <p className="license-note" style={{ color: 'rgba(255,254,248,.72)', marginTop: 18 }}>
              Community y papers open impulsan adopción. Indie/Pro/OEM financian hardware de desarrollo (kits, NPU) y el fondo de acceso.
              Precios de referencia — confirmación al lanzamiento proyectado (Dic 2026).
            </p>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="03 / STACK"
            title="EN QUÉ SE INVIERTE, CONCRETAMENTE"
            text="Cuatro superficies reales. Estado medible. Roadmap sin fantasía de silicio inexistente."
          />
          <div className="suite-grid">
            {PRODUCT_SUITE.map((product, index) => (
              <ProductCard product={product} navigate={navigate} index={index} key={product.id} />
            ))}
          </div>
          <div className="invest-metrics" data-reveal>
            <div><strong>6/6</strong><span>bench PASS · codificación temporal</span></div>
            <div><strong>~299</strong><span>ciclos / evento (RXos)</span></div>
            <div><strong>~3 MiB</strong><span>RAM al boot del kernel</span></div>
            <div><strong>&lt;64 MB</strong><span>footprint objetivo PRISMA@rxOS</span></div>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="04 / RISK & EDGE"
              title="RIESGOS QUE NOMBRAMOS"
              text="Transparencia total: lo que puede fallar y por qué igual vale la pena."
            />
            <div className="two-track" style={{ border: '1.5px solid rgba(255,255,254,.45)' }}>
              <article className="track-card inverted" data-reveal style={{ border: 0 }}>
                <span>RISKS</span>
                <h3>LO QUE PUEDE DOLER</h3>
                <p>Mercado EEG conservador; chip Akida aún no en el lab; UEFI/disco boot y USB bare-metal son proyectos enteros; no somos un SO de producción ni un producto clínico.</p>
              </article>
              <article className="track-card track-card-edge" data-reveal>
                <span>EDGE</span>
                <h3>LO QUE NADIE MÁS JUNTA</h3>
                <p>Kernel event-driven propio + papers falsables + PRISMA personalizado + precios accesibles + narrativa low-carbon creíble. Deep tech con moral de trinchera, no de slide deck.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section wrap contact-section" id="invest-contact">
          <SectionTitle
            code="05 / NEXT"
            title="SI ESTO RESUENA"
            text="Buscamos partners que entiendan ingeniería filantrópica: capital paciente, hardware NPU y redes de labs/OEM — no pressure por diluir el rigor."
          />
          <div className="hero-actions section-actions">
            <a className="brutal-button primary" href="mailto:knightsys@proton.me?subject=Inversi%C3%B3n%20/%20Partnership%20%E2%80%94%20Knights%20Labs">
              knightsys@proton.me <ArrowUpRight size={15} />
            </a>
            <button className="brutal-button" onClick={() => navigate('/startup-idea')}>LEER STARTUP IDEA</button>
            <button className="brutal-button" onClick={() => navigate('/suite')}>VER SUITE</button>
          </div>
        </section>
      </main>
    </>
  );
}

function StartupIdea({ navigate }) {
  return (
    <>
      <PageHero
        index="07"
        eyebrow="STARTUP IDEA · KNIGHTS LABS"
        title={<>CÓMPUTO POR EVENTOS.<br />EFICIENCIA.<br />LIBERTAD.</>}
        text="Una startup de neurotecnología low-carbon: sustituir software EEG inflado y nubes opacas por un stack bare-metal + SNN + licenciamiento Robin Hood. Manifiesto híbrido — divulgación humana y rigor técnico en la misma trinchera."
        image="/home-campaigns.svg"
      >
        <div className="hero-tags">
          <span>PROBLEM</span>
          <span>SOLUTION</span>
          <span>WHY US</span>
          <span>MODEL</span>
          <span>TRACTION</span>
        </div>
        <div className="hero-actions">
          <button className="brutal-button primary" onClick={() => navigate('/pitch')}>PITCH DECK</button>
          <button className="brutal-button" onClick={() => navigate('/investors')}>PARA INVERSORES</button>
          <button className="brutal-button" onClick={() => navigate('/prisma')}>PRISMA</button>
          <button className="brutal-button" onClick={() => navigate('/rx-os')}>RXos v4.5</button>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / PROBLEM"
            title="CÓMPUTO EXTRACTIVO + EEG OPACO"
            text="Dos fallas del mismo sistema: software que engorda para vender hardware y nubes, y herramientas neurofisiológicas pesadas que tratan a cada persona como un promedio."
          />
          <div className="startup-points">
            {[
              ['SOFTWARE INFLATION', 'Leyes de Wirth/Parkinson: lo mismo que hace una década exige máquinas 10× más potentes. El polling y las capas muertas queman vatios en silencio.'],
              ['LA ILUSIÓN DE LA NUBE', 'Data centers e IA ya superan ~460 TWh y pueden acercarse a ~1.000 TWh (orden de magnitud IEA / Japón). “La nube” no es limpia: es hormigón, agua y red.'],
              ['CEREBRO PROMEDIO', 'El modelo genérico falla donde la persona importa. PRISMA mide 73.3% LOSO vs 91.0% personalizado: la firma biológica es el producto.'],
              ['HERRAMIENTAS PESADAS', 'Otros softwares EEG de escritorio suelen exigir varios GB de RAM, SO comercial y latencias de cientos de ms por ventana. El acceso se vuelve de élite.'],
            ].map(([title, text], index) => (
              <article key={title} data-reveal style={{ '--delay': `${index * 60}ms` }}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="02 / SOLUTION"
              title="TRES CAPAS, UNA MISIÓN"
              text="No un app más. Un stack: sistema, motor de señal y motor de espigas."
            />
            <div className="levels-grid">
              <article className="level-card level-ok" data-reveal>
                <div className="level-card-top"><span>LAYER A</span><StatusBadge tone="ok">RXos v4.5</StatusBadge></div>
                <h3>BARE-METAL EVENT OS</h3>
                <p>Tejido de eventos LIF/STDP verificable, power_idle, papers públicos. Niveles 1–2 cerrados. Akida = Nivel 3 pendiente de silicio.</p>
              </article>
              <article className="level-card level-ok" data-reveal>
                <div className="level-card-top"><span>LAYER B</span><StatusBadge tone="ok">PRISMA 3</StatusBadge></div>
                <h3>HIGH-PERF EEG</h3>
                <p>Zero-copy, SIMD, ICA, Riemann, trazabilidad LOSO/calibración/personal. Alternativa ligera a monólitos comerciales.</p>
              </article>
              <article className="level-card level-warn" data-reveal>
                <div className="level-card-top"><span>LAYER C</span><StatusBadge tone="warn">PRISMA 5</StatusBadge></div>
                <h3>SNN ENGINE</h3>
                <p>Delta mod → spikes, predictive coding, STDP, resonancia de ritmos, &lt;1 ms/evento. Camino a edge neuromórfico.</p>
              </article>
              <article className="level-card level-open" data-reveal>
                <div className="level-card-top"><span>LAYER D</span><StatusBadge>ROBIN HOOD</StatusBadge></div>
                <h3>LICENCIAS CON ALMA</h3>
                <p>Community gratis. Indie/Pro asequibles. OEM/royalties financian kits, labs independientes y causas de acceso.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="03 / WHY THIS STARTUP"
            title="POR QUÉ AHORA · POR QUÉ NOSOTROS"
            text="Deep tech con artefactos ya arrancando: ISO, bench, papers, capturas en metal y una marca que no miente."
          />
          <div className="method-grid">
            {[
              [Terminal, 'ARTEFACTO REAL', 'RXos arranca en QEMU y en HP 15 de referencia. No es un mockup de SO.'],
              [FlaskConical, 'FALSABLE', 'bench 6/6 predice y mide. Si una fila falla, se publica — no se esconde.'],
              [Leaf, 'NARRATIVA VERDAD', 'Low-carbon atado a RAPL, idle y footprint — no a greenwashing de slide.'],
              [Factory, 'OEM PATH', 'Integradores de hardware y royalty: el capital B2B subsidia el open research.'],
              [Microscope, 'CIENCIA PRIMERO', 'Límites no clínicos explícitos. Confianza de labs y revisores.'],
              [Heart, 'EMOCIÓN + RIGOR', 'El manifiesto híbrido: capa humana para activistas y capa técnica para ingenieros.'],
            ].map(([Icon, title, text], index) => (
              <article className="method-card" key={title} data-reveal style={{ '--delay': `${index * 50}ms` }}>
                <Icon size={28} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="04 / MODEL"
              title="CÓMO SE GANA SIN VENDER EL ALMA"
              text="Open-core + capas Pro/OEM. Volumen en la base. Valor en integración y silicio."
            />
            <div className="audience-table" data-reveal>
              <div className="audience-row audience-head">
                <span>PALANCA</span><span>QUÉ SE VENDE</span><span>A QUIÉN</span>
              </div>
              <div className="audience-row">
                <span>Community</span>
                <span>PRISMA 3 open / papers RXos</span>
                <span>Estudiantes, makers, labs del Sur global</span>
              </div>
              <div className="audience-row">
                <span>Indie / Pro</span>
                <span>Licencias €49–€399 (referencia)</span>
                <span>Devs BCI, universidades, pymes neurotech</span>
              </div>
              <div className="audience-row">
                <span>OEM</span>
                <span>Motor + custom arch + royalty</span>
                <span>Fabricantes de headsets / NPU partners</span>
              </div>
              <div className="audience-row">
                <span>Desktop</span>
                <span>rxOS Desktop closed</span>
                <span>Labs que quieren superficie soberana</span>
              </div>
            </div>
          </div>
        </section>

        <section className="statement-section">
          <div className="wrap statement-grid" data-reveal>
            <div className="statement-mark"><Leaf size={54} strokeWidth={1.2} /></div>
            <blockquote>
              “La piedra y la montaña: un commit a la vez, sin aplauso fácil.
              Si el código no arranca, no es manifiesto — es literatura.”
            </blockquote>
            <div className="statement-meta">BUILD · MEASURE · OPEN · RESIST</div>
          </div>
        </section>

        <CtaBand navigate={navigate} />
      </main>
    </>
  );
}

function About({ navigate }) {
  const projectGroups = useMemo(() => PROJECTS, []);
  return (
    <>
      <PageHero
        index="08"
        eyebrow="ABOUT / KNIGHTS LABS"
        title={<>BUILT BY HAND.<br />SHIPPED AS LAB.<br />OPEN WHERE IT MATTERS.</>}
        text="Knights Labs es el marco de producto de Rogex Laboratories: neurotecnología de bajo carbono, software EEG reproducible y un kernel neuromórfico abierto. Fundado por Roger Navarro."
        image="/about-workbench.svg"
      />

      <main>
        <section className="section wrap about-intro">
          <div className="about-profile" data-reveal>
            <span>FOUNDER / RESEARCH SOFTWARE DEVELOPER</span>
            <h2>ROGER NAVARRO</h2>
            <p>Desarrollador independiente centrado en EEG, procesamiento de señal, sistemas bare-metal, SNNs y herramientas defensivas. El objetivo no es aparentar una gran institución: es convertir trabajo real, documentación y colaboración en una institución con el tiempo.</p>
          </div>
          <div className="about-principles" data-reveal>
            <div><span>01</span><strong>BUILD</strong><p>Prototipos que arrancan, ejecutan y generan resultados inspeccionables.</p></div>
            <div><span>02</span><strong>MEASURE</strong><p>Métricas acompañadas por el régimen experimental y sus límites.</p></div>
            <div><span>03</span><strong>DOCUMENT</strong><p>Arquitectura, fallos, resultados negativos y roadmap públicos.</p></div>
            <div><span>04</span><strong>OPEN / LICENSE</strong><p>Kernel neuromórfico open; Pro y OEM financian acceso e investigación.</p></div>
          </div>
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="01 / SKILLS"
              title="TECHNICAL RANGE"
              text="Stack real del laboratorio: bare-metal y neuromórfica (C/Rust/ASM), EEG reproducible (Python/MNE) y front del sitio (React/Vite). No sustituye experiencia institucional ni certificaciones inexistentes."
            />
            <div className="skill-cloud" data-reveal>
              {SKILLS.map((skill, index) => <span style={{ '--i': index }} key={skill}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="02 / PROJECTS"
            title="PERSONAL WORK"
            text="RGX WSP y RGX GASLIGHT son proyectos personales de Roger Navarro. No son públicos: no forman parte de la startup ni de las marcas Rogex Laboratories o Knights Labs."
          />
          <div className="project-grid">
            {projectGroups.map((project, index) => (
              <article className="project-card" key={project.name} data-reveal style={{ '--delay': `${index * 60}ms` }}>
                <div className="project-top"><span>{String(index + 1).padStart(2, '0')}</span><span>{project.type}</span></div>
                <h3>{project.name}</h3>
                <p>{project.text}</p>
                {!project.public && (
                  <p className="project-private-note">No público · proyecto personal, fuera de Rogex Laboratories / Knights Labs.</p>
                )}
                <div className="stack-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-black gaslight-media-section" id="gaslight-demo">
          <div className="wrap">
            <SectionTitle
              code="03 / VIDEO / DEFENSIVE SECURITY"
              title="RGX GASLIGHT — DEMONSTRATION"
              text="Framework experimental de defensa, engaño y observabilidad. No se presenta como herramienta ofensiva."
            />
            <div className="video-layout gaslight-video-layout">
              <div className="video-frame" data-reveal>
                <iframe
                  src="https://www.youtube-nocookie.com/embed/ToIAxNt07y0?rel=0"
                  title="RGX Gaslight defensive security demonstration"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <aside className="video-note" data-reveal>
                <span className="panel-label">PROJECT RECORD / REAL DEMO</span>
                <h3>DECEPTION AS A DEFENSIVE SENSOR.</h3>
                <p>Superficies señuelo, perfiles modulares, eventos y reportes para observar automatización hostil.</p>
                <div className="tag-row gaslight-video-tags"><span>PYTHON</span><span>LINUX</span><span>YAML</span><span>TELEMETRY</span><span>DEFENSIVE ONLY</span></div>
                <a className="archive-video-link" href="https://youtu.be/ToIAxNt07y0" target="_blank" rel="noreferrer">OPEN ON YOUTUBE <ArrowUpRight size={16} /></a>
              </aside>
            </div>
          </div>
        </section>

        <CtaBand navigate={navigate} />

        <KccFindUsSection />

        <section className="section contact-section" id="contact">
          <div className="wrap">
            <SectionTitle
              code="04 / CONTACT"
              title="WRITE TO THE LAB"
              text="Colaboración científica, revisión técnica, hardware OEM, trabajo, prensa o propuestas de proyecto."
            />
            <div className="contact-layout">
              <div className="contact-addresses" data-reveal>
                <a href="mailto:knightsys@proton.me">
                  <span>KNIGHTS LABS / OEM</span>
                  <strong>knightsys@proton.me</strong>
                  <Mail size={22} />
                </a>
                <a href="mailto:rogynavarro@gmail.com">
                  <span>PERSONAL</span>
                  <strong>rogynavarro@gmail.com</strong>
                  <Mail size={22} />
                </a>
                <div className="contact-note">
                  <CircleDot size={18} />
                  <p>Para investigación, incluye dataset, paradigma y objetivo de evaluación. Para OEM, hardware target y volumen. Para kernel, entorno y pasos de reproducción.</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="wrap footer-main">
        <div>
          <button className="footer-brand" onClick={() => navigate('/')} aria-label="Knights Labs home">
            <img className="footer-knights-logo" src="/knightslabs_logo.png" alt="Knights Labs" width={48} height={48} />
            <span className="footer-wordmark">KNIGHTS<br />LABS</span>
          </button>
          <p>Rogex Laboratories · low-carbon neurotech, EEG research software and neuromorphic systems.</p>
        </div>
        <div className="footer-nav">
          {NAV_ITEMS.map(([href, label]) => <button key={href} onClick={() => navigate(href)}>{label}</button>)}
        </div>
        <div className="footer-socials">
          {SOCIALS.map((item) => <SocialIcon item={item} key={item.label} />)}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 KNIGHTS LABS / ROGEX LABORATORIES. ALL RIGHTS RESERVED.</span>
        <span>PRISMA IS EXPERIMENTAL, NON-CLINICAL RESEARCH SOFTWARE. LAUNCH TARGET DEC 2026.</span>
      </div>
    </footer>
  );
}

function NotFound({ navigate }) {
  return (
    <main className="not-found">
      <span>404 / ROUTE NOT FOUND</span>
      <h1>NO SIGNAL.</h1>
      <button className="brutal-button primary" onClick={() => navigate('/')}>RETURN HOME</button>
    </main>
  );
}

function setMetaTag(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

/** JSON-LD WebPage graph for SERP / rich results (Screaming Frog + Google). */
function setJsonLd(meta) {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.rogexlaboratories.com/#organization',
        name: 'Knights Labs',
        alternateName: ['Rogex Laboratories', 'ROGEX Laboratories'],
        url: 'https://www.rogexlaboratories.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.rogexlaboratories.com/knightslabs_logo.png',
          width: 1200,
          height: 1200,
        },
        image: 'https://www.rogexlaboratories.com/rogexlaboratories_logo.png',
        description:
          'Independent lab for low-carbon neurotech: PRISMA EEG software, PRISMA 5 SNN path and RXos neuromorphic event fabric.',
        email: 'knightsys@proton.me',
        sameAs: ['https://x.com/rogexlabs'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.rogexlaboratories.com/#website',
        url: 'https://www.rogexlaboratories.com/',
        name: 'Knights Labs — Rogex Laboratories',
        description:
          'Neurotech low-carbon: PRISMA 3.2 EEG, PRISMA 5 SNN y RXos v4.5.0 event fabric.',
        publisher: { '@id': 'https://www.rogexlaboratories.com/#organization' },
        inLanguage: ['es', 'en'],
      },
      {
        '@type': 'WebPage',
        '@id': `${meta.url}#webpage`,
        url: meta.url,
        name: meta.title,
        description: meta.description,
        isPartOf: { '@id': 'https://www.rogexlaboratories.com/#website' },
        about: { '@id': 'https://www.rogexlaboratories.com/#organization' },
        inLanguage: 'es',
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: meta.image,
        },
      },
    ],
  };

  let el = document.getElementById('ld-org');
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'ld-org';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(graph);
}

const DEFAULT_OG = {
  title: 'Knights Labs — Rogex Laboratories',
  description:
    'Knights Labs (Rogex Laboratories): neurotech low-carbon — PRISMA 3.2 EEG, PRISMA 5 SNN y RXos v4.5.0 event fabric (bench 6/6). Para developers, research y OEM.',
  image: 'https://www.rogexlaboratories.com/knightslabs_logo.png',
  imageType: 'image/png',
  imageWidth: '1200',
  imageHeight: '1200',
  imageAlt: 'Knights Labs logo',
  url: 'https://www.rogexlaboratories.com/',
};

const ROUTE_META = {
  '/': { ...DEFAULT_OG },
  '/suite': {
    title: 'Product Suite — Knights Labs',
    description:
      'Suite de producto: rxOS Desktop, kernel neuromórfico, PRISMA 3 y PRISMA 5. Licencias para developers, research y OEM.',
    image: DEFAULT_OG.image,
    imageType: 'image/png',
    imageWidth: '1200',
    imageHeight: '1200',
    imageAlt: 'Knights Labs logo',
    url: 'https://www.rogexlaboratories.com/suite',
  },
  '/prisma': {
    title: 'PRISMA 3.2 & 5 — Knights Labs',
    description:
      'PRISMA 3.2 software EEG experimental y PRISMA 5 motor SNN. No clínico. Descargas públicas en camino.',
    image: 'https://www.rogexlaboratories.com/rogexlaboratories_logo.png',
    imageType: 'image/png',
    imageWidth: '1080',
    imageHeight: '1080',
    imageAlt: 'Rogex Laboratories logo',
    url: 'https://www.rogexlaboratories.com/prisma',
  },
  '/rx-os': {
    title: 'RXos v4.5.0 Neuromorphic — Knights Labs',
    description:
      'RXos v4.5.0 event fabric bare-metal x86_64: LIF Q16.16, STDP, bench 6/6. Niveles 1–2 cerrados. Akida Level 3 pendiente.',
    image: RXOS_OG_IMAGE,
    imageType: 'image/jpeg',
    imageWidth: '1600',
    imageHeight: '1200',
    imageAlt: 'PC with RXos v4.5 installed',
    url: 'https://www.rogexlaboratories.com/rx-os',
  },
  '/rogexos': {
    title: 'RXos v4.5.0 Neuromorphic — Knights Labs',
    description:
      'RXos v4.5.0 event fabric bare-metal x86_64: LIF Q16.16, STDP, bench 6/6. Niveles 1–2 cerrados. Akida Level 3 pendiente.',
    image: RXOS_OG_IMAGE,
    imageType: 'image/jpeg',
    imageWidth: '1600',
    imageHeight: '1200',
    imageAlt: 'PC with RXos v4.5 installed',
    url: 'https://www.rogexlaboratories.com/rx-os',
  },
  '/architecture': {
    title: 'Architecture RXos v4.5 — Knights Labs',
    description:
      'Arquitectura RXos: event fabric en von Neumann, anillos SPSC, LIF/STDP y roadmap neuromórfico en 4 niveles. Papers PDF públicos.',
    image: RXOS_OG_IMAGE,
    imageType: 'image/jpeg',
    imageWidth: '1600',
    imageHeight: '1200',
    imageAlt: 'RXos neuromorphic substrate',
    url: 'https://www.rogexlaboratories.com/architecture',
  },
  '/about': {
    title: 'About — Knights Labs / Rogex',
    description:
      'Lab independiente de neurotech low-carbon, software EEG y sistemas bare-metal. Contacto para developers, research y OEM.',
    image: DEFAULT_OG.image,
    imageType: 'image/png',
    imageWidth: '1200',
    imageHeight: '1200',
    imageAlt: 'Knights Labs logo',
    url: 'https://www.rogexlaboratories.com/about',
  },
  '/investors': {
    title: 'Para inversores — Knights Labs',
    description:
      'Tecnoactivismo con P&L: RXos v4.5, PRISMA 3/5, licensing Robin Hood, compute low-carbon y riesgos deep-tech con transparencia.',
    image: RXOS_OG_IMAGE,
    imageType: 'image/jpeg',
    imageWidth: '1600',
    imageHeight: '1200',
    imageAlt: 'Knights Labs / RXos for investors',
    url: 'https://www.rogexlaboratories.com/investors',
  },
  '/pitch': {
    title: 'Pre-Seed Pitch 150k€ — Knights Labs',
    description:
      'Pitch pre-seed DeepTech: 150.000 € para PRISMA + RXos hasta lanzamiento dic. 2026. Tracción, use of funds y GTM developer-first.',
    image: RXOS_OG_IMAGE,
    imageType: 'image/jpeg',
    imageWidth: '1600',
    imageHeight: '1200',
    imageAlt: 'Knights Labs Pre-Seed pitch deck',
    url: 'https://www.rogexlaboratories.com/pitch',
  },
  '/startup-idea': {
    title: 'Startup idea — Knights Labs',
    description:
      'Idea de startup: compute event-driven, software EEG y SNN neuromórfico con licensing filantrópico. Problema, solución y tracción.',
    image: DEFAULT_OG.image,
    imageType: 'image/png',
    imageWidth: '1200',
    imageHeight: '1200',
    imageAlt: 'Knights Labs startup idea',
    url: 'https://www.rogexlaboratories.com/startup-idea',
  },
};

function App() {
  const [path, navigate] = useRoute();
  useReveal();
  const newspaperMode = shouldMountNewspaper(path);

  useEffect(() => {
    if (newspaperMode) return;

    const meta = ROUTE_META[path] || DEFAULT_OG;
    document.title = meta.title;
    setCanonical(meta.url);
    setJsonLd(meta);

    setMetaTag('name', 'description', meta.description);
    setMetaTag(
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    setMetaTag(
      'name',
      'googlebot',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Knights Labs / Rogex Laboratories');
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', meta.url);
    setMetaTag('property', 'og:image', meta.image);
    setMetaTag('property', 'og:image:type', meta.imageType);
    setMetaTag('property', 'og:image:width', meta.imageWidth);
    setMetaTag('property', 'og:image:height', meta.imageHeight);
    setMetaTag('property', 'og:image:alt', meta.imageAlt);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', meta.image);
    setMetaTag('name', 'twitter:image:alt', meta.imageAlt);
  }, [path, newspaperMode]);

  // newspaper.rogexlaboratories.com or /newspaper on main domain
  if (newspaperMode) {
    return <NewspaperApp />;
  }

  let page = <NotFound navigate={navigate} />;
  if (path === '/') page = <Home navigate={navigate} />;
  if (path === '/suite') page = <Suite navigate={navigate} />;
  if (path === '/architecture') page = <Architecture navigate={navigate} />;
  if (path === '/prisma') page = <Prisma navigate={navigate} />;
  if (path === '/rx-os' || path === '/rogexos') page = <RXOS navigate={navigate} />;
  if (path === '/investors') page = <Investors navigate={navigate} />;
  if (path === '/pitch') page = <Pitch navigate={navigate} />;
  if (path === '/startup-idea') page = <StartupIdea navigate={navigate} />;
  if (path === '/about') page = <About navigate={navigate} />;

  // Pitch is a fullscreen slide deck — no site chrome
  if (path === '/pitch') {
    return page;
  }

  return (
    <>
      <Header path={path} navigate={navigate} />
      {page}
      <Footer navigate={navigate} />
    </>
  );
}

const root = document.getElementById('root');
if (root) {
  root.innerHTML = '';
  createRoot(root).render(<App />);
}
