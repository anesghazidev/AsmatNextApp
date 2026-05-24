import Avis from "./avis.model.js";
import fs from "node:fs";

const dataPath = new URL("./avis.data.json", import.meta.url);

export function submit_avis(array) {
    const avis = new Avis(
        array.name ?? array.nom,
        array.email,
        array.rating,
        array.date ?? new Date().toISOString(),
        array.message,
        array.enfantAge
    );
    avis.submit(dataPath);
}

export function get_data() {
    try {
        const fileContent = fs.readFileSync(dataPath, "utf-8").trim();
        return fileContent ? JSON.parse(fileContent) : [];
    } catch (error) {
        console.error("Erreur lecture avis.data.json:", error);
        return [];
    }
}
