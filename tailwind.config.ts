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
        /* AxonVortex Brand Guidelines Version 2.0 Official Colors */
        void: {
          DEFAULT: "#0F2747",
          deep: "#09172B",
          dark: "#0B1D36",
          surface: "rgba(15, 39, 71, 0.75)",
        },
        glassNavy: {
          DEFAULT: "#2D5BB9",
          dark: "#1E428F",
          light: "#3E6DCF",
          subtle: "rgba(45, 91, 185, 0.15)",
        },
        electricBlue: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
          glow: "rgba(59, 130, 246, 0.45)",
          subtle: "rgba(59, 130, 246, 0.15)",
        },
        amberGold: {
          DEFAULT: "#F4BA00",
          hover: "#DFA700",
          glow: "rgba(244, 186, 0, 0.45)",
          subtle: "rgba(244, 186, 0, 0.15)",
        },
        softWhite: {
          DEFAULT: "#EFECE4",
          muted: "rgba(239, 236, 228, 0.8)",
          subtle: "rgba(239, 236, 228, 0.55)",
        },
        mutedGray: {
          DEFAULT: "#9AA3B2",
          dark: "#7B8596",
          light: "#B8C1D0",
        },
        charcoal: {
          base: "#121519",
          surface: "#181C21",
          raised: "#20252B",
          recessed: "#0D1014",
          border: "rgba(239, 236, 228, 0.1)",
        },

        /* Semantic Design System Mappings */
        brand: {
          void: "#0F2747",
          glassNavy: "#2D5BB9",
          electricBlue: "#3B82F6",
          amberGold: "#F4BA00",
          softWhite: "#EFECE4",
          mutedGray: "#9AA3B2",
          red: "#3B82F6", // mapped to brand blue to prevent rogue red
          yellow: "#F4BA00",
          blue: "#2D5BB9",
          gray: "#9AA3B2",
          slate: "#0F2747",
          black: "#081628",
          white: "#EFECE4",
          turquoise: "#3B82F6",
          coral: "#F4BA00",
          "warm-yellow": "#F4BA00",
          navy: "#0F2747",
          surface: "rgba(15, 39, 71, 0.72)",
        },
        primary: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
          contrast: "#EFECE4",
        },
        secondary: {
          DEFAULT: "#2D5BB9",
          hover: "#1E428F",
          contrast: "#EFECE4",
        },
        highlight: {
          DEFAULT: "#F4BA00",
          hover: "#DFA700",
          contrast: "#081628",
        },
        surface: {
          DEFAULT: "rgba(15, 39, 71, 0.72)",
          glass: "rgba(15, 39, 71, 0.55)",
          elevated: "rgba(25, 52, 92, 0.65)",
          muted: "rgba(45, 91, 185, 0.15)",
        },
        border: {
          DEFAULT: "rgba(45, 91, 185, 0.28)",
          subtle: "rgba(239, 236, 228, 0.08)",
          prominent: "rgba(59, 130, 246, 0.45)",
          amber: "rgba(244, 186, 0, 0.45)",
        },
        editorial: {
          primary: "#EFECE4",
          secondary: "#9AA3B2",
          muted: "rgba(154, 163, 178, 0.75)",
        },
      },
      fontFamily: {
        primary: ["var(--font-poppins)", "Poppins", "-apple-system", "sans-serif"],
        heading: ["var(--font-poppins)", "Poppins", "-apple-system", "sans-serif"],
        headline: ["var(--font-poppins)", "Poppins", "-apple-system", "sans-serif"],
        display: ["var(--font-poppins)", "Poppins", "-apple-system", "sans-serif"],
        body: ["var(--font-poppins)", "Poppins", "-apple-system", "sans-serif"],
        sans: ["var(--font-poppins)", "Poppins", "-apple-system", "sans-serif"],
        button: ["var(--font-poppins)", "Poppins", "-apple-system", "sans-serif"],
        label: ["var(--font-poppins)", "Poppins", "-apple-system", "sans-serif"],
        mono: ["var(--font-space-mono)", "Space Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "level-0": "none",
        "level-1": "inset 0 2px 4px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(0, 0, 0, 0.8), 0 1px 0 rgba(239, 236, 228, 0.04)",
        "level-2": "0 4px 14px -2px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(239, 236, 228, 0.12)",
        "level-3": "0 12px 28px -4px rgba(0, 0, 0, 0.65), 0 4px 10px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(239, 236, 228, 0.16)",
        "level-4": "0 24px 56px -8px rgba(0, 0, 0, 0.85), 0 8px 18px -4px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(239, 236, 228, 0.2)",
        "blue-glow": "0 0 24px rgba(59, 130, 246, 0.35), 0 8px 24px -4px rgba(5, 15, 30, 0.6), inset 0 1px 0 rgba(239, 236, 228, 0.2)",
        "blue-glow-subtle": "0 0 14px rgba(59, 130, 246, 0.2), 0 4px 12px -2px rgba(5, 15, 30, 0.5)",
        "amber-glow": "0 0 24px rgba(244, 186, 0, 0.35), 0 8px 24px -4px rgba(5, 15, 30, 0.6), inset 0 1px 0 rgba(239, 236, 228, 0.2)",
        "amber-glow-subtle": "0 0 14px rgba(244, 186, 0, 0.22), 0 4px 12px -2px rgba(5, 15, 30, 0.5)",
      },
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
        full: "9999px",
      },
      zIndex: {
        base: "1",
        content: "10",
        elevated: "20",
        sticky: "40",
        overlay: "50",
        modal: "60",
        loader: "100",
        cursor: "9999",
      },
    },
  },
  plugins: [],
};

export default config;
