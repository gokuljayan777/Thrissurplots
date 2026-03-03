"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    try {
      const stored = localStorage.getItem("thrissur_favorites");
      if (stored && mounted) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse favorites", e);
    } finally {
      if (mounted) setIsLoaded(true);
    }

    return () => {
      mounted = false;
    };
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id];
      localStorage.setItem("thrissur_favorites", JSON.stringify(next));
      // Defer dispatch to avoid "Cannot update a component while rendering a different component" error
      setTimeout(() => {
        window.dispatchEvent(new Event("favorites-updated"));
      }, 0);
      return next;
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
