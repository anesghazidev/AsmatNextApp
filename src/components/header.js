import Image from "next/image";
import favicon from "@/images/favicon-96x96.png";
import "@/style.css";

export default function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <a href="/home" className="logo"><Image src={favicon} alt="" width={48} height={48} /> AsmatMaman</a>
          <ul>
            <li><a href="/home">Accueil</a></li>
            <li><a href="/about">À propos</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/avis">Avis</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/programme">Programme</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
