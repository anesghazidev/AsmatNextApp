export default function AvisContainers({ avis = {} }) {
  if (!avis || typeof avis !== "object" || Array.isArray(avis)) {
    return (
      <div className="avis-card empty">
        <div className="avis-text">Avis invalide ou manquant.</div>
      </div>
    );
  }

  return (
        <div className="avis-card">
          <div className="avis-header">
            <div className="author-info">
              <h3>{avis.nom || "Parent"}</h3>
              <div className="date">{avis.date || "Date inconnue"}</div>
            </div>
            <div className="rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span className="star" key={i}>
                  {i < (avis.rating || 0) ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
          <div className="avis-text">{avis.message || "Aucun message"}</div>
          <span className="badge">Enfant : {avis.enfantAge || "non précisé"}</span>
        </div>
  );
}
