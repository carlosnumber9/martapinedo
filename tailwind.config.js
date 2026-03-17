/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-bg": "pulse-bg 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-bg": {
          "0%, 100%": { backgroundColor: "#113240" },
          "50%": { backgroundColor: "#1c0f13" },
        },
      },
      colors: {
        darkPrimary: "#1c0f13",
        darkSecondary: "#113240",
        bluePrimary: "#120d44",
        blueSecondary: "#5ef1f1",
        reddy: "#ee7c7c",
      },
      boxShadow: {
        custom: "0 2px 4px rgba(255, 255, 255, 0.15)",
        contact: "0 0 15px rgba(255, 255, 255, 0.3)",
      },
      fontFamily: {
        main: ["var(--font-main)", "sans-serif"],
        subtitle: ["var(--font-subtitle)", "sans-serif"],
        body: ["var(--font-body)", "serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["4rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addBase }) {
      addBase({
        "html, body": {
          overflowX: "hidden",
          maxWidth: "100vw",
        },
        "img, video, iframe, embed, object, div": {
          maxWidth: "100%",
          height: "auto",
        },
      });
    },
  ],
};
