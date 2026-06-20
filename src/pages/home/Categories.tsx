import React from 'react';
import { getToolsByCategory } from '@tools/index';
import Grid from '@mui/material/Grid';
import {
  Box,
  Card,
  CardContent,
  Stack,
  alpha,
  useTheme,
  Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { getI18nNamespaceFromToolCategory } from '@utils/string';
import { useUserTypeFilter } from '../../providers/UserTypeFilterProvider';
import AdPlaceholder from 'components/AdPlaceholder';
import { DefinedTool } from '@tools/defineTool';

interface ToolCardProps {
  tool: DefinedTool;
  color: string;
}

function ToolCard({ tool, color }: ToolCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation(getI18nNamespaceFromToolCategory(tool.type));

  // Handle translations
  const toolName = t(tool.name as any) as string;
  const toolShortDescription = t(tool.shortDescription as any) as string;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        onClick={() => navigate('/' + tool.path)}
        sx={{
          height: '100%',
          cursor: 'pointer',
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-3px)',
            borderColor: 'primary.main',
            boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.06)}`
          }
        }}
      >
        <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
          <Stack spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: alpha(color, 0.08),
                color: color
              }}
            >
              <Icon
                icon={tool.icon ?? 'ph:compass-tool-thin'}
                fontSize="24px"
              />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.primary"
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  mb: 0.5,
                  fontSize: '1rem',
                  lineHeight: 1.3
                }}
              >
                {toolName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {toolShortDescription}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default function Categories() {
  const { selectedUserTypes } = useUserTypeFilter();
  const { t } = useTranslation();
  const categories = getToolsByCategory(selectedUserTypes, t);
  const theme = useTheme();

  // Vibrant palette with personality for tool icons
  const brandPalette = [
    '#2563EB', // Royal Blue
    '#4F46E5', // Indigo
    '#10B981', // Emerald
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#06B6D4' // Cyan
  ];

  return (
    <Box width="80%" sx={{ mt: 2 }}>
      {categories.map((category, catIndex) => {
        const { t: catTranslation } = useTranslation(
          getI18nNamespaceFromToolCategory(category.type)
        );

        // Translate title and description
        const categoryTitle = catTranslation(
          `categories.${category.type}.title`,
          category.title
        );
        const categoryDescription = catTranslation(
          `categories.${category.type}.description`,
          category.description
        );

        const categoryColor = brandPalette[catIndex % brandPalette.length];

        // We will insert an ad slot inside some of the category grids to keep it balanced
        const showAdSlot = catIndex % 3 === 0;
        const toolsList = [...category.tools];

        return (
          <Box key={category.type} sx={{ mb: 8 }}>
            {/* Category Header */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ mb: 4 }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: alpha(categoryColor, 0.08),
                  color: categoryColor
                }}
              >
                <Icon icon={category.icon} fontSize="28px" />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{
                    fontFamily: '"Outfit", sans-serif',
                    color: 'text.primary',
                    lineHeight: 1.2
                  }}
                >
                  {categoryTitle}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {categoryDescription}
                </Typography>
              </Box>
            </Stack>

            {/* Tools Grid */}
            <Grid container spacing={3}>
              {toolsList.map((tool, toolIndex) => {
                const elements = [
                  <ToolCard key={tool.path} tool={tool} color={categoryColor} />
                ];

                // If ad slot is active, inject inline ad rectangle as the 4th item (index 3)
                if (showAdSlot && toolIndex === 3) {
                  elements.unshift(
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={`ad-${category.type}`}
                    >
                      <AdPlaceholder variant="rectangle" />
                    </Grid>
                  );
                }

                return elements;
              })}

              {/* If category has fewer than 4 tools and ad is enabled, append it to the end */}
              {showAdSlot && toolsList.length < 4 && (
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
      })}
    </Box>
  );
}
