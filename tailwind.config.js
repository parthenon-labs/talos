const typography = require('@tailwindcss/typography');
const aspectRatio = require('@tailwindcss/aspect-ratio');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#297EFF',
      },
      borderColor: {
        primary: '#DBEAFF',
        dark: '#297EFF',
      },
      backgroundColor: {
        light: '#DBEAFF',
        lightHover: '#bdd1f8',
        primary: '#297EFF',
      },
      backgroundImage: {
        awesomeButton:
          'linear-gradient(45deg, rgb(255, 72, 0), rgb(255, 115, 0), rgb(255, 251, 0), rgb(0, 255, 149), rgb(0, 255, 213), rgb(0, 43, 255), rgb(122, 0, 255), rgb(255, 0, 200), rgb(255, 72, 0))',
      },
      animation: {
        'awesome-button':
          'awesomeBtnBg 3s linear 0s infinite alternate none running',
        'spin-slow': 'spin 1.5s linear infinite',
      },
      keyframes: {
        awesomeBtnBg: {
          '0%': {
            'background-position': '0%',
          },
          '100%': {
            'background-position': '100%',
          },
        },
      },
      width: {
        content: '1136px',
      },
      maxWidth: {
        content: '1136px',
      },
      boxShadow: {
        primary: 'rgb(41 126 255 / 50%) 0px 2px 4px 0px',
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#297EFF',
            },
            code: {
              backgroundColor: '#DBEAFF',
              borderRadius: '3px',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [typography, aspectRatio],
};
