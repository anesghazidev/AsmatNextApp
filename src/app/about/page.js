import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import "@/style.css";

export default function About() {
  return (
      <div className="About">
          <Header/>
          <Hero
              href_button1={<a href="#presentation" className="btn">Présentation</a>}
              href_button2={<a href="#charte" className="btn">Charte</a>}
          />
          <section id="presentation" className="about-section">
              <div className="container">
                  <h2 className="section-title">Présentation</h2>
                  <div className="about-content">
                      <div className="about-text">
                          <h2>Votre Partenaire de Confiance</h2>
                          <p>Avec plus de 10 ans d&#39;expérience en garde d&#39;enfants, je propose un accueil de
                              qualité basé
                              sur le respect, la bienveillance et l&#39;écoute.</p>
                          <p>J&#39;aime créer un environnement stimulant où chaque enfant peut s&#39;épanouir à son
                              rythme,
                              développer son autonomie et ses talents.</p>
                          <p>Agrée par les services de la petite enfance, je respecte scrupuleusement les normes de
                              sécurité et d&#39;hygiène.</p>
                      </div>
                      <div className="about-image">👩‍👧‍👦</div>
                  </div>
              </div>
          </section>
          <section id="charte" className="about-section">
              <div className="container">
                  <h2 className="section-title">Ma Charte</h2>
                  <div className="about-content">
                      <div className="about-image">📜</div>
                      <div className="about-text">
                          <p>Ma charte est basée sur les principes de respect, d&#39;écoute et de bienveillance envers
                              chaque enfant.</p>
                          <p>Je m&#39;engage à créer un environnement sûr, chaleureux et stimulant pour favoriser le
                              développement harmonieux de vos enfants.</p>
                      </div>
                  </div>
              </div>
          </section>
          <Footer/>
      </div>
  );
}
