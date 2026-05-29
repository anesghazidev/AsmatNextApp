"use client";

import { useMemo, useState } from "react";
import { handleSubmit } from "./actions";
import Boxes from "@/components/avis-boxes";

const sortOptions = [
  { value: "recent", label: "Plus récents" },
  { value: "ancien", label: "Plus anciens" },
  { value: "note-high", label: "Meilleures notes" },
  { value: "note-low", label: "Notes les plus basses" },
];

export default function AvisClientForm({ avis = [], success, errorMessage }) {
  const [rating, setRating] = useState(0);
  const [sortOption, setSortOption] = useState("recent");

  const sortedAvis = useMemo(() => {
    const list = Array.isArray(avis) ? [...avis] : [];
    return list.sort((a, b) => {
      const aRating = Number(a.rating || 0);
      const bRating = Number(b.rating || 0);
      const aDate = a.date ? new Date(a.date).getTime() : 0;
      const bDate = b.date ? new Date(b.date).getTime() : 0;

      switch (sortOption) {
        case "ancien":
          return aDate - bDate;
        case "note-high":
          return bRating - aRating;
        case "note-low":
          return aRating - bRating;
        case "recent":
        default:
          return bDate - aDate;
      }
    });
  }, [avis, sortOption]);

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
          <Boxes array={sortedAvis} />
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
        <form id="avisForm" action={handleSubmit} method="POST">
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
    </div>
  );
}
