import { Box, Button, Collapse, Stack } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import React, { ReactNode, useId, useState } from 'react';
import { FormikProps, FormikValues, useFormikContext } from 'formik';
import ToolOptionGroups, { ToolOptionGroup } from './ToolOptionGroups';
import { useTranslation } from 'react-i18next';

export type UpdateField<T> = <Y extends keyof T>(field: Y, value: T[Y]) => void;
type NonEmptyArray<T> = [T, ...T[]];
export type GetGroupsType<T> = (
  formikProps: FormikProps<T> & { updateField: UpdateField<T> }
) => NonEmptyArray<ToolOptionGroup>;

export default function ToolOptions<T extends FormikValues>({
  children,
  getGroups,
  vertical,
  compact = false
}: {
  children?: ReactNode;
  getGroups: GetGroupsType<T> | null;
  vertical?: boolean;
  compact?: boolean;
}) {
  const { t } = useTranslation();
  const formikContext = useFormikContext<T>();
  const [open, setOpen] = useState(true);
  const controlsId = useId();

  // Early return if no groups to display
  if (!getGroups) {
    return null;
  }

  const updateField: UpdateField<T> = (field, value) => {
    formikContext.setFieldValue(field as string, value);
  };

  return (
    <Box
      sx={{
        mb: 2,
        borderRadius: 3,
        padding: compact ? 2 : { xs: 2, md: 3 },
        backgroundColor: '#FFFFFF',
        border: '1px solid #E4DFD2',
        borderTop: '4px solid #E6BC54'
      }}
      mt={compact ? 0 : 2}
    >
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <SettingsIcon sx={{ color: '#4056A1', fontSize: compact ? 19 : 24 }} />
        <Typography
          component="h2"
          fontSize={compact ? 16 : 22}
          fontWeight={700}
          color="#28376D"
          sx={{ flex: 1 }}
        >
          {t('toolOptions.title')}
        </Typography>
        {compact && (
          <Button
            size="small"
            aria-expanded={open}
            aria-controls={controlsId}
            onClick={() => setOpen(!open)}
          >
            {open ? 'Hide settings' : 'Show settings'}
          </Button>
        )}
      </Stack>
      <Collapse in={!compact || open} id={controlsId}>
        <Box mt={2}>
          <Stack direction={'row'} spacing={2}>
            <ToolOptionGroups
              groups={getGroups({ ...formikContext, updateField }) ?? null}
              vertical={vertical}
            />
            {children}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}
