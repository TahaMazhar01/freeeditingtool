import {
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  alpha,
  useTheme
} from '@mui/material';
import React, { useContext, useRef } from 'react';
import PublishIcon from '@mui/icons-material/Publish';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';
import InputHeader from '../InputHeader';
import { useTranslation } from 'react-i18next';

import { globalInputHeight } from '../../config/uiConfig';

export default function ToolTextInput({
  value,
  onChange,
  title = 'Input text',
  placeholder
}: {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { showSnackBar } = useContext(CustomSnackBarContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard
      .writeText(value)
      .then(() => showSnackBar(t('toolTextInput.copied'), 'success'))
      .catch((err) => {
        showSnackBar(t('toolTextInput.copyFailed', { error: err }), 'error');
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
          onChange(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    onChange('');
  };

  const wordCount = value
    ? value.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const charCount = value ? value.length : 0;

  const headerActions = (
    <Stack direction="row" spacing={1} alignItems="center">
      {value ? (
        <>
          <Button
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
            Copy
          </Button>
          <Button
            onClick={handleImportClick}
            size="small"
            variant="outlined"
            startIcon={<PublishIcon fontSize="small" />}
            sx={{
              borderRadius: 999,
              fontWeight: 600,
              fontSize: '0.8rem',
              px: 1.5,
              borderColor: alpha(theme.palette.primary.main, 0.35)
            }}
          >
            Import
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
          startIcon={<PublishIcon fontSize="small" />}
          sx={{
            borderRadius: 999,
            fontWeight: 600,
            fontSize: '0.8rem',
            px: 2,
            borderColor: alpha(theme.palette.primary.main, 0.35)
          }}
        >
          Import File
        </Button>
      )}
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
        title={title || t('toolTextInput.input')}
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
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: alpha(theme.palette.primary.main, 0.4),
            boxShadow: '0 6px 22px rgba(64,86,161,0.1)'
          }
        }}
      >
        <TextField
          value={value}
          onChange={(event) => onChange(event.target.value)}
          fullWidth
          multiline
          placeholder={placeholder || t('toolTextInput.placeholder')}
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
          inputProps={{
            'data-testid': 'text-input'
          }}
        />
      </Box>
      <input
        type="file"
        accept="*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
}
