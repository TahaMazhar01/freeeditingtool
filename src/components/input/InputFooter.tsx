import { Stack, Button, alpha, useTheme } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';

export default function InputFooter({
  handleImport,
  handleCopy,
  handleClear
}: {
  handleImport: () => void;
  handleCopy?: () => void;
  handleClear?: () => void;
}) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack mt={1.5} direction={'row'} spacing={1.5} alignItems="center">
      <Button
        onClick={handleImport}
        variant="outlined"
        size="small"
        startIcon={<PublishIcon fontSize="small" />}
        sx={{
          borderRadius: 999,
          fontWeight: 600,
          px: 2,
          borderColor: alpha(theme.palette.primary.main, 0.35)
        }}
      >
        {t('inputFooter.importFromFile')}
      </Button>
      {handleCopy && (
        <Button
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
          {t('inputFooter.copyToClipboard')}
        </Button>
      )}
      {handleClear && (
        <Button
          onClick={handleClear}
          variant="text"
          color="error"
          size="small"
          startIcon={<ClearIcon fontSize="small" />}
          sx={{
            borderRadius: 999,
            fontWeight: 600,
            px: 1.5
          }}
        >
          {t('inputFooter.clear')}
        </Button>
      )}
    </Stack>
  );
}
