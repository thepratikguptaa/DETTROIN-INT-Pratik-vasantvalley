/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem', xl: '2.5rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // Primary identity — the school's sandstone-red, rebalanced for contrast.
        crimson: {
          50: '#FDF3F4',
          100: '#FBE4E7',
          200: '#F6C8CE',
          300: '#EE9DA8',
          400: '#E06A7C',
          500: '#CB3D53',
          600: '#B02440',
          700: '#9E1B32',
          800: '#7C1528',
          900: '#601020',
          950: '#3B0913',
        },
        // Warm sandstone neutrals drawn from the campus architecture.
        sand: {
          50: '#FDFBF7',
          100: '#FAF5EC',
          200: '#F3EADD',
          300: '#E9DCC7',
          400: '#DCC9AC',
          500: '#C9B08B',
        },
        // Deep pine for secondary headings — calmer than pure black.
        pine: {
          500: '#3E7481',
          600: '#33636F',
          700: '#26454F',
          800: '#1B333B',
        },
        ink: {
          500: '#6B6560',
          600: '#5A544F',
          700: '#453F3B',
          800: '#2A2724',
          900: '#1B1A19',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 4.6vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.875rem, 3.4vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,26,25,0.04), 0 8px 24px -12px rgba(27,26,25,0.18)',
        lift: '0 24px 60px -28px rgba(96,16,32,0.38)',
        ring: '0 0 0 1px rgba(27,26,25,0.06)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'ken-burns': {
          from: { transform: 'scale(1) translate3d(0,0,0)' },
          to: { transform: 'scale(1.09) translate3d(-1.5%, -1%, 0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'draw-line': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'ken-burns': 'ken-burns 9s ease-out both',
        marquee: 'marquee 38s linear infinite',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
