/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns:
      {
        '20/55/25': '20% 55% 25%',
        'fixed': '40px 260px',
      },
      spacing: {
        '600' : "600px",
        '505' : "505px",
        '410' : "410px",
        '300' : '300px'
      }
    },
  },
  plugins: [],
}
