import React, { ReactNode, useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  useTheme,
  alpha
} from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import InputHeader from '../InputHeader';
import {
  BaseFileInputProps,
  createObjectURL,
  revokeObjectURL
} from './file-input-utils';
import { workspaceInputHeight } from '../../config/uiConfig';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';
import greyPattern from '@assets/grey-pattern.png';
import { isArray } from 'lodash';
import { useTranslation } from 'react-i18next';

interface BaseFileInputComponentProps extends BaseFileInputProps {
  children: (props: { preview: string | undefined }) => ReactNode;
  type: 'image' | 'video' | 'audio' | 'pdf';
}

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const formatAcceptedTypes = (accept: string[]): string => {
  return accept
    .map((type) => {
      if (type.includes('/')) {
        const ext = type.split('/')[1];
        return ext === '*'
          ? type.split('/')[0].toUpperCase()
          : ext.toUpperCase();
      }
      return type.replace('.', '').toUpperCase();
    })
    .slice(0, 4)
    .join(', ');
};

export default function BaseFileInput({
  value,
  onChange,
  accept,
  title,
  children,
  type
}: BaseFileInputComponentProps) {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const theme = useTheme();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { showSnackBar } = useContext(CustomSnackBarContext);

  const currentFile = isArray(value) ? value[0] : value;

  useEffect(() => {
    if (value) {
      try {
        const target = isArray(value) ? value[0] : value;
        if (target) {
          const objectUrl = createObjectURL(target);
          setPreview(objectUrl);
          return () => revokeObjectURL(objectUrl);
        }
      } catch (error) {
        console.error('Error previewing file:', error);
      }
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onChange(file);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleCopy = () => {
    const targetFile = isArray(value) ? value[0] : value;
    if (targetFile) {
      try {
        const blob = new Blob([targetFile], { type: targetFile.type });
        const clipboardItem = new ClipboardItem({ [targetFile.type]: blob });

        navigator.clipboard
          .write([clipboardItem])
          .then(() => showSnackBar(t('baseFileInput.fileCopied'), 'success'))
          .catch((err) => {
            showSnackBar(
              t('baseFileInput.copyFailed', { error: err }),
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

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      const isAcceptable = accept.some((acceptType) => {
        if (acceptType.endsWith('/*')) {
          const category = acceptType.split('/')[0];
          return file.type.startsWith(category);
        }
        return acceptType === file.type;
      });

      if (isAcceptable) {
        onChange(file);
      } else {
        showSnackBar(
          `Invalid file type. Please use ${accept.join(', ')}`,
          'error'
        );
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleClear = () => {
    onChange(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const clipboardItems = event.clipboardData?.items ?? [];
      const item = clipboardItems[0];
      if (
        item &&
        (item.type.includes('image') || item.type.includes('video'))
      ) {
        const file = item.getAsFile();
        if (file) onChange(file);
      }
    };
    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [onChange]);

  const headerActions = (
    <Stack direction="row" spacing={1} alignItems="center">
      {preview ? (
        <>
          {type === 'image' && (
            <Button
              onClick={handleCopy}
              size="small"
              variant="outlined"
              startIcon={<ContentPasteIcon fontSize="small" />}
              sx={{
                borderRadius: 999,
                fontWeight: 600,
                fontSize: '0.8rem',
                px: 1.5,
                borderColor: alpha(theme.palette.primary.main, 0.3)
              }}
            >
              Copy
            </Button>
          )}
          <Button
            onClick={handleImportClick}
            size="small"
            variant="outlined"
            startIcon={<SyncAltIcon fontSize="small" />}
            sx={{
              borderRadius: 999,
              fontWeight: 600,
              fontSize: '0.8rem',
              px: 1.5,
              borderColor: alpha(theme.palette.primary.main, 0.3)
            }}
          >
            Change
          </Button>
          <Button
            onClick={handleClear}
            size="small"
            color="error"
            variant="text"
            startIcon={<DeleteOutlineIcon fontSize="small" />}
            sx={{
              borderRadius: 999,
              fontWeight: 600,
              fontSize: '0.8rem',
              px: 1.2
            }}
          >
            Clear
          </Button>
        </>
      ) : (
        <Button
          onClick={handleImportClick}
          size="small"
          variant="outlined"
          startIcon={<CloudUploadOutlinedIcon fontSize="small" />}
          sx={{
            borderRadius: 999,
            fontWeight: 600,
            fontSize: '0.8rem',
            px: 2,
            borderColor: alpha(theme.palette.primary.main, 0.35)
          }}
        >
          Browse
        </Button>
      )}
    </Stack>
  );

  const headerBadge = currentFile ? (
    <Chip
      size="small"
      label={formatFileSize(currentFile.size)}
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
        title={title || 'Input ' + type.charAt(0).toUpperCase() + type.slice(1)}
        actions={headerActions}
        badge={headerBadge}
      />
      <Box
        sx={{
          width: '100%',
          height: workspaceInputHeight,
          minHeight: workspaceInputHeight,
          maxHeight: workspaceInputHeight,
          boxSizing: 'border-box',
          borderRadius: 3,
          boxShadow: preview ? '0 2px 14px rgba(64,86,161,0.08)' : 'none',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'hidden',
          border: preview ? `1px solid ${theme.palette.divider}` : '2px dashed',
          borderColor: isDragging
            ? theme.palette.secondary.main
            : preview
              ? theme.palette.divider
              : alpha(theme.palette.primary.main, 0.3),
          backgroundColor: isDragging
            ? alpha(theme.palette.secondary.main, 0.05)
            : 'background.paper',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: preview
              ? alpha(theme.palette.primary.main, 0.5)
              : theme.palette.primary.main,
            boxShadow: '0 6px 22px rgba(64,86,161,0.1)'
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <Box
            width="100%"
            height="100%"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage:
                type === 'image' ? `url(${greyPattern})` : 'none',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {children({ preview })}

            {currentFile && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 12,
                  right: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
                    maxWidth: { xs: '50%', sm: '65%' }
                  }}
                >
                  {currentFile.name}
                </Typography>
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Button
                    size="small"
                    onClick={handleImportClick}
                    sx={{
                      py: 0.2,
                      px: 1,
                      minWidth: 'auto',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    Replace
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={handleClear}
                    sx={{
                      py: 0.2,
                      px: 1,
                      minWidth: 'auto',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    Clear
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            onClick={handleImportClick}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: { xs: 2.5, sm: 3.5 },
              height: '100%',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5,
                color: 'primary.main',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.08)'
                }
              }}
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 32 }} />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.15rem' },
                color: isDragging
                  ? theme.palette.secondary.main
                  : 'text.primary',
                mb: 0.5,
                textAlign: 'center',
                letterSpacing: '-0.01em'
              }}
            >
              {isDragging
                ? `Drop your ${type} here`
                : `Drag & Drop or Upload ${
                    type === 'image'
                      ? 'Image'
                      : type.charAt(0).toUpperCase() + type.slice(1)
                  } / Files`}
            </Typography>

            <Button
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleImportClick();
              }}
              sx={{
                mt: 1,
                mb: 1.2,
                px: 3,
                py: 0.7,
                borderRadius: 999,
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              Browse from Device
            </Button>

            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 0.6,
                fontSize: '0.78rem'
              }}
            >
              <span>Supports {formatAcceptedTypes(accept)}</span>
              <span>•</span>
              <span>Press Ctrl+V to paste</span>
            </Typography>
          </Box>
        )}
      </Box>

      <input
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
        accept={accept.join(',')}
        onChange={handleFileChange}
        multiple={false}
      />
    </Box>
  );
}
