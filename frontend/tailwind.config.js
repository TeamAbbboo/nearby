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
      keyframes: {
        sheetOn: {
          from: { opacity: 0, transform: 'translateY(384px)' },
          to: { opacity: 1 },
        },
        sheetOff: {
          from: { opacity: 1 },
          to: { opacity: 0, transform: 'translateY(384px)' },
        },
      },
      animation: {
        sheetOn: 'sheetOn 0.3s ease-in-out',
        sheetOff: 'sheetOff 0.3s ease-in',
      },
    },
  },
  plugins: [],
};
