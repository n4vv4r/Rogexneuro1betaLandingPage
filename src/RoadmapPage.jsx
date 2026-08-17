import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Moon,
  Sun,
} from 'lucide-react';
import {
  BRAND_ROWS,
  ERAS,
  HERE_FACTS,
  HERE_IDS,
  PHASES,
  ROADMAP_CUTOFF,
  eraById,
  statusLabel,
} from './data/eclipse-roadmap.js';
import { POST_FILTERS, SOCIAL_POSTS } from './data/social-posts.js';

const HERE_INDEX = ERAS.findIndex((e) => e.id === 'smoke-9');
const PROGRESS = Math.round(((HERE_INDEX + 0.5) / (ERAS.length - 1)) * 100);

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'fixed';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(el);
  }
  return Promise.resolve();
}

export default function RoadmapPage({ navigate, PageHero, SectionTitle }) {
  const [selected, setSelected] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    if (hash && ERAS.some((e) => e.id === hash)) return hash;
    return 'smoke-9';
  });
  const [voice, setVoice] = useState('human');
  const [postFilter, setPostFilter] = useState('all');
  const [copied, setCopied] = useState('');
  const trackRef = useRef(null);
  const era = eraById(selected);

  useEffect(() => {
    const node = document.getElementById(`era-${selected}`);
    const track = trackRef.current;
    if (!node || !track) return;
    const left = node.offsetLeft - (track.clientWidth - node.offsetWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [selected]);

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
      const target = ev.target;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      ev.preventDefault();
      const i = ERAS.findIndex((e) => e.id === selected);
      const next = ev.key === 'ArrowRight'
        ? ERAS[Math.min(ERAS.length - 1, i + 1)]
        : ERAS[Math.max(0, i - 1)];
      selectEra(next.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const selectEra = (id) => {
    setSelected(id);
    const url = `${window.location.pathname}#${id}`;
    window.history.replaceState({}, '', url);
  };

  const posts = useMemo(() => {
    if (postFilter === 'all') return SOCIAL_POSTS;
    return SOCIAL_POSTS.filter((p) => p.net === postFilter || p.audience === postFilter);
  }, [postFilter]);

  const onCopy = async (id, text) => {
    await copyText(text);
    setCopied(id);
    window.setTimeout(() => setCopied((c) => (c === id ? '' : c)), 1800);
  };

  const step = (dir) => {
    const i = ERAS.findIndex((e) => e.id === selected);
    const next = ERAS[Math.max(0, Math.min(ERAS.length - 1, i + dir))];
    selectEra(next.id);
  };

  return (
    <>
      <PageHero
        index="EE"
        eyebrow="ROADMAP · ETERNAL ECLIPSE"
        title={<>DOS ÓRBITAS.<br />UN CRUCE.<br />LUEGO, UN NOMBRE.</>}
        text="NAVI y rxOS crecen en parejas hasta el 10. Ese cruce es el Eclipse: el laboratorio se vuelve logia, y más tarde un solo sistema llamado EchOS. Hoy no estamos ahí. El pin está en el mapa."
        image="/rxos/9/14-mac-desktop-photos.jpg"
        className="rxos-hero"
      >
        <div className="hero-tags">
          <span>AQUÍ: 8.5/6.5 + 9/7-WORLD</span>
          <span>7-NPU = PLAN</span>
          <span>10/10 = VISIÓN</span>
          <span>EchOS = VISIÓN</span>
        </div>
        <div className="hero-actions">
          <a className="brutal-button primary" href="#timeline">LÍNEA DE TIEMPO</a>
          <a className="brutal-button" href="#here">DÓNDE ESTAMOS</a>
          <a className="brutal-button" href="#posts">KIT DE POSTS</a>
          <button type="button" className="brutal-button" onClick={() => navigate('/docs/eternal-eclipse')}>
            PAPEL COMPLETO
          </button>
        </div>
      </PageHero>

      <main className="eclipse-page">
        <section className="section wrap" id="here">
          <SectionTitle
            code="00 / AQUÍ ESTAMOS"
            title="DOS VERDADES A LA VEZ"
            text={`Corte ${ROADMAP_CUTOFF}. La última línea medida en metal no es la misma que la ISO que se descarga hoy. Las dos son reales. Ninguna es el Eclipse.`}
          />
          <div className="here-banner">
            <div className="here-banner-pin">
              <Moon size={22} strokeWidth={1.6} />
              <span>AQUÍ ESTAMOS</span>
            </div>
            <p>
              <strong>8.5 + NAVI 6.5 RLC</strong> es lo último que midió julios en un portátil
              (HP 15-ac195nl). <strong>9 SMOKE + NAVI 7-WORLD</strong> es la ISO negra que puedes
              arrancar ahora. El NPU no está. NAVI 8, 9 y 10 no tienen código. Eternal Eclipse
              y EchOS son el destino, no el dominio de hoy.
            </p>
          </div>
          <div className="hit-numbers" data-reveal>
            {HERE_FACTS.map((item) => (
              <div key={item.l}>
                <strong>{item.n}</strong>
                <span>{item.l}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section section-black" id="timeline">
          <div className="wrap">
            <SectionTitle
              code="01 / LÍNEA"
              title="DE LABORATORIO A ECO"
              text="Pulsa un nodo. Flechas del teclado. Cada casilla dice HECHO, EN CURSO, PLAN o VISIÓN — no se mezclan."
            />

            <div className="eclipse-progress">
              <div className="eclipse-progress-meta">
                <span>RECORRIDO PÚBLICO</span>
                <strong>{PROGRESS}% del mapa está detrás del pin</strong>
              </div>
              <div
                className="eclipse-progress-bar"
                role="meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={PROGRESS}
                aria-label="Progreso hasta EchOS"
              >
                <i style={{ width: `${PROGRESS}%` }} />
                <b style={{ left: `${PROGRESS}%` }} aria-hidden />
              </div>
              <div className="eclipse-progress-ends">
                <span>4.x foundation</span>
                <span>EchOS</span>
              </div>
            </div>

            <div className="eclipse-phases">
              {PHASES.map((p) => (
                <article key={p.id} className={`eclipse-phase is-${p.id}`}>
                  <span>FASE {p.roman}</span>
                  <h3>{p.name}</h3>
                  <code>{p.domain}</code>
                  <p>{p.role}</p>
                </article>
              ))}
            </div>

            <div className="eclipse-track-wrap">
              <button type="button" className="eclipse-nudge" onClick={() => step(-1)} aria-label="Era anterior">
                <ChevronLeft size={18} />
              </button>
              <ol className="eclipse-track" ref={trackRef}>
                {ERAS.map((item, index) => {
                  const active = item.id === selected;
                  const isHere = HERE_IDS.includes(item.id);
                  return (
                    <li key={item.id} id={`era-${item.id}`}>
                      <button
                        type="button"
                        className={[
                          'eclipse-node',
                          `is-${item.status}`,
                          active ? 'is-active' : '',
                          isHere ? 'is-here' : '',
                        ].join(' ')}
                        onClick={() => selectEra(item.id)}
                        aria-current={active ? 'step' : undefined}
                      >
                        <em>{String(index + 1).padStart(2, '0')}</em>
                        {isHere && <span className="eclipse-here-flag">AQUÍ</span>}
                        <strong>NAVI {item.navi}</strong>
                        <b>rxOS {item.rxos}</b>
                        <span className="eclipse-node-title">{item.title}</span>
                        <span className={`eclipse-st eclipse-st-${item.status}`}>{statusLabel(item.status)}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <button type="button" className="eclipse-nudge" onClick={() => step(1)} aria-label="Era siguiente">
                <ChevronRight size={18} />
              </button>
            </div>

            <article className={`eclipse-detail is-${era.status}`}>
              <header>
                <div>
                  <span className="panel-label">
                    {PHASES.find((p) => p.id === era.phase)?.name || '—'} · {era.when}
                  </span>
                  <h3>{era.title}</h3>
                  <p className="eclipse-pair">
                    NAVI <em>{era.navi}</em>
                    <span aria-hidden>×</span>
                    rxOS <em>{era.rxos}</em>
                  </p>
                </div>
                <span className={`eclipse-st eclipse-st-${era.status}`}>{statusLabel(era.status)}</span>
              </header>

              <div className="eclipse-voice">
                <button
                  type="button"
                  className={voice === 'human' ? 'is-on' : ''}
                  onClick={() => setVoice('human')}
                >
                  EN CRISTIANO
                </button>
                <button
                  type="button"
                  className={voice === 'tech' ? 'is-on' : ''}
                  onClick={() => setVoice('tech')}
                >
                  SPECS
                </button>
              </div>

              <p className="eclipse-lede">{voice === 'human' ? era.human : era.tech}</p>

              <dl>
                <div>
                  <dt>SE DEMUESTRA</dt>
                  <dd>{era.proof}</dd>
                </div>
                <div>
                  <dt>NO ES</dt>
                  <dd>{era.not}</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        <section className="section wrap" id="brand">
          <SectionTitle
            code="02 / MARCA"
            title="DEL LABORATORIO A LA LOGIA"
            text="Eternal Eclipse no borra Knights Computer Club. El club es la plaza. La logia es el taller que solo se nombra cuando las dos v10 existen."
          />
          <div className="eclipse-brand-table" data-reveal>
            <div className="eclipse-brand-head">
              <span>ENFOQUE</span>
              <span>AHORA / BASE</span>
              <span>DESTINO / ÉLITE</span>
            </div>
            {BRAND_ROWS.map(([k, a, b]) => (
              <div className="eclipse-brand-row" key={k}>
                <strong>{k}</strong>
                <span>{a}</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          <div className="eclipse-echoes" data-reveal>
            <article>
              <Sun size={22} strokeWidth={1.5} />
              <h3>Echo</h3>
              <p>
                El día que el sistema y la mente sean indivisibles, dejas de abrir un
                asistente. Hablas con <strong>Echo</strong> — la voz que habita el SO.
                Hoy esa voz se llama NAVI y vive en la tecla <code>v</code>.
              </p>
            </article>
            <article>
              <Moon size={22} strokeWidth={1.5} />
              <h3>EchOS / Echoes</h3>
              <p>
                <strong>EchOS</strong> sería una sola ISO: rxOS 10 + NAVI 10 + API a
                Internet. Los <strong>Echoes</strong> serían las instancias en red.
                No hay artefacto. Se cuenta para no fingir el final.
              </p>
            </article>
          </div>
        </section>

        <section className="section wrap" id="honest">
          <SectionTitle
            code="03 / LÍMITES"
            title="LO QUE NO PROMETEMOS"
            text="El mapa tiene un pin. El pin no se mueve con un rename."
          />
          <div className="rx-state-grid">
            <article data-reveal>
              <div className="state-heading state-ok">SE PUEDE ARRANCAR / MEDIR</div>
              <ul>
                <li>ISO rxOS 9.0.0 SMOKE (VM + metal) y NAVI 7.5 (catálogo + Wikipedia + memoria).</li>
                <li>rxOS 8.5 + NAVI 6.5 RLC medidos en el HP 15-ac195nl (RAPL).</li>
                <li>WSP 16 B, Q₆ 48/48, event fabric bench 6/6, heap del modelo 0.</li>
                <li>PRISMA Engine 0.1.0 en /downloads. Experimental, no clínico.</li>
              </ul>
            </article>
            <article data-reveal>
              <div className="state-heading state-todo">
                <AlertTriangle size={16} /> NO ESTÁ HECHO
              </div>
              <ul>
                <li>7-NPU / Akida. Cero placas. El hook se niega.</li>
                <li>NAVI 8, 9, 10 como código. rxOS 10 como release.</li>
                <li>EternalEclipse.com como marca viva. ISO EchOS. API Echo.</li>
                <li>TLS de cuerpo, Wi-Fi, UEFI nativo, &gt;4 GiB, auditoría externa.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="section section-black" id="posts">
          <div className="wrap">
            <SectionTitle
              code="04 / KIT DE PUBLICACIÓN"
              title="X + LINKEDIN"
              text="Textos listos para pegar. Ingeniería, usuarios y visión. Marketing con la misma honestidad que el pin. Copia. Adjunta la captura que dice el recuadro."
            />
            <div className="eclipse-post-filters" data-reveal>
              {POST_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={postFilter === f.id ? 'is-on' : ''}
                  onClick={() => setPostFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="eclipse-posts">
              {posts.map((post) => {
                const body = post.thread ? post.parts.join('\n\n') : post.text;
                return (
                  <article key={post.id} className="eclipse-post" data-reveal>
                    <header>
                      <span>{post.net === 'x' ? 'X' : 'LINKEDIN'}{post.lang === 'en' ? ' · EN' : ''}</span>
                      <strong>{post.title}</strong>
                    </header>
                    <p className="eclipse-post-shot">Foto: {post.shot}</p>
                    {post.thread ? (
                      <ol className="eclipse-thread">
                        {post.parts.map((part) => (
                          <li key={part.slice(0, 24)}><pre>{part}</pre></li>
                        ))}
                      </ol>
                    ) : (
                      <pre>{post.text}</pre>
                    )}
                    <button
                      type="button"
                      className="brutal-button"
                      onClick={() => onCopy(post.id, body)}
                    >
                      {copied === post.id ? <Check size={14} /> : <Copy size={14} />}
                      {copied === post.id ? 'COPIADO' : 'COPIAR'}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section wrap">
          <SectionTitle
            code="05 / SEGUIR"
            title="EL PIN SE MUEVE CON PRUEBAS"
            text="Cuando una pareja deje de ser PLAN, este recorte cambia de fecha. No antes."
          />
          <div className="hero-actions section-actions">
            <a className="brutal-button primary" href="https://github.com/knightslabs/RXos-Packages/releases/tag/v9.0.0">
              ISO 9.0.0 <ArrowUpRight size={14} />
            </a>
            <button type="button" className="brutal-button" onClick={() => navigate('/rx-os')}>
              rxOS 9
            </button>
            <button type="button" className="brutal-button" onClick={() => navigate('/navi')}>
              NAVI
            </button>
            <button type="button" className="brutal-button" onClick={() => navigate('/docs/cianotipo')}>
              CIANOTIPO
            </button>
            <button type="button" className="brutal-button" onClick={() => navigate('/docs/eternal-eclipse')}>
              PAPEL ETERNAL ECLIPSE
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
