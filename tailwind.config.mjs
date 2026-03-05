/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,jsx,mdx}",
        "./src/components/**/*.{js,jsx,mdx}",
        "./src/app/**/*.{js,jsx,mdx}",
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
                },
                navy: {
                    50: '#f0f3ff',
                    100: '#dde4ff',
                    200: '#b8c5ff',
                    300: '#8aa0ff', // Soft blue — visible on dark backgrounds
                    400: '#6b82ff', // Vivid periwinkle-navy — clearly visible on dark
                    500: '#4d64f5', // Rich royal blue
                    600: '#2d41a0', // Darker navy
                    700: '#1a2b80',
                    800: '#0a1254',
                    900: '#00022e', // Brand darkest navy
                },
            },
        },
    },
    plugins: [],
};

export default config;
