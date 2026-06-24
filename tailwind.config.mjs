/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6366F1',
          'primary-light': '#818CF8',
          'primary-dark': '#4F46E5',
          secondary: '#06B6D4',
          'secondary-light': '#22D3EE',
          'secondary-dark': '#0891B2',
          purple: '#A855F7',
          pink: '#EC4899',
          emerald: '#10B981'
        },
        space: {
          950: '#060C1A',
          900: '#0B0F19',
          850: '#0D1117',
          800: '#111827',
          700: '#161B2E',
          600: '#1C2333',
          500: '#1E1B4B'
        },
        glass: {
          border: 'rgba(148, 163, 184, 0.1)',
          'border-bright': 'rgba(148, 163, 184, 0.2)',
          surface: 'rgba(17, 24, 39, 0.6)',
          'surface-light': 'rgba(22, 27, 46, 0.7)',
          hover: 'rgba(99, 102, 241, 0.12)'
        }
      },
      backgroundImage: {
        'aurora-gradient':
          'linear-gradient(135deg, #6366F1 0%, #06B6D4 50%, #8B5CF6 100%)',
        'aurora-button': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        'aurora-cyan-purple':
          'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)',
        'brand-gradient':
          'linear-gradient(135deg, #6366F1 0%, #06B6D4 50%, #8B5CF6 100%)',
        'neon-indigo': 'linear-gradient(135deg, #6366F1, #818CF8)',
        'grid-mesh':
          'linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)'
      },
      boxShadow: {
        'neon-indigo': '0 0 20px rgba(99, 102, 241, 0.4)',
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        glass: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-hover':
          '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
        'brand-glow': '0 4px 24px rgba(99, 102, 241, 0.35)',
        'brand-glow-lg': '0 12px 40px rgba(99, 102, 241, 0.25)'
      },
      backdropBlur: {
        xs: '4px',
        glass: '20px',
        heavy: '40px'
      },
      animation: {
        aurora: 'auroraShift 20s ease-in-out infinite alternate',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards'
      },
      keyframes: {
        auroraShift: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(-2%,2%) scale(1.02)' },
          '66%': { transform: 'translate(2%,-1%) scale(0.98)' },
          '100%': { transform: 'translate(-1%,3%) scale(1.01)' }
        },
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif']
      }
    }
  },
  plugins: []
};
