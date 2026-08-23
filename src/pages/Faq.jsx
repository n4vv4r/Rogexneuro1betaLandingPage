import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';
import { FAQ_CONTENT } from '../content';

export default function Faq() {
  useSeo('/faq');
  const { t, lang } = useI18n();
  const items = FAQ_CONTENT[lang] || FAQ_CONTENT.en;

  return (
    <section className="section container">
      <Reveal>
        <span className="kicker">{t('faqPage.kicker')}</span>
        <h1 className="section-title">{t('faqPage.title')}</h1>
        <p className="section-sub">{t('faqPage.sub')}</p>
      </Reveal>

      <Reveal>
        <div className="page-fade" key={lang}>
          {items.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>{item.q}</summary>
              <div className="faq-body">{item.a}</div>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
