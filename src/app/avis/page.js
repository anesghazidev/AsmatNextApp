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
    <div className="avis-page">
      <Nav />
      <Hero title="Avis des clients" />
      <div className="avis-content">
        <h2>Note moyenne : {moyenne} / 5</h2>
        <p>Total d'avis : {totalAvis}</p>
        <p>Satisfaction : {satisfaction}% de 4 étoiles ou plus</p>
        {/* Additional UI to display individual reviews could go here */}
      </div>
    </div>
  );
}
