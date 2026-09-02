import { useEffect, useState } from "react";

export default function Carousel({ slides, label }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 5200);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="panel" aria-label={label}>
      {slides.map((src, n) => (
        <img
          key={src}
          src={src}
          alt=""
          className={n === i ? "is-on" : ""}
          draggable="false"
        />
      ))}
      <div className="veil" />
      <button type="button" className="ghost" disabled aria-disabled="true">
        {label}
      </button>
    </section>
  );
}
