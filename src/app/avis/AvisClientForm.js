"use client";

import { useState } from "react";
import { handleSubmit } from "./actions";

export default function AvisClientForm({ avis = [], success, errorMessage }) {
  const [rating, setRating] = useState(0);
  return (
    <div className="form-section">
      <h2>✍️ Ajouter un Avis</h2>
      {success && (
        <div className="success-message" id="successMessage">
          ✅ Votre avis a été enregistré avec succès !
        </div>
      )}
      {errorMessage && (
        <div className="error-message" id="errorMessage">
          ⚠️ {errorMessage}
        </div>
      )}
      <form id="avisForm" action={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">Votre Nom *</label>
            <input type="text" id="nom" name="nom" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Votre Email *</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="enfantAge">Âge de l'enfant</label>
            <input type="text" id="enfantAge" name="enfantAge" placeholder="Ex: 2 ans, 18 mois" />
          </div>

          <div className="form-group">
            <label>Votre Note *</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`star-btn ${rating >= value ? "active" : ""}`}
                  onClick={() => setRating(value)}
                  aria-pressed={rating === value}
                >
                  ★
                </button>
              ))}
            </div>
            <input type="hidden" id="rating" name="rating" value={rating} />
          </div>

          <div className="form-group">
            <label htmlFor="message">Votre Avis *</label>
            <textarea
              id="message"
              name="message"
              placeholder="Partagez votre expérience..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn">
            Envoyer mon Avis
          </button>
        </form>
      </div>
  );
}
