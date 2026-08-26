import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';

export default function Validation() {
  useSeo('/validation');
  const { t } = useI18n();
  const v = t('validation');

  return (
    <>
      <section className="hero hero--page">
        <p className="hero-kicker">{v.kicker}</p>
        <h1 className="hero-page-title">{v.title}</h1>
        <p className="tagline">{v.lead}</p>
      </section>

      <section className="section container">
        <Reveal>
          <div className="card schedule-card">
            <span className="badge">{v.gate.badge}</span>
            <h2 className="section-title" style={{ fontSize: '1.35rem' }}>{v.gate.title}</h2>
            <p>{v.gate.body}</p>
          </div>
        </Reveal>
      </section>

      <section className="section container" id="metrics">
        <Reveal>
          <span className="kicker">{v.metrics.kicker}</span>
          <h2 className="section-title">{v.metrics.title}</h2>
          <p className="section-sub">{v.metrics.sub}</p>
        </Reveal>
        <div className="grid grid-2 val-metrics">
          {v.metrics.cards.map((c) => (
            <Reveal key={c.value}>
              <article className="card val-metric">
                <p className="val-metric-value">{c.value}</p>
                <h3>{c.label}</h3>
                <p>{c.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container" id="suite">
        <Reveal>
          <span className="kicker">{v.suite.kicker}</span>
          <h2 className="section-title">{v.suite.title}</h2>
          <p className="section-sub">{v.suite.sub}</p>
        </Reveal>
        {v.suite.items.map((item) => (
          <Reveal key={item.title}>
            <article className="card" style={{ marginBottom: '1rem' }}>
              <h3>{item.title}</h3>
              <p>{item.method}</p>
              <p className="val-metric-note">{item.bar}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="section container" id="bench">
        <Reveal>
          <span className="kicker">{v.bench.kicker}</span>
          <h2 className="section-title">{v.bench.title}</h2>
          <p className="section-sub">{v.bench.body}</p>
        </Reveal>
      </section>

      <section className="section container" id="industry">
        <Reveal>
          <span className="kicker">{v.industry.kicker}</span>
          <h2 className="section-title">{v.industry.title}</h2>
          <p className="section-sub">{v.industry.sub}</p>
        </Reveal>
        <div className="grid grid-2">
          {v.industry.cards.map((c) => (
            <Reveal key={c.title}>
              <article className="card">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container" id="repro">
        <Reveal>
          <span className="kicker">{v.repro.kicker}</span>
          <h2 className="section-title">{v.repro.title}</h2>
          <p className="section-sub">{v.repro.body}</p>
          <pre className="md-code"><code>{v.repro.code}</code></pre>
          <p className="card-cta" style={{ marginTop: '1.2rem' }}>
            <Link className="btn" to="/docs/research">
              {v.repro.ctaDocs}
            </Link>
            <Link className="btn" to="/docs/building">
              {v.repro.ctaBuild}
            </Link>
          </p>
        </Reveal>
      </section>
    </>
  );
}
