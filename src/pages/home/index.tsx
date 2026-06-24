import { Box } from '@mui/material';
import Hero from 'components/Hero';
import Categories from './Categories';
import { Helmet } from 'react-helmet';
import { useUserTypeFilter } from 'providers/UserTypeFilterProvider';
import UserTypeFilter from '@components/UserTypeFilter';
import AdPlaceholder from 'components/AdPlaceholder';

/*
 * HERO IMAGE: Place the uploaded file at
 *   public/assets/background.jpeg
 * and it will be picked up by the background-image below.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────┐
 *   │  [Floating capsule navbar — fixed, not in flow]     │
 *   ├─────────────────────────────────────────────────────┤
 *   │  HERO SECTION  (100vh, bg = background.jpeg)             │
 *   │     mt: -84px  — pulls image under the navbar       │
 *   │     pt: 84px   — pushes text content back down      │
 *   │                                                     │
 *   │   [badge] [H1] [subtitle] [search] [chips] [stats]  │
 *   ├─────────────────────────────────────────────────────┤
 *   │  ── BELOW THE FOLD ──                               │
 *   │  [Leaderboard Ad]                                   │
 *   │  [User type filter]                                 │
 *   │  [Categories]                                       │
 *   └─────────────────────────────────────────────────────┘
 */

export default function Home() {
  const { selectedUserTypes, setSelectedUserTypes } = useUserTypeFilter();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Helmet title="FreeEditingTools — 119+ Free Browser Tools" />

      {/* ════════════════════════════════════════════════
          HERO SECTION  —  Background image fills viewport
          mt: '-84px' pulls the image under the fixed navbar
          pt: '84px'  pushes hero CONTENT back below navbar
          ════════════════════════════════════════════════ */}
      <Box
        sx={{
          position: 'relative',
          mt: '-84px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: '100px', md: '110px' },
          pb: { xs: 6, md: 8 },
          /* ── Hero background image ── */
          backgroundImage: 'url(/assets/background.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden'
        }}
      >
        {/*
          Very subtle dark radial overlay.
          Darkens the image edges slightly so text in the
          "empty center" reads cleanly without a heavy vignette.
        */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: [
              'radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(8,11,17,0.25) 100%)',
              'linear-gradient(to bottom, rgba(8,11,17,0.35) 0%, transparent 25%, transparent 75%, rgba(8,11,17,0.55) 100%)'
            ].join(', '),
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Hero content sits above the overlay */}
        <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <Hero />
        </Box>
      </Box>

      {/* ════════════════════════════════════════════════
          BELOW THE FOLD  —  Solid navy background
          Seamlessly continues from the image's edge color
          ════════════════════════════════════════════════ */}
      <Box
        sx={{
          background: '#080B11',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: { xs: 2, sm: 3, md: 5, lg: 8 }
        }}
      >
        {/* ── Above-fold ad slot (leaderboard) ── */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 900,
            pt: 5,
            pb: 3
          }}
        >
          <AdPlaceholder variant="banner" />
        </Box>

        {/* ── User-type filter ── */}
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
      </Box>
    </Box>
  );
}
