import React from 'react';
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
import logo from '../assets/logo.png';
import { useTranslation } from 'react-i18next';

const GLASS = 'rgba(11, 15, 25, 0.80)';
const BORDER = 'rgba(148, 163, 184, 0.08)';

const footerLinks: {
  section: string;
  icon: string;
  items: { label: string; to: string }[];
}[] = [
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

const socialLinks = [
  { icon: 'ph:github-logo-fill', href: 'https://github.com', label: 'GitHub' },
  {
    icon: 'ph:twitter-logo-fill',
    href: 'https://twitter.com',
    label: 'Twitter'
  }
];

export default function Footer() {
  const { t } = useTranslation('translation');

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        background: GLASS,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: `1px solid ${BORDER}`,
        mt: 'auto',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Top gradient accent line */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, #6366F1 20%, #06B6D4 50%, #8B5CF6 80%, transparent 100%)',
          opacity: 0.5
        }}
      />

      {/* Faint aurora glow behind footer */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '30%',
          width: '40%',
          height: '180px',
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ position: 'relative', py: { xs: 5, md: 7 } }}
      >
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand column */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
              <Box
                component="img"
                src={logo}
                alt="FreeEditingTools"
                sx={{
                  height: 38,
                  width: 'auto',
                  filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.45))'
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  background:
                    'linear-gradient(135deg, #818CF8 0%, #22D3EE 60%, #A78BFA 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {t('hero.brand')}
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: 'rgba(148,163,184,0.75)',
                lineHeight: 1.7,
                maxWidth: 300,
                mb: 3
              }}
            >
              {t('hero.description')}
            </Typography>

            {/* Built client-side badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.5,
                py: 0.6,
                borderRadius: '20px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16,185,129,0.2)',
                color: '#10B981',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.03em'
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 6px rgba(16,185,129,0.8)',
                  animation: 'pulseGlow 2s ease-in-out infinite'
                }}
              />
              100% Client-Side Processing
            </Box>

            {/* Social links */}
            <Stack direction="row" spacing={1} mt={2.5}>
              {socialLinks.map((s) => (
                <Box
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '9px',
                    border: '1px solid rgba(148,163,184,0.12)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(148,163,184,0.6)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#818CF8',
                      borderColor: 'rgba(99,102,241,0.4)',
                      background: 'rgba(99,102,241,0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(99,102,241,0.2)'
                    }
                  }}
                >
                  <Icon icon={s.icon} fontSize={18} />
                </Box>
              ))}
            </Stack>
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
                <Icon
                  icon={group.icon}
                  fontSize={15}
                  color="rgba(99,102,241,0.7)"
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'rgba(148,163,184,0.5)'
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
                      variant="body2"
                      sx={{
                        color: 'rgba(148,163,184,0.65)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        '&:hover': {
                          color: '#818CF8',
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

          {/* Stats mini column */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(148,163,184,0.5)',
                display: 'block',
                mb: 2.5
              }}
            >
              By the Numbers
            </Typography>
            <Stack spacing={2}>
              {[
                { value: '119+', label: 'Free Tools', color: '#6366F1' },
                { value: '10', label: 'Languages', color: '#06B6D4' },
                { value: '0', label: 'Data Sent', color: '#10B981' }
              ].map((stat) => (
                <Stack
                  key={stat.label}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontFamily: '"Outfit", sans-serif',
                      fontWeight: 800,
                      fontSize: '1.3rem',
                      color: stat.color,
                      lineHeight: 1,
                      minWidth: 48,
                      textShadow: `0 0 12px ${stat.color}60`
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(148,163,184,0.55)', fontSize: '0.8rem' }}
                  >
                    {stat.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Divider sx={{ borderColor: BORDER, my: 4 }} />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'center', sm: 'center' }}
          spacing={1}
        >
          <Typography
            variant="caption"
            sx={{ color: 'rgba(148,163,184,0.4)', fontSize: '0.75rem' }}
          >
            &copy; {new Date().getFullYear()} {t('hero.brand')}. All rights
            reserved.
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(148,163,184,0.4)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            Built with
            <Icon icon="ph:heart-fill" fontSize={11} color="#EC4899" />
            for privacy-first computing
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
