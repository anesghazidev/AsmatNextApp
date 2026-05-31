// DB helper will be imported dynamically inside the component
import Header from "@/components/header";
import "@/avis.style.css";
import AvisClientForm from "./AvisClientForm";
import AvisSection from "./AvisSection";
import TemoignageForm from "./TemoignageForm";

export const dynamic = "force-dynamic";

// DB access moved into the component to avoid running at build-time

export default async function Avis({ searchParams }) {
  // connect to DB at request-time (not at build-time)
  let moyenne = 0;
  let totalAvis = 0;
  let satisfaction = 0;
  let avis = [];

  try {
    const { default: connectToDatabase } = await import("@/mongodb");
    const { db } = await connectToDatabase();
    const store = db.collection("store");
    const data = await store.findOne({ key: "avis" });
    const value = data?.value;
    avis = Array.isArray(value)
      ? value
      : value && typeof value === "object"
        ? Object.values(value)
        : [];

    if (Array.isArray(avis) && avis.length) {
      totalAvis = avis.length;
      moyenne = (
        avis.reduce((s, a) => s + (a.rating || 0), 0) / totalAvis
      ).toFixed(1);
      satisfaction = Math.round(
        (avis.filter((a) => (a.rating || 0) >= 4).length / totalAvis) * 100,
      );
    }
  } catch (e) {
    // fail gracefully during build or if DB is unavailable
    console.warn("Avis: DB access skipped or failed", e.message || e);
  }

  const params = await searchParams;
  const success = params?.submitted === "1";
  const errorMessage = params?.error || null;

  return (
    <div className="page">
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
            <AvisSection avis={avis}/>
            <div className="forms-wrapper">
              <AvisClientForm avis={avis} success={success} errorMessage={errorMessage} />
              <TemoignageForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}