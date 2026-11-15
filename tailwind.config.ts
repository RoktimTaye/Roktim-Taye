import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0a0a0a",
          card: "#141414",
          elevated: "#1a1a1a",
        },
        text: {
          primary: "#ffffff",
          secondary: "#999999",
          muted: "#666666",
        },
        accent: {
          red: "#e63946",
          blue: "#6eb5ff",
          hover: "#ff5a67",
        },
        border: {
          subtle: "#222222",
          card: "#2a2a2a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        "display-xl": "clamp(4.5rem, 13vw, 12.5rem)",
        "display-lg": "clamp(2.5rem, 6vw, 5rem)",
        "cta": "clamp(3.5rem, 10vw, 10rem)",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
