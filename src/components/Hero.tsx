import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  Typography,
  alpha
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useState, useEffect, useMemo } from 'react';
import { DefinedTool } from '@tools/defineTool';
import { filterTools, tools, getToolCategoryTitle } from '@tools/index';
import { Link, useNavigate } from 'react-router-dom';
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
    for (const tool of tools) {
      map.set(tool.path, { label: tool.name, url: '/' + tool.path });
    }
    return map;
  }, []);

  const displayedTools = bookmarkedPaths.flatMap((path) => {
    const tool = toolsMap.get(path);
    return tool ? [tool] : [];
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        alignItems: 'center',
        width: '100%',
        maxWidth: 960,
        mx: 'auto',
        textAlign: 'center',
        px: { xs: 2, md: 4 }
      }}
    >
      <Box
        sx={{
          gridColumn: '1 / -1',
          textAlign: 'center',
          maxWidth: 920,
          mx: 'auto'
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem', lg: '4rem' },
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: PRIMARY,
            overflowWrap: 'anywhere'
          }}
        >
          {t('translation:hero.deskHeadingPrefix')}{' '}
          <Box
            component="span"
            sx={{
              color: '#F13C20',
              position: 'relative',
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
      </Box>
      <Box sx={{ minWidth: 0, width: '100%', maxWidth: 660 }}>
        <Typography
          sx={{
            color: '#555577',
            fontSize: { xs: 16, md: 18 },
            lineHeight: 1.8,
            mb: 3,
            maxWidth: 620,
            mx: 'auto'
          }}
        >
          {t('translation:hero.deskDescription')}
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
                <GroupHeader>
                  {getToolCategoryTitle(params.group, t)}
                </GroupHeader>
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
                inputProps={{
                  ...params.inputProps,
                  'aria-label': t('translation:hero.search.placeholder')
                }}
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
                    aria-label={
                      isBookmarked(option.path)
                        ? `Unsave ${t(option.name)}`
                        : `Save ${t(option.name)}`
                    }
                    aria-pressed={isBookmarked(option.path)}
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

        <Typography sx={{ color: '#66708C', fontSize: 13 }}>
          {t('translation:hero.deskNote')}
        </Typography>
      </Box>
      {displayedTools.length > 0 && (
        <Box
          sx={{
            borderRadius: '28px',
            background: '#FFFFFF',
            border: '1px solid #E4DFD2',
            p: { xs: 2.5, md: 3.5 },
            boxShadow: '0 18px 48px rgba(40,55,109,0.08)'
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" mb={2.5}>
            <Box
              sx={{
                background: '#F9E9AF',
                color: PRIMARY,
                p: 1,
                borderRadius: '12px',
                display: 'flex'
              }}
            >
              <Icon
                icon={
                  bookmarkedPaths.length
                    ? 'ph:bookmark-simple-bold'
                    : 'ph:lightning-bold'
                }
                fontSize={24}
              />
            </Box>
            <Box>
              <Typography
                component="h2"
                sx={{ fontSize: 21, fontWeight: 700, color: '#28376D' }}
              >
                {t(
                  bookmarkedPaths.length
                    ? 'translation:hero.savedDesk'
                    : 'translation:hero.quickDesk'
                )}
              </Typography>
              <Typography sx={{ fontSize: 13, color: '#66708C' }}>
                {t('translation:hero.quickDeskNote')}
              </Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'minmax(0, 1fr)',
                sm: 'repeat(2, minmax(0, 1fr))'
              },
              gap: 1
            }}
          >
            {displayedTools.map((tool) => (
              <Box
                key={tool.url}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#F6F7FB',
                  borderRadius: '12px',
                  minWidth: 0,
                  '&:hover': { background: '#EDF0FA' }
                }}
              >
                <Box
                  component={Link}
                  to={tool.url}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    p: 1.5,
                    flex: 1,
                    minWidth: 0,
                    color: '#28376D',
                    textDecoration: 'none',
                    '&:focus-visible': {
                      outline: '2px solid #4056A1',
                      borderRadius: '12px'
                    }
                  }}
                >
                  <Icon
                    icon={
                      tools.find((item) => '/' + item.path === tool.url)
                        ?.icon || 'ph:arrow-right'
                    }
                    fontSize={21}
                    style={{ flexShrink: 0 }}
                  />
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      overflowWrap: 'anywhere'
                    }}
                  >
                    {t(tool.label)}
                  </Typography>
                </Box>
                {bookmarkedPaths.length > 0 && (
                  <IconButton
                    size="small"
                    aria-label={`Unsave ${t(tool.label)}`}
                    onClick={() => {
                      toggleBookmarked(tool.url.substring(1));
                      setBookmarkedPaths(getBookmarkedToolPaths());
                    }}
                  >
                    <Icon icon="ph:x" fontSize={16} />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
