import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';
import { UNIVERSAL } from '../data/downloads';

export default function Downloads() {
  useSeo('/downloads');
  const { t } = useI18n();
  const h = t('downloads.tableHeaders');
  const labels = t('downloads.labels');

  return (
    <>
      <section className="hero hero--page">
        <h1 className="hero-page-title">{t('downloads.title')}</h1>
        <p className="tagline">{t('downloads.tagline')}</p>
      </section>

      <section className="section container">
        <Reveal>
          <div className="card schedule-card">
            <span className="badge">{t('downloads.gate.badge')}</span>
            <h2 className="section-title" style={{ fontSize: '1.45rem' }}>
              {t('downloads.gate.title')}
            </h2>
            <p>{t('downloads.gate.body')}</p>
            <p className="card-cta">
              <Link className="btn btn-primary" to="/validation">
                {t('downloads.gate.cta')}
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section container" id="universal">
        <Reveal>
          <span className="kicker">{t('downloads.universal.kicker')}</span>
          <h2 className="section-title">{t('downloads.universal.title')}</h2>
          <p className="section-sub">{t('downloads.universal.sub')}</p>
        </Reveal>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">{h.file}</th>
                <th scope="col">{h.target}</th>
                <th scope="col">{h.format}</th>
                <th scope="col">{h.size}</th>
                <th scope="col">{h.links}</th>
              </tr>
            </thead>
            <tbody>
              {UNIVERSAL.files.map((f) => (
                <tr key={f.name}>
                  <td className="mono">{f.name}</td>
                  <td>{t(`downloads.targets.${f.targetKey}`)}</td>
                  <td>{f.format}</td>
                  <td className="nowrap">{f.size}</td>
                  <td className="links-cell">
                    <span className="badge badge--soon">{labels.held}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Reveal>
          <p className="section-sub" style={{ marginTop: '1.2rem' }}>
            {t('downloads.universal.otherEditions')}{' '}
            <Link to="/docs/editions">{t('downloads.universal.otherLink')}</Link>
          </p>
        </Reveal>
      </section>

      <section className="section container" id="verify">
        <Reveal>
          <span className="kicker">{t('downloads.verifySection.kicker')}</span>
          <h2 className="section-title">{t('downloads.verifySection.title')}</h2>
        </Reveal>
        <Reveal>
          <div className="card verify-card">
            <p>{t('downloads.verifySection.body1')}</p>
            <pre><code>sha256sum -c SHA256SUMS.txt</code></pre>
            <p style={{ marginTop: '0.9rem' }}>{t('downloads.verifySection.body2')}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
