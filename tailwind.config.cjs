/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ['DM Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
    screens: {
      xs: '480px',
      sm: { max: '767px' },
      md: '1060px'
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
}
