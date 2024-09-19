/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite/plugin");

module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Adjust this path according to your project's structure
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
            },
            animation: {
                marquee: 'marquee 10s linear infinite',
            },
            boxShadow: {
                'bold': '0px 4px 6px rgba(0, 0, 0, 0.3)',
            },
        },
    },
    plugins: [
        flowbite,
        ({ addUtilities }) => {
            const newUtilities = {
                ".mask-gradient": {
                    WebkitMask:
                        "linear-gradient(0deg, #0000, #000 20% 80%, #0000)",
                },
            };
            addUtilities(newUtilities, ["responsive", "hover"]);
        }        
    ],
};
