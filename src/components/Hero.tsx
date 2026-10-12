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
import { useState, useEffect, useMemo } from 'react';
import { DefinedTool } from '@tools/defineTool';
import { filterTools, tools, getToolCategoryTitle } from '@tools/index';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { FullI18nKey, validNamespaces } from '../i18n';
import {
  getBookmarkedToolPaths,
  isBookmarked,
  toggleBookmarked
} from '@utils/bookmark';
import IconButton from '@mui/material/IconButton';
import { useUserTypeFilter } from '../providers/UserTypeFilterProvider';

const PRIMARY = '#4056A1';
const GOLD = '#D79922';

/* ── Autocomplete group header ──────────────────────────────── */
const GroupHeader = styled('div')({
  position: 'sticky',
  top: '-8px',
  padding: '5px 14px',
  fontSize: '0.70rem',
  fontWeight: 700,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  color: '#4056A1',
  background: '#FFFFFF',
  borderBottom: '1px solid #E8E4D9',
  fontFamily: '"Inter", sans-serif'
});

const GroupItems = styled('ul')({ padding: 0 });

type ToolInfo = { label: FullI18nKey; url: string };

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

export default function Hero() {
  const { t } = useTranslation(validNamespaces);
  const [inputValue, setInputValue] = useState('');
  const { selectedUserTypes } = useUserTypeFilter();
  const [filteredTools, setFilteredTools] = useState<DefinedTool[]>(tools);
  const [bookmarkedPaths, setBookmarkedPaths] = useState<string[]>(
    getBookmarkedToolPaths()
  );
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredTools(filterTools(tools, inputValue, selectedUserTypes, t));
    }, 150);
    return () => clearTimeout(timer);
  }, [inputValue, selectedUserTypes, t]);

  const handleInputChange = (_e: unknown, val: string) => {
    setInputValue(val);
  };

  const toolsMap = useMemo(() => {
    const map = new Map<string, ToolInfo>();
    for (const tool of filteredTools) {
      map.set(tool.path, { label: tool.name, url: '/' + tool.path });
    }
    return map;
  }, [filteredTools]);

  const displayedTools =
    bookmarkedPaths.length > 0
      ? bookmarkedPaths.flatMap((p) => {
          const tool = toolsMap.get(p);
          return tool ? [tool] : [];
        })
      : EXAMPLE_TOOLS;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 860,
        mx: 'auto',
        textAlign: 'center',
        px: { xs: 2, md: 4 }
      }}
    >
      {/* ── Playfair Display headline ────────────────────────── */}
      <Typography
        variant="h1"
        sx={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontWeight: 700,
          fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem', lg: '4rem' },
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          color: PRIMARY,
          mb: 1.5,
          animation: 'slideUpFade 0.6s 0.08s cubic-bezier(0.16,1,0.3,1) both'
        }}
      >
        {t('translation:hero.title')}{' '}
        <Box
          component="span"
          sx={{
            color: '#F13C20',
            position: 'relative',
            /* Gold underline accent on brand name */
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 2,
              left: 0,
              right: 0,
              height: 3,
              borderRadius: 2,
              background: GOLD,
              opacity: 0.6
            }
          }}
        >
          {t('translation:hero.brand')}
        </Box>
      </Typography>

      {/* ── Subtitle ────────────────────────────────────────── */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '1rem', md: '1.1rem' },
          color: '#555577',
          maxWidth: 540,
          lineHeight: 1.7,
          mb: 4,
          fontFamily: '"Inter", sans-serif',
          animation: 'slideUpFade 0.6s 0.14s cubic-bezier(0.16,1,0.3,1) both'
        }}
      >
        {t('translation:hero.description')}
      </Typography>

      {/* ── Search bar ─────────────────────────────────────────
          White background, deep-blue border on focus,
          gold search icon — clear and readable on cream/white.  */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 660,
          mb: 3.5,
          animation: 'slideUpFade 0.6s 0.20s cubic-bezier(0.16,1,0.3,1) both'
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
                    color={GOLD}
                    style={{ marginRight: 10, flexShrink: 0 }}
                  />
                ),
                sx: {
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  fontSize: '1rem',
                  color: '#1A1A2E',
                  border: '1.5px solid #E8E4D9',
                  boxShadow: '0 2px 8px rgba(64,86,161,0.06)',
                  transition: 'all 0.25s ease',
                  '&.Mui-focused': {
                    border: `1.5px solid ${PRIMARY}`,
                    boxShadow: `0 0 0 3px ${alpha(
                      PRIMARY,
                      0.12
                    )}, 0 4px 16px rgba(64,86,161,0.10)`
                  },
                  '& fieldset': { border: 'none' },
                  px: 0.5,
                  py: 0.5
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
                '&:hover': { background: alpha(PRIMARY, 0.05) }
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
                      background: '#EFE2BA',
                      color: PRIMARY,
                      flexShrink: 0
                    }}
                  >
                    <Icon icon={option.icon} fontSize={17} />
                  </Box>
                  <Box textAlign="left">
                    <Typography
                      fontWeight={600}
                      fontSize="0.88rem"
                      color="#1A1A2E"
                      fontFamily='"Inter", sans-serif'
                    >
                      {t(option.name)}
                    </Typography>
                    <Typography
                      fontSize="0.73rem"
                      color="#555577"
                      fontFamily='"Inter", sans-serif'
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
                    color: isBookmarked(option.path) ? PRIMARY : '#C5CBE3',
                    '&:hover': { color: PRIMARY }
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

      {/* ── Quick-access chips ────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          maxWidth: 680,
          mb: 5,
          animation: 'slideUpFade 0.6s 0.28s cubic-bezier(0.16,1,0.3,1) both'
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
                    sx={{ lineHeight: 1 }}
                  >
                    <Icon icon="ph:x" fontSize={10} color="#555577" />
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
              fontFamily: '"Inter", sans-serif',
              background: '#EFE2BA',
              border: '1px solid #E8D9A8',
              color: '#1A1A2E',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: alpha(PRIMARY, 0.08),
                borderColor: alpha(PRIMARY, 0.35),
                color: PRIMARY,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 10px ${alpha(PRIMARY, 0.12)}`
              },
              '& .MuiChip-label': { px: 1.5 }
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
