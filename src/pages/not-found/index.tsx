import { Box, Button, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container component="main" maxWidth="sm" sx={{ py: 10 }}>
      <Helmet>
        <title>Page not found - FreeEditingTools</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="primary" fontSize={64} fontWeight={700}>
          404
        </Typography>
        <Typography component="h1" variant="h4" gutterBottom>
          Page not found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          This page may have moved, or the address may be incorrect. Browse our
          tools to find what you need.
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Browse all tools
        </Button>
      </Box>
    </Container>
  );
}
