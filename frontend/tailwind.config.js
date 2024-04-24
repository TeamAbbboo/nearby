/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        home: 'url(@/assets/background_home.png)',
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
