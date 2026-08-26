import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Eclipse } from '../components/Eclipse';
import { Reveal } from '../components/Reveal';
import { Carousel } from '../components/Carousel';

export default function Home() {
  useSeo('/');
  const { t } = useI18n();
  const product = t('product');

  return (
    <>
      <section className="hero">
        <Eclipse />
        <p className="hero-kicker">{t('hero.kicker')}</p>
        <h1>echOS&nbsp;2.0</h1>
        <p className="tagline">{t('hero.tagline')}</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/downloads">
            {t('hero.ctaDownload')}
          </Link>
          <Link className="btn" to="/docs">
            {t('hero.ctaDocs')}
          </Link>
          <Link className="btn" to="/validation">
            {t('hero.ctaValidation')}
          </Link>
        </div>
        <figure className="hero-banner">
          <img
            src="/shots/hero.png"
            alt={t('hero.bannerAlt')}
            loading="eager"
            fetchpriority="high"
          />
          <figcaption>{t('hero.bannerCaption')}</figcaption>
        </figure>
      </section>

      <section className="section container" id="release-gate">
        <Reveal>
          <div className="card schedule-card">
            <span className="badge">{t('releaseGate.badge')}</span>
            <h2 className="section-title" style={{ fontSize: '1.45rem' }}>
              {t('releaseGate.title')}
            </h2>
            <p>{t('releaseGate.body')}</p>
            <p className="card-cta">
              <Link className="btn btn-primary" to="/validation">
                {t('releaseGate.cta')}
              </Link>
              <Link className="btn" to="/docs/limits">
                {t('releaseGate.ctaLimits')}
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section container" id="product">
        <Reveal>
          <span className="kicker">{product.kicker}</span>
          <h2 className="section-title">{product.title}</h2>
          <p className="section-sub">{product.sub}</p>
        </Reveal>
        <Reveal>
          <article className="card card-edition card-edition--complete">
            <span className="badge">{product.badge}</span>
            <h3>{product.name}</h3>
            <p>{product.desc}</p>
            <ul>
              {product.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="card-cta">
              <Link className="btn btn-primary" to="/downloads">
                {product.cta}
              </Link>
              <Link className="btn" to="/docs/editions">
                {product.ctaDocs}
              </Link>
            </p>
          </article>
        </Reveal>
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
              <Link className="btn btn-primary" to="/docs">
                {t('ctaStrip.btnDocs')}
              </Link>
              <Link className="btn" to="/validation">
                {t('ctaStrip.btnValidation')}
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
