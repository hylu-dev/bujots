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
      'journal': '80px 500px 80px'
    },
    gridTemplateColumns: {
      'journal': '200px 354px 200px',
      'options': 'repeat(4, 1fr)'
    },
    transitionTimingFunction: {
      'out-cubic': 'cubic-bezier(0.075, 0.82, 0.165, 1)'
    },
    dropShadow: {
      'sticker': [
        '1.5px 1.5px 0 white',
        '-1.5px 1.5px 0 white',
        '1.5px -1.5px 0 white',
        '-1.5px -1.5px 0 white',

        '1px 0px 0 white',
        '-1px 0px 0 white',
        '0px 1px 0 white',
        '0px -1px 0 white',

        '1px 1px 2px rgba(0,0,0,.7)'
      ]
    }
  },
  plugins: [],
}