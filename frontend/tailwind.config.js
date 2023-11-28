const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Source Serif Pro', 'Georgia', 'serif'],
        body: ['Synonym', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#51b5a3',
          60: '#cce9e4',
        },
        text: {
          1: '#ffffff',
          0: '#000000',
        },
        secondary: "#0097b2",
        accent: '#c78851',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
