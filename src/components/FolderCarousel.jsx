import React, { useEffect, useMemo, useState } from 'react';

const extensions = ['webp', 'jpg', 'jpeg', 'png', 'avif', 'gif', 'svg'];
const slots = ['01', '02', '03', '04'];

function CarouselImage({ setName, slot, active }) {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setExtIndex(0);
    setFailed(false);
    setLoaded(false);
  }, [setName, slot]);

  const src = `/carousel/${setName}/${slot}.${extensions[extIndex]}`;

  if (failed) return null;

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={active && loaded ? 'is-active' : ''}
      loading={active ? 'eager' : 'lazy'}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(false);
        if (extIndex < extensions.length - 1) {
          setExtIndex((current) => current + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

export default function FolderCarousel({ setName = 'home', label = 'Rogex visual carousel' }) {
  const safeSetName = useMemo(() => setName || 'home', [setName]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slots.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="folder-carousel" aria-label={label}>
      <div className="folder-carousel-placeholder">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1.4" opacity="0.4" />
          <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="1.4" opacity="0.3" />
          <path
            d="M14 104h34l10-34 16 64 14-46 10 26 12-16h76"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {slots.map((slot, index) => (
        <CarouselImage
          key={`${safeSetName}-${slot}`}
          setName={safeSetName}
          slot={slot}
          active={index === active}
        />
      ))}

      <div className="folder-carousel-grain" aria-hidden="true" />
    </div>
  );
}
