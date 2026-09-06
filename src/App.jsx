import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Head from "./components/Head.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Docs from "./pages/Docs.jsx";
import { languageForPath } from "./i18n.js";

function isDocsHost() {
  if (typeof window === "undefined") return false;
  return window.location.hostname === "docs.rogexlaboratories.com";
}

export default function App() {
  const loc = useLocation();
  const docsHost = isDocsHost();
  const language = languageForPath(loc.pathname);

  if (docsHost) {
    return (
      <>
        <Head />
        <Nav path={loc.pathname} docsHost language={language} />
        <Routes>
          <Route path="/*" element={<Docs language={language} />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Head />
      <Nav path={loc.pathname} language={language} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/en/home" element={<Navigate to="/en" replace />} />
        <Route path="/about" element={<About language="es" />} />
        <Route path="/en/about" element={<About language="en" />} />
        <Route path="/contact" element={<Contact language="es" />} />
        <Route path="/en/contact" element={<Contact language="en" />} />
        <Route path="/docs/prisma/social" element={<Navigate to="/docs/prisma/resumen" replace />} />
        <Route path="/docs/prisma/overview" element={<Navigate to="/docs/prisma/resumen" replace />} />
        <Route path="/docs/prisma/technical" element={<Navigate to="/docs/prisma/tecnico" replace />} />
        <Route path="/en/docs/prisma/social" element={<Navigate to="/en/docs/prisma/resumen" replace />} />
        <Route path="/en/docs/prisma/overview" element={<Navigate to="/en/docs/prisma/resumen" replace />} />
        <Route path="/en/docs/prisma/technical" element={<Navigate to="/en/docs/prisma/tecnico" replace />} />
        <Route path="/docs/*" element={<Docs language="es" />} />
        <Route path="/en/docs/*" element={<Docs language="en" />} />
        <Route path="/echos" element={<NotFound language="es" />} />
        <Route path="/prisma" element={<NotFound language="es" />} />
        <Route path="/echoai" element={<NotFound language="es" />} />
        <Route path="*" element={<NotFound language={language} />} />
      </Routes>
    </>
  );
}
