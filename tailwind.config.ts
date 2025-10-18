import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,md,mdx}",
    "./content/**/*.{md,mdx,yml,yaml,json}",
    "./public/admin/**/*.{html,yml}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // troca estes dois quando tiveres os HEX oficiais do PDF
          primary: "#3B82F6",
          primaryFg: "#111111",
          surface: "#FFFFFF",
          surfaceFg: "#111111",
          accent: "#F59E0B",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F2F2F2",
          200: "#E6E6E6",
          300: "#D1D1D1",
          400: "#B2B2B2",
          500: "#8F8F8F",
          600: "#707070",
          700: "#575757",
          800: "#3B3B3B",
          900: "#242424",
          950: "#0F0F0F",
        },
      },
      fontFamily: {
        heading: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
