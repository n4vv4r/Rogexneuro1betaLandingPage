import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HOME_SLIDES = [
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
