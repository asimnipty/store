/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Based on your logo, we can add a custom brand color
        'brand-blue': '#4a72b2', 
        'brand-green': '#56b35f',
      },
    },
  },
  plugins: [],
}