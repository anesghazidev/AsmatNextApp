export default function AvisContainers({ avis = [] }) {
  if (!Array.isArray(avis)) {
    throw new Error("Expected an array of avis");
  }

  return (
    <>
      {avis.map((item, index) => (
        <div className="avis-card" key={item._id || item.email || index}>
          <div className="avis-header">
            <div className="author-info">
              <h3>{item.nom || "Parent"}</h3>
              <div className="date">{item.date || "Date inconnue"}</div>
            </div>
            <div className="rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span className="star" key={i}>
                  {i < (item.rating || 0) ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
          <div className="avis-text">{item.message || "Aucun message"}</div>
          <span className="badge">Enfant : {item.enfantAge || "non précisé"}</span>
        </div>
      ))}
    </>
  );
}
