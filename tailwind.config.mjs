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
          'secondary-dark': '#0891B2'
        },
        surface: {
          light: '#F8FAFC',
          'light-paper': '#FFFFFF',
          'light-text': '#0F172A',
          dark: '#0B0F19',
          'dark-paper': '#1E293B',
          'dark-text': '#F1F5F9'
        }
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(120deg, #6366F1 0%, #06B6D4 50%, #4F46E5 100%)',
        'brand-button': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
      },
      boxShadow: {
        brand: '0 4px 14px rgba(99, 102, 241, 0.35)',
        'brand-lg': '0 12px 40px rgba(99, 102, 241, 0.2)',
        surface: '0 4px 24px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
