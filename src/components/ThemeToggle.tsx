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
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9 border-white/10 border bg-[#111] rounded-full shadow-sm" />; // Placeholder
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative inline-flex items-center justify-center p-2 rounded-full border border-gray-200 dark:border-white/10 dark:bg-[#111] bg-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group"
            aria-label="Toggle Theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-gold-400" />
        </button>
    );
}
