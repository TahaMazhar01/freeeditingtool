import { Box, Container, Grid, Stack, Typography, alpha } from '@mui/material';
import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const PRIMARY = '#4056A1';
const GOLD = '#D79922';
const ACCENT = '#F13C20';

const featureIcons = [
  'ph:shield-check-duotone',
  'ph:lightning-duotone',
  'ph:browsers-duotone',
  'ph:heart-duotone'
];

const featureColors = [PRIMARY, GOLD, ACCENT, '#2D9E6B'];

const stepIcons = [
  'ph:magnifying-glass-duotone',
  'ph:cursor-click-duotone',
  'ph:download-simple-duotone'
];

export default function About() {
  const { t } = useTranslation('translation');

  const features = t('about.features', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const steps = t('about.howItWorks.steps', { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const categories = t('about.categories.items', {
    returnObjects: true
  }) as string[];

  return (
    <Box sx={{ background: '#FAFAF8', minHeight: '100vh', pb: 10 }}>
      <Helmet>
        <title>{t('about.pageTitle')}</title>
        <meta name="description" content={t('about.metaDescription')} />
      </Helmet>

      {/* ══════════════════════════════════════════════════════
          HERO — cream gradient matching the home hero section
          ══════════════════════════════════════════════════════ */}
      <Box
        sx={{
          mt: '-102px',
          pt: { xs: '140px', md: '150px' },
          pb: { xs: 6, md: 8 },
          background:
            'linear-gradient(170deg, #EFE2BA 0%, #F5EDD4 30%, #FAFAF8 65%, #FFFFFF 100%)',
          borderBottom: '1px solid #E8E4D9',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          {/* Logo-style initial */}
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '16px',
              background: `linear-gradient(135deg, ${PRIMARY} 0%, #2D3D7A 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: `0 8px 28px ${alpha(PRIMARY, 0.28)}`
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: '2rem',
                color: '#FFFFFF',
                lineHeight: 1
              }}
            >
              F
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.8rem' },
              color: PRIMARY,
              letterSpacing: '-0.02em',
              lineHeight: 1.12,
              mb: 2
            }}
          >
            {t('about.hero.title')}
          </Typography>

          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: '#555577',
              maxWidth: 640,
              mx: 'auto',
              lineHeight: 1.75
            }}
          >
            {t('about.hero.subtitle')}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 5, md: 7 } }}>
        {/* ── Mission & Privacy cards ──────────────────────── */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {(['mission', 'privacy'] as const).map((key, i) => (
            <Grid item xs={12} md={6} key={key}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  background: '#FFFFFF',
                  border: `1px solid #E8E4D9`,
                  borderRadius: '16px',
                  boxShadow: '0 2px 12px rgba(64,86,161,0.07)',
                  borderTop: `3px solid ${i === 0 ? PRIMARY : GOLD}`,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 28px rgba(64,86,161,0.12)'
                  }
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: alpha(i === 0 ? PRIMARY : GOLD, 0.1),
                      color: i === 0 ? PRIMARY : GOLD
                    }}
                  >
                    <Icon
                      icon={
                        i === 0 ? 'ph:flag-banner-duotone' : 'ph:lock-duotone'
                      }
                      fontSize={22}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      color: PRIMARY,
                      fontSize: '1.2rem'
                    }}
                  >
                    {t(`about.${key}.title` as any)}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    color: '#555577',
                    lineHeight: 1.8,
                    fontSize: '0.95rem'
                  }}
                >
                  {t(`about.${key}.body` as any)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* ── Section heading ──────────────────────────────── */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: '1.6rem', md: '2rem' },
              color: PRIMARY,
              mb: 1
            }}
          >
            {t('about.featuresTitle')}
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 3,
              borderRadius: 2,
              background: GOLD,
              mx: 'auto'
            }}
          />
        </Box>

        {/* ── Feature cards ────────────────────────────────── */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {features.map((feature, i) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Box
                sx={{
                  p: 3,
                  height: '100%',
                  textAlign: 'center',
                  background: '#FFFFFF',
                  border: `1px solid #E8E4D9`,
                  borderRadius: '14px',
                  boxShadow: '0 2px 10px rgba(64,86,161,0.06)',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: alpha(featureColors[i], 0.4),
                    boxShadow: `0 10px 24px ${alpha(featureColors[i], 0.14)}`
                  }
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: alpha(featureColors[i], 0.1),
                    color: featureColors[i],
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Icon icon={featureIcons[i]} fontSize={28} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: PRIMARY,
                    mb: 1
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.85rem',
                    color: '#555577',
                    lineHeight: 1.7
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* ── Categories section ───────────────────────────── */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            mb: 6,
            background: 'linear-gradient(135deg, #EFE2BA 0%, #F5EDD4 100%)',
            border: '1px solid #E8D9A8',
            borderRadius: '16px'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: PRIMARY,
              fontSize: { xs: '1.4rem', md: '1.75rem' },
              mb: 1
            }}
          >
            {t('about.categories.title')}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              color: '#555577',
              lineHeight: 1.8,
              mb: 3,
              fontSize: '0.95rem'
            }}
          >
            {t('about.categories.body')}
          </Typography>
          <Grid container spacing={1.5}>
            {categories.map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item}>
                <Box
                  sx={{
                    px: 2,
                    py: 1.2,
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: `1px solid ${alpha(PRIMARY, 0.15)}`,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    fontFamily: '"Inter", sans-serif',
                    textAlign: 'center',
                    color: PRIMARY,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: PRIMARY,
                      color: '#FFFFFF',
                      borderColor: PRIMARY,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {item}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── How it works ─────────────────────────────────── */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: '1.6rem', md: '2rem' },
              color: PRIMARY,
              mb: 1
            }}
          >
            {t('about.howItWorks.title')}
          </Typography>
          <Box
            sx={{
              width: 48,
              height: 3,
              borderRadius: 2,
              background: GOLD,
              mx: 'auto'
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {steps.map((step, i) => (
            <Grid item xs={12} md={4} key={step.title}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  textAlign: 'center',
                  background: '#FFFFFF',
                  border: `1px solid #E8E4D9`,
                  borderRadius: '14px',
                  boxShadow: '0 2px 10px rgba(64,86,161,0.06)',
                  position: 'relative',
                  /* Step number connector line */
                  '&::after':
                    i < steps.length - 1
                      ? {
                          content: '""',
                          position: 'absolute',
                          top: '32%',
                          right: '-12px',
                          width: '24px',
                          height: '2px',
                          background: GOLD,
                          display: { xs: 'none', md: 'block' }
                        }
                      : {}
                }}
              >
                {/* Numbered circle */}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: alpha(PRIMARY, 0.08),
                    border: `2px solid ${alpha(PRIMARY, 0.2)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Icon icon={stepIcons[i]} fontSize={26} color={PRIMARY} />
                </Box>

                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: GOLD,
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    fontFamily: '"Inter", sans-serif',
                    mb: 1
                  }}
                >
                  {i + 1}
                </Box>

                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: PRIMARY,
                    mb: 1
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.85rem',
                    color: '#555577',
                    lineHeight: 1.7
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
