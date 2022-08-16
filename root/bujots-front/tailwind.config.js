/** @type {import('tailwindcss').Config} */ 
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cover-light': '#c29c75',
        'cover-dark': '#5c4d3b'
      }
    },
    fontFamily: {
      'sans': ['Lora', ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [],
}