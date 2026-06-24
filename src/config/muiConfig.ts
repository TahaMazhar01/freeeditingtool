import { alpha, createTheme, ThemeOptions } from '@mui/material';
import { brandColors } from './colors';

const sharedThemeOptions: ThemeOptions = {
  typography: {
    button: { textTransform: 'none' },
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 900 },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 }
  },
  zIndex: { snackbar: 100000 },
  shape: { borderRadius: 12 }
};

/* === Constants matching the hero image palette === */
const GLASS_BG = 'rgba(8, 11, 17, 0.72)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.07)';
const GLASS_BRIGHT = 'rgba(255, 255, 255, 0.11)';
const BLUR = 'blur(20px)';

const buildComponentOverrides = (
  mode: 'light' | 'dark'
): ThemeOptions['components'] => {
  const surface = mode === 'dark' ? brandColors.dark : brandColors.light;
  const cyanGlow = alpha(brandColors.secondary.main, 0.3);
  const indigoRing = alpha(brandColors.primary.dark, 0.28);

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: surface.background,
          color: surface.text
        },
        a: {
          color: brandColors.primary.main,
          transition: 'color 0.2s ease',
          '&:hover': { color: brandColors.secondary.light }
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha(
            brandColors.secondary.main,
            0.3
          )} transparent`
        },
        '*::-webkit-scrollbar': { width: '5px' },
        '*::-webkit-scrollbar-track': { background: 'transparent' },
        '*::-webkit-scrollbar-thumb': {
          background: alpha(brandColors.secondary.main, 0.3),
          borderRadius: '3px',
          '&:hover': { background: alpha(brandColors.secondary.main, 0.55) }
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
          transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        contained: {
          color: '#FFFFFF',
          background: `linear-gradient(135deg, ${brandColors.primary.dark} 0%, ${brandColors.primary.main} 100%)`,
          boxShadow: `0 4px 18px ${alpha(brandColors.primary.dark, 0.4)}`,
          '&:hover': {
            background: `linear-gradient(135deg, ${brandColors.primary.main} 0%, ${brandColors.primary.light} 100%)`,
            boxShadow: `0 6px 28px ${alpha(brandColors.primary.main, 0.55)}`,
            transform: 'translateY(-1px)'
          },
          '&:active': { transform: 'translateY(0)' }
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${brandColors.secondary.dark} 0%, ${brandColors.secondary.main} 100%)`,
          boxShadow: `0 4px 18px ${alpha(brandColors.secondary.main, 0.4)}`,
          '&:hover': {
            boxShadow: `0 6px 28px ${alpha(brandColors.secondary.main, 0.55)}`,
            transform: 'translateY(-1px)'
          }
        },
        outlined: {
          borderColor: GLASS_BRIGHT,
          color: brandColors.primary.light,
          backdropFilter: BLUR,
          '&:hover': {
            borderColor: alpha(brandColors.primary.main, 0.5),
            backgroundColor: alpha(brandColors.primary.main, 0.08)
          }
        },
        text: {
          color: surface.textSecondary,
          '&:hover': {
            backgroundColor: alpha(brandColors.secondary.main, 0.08),
            color: surface.text
          }
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: GLASS_BG,
            backdropFilter: BLUR,
            WebkitBackdropFilter: BLUR,
            transition: 'all 0.25s ease',
            '& fieldset': { borderColor: GLASS_BORDER },
            '&:hover fieldset': { borderColor: GLASS_BRIGHT },
            '&.Mui-focused fieldset': {
              borderColor: brandColors.secondary.main,
              borderWidth: 1.5
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 3px ${cyanGlow}, 0 0 24px ${alpha(
                brandColors.secondary.main,
                0.18
              )}`
            }
          }
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: GLASS_BG,
          backdropFilter: BLUR,
          WebkitBackdropFilter: BLUR,
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: brandColors.secondary.main,
            boxShadow: `0 0 0 3px ${cyanGlow}`
          }
        },
        notchedOutline: { borderColor: GLASS_BORDER }
      }
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: GLASS_BG,
          backdropFilter: BLUR,
          WebkitBackdropFilter: BLUR,
          border: `1px solid ${GLASS_BORDER}`,
          boxShadow:
            '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            border: `1px solid ${alpha(brandColors.secondary.main, 0.28)}`,
            boxShadow: `0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px ${alpha(
              brandColors.secondary.main,
              0.12
            )}`,
            transform: 'translateY(-4px)'
          }
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: GLASS_BG,
          backdropFilter: BLUR,
          WebkitBackdropFilter: BLUR,
          border: `1px solid ${GLASS_BORDER}`
        },
        outlined: { borderColor: GLASS_BORDER }
      }
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          background: alpha(brandColors.secondary.main, 0.1),
          border: `1px solid ${alpha(brandColors.secondary.main, 0.2)}`,
          color: brandColors.secondary.light,
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: alpha(brandColors.secondary.main, 0.18),
            transform: 'translateY(-1px)'
          }
        },
        colorPrimary: {
          background: `linear-gradient(135deg, ${brandColors.primary.dark}, ${brandColors.secondary.main})`,
          color: '#FFFFFF',
          border: 'none',
          boxShadow: `0 4px 14px ${alpha(brandColors.primary.main, 0.3)}`
        }
      }
    },

    MuiDivider: {
      styleOverrides: { root: { borderColor: GLASS_BORDER } }
    },

    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          background: 'rgba(8, 11, 17, 0.97)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: `1px solid ${GLASS_BRIGHT}`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          borderRadius: 12
        },
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: alpha(brandColors.secondary.main, 0.14),
            color: brandColors.secondary.light
          },
          '&.Mui-focused': {
            backgroundColor: alpha(brandColors.secondary.main, 0.08)
          }
        }
      }
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(brandColors.secondary.main, 0.1),
            transform: 'scale(1.08)'
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
          background: 'rgba(8, 11, 17, 0.97)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: `1px solid ${GLASS_BORDER}`
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
            backgroundColor: alpha(brandColors.secondary.main, 0.09),
            color: brandColors.secondary.light
          },
          '&.Mui-selected': {
            backgroundColor: alpha(brandColors.secondary.main, 0.14),
            color: brandColors.secondary.light,
            '&:hover': {
              backgroundColor: alpha(brandColors.secondary.main, 0.2)
            }
          }
        }
      }
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(8, 11, 17, 0.96)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${GLASS_BORDER}`,
          borderRadius: 8,
          fontSize: '0.75rem',
          fontWeight: 500
        },
        arrow: { color: 'rgba(8, 11, 17, 0.96)' }
      }
    }
  };
};

export const lightTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'light',
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    background: {
      default: brandColors.light.background,
      paper: brandColors.light.paper,
      // @ts-ignore custom palette keys
      hover: brandColors.light.hover,
      lightSecondary: brandColors.light.lightSecondary,
      darkSecondary: brandColors.light.darkSecondary
    },
    text: {
      primary: brandColors.light.text,
      secondary: brandColors.light.textSecondary
    },
    divider: brandColors.light.border,
    action: {
      hover: alpha(brandColors.secondary.main, 0.08),
      selected: alpha(brandColors.primary.main, 0.14)
    }
  },
  components: buildComponentOverrides('light')
});

export const darkTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'dark',
    primary: brandColors.primary,
    secondary: brandColors.secondary,
    background: {
      default: brandColors.dark.background,
      paper: brandColors.dark.paper,
      // @ts-ignore custom palette keys
      hover: brandColors.dark.hover,
      lightSecondary: brandColors.dark.lightSecondary,
      darkSecondary: brandColors.dark.darkSecondary
    },
    text: {
      primary: brandColors.dark.text,
      secondary: brandColors.dark.textSecondary
    },
    divider: brandColors.dark.border,
    action: {
      hover: alpha(brandColors.secondary.main, 0.08),
      selected: alpha(brandColors.primary.main, 0.15)
    }
  },
  components: buildComponentOverrides('dark')
});
