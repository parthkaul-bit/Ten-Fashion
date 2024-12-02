const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-dark-bg": "#18191a",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
