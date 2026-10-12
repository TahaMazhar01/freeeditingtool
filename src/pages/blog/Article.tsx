import { Box, Button, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import {
  BlogCards,
  posts,
  readingMinutes
} from '../../components/blog/BlogCards';
import NotFound from '../not-found';
import { useEffect } from 'react';

const externalStyle = {
  color: '#4056A1',
  textUnderlineOffset: '4px',
  overflowWrap: 'anywhere' as const
};

export default function Article() {
  const { slug } = useParams();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [slug]);
  const post = posts.find((article) => article.slug === slug);
  if (!post) return <NotFound />;
  const canonical = `https://freeeditingtools.com/blog/${post.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://freeeditingtools.com/blog/${post.slug}.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: 'FreeEditingTools',
      url: 'https://freeeditingtools.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'FreeEditingTools',
      url: 'https://freeeditingtools.com'
    },
    mainEntityOfPage: canonical
  };
  return (
    <Box component="main" sx={{ background: '#FAFAF8', pb: 10 }}>
      <Helmet>
        <title>{post.title} | FreeEditingTools</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta
          property="og:image"
          content={`https://freeeditingtools.com/blog/${post.slug}.jpg`}
        />
        <meta property="og:image:alt" content={post.imageAlt} />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 7 } }}>
        <Box
          component="nav"
          aria-label="Breadcrumb"
          sx={{ mb: 4, color: '#68718A', fontSize: 14 }}
        >
          <Link to="/" style={externalStyle}>
            Home
          </Link>{' '}
          /{' '}
          <Link to="/blog" style={externalStyle}>
            Blog
          </Link>{' '}
          / {post.category}
        </Box>
        <Box component="article">
          <Box sx={{ maxWidth: 860, mb: 4 }}>
            <Typography
              sx={{ color: '#4056A1', fontSize: 13, fontWeight: 700, mb: 2 }}
            >
              {post.category}
            </Typography>
            <Typography
              component="h1"
              sx={{
                color: '#182347',
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: { xs: 34, sm: 44, md: 54 },
                lineHeight: 1.2,
                overflowWrap: 'anywhere',
                mb: 3
              }}
            >
              {post.title}
            </Typography>
            <Typography
              sx={{ color: '#58617A', fontSize: 18, lineHeight: 1.8, mb: 3 }}
            >
              {post.excerpt}
            </Typography>
            <Typography sx={{ color: '#68718A', fontSize: 14 }}>
              FreeEditingTools Editorial ·{' '}
              <time dateTime={post.date}>12 October 2026</time> ·{' '}
              {readingMinutes(post)} min read
            </Typography>
          </Box>
          <Box component="figure" sx={{ m: 0, mb: 6 }}>
            <Box
              component="img"
              src={`/blog/${post.slug}.jpg`}
              srcSet={`/blog/${post.slug}-small.jpg 768w, /blog/${post.slug}.jpg 1920w`}
              sizes="(max-width: 1200px) 100vw, 1152px"
              alt={post.imageAlt}
              width={1920}
              height={1080}
              loading="eager"
              sx={{
                display: 'block',
                width: '100%',
                height: 'auto',
                aspectRatio: { xs: '4 / 3', md: '16 / 7' },
                objectFit: 'cover',
                borderRadius: '24px',
                background: '#EFE2BA'
              }}
            />
            <Typography
              component="figcaption"
              sx={{ color: '#68718A', fontSize: 12, lineHeight: 1.8, mt: 1.5 }}
            >
              Photo by {post.author} via{' '}
              <a href={post.imageSource} style={externalStyle}>
                Wikimedia Commons
              </a>{' '}
              ·{' '}
              <a href={post.licenseUrl} style={externalStyle}>
                {post.license}
              </a>{' '}
              · Resized for the web
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '240px minmax(0, 740px)' },
              justifyContent: 'space-between',
              gap: { xs: 4, md: 6 }
            }}
          >
            <Box component="aside">
              <Box
                component="nav"
                aria-label="Article contents"
                sx={{
                  position: { md: 'sticky' },
                  top: 120,
                  p: 3,
                  bgcolor: '#F5EDD4',
                  borderRadius: '20px'
                }}
              >
                <Typography sx={{ color: '#182347', fontWeight: 700, mb: 2 }}>
                  In this guide
                </Typography>
                {post.sections.map((section) => (
                  <Box
                    key={section.id}
                    component="a"
                    href={`#${section.id}`}
                    sx={{
                      display: 'block',
                      color: '#4056A1',
                      textDecoration: 'none',
                      fontSize: 14,
                      lineHeight: 1.6,
                      py: 1,
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    {section.heading}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                minWidth: 0,
                '& p': {
                  fontSize: { xs: 16, md: 17 },
                  lineHeight: 1.9,
                  color: '#46516A',
                  mb: 2.5
                }
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>{post.intro}</Typography>
              {post.sections.map((section) => (
                <Box
                  component="section"
                  id={section.id}
                  key={section.id}
                  sx={{ scrollMarginTop: 120, mt: 5 }}
                >
                  <Typography
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: 25, md: 29 },
                      lineHeight: 1.35,
                      color: '#182347',
                      mb: 2
                    }}
                  >
                    {section.heading}
                  </Typography>
                  {section.paragraphs.map((paragraph) => (
                    <Typography key={paragraph}>{paragraph}</Typography>
                  ))}
                  {section.reference && (
                    <Box
                      component="a"
                      href={section.reference.url}
                      sx={{
                        ...externalStyle,
                        display: 'inline-block',
                        fontSize: 14,
                        mb: 1
                      }}
                    >
                      {section.reference.label} ↗
                    </Box>
                  )}
                </Box>
              ))}
              <Box
                sx={{
                  mt: 6,
                  p: { xs: 3, md: 4 },
                  bgcolor: '#F5EDD4',
                  borderRadius: '20px'
                }}
              >
                <Typography
                  component="h2"
                  sx={{
                    color: '#182347',
                    fontSize: 24,
                    fontWeight: 700,
                    mb: 2
                  }}
                >
                  Put the guide into practice
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {post.tools.map((tool) => (
                    <Button
                      key={tool.path}
                      component={Link}
                      to={tool.path}
                      variant="contained"
                      sx={{
                        textTransform: 'none',
                        borderRadius: '24px',
                        px: 3
                      }}
                    >
                      {tool.label} →
                    </Button>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          component="section"
          aria-labelledby="related-guides"
          sx={{ mt: 10 }}
        >
          <Typography
            id="related-guides"
            component="h2"
            sx={{ color: '#182347', fontSize: 28, fontWeight: 700, mb: 3 }}
          >
            Keep learning
          </Typography>
          <BlogCards
            articles={posts
              .filter((article) => article.slug !== post.slug)
              .sort(
                (a, b) =>
                  Number(
                    b.tools.some((tool) =>
                      post.tools.some((related) => related.path === tool.path)
                    )
                  ) -
                  Number(
                    a.tools.some((tool) =>
                      post.tools.some((related) => related.path === tool.path)
                    )
                  )
              )
              .slice(0, 3)}
          />
        </Box>
      </Container>
    </Box>
  );
}
