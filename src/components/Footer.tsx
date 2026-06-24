import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

const PRIMARY = '#4056A1';
const PRIMARY_DARK = '#2D3D7A';
const GOLD = '#D79922';
const GOLD_LIGHT = '#F0C040';
const WHITE = '#FFFFFF';
const WHITE_MUTED = 'rgba(255,255,255,0.60)';
const WHITE_BORDER = 'rgba(255,255,255,0.10)';

const footerLinks = [
  {
    section: 'Tools & Site',
    icon: 'ph:wrench-duotone',
    items: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' }
    ]
  },
  {
    section: 'Legal & Support',
    icon: 'ph:shield-check-duotone',
    items: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Contact Us', to: '/contact' }
    ]
  }
];

export default function Footer() {
  const { t } = useTranslation('translation');

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${PRIMARY} 60%, #4D64B8 100%)`,
        color: WHITE,
        mt: 'auto',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        /* Subtle decorative dot pattern */
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        },
        /* Gold top accent line */
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${GOLD} 30%, ${GOLD_LIGHT} 50%, ${GOLD} 70%, transparent)`
        }
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ position: 'relative', py: { xs: 5, md: 7 } }}
      >
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand column */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: '1.15rem',
                  color: WHITE,
                  letterSpacing: '-0.01em'
                }}
              >
                {t('hero.brand')}
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.875rem',
                color: WHITE_MUTED,
                lineHeight: 1.7,
                maxWidth: 300,
                mb: 3
              }}
            >
              {t('hero.description')}
            </Typography>

            {/* Privacy badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
                py: 0.6,
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.08)',
                border: `1px solid ${WHITE_BORDER}`,
                color: GOLD_LIGHT,
                fontSize: '0.72rem',
                fontWeight: 600,
                fontFamily: '"Inter", sans-serif',
                letterSpacing: '0.03em'
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: GOLD_LIGHT,
                  boxShadow: `0 0 6px ${GOLD_LIGHT}`
                }}
              />
              100% Client-Side · Zero Data Sent
            </Box>
          </Grid>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <Grid item xs={6} md={2} key={group.section}>
              <Stack
                direction="row"
                spacing={0.75}
                alignItems="center"
                mb={2.5}
              >
                <Icon icon={group.icon} fontSize={14} color={GOLD} />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.70rem',
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    color: WHITE_MUTED,
                    fontFamily: '"Inter", sans-serif'
                  }}
                >
                  {group.section}
                </Typography>
              </Stack>
              <Stack spacing={1.25}>
                {group.items.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: WHITE_MUTED,
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&:hover': {
                          color: GOLD_LIGHT,
                          transform: 'translateX(3px)'
                        }
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Stats column */}
          <Grid item xs={12} md={3}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.70rem',
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: WHITE_MUTED,
                fontFamily: '"Inter", sans-serif',
                display: 'block',
                mb: 2.5
              }}
            >
              By the Numbers
            </Typography>
            <Stack spacing={2}>
              {[
                { value: '119+', label: 'Free Tools', color: GOLD_LIGHT },
                { value: '10', label: 'Languages', color: WHITE },
                { value: '0', label: 'Data Sent', color: '#6EE7B7' }
              ].map((stat) => (
                <Stack
                  key={stat.label}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      fontSize: '1.4rem',
                      color: stat.color,
                      lineHeight: 1,
                      minWidth: 52
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '0.8rem',
                      color: WHITE_MUTED
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: WHITE_BORDER, my: 4 }} />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.78rem',
              color: WHITE_MUTED
            }}
          >
            &copy; {new Date().getFullYear()} {t('hero.brand')}. All rights
            reserved.
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.78rem',
              color: WHITE_MUTED,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            Built with
            <Icon icon="ph:heart-fill" fontSize={11} color={GOLD} />
            for privacy-first computing
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
