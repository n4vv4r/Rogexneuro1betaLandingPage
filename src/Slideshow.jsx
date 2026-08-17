import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HOME_SLIDES = [
  {
    src: '/rxos/9/01-desktop.jpg',
    credit: 'QEMU · rxOS 9.0.0 SMOKE · 17 ago 2026',
    kicker: 'rxOS 9 · SMOKE AERO',
    title: 'EL ESCRITORIO YA ES NEGRO.',
    caption: 'Dark Aero, iconos PNG, NAVI 7 oficial. Captura real de la ISO. No es un mockup.',
    href: '/rx-os#rxos-captures',
  },
  {
    src: '/rxos/9/03-navi7.jpg',
    credit: 'QEMU · Navi 7 · tecla v',
    kicker: 'NAVI 7 · 73 FICHAS',
    title: 'PREGUNTA. SI NO HAY FICHA, DESCONOCIDO.',
    caption: 'Catálogo entrenado + harvest HTTP. No es un LLM. No hay NPU Akida.',
    href: '/navi',
  },
  {
    src: '/rxos/9/00-grub.jpg',
    credit: 'GRUB · fondo eclipse',
    kicker: 'BOOT · ECLIPSE',
    title: 'EL MENÚ TAMBIÉN ES rxOS 9.',
    caption: 'GRUB con el eclipse. 8 segundos. Luego el unikernel.',
    href: '/rx-os',
  },
  {
    src: '/rxos/hp-ac195nl-85/01-chat-rlc.jpg',
    credit: 'HP 15-ac195nl · metal 8.5 · 17 ago 2026',
    kicker: 'METAL · HP 15-ac195nl',
    title: 'ESTO YA NO ES QEMU.',
    caption: 'NAVI 6.5 RLC en el i7-5500U. 1 + 9 * 2 = 19. 463 KiB W + 64 KiB L2. Foto del portátil.',
    href: '/rx-os#hp-metal',
  },
  {
    src: '/rxos/hp-ac195nl-85/02-power-rapl.jpg',
    credit: 'HP 15-ac195nl · comando power · 01:07:28',
    kicker: 'RAPL REAL · MWAIT C7',
    title: '3678 mW DE PAQUETE EN REPOSO.',
    caption: 'i7-5500U. Cores 73 mW. 42 °C. msr guard OK. Medido, no estimado.',
    href: '/docs/hp-metal-85',
  },
  {
    src: '/rxos/hp-ac195nl-85/04-navi6-bench.jpg',
    credit: 'HP 15-ac195nl · navi6 bench · 01:08:04',
    kicker: 'NAVI 6.5 · 1010 B',
    title: 'heap 0. ONCE MÁSCARAS. MATH ENTERO.',
    caption: 'NAVI6W01 module2. El blob RLC cabe en un kilobyte y pico.',
    href: '/docs/navi65',
  },
  {
    src: '/rxos/hp-ac195nl-85/06-navi-joules.jpg',
    credit: 'HP 15-ac195nl · navi joules · 01:08:50',
    kicker: 'Q6 BURST · RAPL PKG',
    title: '18554 µJ / 256 RUNS.',
    caption: '72.5 µJ/run de paquete. No es J/NPU. Akida sigue ausente.',
    href: '/docs/hp-metal-85',
  },
  {
    src: '/rxos/hp-ac195nl-85/08-masks-demo.jpg',
    credit: 'HP 15-ac195nl · G_logic / G_code / G_news',
    kicker: 'MÁSCARAS EN METAL',
    title: 'TRANSITIVIDAD. rev_u8. BRIEFING LOCAL.',
    caption: '~16.8 ms por turno. Sin red. Sin FPU. El castellano es máscara.',
    href: '/rx-os#hp-metal',
  },
  {
    src: '/rxos/monad/12-desktop.png',
    kicker: 'rxOS v8 DESKTOP',
    title: 'ESTO NO ES UN MOCKUP.',
    caption: 'Escritorio Aero 1280×720. Captura QEMU 13 ago 2026. El SO es la demo.',
    href: '/rx-os',
  },
  {
    src: '/rxos/monad/13-navi45-ready.png',
    kicker: 'NAVI 4.5 · OPERADOR',
    title: 'NO ES UN CHATBOT. ES EL OPERADOR.',
    caption: 'Tecla v. 16 bytes. Si pides status, lo ejecuta. No lo inventa.',
    href: '/docs/navi45',
  },
  {
    src: '/rxos/monad/14-navi45-prove.png',
    kicker: 'NAVI 4.5 · /prove',
    title: 'heap navi3 0. HDC 100%.',
    caption: '/prove. Misma commands_dispatch() que la Terminal. El anuncio es el binario.',
    href: '/docs/demostracion',
  },
  {
    src: '/rxos/monad/15-navi45-status.png',
    kicker: 'G_rxos',
    title: 'rxOS> status',
    caption: 'NAVI no recita el estado: lo corre y te pega la salida.',
    href: '/docs/navi45',
  },
  {
    src: '/rxos/monad/16-terminal.png',
    kicker: 'TERMINAL',
    title: 'LA MISMA SHELL QUE LLAMA NAVI.',
    caption: 'ROSH en Aero. Esc suelta el teclado. Captura QEMU real.',
    href: '/rx-os',
  },
  {
    src: '/rxos/monad/17-neuro.png',
    kicker: 'FABRIC LIF',
    title: 'CUALQUIER TECLA ES UN ESTÍMULO.',
    caption: 'Neurona LIF en el event fabric. Threshold 1.00. No es un skin.',
    href: '/docs/event_fabric',
  },
  {
    src: '/rxos/monad/11-boot.png',
    kicker: 'BOOT · SELF-TEST',
    title: 'Q6 PASS. NAVI3W01 bound.',
    caption: 'Cada OK se imprime solo si esa etapa se comprobó de verdad.',
    href: '/docs/tutorial-monad',
  },
  {
    src: '/screenshots/prisma-engine/hero_gui.jpg',
    kicker: 'PRISMA ENGINE · SNN',
    title: 'Spikes on a real GUI.',
    caption: 'Captura nativa egui — waveforms y telemetría.',
    href: '/prisma',
  },
];

export const DOC_SLIDES = [
  {
    src: '/rxos/hp-ac195nl-85/02-power-rapl.jpg',
    credit: 'HP 15-ac195nl · metal 8.5 · 17 ago 2026',
    kicker: 'ARTÍCULO · METAL',
    title: 'EL PORTÁTIL YA PRODUJO LAS CIFRAS.',
    caption: 'RAPL, navi3, navi6, neurocpu, 72.5 µJ/run Q6. Ocho fotos. QEMU se niega; el i7-5500U no.',
    href: '/docs/hp-metal-85',
  },
  {
    src: '/rxos/hp-ac195nl-85/06-navi-joules.jpg',
    credit: 'HP 15-ac195nl · navi joules',
    kicker: 'ARTÍCULO · JULIOS',
    title: 'DELTA DE PAQUETE. NO DE NPU.',
    caption: '18554 µJ medidos en 256 corridas Q6. Software LIF. Akida sigue en stub.',
    href: '/docs/hp-metal-85',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/DARPA_SyNAPSE_16_Chip_Board.jpg',
    credit: 'Wikimedia Commons · placa SyNAPSE / DARPA (IBM)',
    kicker: 'ARTÍCULO · COMPARAR',
    title: 'NAVI NO ES LOIHI. TAMPOCO ES UN LLM.',
    caption: 'Loihi, Akida, SpiNNaker, TrueNorth y el loro de la nube. Qué somos y qué no. Para escépticos, con respeto.',
    href: '/docs/navi-compare',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Silicon_wafer.jpg',
    credit: 'Wikimedia Commons · oblea de silicio',
    kicker: 'ARTÍCULO · PLANO',
    title: 'CIANOTIPO: QUÉ CORRE Y QUÉ ESPERA A UNA PLACA.',
    caption: 'rxOS, NAVI, PRISMA, Akida. Nivel 3 = objetivo. Nivel 4 = horizonte de la industria.',
    href: '/docs/cianotipo',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Intel_C4004.jpg',
    credit: 'Wikimedia Commons · Intel 4004 (silicio, no Akida)',
    kicker: 'ARTÍCULO · GANCHO',
    title: 'AKIDA ES EL OBRERO. NAVI SIGUE SIENDO EL SITIO.',
    caption: 'MetaTF, Engine C++, HardwareDriver. neurocpu akida hoy se niega. Eso es el contrato.',
    href: '/docs/akida',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/99/DEC_VT100_terminal.jpg',
    credit: 'Wikimedia Commons · terminal DEC VT100',
    kicker: 'ARTÍCULO · NAVI 6.5',
    title: 'ONCE RELÉS. CINCO CAJAS. DESCONOCIDO SI NO HAY FICHA.',
    caption: 'El modelo RLC oficial. Razona, habla y emite código con esquema. No predice tokens.',
    href: '/docs/navi65',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    credit: 'Unsplash · placa de circuito (idea: silicio futuro)',
    kicker: 'ARTÍCULO · NAVI 7',
    title: '7 ES UN PLAN. SIN PLACA NO HAY TAG.',
    caption: 'Misma mente que 6.5 más un programa .fbz. Criterios para atreverse a llamarlo 7.',
    href: '/docs/navi7',
  },
  {
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
    credit: 'Unsplash · código en pantalla (idea: línea, no un loro)',
    kicker: 'ARTÍCULO · CATÁLOGO',
    title: 'LA LÍNEA 1 → 6.5, EN ORDEN.',
    caption: 'Cada generación añade una capa. Ninguna borra a la anterior. 7 sigue en el plano.',
    href: '/docs/navi-catalog',
  },
];

export default function Slideshow({
  slides = HOME_SLIDES,
  onNavigate,
  interval = 6400,
  label = 'Capturas reales — rxOS, NAVI, PRISMA',
  action = 'ABRIR',
  className = '',
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const slide = slides[i] || slides[0];

  useEffect(() => {
    if (paused || n < 2) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % n), interval);
    return () => clearInterval(t);
  }, [paused, n, interval]);

  const go = (dir) => setI((v) => (v + dir + n) % n);

  return (
    <section
      className={`home-slideshow ${className}`.trim()}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="home-slideshow-frame">
        {slides.map((s, idx) => (
          <img
            key={`${s.href}-${s.src}`}
            src={s.src}
            alt={`${s.kicker} — ${s.caption}`}
            className={idx === i ? 'is-active' : ''}
            loading={idx === 0 ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
          />
        ))}
        <div className="home-slideshow-scrim" aria-hidden />
        <div className="home-slideshow-copy wrap">
          <span className="kicker">{slide.kicker}</span>
          <h1>{slide.title}</h1>
          <p>{slide.caption}</p>
          {slide.credit && <p className="slide-credit">{slide.credit}</p>}
          <div className="hero-actions">
            <button
              type="button"
              className="brutal-button primary"
              onClick={() => onNavigate(slide.href)}
            >
              {action}
            </button>
            <button type="button" className="brutal-button" onClick={() => onNavigate('/downloads')}>
              DOWNLOADS
            </button>
            <button type="button" className="brutal-button" onClick={() => onNavigate('/docs')}>
              DOCS
            </button>
          </div>
        </div>
        <div className="home-slideshow-nav">
          <button type="button" aria-label="Anterior" onClick={() => go(-1)}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" aria-label="Siguiente" onClick={() => go(1)}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="home-slideshow-dots" role="tablist">
        {slides.map((s, idx) => (
          <button
            key={`${s.href}-${s.src}`}
            type="button"
            role="tab"
            aria-selected={idx === i}
            aria-label={s.kicker}
            className={idx === i ? 'is-active' : ''}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </section>
  );
}
