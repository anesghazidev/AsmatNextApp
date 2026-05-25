import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import Hero from "../../components/hero";
import "@/style.css";

export default function Contact() {
  return (
    <div className="contact">
        <Header />
        <Hero href_button1={<a href="#contact" className="btn">Contactez-moi</a>}/>
        <section id="contact">
            <div className="container">
                <h1 className="section-title">Me contacter</h1>
                <ContactForm />
            </div>
        </section>
      <Footer />
    </div>
  );
}
