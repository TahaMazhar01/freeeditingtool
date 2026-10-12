import React, { ReactNode } from 'react';
import Grid from '@mui/material/Grid';

export default function ToolInputAndResult({
  input,
  result
}: {
  input?: ReactNode;
  result?: ReactNode;
}) {
  if (input || result) {
    return (
      <Grid container spacing={2}>
        {input && (
          <Grid item xs={12} md={result ? 6 : 12} sx={{ minWidth: 0 }}>
            {input}
          </Grid>
        )}
        {result && (
          <Grid item xs={12} md={input ? 6 : 12} sx={{ minWidth: 0 }}>
            {result}
          </Grid>
        )}
      </Grid>
    );
  }
}
