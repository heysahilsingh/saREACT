/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#fc8019"
      },
    },
    colors: {
      "blue": "#000000"
    }
  },
  plugins: [],
}
