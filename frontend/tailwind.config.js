export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'img-dark': "url('./src/assets/back-home-dark.png')",
        'img-light': "url('./src/assets/back-home-light.png')",
      }
    },
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