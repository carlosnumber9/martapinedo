/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1c0f13',
      },
      boxShadow: {
        custom: '0 2px 4px rgba(255, 255, 255, 0.15)',
      },
    },
  },
  plugins: [],
};
