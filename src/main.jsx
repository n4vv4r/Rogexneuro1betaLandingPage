import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Downloads from './pages/Downloads';
import Packages from './pages/Packages';
import DocsLayout from './pages/DocsLayout';
import { DocsMdHub, DocsMdPage, MD_ORDER } from "./pages/DocsMd";
import Validation from './pages/Validation';
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
            <Route path="/packages" element={<Packages />} />
            <Route path="/rx-os/packages" element={<Packages />} />
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<DocsMdHub />} />
              {MD_ORDER.map((id) => (
                <Route key={id} path={id} element={<DocsMdPage id={id} />} />
              ))}
            </Route>
            <Route path="/validation" element={<Validation />} />
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
