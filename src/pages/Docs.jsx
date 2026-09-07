import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { marked } from "marked";
import echosQue from "../content/echos/que-es.md?raw";
import echosGuide from "../content/echos/guia.md?raw";
import echosArch from "../content/echos/arquitectura.md?raw";
import echosEvidence from "../content/echos/evidencia.md?raw";
import echosGallery from "../content/echos/galeria.md?raw";
import echosLim from "../content/echos/limites.md?raw";
import echosSup from "../content/echos/superficie.md?raw";
import echosCmd from "../content/echos/comandos.md?raw";
import prismaOv from "../content/prisma/overview.md?raw";
import prismaTe from "../content/prisma/tecnico.md?raw";
import echoaiQue from "../content/echoai/que-es.md?raw";
import echoaiPie from "../content/echoai/piezas.md?raw";
import echoaiEcho1 from "../content/echoai/echo1.md?raw";
import echoaiResultados from "../content/echoai/resultados.md?raw";
import echoaiProceso from "../content/echoai/proceso.md?raw";
import echoaiRuta from "../content/echoai/ruta.md?raw";
import echoaiHardware from "../content/echoai/hardware.md?raw";
import echoaiLimites from "../content/echoai/limites.md?raw";
import labEco from "../content/lab/ecosistema.md?raw";
import enEchosQue from "../content/en/echos/que-es.md?raw";
import enEchosGuide from "../content/en/echos/guia.md?raw";
import enEchosArch from "../content/en/echos/arquitectura.md?raw";
import enEchosEvidence from "../content/en/echos/evidencia.md?raw";
import enEchosGallery from "../content/en/echos/galeria.md?raw";
import enEchosLim from "../content/en/echos/limites.md?raw";
import enEchosSup from "../content/en/echos/superficie.md?raw";
import enEchosCmd from "../content/en/echos/comandos.md?raw";
import enPrismaOv from "../content/en/prisma/overview.md?raw";
import enPrismaTe from "../content/en/prisma/tecnico.md?raw";
import enEchoaiQue from "../content/en/echoai/que-es.md?raw";
import enEchoaiPie from "../content/en/echoai/piezas.md?raw";
import enEchoaiEcho1 from "../content/en/echoai/echo1.md?raw";
import enEchoaiResultados from "../content/en/echoai/resultados.md?raw";
import enEchoaiProceso from "../content/en/echoai/proceso.md?raw";
import enEchoaiRuta from "../content/en/echoai/ruta.md?raw";
import enEchoaiHardware from "../content/en/echoai/hardware.md?raw";
import enEchoaiLimites from "../content/en/echoai/limites.md?raw";
import enLabEco from "../content/en/lab/ecosistema.md?raw";
import caEchosQue from "../content/ca/echos/que-es.md?raw";
import caEchosGuide from "../content/ca/echos/guia.md?raw";
import caEchosArch from "../content/ca/echos/arquitectura.md?raw";
import caEchosEvidence from "../content/ca/echos/evidencia.md?raw";
import caEchosGallery from "../content/ca/echos/galeria.md?raw";
import caEchosLim from "../content/ca/echos/limites.md?raw";
import caEchosSup from "../content/ca/echos/superficie.md?raw";
import caEchosCmd from "../content/ca/echos/comandos.md?raw";
import caPrismaOv from "../content/ca/prisma/overview.md?raw";
import caPrismaTe from "../content/ca/prisma/tecnico.md?raw";
import caEchoaiQue from "../content/ca/echoai/que-es.md?raw";
import caEchoaiPie from "../content/ca/echoai/piezas.md?raw";
import caEchoaiEcho1 from "../content/ca/echoai/echo1.md?raw";
import caEchoaiResultados from "../content/ca/echoai/resultados.md?raw";
import caEchoaiProceso from "../content/ca/echoai/proceso.md?raw";
import caEchoaiRuta from "../content/ca/echoai/ruta.md?raw";
import caEchoaiHardware from "../content/ca/echoai/hardware.md?raw";
import caEchoaiLimites from "../content/ca/echoai/limites.md?raw";
import caLabEco from "../content/ca/lab/ecosistema.md?raw";
import Echo1Results from "./Echo1Results.jsx";

marked.setOptions({ gfm: true, breaks: false });

const CATALOG = [
  { group: "El laboratorio", id: "lab/ecosistema", title: "Tres líneas", src: labEco },
  { group: "echoAI", id: "echoai/que-es", title: "Qué es", src: echoaiQue },
  { group: "echoAI", id: "echoai/piezas", title: "Arquitectura", src: echoaiPie },
  { group: "echoAI", id: "echoai/echo1", title: "ECHO-1", src: echoaiEcho1 },
  { group: "echoAI", id: "echoai/resultados", title: "Resultados", src: echoaiResultados },
  { group: "echoAI", id: "echoai/proceso", title: "Cómo se construyó", src: echoaiProceso },
  { group: "echoAI", id: "echoai/ruta", title: "ECHO-2 → ECHO-3", src: echoaiRuta },
  { group: "echoAI", id: "echoai/hardware", title: "Hardware previsto", src: echoaiHardware },
  { group: "echoAI", id: "echoai/limites", title: "Límites", src: echoaiLimites },
  { group: "echOS", id: "echos/que-es", title: "Qué es", src: echosQue },
  { group: "echOS", id: "echos/guia", title: "Guía de uso", src: echosGuide },
  { group: "echOS", id: "echos/arquitectura", title: "Arquitectura", src: echosArch },
  { group: "echOS", id: "echos/evidencia", title: "Evidencia 3.0", src: echosEvidence },
  { group: "echOS", id: "echos/galeria", title: "Galería", src: echosGallery },
  { group: "echOS", id: "echos/limites", title: "Límites", src: echosLim },
  { group: "echOS", id: "echos/superficie", title: "Superficie", src: echosSup },
  { group: "echOS", id: "echos/comandos", title: "Comandos", src: echosCmd },
  { group: "PRISMA", id: "prisma/resumen", title: "Resumen", src: prismaOv },
  { group: "PRISMA", id: "prisma/tecnico", title: "Técnico", src: prismaTe },
];

const EN_CATALOG = [
  { group: "The laboratory", id: "lab/ecosistema", title: "Three lines", src: enLabEco },
  { group: "echoAI", id: "echoai/que-es", title: "What it is", src: enEchoaiQue },
  { group: "echoAI", id: "echoai/piezas", title: "Architecture", src: enEchoaiPie },
  { group: "echoAI", id: "echoai/echo1", title: "ECHO-1", src: enEchoaiEcho1 },
  { group: "echoAI", id: "echoai/resultados", title: "Results", src: enEchoaiResultados },
  { group: "echoAI", id: "echoai/proceso", title: "How it was built", src: enEchoaiProceso },
  { group: "echoAI", id: "echoai/ruta", title: "ECHO-2 → ECHO-3", src: enEchoaiRuta },
  { group: "echoAI", id: "echoai/hardware", title: "Planned hardware", src: enEchoaiHardware },
  { group: "echoAI", id: "echoai/limites", title: "Limitations", src: enEchoaiLimites },
  { group: "echOS", id: "echos/que-es", title: "What it is", src: enEchosQue },
  { group: "echOS", id: "echos/guia", title: "User guide", src: enEchosGuide },
  { group: "echOS", id: "echos/arquitectura", title: "Architecture", src: enEchosArch },
  { group: "echOS", id: "echos/evidencia", title: "3.0 evidence", src: enEchosEvidence },
  { group: "echOS", id: "echos/galeria", title: "Gallery", src: enEchosGallery },
  { group: "echOS", id: "echos/limites", title: "Limitations", src: enEchosLim },
  { group: "echOS", id: "echos/superficie", title: "Surface", src: enEchosSup },
  { group: "echOS", id: "echos/comandos", title: "Commands", src: enEchosCmd },
  { group: "PRISMA", id: "prisma/resumen", title: "Overview", src: enPrismaOv },
  { group: "PRISMA", id: "prisma/tecnico", title: "Technical", src: enPrismaTe },
];

const CA_CATALOG = [
  { group: "El laboratori", id: "lab/ecosistema", title: "Tres línies", src: caLabEco },
  { group: "echoAI", id: "echoai/que-es", title: "Què és", src: caEchoaiQue },
  { group: "echoAI", id: "echoai/piezas", title: "Arquitectura", src: caEchoaiPie },
  { group: "echoAI", id: "echoai/echo1", title: "ECHO-1", src: caEchoaiEcho1 },
  { group: "echoAI", id: "echoai/resultados", title: "Resultats", src: caEchoaiResultados },
  { group: "echoAI", id: "echoai/proceso", title: "Com es va construir", src: caEchoaiProceso },
  { group: "echoAI", id: "echoai/ruta", title: "ECHO-2 → ECHO-3", src: caEchoaiRuta },
  { group: "echoAI", id: "echoai/hardware", title: "Maquinari previst", src: caEchoaiHardware },
  { group: "echoAI", id: "echoai/limites", title: "Límits", src: caEchoaiLimites },
  { group: "echOS", id: "echos/que-es", title: "Què és", src: caEchosQue },
  { group: "echOS", id: "echos/guia", title: "Guia d'ús", src: caEchosGuide },
  { group: "echOS", id: "echos/arquitectura", title: "Arquitectura", src: caEchosArch },
  { group: "echOS", id: "echos/evidencia", title: "Evidència 3.0", src: caEchosEvidence },
  { group: "echOS", id: "echos/galeria", title: "Galeria", src: caEchosGallery },
  { group: "echOS", id: "echos/limites", title: "Límits", src: caEchosLim },
  { group: "echOS", id: "echos/superficie", title: "Superfície", src: caEchosSup },
  { group: "echOS", id: "echos/comandos", title: "Ordres", src: caEchosCmd },
  { group: "PRISMA", id: "prisma/resumen", title: "Resum", src: caPrismaOv },
  { group: "PRISMA", id: "prisma/tecnico", title: "Tècnic", src: caPrismaTe },
];

function groups(catalog) {
  const out = [];
  for (const d of catalog) {
    const last = out[out.length - 1];
    if (!last || last.name !== d.group) out.push({ name: d.group, items: [d] });
    else last.items.push(d);
  }
  return out;
}

export default function Docs({ language = "es" }) {
  const loc = useLocation();
  const nav = useNavigate();
  const [sideOpen, setSideOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 861px)").matches;
  });
  const docsHost = typeof window !== "undefined"
    && window.location.hostname === "docs.rogexlaboratories.com";
  const catalog = language === "en" ? EN_CATALOG : language === "ca" ? CA_CATALOG : CATALOG;

  const slug = useMemo(() => {
    let p = loc.pathname.replace(/\/+$/, "");
    p = p.replace(/^\/(?:en|ca)(?=\/|$)/, "");
    if (!docsHost) p = p.replace(/^\/docs/, "");
    p = p.replace(/^\//, "");
    const alias = {
      "prisma/social": "prisma/resumen",
      "prisma/overview": "prisma/resumen",
      "prisma/technical": "prisma/tecnico",
    };
    if (alias[p]) p = alias[p];
    return p || catalog[0].id;
  }, [loc.pathname, docsHost, catalog]);

  const doc = catalog.find((d) => d.id === slug) || catalog[0];
  const html = useMemo(() => marked.parse(doc.src || ""), [doc]);

  const open = (id) => {
    const prefix = language === "es" ? "" : `/${language}`;
    nav(docsHost ? `${prefix}/${id}` : `${prefix}/docs/${id}`);
    if (typeof window !== "undefined"
      && window.matchMedia("(max-width: 860px)").matches) {
      setSideOpen(false);
    }
  };

  return (
    <main className="page">
      <div className={`docs${sideOpen ? "" : " is-side-hidden"}`}>
        <div className="docs-toolbar">
          <button
            type="button"
            className="docs-toggle"
            aria-controls="docs-index"
            aria-expanded={sideOpen}
            onClick={() => setSideOpen((value) => !value)}
          >
            {sideOpen
              ? language === "en" ? "Hide index" : language === "ca" ? "Amaga l'índex" : "Ocultar índice"
              : language === "en" ? "Show index" : language === "ca" ? "Mostra l'índex" : "Mostrar índice"}
          </button>
        </div>
        <aside id="docs-index" className="docs-side" hidden={!sideOpen}>
          {groups(catalog).map((g) => (
            <div key={g.name}>
              <h2>{g.name}</h2>
              {g.items.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={d.id === doc.id ? "is-on" : ""}
                  onClick={() => open(d.id)}
                >
                  {d.title}
                </button>
              ))}
            </div>
          ))}
        </aside>
        {doc.id === "echoai/resultados" ? (
          <Echo1Results language={language} />
        ) : (
          <article
            className="docs-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </main>
  );
}
