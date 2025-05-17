/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {},
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
