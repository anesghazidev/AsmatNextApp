import "@/style.css";

export default function Hero({ href_button1, href_button2 = null, href_button3 = null }) {
  return (
    <section className="hero">
      <div className="container">
        <h1>Bienvenue chez AsmatMaman</h1>
        <p>Un accueil chaleureux et professionnel pour vos enfants</p>
        {href_button1}
        {href_button2}
        {href_button3}
      </div>
    </section>
  );
}
