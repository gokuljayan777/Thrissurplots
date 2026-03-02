"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoriteButton({ plotId }: { plotId: string }) {
    const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

    const saved = isLoaded && isFavorite(plotId);

    return (
        <button
            onClick={() => toggleFavorite(plotId)}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-sm border border-white/10 text-white hover:bg-white/5 hover:border-gold-500/50 hover:text-gold-400 transition-all font-semibold uppercase tracking-wider text-sm group"
        >
            <Heart className={`w-4 h-4 transition-colors ${saved ? "fill-gold-500 text-gold-500" : "group-hover:text-gold-400"}`} />
            <span className={saved ? "text-gold-500" : ""}>{saved ? "Saved" : "Save"}</span>
        </button>
    );
}
