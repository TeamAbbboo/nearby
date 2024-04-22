/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        home: 'url(@/assets/background_home.png)',
        login: 'url(@/assets/background_login.png)',
      },

      keyframes: {
        //우리의 fall 애니메이션 keyframes
        fall: {
          '0%': { transform: 'translate(0%,-150%)' },
          '50%': { transform: 'translate(0%,0%)' },
        },
      },
    },
  },
  plugins: [],
};
