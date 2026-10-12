import React, { useRef } from 'react';
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InputHeader from '../InputHeader';
import ImageIcon from '@mui/icons-material/Image';
import { useTranslation } from 'react-i18next';
import { heicTo, isHeic } from 'heic-to';
import { globalInputHeight } from '../../config/uiConfig';

interface MultiImageInputComponentProps {
  accept: string[];
  title?: string;
  type: 'image';
  value: MultiImageInput[];
  onChange: (files: MultiImageInput[]) => void;
}

export interface MultiImageInput {
  file: File;
  order: number;
  preview?: string;
}

export default function ToolMultiImageInput({
  value,
  onChange,
  accept,
  title,
  type
}: MultiImageInputComponentProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: MultiImageInput[] = await Promise.all(
      Array.from(files).map(async (file, index) => {
        let processedFile = file;

        try {
          if (await isHeic(file)) {
            const convertedBlob = await heicTo({
              blob: file,
              type: 'image/jpeg'
            });

            processedFile = new File(
              [convertedBlob],
              file.name.replace(/\.[^/.]+$/, '') + '.jpg',
              { type: 'image/jpeg' }
            );
          }
        } catch (err) {
          console.warn('HEIC conversion failed:', file.name, err);
        }

        return {
          file: processedFile,
          order: value.length + index,
          preview: URL.createObjectURL(processedFile)
        };
      })
    );

    onChange([...value, ...newFiles]);

    event.target.value = '';
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  function handleClear() {
    value.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    onChange([]);
  }

  function handleRemove(index: number) {
    const fileToRemove = value[index];
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const updatedFiles = value.filter((_, i) => i !== index);
    onChange(updatedFiles);
  }

  function fileNameTruncate(fileName: string) {
    const maxLength = 10;
    return fileName.length > maxLength
      ? fileName.slice(0, maxLength) + '...'
      : fileName;
  }

  const theme = useTheme();

  const headerActions = (
    <Stack direction="row" spacing={1} alignItems="center">
      {value?.length > 0 ? (
        <>
          <Button
            onClick={handleImportClick}
            size="small"
            variant="outlined"
            startIcon={<CloudUploadOutlinedIcon fontSize="small" />}
            sx={{
              borderRadius: 999,
              fontWeight: 600,
              fontSize: '0.8rem',
              px: 1.8,
              borderColor: alpha(theme.palette.primary.main, 0.35)
            }}
          >
            Add More
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
            Clear All
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

  const headerBadge =
    value?.length > 0 ? (
      <Chip
        size="small"
        label={`${value.length} ${value.length === 1 ? 'image' : 'images'}`}
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
        title={
          title ||
          t('toolMultipleInput.inputTitle', {
            type: type.charAt(0).toUpperCase() + type.slice(1)
          })
        }
        actions={headerActions}
        badge={headerBadge}
      />
      <Box
        sx={{
          width: '100%',
          height: globalInputHeight,
          minHeight: globalInputHeight,
          borderRadius: 3,
          boxShadow: value?.length ? '0 2px 14px rgba(64,86,161,0.08)' : 'none',
          bgcolor: 'background.paper',
          border: value?.length
            ? `1px solid ${theme.palette.divider}`
            : '2px dashed',
          borderColor: value?.length
            ? theme.palette.divider
            : alpha(theme.palette.primary.main, 0.3),
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            boxShadow: '0 6px 22px rgba(64,86,161,0.1)'
          }
        }}
      >
        <Box
          width="100%"
          height="100%"
          sx={{
            overflow: 'auto',
            display: 'flex',
            alignItems: value?.length ? 'flex-start' : 'center',
            justifyContent: value?.length ? 'flex-start' : 'center',
            flexWrap: 'wrap',
            p: 2,
            gap: 1.5,
            position: 'relative'
          }}
        >
          {value?.length ? (
            value.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '130px',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  p: 1,
                  bgcolor: 'background.paper',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: alpha(theme.palette.primary.main, 0.4),
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {file.preview ? (
                  <Box
                    component="img"
                    src={file.preview}
                    alt={file.file.name}
                    sx={{
                      width: '100%',
                      height: '90px',
                      objectFit: 'cover',
                      borderRadius: 1.5
                    }}
                  />
                ) : (
                  <ImageIcon sx={{ fontSize: 44, color: 'primary.main' }} />
                )}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    mt: 1
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {fileNameTruncate(file.file.name)}
                  </Typography>
                  <Box
                    sx={{
                      cursor: 'pointer',
                      color: 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      p: 0.3,
                      borderRadius: '50%',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.error.main, 0.1)
                      }
                    }}
                    onClick={() => handleRemove(index)}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box
              onClick={handleImportClick}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
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
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                }}
              >
                <CloudUploadOutlinedIcon sx={{ fontSize: 32 }} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.15rem' },
                  color: 'text.primary',
                  mb: 0.5,
                  textAlign: 'center'
                }}
              >
                Drag & Drop or Upload Multiple Images
              </Typography>

              <Button
                variant="contained"
                size="small"
                onClick={(e: React.MouseEvent) => {
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
                Browse Images
              </Button>

              <Typography variant="caption" color="text.secondary">
                Select one or multiple images to process together
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <input
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
        accept={accept.join(',')}
        onChange={handleFileChange}
        multiple
      />
    </Box>
  );
}
