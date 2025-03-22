/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'hydra-blue': '#4A90E2',
        'hydra-pink': '#F5e6F0',
        'hydra-green': '#34c759',
      },
    },
  },
  plugins: [],
}

