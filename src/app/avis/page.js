"use client"

import {get_data, submit_avis} from "database/avis.data"
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "@/style.css";
import "@/avis.style.css";


const DAY = 24 * 60 * 60 * 1000;
const DEFAULT_AVIS = get_data()

function saveAvis(avis) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(avis));
    window.dispatchEvent(new Event("asmatAvisChange"));
}

function formatDate(value) {
    const date = new Date(value);
    const diffTime = Math.abs(Date.now() - date);
    const diffDays = Math.ceil(diffTime / DAY);

    if (diffDays < 1) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
    return `Il y a ${Math.floor(diffDays / 365)} ans`;
}

function sortAvis(avis, sortType) {
    const avisCopy = [...avis];

    switch (sortType) {
        case "ancien":
            return avisCopy.sort((a, b) => new Date(a.date) - new Date(b.date));
        case "note-high":
            return avisCopy.sort((a, b) => b.rating - a.rating || new Date(b.date) - new Date(a.date));
        case "note-low":
            return avisCopy.sort((a, b) => a.rating - b.rating || new Date(b.date) - new Date(a.date));
        case "recent":
        default:
            return avisCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
}

export default function Avis() {
    const avisSnapshot = useSyncExternalStore(subscribeAvis, getAvisSnapshot, getServerAvisSnapshot);
    const [sortOrder, setSortOrder] = useState("recent");
    const [rating, setRating] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (!showSuccess) return;

        const timeout = setTimeout(() => setShowSuccess(false), 3000);
        return () => clearTimeout(timeout);
    }, [showSuccess]);

    const avis = useMemo(() => JSON.parse(avisSnapshot), [avisSnapshot]);
    const sortedAvis = useMemo(() => sortAvis(avis, sortOrder), [avis, sortOrder]);
    const averageRating = avis.length > 0 ? (avis.reduce((sum, item) => sum + item.rating, 0) / avis.length).toFixed(1) : "0";
    const satisfaction = avis.length > 0 ? Math.round((avis.filter((item) => item.rating >= 4).length / avis.length) * 100) : 0;

    function handleSubmit(event) {
        event.preventDefault();

        if (rating === 0) {
            alert("Veuillez sélectionner une note");
            return;
        }

        const formData = new FormData(event.currentTarget);
        const nouvelAvis = {
            nom: formData.get("nom"),
            email: formData.get("email"),
            rating,
            message: formData.get("message"),
            enfantAge: formData.get("enfantAge"),
            date: new Date().toISOString(),
        };

        saveAvis([...avis, nouvelAvis]);
        setShowSuccess(true);
        setRating(0);
        event.currentTarget.reset();
    }

    return (
        <div className="Avis">
            <Header />
            <section className="page-header">
                <div className="container">
                    <h1>Avis des Parents</h1>
                    <p>Découvrez les témoignages de parents qui nous font confiance</p>
                </div>
            </section>

            <main>
                <div className="container">
                    <div className="stats">
                        <div>
                            <div className="stat-number">{averageRating}★</div>
                            <div className="stat-label">Note Moyenne</div>
                        </div>
                        <div>
                            <div className="stat-number">{avis.length}</div>
                            <div className="stat-label">Avis Total</div>
                        </div>
                        <div>
                            <div className="stat-number">{satisfaction}%</div>
                            <div className="stat-label">Satisfaction</div>
                        </div>
                    </div>

                    <div className="content-wrapper">
                        <div className="avis-section">
                            <h2>📝 Avis des Parents</h2>
                            <div className="sort-section">
                                <span className="sort-label">Trier par :</span>
                                <button className={`sort-btn ${sortOrder === "recent" ? "active" : ""}`} type="button" onClick={() => setSortOrder("recent")}>Plus récents</button>
                                <button className={`sort-btn ${sortOrder === "ancien" ? "active" : ""}`} type="button" onClick={() => setSortOrder("ancien")}>Plus anciens</button>
                                <button className={`sort-btn ${sortOrder === "note-high" ? "active" : ""}`} type="button" onClick={() => setSortOrder("note-high")}>Meilleures notes</button>
                                <button className={`sort-btn ${sortOrder === "note-low" ? "active" : ""}`} type="button" onClick={() => setSortOrder("note-low")}>Notes les plus basses</button>
                            </div>
                            <div className="avis-list">
                                {sortedAvis.length === 0 ? (
                                    <div className="empty-message">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</div>
                                ) : (
                                    sortedAvis.map((item, index) => (
                                        <div className="avis-card" key={`${item.email}-${item.date}-${index}`}>
                                            <div className="avis-header">
                                                <div className="author-info">
                                                    <h3>{item.nom}</h3>
                                                    <div className="date">{formatDate(item.date)}</div>
                                                </div>
                                                <div className="rating" aria-label={`${item.rating} étoiles sur 5`}>
                                                    {Array.from({ length: 5 }, (_, starIndex) => (
                                                        <span className="star" style={{ color: starIndex < item.rating ? "#ffc107" : "#ddd" }} key={starIndex}>★</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="avis-text">{item.message}</div>
                                            {item.enfantAge ? <span className="badge">Enfant : {item.enfantAge}</span> : null}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>✍️ Ajouter un Avis</h2>
                            <div className={`success-message ${showSuccess ? "show" : ""}`}>
                                ✅ Votre avis a été enregistré avec succès !
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nom">Votre Nom *</label>
                                    <input type="text" id="nom" name="nom" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Votre Email *</label>
                                    <input type="email" id="email" name="email" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="enfantAge">Âge de l&apos;enfant</label>
                                    <input type="text" id="enfantAge" name="enfantAge" placeholder="Ex: 2 ans, 18 mois" />
                                </div>

                                <div className="form-group">
                                    <label>Votre Note *</label>
                                    <div className="rating-input">
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <button
                                                className={`star-btn ${value <= rating ? "selected" : ""}`}
                                                key={value}
                                                type="button"
                                                onClick={() => setRating(value)}
                                            >
                                                ★
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Votre Avis *</label>
                                    <textarea id="message" name="message" placeholder="Partagez votre expérience..." required />
                                </div>

                                <button type="submit" className="btn">Envoyer mon Avis</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
