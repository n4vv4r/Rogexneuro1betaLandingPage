import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  Download,
  Package,
  Terminal,
} from 'lucide-react';

const CHANNEL = 'https://www.rogexlaboratories.com/rx-os/packages';

function pkgUrl(pkg) {
  const file = pkg.file || `${pkg.name}.rxc`;
  return pkg.url || `/rx-os/packages/${file}`;
}

export default function PackagesPage({ navigate, PageHero, SectionTitle }) {
  const [packages, setPackages] = useState([]);
  const [updated, setUpdated] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/rx-os/packages/INDEX.json', {
        headers: { Accept: 'application/json' },
        cache: 'no-cache',
      });
      if (!res.ok) throw new Error(`INDEX.json HTTP ${res.status}`);
      const idx = await res.json();
      const list = (idx.packages || []).map((p) => ({
        ...p,
        file: p.file || `${p.name}.rxc`,
        url: `/rx-os/packages/${p.file || `${p.name}.rxc`}`,
      }));
      setPackages(list);
      setUpdated(idx.updated || '');
    } catch (err) {
      setError(err.message || 'No se pudo cargar el catálogo');
      setPackages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const exampleName = packages[0]?.name || 'hellopkg';

  return (
    <>
      <PageHero
        index="04b"
        eyebrow="RXos PACKAGE CHANNEL"
        title={
          <>
            PAQUETES
            <br />
            PUBLICADOS.
          </>
        }
        text="Lista del canal oficial .rxc. Clic para descargar. En el SO: rx app add &lt;name&gt;."
        image="/rxos/desktop-home.jpg"
      >
        <div className="hero-tags">
          <span>{loading ? '…' : `${packages.length} PACKAGES`}</span>
          <span>.RXC</span>
          <span>rx app add</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap pkg-minimal" id="catalog">
          <SectionTitle
            code="01 / PACKAGES"
            title="PUBLICADOS"
            text={
              updated
                ? `Canal ${CHANNEL} · actualizado ${updated}`
                : `Canal ${CHANNEL}`
            }
          />

          {loading && <p className="license-note">Cargando…</p>}
          {error && (
            <p className="download-boundary">
              <AlertTriangle size={17} /> {error}
            </p>
          )}

          {!loading && packages.length > 0 && (
            <ul className="pkg-list">
              {packages.map((pkg) => {
                const href = pkgUrl(pkg);
                const file = pkg.file || `${pkg.name}.rxc`;
                return (
                  <li key={pkg.name}>
                    <a className="pkg-list-item" href={href} download={file}>
                      <span className="pkg-list-icon" aria-hidden="true">
                        <Package size={20} strokeWidth={1.8} />
                      </span>
                      <span className="pkg-list-body">
                        <strong>
                          {pkg.name}
                          <em>v{pkg.version || '1.0.0'}</em>
                        </strong>
                        <span>{pkg.desc || file}</span>
                      </span>
                      <span className="pkg-list-meta">
                        <code>{file}</code>
                        {pkg.size != null && <small>{pkg.size} B</small>}
                      </span>
                      <span className="pkg-list-dl">
                        <Download size={16} />
                        DESCARGAR
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          {!loading && packages.length === 0 && !error && (
            <p className="license-note">No hay paquetes publicados.</p>
          )}

          <div className="pkg-minimal-actions" data-reveal>
            <a className="brutal-button" href="/rx-os/packages/INDEX.json" target="_blank" rel="noreferrer">
              INDEX.json <ArrowUpRight size={15} />
            </a>
            <button type="button" className="brutal-button" onClick={() => navigate('/rx-os')}>
              RXos
            </button>
            <button type="button" className="brutal-button primary" onClick={load}>
              ACTUALIZAR
            </button>
          </div>
        </section>

        <section className="section section-black" id="tutorial">
          <div className="wrap">
            <SectionTitle
              code="02 / TUTORIAL"
              title="CÓMO INSTALAR EN RXos"
              text="Dentro del SO (recomendado) o descarga manual del .rxc desde esta página."
            />

            <div className="pkg-tutorial-simple" data-reveal>
              <article>
                <span className="panel-label">
                  <Terminal size={14} /> EN EL SO
                </span>
                <ol>
                  <li>Arranca RXos y abre Terminal.</li>
                  <li>
                    <code>rx app search</code> — ver índice.
                  </li>
                  <li>
                    <code>rx app add {exampleName}</code> — instalar.
                  </li>
                  <li>
                    <code>rx app list</code> · <code>rx app info {exampleName}</code>
                  </li>
                  <li>
                    Opcional: <code>www on</code> para intentar canal en vivo.
                  </li>
                </ol>
                <pre>
                  <code>{`rx app search
rx app add ${exampleName}
rx app list
go rgx://${exampleName}`}</code>
                </pre>
              </article>

              <article>
                <span className="panel-label">
                  <Download size={14} /> DESDE LA WEB
                </span>
                <ol>
                  <li>Clic en un paquete de la lista → descarga el .rxc.</li>
                  <li>
                    URL directa:{' '}
                    <code>
                      {CHANNEL}/{exampleName}.rxc
                    </code>
                  </li>
                  <li>
                    Índice:{' '}
                    <a href="/rx-os/packages/INDEX.json" target="_blank" rel="noreferrer">
                      INDEX.json
                    </a>
                  </li>
                  <li>Copia el archivo al vault del guest o usa el mirror embebido del SO.</li>
                </ol>
                <ul className="pkg-tutorial-notes">
                  <li>
                    <CheckCircle size={15} /> Formato <strong>.rxc</strong> (Roxenite).
                  </li>
                  <li>
                    <CheckCircle size={15} /> Sin admin en esta página — solo catálogo público.
                  </li>
                  <li>
                    <CheckCircle size={15} /> HTTPS live en el kernel: opt-in <code>www on</code>; TLS staged.
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
