import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  Download,
  Package,
  Terminal,
  Trash2,
  Upload,
} from 'lucide-react';

const CHANNEL = 'https://www.rogexlaboratories.com/rx-os/packages';

function pkgUrl(pkg) {
  const file = pkg.file || `${pkg.name}.rxc`;
  return pkg.url || `/rx-os/packages/${file}`;
}

function normalizeStaticIndex(idx) {
  const packages = (idx.packages || []).map((p) => ({
    ...p,
    source: p.source || 'published',
    url: `/rx-os/packages/${p.file || `${p.name}.rxc`}`,
    published: true,
  }));
  return {
    ok: true,
    channel: idx.channel || CHANNEL,
    packages,
    note: idx.note,
    updated: idx.updated,
    counts: {
      total: packages.length,
      static: packages.length,
      dynamic: 0,
    },
  };
}

export default function PackagesPage({ navigate, PageHero, SectionTitle, StatusBadge }) {
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [secret, setSecret] = useState(() => sessionStorage.getItem('rxos_pkg_secret') || '');
  const [adminOpen, setAdminOpen] = useState(false);
  const [upName, setUpName] = useState('');
  const [upVersion, setUpVersion] = useState('1.0.0');
  const [upDesc, setUpDesc] = useState('');
  const [upBody, setUpBody] = useState('');
  const [adminMsg, setAdminMsg] = useState('');
  const [adminBusy, setAdminBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Always load published static INDEX first (source of truth for the channel tree).
      const idxRes = await fetch('/rx-os/packages/INDEX.json', {
        headers: { Accept: 'application/json' },
        cache: 'no-cache',
      });
      if (!idxRes.ok) throw new Error(`INDEX.json HTTP ${idxRes.status}`);
      const idx = await idxRes.json();
      let merged = normalizeStaticIndex(idx);

      // Merge dynamic admin packages when API is available (Vercel + Redis).
      try {
        const apiRes = await fetch('/api/rxos/packages', { headers: { Accept: 'application/json' } });
        if (apiRes.ok) {
          const api = await apiRes.json();
          if (api.ok && Array.isArray(api.packages)) {
            const byName = new Map();
            for (const p of merged.packages) byName.set(p.name, p);
            for (const p of api.packages) {
              const file = p.file || `${p.name}.rxc`;
              byName.set(p.name, {
                ...p,
                file,
                url: p.url || `/rx-os/packages/${file}`,
                published: true,
                source: p.source || 'dynamic',
              });
            }
            const packages = Array.from(byName.values()).sort((a, b) =>
              a.name.localeCompare(b.name),
            );
            merged = {
              ...merged,
              ...api,
              packages,
              counts: {
                total: packages.length,
                static: packages.filter((p) => p.source !== 'dynamic').length,
                dynamic: packages.filter((p) => p.source === 'dynamic').length,
              },
            };
          }
        }
      } catch {
        // API optional in local vite; INDEX alone is enough.
      }

      setCatalog(merged);
    } catch (err) {
      setError(err.message || 'No se pudo cargar el catálogo');
      setCatalog(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (secret) sessionStorage.setItem('rxos_pkg_secret', secret);
  }, [secret]);

  const onFile = async (file) => {
    if (!file) return;
    const text = await file.text();
    setUpBody(text);
    if (!upName) setUpName(file.name.replace(/\.rxc$/i, ''));
    if (!upDesc) setUpDesc(`${file.name.replace(/\.rxc$/i, '')} package`);
  };

  const upload = async (event) => {
    event.preventDefault();
    setAdminBusy(true);
    setAdminMsg('');
    try {
      const res = await fetch('/api/rxos/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Secret': secret,
        },
        body: JSON.stringify({
          secret,
          name: upName,
          version: upVersion,
          desc: upDesc,
          body: upBody,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAdminMsg(data.message || data.error || 'Upload failed');
      } else {
        setAdminMsg(`Subido: ${data.package.name}-${data.package.version}`);
        setUpBody('');
        setUpName('');
        await load();
      }
    } catch (err) {
      setAdminMsg(err.message);
    } finally {
      setAdminBusy(false);
    }
  };

  const remove = async (name, source) => {
    if (source !== 'dynamic') {
      setAdminMsg(
        `«${name}» está publicado en git (estático). Bórralo con: node tools/sync-rxos-packages.mjs del ${name} && deploy.`,
      );
      return;
    }
    if (!window.confirm(`¿Borrar paquete dinámico ${name}?`)) return;
    setAdminBusy(true);
    setAdminMsg('');
    try {
      const res = await fetch(`/api/rxos/packages?name=${encodeURIComponent(name)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Secret': secret,
        },
        body: JSON.stringify({ secret, name }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAdminMsg(data.message || data.error || 'Delete failed');
      } else {
        setAdminMsg(`Borrado: ${name}`);
        await load();
      }
    } catch (err) {
      setAdminMsg(err.message);
    } finally {
      setAdminBusy(false);
    }
  };

  const packages = catalog?.packages || [];
  const exampleName = packages[0]?.name || 'hellopkg';

  return (
    <>
      <PageHero
        index="04b"
        eyebrow="RXos PACKAGE CHANNEL"
        title={
          <>
            PAQUETES PUBLICADOS
            <br />
            PARA RXos.
          </>
        }
        text="Lista viva de paquetes .rxc del canal oficial. Descárgalos aquí o instálalos desde el shell de RXos con rx app add."
        image="/rxos/desktop-home.jpg"
      >
        <div className="hero-tags">
          <span>{packages.length || '…'} PACKAGES</span>
          <span>.RXC</span>
          <span>rx app add</span>
          <span>PUBLIC</span>
        </div>
        <div className="hero-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>
          <a className="brutal-button primary" href="#catalog">
            VER CATÁLOGO <Package size={15} />
          </a>
          <a className="brutal-button" href="#tutorial">
            TUTORIAL EN RXos <Terminal size={15} />
          </a>
        </div>
      </PageHero>

      <main>
        <section className="section wrap" id="catalog">
          <SectionTitle
            code="01 / PUBLISHED"
            title="PAQUETES PUBLICADOS Y ACCESIBLES"
            text="Cada entrada es un .rxc descargable en este directorio. El INDEX.json es el catálogo del canal."
          />

          <div className="pkg-channel-bar" data-reveal>
            <div>
              <span className="panel-label">CHANNEL</span>
              <code className="pkg-channel-url">{CHANNEL}</code>
              {catalog?.updated && (
                <p className="pkg-channel-meta">
                  Actualizado: <strong>{catalog.updated}</strong>
                  {catalog.counts && (
                    <>
                      {' '}
                      · {catalog.counts.total} paquete{catalog.counts.total === 1 ? '' : 's'}
                    </>
                  )}
                </p>
              )}
            </div>
            <div className="pkg-channel-actions">
              <a className="brutal-button" href="/rx-os/packages/INDEX.json" target="_blank" rel="noreferrer">
                INDEX.json <ArrowUpRight size={15} />
              </a>
              <button type="button" className="brutal-button" onClick={() => navigate('/rx-os')}>
                RXos PAGE
              </button>
              <button type="button" className="brutal-button primary" onClick={load}>
                REFRESH
              </button>
            </div>
          </div>

          {loading && <p className="license-note">Cargando paquetes publicados…</p>}
          {error && (
            <p className="download-boundary">
              <AlertTriangle size={17} /> {error}
            </p>
          )}

          {!loading && packages.length > 0 && (
            <div className="pkg-table-wrap" data-reveal>
              <table className="pkg-table">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>VERSION</th>
                    <th>DESCRIPTION</th>
                    <th>FILE</th>
                    <th>SHA3</th>
                    <th>STATUS</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg) => {
                    const file = pkg.file || `${pkg.name}.rxc`;
                    const href = pkgUrl(pkg);
                    return (
                      <tr key={pkg.name}>
                        <td>
                          <strong className="pkg-name">{pkg.name}</strong>
                        </td>
                        <td>
                          <code>v{pkg.version || '1.0.0'}</code>
                        </td>
                        <td className="pkg-desc-cell">{pkg.desc || '—'}</td>
                        <td>
                          <a href={href} target="_blank" rel="noreferrer">
                            <code>{file}</code>
                          </a>
                        </td>
                        <td>
                          <code className="pkg-sha">{pkg.sha3_8 ? `${pkg.sha3_8}…` : '—'}</code>
                        </td>
                        <td>
                          <StatusBadge tone="ok">LIVE</StatusBadge>
                        </td>
                        <td className="pkg-actions-cell">
                          <a className="brutal-button primary pkg-dl-btn" href={href} download={file}>
                            <Download size={13} /> .rxc
                          </a>
                          {adminOpen && (
                            <button
                              type="button"
                              className="brutal-button danger pkg-dl-btn"
                              onClick={() => remove(pkg.name, pkg.source)}
                              disabled={adminBusy}
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Cards for mobile / visual backup */}
          <div className="pkg-grid pkg-grid-cards">
            {packages.map((pkg, i) => {
              const href = pkgUrl(pkg);
              const file = pkg.file || `${pkg.name}.rxc`;
              return (
                <article className="pkg-card" key={`card-${pkg.name}`} data-reveal style={{ '--delay': `${i * 40}ms` }}>
                  <div className="pkg-card-top">
                    <Package size={18} />
                    <StatusBadge tone="ok">LIVE</StatusBadge>
                  </div>
                  <h3>
                    {pkg.name}
                    <span>v{pkg.version || '1.0.0'}</span>
                  </h3>
                  <p>{pkg.desc}</p>
                  <dl className="pkg-facts">
                    <div>
                      <dt>FILE</dt>
                      <dd>
                        <code>{file}</code>
                      </dd>
                    </div>
                    <div>
                      <dt>CMD</dt>
                      <dd>
                        <code>{pkg.cmd || pkg.name}</code>
                      </dd>
                    </div>
                    {pkg.size != null && (
                      <div>
                        <dt>SIZE</dt>
                        <dd>{pkg.size} B</dd>
                      </div>
                    )}
                    {pkg.sha3_8 && (
                      <div>
                        <dt>SHA3</dt>
                        <dd>
                          <code>{pkg.sha3_8}…</code>
                        </dd>
                      </div>
                    )}
                  </dl>
                  <div className="pkg-card-actions">
                    <a className="brutal-button primary" href={href} download={file}>
                      <Download size={14} /> DESCARGAR .rxc
                    </a>
                  </div>
                  <p className="pkg-install-hint">
                    En RXos: <code>rx app add {pkg.name}</code>
                  </p>
                </article>
              );
            })}
          </div>

          {!loading && packages.length === 0 && !error && (
            <p className="license-note">Aún no hay paquetes publicados en el canal.</p>
          )}
        </section>

        <section className="section section-black" id="tutorial">
          <div className="wrap">
            <SectionTitle
              code="02 / TUTORIAL"
              title="CÓMO DESCARGAR PAQUETES EN RXos"
              text="Dos caminos: desde el shell del SO (recomendado) o bajando el .rxc en el host y copiándolo al vault."
            />

            <div className="pkg-tutorial-grid">
              <article className="pkg-tutorial-card" data-reveal>
                <span className="panel-label">A · DENTRO DE RXos (rx app)</span>
                <h3>Package manager Portage-style</h3>
                <ol className="pkg-steps">
                  <li>
                    <strong>Arranca RXos</strong>
                    <span>QEMU o metal. Abre Terminal (o el shell).</span>
                  </li>
                  <li>
                    <strong>Mira el canal</strong>
                    <span>
                      <code>rx app channel</code> — debe apuntar a este host.
                    </span>
                  </li>
                  <li>
                    <strong>Lista / busca</strong>
                    <span>
                      <code>rx app search</code> o <code>rx app search {exampleName}</code>
                    </span>
                  </li>
                  <li>
                    <strong>Instala</strong>
                    <span>
                      <code>rx app add {exampleName}</code> — deja el .rxc en <code>/bin</code> y metadatos en{' '}
                      <code>/var/db/pkg</code>.
                    </span>
                  </li>
                  <li>
                    <strong>Comprueba</strong>
                    <span>
                      <code>rx app list</code> · <code>rx app info {exampleName}</code>
                    </span>
                  </li>
                  <li>
                    <strong>Quita si hace falta</strong>
                    <span>
                      <code>rx app del {exampleName}</code>
                    </span>
                  </li>
                </ol>
                <pre className="pkg-tutorial-pre">
                  <code>{`rx app channel
rx app search
rx app add ${exampleName}
rx app list
rx app info ${exampleName}
# opcional:
rx app del ${exampleName}`}</code>
                </pre>
                <p className="pkg-honest-note">
                  <AlertTriangle size={15} /> Hoy el kernel usa un <strong>mirror local verificado</strong> del
                  mismo árbol (TCP/HTTPS del SO aún no está). Los nombres del canal web y del mirror coinciden;
                  cuando haya HTTPS, <code>rx app add</code> tirará de esta URL en vivo.
                </p>
              </article>

              <article className="pkg-tutorial-card" data-reveal>
                <span className="panel-label">B · DESDE ESTA WEB (host)</span>
                <h3>Descarga manual del .rxc</h3>
                <ol className="pkg-steps">
                  <li>
                    <strong>Elige un paquete</strong>
                    <span>En la tabla de arriba, pulsa <em>DESCARGAR .rxc</em>.</span>
                  </li>
                  <li>
                    <strong>URL directa</strong>
                    <span>
                      Ejemplo:{' '}
                      <code>
                        {CHANNEL}/{exampleName}.rxc
                      </code>
                    </span>
                  </li>
                  <li>
                    <strong>Índice completo</strong>
                    <span>
                      <a href="/rx-os/packages/INDEX.json" target="_blank" rel="noreferrer">
                        INDEX.json
                      </a>{' '}
                      — name, version, desc, sha3, file.
                    </span>
                  </li>
                  <li>
                    <strong>Llevarlo al vault de RXos</strong>
                    <span>
                      Con disco persistente: copia el archivo al FS del guest, o recompila el mirror embebido
                      del SO. En el shell también puedes crear apps con el editor y <code>run</code> /{' '}
                      <code>go rgx://…</code>.
                    </span>
                  </li>
                </ol>
                <pre className="pkg-tutorial-pre">
                  <code>{`# En el host (Linux / macOS):
curl -O ${CHANNEL}/INDEX.json
curl -O ${CHANNEL}/${exampleName}.rxc

# Dentro de RXos (cuando el .rxc ya está en el vault):
ls
rx app add ${exampleName}
# o, si es una app Roxenite local:
go rgx://${exampleName}`}</code>
                </pre>
                <ul className="pkg-tutorial-bullets">
                  <li>
                    <CheckCircle size={15} /> Formato: texto <strong>.rxc</strong> (Roxenite).
                  </li>
                  <li>
                    <CheckCircle size={15} /> Cada paquete tiene URL estable bajo <code>/rx-os/packages/</code>.
                  </li>
                  <li>
                    <CheckCircle size={15} /> SHA3 del payload en el INDEX (integridad; sin firma de publisher aún).
                  </li>
                </ul>
              </article>
            </div>

            <div className="pkg-cmd-cheatsheet" data-reveal>
              <span className="panel-label">CHEATSHEET</span>
              <div className="pkg-cmd-row">
                <code>rx app search [q]</code>
                <span>buscar en el índice del canal</span>
              </div>
              <div className="pkg-cmd-row">
                <code>rx app add &lt;name&gt;</code>
                <span>descargar + instalar en /bin</span>
              </div>
              <div className="pkg-cmd-row">
                <code>rx app list</code>
                <span>paquetes instalados (/var/db/pkg)</span>
              </div>
              <div className="pkg-cmd-row">
                <code>rx app info &lt;name&gt;</code>
                <span>metadatos + sha3 + estado</span>
              </div>
              <div className="pkg-cmd-row">
                <code>rx app del &lt;name&gt;</code>
                <span>desinstalar</span>
              </div>
              <div className="pkg-cmd-row">
                <code>rx app channel</code>
                <span>URL y estado del canal verificado</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section wrap" id="admin">
          <SectionTitle
            code="03 / ADMIN"
            title="SUBIR O BORRAR (ADMIN)"
            text="Panel protegido. Usa el mismo secreto que el newspaper si no definiste RXOS_PACKAGES_ADMIN_SECRET."
          />
          <div className="pkg-admin" data-reveal>
            <button type="button" className="brutal-button primary" onClick={() => setAdminOpen((v) => !v)}>
              {adminOpen ? 'CERRAR ADMIN' : 'ABRIR ADMIN'}
            </button>

            {adminOpen && (
              <form className="pkg-admin-form" onSubmit={upload}>
                <label>
                  <span>ADMIN SECRET</span>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder="NEWSPAPER_ADMIN_SECRET o RXOS_PACKAGES_ADMIN_SECRET"
                    required
                  />
                </label>
                <div className="pkg-admin-row">
                  <label>
                    <span>NAME</span>
                    <input value={upName} onChange={(e) => setUpName(e.target.value)} placeholder="hellopkg" required />
                  </label>
                  <label>
                    <span>VERSION</span>
                    <input value={upVersion} onChange={(e) => setUpVersion(e.target.value)} placeholder="1.0.0" />
                  </label>
                </div>
                <label>
                  <span>DESCRIPTION</span>
                  <input value={upDesc} onChange={(e) => setUpDesc(e.target.value)} placeholder="short description" />
                </label>
                <label>
                  <span>FILE .rxc</span>
                  <input type="file" accept=".rxc,text/plain" onChange={(e) => onFile(e.target.files?.[0])} />
                </label>
                <label>
                  <span>SOURCE</span>
                  <textarea
                    rows={10}
                    value={upBody}
                    onChange={(e) => setUpBody(e.target.value)}
                    placeholder={'app "name"\npage home:\n  title "name"\n  text "…"'}
                    required
                  />
                </label>
                <div className="pkg-admin-actions">
                  <button type="submit" className="brutal-button primary" disabled={adminBusy}>
                    <Upload size={15} /> {adminBusy ? '…' : 'UPLOAD'}
                  </button>
                  <button type="button" className="brutal-button" onClick={load} disabled={adminBusy}>
                    RELOAD CATALOG
                  </button>
                </div>
                {adminMsg && (
                  <p
                    className={
                      adminMsg.startsWith('Subido') || adminMsg.startsWith('Borrado')
                        ? 'pkg-admin-ok'
                        : 'pkg-admin-err'
                    }
                  >
                    {adminMsg}
                  </p>
                )}
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
