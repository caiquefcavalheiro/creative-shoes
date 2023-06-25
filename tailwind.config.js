/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1800px",
      },
      backgroundImage: {
        galaxy: "url('../../public/background.png')",
      },
      colors: {
        "black-opacity95": "#00000095",
        "black-opacity90": "#000000c4",
        "black-opacity60": "#00000060",
        "white-opacity40": "#ffffff40",
      },
      margin: {
        "margin-0-auto": "0 auto",
        "margin-60-auto": "60px auto",
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
      "show-modal": {
        "0%": {
          opacity: 0,
          transform: "translateY(-25%)",
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    },
    animation: {
      "menu-open": "opening-menu 0.75s ease-in",
      "modal-appear": "show-modal 1s ease",
      "modal-dissapear": "show-modal 1s ease reverse",
    },
  },
  plugins: [],
};
