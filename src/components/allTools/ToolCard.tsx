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

const PRIMARY = '#4056A1';
const GOLD = '#D79922';

const ACCENT_COLORS = [
  '#4056A1' /* Deep Blue  */,
  '#D79922' /* Gold       */,
  '#F13C20' /* Red        */,
  '#2D3D7A' /* Dark Blue  */,
  '#B07A10' /* Dark Gold  */,
  '#2D9E6B' /* Teal       */
];

let _colorIdx = 0;
const nextAccent = () => ACCENT_COLORS[_colorIdx++ % ACCENT_COLORS.length];

export default function ToolCard({
  title,
  description,
  link,
  icon
}: ToolCardProps) {
  const navigate = useNavigate();
  const accent = nextAccent();

  return (
    <Card
      onClick={() => navigate(link)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        background: '#FFFFFF',
        border: '1px solid #E8E4D9',
        boxShadow: '0 2px 12px rgba(64,86,161,0.08)',
        borderRadius: '12px',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
        overflow: 'hidden',
        /* Accent left stripe on hover */
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '3px',
          height: '100%',
          background: accent,
          opacity: 0,
          transition: 'opacity 0.25s ease'
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: alpha(accent, 0.4),
          boxShadow: `0 8px 28px rgba(64,86,161,0.13)`,
          '&::before': { opacity: 1 },
          '& .tc-icon': { background: alpha(accent, 0.14) },
          '& .tc-title': { color: accent },
          '& .tc-arrow': { opacity: 1, transform: 'translateX(0)' }
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
          sx={{ borderBottom: '1px solid #E8E4D9' }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              className="tc-icon"
              sx={{
                width: 42,
                height: 42,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: alpha(accent, 0.08),
                color: accent,
                border: `1px solid ${alpha(accent, 0.16)}`,
                transition: 'background 0.22s ease',
                flexShrink: 0
              }}
            >
              <Icon icon={icon} fontSize={22} />
            </Box>
            <Typography
              className="tc-title"
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                lineHeight: 1.25,
                color: '#1A1A2E',
                transition: 'color 0.2s ease'
              }}
            >
              {title}
            </Typography>
          </Stack>

          <Box
            className="tc-arrow"
            sx={{
              color: accent,
              opacity: 0,
              transform: 'translateX(-6px)',
              transition: 'all 0.22s ease',
              mt: 0.5,
              flexShrink: 0
            }}
          >
            <Icon icon="ph:arrow-right-bold" fontSize={15} />
          </Box>
        </Stack>

        {/* Description */}
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.8rem',
            lineHeight: 1.6,
            color: '#555577',
            flex: 1
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
