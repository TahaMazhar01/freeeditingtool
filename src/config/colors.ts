/** FreeEditingTools brand palette — shared across MUI theme and Tailwind */
export const brandColors = {
  primary: {
    main: '#2563EB',
    light: '#60A5FA',
    dark: '#1D4ED8',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#4F46E5',
    light: '#818CF8',
    dark: '#3730A3',
    contrastText: '#FFFFFF'
  },
  light: {
    background: '#FAFAFA',
    paper: '#FFFFFF',
    text: '#171717',
    textSecondary: '#525252',
    hover: '#F4F4F5',
    lightSecondary: '#EFF6FF',
    darkSecondary: '#1E40AF',
    border: '#E5E7EB',
    shadow: 'rgba(0, 0, 0, 0.04)'
  },
  dark: {
    background: '#0F0F11',
    paper: '#161618',
    text: '#EDEDEF',
    textSecondary: '#A0A0A5',
    hover: '#202024',
    lightSecondary: '#1E293B',
    darkSecondary: '#3B82F6',
    border: '#2E2E32',
    shadow: 'rgba(0, 0, 0, 0.2)'
  }
} as const;

export const brandGradient = `linear-gradient(120deg, ${brandColors.primary.main} 0%, ${brandColors.secondary.main} 50%, ${brandColors.primary.dark} 100%)`;

export const brandGradientButton = `linear-gradient(135deg, ${brandColors.primary.main} 0%, ${brandColors.primary.dark} 100%)`;
