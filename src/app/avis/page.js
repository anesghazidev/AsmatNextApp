// DB helper will be imported dynamically inside the component
import Hero from "@/components/hero";
import Nav from "@/components/nav";
import "@/avis.style.css"
import "@/style.css"

export const dynamic = 'force-dynamic';

// DB access moved into the component to avoid running at build-time

export default async function Avis() {
  // connect to DB at request-time (not at build-time)
  let moyenne = 0;
  let totalAvis = 0;
  let satisfaction = 0;

  try {
    const { default: connectToDatabase } = await import("@/mongodb");
    const { db } = await connectToDatabase();
    const store = db.collection("store");
    const data = await store.findOne({ key: "avis" });
    const avis = data?.value || [];

    if (Array.isArray(avis) && avis.length) {
      totalAvis = avis.length;
      moyenne = (
        avis.reduce((s, a) => s + (a.rating || 0), 0) / totalAvis
      ).toFixed(1);
      satisfaction = Math.round(
        (avis.filter(a => (a.rating || 0) >= 4).length / totalAvis) * 100
      );
    }
  } catch (e) {
    // fail gracefully during build or if DB is unavailable
    console.warn('Avis: DB access skipped or failed', e.message || e);
  }

  return (
    <div className="page">
        <Nav />
        <Hero title="Avis clients" />
            <main>
      <div className="container">
        <div className="stats">
          <div>
            <div className="stat-number" id="avgRating">
              {moyenne}★
            </div>
            <div className="stat-label">Note Moyenne</div>
          </div>
          <div>
            <div className="stat-number" id="totalAvis">
              {totalAvis}
            </div>
            <div className="stat-label">Avis Total</div>
          </div>
          <div>
            <div className="stat-number" id="satisfaction">
              {satisfaction}%
            </div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="avis-section">
            <h2>📝 Avis des Parents</h2>
            <div className="sort-section">
              <span className="sort-label">Trier par :</span>
              <button className="sort-btn active" data-sort="recent">
                Plus récents
              </button>
              <button className="sort-btn" data-sort="ancien">
                Plus anciens
              </button>
              <button className="sort-btn" data-sort="note-high">
                Meilleures notes
              </button>
              <button className="sort-btn" data-sort="note-low">
                Notes les plus basses
              </button>
            </div>
            <div className="avis-list" id="avisList">
              <div className="empty-message">
                Aucun avis pour le moment. Soyez le premier à partager votre expérience !
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>✍️ Ajouter un Avis</h2>
            <div className="success-message" id="successMessage">
              ✅ Votre avis a été enregistré avec succès !
            </div>
            <form id="avisForm">
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
                <input type="text" id="enfantAge" placeholder="Ex: 2 ans, 18 mois" />
              </div>

              <div className="form-group">
                <label>Votre Note *</label>
                <div className="rating-input">
                  <button type="button" className="star-btn" data-rating="1">
                    ★
                  </button>
                  <button type="button" className="star-btn" data-rating="2">
                    ★
                  </button>
                  <button type="button" className="star-btn" data-rating="3">
                    ★
                  </button>
                  <button type="button" className="star-btn" data-rating="4">
                    ★
                  </button>
                  <button type="button" className="star-btn" data-rating="5">
                    ★
                  </button>
                </div>
                <input type="hidden" id="rating" name="rating" value="0" />
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
    </main>
    </div>
  );
}
