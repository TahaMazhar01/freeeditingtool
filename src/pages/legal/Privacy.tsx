import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';

export default function Privacy() {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '80vh',
        py: 8
      }}
    >
      <Helmet>
        <title>Privacy Policy - FreeEditingTools</title>
      </Helmet>
      <Container maxWidth="md">
        <Box
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper'
          }}
        >
          <Typography variant="h4" component="h1" fontWeight={800} gutterBottom>
            Privacy Policy
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mb={4}
          >
            Last updated: June 21, 2026
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                1. Introduction
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                Welcome to FreeEditingTools. We are committed to protecting your
                privacy. Unlike traditional utilities, most of the tools
                available on our website process your data entirely in your web
                browser (client-side). This means that your files, text, images,
                or videos are never uploaded to our servers, keeping your
                information private and secure.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                2. Information We Collect
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                Since our tools process data client-side, we do not access or
                store the content you edit. However, we may collect minimal
                non-personal information, including:
              </Typography>
              <Box
                component="ul"
                sx={{
                  pl: 2,
                  mt: 1,
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  lineHeight: 1.7
                }}
              >
                <li>
                  Usage statistics and browser parameters (via analytical
                  tools).
                </li>
                <li>
                  Device info and IP addresses to maintain site functionality.
                </li>
                <li>
                  Cookies and settings preferences (e.g. language, theme).
                </li>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                3. Cookies and Advertising
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                We use cookies to personalize content, remember preferences, and
                serve advertisements. We work with third-party vendors, such as
                Google AdSense, who use cookies to serve ads based on your prior
                visits to our website or other websites on the internet. You can
                opt out of personalized advertising by visiting your Google Ads
                settings.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                4. Data Security
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                We prioritize security. By implementing client-side scripting,
                your documents and inputs remain sandbox-isolated within your
                local browser environment. We do not transmit files over the
                internet except where explicitly required by third-party API
                integrations (which will be marked clearly).
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                5. Contact Us
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                If you have any questions or feedback regarding our privacy
                practices, please feel free to reach out to us via our Contact
                Us page.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
