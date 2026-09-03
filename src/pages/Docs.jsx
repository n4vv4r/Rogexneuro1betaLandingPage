import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { marked } from "marked";
import echosQue from "../content/echos/que-es.md?raw";
import echosLim from "../content/echos/limites.md?raw";
import echosSup from "../content/echos/superficie.md?raw";
import echosCmd from "../content/echos/comandos.md?raw";
import prismaOv from "../content/prisma/overview.md?raw";
import prismaTe from "../content/prisma/tecnico.md?raw";
import echoaiQue from "../content/echoai/que-es.md?raw";
import echoaiPie from "../content/echoai/piezas.md?raw";
import echoaiRuta from "../content/echoai/ruta.md?raw";
import labEco from "../content/lab/ecosistema.md?raw";

marked.setOptions({ gfm: true, breaks: false });

const CATALOG = [
  { group: "El laboratorio", id: "lab/ecosistema", title: "Tres líneas", src: labEco },
  { group: "echoAI", id: "echoai/que-es", title: "Qué es", src: echoaiQue },
  { group: "echoAI", id: "echoai/piezas", title: "Las piezas", src: echoaiPie },
  { group: "echoAI", id: "echoai/ruta", title: "Hoja de ruta", src: echoaiRuta },
  { group: "echOS", id: "echos/que-es", title: "Qué es", src: echosQue },
  { group: "echOS", id: "echos/limites", title: "Límites", src: echosLim },
  { group: "echOS", id: "echos/superficie", title: "Superficie", src: echosSup },
  { group: "echOS", id: "echos/comandos", title: "Comandos", src: echosCmd },
  { group: "PRISMA", id: "prisma/resumen", title: "Resumen", src: prismaOv },
  { group: "PRISMA", id: "prisma/tecnico", title: "Técnico", src: prismaTe },
];

function groups() {
  const out = [];
  for (const d of CATALOG) {
    const last = out[out.length - 1];
    if (!last || last.name !== d.group) out.push({ name: d.group, items: [d] });
    else last.items.push(d);
  }
  return out;
}

export default function Docs() {
  const loc = useLocation();
  const nav = useNavigate();
  const docsHost = typeof window !== "undefined"
    && window.location.hostname === "docs.rogexlaboratories.com";

  const slug = useMemo(() => {
    let p = loc.pathname.replace(/\/+$/, "");
    if (!docsHost) p = p.replace(/^\/docs/, "");
    p = p.replace(/^\//, "");
    const alias = {
      "prisma/social": "prisma/resumen",
      "prisma/overview": "prisma/resumen",
      "prisma/technical": "prisma/tecnico",
    };
    if (alias[p]) p = alias[p];
    return p || CATALOG[0].id;
  }, [loc.pathname, docsHost]);

  const doc = CATALOG.find((d) => d.id === slug) || CATALOG[0];
  const html = useMemo(() => marked.parse(doc.src || ""), [doc]);

  const open = (id) => {
    nav(docsHost ? `/${id}` : `/docs/${id}`);
  };

  return (
    <main className={docsHost ? "page" : "page"} style={docsHost ? { paddingTop: 0 } : undefined}>
      <div className="docs">
        <aside className="docs-side">
          {groups().map((g) => (
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
        <article
          className="docs-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </main>
  );
}
