export async function saveAvis(avis) {
  try {
    const mod = await import("@/mongodb");
    const connectToDatabase = mod.connectToDatabase || mod.default;
    if (!connectToDatabase) throw new Error("connectToDatabase unavailable");

    const { db } = await connectToDatabase();

    const current = await db.collection("store").findOne({ key: "avis" });
    if (current && !Array.isArray(current.value)) {
      await db.collection("store").updateOne(
        { key: "avis" },
        { $set: { value: [] } }
      );
    }

    const doc = {
      nom: (avis.nom || "").toString(),
      email: (avis.email || "").toString(),
      enfantAge: (avis.enfantAge || "").toString(),
      rating: Math.min(5, Math.max(0, Number(avis.rating) || 0)),
      message: (avis.message || "").toString(),
      date: new Date().toISOString(),
    };

    await db.collection("store").updateOne(
      { key: "avis" },
      { $push: { value: doc } },
      { upsert: true }
    );

    return { ok: true, doc };
  } catch (error) {
    console.error("saveAvis error:", error);
    return { ok: false, error: (error && error.message) || String(error) };
  }
}
