/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1A2B4A",
          deep: "#0F1E35",
          mid: "#243554",
        },
        teal: {
          DEFAULT: "#0A8F8F",
          hover: "#0DA8A8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
