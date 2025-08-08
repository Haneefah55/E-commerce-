/** @type {import('tailwindcss').Config} */

// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define your custom font as "myfont"
        bello: ['"BelloFont"', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
}