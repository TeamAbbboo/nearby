/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        MAIN1: '#8BA278',
        SUB1: '#D5E8C5',
      },
      backgroundImage: {
        HOME: 'url(@/assets/background_home.png)',
        GREENHOUSE: 'url(@/assets/background_greenhouse.png)',
        LOGIN: 'url(@/assets/background_login.png)',
      },
    },
  },
  plugins: [],
};
