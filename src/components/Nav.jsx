import { Link } from "react-router-dom";

export default function Nav({ path }) {
  const here = path === "/" ? "/" : path.replace(/\/$/, "");
  const on = (to) => (to === "/" ? here === "/" : here === to || here.startsWith(`${to}/`));
  const item = (to, label) => (
    <Link to={to} className={on(to) ? "is-active" : ""}>
      {label}
    </Link>
  );

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
