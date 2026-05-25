import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "@/components/hero";

export default function Services() {
  return (
    <div className="service">
      <Header />
      <Hero
        href_button1={<a href="#tarifs" className="btn">Tarifs</a>}
        href_button2={<a href="#services" className="btn">Services</a>}
        href_button3={<a href="#activites" className="btn">Activit&eacute;s</a>}
      />

      <section id="services">
        <div className="container">
          <h2 className="section-title">Mes Services</h2>
          <div className="services">
            <div className="service-card">
              <div className="icon">&#127968;</div>
              <h3>Garde &agrave; domicile</h3>
              <p>Un environnement familial s&eacute;curis&eacute; et stimulant pour le d&eacute;veloppement de vos enfants.</p>
            </div>
            <div className="service-card">
              <div className="icon">&#127912;</div>
              <h3>Activit&eacute;s cr&eacute;atives</h3>
              <p>Peinture, bricolage, musique et jeux pour d&eacute;velopper la cr&eacute;ativit&eacute; et l&apos;imagination.</p>
            </div>
            <div className="service-card">
              <div className="icon">&#127822;</div>
              <h3>Alimentation saine</h3>
              <p>Repas &eacute;quilibr&eacute;s et go&ucirc;ters nutritifs pr&eacute;par&eacute;s avec soin et attention.</p>
            </div>
            <div className="service-card">
              <div className="icon">&#128218;</div>
              <h3>Apprentissage</h3>
              <p>Lectures, histoires et jeux &eacute;ducatifs pour favoriser le d&eacute;veloppement intellectuel.</p>
            </div>
            <div className="service-card">
              <div className="icon">&#128694;</div>
              <h3>Sorties</h3>
              <p>Promenades au parc et d&eacute;couverte du monde ext&eacute;rieur.</p>
            </div>
            <div className="service-card">
              <div className="icon">&#128164;</div>
              <h3>Sieste confortable</h3>
              <p>Environnement calme et rassurant pour le repos et la d&eacute;tente des enfants.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="activites">
        <div className="container">
          <h2 className="section-title">Mes activit&eacute;s</h2>
          <div className="services">
            <div className="service-card">
              <div className="icon">&#127912;</div>
              <h3>Dessin, peinture et coloriage</h3>
              <p>
                Dessins libres, dessins rigolos ou avec mod&egrave;le. Vos enfants
                pourront explorer leur imagination et repartir avec leurs
                cr&eacute;ations.
              </p>
            </div>
            <div className="service-card">
              <div className="icon">&#129526;</div>
              <h3>P&acirc;te &agrave; modeler</h3>
              <p>
                Activit&eacute;s de modelage avec p&acirc;te &agrave; modeler ou p&acirc;te
                &agrave; sel pour d&eacute;velopper la motricit&eacute; fine et l&apos;imagination.
              </p>
            </div>
            <div className="service-card">
              <div className="icon">&#127925;</div>
              <h3>Chansons et comptines</h3>
              <p>Chants et comptines pour &eacute;veiller l&apos;oreille musicale et le langage des enfants.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tarifs">
        <div className="container">
          <h2 className="section-title">Mes Tarifs</h2>
          <div className="services">
            <div className="service-card">
              <h3>Tarif horaire</h3>
              <p>10&euro; par heure de garde.</p>
            </div>
            <div className="service-card">
              <h3>Forfait journ&eacute;e</h3>
              <p>70&euro; pour une journ&eacute;e compl&egrave;te de 8 heures.</p>
            </div>
            <div className="service-card">
              <h3>R&eacute;duction fratrie</h3>
              <p>10% de r&eacute;duction pour le deuxi&egrave;me enfant et 30% pour le troisi&egrave;me.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
