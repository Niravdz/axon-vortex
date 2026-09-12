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
          red: "var(--brand-red)",
          yellow: "var(--brand-yellow)",
          blue: "var(--brand-blue)",
          gray: "var(--brand-gray)",
          slate: "var(--brand-slate)",
          black: "var(--brand-black)",
          white: "var(--brand-white)",
          /* Mappings for legacy compatibility */
          turquoise: "var(--brand-blue)",
          coral: "var(--brand-red)",
          "warm-yellow": "var(--brand-yellow)",
          navy: "var(--brand-slate)",
          surface: "var(--brand-gray)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "#d92c24",
          contrast: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "#244d87",
          contrast: "#FFFFFF",
        },
        highlight: {
          DEFAULT: "var(--color-highlight)",
          hover: "#f5c633",
          contrast: "#090909",
        },
        slate: {
          DEFAULT: "var(--brand-slate)",
          surface: "#173359",
          muted: "rgba(15, 39, 71, 0.75)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          subtle: "rgba(9, 9, 9, 0.6)",
          muted: "rgba(9, 9, 9, 0.4)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          muted: "var(--color-muted)",
          elevated: "var(--color-surface)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          subtle: "var(--brand-gray)",
          thick: "var(--color-border)",
        },
        sand: "var(--brand-gray)",
        charcoal: {
          DEFAULT: "var(--brand-slate)",
          surface: "rgba(15, 39, 71, 0.95)",
          elevated: "#153560",
          muted: "rgba(15, 39, 71, 0.75)",
        },
        editorial: {
          primary: "var(--color-ink)",
          secondary: "var(--brand-slate)",
          muted: "#4A5568",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Poppins", "sans-serif"],
        headline: ["var(--font-heading)", "Poppins", "sans-serif"],
        display: ["var(--font-heading)", "Poppins", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        label: ["var(--font-body)", "Inter", "sans-serif"],
      },
      boxShadow: {
        "hard-xs": "1px 1px 0px 0px #090909",
        "hard-sm": "2px 2px 0px 0px #090909",
        "hard-md": "4px 4px 0px 0px #090909",
        "hard-lg": "6px 6px 0px 0px #090909",
        "hard-xl": "8px 8px 0px 0px #090909",
        "hard-white": "4px 4px 0px 0px #FFFFFF",
        "hard-red": "4px 4px 0px 0px #F23B32",
        "hard-blue": "4px 4px 0px 0px #2F5FA7",
        "hard-yellow": "4px 4px 0px 0px #FFD447",
      },
      borderWidth: {
        DEFAULT: "1px",
        "2": "2px",
        "3": "3px",
        "4": "4px",
        "6": "6px",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "0px",
        md: "4px",
        full: "9999px",
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
