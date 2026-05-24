import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import "@/style.css";

export default function Home() {
  return (
    <div className="Home">
      <Header />
      <Hero href_button1={<a href="#contact" className="btn">Contactez-moi</a>} />

      <section id="testimonials" className="testimonials">
        <div className="container">
          <h2 className="section-title">Témoignages de parents</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>
                &#34;Ma fille adore aller chez AsmatMaman ! Elle revient toujours avec le sourire et plein
                d&#39;histoires à raconter.&#34;
              </p>
              <div className="author">- Marie Dupont</div>
            </div>
            <div className="testimonial">
              <p>
                &#34;Professionnelle, attentive et bienveillante. Je confie mon fils les yeux fermés.
                Vraiment recommandé !&#34;
              </p>
              <div className="author">- Jean Martin</div>
            </div>
            <div className="testimonial">
              <p>
                &#34;Les repas sont délicieux et préparés avec des produits frais. Mon enfant a découvert
                de nouvelles saveurs.&#34;
              </p>
              <div className="author">- Sophie Bernard</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2 className="section-title">Me contacter</h2>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
