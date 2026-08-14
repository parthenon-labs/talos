const typography = require('@tailwindcss/typography');
const aspectRatio = require('@tailwindcss/aspect-ratio');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Keep in sync with `fontFamily` in src/theme/index.ts — that's
        // what MUI components read; this is what Tailwind's own utilities
        // (and the html/body default) read. Without matching them, MUI
        // buttons render in a visibly different typeface than everything
        // styled with Tailwind next to them.
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
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
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
      },
      width: {
        content: '1136px',
      },
      maxWidth: {
        content: '1136px',
      },
      boxShadow: {
        primary: '0 8px 24px 0 rgb(41 126 255 / 25%)',
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
