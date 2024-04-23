/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        HOME: 'url(@/assets/background_home.png)',
        GREENHOUSE: 'url(@/assets/background_greenhouse.png)',
      },
    },
  },
  plugins: [],
};
