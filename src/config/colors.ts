/**
 * FreeEditingTools brand palette
 * Calibrated to match the hero background image:
 *   - Deep navy charcoal base  (#080B11 → #0D1420)
 *   - Neon cyan accent         (#06B6D4 / #22D3EE)   — cyan glass cubes
 *   - Purple / violet accent   (#7C3AED / #818CF8)   — purple glass cubes
 */
export const brandColors = {
  primary: {
    main: '#818CF8', // Soft violet-indigo — readable on dark
    light: '#A5B4FC',
    dark: '#6366F1',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#06B6D4', // Neon cyan — matches cube highlights
    light: '#22D3EE',
    dark: '#0891B2',
    contrastText: '#FFFFFF'
  },
  accent: {
    purple: '#7C3AED',
    cyan: '#22D3EE',
    indigo: '#6366F1',
    pink: '#EC4899',
    violet: '#818CF8'
  },
  /** Used for the "light" mode variant (still dark, image-matched) */
  light: {
    background: '#0D1420',
    paper: '#111827',
    text: '#E2E8F0',
    textSecondary: '#94A3B8',
    hover: 'rgba(6, 182, 212, 0.10)',
    lightSecondary: '#111827',
    darkSecondary: '#1C2333',
    border: 'rgba(255, 255, 255, 0.07)',
    shadow: 'rgba(0, 0, 0, 0.6)'
  },
  /** Dark mode — deep space navy */
  dark: {
    background: '#080B11',
    paper: '#0D1420',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    hover: 'rgba(6, 182, 212, 0.10)',
    lightSecondary: '#0D1420',
    darkSecondary: '#141D2E',
    border: 'rgba(255, 255, 255, 0.07)',
    shadow: 'rgba(0, 0, 0, 0.7)'
  }
} as const;

export const brandGradient = `linear-gradient(135deg, #818CF8 0%, #22D3EE 50%, #A78BFA 100%)`;

export const brandGradientButton = `linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)`;

/** Reusable glass card CSS-in-JS values */
export const glassSurface = {
  background: 'rgba(8, 11, 17, 0.72)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.07)',
  boxShadow:
    '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
} as const;
