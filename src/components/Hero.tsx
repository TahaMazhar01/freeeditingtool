import {
  Autocomplete,
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { DefinedTool } from '@tools/defineTool';
import { filterTools, tools } from '@tools/index';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getToolCategoryTitle } from '@utils/string';
import { useTranslation } from 'react-i18next';
import { FullI18nKey, validNamespaces } from '../i18n';
import {
  getBookmarkedToolPaths,
  isBookmarked,
  toggleBookmarked
} from '@utils/bookmark';
import IconButton from '@mui/material/IconButton';
import { useUserTypeFilter } from '../providers/UserTypeFilterProvider';

/* ── Autocomplete group header ──────────────────────────── */
const GroupHeader = styled('div')({
  position: 'sticky',
  top: '-8px',
  padding: '5px 12px',
  fontSize: '0.70rem',
  fontWeight: 700,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: '#22D3EE',
  background: 'rgba(8,11,17,0.97)',
  backdropFilter: 'blur(16px)',
  borderBottom: '1px solid rgba(255,255,255,0.06)'
});

const GroupItems = styled('ul')({ padding: 0 });

type ToolInfo = { label: FullI18nKey; url: string };

/* Quick-access example tools */
const EXAMPLE_TOOLS: ToolInfo[] = [
  {
    label: 'translation:hero.examples.createTransparentImage',
    url: '/image-generic/create-transparent'
  },
  { label: 'translation:hero.examples.prettifyJson', url: '/json/prettify' },
  {
    label: 'translation:hero.examples.changeGifSpeed',
    url: '/gif/change-speed'
  },
  { label: 'translation:hero.examples.sortList', url: '/list/sort' },
  { label: 'translation:hero.examples.compressPng', url: '/png/compress-png' },
  { label: 'translation:hero.examples.splitText', url: '/string/split' },
  { label: 'translation:hero.examples.splitPdf', url: '/pdf/split-pdf' },
  { label: 'translation:hero.examples.trimVideo', url: '/video/trim' },
  { label: 'translation:hero.examples.calculateNumberSum', url: '/number/sum' }
];

/* Inline stats row */
const STATS = [
  {
    value: '119+',
    label: 'Free Tools',
    icon: 'ph:wrench-duotone',
    color: '#818CF8'
  },
  {
    value: '10',
    label: 'Languages',
    icon: 'ph:translate-duotone',
    color: '#22D3EE'
  },
  {
    value: '0',
    label: 'Data Sent',
    icon: 'ph:cloud-slash-duotone',
    color: '#10B981'
  },
  {
    value: '100%',
    label: 'In-Browser',
    icon: 'ph:browser-duotone',
    color: '#A855F7'
  }
];

export default function Hero() {
  const { t } = useTranslation(validNamespaces);
  const [inputValue, setInputValue] = useState('');
  const { selectedUserTypes } = useUserTypeFilter();
  const [filteredTools, setFilteredTools] = useState<DefinedTool[]>(tools);
  const [bookmarkedPaths, setBookmarkedPaths] = useState<string[]>(
    getBookmarkedToolPaths()
  );
  const navigate = useNavigate();

  const handleInputChange = (_e: unknown, val: string) => {
    setInputValue(val);
    setFilteredTools(filterTools(tools, val, selectedUserTypes, t));
  };

  const toolsMap = new Map<string, ToolInfo>();
  for (const tool of filteredTools) {
    toolsMap.set(tool.path, { label: tool.name, url: '/' + tool.path });
  }

  const displayedTools =
    bookmarkedPaths.length > 0
      ? bookmarkedPaths.flatMap((p) => {
          const tool = toolsMap.get(p);
          return tool ? [tool] : [];
        })
      : EXAMPLE_TOOLS;

  return (
    /* ── Content region — Hero.tsx controls only the INNER content.
       The background image wrapper lives in home/index.tsx.        ── */
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 900,
        mx: 'auto',
        textAlign: 'center',
        px: { xs: 2, md: 4 }
      }}
    >
      {/* ── Live-pulse badge ────────────────────────────── */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          px: 2,
          py: 0.6,
          mb: 2.5,
          borderRadius: 999,
          background: 'rgba(6,182,212,0.08)',
          border: '1px solid rgba(6,182,212,0.22)',
          color: '#22D3EE',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.04em',
          boxShadow: '0 0 18px rgba(6,182,212,0.12)',
          animation: 'slideUpFade 0.6s cubic-bezier(0.16,1,0.3,1) both'
        }}
      >
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#22D3EE',
            boxShadow: '0 0 8px #22D3EE',
            animation: 'pulseGlow 2.5s ease-in-out infinite'
          }}
        />
        Open Source · Free Forever · Privacy First
      </Box>

      {/* ── Main Headline ───────────────────────────────── */}
      <Typography
        variant="h1"
        sx={{
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 900,
          fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem', lg: '4.4rem' },
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          mb: 1.5,
          color: '#F1F5F9',
          animation: 'slideUpFade 0.7s 0.08s cubic-bezier(0.16,1,0.3,1) both'
        }}
      >
        {t('translation:hero.title')}{' '}
        <Box
          component="span"
          sx={{
            background:
              'linear-gradient(135deg, #A5B4FC 0%, #22D3EE 45%, #C4B5FD 100%)',
            backgroundSize: '300% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmerSlide 5s linear infinite',
            display: 'inline-block'
          }}
        >
          {t('translation:hero.brand')}
        </Box>
      </Typography>

      {/* ── Subtitle ────────────────────────────────────── */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '0.95rem', md: '1.1rem' },
          color: 'rgba(148,163,184,0.85)',
          maxWidth: 560,
          lineHeight: 1.75,
          mb: 4,
          animation: 'slideUpFade 0.7s 0.16s cubic-bezier(0.16,1,0.3,1) both'
        }}
      >
        {t('translation:hero.description')}
      </Typography>

      {/* ── Glass search bar ─────────────────────────────
          Neon cyan glow on focus — matches cyan cube highlights.
          Width covers the "dark empty center" of the hero image.   */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 680,
          mb: 3.5,
          animation: 'slideUpFade 0.7s 0.22s cubic-bezier(0.16,1,0.3,1) both'
        }}
      >
        <Autocomplete
          autoHighlight
          options={filteredTools}
          noOptionsText={t('translation:hero.search.noResult')}
          filterOptions={(o) => o}
          groupBy={(o) => o.type}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{getToolCategoryTitle(params.group, t)}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          inputValue={inputValue}
          getOptionLabel={(o) => t(o.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              placeholder={t('translation:hero.search.placeholder')}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <Icon
                    icon="ph:magnifying-glass-bold"
                    fontSize={20}
                    color="rgba(34,211,238,0.6)"
                    style={{ marginRight: 10, flexShrink: 0 }}
                  />
                ),
                sx: {
                  borderRadius: '14px',
                  background: 'rgba(8,11,17,0.75)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '0.95rem',
                  color: '#F1F5F9',
                  transition: 'all 0.3s ease',
                  '&.Mui-focused': {
                    border: '1px solid rgba(6,182,212,0.55)',
                    boxShadow: [
                      '0 0 0 3px rgba(6,182,212,0.15)',
                      '0 0 28px rgba(6,182,212,0.22)',
                      '0 8px 32px rgba(0,0,0,0.5)'
                    ].join(', '),
                    background: 'rgba(8,11,17,0.90)'
                  },
                  '& fieldset': { border: 'none' },
                  px: 0.5,
                  py: 0.75
                }
              }}
              onChange={(e) => handleInputChange(e, e.target.value)}
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              onClick={() => navigate('/' + option.path)}
              sx={{
                transition: 'background 0.15s ease',
                '&:hover': { background: 'rgba(6,182,212,0.08)' }
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(6,182,212,0.10)',
                      color: '#22D3EE',
                      flexShrink: 0
                    }}
                  >
                    <Icon icon={option.icon} fontSize={18} />
                  </Box>
                  <Box textAlign="left">
                    <Typography
                      fontWeight={600}
                      fontSize="0.88rem"
                      color="#E2E8F0"
                    >
                      {t(option.name)}
                    </Typography>
                    <Typography
                      fontSize="0.73rem"
                      color="rgba(148,163,184,0.65)"
                    >
                      {t(option.shortDescription)}
                    </Typography>
                  </Box>
                </Stack>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmarked(option.path);
                    setBookmarkedPaths(getBookmarkedToolPaths());
                  }}
                  sx={{
                    color: isBookmarked(option.path)
                      ? '#22D3EE'
                      : 'rgba(148,163,184,0.35)',
                    '&:hover': { color: '#22D3EE' }
                  }}
                >
                  <Icon
                    fontSize={15}
                    icon={
                      isBookmarked(option.path)
                        ? 'ph:bookmark-fill'
                        : 'ph:bookmark'
                    }
                  />
                </IconButton>
              </Stack>
            </Box>
          )}
          onChange={(_e, newValue) => {
            if (newValue) navigate('/' + newValue.path);
          }}
        />
      </Box>

      {/* ── Quick-access chips ───────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          maxWidth: 700,
          mb: 5,
          animation: 'slideUpFade 0.7s 0.30s cubic-bezier(0.16,1,0.3,1) both'
        }}
      >
        {displayedTools.map((tool) => (
          <Chip
            key={tool.label}
            label={
              <Stack direction="row" spacing={0.5} alignItems="center">
                <span>{t(tool.label)}</span>
                {bookmarkedPaths.length > 0 && (
                  <Box
                    component="span"
                    onClick={(e) => {
                      e.stopPropagation();
                      const path = tool.url.substring(1);
                      toggleBookmarked(path);
                      setBookmarkedPaths(getBookmarkedToolPaths());
                    }}
                    sx={{ lineHeight: 1, ml: 0.25 }}
                  >
                    <Icon
                      icon="ph:x"
                      fontSize={10}
                      color="rgba(148,163,184,0.5)"
                    />
                  </Box>
                )}
              </Stack>
            }
            onClick={() =>
              navigate(tool.url.startsWith('/') ? tool.url : `/${tool.url}`)
            }
            sx={{
              height: 30,
              fontSize: '0.75rem',
              fontWeight: 500,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(148,163,184,0.75)',
              borderRadius: '8px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(6,182,212,0.10)',
                borderColor: 'rgba(6,182,212,0.30)',
                color: '#22D3EE',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 14px rgba(6,182,212,0.15)'
              },
              '& .MuiChip-label': { px: 1.5 }
            }}
          />
        ))}
      </Box>

      {/* ── Stats row ────────────────────────────────────── */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1.5}
        justifyContent="center"
        sx={{
          animation: 'slideUpFade 0.7s 0.38s cubic-bezier(0.16,1,0.3,1) both'
        }}
      >
        {STATS.map((stat) => (
          <Box
            key={stat.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 2,
              py: 1.25,
              borderRadius: '12px',
              background: 'rgba(8,11,17,0.55)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.25s ease',
              '&:hover': {
                background: `${alpha(stat.color, 0.07)}`,
                borderColor: alpha(stat.color, 0.22),
                transform: 'translateY(-3px)',
                boxShadow: `0 8px 20px ${alpha(stat.color, 0.14)}`
              }
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: alpha(stat.color, 0.12),
                color: stat.color,
                boxShadow: `0 0 10px ${alpha(stat.color, 0.2)}`
              }}
            >
              <Icon icon={stat.icon} fontSize={17} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: stat.color,
                  lineHeight: 1,
                  textShadow: `0 0 12px ${alpha(stat.color, 0.45)}`
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.68rem',
                  color: 'rgba(148,163,184,0.5)',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  mt: 0.2
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
