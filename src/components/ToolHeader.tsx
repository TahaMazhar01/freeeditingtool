import { Box, Button, Stack, Typography } from '@mui/material';
import { Icon, IconifyIcon } from '@iconify/react';
import { getToolsByCategory } from '@tools/index';
import { useEffect, useState } from 'react';
import { isBookmarked, toggleBookmarked } from '@utils/bookmark';
import { useTranslation } from 'react-i18next';
import ToolBreadcrumb from './ToolBreadcrumb';
interface ToolHeaderProps {
  title: string;
  description: string;
  icon?: IconifyIcon | string;
  type: string;
  path: string;
}
export default function ToolHeader({
  icon,
  title,
  description,
  type,
  path
}: ToolHeaderProps) {
  const { t } = useTranslation();
  const [bookmarked, setBookmarked] = useState(isBookmarked(path));
  const [examplesVisible, setExamplesVisible] = useState(false);
  const category = getToolsByCategory([], t).find((item) => item.type === type);
  useEffect(() => {
    setBookmarked(isBookmarked(path));
    setExamplesVisible(false);
    const timer = setTimeout(
      () => setExamplesVisible(!!document.getElementById('examples')),
      500
    );
    return () => clearTimeout(timer);
  }, [path]);
  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <Box my={4}>
      <ToolBreadcrumb
        items={[
          { title: 'All tools', link: '/' },
          { title: category?.rawTitle ?? type, link: '/categories/' + type },
          { title }
        ]}
      />
      <Box
        sx={{
          mt: 3,
          p: { xs: 2.5, md: 4 },
          borderRadius: '24px',
          background: 'linear-gradient(115deg, #F5EDD4, #F4F6FC)',
          border: '1px solid #E4DFD2'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
          {icon && (
            <Box
              sx={{
                display: 'flex',
                p: 1.5,
                background: '#FFFFFF',
                borderRadius: '14px',
                color: '#4056A1',
                flexShrink: 0
              }}
            >
              <Icon icon={icon} fontSize={28} />
            </Box>
          )}
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#4056A1',
              textTransform: 'uppercase'
            }}
          >
            {category?.rawTitle}
          </Typography>
        </Stack>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 29, md: 40 },
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#28376D',
            overflowWrap: 'anywhere',
            mb: 1.5
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 17,
            lineHeight: 1.75,
            color: '#555577',
            maxWidth: 900
          }}
        >
          {description}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1.5} mt={3}>
          <Button
            variant="contained"
            onClick={() => jump('tool')}
            endIcon={<Icon icon="ph:arrow-down-bold" />}
          >
            Open workspace
          </Button>
          {examplesVisible && (
            <Button variant="outlined" onClick={() => jump('examples')}>
              {t('toolHeader.seeExamples')}
            </Button>
          )}
          <Button
            variant="text"
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark tool'}
            aria-pressed={bookmarked}
            startIcon={
              <Icon
                icon={
                  bookmarked
                    ? 'ph:bookmark-simple-fill'
                    : 'ph:bookmark-simple-bold'
                }
              />
            }
            onClick={() => {
              toggleBookmarked(path);
              setBookmarked(isBookmarked(path));
            }}
          >
            {bookmarked ? 'Saved to your desk' : 'Save to your desk'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
