import { Box } from '@mui/material';
import Hero from 'components/Hero';
import Categories from './Categories';
import { Helmet } from 'react-helmet';
import { useUserTypeFilter } from 'providers/UserTypeFilterProvider';
import UserTypeFilter from '@components/UserTypeFilter';
import AdPlaceholder from 'components/AdPlaceholder';
import BlogPreview from 'components/blog/BlogCards';

/*
 * Layout — light mode, no background image:
 *
 *   ┌─────────────────────────────────────────────────────┐
 *   │  [Floating capsule navbar — fixed, not in flow]     │
 *   ├─────────────────────────────────────────────────────┤
 *   │  HERO  (cream gradient bg)                          │
 *   │    mt:-102px pulls it behind the navbar              │
 *   │    [badge] [H1 Playfair] [subtitle] [search] [chips]│
 *   ├─────────────────────────────────────────────────────┤
 *   │  [Leaderboard Ad — cream card]                      │
 *   ├─────────────────────────────────────────────────────┤
 *   │  [User type filter]                                 │
 *   ├─────────────────────────────────────────────────────┤
 *   │  [Tool Categories — white cards on #FAFAF8]         │
 *   └─────────────────────────────────────────────────────┘
 */

export default function Home() {
  const { selectedUserTypes, setSelectedUserTypes } = useUserTypeFilter();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Helmet>
        <title>FreeEditingTools — 119+ Free Browser Tools</title>
        <meta
          name="description"
          content="Free online suite of 119+ tools for images, videos, PDFs, text, and data conversion. 100% private and processed directly in your browser."
        />
        <link rel="canonical" href="https://freeeditingtools.com/" />
        <meta
          property="og:title"
          content="FreeEditingTools — 119+ Free Browser Tools"
        />
        <meta
          property="og:description"
          content="Free online suite of 119+ tools for images, videos, PDFs, text, and data conversion. 100% private and client-side."
        />
        <meta property="og:url" content="https://freeeditingtools.com/" />
      </Helmet>

      {/* ══════════════════════════════════════════════════
          HERO SECTION
          Cream gradient background — warm and readable.
          mt:'-102px' pulls this section under the capsule navbar
          so the gradient fills the full viewport from the top.
          pt:'84px' pushes the Hero content text below the navbar.
          ══════════════════════════════════════════════════ */}
      <Box
        sx={{
          mt: '-102px',
          pt: { xs: '140px', md: '150px' },
          pb: { xs: 7, md: 9 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(170deg, #EFE2BA 0%, #F5EDD4 30%, #FAFAF8 65%, #FFFFFF 100%)',
          borderBottom: '1px solid #E8E4D9'
        }}
      >
        <Hero />
      </Box>

      {/* ══════════════════════════════════════════════════
          BELOW THE FOLD — warm white background
          ══════════════════════════════════════════════════ */}
      <Box
        sx={{
          background: '#FAFAF8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: { xs: 2, sm: 3, md: 5, lg: 8 }
        }}
      >
        {/* ── Leaderboard ad slot ── */}
        <Box sx={{ width: '100%', maxWidth: 900, pt: 5, pb: 3 }}>
          <AdPlaceholder variant="banner" />
        </Box>

        {/* ── User type filter ── */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 900,
            pb: 4,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <UserTypeFilter
            selectedUserTypes={selectedUserTypes}
            onUserTypesChange={setSelectedUserTypes}
          />
        </Box>

        {/* ── Tool categories ── */}
        <Box sx={{ width: '100%', maxWidth: 1400, pb: 12 }}>
          <Categories />
        </Box>
        <BlogPreview />
      </Box>
    </Box>
  );
}
