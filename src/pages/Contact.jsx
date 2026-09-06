export default function Contact({ language = "es" }) {
  return (
    <main className="page">
      <article className="sheet">
        <h1>{language === "en" ? "Contact" : "Contacto"}</h1>
        <p>Roger Navarro · Girona, {language === "en" ? "Spain" : "España"}</p>
        <p>
          <a className="mail" href="mailto:knightsys@proton.me">
            knightsys@proton.me
          </a>
        </p>
      </article>
    </main>
  );
}
