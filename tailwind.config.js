/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        sticky: "#FFFFFF",
        primary: {
          50: "#F5F5FF",
          100: "#eeebfe",
          200: "#AC9CFC",
          300: "#DED7FE",
          400: "#6D60FB",
          500: "#3F1AF9",
          600: "#3215C7",
          700: "#2B178E",
          800: "#171525",
          900: "#171525",
        },
      },
    },
  },
  plugins: [],
};
