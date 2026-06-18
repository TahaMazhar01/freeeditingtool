import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import logo from 'assets/logo.png';
import { brandGradient } from 'config/colors';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const featureIcons = [
  'mdi:shield-lock-outline',
  'mdi:lightning-bolt-outline',
  'mdi:application-outline',
  'mdi:heart-outline'
];

const stepIcons = [
  'mdi:magnify',
  'mdi:cursor-default-click-outline',
  'mdi:download-outline'
];

export default function About() {
  const theme = useTheme();
  const { t } = useTranslation();

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
    <Box
      sx={{
        minHeight: '100vh',
        background: `url(/assets/${
          theme.palette.mode === 'dark'
            ? 'background-dark.png'
            : 'background.svg'
        })`,
        backgroundColor: 'background.default',
        pb: 8
      }}
    >
      <Helmet>
        <title>{t('about.pageTitle')}</title>
        <meta name="description" content={t('about.metaDescription')} />
      </Helmet>

      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 5 } }}>
        <Stack
          alignItems="center"
          spacing={2}
          sx={{ mb: { xs: 4, md: 6 }, animation: `${fadeUp} 0.6s ease` }}
        >
          <Box
            component="img"
            src={logo}
            alt={t('translation:hero.brand')}
            sx={{
              height: { xs: 100, md: 120 },
              filter: `drop-shadow(0 8px 24px ${alpha('#6366F1', 0.3)})`
            }}
          />
          <Typography
            variant="h3"
            fontWeight={800}
            textAlign="center"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              background: brandGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {t('about.hero.title')}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            maxWidth={720}
            fontWeight={400}
            lineHeight={1.7}
          >
            {t('about.hero.subtitle')}
          </Typography>
        </Stack>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {['mission', 'privacy'].map((section, index) => (
            <Grid item xs={12} md={6} key={section}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  borderRadius: 3,
                  border: `1px solid ${alpha(
                    theme.palette.primary.main,
                    0.15
                  )}`,
                  bgcolor: alpha(
                    theme.palette.background.paper,
                    theme.palette.mode === 'dark' ? 0.6 : 0.85
                  ),
                  backdropFilter: 'blur(12px)',
                  animation: `${fadeUp} 0.6s ease ${0.1 + index * 0.1}s both`
                }}
              >
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {t(`about.${section}.title`)}
                </Typography>
                <Typography color="text.secondary" lineHeight={1.8}>
                  {t(`about.${section}.body`)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 3, animation: `${fadeUp} 0.6s ease 0.25s both` }}
        >
          {t('about.featuresTitle')}
        </Typography>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  textAlign: 'center',
                  border: `1px solid ${alpha(
                    theme.palette.primary.main,
                    0.12
                  )}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  animation: `${fadeUp} 0.6s ease ${0.2 + index * 0.08}s both`,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 32px ${alpha(
                      theme.palette.primary.main,
                      0.15
                    )}`
                  }
                }}
              >
                <Icon
                  icon={featureIcons[index]}
                  width={40}
                  style={{
                    color: theme.palette.primary.main,
                    marginBottom: 12
                  }}
                />
                <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  lineHeight={1.7}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            bgcolor: alpha(
              theme.palette.background.paper,
              theme.palette.mode === 'dark' ? 0.6 : 0.85
            ),
            animation: `${fadeUp} 0.6s ease 0.35s both`
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {t('about.categories.title')}
          </Typography>
          <Typography color="text.secondary" lineHeight={1.8} mb={2}>
            {t('about.categories.body')}
          </Typography>
          <Grid container spacing={1}>
            {categories.map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item}>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  {item}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            bgcolor: alpha(
              theme.palette.background.paper,
              theme.palette.mode === 'dark' ? 0.6 : 0.85
            ),
            animation: `${fadeUp} 0.6s ease 0.45s both`
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
            textAlign="center"
          >
            {t('about.howItWorks.title')}
          </Typography>
          <Grid container spacing={3} mt={1}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={step.title}>
                <Stack alignItems="center" textAlign="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                      color: theme.palette.primary.main,
                      fontWeight: 800,
                      fontSize: 18
                    }}
                  >
                    <Icon icon={stepIcons[index]} width={28} />
                  </Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {index + 1}. {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    lineHeight={1.7}
                  >
                    {step.description}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
