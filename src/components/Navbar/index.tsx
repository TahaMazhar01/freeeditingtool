import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Typography,
  Divider,
  alpha,
  InputBase,
  IconButton
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { filterTools, tools } from '@tools/index';
import { DefinedTool } from '@tools/defineTool';
import { validNamespaces } from '../../i18n';

const PRIMARY = '#4056A1';
const GOLD = '#D79922';
const BORDER = '#E8E4D9';

/* Refined single-row capsule */
const CAPSULE_TOP = 18;
const CAPSULE_H = 72;

const CAPSULE_BG = 'rgba(255,255,255,0.90)';
const CAPSULE_GLOW =
  '0 6px 24px rgba(64,86,161,0.09), 0 0 0 1px rgba(64,86,161,0.06)';
const CAPSULE_GLOW_SCROLL =
  '0 10px 36px rgba(64,86,161,0.14), 0 0 0 1px rgba(64,86,161,0.10)';

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

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation('translation');
  const { t: tAll } = useTranslation(validNamespaces);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Search state ───────────────────────────────────────── */
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DefinedTool[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path ||
    (path === '/blog' && location.pathname.startsWith('/blog/'));

  const handleLangChange = (e: { target: { value: string } }) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('lang', e.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim().length < 1) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }
    const timer = setTimeout(() => {
      const results = filterTools(
        tools,
        searchQuery,
        ['generalUsers', 'developers'],
        tAll
      );
      setSearchResults(results.slice(0, 8));
      setSearchOpen(results.length > 0);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery, tAll]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const navItems = [
    { label: t('navbar.home'), path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: t('navbar.about'), path: '/about' }
  ];

  /* ══════════════════════════════════════════════════════════
     WORDMARK LOGO — clean two-tone, no boxed icon
     ══════════════════════════════════════════════════════════ */
  const brandLink = (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        textDecoration: 'none',
        flexShrink: 0,
        userSelect: 'none',
        '&:hover .brand-accent': { color: '#F13C20' }
      }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          color: PRIMARY,
          letterSpacing: '-0.02em',
          lineHeight: 1
        }}
      >
        FreeEditing
      </Typography>
      <Typography
        component="span"
        className="brand-accent"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          color: GOLD,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          transition: 'color 0.2s ease'
        }}
      >
        Tools
      </Typography>
    </Box>
  );

  /* ── Desktop nav link ───────────────────────────────────── */
  const NavLink = ({ label, path }: { label: string; path: string }) => (
    <Box
      component={Link}
      to={path}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.75,
        py: 0.75,
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: isActive(path) ? 600 : 500,
        color: isActive(path) ? PRIMARY : '#555577',
        fontFamily: '"Inter", sans-serif',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
        '&:hover': { color: PRIMARY, backgroundColor: alpha(PRIMARY, 0.06) },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 2,
          left: '50%',
          transform: 'translateX(-50%)',
          width: isActive(path) ? '50%' : '0%',
          height: '2px',
          borderRadius: '1px',
          background: GOLD,
          transition: 'width 0.25s ease'
        },
        '&:hover::after': { width: '50%' }
      }}
    >
      {label}
    </Box>
  );

  /* ── Inline search (desktop) ────────────────────────────── */
  const inlineSearch = (
    <Box
      ref={searchRef}
      sx={{ position: 'relative', flex: { md: '0 1 280px', lg: '0 1 340px' } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.75,
          height: 42,
          borderRadius: 999,
          background: searchOpen ? '#FFFFFF' : '#F4F2EC',
          border: `1.5px solid ${searchOpen ? PRIMARY : BORDER}`,
          boxShadow: searchOpen ? `0 0 0 3px ${alpha(PRIMARY, 0.1)}` : 'none',
          transition: 'all 0.2s ease'
        }}
      >
        <Icon
          icon="ph:magnifying-glass"
          fontSize={18}
          color={alpha(PRIMARY, 0.55)}
        />
        <InputBase
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchQuery && setSearchOpen(searchResults.length > 0)}
          placeholder="Search tools…"
          sx={{
            flex: 1,
            fontSize: '0.875rem',
            fontFamily: '"Inter", sans-serif',
            color: '#1A1A2E',
            '& input': { p: 0 },
            '& input::placeholder': { color: '#888', opacity: 1 }
          }}
        />
        {searchQuery && (
          <Box
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
              setSearchOpen(false);
            }}
            sx={{
              cursor: 'pointer',
              color: '#999',
              lineHeight: 0,
              '&:hover': { color: PRIMARY }
            }}
          >
            <Icon icon="ph:x" fontSize={15} />
          </Box>
        )}
      </Box>

      {searchOpen && searchResults.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            border: `1px solid ${BORDER}`,
            borderRadius: '14px',
            boxShadow: '0 12px 32px rgba(64,86,161,0.16)',
            overflow: 'hidden',
            zIndex: 10000
          }}
        >
          {searchResults.map((tool, i) => (
            <Box
              key={tool.path}
              onClick={() => {
                navigate('/' + tool.path);
                setSearchQuery('');
                setSearchOpen(false);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                px: 2,
                py: 1.25,
                cursor: 'pointer',
                borderBottom:
                  i < searchResults.length - 1 ? `1px solid ${BORDER}` : 'none',
                transition: 'background 0.15s ease',
                '&:hover': { background: alpha(PRIMARY, 0.05) }
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#EFE2BA',
                  color: PRIMARY,
                  flexShrink: 0
                }}
              >
                <Icon icon={tool.icon} fontSize={16} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  noWrap
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#1A1A2E',
                    lineHeight: 1.3,
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  {tAll(tool.name)}
                </Typography>
                <Typography
                  noWrap
                  sx={{
                    fontSize: '0.73rem',
                    color: '#555577',
                    lineHeight: 1.3,
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  {tAll(tool.shortDescription)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );

  /* ── Language selector ──────────────────────────────────── */
  const langSelector = (
    <FormControl size="small">
      <Select
        value={i18n.language.split('-')[0]}
        onChange={handleLangChange}
        variant="outlined"
        sx={{
          height: 38,
          minWidth: 64,
          fontSize: '0.78rem',
          fontWeight: 600,
          fontFamily: '"Inter", sans-serif',
          color: '#555577',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
          '& .MuiSelect-icon': {
            color: alpha(PRIMARY, 0.5),
            fontSize: '1.1rem'
          },
          '& .MuiSelect-select': { py: 0, pl: 1, pr: '24px !important' },
          backgroundColor: alpha(PRIMARY, 0.05),
          borderRadius: 999,
          '&:hover': { backgroundColor: alpha(PRIMARY, 0.09) }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              background: '#FFFFFF',
              border: `1px solid ${BORDER}`,
              boxShadow: '0 8px 24px rgba(64,86,161,0.12)',
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
              color: '#555577',
              '&:hover': { background: alpha(PRIMARY, 0.06), color: PRIMARY },
              '&.Mui-selected': {
                background: alpha(PRIMARY, 0.08),
                color: PRIMARY,
                '&:hover': { background: alpha(PRIMARY, 0.12) }
              }
            }}
          >
            <span
              style={{
                fontWeight: 700,
                marginRight: 6,
                color: GOLD,
                fontSize: '0.70rem'
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

  /* ── Mobile hamburger ───────────────────────────────────── */
  const hamburger = (
    <IconButton
      aria-label="Open navigation menu"
      aria-expanded={drawerOpen}
      aria-controls="mobile-navigation"
      onClick={() => setDrawerOpen(true)}
      sx={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        cursor: 'pointer',
        color: PRIMARY,
        backgroundColor: alpha(PRIMARY, 0.06),
        transition: 'all 0.2s ease',
        '&:hover': { backgroundColor: alpha(PRIMARY, 0.12) }
      }}
    >
      <Icon icon="ph:list-bold" fontSize={20} />
    </IconButton>
  );

  /* ── Mobile drawer ──────────────────────────────────────── */
  const drawerContent = (
    <Box
      component="nav"
      id="mobile-navigation"
      aria-label="Mobile navigation"
      sx={{ width: 300, maxWidth: '100vw', pt: 2.5 }}
    >
      <Box sx={{ px: 2.5, pb: 2 }}>{brandLink}</Box>
      <Divider sx={{ borderColor: BORDER, mb: 2 }} />

      {/* Mobile search */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            height: 44,
            borderRadius: '12px',
            background: '#F4F2EC',
            border: `1.5px solid ${BORDER}`
          }}
        >
          <Icon
            icon="ph:magnifying-glass"
            fontSize={17}
            color={alpha(PRIMARY, 0.55)}
          />
          <InputBase
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search tools…"
            sx={{
              flex: 1,
              fontSize: '0.875rem',
              fontFamily: '"Inter", sans-serif',
              color: '#1A1A2E',
              '& input': { p: 0 }
            }}
          />
        </Box>
        {searchResults.length > 0 && (
          <Box
            sx={{
              mt: 1,
              background: '#FFFFFF',
              border: `1px solid ${BORDER}`,
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
            {searchResults.map((tool, i) => (
              <Box
                key={tool.path}
                onClick={() => {
                  navigate('/' + tool.path);
                  setSearchQuery('');
                  setSearchResults([]);
                  setDrawerOpen(false);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 1.1,
                  cursor: 'pointer',
                  borderBottom:
                    i < searchResults.length - 1
                      ? `1px solid ${BORDER}`
                      : 'none',
                  '&:hover': { background: alpha(PRIMARY, 0.05) }
                }}
              >
                <Icon icon={tool.icon} fontSize={16} color={PRIMARY} />
                <Typography
                  noWrap
                  sx={{
                    fontSize: '0.83rem',
                    fontWeight: 500,
                    color: '#1A1A2E',
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  {tAll(tool.name)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

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
                fontWeight: isActive(item.path) ? 600 : 500,
                fontSize: '0.95rem',
                fontFamily: '"Inter", sans-serif',
                color: isActive(item.path) ? PRIMARY : '#555577'
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ borderColor: BORDER, mx: 2, my: 2 }} />
      <Box sx={{ px: 2.5 }}>{langSelector}</Box>
    </Box>
  );

  /* ════════════════════════════════════════════════════════
     RENDER — refined 72px floating capsule
     Layout: [logo]  [search · flex center]  [Home About | lang]
     ════════════════════════════════════════════════════════ */
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: CAPSULE_TOP,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          width: { xs: 'calc(100% - 24px)', md: 'calc(100% - 48px)' },
          maxWidth: 1180
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 2.5 },
            px: { xs: 2.5, md: 3.5 },
            height: CAPSULE_H,
            borderRadius: 999,
            background: CAPSULE_BG,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(PRIMARY, 0.1)}`,
            boxShadow: scrolled ? CAPSULE_GLOW_SCROLL : CAPSULE_GLOW,
            transition: 'box-shadow 0.3s ease'
          }}
        >
          {/* Left — wordmark logo */}
          {brandLink}

          {/* Center — search (desktop), grows to fill space */}
          {!isMobile && (
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              {inlineSearch}
            </Box>
          )}

          {/* Right — nav links + language (desktop) / hamburger (mobile) */}
          {!isMobile ? (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ flexShrink: 0 }}
            >
              {navItems.map((item) => (
                <NavLink key={item.path} label={item.label} path={item.path} />
              ))}
              {langSelector}
            </Stack>
          ) : (
            <Box sx={{ ml: 'auto' }}>{hamburger}</Box>
          )}
        </Box>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            background: '#FFFFFF',
            border: `1px solid ${BORDER}`,
            boxShadow: '-4px 0 24px rgba(64,86,161,0.10)'
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
