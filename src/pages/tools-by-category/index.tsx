import ToolCard from '@components/allTools/ToolCard';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link, useParams } from 'react-router-dom';
import {
  filterTools,
  getToolsByCategory,
  getToolCategoryTitle
} from '../../tools';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import UserTypeFilter from '@components/UserTypeFilter';
import { useTranslation } from 'react-i18next';
import { validNamespaces } from '../../i18n';
import { useUserTypeFilter } from '../../providers/UserTypeFilterProvider';
export default function ToolsByCategory() {
  const { categoryName } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedUserTypes, setSelectedUserTypes } = useUserTypeFilter();
  const { t } = useTranslation(validNamespaces);
  const rawTitle = getToolCategoryTitle(categoryName as string, t);
  const category = getToolsByCategory([], t).find(
    ({ type }) => type === categoryName
  );
  const categoryTools = filterTools(
    category?.tools ?? [],
    searchTerm,
    selectedUserTypes,
    t
  );
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        px: { xs: 2, md: 5 },
        pb: 8
      }}
    >
      <Helmet>
        <title>{`${rawTitle} | FreeEditingTools`}</title>
        <meta
          name="description"
          content={`Explore ${
            category?.tools.length ?? 0
          } free ${rawTitle.toLowerCase()} tools in your browser.`}
        />
      </Helmet>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Button
          component={Link}
          to="/"
          startIcon={<Icon icon="ph:arrow-left-bold" />}
          sx={{ mb: 2 }}
        >
          All tools
        </Button>
        <Box
          sx={{
            borderRadius: '24px',
            p: { xs: 3, md: 5 },
            background: 'linear-gradient(115deg, #F5EDD4, #F4F6FC)',
            border: '1px solid #E4DFD2',
            mb: 4
          }}
        >
          <Typography
            sx={{
              color: '#4056A1',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.12em',
              mb: 1
            }}
          >
            YOUR TOOL COLLECTION
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: 34, md: 48 },
              fontWeight: 700,
              color: '#28376D',
              mb: 2
            }}
          >
            {rawTitle}
          </Typography>
          <Typography sx={{ color: '#555577', mb: 3 }}>
            {category?.tools.length ?? 0} tools ready for your next task.
          </Typography>
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={`Search ${rawTitle.toLowerCase()}`}
            inputProps={{
              'aria-label': `Search ${rawTitle.toLowerCase()}`
            }}
            InputProps={{
              startAdornment: (
                <Icon
                  icon="ph:magnifying-glass"
                  fontSize={22}
                  style={{ marginRight: 10 }}
                />
              ),
              sx: { background: '#FFFFFF', borderRadius: '12px' }
            }}
          />
        </Box>
        <Box mb={4}>
          <UserTypeFilter
            userTypes={category?.userTypes}
            selectedUserTypes={selectedUserTypes}
            onUserTypesChange={setSelectedUserTypes}
          />
        </Box>
        <Grid container spacing={3}>
          {categoryTools.map((tool) => (
            <Grid item xs={12} sm={6} lg={4} key={tool.path}>
              <ToolCard
                title={t(tool.name)}
                description={t(tool.shortDescription)}
                link={'/' + tool.path}
                icon={tool.icon}
              />
            </Grid>
          ))}
        </Grid>
        {categoryTools.length === 0 && (
          <Stack
            spacing={2}
            alignItems="center"
            sx={{ p: 4, border: '1px solid #E4DFD2', borderRadius: '16px' }}
          >
            <Typography>No tools match your workspace or search.</Typography>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedUserTypes([]);
              }}
            >
              Show all tools in this collection
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
