"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by rendering only after mounting
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 border-white/10 border bg-[#111] rounded-full shadow-sm" />
    ); // Placeholder
  }

  const currentTheme = theme === 'system' ? undefined : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "light" : "dark")}
      className="relative inline-flex items-center justify-center p-2 rounded-full border border-gray-200 dark:border-white/10 dark:bg-[#111] bg-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
      aria-label="Toggle Theme"
    >
      {/* We use next-themes 'theme' state. If it resolves to light, show Sun. If dark, show Moon. */}
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all text-yellow-500" />
      ) : theme === "dark" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all text-gold-400" />
      ) : (
        /* Fallbacks if 'system' theme is explicitly set in next-themes */
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all hidden dark:block text-yellow-500" />
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all block dark:hidden text-slate-800" />
        </>
      )}
    </button>
  );
}
