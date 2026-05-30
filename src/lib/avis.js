"use server";

export async function saveAvis(avis) {
  try {
    const mod = await import("@/mongodb");
    const connectToDatabase = mod.connectToDatabase || mod.default;
    if (!connectToDatabase) throw new Error("connectToDatabase unavailable");

    const { db } = await connectToDatabase();

    const current = await db.collection("store").findOne({ key: "avis" });
    if (current && !Array.isArray(current.value)) {
      const normalizedValue = current.value && typeof current.value === "object"
        ? Object.values(current.value)
        : [];
      await db.collection("store").updateOne(
        { key: "avis" },
        { $set: { value: normalizedValue } }
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

export async function saveTemoignage(temoignage) {
  try {
    const mod = await import("@/mongodb");
    const connectToDatabase = mod.connectToDatabase || mod.default;
    if (!connectToDatabase) throw new Error("connectToDatabase unavailable");

    const { db } = await connectToDatabase();

    const current = await db.collection("store").findOne({ key: "temoignage" });
    if (current && !Array.isArray(current.value)) {
      const normalizedValue = current.value && typeof current.value === "object"
        ? Object.values(current.value)
        : [];
      await db.collection("store").updateOne(
        { key: "temoignage" },
        { $set: { value: normalizedValue } }
      );
    }

    const doc = {
      nom: (temoignage.nom || "").toString(),
      message: (temoignage.message || "").toString(),
    };

    await db.collection("store").updateOne(
      { key: "temoignage" },
      { $push: { value: doc } },
      { upsert: true }
    );

    return { ok: true, doc };
  } catch (error) {
    console.error("saveAvis error:", error);
    return { ok: false, error: (error && error.message) || String(error) };
  }
}
