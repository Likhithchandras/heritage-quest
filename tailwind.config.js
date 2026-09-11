/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        sand: {
          light: '#F4ECE1',
          DEFAULT: '#EADCC9',
          dark: '#D8C4AA'
        },
        terracotta: {
          light: '#DE8B72',
          DEFAULT: '#C86D51',
          dark: '#A74E35'
        },
        sage: {
          light: '#E2ECE5',
          DEFAULT: '#5E7A68',
          dark: '#455E4E'
        },
        bronze: {
          light: '#E0BF7E',
          DEFAULT: '#C5A059',
          dark: '#9E7D3B'
        },
        charcoal: {
          light: '#44403C',
          DEFAULT: '#1C1917',
          muted: '#78716C'
        },
        warmWhite: '#FFFDF9',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '26px',
        '4xl': '34px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.08)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
