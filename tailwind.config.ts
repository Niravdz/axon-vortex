import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FFF8EC",
          dark: "#0F2747",
          base: "#FFF8EC",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "rgba(255, 248, 236, 0.85)",
          elevated: "#FFFFFF",
        },
        charcoal: {
          DEFAULT: "#0F2747",
          surface: "rgba(15, 39, 71, 0.92)",
          elevated: "#1A365D",
          muted: "rgba(15, 39, 71, 0.75)",
        },
        editorial: {
          primary: "#0F2747",
          secondary: "#2C3E55",
          muted: "#64748B",
        },
        border: {
          DEFAULT: "rgba(15, 39, 71, 0.12)",
          subtle: "rgba(15, 39, 71, 0.06)",
          bright: "#FF8A00",
        },
        accent: {
          orange: "#FF8A00",
          gold: "#F4C430",
        },
        brand: {
          orange: "#FF8A00",
          gold: "#F4C430",
          sand: "#FFF8EC",
          gray: "#E9EDF2",
          slate: "#0F2747",
          black: "#0A1424",
        },
      },
      fontFamily: {
        sans: ["var(--font-primary)", "Poppins", "sans-serif"],
        heading: ["var(--font-primary)", "Poppins", "sans-serif"],
        body: ["var(--font-primary)", "Poppins", "sans-serif"],
        mono: ["var(--font-primary)", "Poppins", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.06em",
        widest: "0.12em",
      },
      zIndex: {
        behind: "-1",
        canvas: "0",
        base: "1",
        content: "10",
        header: "50",
        modal: "100",
        loader: "9998",
        cursor: "9999",
      },
    },
  },
  plugins: [],
};

export default config;
