import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,md,mdx}',
    './content/**/*.{md,mdx,yml,yaml,json}',
    './public/admin/**/*.{html,yml}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#TODO',
          primaryFg: '#TODO',
          surface: '#TODO',
          surfaceFg: '#TODO',
          accent: '#TODO',
        },
        neutral: {
          50: '#TODO',
          100: '#TODO',
          200: '#TODO',
          300: '#TODO',
          400: '#TODO',
          500: '#TODO',
          600: '#TODO',
          700: '#TODO',
          800: '#TODO',
          900: '#TODO',
          950: '#TODO',
        },
      },
      fontFamily: {
        heading: ['#TODO', 'sans-serif'],
        body: ['#TODO', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
