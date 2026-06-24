/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  /* No dark variant — light mode only */
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4056A1',
          light:   '#C5CBE3',
          dark:    '#2D3D7A'
        },
        accent:  '#F13C20',
        gold: {
          DEFAULT: '#D79922',
          light:   '#F0C040'
        },
        cream: {
          DEFAULT: '#EFE2BA',
          dark:    '#E8D9A8'
        },
        site: {
          bg:          '#FAFAF8',
          text:        '#1A1A2E',
          muted:       '#555577',
          border:      '#E8E4D9',
          'card-shadow': 'rgba(64,86,161,0.08)'
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'primary-gradient':
          'linear-gradient(135deg, #4056A1 0%, #6B7FBD 50%, #2D3D7A 100%)',
        'gold-gradient':
          'linear-gradient(135deg, #D79922 0%, #F0C040 100%)',
        'cream-gradient':
          'linear-gradient(135deg, #EFE2BA 0%, #FAFAF8 100%)'
      },
      boxShadow: {
        card:      '0 2px 12px rgba(64,86,161,0.08)',
        'card-hover': '0 8px 28px rgba(64,86,161,0.15)',
        'blue-sm': '0 4px 14px rgba(64,86,161,0.18)',
        'blue-lg': '0 12px 36px rgba(64,86,161,0.14)'
      },
      animation: {
        'slide-up': 'slideUpFade 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':  'fadeIn 0.5s ease forwards',
        float:      'floatY 5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
