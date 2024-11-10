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
      fontFamily: {
        sans: ['var(--font-main)', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
};
