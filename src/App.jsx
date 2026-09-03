import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Head from "./components/Head.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Community from "./pages/Community.jsx";
import NotFound from "./pages/NotFound.jsx";
import Docs from "./pages/Docs.jsx";

function isDocsHost() {
  if (typeof window === "undefined") return false;
  return window.location.hostname === "docs.rogexlaboratories.com";
}

export default function App() {
  const loc = useLocation();
  const docsHost = isDocsHost();

  if (docsHost) {
    return (
      <>
        <Head />
        <Routes>
          <Route path="/*" element={<Docs />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Head />
      <Nav path={loc.pathname} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/community" element={<Community />} />
        <Route path="/docs/prisma/social" element={<Navigate to="/docs/prisma/resumen" replace />} />
        <Route path="/docs/prisma/overview" element={<Navigate to="/docs/prisma/resumen" replace />} />
        <Route path="/docs/prisma/technical" element={<Navigate to="/docs/prisma/tecnico" replace />} />
        <Route path="/docs/*" element={<Docs />} />
        <Route path="/echos" element={<NotFound />} />
        <Route path="/prisma" element={<NotFound />} />
        <Route path="/echoai" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
