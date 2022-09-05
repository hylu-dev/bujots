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
        'cover-label': '#e8dcb3',
        'paper-light': '#fbfbf8',
        'paper-dark': '#555555'
      }
    },
    fontFamily: {
      'sans': ['Lora', ...defaultTheme.fontFamily.sans],
    },
    gridTemplateRows: {
      'journal-sm': '1fr 6.25fr 1fr',
      'journal': '60px 375px 60px',
      'journal-xl': '80px 500px 80px',
      'journal-2xl': '100px 625px 100px'
    },
    gridTemplateColumns: {
      'journal-sm': '1fr 1.76fr 1fr',
      'journal': '150px 265px 150px',
      'journal-xl': '200px 354px 200px',
      'journal-2xl': '250px 442px 250px',
      'options': 'repeat(4, 1fr)',
      'stickers': 'repeat(2, minmax(0, 1fr))'
    },
    transitionTimingFunction: {
      'out-cubic': 'cubic-bezier(0.075, 0.82, 0.165, 1)'
    },
    dropShadow: {
      'sticker': [
        '1px 1px 0 white',
        '-1px 1px 0 white',
        '1px -1px 0 white',
        '-1px -1px 0 white',

        '1px 0px 0 white',
        '-1px 0px 0 white',
        '0px 1px 0 white',
        '0px -1px 0 white',

        '1px 1px 1px rgba(0,0,0,.5)'
      ]
    }
  },
  plugins: [],
}