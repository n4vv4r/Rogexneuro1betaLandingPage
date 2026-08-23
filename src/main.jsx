import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Downloads from './pages/Downloads';
import DocsLayout from './pages/DocsLayout';
import { DocsHub, DocPage } from './pages/Docs';
import Faq from './pages/Faq';
import Privacy from './pages/Privacy';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import './styles/site.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<DocsHub />} />
              <Route path="architecture" element={<DocPage id="architecture" />} />
              <Route path="editions" element={<DocPage id="editions" />} />
              <Route path="echo" element={<DocPage id="echo" />} />
              <Route path="packages" element={<DocPage id="packages" />} />
              <Route path="install" element={<DocPage id="install" />} />
            </Route>
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>,
);
