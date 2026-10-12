import {
  Box,
  Typography,
  CircularProgress,
  useTheme,
  Button,
  Stack,
  alpha
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import InputHeader from '../InputHeader';
import ResultFooter from './ResultFooter';
import { useContext } from 'react';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';
import { globalInputHeight } from '../../config/uiConfig';
import { useTranslation } from 'react-i18next';
import { stripAndDecodeHtml } from '@utils/string';
import DOMPurify from 'dompurify';

const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: ['div', 'span', 'br'],
  ALLOWED_ATTR: ['class']
};

export default function ToolDiffResult({
  title = 'Differences',
  value,
  copyValue,
  loading,
  isHtml = false
}: {
  title?: string;
  value: string;
  copyValue?: string;
  loading?: boolean;
  isHtml?: boolean;
}) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const handleCopy = () => {
    const text = copyValue ?? (isHtml ? stripAndDecodeHtml(value) : value);
    navigator.clipboard
      .writeText(text)
      .then(() => showSnackBar(t('toolTextResult.copied'), 'success'))
      .catch((err) =>
        showSnackBar(t('toolTextResult.copyFailed', { error: err }), 'error')
      );
  };

  const handleDownload = () => {
    const mimeType = isHtml ? 'text/html' : 'text/plain';
    const exportValue = isHtml
      ? `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Text differences</title><style>body{font-family:monospace;white-space:pre-wrap;padding:24px}.diff-added{background:#d8f5df;text-decoration:underline}.diff-removed{background:#ffdddd;text-decoration:line-through}</style></head><body>${DOMPurify.sanitize(
          value,
          DOMPURIFY_CONFIG
        )}</body></html>`
      : value;
    const blob = new Blob([exportValue], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isHtml ? 'diff-output.html' : 'diff-output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  };

  const sharedBoxSx = {
    p: 2,
    backgroundColor: 'background.paper',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 3,
    boxShadow: '0 2px 14px rgba(64,86,161,0.08)',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    height: globalInputHeight,
    minHeight: globalInputHeight,
    maxHeight: globalInputHeight,
    boxSizing: 'border-box' as const,
    overflowY: 'auto' as const
  } as const;

  const headerActions = (
    <Stack direction="row" spacing={1} alignItems="center">
      <Button
        disabled={!value || loading}
        onClick={handleCopy}
        size="small"
        variant="outlined"
        startIcon={<ContentPasteIcon fontSize="small" />}
        sx={{
          borderRadius: 999,
          fontWeight: 600,
          fontSize: '0.8rem',
          px: 1.8,
          borderColor: alpha(theme.palette.primary.main, 0.35)
        }}
      >
        Copy Diff
      </Button>
      <Button
        disabled={!value || loading}
        onClick={handleDownload}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<DownloadIcon fontSize="small" />}
        sx={{
          borderRadius: 999,
          fontWeight: 700,
          fontSize: '0.85rem',
          px: 2.5,
          py: 0.6,
          boxShadow: value ? '0 4px 14px rgba(64,86,161,0.35)' : 'none'
        }}
      >
        Download
      </Button>
    </Stack>
  );

  return (
    <Box>
      <InputHeader title={title} actions={headerActions} />
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: globalInputHeight,
            minHeight: globalInputHeight,
            maxHeight: globalInputHeight,
            boxSizing: 'border-box',
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
            gap: 1.5,
            p: 3
          }}
        >
          <CircularProgress
            size={42}
            thickness={4}
            sx={{ color: 'primary.main' }}
          />
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {t('toolTextResult.loading') || 'Processing...'}
          </Typography>
        </Box>
      ) : isHtml ? (
        <Box
          sx={{
            ...sharedBoxSx,
            '& .diff-added': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.success.dark
                  : theme.palette.success.light,
              color: theme.palette.success.contrastText
            },
            '& .diff-removed': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.error.dark
                  : theme.palette.error.light,
              color: theme.palette.error.contrastText
            }
          }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(value, DOMPURIFY_CONFIG)
          }}
        />
      ) : (
        <Box sx={sharedBoxSx}>{value}</Box>
      )}
    </Box>
  );
}
