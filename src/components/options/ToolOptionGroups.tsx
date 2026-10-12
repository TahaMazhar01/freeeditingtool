import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';
import Grid from '@mui/material/Grid';

export interface ToolOptionGroup {
  title: string;
  component: ReactNode;
}

export default function ToolOptionGroups({
  groups,
  vertical
}: {
  groups: ToolOptionGroup[];
  vertical?: boolean;
}) {
  return (
    <Grid container spacing={2}>
      {groups.map((group) => (
        <Grid
          item
          xs={12}
          md={
            vertical || groups.length === 1 ? 12 : groups.length === 2 ? 6 : 4
          }
          key={group.title}
          sx={{ minWidth: 0 }}
        >
          {group.title && (
            <Typography
              component="h3"
              mb={1.5}
              fontSize={16}
              fontWeight={600}
              color="#4056A1"
            >
              {group.title}
            </Typography>
          )}
          {group.component}
        </Grid>
      ))}
    </Grid>
  );
}
