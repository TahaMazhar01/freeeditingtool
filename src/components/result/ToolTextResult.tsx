import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import React, { useContext } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';
import InputHeader from '../InputHeader';
import { replaceSpecialCharacters } from '@utils/string';
import mime from 'mime';
import { globalInputHeight } from '../../config/uiConfig';
import { useTranslation } from 'react-i18next';

export default function ToolTextResult({
  title = 'Result',
  value,
  extension = 'txt',
  keepSpecialCharacters,
  loading
}: {
  title?: string;
  value: string;
  extension?: string;
  keepSpecialCharacters?: boolean;
  loading?: boolean;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard
      .writeText(value)
      .then(() => showSnackBar(t('toolTextResult.copied'), 'success'))
      .catch((err) => {
        showSnackBar(t('toolTextResult.copyFailed', { error: err }), 'error');
      });
  };

  const handleDownload = () => {
    if (!value) return;
    const filename = `output-freeeditingtools.${extension}`;
    const mimeType = mime.getType(extension) || 'text/plain';

    const blob = new Blob([value], {
      type: mimeType
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const wordCount = value
    ? value.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const charCount = value ? value.length : 0;

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
        {t('resultFooter.copy') || 'Copy'}
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
          boxShadow: value ? '0 4px 14px rgba(64,86,161,0.35)' : 'none',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(241,60,32,0.35)'
          }
        }}
      >
        {t('resultFooter.download') || 'Download'}
      </Button>
    </Stack>
  );

  const headerBadge = value ? (
    <Chip
      size="small"
      label={`${wordCount} words • ${charCount} chars`}
      sx={{
        fontWeight: 600,
        fontSize: '0.75rem',
        bgcolor: alpha(theme.palette.primary.main, 0.08),
        color: 'primary.main',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
      }}
    />
  ) : null;

  return (
    <Box>
      <InputHeader
        title={title || t('toolTextResult.result')}
        actions={headerActions}
        badge={headerBadge}
      />
      <Box
        sx={{
          width: '100%',
          height: globalInputHeight,
          minHeight: globalInputHeight,
          maxHeight: globalInputHeight,
          boxSizing: 'border-box',
          borderRadius: 3,
          boxShadow: '0 2px 14px rgba(64,86,161,0.08)',
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: alpha(theme.palette.primary.main, 0.4),
            boxShadow: '0 6px 22px rgba(64,86,161,0.1)'
          }
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: 1.5,
              p: 3
            }}
          >
            <CircularProgress
              size={42}
              thickness={4}
              sx={{ color: 'primary.main' }}
            />
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: 'text.primary' }}
              >
                {t('toolTextResult.loading') || 'Processing...'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Extracting and formatting text, please wait
              </Typography>
            </Box>
          </Box>
        ) : value ? (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <TextField
              value={
                keepSpecialCharacters ? value : replaceSpecialCharacters(value)
              }
              fullWidth
              multiline
              sx={{
                flex: 1,
                height: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                  alignItems: 'flex-start',
                  fontFamily: 'inherit',
                  lineHeight: 1.7,
                  p: 2,
                  '& fieldset': { border: 'none' }
                },
                '& .MuiInputBase-inputMultiline': {
                  height: '100% !important',
                  overflowY: 'auto !important'
                }
              }}
              inputProps={{ 'data-testid': 'text-result' }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              p: 4,
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            <Box
              sx={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5,
                color: alpha(theme.palette.primary.main, 0.65),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`
              }}
            >
              <AutoAwesomeOutlinedIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}
            >
              Output will appear here
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', maxWidth: 280 }}
            >
              Upload a file on the left and choose options to view and download
              your extracted text
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
