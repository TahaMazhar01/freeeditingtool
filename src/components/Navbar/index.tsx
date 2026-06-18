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
    py: 0.75,
    borderRadius: '999px',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.mode === 'dark' ? 0.14 : 0.08
    ),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`,
    animation: `${fadeInRight} 0.7s ease 0.15s both`,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.18)}`
    }
  };

  const iconButtonSx = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.25s ease, background-color 0.25s ease',
    '&:hover': {
      transform: 'scale(1.08) rotate(-4deg)',
      bgcolor: alpha(theme.palette.primary.main, 0.12)
    }
  };

  const buttons: ReactNode[] = [
    languageSelector,
    <Box key={mode} component="span" onClick={onChangeMode} sx={iconButtonSx}>
      <Icon
        fontSize={24}
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
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 4,
      width: '100%',
      height: 2,
      background: theme.palette.primary.main,
      transform: location.pathname === path ? 'scaleX(1)' : 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.3s ease'
    },
    '&:hover::after': { transform: 'scaleX(1)' }
  });

  const brandLink = (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, sm: 2 },
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'scale(1.02)' }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: `${floatLogo} 4s ease-in-out infinite`
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: scrolled ? 88 : 104,
            height: scrolled ? 88 : 104,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(
              brandColors.secondary.main,
              0.35
            )} 0%, transparent 70%)`,
            filter: 'blur(10px)',
            transition: 'width 0.35s ease, height 0.35s ease'
          }}
        />
        <Box
          component="img"
          src={logo}
          alt={t('hero.brand')}
          sx={{
            position: 'relative',
            height: scrolled ? { xs: 72, md: 84 } : { xs: 84, md: 100 },
            width: 'auto',
            objectFit: 'contain',
            transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 4px 12px ${alpha(
              brandColors.secondary.main,
              0.25
            )})`
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: scrolled
              ? { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' }
              : { xs: '1.2rem', sm: '1.35rem', md: '1.5rem' },
            letterSpacing: '-0.02em',
            background: brandGradient,
            backgroundSize: '220% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: `${shimmer} 6s ease infinite`,
            transition: 'font-size 0.35s ease'
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
        animation: `${slideDown} 0.55s cubic-bezier(0.22, 1, 0.36, 1)`,
        background: scrolled
          ? alpha(
              theme.palette.background.default,
              theme.palette.mode === 'dark' ? 0.82 : 0.78
            )
          : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(160%)' : 'none',
        borderBottom: scrolled
          ? `1px solid ${alpha(theme.palette.primary.main, 0.12)}`
          : '1px solid transparent',
        boxShadow: scrolled
          ? `0 10px 40px ${alpha(theme.palette.common.black, 0.08)}`
          : 'none',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        color: 'text.primary'
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: scrolled ? { xs: 88, md: 96 } : { xs: 100, md: 120 },
          px: { xs: 2, sm: 3, md: 5, lg: 8 },
          transition: 'min-height 0.35s ease, padding 0.35s ease'
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
