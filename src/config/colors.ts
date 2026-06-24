/**
 * FreeEditingTools brand palette — light mode only.
 * Deep Blue + Gold + Cream editorial aesthetic.
 */
export const brandColors = {
  primary: {
    main: '#4056A1' /* Deep Blue */,
    light: '#C5CBE3' /* Light Blue */,
    dark: '#2D3D7A' /* Dark Blue */,
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#F13C20' /* Red — CTAs, alerts */,
    light: '#FF6B4A',
    dark: '#C02A10',
    contrastText: '#FFFFFF'
  },
  gold: {
    main: '#D79922',
    light: '#F0C040',
    dark: '#B07A10'
  },
  cream: {
    main: '#EFE2BA',
    dark: '#E8D9A8',
    border: '#E8E4D9'
  },
  light: {
    background: '#FAFAF8',
    paper: '#FFFFFF',
    text: '#1A1A2E',
    textSecondary: '#555577',
    hover: 'rgba(64, 86, 161, 0.06)',
    lightSecondary: '#EFE2BA',
    darkSecondary: '#C5CBE3',
    border: '#E8E4D9',
    shadow: 'rgba(64, 86, 161, 0.08)'
  },
  /* Keep dark key so existing imports don't break — mirrors light */
  dark: {
    background: '#FAFAF8',
    paper: '#FFFFFF',
    text: '#1A1A2E',
    textSecondary: '#555577',
    hover: 'rgba(64, 86, 161, 0.06)',
    lightSecondary: '#EFE2BA',
    darkSecondary: '#C5CBE3',
    border: '#E8E4D9',
    shadow: 'rgba(64, 86, 161, 0.08)'
  }
} as const;

export const brandGradient = `linear-gradient(135deg, #4056A1 0%, #6B7FBD 50%, #4056A1 100%)`;

export const brandGradientButton = `linear-gradient(135deg, #4056A1 0%, #2D3D7A 100%)`;
