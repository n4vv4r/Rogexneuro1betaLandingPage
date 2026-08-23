import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';
import { LEGAL_CONTENT } from '../content';

export default function Legal() {
  useSeo('/legal');
  const { t, lang } = useI18n();
  const sections = LEGAL_CONTENT[lang] || LEGAL_CONTENT.en;

  return (
    <section className="section container prose">
      <Reveal>
        <span className="kicker">{t('legalPage.kicker')}</span>
        <h1>{t('legalPage.title')}</h1>
        <p className="updated-line">{t('legalPage.updated')}</p>
      </Reveal>

      <div className="page-fade" key={lang}>
        {sections.map((section) => (
          <section key={section.h2}>
            <h2>{section.h2}</h2>
            {section.body}
          </section>
        ))}
      </div>
    </section>
  );
}
