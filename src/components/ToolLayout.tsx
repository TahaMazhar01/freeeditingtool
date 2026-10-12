import { Box } from '@mui/material';
import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import ToolHeader from './ToolHeader';
import Separator from './Separator';
import AllTools from './allTools/AllTools';
import { getToolsByCategory } from '@tools/index';
import {
  capitalizeFirstLetter,
  getI18nNamespaceFromToolCategory
} from '../utils/string';
import { IconifyIcon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { ToolCategory } from '@tools/defineTool';
import { FullI18nKey } from '../i18n';
import AdPlaceholder from './AdPlaceholder';
import SEOContentBlock from './SEOContentBlock';

export default function ToolLayout({
  children,
  icon,
  i18n,
  type,
  fullPath
}: {
  icon?: IconifyIcon | string;
  type: ToolCategory;
  fullPath: string;
  children: ReactNode;
  i18n?: {
    name: FullI18nKey;
    description: FullI18nKey;
    shortDescription: FullI18nKey;
  };
}) {
  const { t } = useTranslation([
    'translation',
    getI18nNamespaceFromToolCategory(type)
  ]);

  // Use i18n keys if available, otherwise fall back to provided strings
  //@ts-ignore
  const toolTitle: string = t(i18n.name);
  //@ts-ignore
  const toolDescription: string = t(i18n.description);

  const otherCategoryTools =
    getToolsByCategory([], t)
      .find((category) => category.type === type)
      ?.tools.filter((tool) => t(tool.name) !== toolTitle)
      .map((tool) => ({
        title: tool.name,
        description: tool.shortDescription,
        link: '/' + tool.path,
        icon: tool.icon
      })) ?? [];

  return (
    <Box
      width={'100%'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      sx={{ backgroundColor: 'background.default' }}
    >
      <Helmet>
        <title>{`${toolTitle} - FreeEditingTools`}</title>
        <meta name="description" content={toolDescription} />
        <link
          rel="canonical"
          href={`https://freeeditingtools.com/${fullPath}`}
        />
        <meta property="og:title" content={`${toolTitle} - FreeEditingTools`} />
        <meta property="og:description" content={toolDescription} />
        <meta
          property="og:url"
          content={`https://freeeditingtools.com/${fullPath}`}
        />
        <meta property="og:type" content="website" />
        <meta
          name="twitter:title"
          content={`${toolTitle} - FreeEditingTools`}
        />
        <meta name="twitter:description" content={toolDescription} />
      </Helmet>
      <Box width={'85%'}>
        <ToolHeader
          title={toolTitle}
          description={toolDescription}
          icon={icon}
          type={type}
          path={fullPath}
        />
        {children}

        {/* AdSense Inline Rectangle Placeholder */}
        <Box
          sx={{
            mt: 6,
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <AdPlaceholder variant="rectangle" />
        </Box>

        {/* AdSense-required SEO Context block */}
        <SEOContentBlock
          toolName={toolTitle}
          toolDescription={toolDescription}
          category={type}
        />

        <Separator margin="50px" />
        <AllTools
          title={t('translation:toolLayout.allToolsTitle', '', {
            type: capitalizeFirstLetter(
              getToolsByCategory([], t).find(
                (category) => category.type === type
              )!.title
            )
          })}
          toolCards={otherCategoryTools}
        />
      </Box>
    </Box>
  );
}
