import { Link } from "react-router-dom";

export default function NotFound({ language = "es" }) {
  return (
    <main className="page">
      <div className="gone">
        <div>
          <h1>404</h1>
          <Link to={language === "en" ? "/en" : "/"}>Home</Link>
        </div>
      </div>
    </main>
  );
}
