"use client";

import { useState } from "react";
import { handleSubmit } from "./actions";

const sortOptions = [
  { value: "recent", label: "Plus récents" },
  { value: "ancien", label: "Plus anciens" },
  { value: "note-high", label: "Meilleures notes" },
  { value: "note-low", label: "Notes les plus basses" },
];

export default function AvisClientForm({ success, errorMessage }) {
  const [rating, setRating] = useState(0);
  const [sortOption, setSortOption] = useState("recent");

  return (
    <div className="content-wrapper">
      <div className="avis-section">
        <h2>📝 Avis des Parents</h2>
        <div className="sort-section">
          <span className="sort-label">Trier par :</span>
          {sortOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`sort-btn ${sortOption === option.value ? "active" : ""}`}
              onClick={() => setSortOption(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="avis-list" id="avisList">
          <div className="empty-message">
            Aucun avis pour le moment. Soyez le premier à partager votre expérience !
          </div>
        </div>
      </div>

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
        <form id="avisForm" action={handleSubmit} method="post">
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
    </div>
  );
}
