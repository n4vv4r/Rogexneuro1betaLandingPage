import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';
import { Blocks } from '../components/Blocks';
import { DOC_ORDER, DOCS_CONTENT } from '../content';

export function DocsHub() {
  useSeo('/docs');
  const { t } = useI18n();

  return (
    <>
      <Reveal>
        <span className="kicker">EchOS</span>
        <h1 className="section-title">{t('docsPage.hubTitle')}</h1>
        <p className="section-sub">{t('docsPage.hubSub')}</p>
      </Reveal>

      <Reveal>
        <h2 className="section-title docs-hub-subtitle">{t('docsPage.hubCardsTitle')}</h2>
        <div className="grid grid-2">
          {DOC_ORDER.map((id, i) => (
            <Reveal key={id} delay={i * 70}>
              <Link to={`/docs/${id}`} className={`card doc-card doc-card--${id}`}>
                <h3>{t(`docsPage.pages.${id}.label`)}</h3>
                <p>{t(`docsPage.pages.${id}.blurb`)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </>
  );
}

export function DocPage({ id }) {
  const { t, lang } = useI18n();
  const path = `/docs/${id}`;
  const title = t(`docsPage.pages.${id}.label`);
  useSeo(path, { title });
  const blocks = (DOCS_CONTENT[id] && DOCS_CONTENT[id][lang]) || DOCS_CONTENT[id].en;

  return (
    <article className="prose doc-article">
      <p className="back-to-hub">
        <Link to="/docs">{t('docsPage.backToHub')}</Link>
      </p>
      <h1 className="section-title">{title}</h1>
      <p className="section-sub">{t(`docsPage.pages.${id}.blurb`)}</p>
      <div className="page-fade" key={`${id}-${lang}`}>
        <Blocks blocks={blocks} />
      </div>
    </article>
  );
}
