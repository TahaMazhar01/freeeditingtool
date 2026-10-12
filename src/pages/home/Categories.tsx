import IllustratedToolCard from '@components/allTools/ToolCard';
import React from 'react';
import { getToolsByCategory } from '@tools/index';
import Grid from '@mui/material/Grid';
import { Box, alpha, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { getI18nNamespaceFromToolCategory } from '@utils/string';
import { useUserTypeFilter } from '../../providers/UserTypeFilterProvider';
import AdPlaceholder from 'components/AdPlaceholder';
import { DefinedTool } from '@tools/defineTool';

const PRIMARY = '#4056A1';
const GOLD = '#D79922';

/* Accent cycling palette — all readable on white */
const CATEGORY_COLORS = [
  '#4056A1' /* Deep Blue  */,
  '#D79922' /* Gold       */,
  '#F13C20' /* Red        */,
  '#2D3D7A' /* Dark Blue  */,
  '#B07A10' /* Dark Gold  */,
  '#4056A1' /* Deep Blue  */,
  '#D79922' /* Gold       */,
  '#2D9E6B' /* Teal       */,
  '#8B4513' /* Sienna     */,
  '#4056A1' /* Deep Blue  */,
  '#D79922' /* Gold       */,
  '#F13C20' /* Red        */
];

/* ─── Individual tool mini-card ──────────────────────────── */
function HomeToolCard({ tool }: { tool: DefinedTool }) {
  const { t } = useTranslation(getI18nNamespaceFromToolCategory(tool.type));
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <IllustratedToolCard
        title={t(tool.name as any)}
        description={t(tool.shortDescription as any)}
        link={'/' + tool.path}
        icon={tool.icon}
      />
    </Grid>
  );
}
/* ─── Individual Category Section component ─────────────────── */
interface CategorySectionProps {
  category: ReturnType<typeof getToolsByCategory>[number];
  catIndex: number;
}

function CategorySection({ category, catIndex }: CategorySectionProps) {
  const { t: catT } = useTranslation(
    getI18nNamespaceFromToolCategory(category.type)
  );

  const categoryTitle = catT(
    `categories.${category.type}.title`,
    category.title
  );
  const categoryDescription = catT(
    `categories.${category.type}.description`,
    category.description
  );

  const accentColor = CATEGORY_COLORS[catIndex % CATEGORY_COLORS.length];
  const showAd = catIndex % 3 === 0;
  const toolsList = category.tools;

  return (
    <Box key={category.type} sx={{ mb: { xs: 9, md: 14 } }}>
      {/* ── Category header (centered, no side line) ─── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          mb: { xs: 4, md: 5 }
        }}
      >
        {/* Icon badge */}
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: alpha(accentColor, 0.08),
            color: accentColor,
            border: `1px solid ${alpha(accentColor, 0.2)}`,
            mb: 2
          }}
        >
          <Icon icon={category.icon} fontSize={30} />
        </Box>

        {/* Heading — larger, centered */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: '1.7rem', md: '2.3rem' },
            color: PRIMARY,
            lineHeight: 1.15,
            mb: 1.25
          }}
        >
          {categoryTitle}
        </Typography>

        {/* Short gold underline accent */}
        <Box
          sx={{
            width: 56,
            height: 3,
            borderRadius: 2,
            background: GOLD,
            mb: 2
          }}
        />

        {/* Description */}
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: { xs: '0.88rem', md: '0.95rem' },
            color: '#555577',
            lineHeight: 1.65,
            maxWidth: 600,
            mb: 2
          }}
        >
          {categoryDescription}
        </Typography>

        {/* Tool count badge */}
        <Box
          sx={{
            px: 1.75,
            py: 0.5,
            borderRadius: '20px',
            background: alpha(accentColor, 0.08),
            border: `1px solid ${alpha(accentColor, 0.2)}`,
            color: accentColor,
            fontSize: '0.74rem',
            fontWeight: 700,
            fontFamily: '"Inter", sans-serif',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap'
          }}
        >
          {toolsList.length} tool{toolsList.length !== 1 ? 's' : ''}
        </Box>
      </Box>

      {/* ── Tools grid ──────────────────────────── */}
      <Grid container spacing={2}>
        {toolsList.map((tool, toolIndex) => {
          const elements: React.ReactNode[] = [
            <HomeToolCard key={tool.path} tool={tool} />
          ];

          if (showAd && toolIndex === 3) {
            elements.unshift(
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`ad-${category.type}-${catIndex}`}
              >
                <AdPlaceholder variant="rectangle" />
              </Grid>
            );
          }

          return elements;
        })}

        {showAd && toolsList.length < 4 && (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`ad-end-${category.type}`}
          >
            <AdPlaceholder variant="rectangle" />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

/* ─── Main Categories component ──────────────────────────── */
export default function Categories() {
  const { selectedUserTypes } = useUserTypeFilter();
  const { t } = useTranslation();
  const categories = React.useMemo(
    () => getToolsByCategory(selectedUserTypes, t),
    [selectedUserTypes, t]
  );

  return (
    <Box sx={{ width: '100%' }}>
      {categories.map((category, catIndex) => (
        <CategorySection
          key={category.type}
          category={category}
          catIndex={catIndex}
        />
      ))}
    </Box>
  );
}
