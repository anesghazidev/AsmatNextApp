export default function AvisContainers({ avis = [] }) {
  if (!Array.isArray(avis)) {
    throw new Error("Expected an array of avis");
  }

  return (
        <div className="avis-card" key={avis._id || avis.email || index}>
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
