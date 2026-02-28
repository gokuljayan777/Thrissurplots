import type { Config } from "tailwindcss";

// Note: Next.js + Tailwind v4 uses globals.css for configuration via @theme inline.
// This config exists for backward compatibility if needed.
const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                gold: {
                    50: '#fdfaee',
                    100: '#fbf3d5',
                    200: '#f5e4ab',
                    300: '#efcf7a',
                    400: '#eab84f',
                    500: '#e5a12d', // Primary Gold accent
                    600: '#cd8321',
                    700: '#aa611c',
                    800: '#8c4e1d',
                    900: '#73411b',
                }
            },
        },
    },
    plugins: [],
};

export default config;
