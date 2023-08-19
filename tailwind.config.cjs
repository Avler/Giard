/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1440px",
    },
    colors: {
      white: "#FFF",
      beige: "#DCC1AB",
      customBlack: "#111",
      green: "#1B5B31",
      grey: "#F5F0EC",
      lightgray: "rgba(255, 255, 255, 0.10)",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        12: "12px",
        28: "28px",
        40: "40px",
        60: "60px",
      },
      lineHeight: {
        18: "18px",
        70: "70px",
      },
      letterSpacing: {
        litleTight: "-0.16px",
        tighter: "-1.44px",
      },
      width: {
        378: "378px",
        400: "400px",
        600: "600px",
      },
      height: {
        370: "370px",
        400: "400px",
      },
      borderRadius: {
        20: "20px",
        200: "200px",
      },
      padding: {
        22: "88px",
        30: "120px",
      },
      gap: {
        18: "72px",
      },
      backgroundImage: (theme) => ({
        "shadow-gradient": ` linear-gradient(360deg, #DCC1AB 20%, rgba(214, 183, 158, 0.00) 100%)`,
      }),
    },
  },
  plugins: [require("tailwindcss-animated")],
};
