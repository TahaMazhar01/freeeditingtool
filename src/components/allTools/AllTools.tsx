import { Box, Grid, Typography } from '@mui/material';
import ToolCard from './ToolCard';
import { IconifyIcon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { FullI18nKey } from '../../i18n';

export interface ToolCardProps {
  title: FullI18nKey;
  description: FullI18nKey;
  link: string;
  icon: IconifyIcon | string;
}

interface AllToolsProps {
  title: string;
  toolCards: ToolCardProps[];
}

export default function AllTools({ title, toolCards }: AllToolsProps) {
  const { t } = useTranslation();

  return (
    <Box mt={5} mb={10}>
      {/* Section heading */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 3,
          '&::after': {
            content: '""',
            flex: 1,
            height: '1px',
            background:
              'linear-gradient(90deg, rgba(99,102,241,0.3) 0%, transparent 100%)'
          }
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 800,
            fontSize: { xs: '1.3rem', md: '1.5rem' },
            background:
              'linear-gradient(135deg, #818CF8 0%, #22D3EE 60%, #A78BFA 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Tools grid */}
      <Grid container spacing={2}>
        {toolCards.map((card, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <ToolCard
              // @ts-ignore
              title={t(card.title)}
              // @ts-ignore
              description={t(card.description)}
              link={card.link}
              icon={card.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
