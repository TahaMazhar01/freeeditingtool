import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import posts from '../../content/blogPosts.json';

export type BlogPost = (typeof posts)[number];
export { posts };
export function readingMinutes(post: BlogPost) {
  const text = [
    post.intro,
    ...post.sections.flatMap((section) => section.paragraphs)
  ].join(' ');
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export function BlogCards({ articles = posts }: { articles?: BlogPost[] }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        },
        gap: 3
      }}
    >
      {articles.map((post) => (
        <Box
          key={post.slug}
          component={Link}
          to={`/blog/${post.slug}`}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            overflow: 'hidden',
            textDecoration: 'none',
            borderRadius: '24px',
            background: '#fff',
            border: '1px solid #E8E4D9',
            boxShadow: '0 8px 28px rgba(45,61,122,0.06)',
            transition: 'transform 180ms ease, box-shadow 180ms ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 32px rgba(45,61,122,0.13)'
            },
            '&:focus-visible': {
              outline: '3px solid #4056A1',
              outlineOffset: 4
            },
            '@media (prefers-reduced-motion: reduce)': {
              transition: 'none',
              '&:hover': { transform: 'none' }
            }
          }}
        >
          <Box
            component="img"
            src={`/blog/${post.slug}-small.jpg`}
            srcSet={`/blog/${post.slug}-small.jpg 768w, /blog/${post.slug}.jpg 1920w`}
            sizes="(max-width: 599px) 100vw, (max-width: 1199px) 50vw, 33vw"
            alt={post.imageAlt}
            loading="lazy"
            decoding="async"
            width={768}
            height={432}
            sx={{
              width: '100%',
              height: 'auto',
              aspectRatio: '16 / 9',
              objectFit: 'cover',
              background: '#EFE2BA'
            }}
          />
          <Box
            sx={{
              p: { xs: 3, md: 3.5 },
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography
              sx={{
                color: '#4056A1',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.05em',
                mb: 1.5
              }}
            >
              {post.category}
            </Typography>
            <Typography
              component="h3"
              sx={{
                color: '#182347',
                fontSize: 22,
                fontWeight: 700,
                lineHeight: 1.35,
                mb: 1.5
              }}
            >
              {post.title}
            </Typography>
            <Typography
              sx={{ color: '#58617A', fontSize: 15, lineHeight: 1.8, mb: 3 }}
            >
              {post.excerpt}
            </Typography>
            <Box
              sx={{
                mt: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Typography sx={{ color: '#68718A', fontSize: 13 }}>
                {readingMinutes(post)} min read
              </Typography>
              <Typography
                component="span"
                aria-hidden="true"
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  bgcolor: '#F5D875',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#2D3D7A',
                  fontSize: 24
                }}
              >
                →
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default function BlogPreview() {
  return (
    <Box
      component="section"
      aria-labelledby="guides-heading"
      sx={{ width: '100%', maxWidth: 1400, pb: 10 }}
    >
      <Typography
        sx={{ color: '#4056A1', fontWeight: 700, fontSize: 13, mb: 1 }}
      >
        THE EDITING JOURNAL
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4
        }}
      >
        <Box>
          <Typography
            id="guides-heading"
            component="h2"
            sx={{
              color: '#182347',
              fontWeight: 700,
              fontSize: { xs: 30, md: 40 },
              mb: 1
            }}
          >
            A little guidance goes a long way
          </Typography>
          <Typography sx={{ color: '#58617A' }}>
            Practical guides for better images and cleaner files.
          </Typography>
        </Box>
        <Box
          component={Link}
          to="/blog"
          sx={{ color: '#4056A1', fontWeight: 700, textUnderlineOffset: 5 }}
        >
          Explore all guides →
        </Box>
      </Box>
      <BlogCards articles={posts.slice(0, 3)} />
    </Box>
  );
}
