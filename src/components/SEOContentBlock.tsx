import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Helmet } from 'react-helmet';

interface SEOContentBlockProps {
  toolName: string;
  toolDescription: string;
  category: string;
}

export default function SEOContentBlock({
  toolName,
  toolDescription,
  category
}: SEOContentBlockProps) {
  // Generate structured FAQs based on the tool
  const faqs = [
    {
      q: `Is my data secure when using the ${toolName} tool?`,
      a: `Yes, completely. The ${toolName} runs entirely client-side in your web browser. All processing, calculations, and conversions happen locally on your computer. None of your text, files, or sensitive information are uploaded to our servers, ensuring 100% data privacy and security.`
    },
    {
      q: `Do I need to install any software or pay to use ${toolName}?`,
      a: `No installation or registration is required. Our platform is completely free to use. You can access ${toolName} instantly from any modern web browser on desktop, tablet, or mobile devices.`
    },
    {
      q: `How does the browser-based processing work?`,
      a: `Our utility utilizes modern web technologies like HTML5, CSS3, JavaScript, and WebAssembly to run complex processing scripts directly inside the browser sandbox. This eliminates server latency, saves network bandwidth, and keeps your offline workspace secure.`
    }
  ];

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolName,
    description: toolDescription,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <Box
      sx={{
        mt: 8,
        mb: 4,
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Typography variant="h5" component="h2" gutterBottom fontWeight={800}>
        How to Use the {toolName} Online Utility
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        paragraph
        sx={{ mt: 2, lineHeight: 1.7 }}
      >
        Welcome to <strong>{toolName}</strong>, a premium client-side utility
        designed to help you <strong>{toolDescription}</strong> easily and
        securely. Operating fully inside your browser session, it processes all
        inputs instantaneously. By avoiding external server uploads, this tool
        ensures your data remains completely private and protected against leaks
        or third-party collection.
      </Typography>

      <Typography
        variant="h6"
        component="h3"
        sx={{ mt: 4, mb: 2, fontWeight: 700 }}
      >
        Key Features of Our {toolName}
      </Typography>

      <List sx={{ pl: 0 }}>
        <ListItem disableGutters alignItems="flex-start" sx={{ py: 0.5 }}>
          <ListItemText
            primary="1. Ultimate Data Privacy"
            secondary="All files, configurations, and data processing are done client-side. No data is stored, cached, or processed on our backend servers."
            primaryTypographyProps={{ fontWeight: 600, variant: 'body2' }}
            secondaryTypographyProps={{ color: 'text.secondary' }}
          />
        </ListItem>
        <ListItem disableGutters alignItems="flex-start" sx={{ py: 0.5 }}>
          <ListItemText
            primary="2. Lightning Fast Execution"
            secondary="Without server latency, conversions and calculations happen in milliseconds directly inside your browser runtime."
            primaryTypographyProps={{ fontWeight: 600, variant: 'body2' }}
            secondaryTypographyProps={{ color: 'text.secondary' }}
          />
        </ListItem>
        <ListItem disableGutters alignItems="flex-start" sx={{ py: 0.5 }}>
          <ListItemText
            primary="3. Completely Free & Responsive"
            secondary="No subscription fees, no signups, and no limits. Fully responsive design works flawlessly across mobile phones, tablets, and computers."
            primaryTypographyProps={{ fontWeight: 600, variant: 'body2' }}
            secondaryTypographyProps={{ color: 'text.secondary' }}
          />
        </ListItem>
      </List>

      <Typography
        variant="h6"
        component="h3"
        sx={{ mt: 4, mb: 2, fontWeight: 700 }}
      >
        Frequently Asked Questions (FAQ)
      </Typography>

      <Box sx={{ mt: 2 }}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            elevation={0}
            square
            sx={{
              borderBottom: index < faqs.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              '&:before': { display: 'none' },
              backgroundColor: 'transparent'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ px: 0, '&.Mui-expanded': { minHeight: 48 } }}
            >
              <Typography fontWeight={600} variant="body2">
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pb: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
