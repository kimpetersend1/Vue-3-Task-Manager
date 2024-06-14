/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      nunito: ['Nunito']
    },
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '000000',
        primary: '#414361',
        secondary: '#7F2CCB',
        tertiary: '#2A2D43',
        red: '#ff1a1a',
        green: '#00b100'
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require('@tailwindcss/typography')]
}
