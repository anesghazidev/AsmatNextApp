import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import "@/style.css";

export default function Programme() {
    return (
        <div className="Programme">
            <Header/>
            <Hero href_button1={<a href="#programme" className="btn">Programme</a>}/>
            <section id="programme">
                <div className="container">
                    <h2 className="section-title">Programme Hebdomadaire</h2>
                    <div className="services">
                        <div className="service-card">
                            <h3>Lundi</h3>
                            <p>Activités créatives et jeux de société.</p>
                            <ul>
                                <li>10h - Ateliers de dessin et peinture</li>
                                <li>11h - Repas du midi</li>
                                <li>12h à 15h - sieste</li>
                                <li>16h - Jeux éducatifs</li>
                            </ul>
                        </div>
                        <div className="service-card">
                            <h3>Mardi</h3>
                            <p>Chansons et comptines.</p>
                        </div>
                        <div className="service-card">
                            <h3>Mercredi</h3>
                            <p>Pâte à modeler et peinture.</p>
                        </div>
                        <div className="service-card">
                            <h3>Jeudi</h3>
                            <p>Sorties en plein air et nature.</p>
                        </div>
                        <div className="service-card">
                            <h3>Vendredi</h3>
                            <p>Routines de fin de semaine et réflexion sur la semaine passée.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}
