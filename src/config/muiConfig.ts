import { alpha, createTheme, ThemeOptions } from '@mui/material';
import { brandColors } from './colors';

const sharedThemeOptions: ThemeOptions = {
  typography: {
    button: {
      textTransform: 'none'
    },
    fontFamily: 'Quicksand, sans-serif'
  },
  zIndex: { snackbar: 100000 },
  shape: {
    borderRadius: 10
  }
};

const buildComponentOverrides = (
  mode: 'light' | 'dark'
): ThemeOptions['components'] => {
  const surface = mode === 'light' ? brandColors.light : brandColors.dark;
  const focusRing = alpha(brandColors.primary.main, 0.25);

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
          '&:hover': {
            color: brandColors.secondary.main
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600
        },
        contained: {
          color: brandColors.primary.contrastText,
          background: brandColors.primary.main,
          boxShadow: `0 4px 14px ${alpha(brandColors.primary.main, 0.35)}`,
          '&:hover': {
            background: brandColors.primary.dark,
            boxShadow: `0 6px 20px ${alpha(brandColors.primary.main, 0.45)}`
          }
        },
        containedSecondary: {
          background: brandColors.secondary.main,
          boxShadow: `0 4px 14px ${alpha(brandColors.secondary.main, 0.35)}`,
          '&:hover': {
            background: brandColors.secondary.dark
          }
        },
        outlined: {
          borderColor: alpha(brandColors.secondary.main, 0.45),
          color:
            mode === 'light'
              ? brandColors.primary.dark
              : brandColors.secondary.light,
          '&:hover': {
            borderColor: brandColors.secondary.main,
            backgroundColor: alpha(brandColors.secondary.main, 0.08)
          }
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(brandColors.primary.main, 0.08)
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: surface.paper,
            '& fieldset': {
              borderColor: surface.border
            },
            '&:hover fieldset': {
              borderColor: brandColors.secondary.main
            },
            '&.Mui-focused fieldset': {
              borderColor: brandColors.primary.main,
              borderWidth: 2,
              boxShadow: `0 0 0 3px ${focusRing}`
            }
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: brandColors.primary.main
          }
        },
        notchedOutline: {
          borderColor: surface.border
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${surface.border}`,
          boxShadow: `0 4px 24px ${surface.shadow}`,
          backgroundColor: surface.paper
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        },
        outlined: {
          borderColor: surface.border
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600
        },
        filled: {
          backgroundColor:
            mode === 'light' ? brandColors.light.hover : brandColors.dark.hover,
          color: surface.text,
          '&:hover': {
            backgroundColor: alpha(brandColors.primary.main, 0.12)
          }
        },
        colorPrimary: {
          background: `linear-gradient(135deg, ${brandColors.primary.main}, ${brandColors.secondary.main})`,
          color: '#FFFFFF'
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(brandColors.secondary.main, 0.25)
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          border: `1px solid ${surface.border}`,
          boxShadow: `0 12px 40px ${surface.shadow}`
        },
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: alpha(brandColors.primary.main, 0.12)
          },
          '&.Mui-focused': {
            backgroundColor: alpha(brandColors.secondary.main, 0.1)
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: alpha(brandColors.primary.main, 0.1)
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
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
      hover: alpha(brandColors.primary.main, 0.06),
      selected: alpha(brandColors.primary.main, 0.12)
    }
  },
  components: buildComponentOverrides('light')
});

export const darkTheme = createTheme({
  ...sharedThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      ...brandColors.primary,
      main: '#818CF8',
      light: '#A5B4FC',
      dark: '#6366F1'
    },
    secondary: brandColors.secondary,
    background: {
      default: brandColors.dark.background,
      paper: brandColors.dark.paper,
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
      selected: alpha(brandColors.primary.main, 0.16)
    }
  },
  components: buildComponentOverrides('dark')
});
