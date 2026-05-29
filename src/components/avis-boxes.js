import AvisContainers from "./avis-containers";

export default function Boxes({array}) {
        if (!Array.isArray(array) || array.length === 0) {
        return <div className="empty-message">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</div>
    } else {
            return (
                <div className="avis-section">
                    {array.map((item, index) => (
                        <AvisContainers key={index} array={item} />
                    ))}
                </div>
            );
    }
}