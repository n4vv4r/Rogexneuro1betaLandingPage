import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';
import { PRIVACY_CONTENT } from '../content';

export default function Privacy() {
  useSeo('/privacy');
  const { t, lang } = useI18n();
  const sections = PRIVACY_CONTENT[lang] || PRIVACY_CONTENT.en;

  return (
    <section className="section container prose">
      <Reveal>
        <span className="kicker">{t('privacyPage.kicker')}</span>
        <h1>{t('privacyPage.title')}</h1>
        <p className="updated-line">{t('privacyPage.updated')}</p>
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
