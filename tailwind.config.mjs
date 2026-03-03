/** @type {import('tailwindcss').Config} */
const config = {
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
                }
            },
        },
    },
    plugins: [],
};

export default config;
