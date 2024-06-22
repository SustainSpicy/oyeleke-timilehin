/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#d4d4d8cc",
        blue: "#0f172a"
      },
      padding: {
        custom: "0.5rem"
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(10px)" }
        }
      },
      animation: {
        shake: "shake 0.3s ",
        bounce: "transform transition-transform duration-300"
      }
    }
  },
  plugins: []
}
