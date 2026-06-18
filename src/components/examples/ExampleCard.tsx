import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExampleOptions from './ExampleOptions';
import { GetGroupsType } from '@components/options/ToolOptions';

export interface ExampleCardProps<T> {
  title: string;
  description: string;
  sampleText?: string;
  sampleResult: string;
  sampleOptions: T;
  changeInputResult: (newInput: string | undefined, newOptions: T) => void;
  getGroups: GetGroupsType<T> | null;
}

export default function ExampleCard<T>({
  title,
  description,
  sampleText,
  sampleResult,
  sampleOptions,
  changeInputResult,
  getGroups
}: ExampleCardProps<T>) {
  const theme = useTheme();
  const insetShadow =
    theme.palette.mode === 'dark'
      ? `inset 2px 2px 6px ${alpha('#000', 0.4)}, inset -2px -2px 6px ${alpha(
          '#334155',
          0.5
        )}`
      : `inset 2px 2px 6px ${alpha(
          '#94A3B8',
          0.25
        )}, inset -2px -2px 6px ${alpha('#FFF', 0.9)}`;

  return (
    <Card
      raised
      onClick={() => {
        changeInputResult(sampleText, sampleOptions);
      }}
      sx={{
        bgcolor: 'background.lightSecondary',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 2,
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          boxShadow:
            theme.palette.mode === 'dark'
              ? `0 12px 32px ${alpha('#6366F1', 0.2)}`
              : `0 12px 32px ${alpha('#6366F1', 0.15)}`
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" borderRadius="5px">
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </Box>
        <Stack direction={'column'} alignItems={'center'} spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>

          {sampleText && (
            <Box
              sx={{
                display: 'flex',
                zIndex: '2',
                width: '100%',
                height: '100%',
                bgcolor: 'transparent',
                padding: '5px 10px',
                borderRadius: '5px',
                boxShadow: insetShadow
              }}
            >
              <TextField
                value={sampleText}
                disabled
                fullWidth
                multiline
                sx={{
                  '& .MuiOutlinedInput-root': {
                    zIndex: '-1',
                    '& fieldset': {
                      border: 'none'
                    }
                  }
                }}
              />
            </Box>
          )}

          <ArrowDownwardIcon />
          <Box
            sx={{
              display: 'flex',
              zIndex: '2',
              width: '100%',
              height: '100%',
              bgcolor: 'transparent',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: insetShadow
            }}
          >
            <TextField
              value={sampleResult}
              disabled
              fullWidth
              multiline
              sx={{
                '& .MuiOutlinedInput-root': {
                  zIndex: '-1',
                  '& fieldset': {
                    border: 'none'
                  }
                }
              }}
            />
          </Box>

          <ExampleOptions options={sampleOptions} getGroups={getGroups} />
        </Stack>
      </CardContent>
    </Card>
  );
}
