import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

interface AdPlaceholderProps {
  variant: 'banner' | 'rectangle';
}

/* ─────────────────────────────────────────────────────────────
   Premium glass ad containers that blend into the UI as
   content cards rather than obvious ad placeholders.
   Replace the inner content with your real AdSense <ins> tags.
   ───────────────────────────────────────────────────────────── */

export default function AdPlaceholder({ variant }: AdPlaceholderProps) {
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
          borderRadius: '14px',
          background: 'rgba(17,24,39,0.55)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(99,102,241,0.15)',
          boxShadow:
            '0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden',
          /* Subtle shimmer sweep on the premium ad slot */
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, transparent 40%, rgba(99,102,241,0.06) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
            animation: 'shimmerSlide 4s linear infinite',
            pointerEvents: 'none'
          }
        }}
      >
        {/* Left — slot label */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818CF8'
            }}
          >
            <Icon icon="ph:lightning-duotone" fontSize={16} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(99,102,241,0.6)',
                lineHeight: 1
              }}
            >
              Sponsored
            </Typography>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: 'rgba(148,163,184,0.45)',
                lineHeight: 1.3,
                mt: 0.3
              }}
            >
              728 × 90 — Leaderboard
            </Typography>
          </Box>
        </Stack>

        {/* Right — decorative neon pill */}
        <Box
          sx={{
            px: 1.5,
            py: 0.4,
            borderRadius: '20px',
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.15)',
            color: 'rgba(99,102,241,0.5)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          Ad
        </Box>
      </Box>
    );
  }

  /* ── Rectangle / inline variant ─────────────────────── */
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
        borderRadius: '14px',
        background: 'rgba(17,24,39,0.50)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(99,102,241,0.12)',
        boxShadow:
          '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)',
          pointerEvents: 'none'
        }
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '12px',
          background: 'rgba(99,102,241,0.10)',
          border: '1px solid rgba(99,102,241,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#818CF8',
          mb: 0.5
        }}
      >
        <Icon icon="ph:lightning-duotone" fontSize={22} />
      </Box>

      <Typography
        sx={{
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(99,102,241,0.55)'
        }}
      >
        Sponsored
      </Typography>
      <Typography
        sx={{
          fontSize: '0.72rem',
          color: 'rgba(148,163,184,0.35)',
          textAlign: 'center'
        }}
      >
        300 × 250 — Inline Rectangle
      </Typography>
    </Box>
  );
}
