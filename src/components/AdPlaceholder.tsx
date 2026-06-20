import React from 'react';
import { Box, Typography } from '@mui/material';

interface AdPlaceholderProps {
  variant: 'banner' | 'rectangle';
}

export default function AdPlaceholder({ variant }: AdPlaceholderProps) {
  if (variant === 'banner') {
    return (
      <Box
        className="adsense-header-banner"
        sx={{
          width: '100%',
          maxWidth: 728,
          height: 90,
          margin: '20px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#161618' : '#f4f4f5',
          color: 'text.secondary'
        }}
      >
        <Typography
          variant="caption"
          sx={{ letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.65rem' }}
        >
          ADVERTISEMENT
        </Typography>
        <Typography variant="caption" color="text.secondary">
          728 x 90 Responsive Banner
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      className="adsense-inline-rectangle"
      sx={{
        width: '100%',
        minHeight: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#161618' : '#f4f4f5',
        color: 'text.secondary',
        padding: 3,
        boxSizing: 'border-box',
        height: '100%'
      }}
    >
      <Typography
        variant="caption"
        sx={{ letterSpacing: '0.1em', fontWeight: 600, fontSize: '0.65rem' }}
      >
        ADVERTISEMENT
      </Typography>
      <Typography variant="caption" color="text.secondary">
        300 x 250 Inline Rectangle
      </Typography>
    </Box>
  );
}
