import { NavLink, Outlet } from 'react-router-dom';
import { useI18n } from '../i18n';
import { DOC_GROUPS, docTitle } from '../content/docs-catalog';

export default function DocsLayout() {
  const { lang, t } = useI18n();

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
          </ul>
          {DOC_GROUPS.map((g) => (
            <div key={g.id} className="docs-side-group">
              <p className="docs-side-label">{g.label[lang] || g.label.en}</p>
              <ul>
                {g.ids.map((id) => (
                  <li key={id}>
                    <NavLink
                      to={`/docs/${id}`}
                      className={({ isActive }) => (isActive ? 'active' : undefined)}
                    >
                      {docTitle(id, lang)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <div className="docs-content">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
