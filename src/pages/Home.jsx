import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Eclipse } from '../components/Eclipse';
import { Reveal } from '../components/Reveal';
import { Carousel } from '../components/Carousel';

export default function Home() {
  useSeo('/');
  const { t } = useI18n();

  const editions = ['complete', 'minimal', 'edge'];

  return (
    <>
      <section className="hero">
        <Eclipse />
        <h1>EchOS&nbsp;1.0</h1>
        <p className="tagline">{t('hero.tagline')}</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/downloads">
            {t('hero.ctaDownload')}
          </Link>
          <Link className="btn" to="/docs">
            {t('hero.ctaDocs')}
          </Link>
        </div>
        <figure className="hero-banner">
          <img
            src="/shots/hero.jpg"
            alt={t('hero.bannerAlt')}
            loading="eager"
            fetchpriority="high"
          />
          <figcaption>{t('hero.bannerCaption')}</figcaption>
        </figure>
      </section>

      <section className="section container" id="editions">
        <Reveal>
          <span className="kicker">{t('editions.kicker')}</span>
          <h2 className="section-title">{t('editions.title')}</h2>
          <p className="section-sub">{t('editions.sub')}</p>
        </Reveal>

        <div className="grid grid-3">
          {editions.map((id, i) => {
            const ed = t(`editions.${id}`);
            return (
              <Reveal key={id} delay={i * 90}>
                <article className={`card card-edition card-edition--${id}`}>
                  <span className="badge">{ed.badge}</span>
                  <h3>{ed.name}</h3>
                  <p>{ed.desc}</p>
                  <ul>
                    {ed.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="card-cta">
                    <Link
                      className={`btn ${id === 'complete' ? 'btn-primary' : ''}`}
                      to={`/downloads#${ed.anchor}`}
                    >
                      {ed.cta}
                    </Link>
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section container" id="stack">
        <Reveal>
          <span className="kicker">{t('features.kicker')}</span>
          <h2 className="section-title">{t('features.title')}</h2>
          <p className="section-sub">{t('features.sub')}</p>
        </Reveal>

        <Reveal>
          <div>
            {t('features.rows').map((row) => (
              <div className="feature-row" key={row.title}>
                <div className="feature-icon" aria-hidden="true">
                  {row.icon}
                </div>
                <div>
                  <h3>{row.title}</h3>
                  <p>{row.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section container" id="screenshots">
        <Reveal>
          <span className="kicker">{t('carousel.kicker')}</span>
          <h2 className="section-title">{t('carousel.title')}</h2>
          <p className="section-sub">{t('carousel.sub')}</p>
        </Reveal>
        <Reveal>
          <Carousel />
        </Reveal>
      </section>

      <section className="section container" id="get-started">
        <Reveal>
          <div className="card cta-strip-card">
            <h2 className="section-title">{t('ctaStrip.title')}</h2>
            <p style={{ marginBottom: '1.4rem' }}>{t('ctaStrip.text')}</p>
            <p>
              <Link className="btn btn-primary" to="/downloads">
                {t('ctaStrip.btnDownloads')}
              </Link>
              <a
                className="btn"
                href="https://github.com/knightslabs/echos"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('ctaStrip.btnGithub')}
              </a>
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
