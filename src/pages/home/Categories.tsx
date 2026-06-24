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
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { getI18nNamespaceFromToolCategory } from '@utils/string';
import { useUserTypeFilter } from '../../providers/UserTypeFilterProvider';
import AdPlaceholder from 'components/AdPlaceholder';
import { DefinedTool } from '@tools/defineTool';

/* Neon accent palette cycling across categories */
const CATEGORY_COLORS = [
  '#6366F1', // Indigo
  '#06B6D4', // Cyan
  '#A855F7', // Purple
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EC4899', // Pink
  '#3B82F6', // Blue
  '#14B8A6', // Teal
  '#8B5CF6', // Violet
  '#F97316', // Orange
  '#22D3EE', // Light Cyan
  '#84CC16' // Lime
];

/* ─── Individual tool card inside a category section ──── */
interface ToolCardProps {
  tool: DefinedTool;
  accentColor: string;
}

function ToolCard({ tool, accentColor }: ToolCardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation(getI18nNamespaceFromToolCategory(tool.type));
  const toolName = t(tool.name as any) as string;
  const toolShortDescription = t(tool.shortDescription as any) as string;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        onClick={() => navigate('/' + tool.path)}
        sx={{
          height: '100%',
          cursor: 'pointer',
          /* glass base — MUI theme overrides backdrop-filter already */
          background: 'rgba(17, 24, 39, 0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(148, 163, 184, 0.09)',
          borderRadius: '14px',
          transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.01)',
            border: `1px solid ${alpha(accentColor, 0.35)}`,
            boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px ${alpha(
              accentColor,
              0.15
            )}, inset 0 1px 0 rgba(255,255,255,0.07)`,
            '& .tool-icon-wrap': {
              boxShadow: `0 0 18px ${alpha(accentColor, 0.45)}`,
              background: alpha(accentColor, 0.18)
            },
            '& .tool-name': {
              color: accentColor
            }
          }
        }}
      >
        <CardContent sx={{ p: '18px !important' }}>
          <Stack spacing={1.5}>
            {/* Icon badge */}
            <Box
              className="tool-icon-wrap"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: alpha(accentColor, 0.1),
                color: accentColor,
                transition: 'all 0.25s ease',
                border: `1px solid ${alpha(accentColor, 0.18)}`
              }}
            >
              <Icon icon={tool.icon ?? 'ph:compass-tool-thin'} fontSize={20} />
            </Box>

            {/* Text */}
            <Box>
              <Typography
                className="tool-name"
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '0.92rem',
                  lineHeight: 1.3,
                  color: '#E2E8F0',
                  mb: 0.5,
                  transition: 'color 0.2s ease'
                }}
              >
                {toolName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.75rem',
                  lineHeight: 1.55,
                  color: 'rgba(148,163,184,0.65)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
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

/* ─── Main Categories component ─────────────────────── */
export default function Categories() {
  const { selectedUserTypes } = useUserTypeFilter();
  const { t } = useTranslation();
  const categories = getToolsByCategory(selectedUserTypes, t);

  return (
    <Box sx={{ width: '100%' }}>
      {categories.map((category, catIndex) => {
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
        const toolsList = [...category.tools];

        return (
          <Box
            key={category.type}
            sx={{
              mb: 7,
              position: 'relative',
              /* Faint left accent stripe */
              '&::before': {
                content: '""',
                position: 'absolute',
                left: -24,
                top: 0,
                bottom: 0,
                width: '2px',
                background: `linear-gradient(180deg, ${accentColor} 0%, transparent 100%)`,
                opacity: 0.35,
                borderRadius: '1px'
              }
            }}
          >
            {/* ── Category header ───────────────────────── */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ mb: 3.5 }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: alpha(accentColor, 0.1),
                  color: accentColor,
                  border: `1px solid ${alpha(accentColor, 0.22)}`,
                  boxShadow: `0 0 16px ${alpha(accentColor, 0.2)}`,
                  flexShrink: 0
                }}
              >
                <Icon icon={category.icon} fontSize={26} />
              </Box>

              {/* Text */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1.2rem', md: '1.35rem' },
                    lineHeight: 1.2,
                    color: '#E2E8F0',
                    mb: 0.4
                  }}
                >
                  {categoryTitle}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(148,163,184,0.6)',
                    fontSize: '0.83rem',
                    lineHeight: 1.5
                  }}
                >
                  {categoryDescription}
                </Typography>
              </Box>

              {/* Tool count badge */}
              <Box
                sx={{
                  px: 1.5,
                  py: 0.4,
                  borderRadius: '20px',
                  background: alpha(accentColor, 0.1),
                  border: `1px solid ${alpha(accentColor, 0.22)}`,
                  color: accentColor,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {toolsList.length} tool{toolsList.length !== 1 ? 's' : ''}
              </Box>
            </Stack>

            {/* ── Tools grid ────────────────────────────── */}
            <Grid container spacing={2}>
              {toolsList.map((tool, toolIndex) => {
                const elements: React.ReactNode[] = [
                  <ToolCard
                    key={tool.path}
                    tool={tool}
                    accentColor={accentColor}
                  />
                ];

                /* Inject ad card as 4th item (index 3) for qualifying categories */
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

              {/* Append ad if category has fewer than 4 tools */}
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
      })}
    </Box>
  );
}
