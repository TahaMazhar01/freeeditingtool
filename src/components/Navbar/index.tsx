import React, { useEffect, useState } from 'react';
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
  Typography,
  Divider,
  alpha
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Mode } from 'components/App';
import { useTranslation } from 'react-i18next';
import logo from 'assets/logo.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface NavbarProps {
  mode: Mode;
  onChangeMode: () => void;
}

const languages = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'de', label: 'DE', full: 'Deutsch' },
  { code: 'es', label: 'ES', full: 'Español' },
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'pt', label: 'PT', full: 'Português' },
  { code: 'ja', label: 'JA', full: '日本語' },
  { code: 'hi', label: 'HI', full: 'हिंदी' },
  { code: 'nl', label: 'NL', full: 'Nederlands' },
  { code: 'ru', label: 'RU', full: 'Русский' },
  { code: 'zh', label: 'ZH', full: '中文' }
];

const modeIcons: Record<Mode, string> = {
  dark: 'ph:moon-stars-fill',
  light: 'ph:sun-fill',
  system: 'ph:monitor-fill'
};

/* ─── Capsule dimensions — also used in index.css via --navbar-total ─ */
const CAPSULE_TOP = 16; // px from viewport top
const CAPSULE_H = 56; // px — inner pill height

/* ─── Glass capsule appearance ─────────────────────────────── */
const CAPSULE_BG = 'rgba(8, 11, 17, 0.82)';
const CAPSULE_GLOW =
  '0 8px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(6,182,212,0.07), inset 0 1px 0 rgba(255,255,255,0.06)';

const Navbar: React.FC<NavbarProps> = ({ mode, onChangeMode }) => {
  const { t, i18n } = useTranslation('translation');
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLangChange = (e: { target: { value: string } }) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('lang', e.target.value);
  };

  const navItems = [
    { label: t('navbar.home'), path: '/' },
    { label: t('navbar.about'), path: '/about' }
  ];

  /* ── Brand Logo ─────────────────────────────────────────── */
  const brandLink = (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        flexShrink: 0,
        '&:hover img': {
          filter: 'drop-shadow(0 0 10px rgba(6,182,212,0.7))'
        }
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="FreeEditingTools"
        sx={{
          height: 30,
          width: 'auto',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 5px rgba(6,182,212,0.35))',
          transition: 'filter 0.25s ease'
        }}
      />
      <Typography
        sx={{
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 800,
          fontSize: { xs: '0.95rem', md: '1.05rem' },
          letterSpacing: '-0.02em',
          background:
            'linear-gradient(135deg, #A5B4FC 0%, #22D3EE 55%, #C4B5FD 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          whiteSpace: 'nowrap',
          display: { xs: 'none', sm: 'block' }
        }}
      >
        {t('hero.brand')}
      </Typography>
    </Box>
  );

  /* ── Desktop Nav Link ───────────────────────────────────── */
  const NavLink = ({ label, path }: { label: string; path: string }) => (
    <Box
      component={Link}
      to={path}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.5,
        py: 0.5,
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: isActive(path) ? 700 : 500,
        color: isActive(path) ? '#22D3EE' : 'rgba(226, 232, 240, 0.72)',
        letterSpacing: '0.01em',
        transition: 'all 0.2s ease',
        '&:hover': {
          color: '#E2E8F0',
          backgroundColor: 'rgba(255,255,255,0.05)'
        },
        /* Glowing active underline */
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -2,
          left: '50%',
          transform: 'translateX(-50%)',
          width: isActive(path) ? '55%' : '0%',
          height: '1.5px',
          borderRadius: '1px',
          background: 'linear-gradient(90deg, #818CF8, #22D3EE)',
          boxShadow: '0 0 6px rgba(34,211,238,0.6)',
          transition: 'width 0.25s ease'
        },
        '&:hover::after': {
          width: '55%'
        }
      }}
    >
      {label}
    </Box>
  );

  /* ── Language selector (compact) ────────────────────────── */
  const langSelector = (
    <FormControl size="small">
      <Select
        value={i18n.language.split('-')[0]}
        onChange={handleLangChange}
        variant="outlined"
        sx={{
          height: 32,
          minWidth: 58,
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'rgba(148,163,184,0.8)',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '& .MuiSelect-icon': {
            color: 'rgba(148,163,184,0.5)',
            fontSize: '1rem'
          },
          '& .MuiSelect-select': { py: 0, px: 0.75 },
          backgroundColor: 'rgba(255,255,255,0.04)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.07)',
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              background: 'rgba(8, 11, 17, 0.98)',
              backdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 2,
              mt: 0.5
            }
          }
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            value={lang.code}
            sx={{
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'rgba(226,232,240,0.75)',
              '&:hover': {
                background: 'rgba(6,182,212,0.09)',
                color: '#22D3EE'
              },
              '&.Mui-selected': {
                background: 'rgba(6,182,212,0.12)',
                color: '#22D3EE',
                '&:hover': { background: 'rgba(6,182,212,0.18)' }
              }
            }}
          >
            <span
              style={{
                fontWeight: 800,
                marginRight: 6,
                color: '#22D3EE',
                fontSize: '0.72rem'
              }}
            >
              {lang.label}
            </span>
            {lang.full}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  /* ── Mode toggle icon ───────────────────────────────────── */
  const modeBtn = (
    <Box
      onClick={onChangeMode}
      sx={{
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        cursor: 'pointer',
        color: 'rgba(148,163,184,0.7)',
        border: '1px solid rgba(255,255,255,0.07)',
        backgroundColor: 'rgba(255,255,255,0.04)',
        transition: 'all 0.2s ease',
        '&:hover': {
          color: '#22D3EE',
          backgroundColor: 'rgba(6,182,212,0.10)',
          borderColor: 'rgba(6,182,212,0.30)',
          boxShadow: '0 0 12px rgba(6,182,212,0.2)'
        }
      }}
    >
      <Icon icon={modeIcons[mode]} fontSize={16} />
    </Box>
  );

  /* ── Mobile hamburger ───────────────────────────────────── */
  const hamburger = (
    <Box
      onClick={() => setDrawerOpen(true)}
      sx={{
        width: 34,
        height: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        cursor: 'pointer',
        color: 'rgba(148,163,184,0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.04)',
        transition: 'all 0.2s ease',
        '&:hover': {
          color: '#22D3EE',
          backgroundColor: 'rgba(6,182,212,0.10)',
          borderColor: 'rgba(6,182,212,0.28)'
        }
      }}
    >
      <Icon icon="ph:list-bold" fontSize={18} />
    </Box>
  );

  /* ── Mobile drawer ──────────────────────────────────────── */
  const drawerContent = (
    <Box sx={{ width: 290, pt: 2 }}>
      <Box sx={{ px: 2.5, pb: 2 }}>{brandLink}</Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 1 }} />
      <List disablePadding sx={{ px: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={isActive(item.path)}
            onClick={() => {
              navigate(item.path);
              setDrawerOpen(false);
            }}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? 700 : 500,
                fontSize: '0.9rem',
                color: isActive(item.path)
                  ? '#22D3EE'
                  : 'rgba(226,232,240,0.75)'
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: 2, my: 2 }} />
      <Box sx={{ px: 2.5, display: 'flex', gap: 1.5, alignItems: 'center' }}>
        {langSelector}
        {modeBtn}
      </Box>
    </Box>
  );

  /* ═══════════════════════════════════════════════════════════
     RENDER — Fixed floating capsule pill
     No MUI AppBar. Pure fixed Box.
     Space above (CAPSULE_TOP px) reserved for future top ad.
     ═══════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ── Floating capsule ──────────────────────────────── */}
      <Box
        sx={{
          position: 'fixed',
          top: CAPSULE_TOP,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          /* Fluid width: mobile fills viewport, desktop is a centered pill */
          width: { xs: `calc(100% - 24px)`, sm: 'auto' },
          minWidth: { sm: 560, md: 700 },
          maxWidth: { sm: 820, md: 960 }
        }}
      >
        {/*
          Outer glow ring — subtle cyan shimmer on the capsule border.
          Increases slightly on scroll to anchor the nav against bright backgrounds.
        */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 1, md: 2 },
            px: { xs: 2, md: 3 },
            height: CAPSULE_H,
            borderRadius: 999, // full pill
            background: CAPSULE_BG,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: scrolled
              ? '0 8px 48px rgba(0,0,0,0.75), 0 0 0 1px rgba(6,182,212,0.12), inset 0 1px 0 rgba(255,255,255,0.07)'
              : CAPSULE_GLOW,
            transition: 'box-shadow 0.35s ease'
          }}
        >
          {/* Left — brand */}
          {brandLink}

          {/* Center — nav links (desktop only) */}
          {!isMobile && (
            <Stack direction="row" spacing={0.25} alignItems="center">
              {navItems.map((item) => (
                <NavLink key={item.path} label={item.label} path={item.path} />
              ))}
            </Stack>
          )}

          {/* Right — actions */}
          <Stack direction="row" spacing={1} alignItems="center">
            {!isMobile && langSelector}
            {modeBtn}
            {isMobile && hamburger}
          </Stack>
        </Box>
      </Box>

      {/* ── Mobile drawer ─────────────────────────────────── */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            background: 'rgba(8, 11, 17, 0.98)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '-4px 0 48px rgba(0,0,0,0.7)'
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
