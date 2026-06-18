/** FreeEditingTools brand palette — shared across MUI theme and Tailwind */
export const brandColors = {
  primary: {
    main: '#6366F1',
    light: '#818CF8',
    dark: '#4F46E5',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#06B6D4',
    light: '#22D3EE',
    dark: '#0891B2',
    contrastText: '#FFFFFF'
  },
  light: {
    background: '#F8FAFC',
    paper: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#475569',
    hover: '#F1F5F9',
    lightSecondary: '#EEF2FF',
    darkSecondary: '#4338CA',
    border: '#E2E8F0',
    shadow: 'rgba(15, 23, 42, 0.08)'
  },
  dark: {
    background: '#0B0F19',
    paper: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    hover: '#141B2D',
    lightSecondary: '#1A2332',
    darkSecondary: '#3730A3',
    border: '#334155',
    shadow: 'rgba(0, 0, 0, 0.35)'
  }
} as const;

export const brandGradient = `linear-gradient(120deg, ${brandColors.primary.main} 0%, ${brandColors.secondary.main} 50%, ${brandColors.primary.dark} 100%)`;

export const brandGradientButton = `linear-gradient(135deg, ${brandColors.primary.main} 0%, ${brandColors.primary.dark} 100%)`;
