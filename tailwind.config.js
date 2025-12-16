/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0d062cff',
        secondary: '#07277cff',
        tertiary: '#15bbd8ff',
        blueish: '#b4bdf0ff',
        purple: '#834dc2ff',
        whiteish: '#b7ccccff'
      }
    },
  },
  plugins: [],
};