module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#22c55e",
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        brand: {
          dark: "#0f172a",
          accent: "#0ea5e9",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 10px 30px -15px rgba(15, 118, 110, 0.4)",
      },
    },
  },
  plugins: [],
};


