import { Box, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { BlogCards } from '../../components/blog/BlogCards';
import { useEffect } from 'react';

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const description =
    'Practical guides to image compression and file conversion. Learn how to resize images and work with PDF files and OCR and CSV to JSON.';
  return (
    <Box component="main" sx={{ background: '#FAFAF8', pb: 10 }}>
      <Helmet>
        <title>Editing Guides and Tutorials | FreeEditingTools Blog</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://freeeditingtools.com/blog" />
        <meta
          property="og:title"
          content="The Editing Journal | FreeEditingTools"
        />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeeditingtools.com/blog" />
        <meta
          property="og:image"
          content="https://freeeditingtools.com/blog/compress-images.jpg"
        />
      </Helmet>
      <Box
        sx={{
          background: 'linear-gradient(140deg, #F5EDD4, #FAFAF8)',
          pt: { xs: 5, md: 8 },
          pb: { xs: 5, md: 8 },
          borderBottom: '1px solid #E8E4D9'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.08em',
              color: '#4056A1',
              mb: 2
            }}
          >
            THE EDITING JOURNAL
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: 40, md: 64 },
              lineHeight: 1.15,
              fontWeight: 700,
              color: '#182347',
              maxWidth: 780,
              mb: 3
            }}
          >
            Make every edit
            <br />a little easier.
          </Typography>
          <Typography
            sx={{
              color: '#58617A',
              fontSize: { xs: 17, md: 20 },
              lineHeight: 1.8,
              maxWidth: 670
            }}
          >
            Clear answers for everyday editing tasks. Explore practical guides
            for images and documents and data.
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ pt: 6 }}>
        <Typography
          component="h2"
          sx={{ color: '#182347', fontSize: 26, fontWeight: 700, mb: 3 }}
        >
          Latest guides
        </Typography>
        <BlogCards />
      </Container>
    </Box>
  );
}
