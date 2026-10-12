import ToolCard from '@components/allTools/ToolCard';
import {
  Box,
  Divider,
  Stack,
  styled,
  TextField,
  alpha,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  filterTools,
  getToolsByCategory,
  getToolCategoryTitle
} from '../../tools';
import Hero from 'components/Hero';
import { getI18nNamespaceFromToolCategory } from '@utils/string';
import { Icon } from '@iconify/react';
import { categoriesColors } from 'config/uiConfig';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { Helmet } from 'react-helmet';
import UserTypeFilter from '@components/UserTypeFilter';
import { useTranslation } from 'react-i18next';
import { I18nNamespaces, validNamespaces } from '../../i18n';
import { useUserTypeFilter } from '../../providers/UserTypeFilterProvider';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.secondary.main
  }
}));

export default function ToolsByCategory() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { categoryName } = useParams();
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const { selectedUserTypes, setSelectedUserTypes } = useUserTypeFilter();
  const { t } = useTranslation(validNamespaces);
  const rawTitle = getToolCategoryTitle(categoryName as string, t);
  // First get tools by category without filtering
  const toolsByCategory = getToolsByCategory(selectedUserTypes, t).find(
    ({ type }) => type === categoryName
  );
  const categoryDefinedTools = toolsByCategory?.tools ?? [];

  const categoryTools = filterTools(
    categoryDefinedTools,
    searchTerm,
    selectedUserTypes,
    t
  );

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <Helmet>
        <title>{`${rawTitle} - FreeEditingTools`}</title>
        <meta
          name="description"
          content={`Free online ${rawTitle.toLowerCase()} utilities. Browse and use ${
            categoryDefinedTools.length
          } tools completely free in your browser.`}
        />
      </Helmet>
      <Box
        padding={{ xs: 1, md: 3, lg: 5 }}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100%'}
      >
        <Hero />
      </Box>
      <Divider sx={{ borderColor: theme.palette.primary.main }} />
      <Box mt={3} ml={{ xs: 1, md: 2, lg: 3 }} padding={3}>
        <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <IconButton onClick={() => navigate('/')}>
              <ArrowBackIcon color={'primary'} />
            </IconButton>
            <Typography fontSize={22} color={theme.palette.primary.main}>
              {t('translation:toolLayout.allToolsTitle', { type: rawTitle })}
            </Typography>
          </Stack>
          <TextField
            placeholder={t('translation:hero.search.placeholder')}
            aria-label={t('translation:hero.search.placeholder')}
            InputProps={{
              endAdornment: <SearchIcon />,
              sx: {
                borderRadius: 4,
                backgroundColor: 'background.paper',
                maxWidth: 400
              }
            }}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Stack>
        <Box
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          my={2}
        >
          <UserTypeFilter
            userTypes={toolsByCategory?.userTypes ?? undefined}
            selectedUserTypes={selectedUserTypes}
            onUserTypesChange={setSelectedUserTypes}
          />
        </Box>
        <Grid container spacing={2}>
          {categoryTools.map((tool) => (
            <Grid item xs={12} md={6} lg={4} key={tool.path}>
              <ToolCard
                title={t(tool.name)}
                description={t(tool.shortDescription)}
                link={'/' + tool.path}
                icon={tool.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
