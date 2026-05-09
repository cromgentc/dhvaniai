/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dhvani: {
          blue: '#1B12FF',
          yellow: '#F8C500',
          cream: '#FFFDF4',
        },
        slate: {
          650: '#475066',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        blue: '0 18px 45px rgba(27, 18, 255, 0.22)',
        yellow: '0 18px 45px rgba(248, 197, 0, 0.28)',
        soft: '0 18px 60px rgba(15, 23, 42, 0.10)',
        neon: '0 0 40px rgba(34, 211, 238, 0.28)',
        cyan: '0 24px 70px rgba(34, 211, 238, 0.28)',
        glass: '0 24px 80px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        wave: 'wave 2.6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.04)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.45)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}
