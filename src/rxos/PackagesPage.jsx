import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle,
  Download,
  Package,
  Trash2,
  Upload,
} from 'lucide-react';

const CHANNEL = 'https://www.rogexlaboratories.com/rx-os/packages';

export default function PackagesPage({ navigate, PageHero, SectionTitle, StatusBadge }) {
  const [catalog, setCatalog] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // admin
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
      const res = await fetch('/api/rxos/packages', { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        setCatalog(data);
      } else {
        // Fallback: static INDEX when API is offline (vite dev without vercel)
        const idx = await fetch('/rx-os/packages/INDEX.json').then((r) => r.json());
        setCatalog({
          ok: true,
          channel: idx.channel || CHANNEL,
          packages: (idx.packages || []).map((p) => ({
            ...p,
            source: 'static',
            url: `/rx-os/packages/${p.file || `${p.name}.rxc`}`,
          })),
          storeConfigured: false,
          adminConfigured: false,
          note: idx.note,
          updated: idx.updated,
          counts: { total: (idx.packages || []).length, static: (idx.packages || []).length, dynamic: 0 },
        });
      }
    } catch (err) {
      setError(err.message || 'No se pudo cargar el catálogo');
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
    if (!upName) {
      const base = file.name.replace(/\.rxc$/i, '');
      setUpName(base);
    }
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
    if (source === 'static') {
      setAdminMsg(
        `«${name}» es seed estático (git). Bórralo con: node tools/sync-rxos-packages.mjs del ${name} && deploy.`,
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

  return (
    <>
      <PageHero
        index="04b"
        eyebrow="RXos PACKAGE CHANNEL"
        title={
          <>
            .rxc PACKAGES
            <br />
            FOR THE LAB OS.
          </>
        }
        text="Canal oficial de paquetes RXos. Los .rxc viven en este directorio; dentro del SO: rx app add <name>. HTTPS en el kernel aún en staging — el índice local verificado ya apunta aquí."
        image="/rxos/desktop-home.jpg"
      >
        <div className="hero-tags">
          <span>CHANNEL</span>
          <span>.RXC</span>
          <span>rx app add</span>
          <span>PORTAGE-STYLE</span>
          <span>v5.5</span>
        </div>
      </PageHero>

      <main>
        <section className="section wrap">
          <SectionTitle
            code="01 / CHANNEL"
            title="CATÁLOGO PÚBLICO"
            text="Misma URL que usa el package manager del SO. Descarga directa del .rxc o inspección del INDEX."
          />
          <div className="pkg-channel-bar" data-reveal>
            <div>
              <span className="panel-label">CHANNEL URL</span>
              <code className="pkg-channel-url">{CHANNEL}</code>
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

          {loading && <p className="license-note">Cargando catálogo…</p>}
          {error && (
            <p className="download-boundary">
              <AlertTriangle size={17} /> {error}
            </p>
          )}

          <div className="pkg-grid">
            {packages.map((pkg, i) => (
              <article className="pkg-card" key={pkg.name} data-reveal style={{ '--delay': `${i * 40}ms` }}>
                <div className="pkg-card-top">
                  <Package size={18} />
                  <StatusBadge tone={pkg.source === 'dynamic' ? 'warn' : 'ok'}>
                    {(pkg.source || 'static').toUpperCase()}
                  </StatusBadge>
                </div>
                <h3>
                  {pkg.name}
                  <span>v{pkg.version}</span>
                </h3>
                <p>{pkg.desc}</p>
                <dl className="pkg-facts">
                  <div>
                    <dt>FILE</dt>
                    <dd>
                      <code>{pkg.file || `${pkg.name}.rxc`}</code>
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
                  <a
                    className="brutal-button primary"
                    href={pkg.url || `/rx-os/packages/${pkg.file || `${pkg.name}.rxc`}`}
                    download
                  >
                    <Download size={14} /> DOWNLOAD
                  </a>
                  {adminOpen && (
                    <button
                      type="button"
                      className="brutal-button danger"
                      onClick={() => remove(pkg.name, pkg.source)}
                      disabled={adminBusy}
                    >
                      <Trash2 size={14} /> DEL
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>

          {!loading && packages.length === 0 && (
            <p className="license-note">Aún no hay paquetes en el canal.</p>
          )}
        </section>

        <section className="section section-black">
          <div className="wrap">
            <SectionTitle
              code="02 / INSIDE RXos"
              title="CÓMO INSTALAR"
              text="El package manager es Portage-inspired: /var/db/pkg, /var/cache/distfiles, /bin/*.rxc."
            />
            <div className="pkg-howto" data-reveal>
              <pre>
                <code>{`# En el shell de RXos (cuando HTTPS esté vivo o con mirror local):
rx app search
rx app add hellopkg
rx app list
rx app info hellopkg
rx app del hellopkg
rx app channel

# Canal verificado:
# ${CHANNEL}`}</code>
              </pre>
              <ul>
                <li>
                  <CheckCircle size={16} /> Formato <strong>.rxc</strong> (Roxenite app/command source).
                </li>
                <li>
                  <CheckCircle size={16} /> Índice público <code>INDEX.json</code> + un archivo por paquete.
                </li>
                <li>
                  <CheckCircle size={16} /> Hoy el SO usa un <strong>mirror local verificado</strong> del mismo
                  árbol; el cliente TCP/HTTPS del kernel está en roadmap.
                </li>
                <li>
                  <CheckCircle size={16} /> No hay firmas de publisher aún (SHA3 de payload sí en el índice).
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section wrap" id="admin">
          <SectionTitle
            code="03 / ADMIN"
            title="SUBIR O BORRAR PAQUETES"
            text="Panel admin protegido por secreto. Requiere Redis (Upstash) en Vercel para cambios sin redeploy. Seed estático: tools/sync-rxos-packages.mjs."
          />
          <div className="pkg-admin" data-reveal>
            <button
              type="button"
              className="brutal-button primary"
              onClick={() => setAdminOpen((v) => !v)}
            >
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
                    placeholder="RXOS_PACKAGES_ADMIN_SECRET"
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
                  <input
                    type="file"
                    accept=".rxc,text/plain"
                    onChange={(e) => onFile(e.target.files?.[0])}
                  />
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
                  <p className={adminMsg.startsWith('Subido') || adminMsg.startsWith('Borrado') ? 'pkg-admin-ok' : 'pkg-admin-err'}>
                    {adminMsg}
                  </p>
                )}
                <p className="license-note">
                  Env en Vercel: <code>RXOS_PACKAGES_ADMIN_SECRET</code>,{' '}
                  <code>UPSTASH_REDIS_REST_URL</code>, <code>UPSTASH_REDIS_REST_TOKEN</code>. Seed en git:{' '}
                  <code>node tools/sync-rxos-packages.mjs add file.rxc</code>
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
