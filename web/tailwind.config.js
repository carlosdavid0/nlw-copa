/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },

      backgroundImage: {
        app: 'url(/bg.png)'
      },

      colors: {
        ignite: {
          500: "#129e57"
        },

        gray: {
          100: "#e1e1e6",
          300: "#8D8D99",
          900: '#121214',
          800: "#202024",
          600: "#323238"

        },
        yellow: {
          500: "#F7DD43",
          700: "#E5cd3d"
        }
      }

    }


  },
  plugins: [],
}
