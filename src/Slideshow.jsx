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

export default function Slideshow({ slides = HOME_SLIDES, onNavigate, interval = 6400 }) {
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
      className="home-slideshow"
      aria-roledescription="carousel"
      aria-label="Capturas reales — rxOS v8 Desktop, NAVI 4.5, PRISMA"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="home-slideshow-frame">
        {slides.map((s, idx) => (
          <img
            key={s.src}
            src={s.src}
            alt={`${s.kicker} — ${s.caption}`}
            className={idx === i ? 'is-active' : ''}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="home-slideshow-scrim" aria-hidden />
        <div className="home-slideshow-copy wrap">
          <span className="kicker">{slide.kicker}</span>
          <h1>{slide.title}</h1>
          <p>{slide.caption}</p>
          <div className="hero-actions">
            <button
              type="button"
              className="brutal-button primary"
              onClick={() => onNavigate(slide.href)}
            >
              ABRIR
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
            key={s.src}
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
