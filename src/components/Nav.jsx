import { Link } from "react-router-dom";
import { SITE } from "../site.js";

const WWW = SITE.url.replace(/\/$/, "");

export default function Nav({ path, docsHost = false }) {
  const here = path === "/" ? "/" : path.replace(/\/$/, "");
  const on = (to) => {
    if (docsHost) return to === "/docs";
    if (to === "/") return here === "/";
    return here === to || here.startsWith(`${to}/`);
  };
  const item = (to, label) => {
    const href = `${WWW}${to === "/" ? "/" : to}`;
    const cls = on(to) ? "is-active" : "";
    if (docsHost || to === "/docs") {
      return (
        <a href={href} className={cls}>
          {label}
        </a>
      );
    }
    return (
      <Link to={to} className={cls}>
        {label}
      </Link>
    );
  };

  return (
    <nav className="nav" aria-label="RxLabs">
      <div className="nav-cluster">
        {item("/contact", "Contacto")}
        {item("/about", "Qué es RxLabs®")}
        {item("/community", "Comunidad")}
        {item("/docs", "Docs")}
      </div>
      <div className="nav-cluster">
        <span className="nav-dead" title="aún no">echOS</span>
        <span className="nav-dead" title="aún no">PRISMA</span>
        <span className="nav-dead" title="aún no">echoAI</span>
        {item("/", "Home")}
      </div>
    </nav>
  );
}
