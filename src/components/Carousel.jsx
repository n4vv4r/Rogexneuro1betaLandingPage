import { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';

const INTERVAL = 5000;

export function Carousel() {
  const { t } = useI18n();
  const slides = t('carousel.slides');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback(
    (next) => {
      setIndex((prev) => (next + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="carousel-track">
        {slides.map((slide, i) => (
          <figure key={slide.img} className={`carousel-slide${i === index ? ' is-active' : ''}`} aria-hidden={i !== index}>
            <img src={slide.img} alt={slide.caption} loading={i === 0 ? 'eager' : 'lazy'} draggable="false" />
            <figcaption className="carousel-caption">{slide.caption}</figcaption>
          </figure>
        ))}
        <button type="button" className="carousel-arrow carousel-arrow--prev" onClick={() => go(index - 1)} aria-label={t('carousel.prev')}>
          ‹
        </button>
        <button type="button" className="carousel-arrow carousel-arrow--next" onClick={() => go(index + 1)} aria-label={t('carousel.next')}>
          ›
        </button>
      </div>
      <div className="carousel-dots" role="tablist" aria-label={t('carousel.goTo')}>
        {slides.map((slide, i) => (
          <button
            key={slide.img}
            type="button"
            className={`carousel-dot${i === index ? ' is-active' : ''}`}
            onClick={() => go(i)}
            aria-label={`${t('carousel.goTo')} ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
