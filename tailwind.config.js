/** @type {import('tailwindcss').Config} */
import textshadow from 'tailwindcss-textshadow';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), 
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