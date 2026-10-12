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
import React, { useContext } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import InputHeader from '../InputHeader';
import greyPattern from '@assets/grey-pattern.png';
import { globalInputHeight } from '../../config/uiConfig';
import ResultFooter from './ResultFooter';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';
import { useTranslation } from 'react-i18next';

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default function ToolFileResult({
  title = 'Result',
  value,
  extension,
  loading,
  loadingText
}: {
  title?: string;
  value: File | null;
  extension?: string;
  loading?: boolean;
  loadingText?: string;
}) {
  const { t } = useTranslation();
  const [preview, setPreview] = React.useState<string | null>(null);
  const { showSnackBar } = useContext(CustomSnackBarContext);
  const theme = useTheme();

  React.useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleCopy = () => {
    if (value) {
      try {
        const blob = new Blob([value], { type: value.type });
        const clipboardItem = new ClipboardItem({ [value.type]: blob });

        navigator.clipboard
          .write([clipboardItem])
          .then(() => showSnackBar(t('toolFileResult.copied'), 'success'))
          .catch((err) => {
            showSnackBar(
              t('toolFileResult.copyFailed', { error: err }),
              'error'
            );
          });
      } catch (err) {
        showSnackBar(
          'Clipboard copy not supported for this file type',
          'error'
        );
      }
    }
  };

  const handleDownload = () => {
    if (value) {
      let filename: string = value.name;
      if (extension) {
        const parts = filename.split('.');
        if (parts.length > 1) {
          parts.pop();
          filename = `${parts.join('.')}.${extension}`;
        } else {
          filename = `${filename}.${extension}`;
        }
      }
      const blob = new Blob([value], { type: value.type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  type SupportedFileType = 'image' | 'video' | 'audio' | 'pdf' | 'unknown';
  const getFileType = (): SupportedFileType => {
    if (!value) return 'unknown';
    if (value.type.startsWith('image/')) return 'image';
    if (value.type.startsWith('video/')) return 'video';
    if (value.type.startsWith('audio/')) return 'audio';
    if (value.type.startsWith('application/pdf')) return 'pdf';
    return 'unknown';
  };

  const fileType = getFileType();
  const hideCopy =
    fileType === 'video' || fileType === 'audio' || fileType === 'pdf';

  const headerActions = (
    <Stack direction="row" spacing={1} alignItems="center">
      {!hideCopy && (
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
      )}
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
      label={formatFileSize(value.size)}
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
        title={title || t('toolFileResult.result')}
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
                {loadingText || t('toolFileResult.loading') || 'Processing...'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Please wait while the result is being prepared
              </Typography>
            </Box>
          </Box>
        ) : preview ? (
          <Box
            width={'100%'}
            height={'100%'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage:
                fileType === 'image' ? `url(${greyPattern})` : 'none',
              position: 'relative'
            }}
          >
            {fileType === 'image' && (
              <img
                src={preview}
                alt="Result"
                style={{
                  maxWidth: '100%',
                  maxHeight: globalInputHeight,
                  objectFit: 'contain'
                }}
              />
            )}
            {fileType === 'video' && (
              <video
                src={preview}
                controls
                style={{ maxWidth: '100%', maxHeight: globalInputHeight }}
              />
            )}
            {fileType === 'audio' && (
              <audio
                src={preview}
                controls
                style={{ width: '90%', maxWidth: '450px' }}
              />
            )}
            {fileType === 'pdf' && (
              <iframe
                src={preview}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            )}
            {fileType === 'unknown' && (
              <Box sx={{ padding: 3, textAlign: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  File processed successfully
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click the Download button at the top right to save your file.
                </Typography>
              </Box>
            )}

            {/* Clean bottom badge for completed result */}
            {value && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 12,
                  right: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 999,
                  px: 2,
                  py: 0.6,
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                  zIndex: 10
                }}
              >
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    textAlign: 'center'
                  }}
                >
                  {value.name}
                </Typography>
              </Box>
            )}
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
              your result
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
