import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';

function fmtSize(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KiB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MiB`;
}

export default function Packages() {
  useSeo('/packages');
  const { t } = useI18n();
  const [cat, setCat] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch('/packages/INDEX.json')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(setCat)
      .catch((e) => setErr(e.message || 'INDEX'));
  }, []);

  const h = t('packagesPage.table');
  const pkgs = cat?.packages || [];

  return (
    <>
      <section className="hero hero--page">
        <h1 className="hero-page-title">{t('packagesPage.title')}</h1>
        <p className="tagline">{t('packagesPage.tagline')}</p>
      </section>

      <section className="section container">
        <Reveal>
          <div className="card">
            <span className="badge">{t('packagesPage.badge')}</span>
            <h2 className="section-title" style={{ fontSize: '1.45rem' }}>
              {t('packagesPage.howTitle')}
            </h2>
            <p>{t('packagesPage.howBody')}</p>
            <pre className="code-block" style={{ marginTop: '1rem' }}>
              {t('packagesPage.howCode')}
            </pre>
            <p className="card-cta" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href="/packages/INDEX.json">
                INDEX.json
              </a>
              <Link className="btn" to="/docs/epk">
                {t('packagesPage.docsLink')}
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section container">
        <Reveal>
          <span className="kicker">{t('packagesPage.kicker')}</span>
          <h2 className="section-title">{t('packagesPage.listTitle')}</h2>
          <p className="section-sub">{t('packagesPage.listSub')}</p>
        </Reveal>
        {err && <p className="section-sub">{t('packagesPage.error')} {err}</p>}
        {!cat && !err && <p className="section-sub">…</p>}
        {cat && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">{h.name}</th>
                  <th scope="col">{h.version}</th>
                  <th scope="col">{h.edition}</th>
                  <th scope="col">{h.size}</th>
                  <th scope="col">{h.desc}</th>
                  <th scope="col">{h.file}</th>
                </tr>
              </thead>
              <tbody>
                {pkgs.map((p) => (
                  <tr key={p.file}>
                    <td className="mono">{p.name}</td>
                    <td className="mono">{p.version}</td>
                    <td>{p.edition}</td>
                    <td className="nowrap">{fmtSize(p.size)}</td>
                    <td>{p.desc}</td>
                    <td className="links-cell">
                      <a className="btn btn-primary" href={`/packages/${p.file}`} download>
                        {p.file}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
