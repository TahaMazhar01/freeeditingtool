/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          'primary-light': '#60A5FA',
          'primary-dark': '#1D4ED8',
          secondary: '#4F46E5',
          'secondary-light': '#818CF8',
          'secondary-dark': '#3730A3'
        },
        surface: {
          light: '#FAFAFA',
          'light-paper': '#FFFFFF',
          'light-text': '#171717',
          dark: '#0F0F11',
          'dark-paper': '#161618',
          'dark-text': '#EDEDEF'
        }
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(120deg, #2563EB 0%, #4F46E5 50%, #1D4ED8 100%)',
        'brand-button': 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
      },
      boxShadow: {
        brand: '0 4px 14px rgba(37, 99, 235, 0.25)',
        'brand-lg': '0 12px 40px rgba(37, 99, 235, 0.15)',
        surface: '0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)'
      }
    }
  },
  plugins: []
};
