/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        galaxy: "url('../../public/background.png')",
      },
      colors: {
        "black-opacity80": "#00000080",
        "white-opacity40": "#ffffff40",
      },
    },
    keyframes: {
      "opening-menu": {
        "0%": {
          transform: "translateY(-25%)",
          opacity: 0,
        },
        "100%": {
          transform: "translateY(0)",
          opacity: 1,
        },
      },
    },
    animation: {
      "menu-open": "opening-menu 0.75s ease-in",
    },
  },
  plugins: [],
};
