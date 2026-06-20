import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert
} from '@mui/material';
import { Helmet } from 'react-helmet';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '80vh',
        py: 8
      }}
    >
      <Helmet>
        <title>Contact Us - FreeEditingTools</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper'
          }}
        >
          <Typography variant="h4" component="h1" fontWeight={800} gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Have questions, feedback, or a tool request? Reach out to us, and we
            will get back to you as soon as possible.
          </Typography>

          {submitted && (
            <Alert
              severity="success"
              sx={{ mb: 3 }}
              onClose={() => setSubmitted(false)}
            >
              Thank you! Your message has been sent successfully.
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Send Message
              </Button>
            </Stack>
          </form>

          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
              textAlign: 'center'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Or email us directly at:{' '}
              <a
                href="mailto:support@freeeditingtools.com"
                style={{ fontWeight: 600 }}
              >
                support@freeeditingtools.com
              </a>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
