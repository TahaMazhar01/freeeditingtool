import { alpha, createTheme } from '@mui/material';
import { brandColors } from './colors';

/* === Single light-mode theme — no dark variant === */

const CARD_SHADOW = '0 2px 12px rgba(64,86,161,0.08)';
const CARD_SHADOW_HOVER = '0 8px 28px rgba(64,86,161,0.14)';
const BORDER = '#E8E4D9';
const PRIMARY = '#4056A1';
const ACCENT = '#F13C20';
const GOLD = '#D79922';

export const theme = createTheme({
  typography: {
    button: { textTransform: 'none' },
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 700,
      color: PRIMARY
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 700,
      color: PRIMARY
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
      color: PRIMARY
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
      color: PRIMARY
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      color: '#1A1A2E'
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      color: '#1A1A2E'
    },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 }
  },
  zIndex: { snackbar: 100000 },
  shape: { borderRadius: 10 },

  palette: {
    mode: 'light',
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    background: {
      default: '#FAFAF8',
      paper: '#FFFFFF',
      // @ts-ignore custom palette keys
      hover: brandColors.light.hover,
      lightSecondary: brandColors.light.lightSecondary,
      darkSecondary: brandColors.light.darkSecondary
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#555577'
    },
    divider: BORDER,
    action: {
      hover: alpha(PRIMARY, 0.06),
      selected: alpha(PRIMARY, 0.1)
    }
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FAFAF8',
          color: '#1A1A2E',
          fontFamily: '"Inter", system-ui, sans-serif',
          fontSize: '16px',
          lineHeight: 1.6
        },
        'h1,h2,h3,h4': {
          fontFamily: '"Playfair Display", Georgia, serif',
          color: PRIMARY
        },
        a: {
          color: PRIMARY,
          transition: 'color 0.2s ease',
          '&:hover': { color: ACCENT }
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(PRIMARY, 0.25)} #EFE2BA`
        },
        '*::-webkit-scrollbar': { width: '6px' },
        '*::-webkit-scrollbar-track': { background: '#EFE2BA' },
        '*::-webkit-scrollbar-thumb': {
          background: alpha(PRIMARY, 0.25),
          borderRadius: '3px',
          '&:hover': { background: alpha(PRIMARY, 0.45) }
        },
        /* Remove all dark-mode media queries */
        '@media (prefers-color-scheme: dark)': {
          body: { backgroundColor: '#FAFAF8', color: '#1A1A2E' }
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
          fontFamily: '"Inter", sans-serif',
          transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)'
        },
        contained: {
          background: PRIMARY,
          color: '#FFFFFF',
          boxShadow: `0 4px 14px ${alpha(PRIMARY, 0.28)}`,
          '&:hover': {
            background: ACCENT,
            boxShadow: `0 6px 20px ${alpha(ACCENT, 0.35)}`,
            transform: 'translateY(-1px)'
          },
          '&:active': { transform: 'translateY(0)' }
        },
        containedSecondary: {
          background: ACCENT,
          color: '#FFFFFF',
          '&:hover': { background: '#C02A10' }
        },
        outlined: {
          borderColor: alpha(PRIMARY, 0.35),
          color: PRIMARY,
          '&:hover': {
            borderColor: PRIMARY,
            backgroundColor: alpha(PRIMARY, 0.06)
          }
        },
        text: {
          color: PRIMARY,
          '&:hover': { backgroundColor: alpha(PRIMARY, 0.06) }
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            fontSize: '1rem',
            transition: 'box-shadow 0.25s ease',
            '& fieldset': { borderColor: BORDER },
            '&:hover fieldset': { borderColor: alpha(PRIMARY, 0.45) },
            '&.Mui-focused fieldset': {
              borderColor: PRIMARY,
              borderWidth: 1.5
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 3px ${alpha(PRIMARY, 0.12)}`
            }
          }
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: PRIMARY,
            boxShadow: `0 0 0 3px ${alpha(PRIMARY, 0.12)}`
          }
        },
        notchedOutline: { borderColor: BORDER }
      }
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          border: `1px solid ${BORDER}`,
          boxShadow: CARD_SHADOW,
          borderRadius: 12,
          backgroundImage: 'none',
          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            borderColor: alpha(PRIMARY, 0.4),
            boxShadow: CARD_SHADOW_HOVER,
            transform: 'translateY(-4px)'
          }
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#FFFFFF',
          border: `1px solid ${BORDER}`
        },
        elevation1: { boxShadow: CARD_SHADOW },
        outlined: { borderColor: BORDER }
      }
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontFamily: '"Inter", sans-serif',
          background: '#EFE2BA',
          border: `1px solid ${BORDER}`,
          color: '#1A1A2E',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: alpha(PRIMARY, 0.1),
            borderColor: alpha(PRIMARY, 0.35),
            color: PRIMARY,
            transform: 'translateY(-1px)'
          }
        },
        colorPrimary: {
          background: PRIMARY,
          color: '#FFFFFF',
          border: 'none',
          boxShadow: `0 4px 12px ${alpha(PRIMARY, 0.28)}`,
          '&:hover': { background: '#2D3D7A' }
        }
      }
    },

    MuiDivider: {
      styleOverrides: { root: { borderColor: BORDER } }
    },

    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          background: '#FFFFFF',
          border: `1px solid ${BORDER}`,
          boxShadow: '0 8px 28px rgba(64,86,161,0.12)',
          borderRadius: 12,
          marginTop: 4
        },
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: alpha(PRIMARY, 0.08),
            color: PRIMARY
          },
          '&.Mui-focused': {
            backgroundColor: alpha(PRIMARY, 0.05)
          }
        }
      }
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(PRIMARY, 0.08),
            transform: 'scale(1.05)'
          }
        }
      }
    },

    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'none', background: 'transparent' }
      }
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#FFFFFF',
          border: `1px solid ${BORDER}`,
          boxShadow: '-4px 0 24px rgba(64,86,161,0.10)'
        }
      }
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(PRIMARY, 0.06),
            color: PRIMARY
          },
          '&.Mui-selected': {
            backgroundColor: alpha(PRIMARY, 0.1),
            color: PRIMARY,
            '&:hover': { backgroundColor: alpha(PRIMARY, 0.14) }
          }
        }
      }
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: '#1A1A2E',
          color: '#FFFFFF',
          borderRadius: 6,
          fontSize: '0.75rem',
          fontWeight: 500
        },
        arrow: { color: '#1A1A2E' }
      }
    }
  }
});

/* Backwards-compat aliases — App.tsx still imports these names */
export const lightTheme = theme;
export const darkTheme = theme;
