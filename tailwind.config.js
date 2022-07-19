/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        anilist: {
          300: "hsl(200, 95%, 60%)",
          400: "hsl(200, 100%, 50%)",
          500: "hsl(200, 92%, 42%)",
          600: "hsl(200, 98%, 39%)",
          700: "hsl(200, 96%, 32%)",
        },
        annict: {
          300: "hsl(349, 86%, 70%)",
          400: "hsl(351, 93%, 67%)",
          500: "hsl(353, 71%, 56%)",
          600: "hsl(355, 72%, 48%)",
          700: "hsl(357, 74%, 40%)",
          // 2: "#D51C5B", // dark
        },
      },
    },
  },
  plugins: [],
};
