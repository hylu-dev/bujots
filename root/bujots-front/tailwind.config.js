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
        'cover-dark': '#5c4d3b',
        'paper-light': '#fbfbf8',
        'paper-dark': '#555555'
      }
    },
    fontFamily: {
      'sans': ['Lora', ...defaultTheme.fontFamily.sans],
    },
    gridTemplateRows: {
      'journal': '100px 500px 100px'
    },
    gridTemplateColumns: {
      'journal': '200px 354px 200px'
    },
    transitionTimingFunction: {
      'out-cubic': 'cubic-bezier(0.075, 0.82, 0.165, 1)'
    }
  },
  plugins: [],
}