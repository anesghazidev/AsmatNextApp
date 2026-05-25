// DB helper will be imported dynamically inside the component
import "@/avis.style.css"
import "@/style.css"

export const dynamic = 'force-dynamic';

// DB access moved into the component to avoid running at build-time

export default async function Avis() {
        // connect to DB at request-time (not at build-time)
        let moyenne = 0
        let totalAvis = 0
        let satisfaction = 0
        try {
            const { default: connectToDatabase } = await import("@/mongodb");
            const { db } = await connectToDatabase();
            const store = db.collection("store");
            const data = await store.findOne({ key: "avis" });
            const avis = data?.value || [];
            // compute simple stats if avis is an array
            if (Array.isArray(avis) && avis.length) {
                totalAvis = avis.length;
                moyenne = (
                    avis.reduce((s, a) => s + (a.rating || 0), 0) / totalAvis
                ).toFixed(1);
                satisfaction = Math.round((avis.filter(a => (a.rating || 0) >= 4).length / totalAvis) * 100);
            }
        } catch (e) {
            // fail gracefully during build or if DB is unavailable
            console.warn('Avis: DB access skipped or failed', e.message || e);
        }
        return (
                <main>
        <div class="container">
            <div class="stats">
                <div>
                    <div class="stat-number" id="avgRating">{moyenne}★</div>
                    <div class="stat-label">Note Moyenne</div>
                </div>
                <div>
                    <div class="stat-number" id="totalAvis">{totalAvis}</div>
                    <div class="stat-label">Avis Total</div>
                </div>
                <div>
                    <div class="stat-number" id="satisfaction">{satisfaction}%</div>
                    <div class="stat-label">Satisfaction</div>
                </div>
            </div>

            <div class="content-wrapper">
                <div class="avis-section">
                    <h2>📝 Avis des Parents</h2>
                    <div class="sort-section">
                        <span class="sort-label">Trier par :</span>
                        <button class="sort-btn active" data-sort="recent">Plus récents</button>
                        <button class="sort-btn" data-sort="ancien">Plus anciens</button>
                        <button class="sort-btn" data-sort="note-high">Meilleures notes</button>
                        <button class="sort-btn" data-sort="note-low">Notes les plus basses</button>
                    </div>
                    <div class="avis-list" id="avisList">
                        <div class="empty-message">Aucun avis pour le moment. Soyez le premier à partager votre expérience !</div>
                    </div>
                </div>

                <div class="form-section">
                    <h2>✍️ Ajouter un Avis</h2>
                    <div class="success-message" id="successMessage">
                        ✅ Votre avis a été enregistré avec succès !
                    </div>
                    <form id="avisForm" action={handleSubmit()}>
                        <div class="form-group">
                            <label for="nom">Votre Nom *</label>
                            <input type="text" id="nom" name="nom" required />
                        </div>

                        <div class="form-group">
                            <label for="email">Votre Email *</label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        <div class="form-group">
                            <label for="enfantAge">Âge de l'enfant</label>
                            <input type="text" id="enfantAge" placeholder="Ex: 2 ans, 18 mois" />
                        </div>

                        <div class="form-group">
                            <label>Votre Note *</label>
                            <div class="rating-input">
                                <button type="button" class="star-btn" data-rating="1">★</button>
                                <button type="button" class="star-btn" data-rating="2">★</button>
                                <button type="button" class="star-btn" data-rating="3">★</button>
                                <button type="button" class="star-btn" data-rating="4">★</button>
                                <button type="button" class="star-btn" data-rating="5">★</button>
                            </div>
                            <input type="hidden" id="rating" name="rating" value="0"/>
                        </div>

                        <div class="form-group">
                            <label for="message">Votre Avis *</label>
                            <textarea id="message" name="message" placeholder="Partagez votre expérience..." required></textarea>
                        </div>

                        <button type="submit" class="btn">Envoyer mon Avis</button>
                    </form>
                </div>
            </div>
        </div>
    </main>
  )}