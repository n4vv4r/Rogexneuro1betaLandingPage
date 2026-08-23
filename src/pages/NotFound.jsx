import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useSeo } from '../hooks/useSeo';
import { Reveal } from '../components/Reveal';

export default function NotFound() {
  useSeo('*');
  const { t } = useI18n();

  return (
    <div className="lost-eclipse">
      <div
        className="eclipse eclipse--small"
        role="img"
        aria-label={t('hero.eclipseAlt')}
      />
      <p className="code">{t('notFound.code')}</p>
      <h1>{t('notFound.title')}</h1>
      <p className="lost-body">{t('notFound.body')}</p>
      <div className="hero-actions">
        <Link className="btn btn-primary" to="/">
          {t('notFound.btnHome')}
        </Link>
        <Link className="btn" to="/downloads">
          {t('notFound.btnDownloads')}
        </Link>
        <Link className="btn" to="/docs">
          {t('notFound.btnDocs')}
        </Link>
      </div>
    </div>
  );
}
