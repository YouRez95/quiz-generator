export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'dark': '#12372A',
      'dark-2':'#436850',
      'dark-3': '#ADBC9F',
      'light': '#FBFADA',
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}