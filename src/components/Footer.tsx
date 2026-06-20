import React from 'react';
import { Box, Container, Grid, Typography, Stack, alpha } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('translation');

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 6,
        mt: 'auto',
        width: '100%',
        zIndex: 10
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={5}>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{
                  height: 40,
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{
                  letterSpacing: '-0.02em',
                  background: (theme) =>
                    `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {t('hero.brand')}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" maxWidth={360}>
              {t('hero.description')}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" fontWeight={700} mb={2}>
              Tools & Site
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body2">
                <Link
                  to="/"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {t('navbar.home')}
                </Link>
              </Typography>
              <Typography variant="body2">
                <Link
                  to="/about"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {t('navbar.about')}
                </Link>
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" fontWeight={700} mb={2}>
              Legal & Support
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body2">
                <Link
                  to="/privacy"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Privacy Policy
                </Link>
              </Typography>
              <Typography variant="body2">
                <Link
                  to="/terms"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Terms of Service
                </Link>
              </Typography>
              <Typography variant="body2">
                <Link
                  to="/contact"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Contact Us
                </Link>
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: alpha('#000', 0.05),
            mt: 6,
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} {t('hero.brand')}. All rights
            reserved.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Built client-side for maximum privacy.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
