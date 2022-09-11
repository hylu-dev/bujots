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
      },
      screens: {
        '3xl': '1600px'
      },
      fontFamily: {
        'sans': ['Lora', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'cover-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%2387745d' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        'spine-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23997e63' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      },
      gridTemplateRows: {
        'journal': '60px 375px 60px',
        'journal-xl': '80px 500px 80px',
        'journal-2xl': '100px 625px 100px'
      },
      gridTemplateColumns: {
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
    }
  },
  plugins: [],
}