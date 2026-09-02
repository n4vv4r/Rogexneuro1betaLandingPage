import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="page">
      <div className="gone">
        <div>
          <h1>404</h1>
          <Link to="/">Home</Link>
        </div>
      </div>
    </main>
  );
}
