import { Stack, Button, alpha, useTheme } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ResultFooter({
  handleDownload,
  handleCopy,
  disabled,
  hideCopy,
  downloadLabel
}: {
  handleDownload: () => void;
  handleCopy?: () => void;
  disabled?: boolean;
  hideCopy?: boolean;
  downloadLabel?: string;
}) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack mt={1.5} direction={'row'} spacing={1.5} alignItems="center">
      <Button
        disabled={disabled}
        onClick={handleDownload}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<DownloadIcon fontSize="small" />}
        sx={{
          borderRadius: 999,
          fontWeight: 700,
          px: 2.5,
          py: 0.6,
          boxShadow: disabled ? 'none' : '0 4px 14px rgba(64,86,161,0.28)'
        }}
      >
        {downloadLabel || t('resultFooter.download')}
      </Button>
      {!hideCopy && handleCopy && (
        <Button
          disabled={disabled}
          onClick={handleCopy}
          variant="outlined"
          size="small"
          startIcon={<ContentPasteIcon fontSize="small" />}
          sx={{
            borderRadius: 999,
            fontWeight: 600,
            px: 2,
            borderColor: alpha(theme.palette.primary.main, 0.35)
          }}
        >
          {t('resultFooter.copy')}
        </Button>
      )}
    </Stack>
  );
}
