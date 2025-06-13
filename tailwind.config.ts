import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: '#2B303B',
          dark: '#2B303B', // Same as navy for consistency
          blue: '#536A84', 
          sage: '#80846A',
          light: '#8BA0BD',
          cream: '#D2CAC2',
          gold: '#E2C18A',
          beige: '#E5DDD6',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        'gt-extended': ['var(--font-gt-extended)', 'sans-serif'],
        'gt-extended-thin': ['var(--font-gt-extended-thin)', 'sans-serif'],
        'gt-america': ['var(--font-gt-america)', 'sans-serif'], 
        'pp-neue': ['var(--font-pp-neue)', 'sans-serif'],
        'montreal-light': ['var(--font-pp-neue)', 'sans-serif'],
        'montreal-medium': ['var(--font-pp-neue)', 'sans-serif'],
        'montreal-bold': ['var(--font-pp-neue)', 'sans-serif'],
        'sans': ['var(--font-gt-america)', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
};

export default config; 