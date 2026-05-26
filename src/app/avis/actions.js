"use server";
import { redirect } from "next/navigation";

export async function handleSubmit(formData) {
  const values = Object.fromEntries(formData.entries());

  const avisData = {
    nom: values.nom?.toString() || "",
    email: values.email?.toString() || "",
    enfantAge: values.enfantAge?.toString() || "",
    rating: Math.min(5, Math.max(0, Number(values.rating || 0))),
    message: values.message?.toString() || "",
    date: new Date().toISOString(),
  };

  try {
    const mod = await import("@/lib/avis");
    const saveAvis = mod.saveAvis;
    if (typeof saveAvis === "function") {
      const result = await saveAvis(avisData);
      if (result.ok) {
        redirect("/avis?submitted=1");
      }
      redirect(`/avis?error=${encodeURIComponent(result.error || "Échec de l'enregistrement de l'avis")}`);
    }
    redirect(`/avis?error=${encodeURIComponent("saveAvis not available")}`);
  } catch (error) {
    console.error("handleSubmit error:", error);
    redirect(`/avis?error=${encodeURIComponent((error && error.message) || String(error))}`);
  }
}
