/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite/plugin");

module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Adjust this path according to your project's structure
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {},
    },
    plugins: [flowbite],
    plugins: [
        // require("daisyui"),
        // require("flowbite/plugin"),
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
