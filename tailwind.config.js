/** @type {import('tailwindcss').Config} */
import textshadow from 'tailwindcss-textshadow';
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#dc2626',
        'primary-content': '#ffffff',
      },
    },
  },
  plugins: [daisyui, textshadow],
  daisyui: {
    themes: false,
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
};
