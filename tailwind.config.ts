import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.retro-gray"),
      }),
      borderWidth: {
        DEFAULT: "1.5px",
      },
      colors: {
        ["retro-gray"]: "#6A6A6D",
        ["retro-black"]: "#030303",
        ["retro-green"]: "#E2FF46",
        ["retro-pale-green"]: "#E2FF4666",
      },
      fontFamily: {
        degular: ["var(--font-degular)"],
        suisse: ["var(--font-suisse)"],
      },
      gap: {
        "20px": `${20 / 16}rem`,
        "10px": `${10 / 16}rem`,
        "5px": `${5 / 16}rem`,
      },
      height: {
        "640px": `${640 / 16}rem`,
        "14px": `${14 / 16}rem`,
        "10px": `${10 / 16}rem`,
      },
      padding: {
        "32px": `${32 / 16}rem`,
        "28px": `${28 / 16}rem`,
        "20px": `${20 / 16}rem`,
        "19px": `${19 / 16}rem`,
        "16px": `${16 / 16}rem`,
        "18px": `${18 / 16}rem`,
        "12px": `${12 / 16}rem`,
        "10px": `${10 / 16}rem`,
        "6px": `${6 / 16}rem`,
      },
      width: {
        "278px": `${278 / 16}rem`,
        "25px": `${25 / 16}rem`,
        "19px": `${19 / 16}rem`,
        "13px": `${13 / 16}rem`,
      },
    },
  },
  plugins: [forms],
};
export default config;
