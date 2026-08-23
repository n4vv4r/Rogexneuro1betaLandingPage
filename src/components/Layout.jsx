import { useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';

const GITHUB_URL = 'https://github.com/knightslabs/echos';
const X_URL = 'https://x.com/knightssystems';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function LangToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
      aria-label={t('nav.toggleAria')}
    >
      <span className={lang === 'es' ? 'on' : 'off'}>ES</span>
      <span className="lang-sep">|</span>
      <span className={lang === 'en' ? 'on' : 'off'}>EN</span>
    </button>
  );
}

function Navbar() {
  const { t } = useI18n();
  const links = [
    { to: '/', key: 'nav.home', end: true },
    { to: '/downloads', key: 'nav.downloads' },
    { to: '/docs', key: 'nav.docs' },
    { to: '/faq', key: 'nav.faq' },
    { to: '/privacy', key: 'nav.privacy' },
    { to: '/legal', key: 'nav.legal' },
  ];
  return (
    <header className="site-header">
      <nav className="nav" aria-label={t('nav.ariaMain')}>
        <Link className="brand" to="/">
          <span className="brand-eclipse" aria-hidden="true" />
          ROGEX&nbsp;LABORATORIES&nbsp;<small>/ EchOS</small>
        </Link>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {t(link.key)}
              </NavLink>
            </li>
          ))}
        </ul>
        <LangToggle />
      </nav>
    </header>
  );
}

function Footer() {
  const { t } = useI18n();
  const links = [
    { to: '/', key: 'nav.home', end: true },
    { to: '/downloads', key: 'nav.downloads' },
    { to: '/docs', key: 'nav.docs' },
    { to: '/faq', key: 'nav.faq' },
    { to: '/privacy', key: 'nav.privacy' },
    { to: '/legal', key: 'nav.legal' },
  ];
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <p>
            <span className="eclipse-mini" aria-hidden="true" />
            <strong>{t('footer.brandLine')}</strong>
          </p>
          <small>{t('footer.small')}</small>
          <small>{t('footer.onePerson')}</small>
          <small>
            {t('footer.contact')}{' '}
            <a href="mailto:knightsys@proton.me">knightsys@proton.me</a>
          </small>
        </div>
        <ul className="footer-links">
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{t(link.key)}</Link>
            </li>
          ))}
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </li>
          <li>
            <a href={X_URL} target="_blank" rel="noopener noreferrer">
              X / Twitter ↗
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export function Layout() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <div className="page-fade" key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
