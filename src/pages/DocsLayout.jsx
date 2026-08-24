import { NavLink, Outlet } from 'react-router-dom';
import { useI18n } from '../i18n';
import { Reveal } from '../components/Reveal';
import { MD_DOCS, MD_ORDER } from './DocsMd';

export default function DocsLayout() {
  const { t } = useI18n();

  return (
    <section className="section container docs-layout">
      <div className="docs-body">
        <aside className="docs-sidebar" aria-label={t('docsPage.sidebarTitle')}>
          <p className="docs-sidebar-title">{t('docsPage.sidebarTitle')}</p>
          <ul>
            <li>
              <NavLink to="/docs" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {t('docsPage.onThisHub')}
              </NavLink>
            </li>
            {MD_ORDER.map((id) => (
              <li key={id}>
                <NavLink to={`/docs/${id}`} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                  {MD_DOCS[id].title}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        <div className="docs-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
