import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { marked } from "marked";
import echosQue from "../content/echos/que-es.md?raw";
import echosLim from "../content/echos/limites.md?raw";
import echosSup from "../content/echos/superficie.md?raw";
import echosCmd from "../content/echos/comandos.md?raw";
import prismaOv from "../content/prisma/overview.md?raw";
import prismaTe from "../content/prisma/technical.md?raw";
import prismaSo from "../content/prisma/social.md?raw";

marked.setOptions({ gfm: true, breaks: false });

const CATALOG = [
  { group: "echOS 2.1.0-honest", id: "echos/que-es", title: "Qué es", src: echosQue },
  { group: "echOS 2.1.0-honest", id: "echos/limites", title: "Límites", src: echosLim },
  { group: "echOS 2.1.0-honest", id: "echos/superficie", title: "Superficie", src: echosSup },
  { group: "echOS 2.1.0-honest", id: "echos/comandos", title: "Comandos", src: echosCmd },
  { group: "PRISMA 5 SNN", id: "prisma/overview", title: "Overview", src: prismaOv },
  { group: "PRISMA 5 SNN", id: "prisma/technical", title: "Technical", src: prismaTe },
  { group: "PRISMA 5 SNN", id: "prisma/social", title: "Social", src: prismaSo },
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
