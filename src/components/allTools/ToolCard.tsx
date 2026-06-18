import {
  Box,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import { ToolCardProps } from './AllTools';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function ToolCard({
  title,
  description,
  link,
  icon
}: ToolCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(link)}
      raised
      sx={{
        borderRadius: 2,
        bgcolor: 'background.darkSecondary',
        borderColor: 'background.darkSecondary',
        color: '#fff',
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 8px 24px ${alpha('#000', 0.35)}`
            : `0 8px 24px ${alpha('#6366F1', 0.2)}`,
        cursor: 'pointer',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow:
            theme.palette.mode === 'dark'
              ? `0 12px 32px ${alpha('#6366F1', 0.25)}`
              : `0 12px 32px ${alpha('#6366F1', 0.3)}`
        }
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            paddingBottom: 1,
            borderBottomWidth: 1,
            borderColor: '#ffffff70'
          }}
        >
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <Icon icon={icon} fontSize={25} />
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
          </Stack>
          <Link href={link} underline="none" sx={{ color: '#fff' }}>
            <ChevronRightIcon />
          </Link>
        </Box>
        <Typography variant="body2" mt={2} color="#fff">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
