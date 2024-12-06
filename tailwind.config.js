/** @type {import('tailwindcss').Config} */
import textshadow from 'tailwindcss-textshadow';
import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, 
    textshadow
  ],
  daisyui: {
    themes: false, 
    darkTheme: "dark", 
    base: true, 
    styled: true, 
    utils: true, 
    prefix: "", 
    logs: true, 
    themeRoot: ":root",
  },
}