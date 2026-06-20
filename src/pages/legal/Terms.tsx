import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';

export default function Terms() {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '80vh',
        py: 8
      }}
    >
      <Helmet>
        <title>Terms of Service - FreeEditingTools</title>
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
            Terms of Service
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
                1. Acceptance of Terms
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                By accessing and using FreeEditingTools, you agree to comply
                with and be bound by these Terms of Service. If you do not agree
                to these terms, please do not use our services.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                2. Use of Services
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                Our services are provided for personal, non-commercial, and
                professional use. Since all computations are performed in your
                browser, you agree not to attempt to disrupt the client-side
                scripting or manipulate the web application files. You are
                responsible for ensuring that your input data does not violate
                any local laws or copyright guidelines.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                3. Disclaimer of Warranties
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                FreeEditingTools is provided &quot;as is&quot; and &quot;as
                available&quot; without any warranties of any kind, either
                express or implied. We do not guarantee that the tools will be
                completely error-free or uninterrupted, although we strive to
                ensure high performance and correct utility behavior.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                4. Limitation of Liability
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                Because all processing occurs on your local device,
                FreeEditingTools has no control over how the output files are
                stored or used. We shall not be liable for any direct, indirect,
                incidental, or consequential damages resulting from the use or
                inability to use our tools.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                5. Changes to Terms
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                We reserve the right to modify these Terms of Service at any
                time. Your continued use of the website following any changes
                constitutes acceptance of those updates.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
