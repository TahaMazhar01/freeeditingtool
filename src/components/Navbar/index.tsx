import React, { ReactNode, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from 'assets/logo.png';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Typography
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { Mode } from 'components/App';
import { useTranslation } from 'react-i18next';
import { brandColors, brandGradient } from 'config/colors';

interface NavbarProps {
  mode: Mode;
  onChangeMode: () => void;
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'pt', label: 'Português' },
  { code: 'ja', label: '日本語' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' }
];

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
`;

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatLogo = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const Navbar: React.FC<NavbarProps> = ({ mode, onChangeMode }) => {
  const { t, i18n } = useTranslation('translation');
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('lang', newLanguage);
  };

  const navItems = [
    { label: t('navbar.home'), path: '/' },
    { label: t('navbar.about'), path: '/about' }
  ];

  const languageSelector = (
    <FormControl size="small" sx={{ minWidth: 110 }}>
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        displayEmpty
        sx={{
          color: 'inherit',
          fontSize: 14,
          '& .MuiSelect-icon': { color: 'inherit' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
          }
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const actionShellSx = {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    px: { xs: 1, md: 1.5 },
    py: 0.5,
    borderRadius: '8px',
    bgcolor: theme.palette.mode === 'dark' ? '#202024' : '#f4f4f5',
    border: `1px solid ${theme.palette.divider}`,
    transition: 'background-color 0.2s ease',
    '&:hover': {
      bgcolor: theme.palette.mode === 'dark' ? '#2e2e32' : '#e4e4e7'
    }
  };

  const iconButtonSx = {
    width: 36,
    height: 36,
    borderRadius: '6px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      bgcolor:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.08)'
          : 'rgba(0,0,0,0.05)'
    }
  };

  const buttons: ReactNode[] = [
    languageSelector,
    <Box key={mode} component="span" onClick={onChangeMode} sx={iconButtonSx}>
      <Icon
        fontSize={20}
        icon={
          mode === 'dark'
            ? 'ic:round-dark-mode'
            : mode === 'light'
              ? 'ic:round-light-mode'
              : 'ic:round-contrast'
        }
      />
    </Box>
  ];

  const navLinkSx = (path: string) => ({
    position: 'relative' as const,
    fontWeight: location.pathname === path ? 700 : 500,
    color: location.pathname === path ? theme.palette.primary.main : 'inherit',
    borderRadius: '6px',
    px: 1.5,
    py: 0.75,
    textTransform: 'none',
    '&:hover': {
      bgcolor:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.04)'
          : 'rgba(0,0,0,0.03)'
    }
  });

  const brandLink = (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'opacity 0.2s ease',
        '&:hover': { opacity: 0.95 }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          component="img"
          src={logo}
          alt={t('hero.brand')}
          sx={{
            position: 'relative',
            height: scrolled ? { xs: 40, md: 48 } : { xs: 48, md: 56 },
            width: 'auto',
            objectFit: 'contain',
            transition: 'height 0.3s ease'
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: scrolled
              ? { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' }
              : { xs: '1.2rem', sm: '1.3rem', md: '1.4rem' },
            letterSpacing: '-0.02em',
            color: 'primary.main',
            fontFamily: '"Outfit", sans-serif',
            transition: 'font-size 0.2s ease'
          }}
        >
          {t('hero.brand')}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: { xs: 'none', sm: 'block' },
            color: 'text.secondary',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontSize: '0.68rem'
          }}
        >
          {t('navbar.tagline')}
        </Typography>
      </Box>
    </Box>
  );

  const drawerList = (
    <List sx={{ width: 280, pt: 2 }}>
      <ListItem sx={{ mb: 2, justifyContent: 'center' }}>{brandLink}</ListItem>
      {navItems.map((navItem) => (
        <ListItemButton
          key={navItem.path}
          selected={location.pathname === navItem.path}
          onClick={() => {
            navigate(navItem.path);
            setDrawerOpen(false);
          }}
        >
          <ListItemText primary={navItem.label} />
        </ListItemButton>
      ))}
      <ListItem
        sx={{ flexDirection: 'column', alignItems: 'stretch', gap: 2, mt: 2 }}
      >
        {buttons}
      </ListItem>
    </List>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: theme.zIndex.appBar + 1,
        background: scrolled
          ? theme.palette.mode === 'dark'
            ? 'rgba(22, 22, 24, 0.85)'
            : 'rgba(255, 255, 255, 0.85)'
          : 'transparent',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.2s ease',
        color: 'text.primary'
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: scrolled ? { xs: 64, md: 72 } : { xs: 72, md: 80 },
          px: { xs: 2, sm: 3, md: 5, lg: 8 },
          transition: 'min-height 0.2s ease'
        }}
      >
        {brandLink}

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                transition: 'transform 0.25s ease',
                '&:hover': {
                  transform: 'rotate(90deg)',
                  bgcolor: alpha(theme.palette.primary.main, 0.16)
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  background: alpha(theme.palette.background.default, 0.95),
                  backdropFilter: 'blur(20px)'
                }
              }}
            >
              {drawerList}
            </Drawer>
          </>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            {navItems.map((item) => (
              <Button key={item.path} color="inherit" sx={navLinkSx(item.path)}>
                <Link
                  to={item.path}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {item.label}
                </Link>
              </Button>
            ))}
            <Box sx={actionShellSx}>{buttons}</Box>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
