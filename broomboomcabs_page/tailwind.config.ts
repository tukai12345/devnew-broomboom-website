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
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // Primary Yellow / Amber
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          dark: "#0b0f17",
          charcoal: "#121824",
        },
        yellow: {
          brand: "#FFB800",
          hover: "#E6A600",
          glow: "#FFD043",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      boxShadow: {
        mmt: "0 1px 7px 0 rgba(0, 0, 0, 0.15)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.08)",
        elevated: "0 10px 30px -4px rgba(245, 158, 11, 0.2)",
        search: "0 10px 40px rgba(0, 0, 0, 0.25)",
        yellowGlow: "0 8px 24px -2px rgba(245, 158, 11, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
