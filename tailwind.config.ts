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
        brand: {
          turquoise: "var(--brand-turquoise)",
          coral: "var(--brand-coral)",
          "warm-yellow": "var(--brand-warm-yellow)",
          navy: "var(--brand-navy)",
          surface: "var(--brand-surface)",
          white: "var(--brand-white)",
        },
        background: {
          DEFAULT: "var(--brand-white)",
          dark: "var(--brand-navy)",
          base: "var(--brand-white)",
          muted: "var(--brand-surface)",
        },
        surface: {
          DEFAULT: "var(--brand-white)",
          muted: "var(--brand-surface)",
          elevated: "var(--brand-white)",
        },
        charcoal: {
          DEFAULT: "var(--brand-navy)",
          surface: "rgba(30, 30, 46, 0.92)",
          elevated: "#2A2A3D",
          muted: "rgba(30, 30, 46, 0.75)",
        },
        editorial: {
          primary: "var(--brand-navy)",
          secondary: "#4A4A5A",
          muted: "#6B7280",
        },
        border: {
          DEFAULT: "rgba(30, 30, 46, 0.12)",
          subtle: "rgba(30, 30, 46, 0.06)",
          bright: "var(--brand-turquoise)",
        },
        accent: {
          primary: "var(--accent-primary)",
          secondary: "var(--accent-secondary)",
          warm: "var(--accent-warm)",
        },
        /* Core Palette Exposing for legacy where not yet updated */
        orange: "var(--brand-coral)", // changed from turquoise to actual coral now
        gold: "var(--brand-warm-yellow)",
        sand: "var(--brand-surface)",
        slate: "var(--brand-navy)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Poppins", "sans-serif"],
        headline: ["var(--font-heading)", "Poppins", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["var(--font-body)", "Inter", "sans-serif"],
        label: ["var(--font-body)", "Inter", "sans-serif"],
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
