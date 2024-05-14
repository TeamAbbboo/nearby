/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        NPSfontBold: ['NPSfontBold'],
        Ownglyph_meetme: ['Ownglyph_meetme-Rg'],
        Goyang: ['Goyang'],
        insungitCutelivelyjisu: ['insungitCutelivelyjisu'],
      },
      colors: {
        MAIN1: '#8BA278',
        SUB1: '#D5E8C5',
        SUB2: '#FFEAEA',
        UNIMPORTANT: '#B4B4B4',
      },
      backgroundImage: {
        HOME: 'url(@/assets/background_home.png)',
        GREENHOUSE: 'url(@/assets/background_greenhouse.jpg)',
        LOGIN: 'url(@/assets/background_login.png)',
        PLAYGROUND: 'url(@/assets/background_playground.jpg)',
        SPLASH_GREENGOUSE: 'url(@/assets/background_splash_greenhouse.png)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translate(-50%, -40%)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%)' },
        },
        fadeOut: {
          from: { opacity: 1, transform: 'translate(-50%, -50%)' },
          to: { opacity: 0, transform: 'translate(-50%, -40%)' },
        },
        sheetOn: {
          from: { opacity: 0, transform: 'translateY(384px)' },
          to: { opacity: 1 },
        },
        sheetOff: {
          from: { opacity: 1 },
          to: { opacity: 0, transform: 'translateY(384px)' },
        },
        captureOn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        captureOff: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        modalOpen: 'fadeIn 0.3s ease-in-out',
        modalClose: 'fadeOut 0.3s ease-in-out',
        sheetOn: 'sheetOn 0.3s ease-in-out',
        sheetOff: 'sheetOff 0.3s ease-in',
        captureEnter: 'captureOn 0.3s ease-in-out',
        captureExit: 'captureOff 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
