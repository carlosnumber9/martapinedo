/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        darkPrimary: '#1c0f13',
        darkSecondary: '#113240',
        bluePrimary: '#120d44',
        blueSecondary: '#5ef1f1',
        reddy: '#ee7c7c',
      },
      boxShadow: {
        custom: '0 2px 4px rgba(255, 255, 255, 0.15)',
        contact: '0 0 15px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
};
