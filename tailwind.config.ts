import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./types/**/*.{js,ts,jsx,tsx}"
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
        'gt-america': ['var(--font-gt-america)', 'sans-serif'],
        'gt-extended-thin': ['var(--font-gt-extended-thin)', 'sans-serif'],
        'gt-extended-medium': ['var(--font-gt-extended-medium)', 'sans-serif'],
        'gt-extended-bold': ['var(--font-gt-extended-bold)', 'sans-serif'],
        'gt-expanded-bold': ['var(--font-gt-expanded-bold)', 'sans-serif'],
        'gt-expanded-regular': ['var(--font-gt-expanded-regular)', 'sans-serif'],
        'gt-light': ['var(--font-gt-light)', 'sans-serif'],
        'gt-medium': ['var(--font-gt-medium)', 'sans-serif'],
        'pp-neue-bold': ['var(--font-pp-neue-bold)', 'sans-serif'],
        'pp-neue-book': ['var(--font-pp-neue-book)', 'sans-serif'],
        'pp-neue-medium': ['var(--font-pp-neue-medium)', 'sans-serif'],
        'montreal-light': ['var(--font-pp-neue-book)', 'sans-serif'],
        'montreal-medium': ['var(--font-pp-neue-medium)', 'sans-serif'],
        'montreal-bold': ['var(--font-pp-neue-bold)', 'sans-serif'],
        'acumin': ['var(--font-acumin-variable)', 'sans-serif'],
        'sans': ['var(--font-gt-america)', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'pulse-grow': 'pulseGrow 2s ease-in-out infinite',
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
        pulseGrow: {
          '0%, 100%': { 
            transform: 'scale(1)', 
            opacity: '0.9' 
          },
          '50%': { 
            transform: 'scale(1.05)', 
            opacity: '1' 
          },
        },
      }
    },
  },
  plugins: [],
};

export default config; 