import { saveTemoignage } from "@/lib/avis";
import "@/avis.style.css";

export default function TemoignageForm() {
  return (
    <div className="content-wrapper">
      <div className="form-section">
        <h2>✍️ Témoignager</h2>
        <form id="avisForm" action={saveTemoignage}>
          <div className="form-group">
            <label htmlFor="nom">Votre Nom *</label>
            <input type="text" id="nom" name="nom" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Votre témoignage *</label>
            <textarea
              id="message"
              name="message"
              placeholder="Partagez votre expérience..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn">
            Envoyer mon témoignage
          </button>
        </form>
      </div>
    </div>
  );
}