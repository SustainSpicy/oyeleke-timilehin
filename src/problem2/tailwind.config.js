/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#d4d4d8cc",
        blue: "#0f172a",
      },
      padding: {
        custom: "0.5rem",
      },
    },
  },
  plugins: [],
};
