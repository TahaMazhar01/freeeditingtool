import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

export default function InputHeader({
  title,
  actions,
  badge
}: {
  title: string;
  actions?: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1.5,
        minHeight: '44px',
        flexWrap: 'wrap',
        gap: 1.5
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexWrap: 'wrap'
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 20, sm: 24, md: 26 },
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'primary.main',
            lineHeight: 1.2
          }}
        >
          {title}
        </Typography>
        {badge}
      </Box>
      {actions && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap'
          }}
        >
          {actions}
        </Box>
      )}
    </Box>
  );
}
