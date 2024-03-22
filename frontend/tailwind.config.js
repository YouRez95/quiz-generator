export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xsm': '400px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      
      'tall': { 'raw': '(min-height: 800px)' },

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'xmd': '900px',

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1300px',

      '3xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
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
      'white': "#F1F1F1",
      'red': "#FF6242",
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
