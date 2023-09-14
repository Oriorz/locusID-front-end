/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          /* "0%, 100%": { transform: "rotate(-3deg)" }, */
          "0%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(-3deg)" },
          "100%": { transform: "rotate(-3deg)" },
        },
        fullSpin: {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        fullSpin: "fullSpin 3s linear infinite",
      },
      textColor: {
        skin: {
          base: "var(--color-text-base) !important",
        },
        button: {
          base: "var(--color-text-button) !important",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--color-fill)",
        },
        button: {
          fill: "var(--color-button-fill)",
        },
      },
      borderColor: {
        skin: {
          base: "var(--color-line-base)",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      ringOffsetColor: {
        //boxShadowColor: {
        skin: {
          fill: "-var(--color-text-base)  ",
        },
      },
    },
  },
  plugins: [],
};
