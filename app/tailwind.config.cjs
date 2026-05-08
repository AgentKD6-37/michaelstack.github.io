// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                space: '#0a0a1a',
            },
        },
    },
    plugins: [],
};
