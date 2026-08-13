import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HOME_SLIDES = [
  {
    src: '/screenshots/prisma-engine/hero_gui.jpg',
    kicker: 'PRISMA ENGINE · SNN',
    title: 'Spikes on a real GUI.',
    caption: 'Captura nativa egui — waveforms y telemetría. No es un mockup.',
    href: '/prisma',
  },
  {
    src: '/screenshots/prisma-engine/gui_03_live.png',
    kicker: 'PRISMA 5 PATH',
    title: 'Event-driven, not a batch FFT.',
    caption: 'Motor LIF / Δ-mod en vivo. El producto P5 aún no se descarga.',
    href: '/prisma#prisma5',
  },
  {
    src: '/rxos/monad/03-desktop.png',
    kicker: 'rxOS 7 MONAD',
    title: 'A laboratory that boots.',
    caption: 'Escritorio Aero en QEMU. ISO oficial v7.0.0.',
    href: '/rx-os',
  },
  {
    src: '/rxos/monad/01-boot.png',
    kicker: 'MONAD · BOOT',
    title: 'Q6 self-test: PASS.',
    caption: 'NAVI L1 en el kernel. 1-bit 48/48 · hop 120/120.',
    href: '/docs/tutorial-monad',
  },
  {
    src: '/rxos/monad/04-navi-l1.png',
    kicker: 'NAVI 2',
    title: 'Chat. Texto plano. Nada más.',
    caption: 'Tecla v. Sin archivos. Estado S entre turnos.',
    href: '/docs/navi2',
  },
  {
    src: '/rxos/monad/05-navi-l2.png',
    kicker: 'NAVI L2 HDC',
    title: '66 KiB that do not grow.',
    caption: 'Memoria asociativa. No es un LLM.',
    href: '/docs/demostracion',
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
      aria-label="Capturas reales — PRISMA, MONAD, NAVI 2"
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
