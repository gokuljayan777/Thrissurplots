"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { mockProperties } from "@/lib/data/mockData";

export default function FooterFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    const handleLoad = () => {
      if (!mounted) return;
      const stored = localStorage.getItem("thrissur_favorites");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          }
        } catch {
          // ignore
        }
      }
      setIsLoaded(true);
    };

    handleLoad();
    window.addEventListener("favorites-updated", handleLoad);
    return () => {
      mounted = false;
      window.removeEventListener("favorites-updated", handleLoad);
    };
  }, []);

  if (!isLoaded || favorites.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-serif text-white uppercase tracking-widest">
          Saved Plots
        </h3>
        <p className="text-sm text-white/50 italic font-light">No plots saved yet.</p>
      </div>
    );
  }

  const savedPlots = favorites
    .map((id) => mockProperties.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 4); // Show up to 4 favorites

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-serif text-white uppercase tracking-widest">
        Saved Plots
      </h3>
      <ul className="space-y-4 text-sm text-white/60 font-light">
        {savedPlots.map(
          (plot) =>
            plot && (
              <li key={plot.id}>
                <Link
                  href={`/plots/${plot.id}`}
                  className="hover:text-gold-400 transition-colors flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{plot.title}</span>
                  <span className="text-xs text-gold-500/70 group-hover:text-gold-400 flex-shrink-0 whitespace-nowrap">
                    {plot.price}
                  </span>
                </Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}
