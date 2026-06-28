import React from 'react';
import { getToolsByCategory } from '@tools/index';
import Grid from '@mui/material/Grid';
import {
  Box,
  Card,
  CardContent,
  Stack,
  alpha,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
          background: '#FFFFFF',
          border: '1px solid #E8E4D9',
          boxShadow: '0 2px 12px rgba(64,86,161,0.08)',
          borderRadius: '12px',
          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: alpha(accentColor, 0.45),
            boxShadow: `0 8px 28px ${alpha(accentColor, 0.14)}`,
            '& .tc-icon': { background: alpha(accentColor, 0.15) },
            '& .tc-title': { color: accentColor }
          }
        }}
      >
        <CardContent sx={{ p: '18px !important' }}>
          <Stack spacing={1.5}>
            {/* Colored icon badge */}
            <Box
              className="tc-icon"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: alpha(accentColor, 0.08),
                color: accentColor,
                border: `1px solid ${alpha(accentColor, 0.15)}`,
                transition: 'background 0.22s ease',
                flexShrink: 0
              }}
            >
              <Icon icon={tool.icon ?? 'ph:compass-tool-thin'} fontSize={20} />
            </Box>

            <Box>
              <Typography
                className="tc-title"
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  lineHeight: 1.3,
                  color: '#1A1A2E',
                  mb: 0.5,
                  transition: 'color 0.2s ease'
                }}
              >
                {toolName}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '0.75rem',
                  lineHeight: 1.55,
                  color: '#555577',
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

/* ─── Main Categories component ──────────────────────────── */
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
                  <ToolCard
                    key={tool.path}
                    tool={tool}
                    accentColor={accentColor}
                  />
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
      })}
    </Box>
  );
}
