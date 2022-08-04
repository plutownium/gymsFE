/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            height: theme => ({
                "h-15": "60px",
            }),
        },
    },
    plugins: [],
};
