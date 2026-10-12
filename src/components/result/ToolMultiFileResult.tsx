import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  Button,
  Stack,
  Chip,
  alpha
} from '@mui/material';
import InputHeader from '../InputHeader';
import greyPattern from '@assets/grey-pattern.png';
import { globalInputHeight } from '../../config/uiConfig';
import ResultFooter from './ResultFooter';
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';

export default function ToolMultiFileResult({
  title = 'Result',
  value,
  zipFile,
  loading,
  loadingText
}: {
  title?: string;
  value: File[];
  zipFile?: File | null;
  loading?: boolean;
  loadingText?: string;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const getFileType = (
    file: File
  ): 'image' | 'video' | 'audio' | 'pdf' | 'unknown' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.startsWith('application/pdf')) return 'pdf';
    return 'unknown';
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (zipFile) {
      const blob = new Blob([zipFile], { type: zipFile.type });
      const clipboardItem = new ClipboardItem({ [zipFile.type]: blob });
      navigator.clipboard
        .write([clipboardItem])
        .then(() => showSnackBar(t('toolMultiFileResult.copied'), 'success'))
        .catch((err) => {
          showSnackBar(
            t('toolMultiFileResult.copyFailed', { error: err }),
            'error'
          );
        });
    }
  };

  const headerActions = (
    <Stack direction="row" spacing={1} alignItems="center">
      <Button
        disabled={!zipFile || loading}
        onClick={() => zipFile && handleDownload(zipFile)}
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
          boxShadow: zipFile ? '0 4px 14px rgba(64,86,161,0.35)' : 'none',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(241,60,32,0.35)'
          }
        }}
      >
        Download All as ZIP
      </Button>
    </Stack>
  );

  const headerBadge =
    value && value.length > 0 ? (
      <Chip
        size="small"
        label={`${value.length} ${value.length === 1 ? 'file' : 'files'}`}
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
        title={title || t('toolMultiFileResult.result')}
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
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 3,
          boxShadow: '0 2px 14px rgba(64,86,161,0.08)',
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          alignItems: 'center',
          p: 2,
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
                {loadingText ||
                  t('toolMultiFileResult.loading') ||
                  'Processing...'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Please wait while files are being generated
              </Typography>
            </Box>
          </Box>
        ) : value.length > 0 ? (
          value.map((file, idx) => {
            const preview = URL.createObjectURL(file);
            const fileType = getFileType(file);

            return (
              <Box
                key={idx}
                sx={{
                  width: '100%',
                  backgroundImage:
                    fileType === 'image' && theme.palette.mode !== 'dark'
                      ? `url(${greyPattern})`
                      : 'none',
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                {fileType === 'image' && (
                  <img
                    src={preview}
                    alt={`Preview ${idx}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: 240,
                      objectFit: 'contain',
                      borderRadius: '8px'
                    }}
                  />
                )}
                {fileType === 'video' && (
                  <video src={preview} controls style={{ maxWidth: '100%' }} />
                )}
                {fileType === 'audio' && (
                  <audio src={preview} controls style={{ width: '100%' }} />
                )}
                {fileType === 'pdf' && (
                  <iframe
                    src={preview}
                    width="100%"
                    height="320px"
                    style={{ border: 'none' }}
                  />
                )}
                {fileType === 'unknown' && (
                  <Typography variant="body2" sx={{ my: 1 }}>
                    {file.name}
                  </Typography>
                )}
                <Button
                  onClick={() => handleDownload(file)}
                  size="small"
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ mt: 1.5, borderRadius: 999, px: 2, fontWeight: 600 }}
                  variant="outlined"
                >
                  Download {file.name}
                </Button>
              </Box>
            );
          })
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
              Results will appear here
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', maxWidth: 280 }}
            >
              Process multiple files to view and download them together as a ZIP
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
