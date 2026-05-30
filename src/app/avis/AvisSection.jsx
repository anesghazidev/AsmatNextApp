"use client"
import { useMemo, useState } from "react";
import Boxes from "@/components/avis-boxes";

const sortOptions = [
  { value: "recent", label: "Plus récents" },
  { value: "ancien", label: "Plus anciens" },
  { value: "note-high", label: "Meilleures notes" },
  { value: "note-low", label: "Notes les plus basses" },
];

export default function AvisSection({avis = []}){
      const [rating, setRating] = useState(0);
      const [sortOption, setSortOption] = useState("recent");
    
      const sortedAvis = useMemo(() => {
        const list = Array.isArray(avis) ? [...avis] : [];
        return list.sort((a, b) => {
          const aRating = Number(a.rating || 0);
          const bRating = Number(b.rating || 0);
          const aDate = a.date ? new Date(a.date).getTime() : 0;
          const bDate = b.date ? new Date(b.date).getTime() : 0;
    
          switch (sortOption) {
            case "ancien":
              return aDate - bDate;
            case "note-high":
              return bRating - aRating;
            case "note-low":
              return aRating - bRating;
            case "recent":
            default:
              return bDate - aDate;
          }
        });
      }, [avis, sortOption]);
    
    return(
        <div className="avis-section">
                <h2>📝 Avis des Parents</h2>
                <div className="sort-section">
                  <span className="sort-label">Trier par :</span>
                  {sortOptions.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={`sort-btn ${sortOption === option.value ? "active" : ""}`}
                      onClick={() => setSortOption(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
        
                <div className="avis-list" id="avisList">
                  <Boxes array={sortedAvis} />
                </div>
            </div>
    )
}