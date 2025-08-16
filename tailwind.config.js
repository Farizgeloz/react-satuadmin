/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
      },
      backgroundImage: {
        'hero-image': "url('./assets/bg_1.jpg')",
        'hero-image2': "url('./assets/polygonal19.jpg')",
      },
    },
  },
  plugins: [],
}

