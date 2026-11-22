import { Box, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

interface AdPlaceholderProps {
  variant: 'banner' | 'rectangle';
}

/*
 * Premium light-theme ad containers.
 * Cream background + deep-blue accents blend naturally into the
 * #FAFAF8 page body without looking like spam.
 * Replace the inner content with your real AdSense <ins> tags.
 */
export default function AdPlaceholder({ variant }: AdPlaceholderProps) {
  // Set to true once Google AdSense is officially approved
  const ENABLE_ADS = false;

  if (!ENABLE_ADS) {
    return null;
  }

  if (variant === 'banner') {
    return (
      <Box
        className="adsense-leaderboard"
        sx={{
          width: '100%',
          maxWidth: 728,
          height: 90,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          borderRadius: '12px',
          background: '#EFE2BA',
          border: '1px solid #E8D9A8',
          boxShadow: '0 2px 12px rgba(64,86,161,0.08)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background:
              'linear-gradient(90deg, #4056A1 0%, #D79922 50%, #4056A1 100%)',
            opacity: 0.6
          }
        }}
      >
        {/* Left — label */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'rgba(64,86,161,0.10)',
              border: '1px solid rgba(64,86,161,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4056A1'
            }}
          >
            <Icon icon="ph:lightning-duotone" fontSize={16} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#4056A1',
                fontFamily: '"Inter", sans-serif',
                lineHeight: 1
              }}
            >
              Sponsored
            </Typography>
            <Typography
              sx={{
                fontSize: '0.72rem',
                color: '#555577',
                fontFamily: '"Inter", sans-serif',
                lineHeight: 1.3,
                mt: 0.3
              }}
            >
              728 × 90 — Leaderboard
            </Typography>
          </Box>
        </Stack>

        {/* Right — badge */}
        <Box
          sx={{
            px: 1.25,
            py: 0.35,
            borderRadius: '20px',
            background: 'rgba(64,86,161,0.08)',
            border: '1px solid rgba(64,86,161,0.18)',
            color: '#4056A1',
            fontSize: '0.62rem',
            fontWeight: 700,
            fontFamily: '"Inter", sans-serif',
            letterSpacing: '0.07em',
            textTransform: 'uppercase'
          }}
        >
          Ad
        </Box>
      </Box>
    );
  }

  /* ── Rectangle variant ───────────────────────────────── */
  return (
    <Box
      className="adsense-rectangle"
      sx={{
        width: '100%',
        minHeight: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        borderRadius: '12px',
        background: '#EFE2BA',
        border: '1px solid #E8D9A8',
        boxShadow: '0 2px 10px rgba(64,86,161,0.07)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '3px',
          background: 'linear-gradient(180deg, #4056A1 0%, #D79922 100%)',
          opacity: 0.55
        }
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          background: 'rgba(64,86,161,0.09)',
          border: '1px solid rgba(64,86,161,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4056A1'
        }}
      >
        <Icon icon="ph:lightning-duotone" fontSize={22} />
      </Box>

      <Typography
        sx={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#4056A1',
          fontFamily: '"Inter", sans-serif'
        }}
      >
        Sponsored
      </Typography>
      <Typography
        sx={{
          fontSize: '0.72rem',
          color: '#555577',
          fontFamily: '"Inter", sans-serif',
          textAlign: 'center'
        }}
      >
        300 × 250 — Inline Rectangle
      </Typography>
    </Box>
  );
}
