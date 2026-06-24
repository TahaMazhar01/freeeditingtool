import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  alpha
} from '@mui/material';
import { ToolCardProps } from './AllTools';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

/* Accent palette — each AllTools category section cycles through these */
const ACCENT_COLORS = [
  '#6366F1',
  '#06B6D4',
  '#A855F7',
  '#10B981',
  '#F59E0B',
  '#EC4899',
  '#3B82F6',
  '#14B8A6'
];

let colorIndex = 0;
const getNextColor = () => ACCENT_COLORS[colorIndex++ % ACCENT_COLORS.length];

export default function ToolCard({
  title,
  description,
  link,
  icon
}: ToolCardProps) {
  const navigate = useNavigate();
  const accent = getNextColor();

  return (
    <Card
      onClick={() => navigate(link)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        background: 'rgba(17, 24, 39, 0.60)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(148,163,184,0.09)',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        /* Neon left-edge accent */
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: `linear-gradient(180deg, ${accent} 0%, transparent 100%)`,
          opacity: 0,
          transition: 'opacity 0.3s ease',
          borderRadius: '16px 0 0 16px'
        },
        '&:hover': {
          transform: 'translateY(-5px) scale(1.015)',
          border: `1px solid ${alpha(accent, 0.32)}`,
          boxShadow: `0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px ${alpha(
            accent,
            0.12
          )}, inset 0 1px 0 rgba(255,255,255,0.07)`,
          '&::before': { opacity: 1 },
          '& .card-icon': {
            background: alpha(accent, 0.18),
            boxShadow: `0 0 16px ${alpha(accent, 0.4)}`,
            transform: 'scale(1.08)'
          },
          '& .card-title': { color: accent },
          '& .card-arrow': { opacity: 1, transform: 'translateX(0)' }
        }
      }}
    >
      <CardContent
        sx={{
          p: '20px !important',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header row */}
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          mb={1.5}
          pb={1.5}
          sx={{ borderBottom: '1px solid rgba(148,163,184,0.07)' }}
        >
          {/* Icon + title */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              className="card-icon"
              sx={{
                width: 42,
                height: 42,
                borderRadius: '11px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: alpha(accent, 0.1),
                color: accent,
                border: `1px solid ${alpha(accent, 0.18)}`,
                transition: 'all 0.25s ease',
                flexShrink: 0
              }}
            >
              <Icon icon={icon} fontSize={22} />
            </Box>
            <Typography
              className="card-title"
              variant="h6"
              sx={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                lineHeight: 1.25,
                color: '#E2E8F0',
                transition: 'color 0.2s ease'
              }}
            >
              {title}
            </Typography>
          </Stack>

          {/* Arrow indicator */}
          <Box
            className="card-arrow"
            sx={{
              color: accent,
              opacity: 0,
              transform: 'translateX(-6px)',
              transition: 'all 0.25s ease',
              mt: 0.25
            }}
          >
            <Icon icon="ph:arrow-right-bold" fontSize={16} />
          </Box>
        </Stack>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.8rem',
            lineHeight: 1.6,
            color: 'rgba(148,163,184,0.65)',
            flex: 1
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
