/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["poppins"],
    },
    extend: {
      animation: {
        fromLeft: "fromLeft 1s ease-in-out 1",
        fromRight: "fromRight 0.1s ease-in-out 1",
      },
      keyframes: {
        fromLeft: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        fromRight: {
          "0%": {
            transform: "translateY(-100%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
      },
    },
  },
  plugins: [],
};
