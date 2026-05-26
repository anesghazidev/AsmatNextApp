export default function AvisContainers(mongoArray) {
    if (!Array.isArray(mongoArray)) throw new Error("Expected an array of avis");
    else return (
        mongoArray.map((avis) => (
            <div class="avis-card" key={avis._id}>
                <div class="avis-header">
                    <div class="author-info">
                        <h3>{avis.nom}</h3>
                        <div class="date">{avis.date}</div>
                    </div>
                    <div class="rating">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span class="star" key={i}>
                                {i < avis.rating ? "★" : "☆"}
                            </span>
                            ))}
                        </div>
                    </div>
                    <div class="avis-text">{avis.message}</div>
                    <span class="badge">Enfant : {avis.enfantAge}</span>
        </div>
    )
}