/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        foxden: {
          red: '#C0392B',
          dark: '#1A1A2E',
          card: '#16213E',
          border: '#0F3460',
        },
      },
    },
  },
  plugins: [],
}
