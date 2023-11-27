import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "desktop": "980px"
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(180deg, #FEB76B 0%, #FE7BC2 47.92%, #BF95F9 100%);"
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(5px)" },
          "50%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        shake: "shake 500ms linear",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dracula"],
  },
};
export default config;
