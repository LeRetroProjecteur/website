module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ["retro-gray"]: "#6A6A6D",
        ["retro-black"]: "#030303",
        ["retro-green"]: "#E2FF46",
      },
      fontFamily: {
        degular: ["var(--font-degular)"],
        suisse: ["var(--font-suisse)"],
      },
    },
  },
  plugins: [],
};
