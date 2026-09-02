import { Link } from "react-router-dom";

export default function Nav({ path }) {
  const here = path === "/" ? "/" : path.replace(/\/$/, "");
  const item = (to, label) => (
    <Link to={to} className={here === to ? "is-active" : ""}>
      {label}
    </Link>
  );

  return (
    <nav className="nav" aria-label="RxLabs">
      <div className="nav-cluster">
        {item("/contact", "Contacto")}
        {item("/about", "Qué es RxLabs®")}
        {item("/community", "Comunidad")}
      </div>
      <div className="nav-cluster">
        <span className="nav-dead" title="aún no">echOS</span>
        <span className="nav-dead" title="aún no">PRISMA</span>
        {item("/", "Home")}
      </div>
    </nav>
  );
}
