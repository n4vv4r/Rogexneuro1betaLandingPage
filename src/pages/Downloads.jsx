import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';
import { EDITIONS, USB_FILE, USB_UNCOMPRESSED_SHA256 } from '../data/downloads';

function DownloadTable({ files, locked, lockedLabel }) {
  const { t } = useI18n();
  const h = t('downloads.tableHeaders');
  const labels = t('downloads.labels');
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">{h.file}</th>
            <th scope="col">{h.target}</th>
            <th scope="col">{h.format}</th>
            <th scope="col">{h.size}</th>
            <th scope="col">{h.sha256}</th>
            <th scope="col">{h.links}</th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr key={f.name}>
              <td className="mono">{f.name}</td>
              <td>{f.targetKey ? t(`downloads.targets.${f.targetKey}`) : t('downloads.targets.usb')}</td>
              <td>{f.format}</td>
              <td className="nowrap">{f.size}</td>
              <td className="sha" title={f.sha256}>
                <code className="sha-code">{f.sha256}</code>
              </td>
              <td className="links-cell">
                {locked ? (
                  <span className="badge badge--soon">{lockedLabel}</span>
                ) : (
                  <>
                    <a href={f.direct} download>
                      {labels.direct}
                    </a>
                    {' · '}
                    <a href={f.github} target="_blank" rel="noopener noreferrer">
                      {labels.github}
                    </a>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Downloads() {
  useSeo('/downloads');
  const { t } = useI18n();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
      }
    }
  }, [location.hash]);

  return (
    <>
      <section className="hero hero--page">
        <h1 className="hero-page-title">{t('downloads.title')}</h1>
        <p className="tagline">{t('downloads.tagline')}</p>
      </section>

      <section className="section container">
        <Reveal>
          <span className="kicker">{t('downloads.bridgesKicker')}</span>
          <h2 className="section-title">{t('downloads.bridgesTitle')}</h2>
          <p className="section-sub">{t('downloads.bridgesSub')}</p>
        </Reveal>
        <div className="grid grid-2">
          <Reveal>
            <article className="card">
              <span className="badge">{t('downloads.cardDirect.badge')}</span>
              <h3>{t('downloads.cardDirect.name')}</h3>
              <p>{t('downloads.cardDirect.desc')}</p>
              <p className="card-cta">
                <Link className="btn btn-primary" to="#complete">
                  {t('downloads.cardDirect.linkLabel')}
                </Link>
              </p>
            </article>
          </Reveal>
          <Reveal delay={90}>
            <article className="card">
              <span className="badge">{t('downloads.cardGithub.badge')}</span>
              <h3>{t('downloads.cardGithub.name')}</h3>
              <p>{t('downloads.cardGithub.desc')}</p>
              <p className="card-cta">
                <a
                  className="btn"
                  href="https://github.com/knightslabs/echos/releases/tag/v1.0.0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('downloads.cardGithub.linkLabel')}
                </a>
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="section container">
        <Reveal>
          <div className="card schedule-card">
            <span className="badge">{t('downloads.schedule.badge')}</span>
            <h3>{t('downloads.schedule.title')}</h3>
            <p>{t('downloads.schedule.body')}</p>
          </div>
        </Reveal>
      </section>

      {EDITIONS.map((edition) => {
        const section = t(`downloads.${edition.sectionKey}`);
        const locked = !edition.available;
        const lockedLabel = edition.tba
          ? t('downloads.lockedTba')
          : t('downloads.lockedDate').replace('{date}', edition.releaseDate);
        return (
          <section className="section container" id={edition.anchor} key={edition.id}>
            <Reveal>
              <span className="kicker">{section.kicker}</span>
              <h2 className="section-title">{section.title}</h2>
              <p className="section-sub">{section.sub}</p>
            </Reveal>
            <DownloadTable files={edition.files} locked={locked} lockedLabel={lockedLabel} />
          </section>
        );
      })}

      <section className="section container" id="usb">
        <Reveal>
          <span className="kicker">{t('downloads.usbSection.kicker')}</span>
          <h2 className="section-title">{t('downloads.usbSection.title')}</h2>
          <p className="section-sub">{t('downloads.usbSection.sub')}</p>
        </Reveal>
        <DownloadTable files={[{ ...USB_FILE, targetKey: null }]} locked lockedLabel={t("downloads.lockedDate").replace("{date}", "2026-08-30")} />
        <Reveal>
          <div className="card verify-card">
            <pre><code>{`gunzip ${USB_FILE.name}
sudo dd if=EchOS-1.0.0-usb.img of=/dev/sdX bs=4M status=progress conv=fsync`}</code></pre>
            <p style={{ marginTop: '0.9rem', fontSize: '0.88rem' }}>
              {t('downloads.usbSection.note')}{' '}
              <code>{USB_UNCOMPRESSED_SHA256.slice(0, 16)}…</code> ({USB_FILE.name.replace('.gz', '')})
            </p>
          </div>
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
            <pre><code>{`sha256sum -c SHA256SUMS.txt`}</code></pre>
            <p style={{ marginTop: '0.9rem' }}>{t('downloads.verifySection.body2')}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
