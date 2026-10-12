import { Box, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { ToolCardProps } from './AllTools';

export default function ToolCard({
  title,
  description,
  link,
  icon
}: Omit<ToolCardProps, 'title' | 'description'> & {
  title: string;
  description: string;
}) {
  return (
    <Card
      component={Link}
      to={link}
      sx={{
        display: 'block',
        textDecoration: 'none',
        height: '100%',
        minHeight: { xs: 310, sm: 330 },
        color: '#fff',
        background:
          'linear-gradient(135deg, #344B83 0%, #4056A1 62%, #2D3D7A 100%)',
        border: '1px solid rgba(255,255,255,.22)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 8px 22px rgba(45,61,122,.12)',
        transition: 'transform .22s ease, box-shadow .22s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 16px 32px rgba(45,61,122,.22)',
          '& .tool-illustration': {
            transform: 'translateY(-5px) rotate(-3deg)'
          }
        },
        '&:focus-visible': { outline: '3px solid #D79922', outlineOffset: 4 },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
          '& .tool-illustration': { transition: 'none' }
        }
      }}
    >
      <CardContent
        sx={{
          p: { xs: '22px !important', sm: '24px !important' },
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontFamily: '"Inter", sans-serif',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: { xs: '1.15rem', sm: '1.25rem' },
            lineHeight: 1.3,
            overflowWrap: 'anywhere',
            mb: 1
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '.9rem',
            lineHeight: 1.65,
            color: '#E7EBF8',
            minHeight: 48
          }}
        >
          {description}
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            height: 155,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            py: 2
          }}
        >
          <Box sx={{ position: 'relative', width: 180, height: 128 }}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 14,
                width: 154,
                height: 18,
                borderRadius: '50%',
                bgcolor: 'rgba(15,26,61,.28)'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: 48,
                top: 16,
                width: 114,
                height: 94,
                borderRadius: '14px',
                background: '#D79922',
                transform: 'rotate(9deg)',
                opacity: 0.8
              }}
            />
            <Box
              className="tool-illustration"
              sx={{
                position: 'absolute',
                left: 24,
                top: 4,
                width: 124,
                height: 104,
                borderRadius: '14px',
                background: 'linear-gradient(135deg,#FFF7DF,#E9D79E)',
                transform: 'rotate(-8deg)',
                border: '1px solid rgba(255,255,255,.7)',
                boxShadow: '7px 9px 0 rgba(15,26,61,.22)',
                transition: 'transform .22s ease'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 77,
                  color: '#4056A1'
                }}
              >
                <Icon icon={icon ?? 'ph:compass-tool-bold'} fontSize={52} />
              </Box>
              <Box
                sx={{
                  mx: 'auto',
                  width: 58,
                  height: 4,
                  borderRadius: 4,
                  bgcolor: 'rgba(64,86,161,.35)'
                }}
              />
              <Box
                sx={{
                  mx: 'auto',
                  mt: 0.7,
                  width: 38,
                  height: 4,
                  borderRadius: 4,
                  bgcolor: 'rgba(64,86,161,.2)'
                }}
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                right: 6,
                top: 68,
                width: 33,
                height: 33,
                borderRadius: '50%',
                background: '#F5D76E',
                border: '3px solid #C39832',
                display: 'grid',
                placeItems: 'center',
                color: '#2D3D7A'
              }}
            >
              <Icon icon="ph:check-bold" fontSize={18} />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 'auto',
            pt: 1,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#F5D76E',
              color: '#2D3D7A',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <Icon icon="ph:arrow-right" fontSize={20} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
