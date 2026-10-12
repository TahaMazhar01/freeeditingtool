import { Box, ButtonBase, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { UserType } from '@tools/defineTool';
import { useTranslation } from 'react-i18next';
interface UserTypeFilterProps {
  selectedUserTypes: UserType[];
  userTypes?: UserType[];
  onUserTypesChange: (userTypes: UserType[]) => void;
}
export default function UserTypeFilter({
  selectedUserTypes,
  onUserTypesChange,
  userTypes = ['generalUsers', 'developers']
}: UserTypeFilterProps) {
  const { t } = useTranslation('translation');
  if (userTypes.length <= 1) return null;
  const choices: {
    key: 'all' | 'everyday' | 'code';
    types: UserType[];
    icon: string;
    description: 'allDescription' | 'everydayDescription' | 'codeDescription';
  }[] = [
    {
      key: 'all',
      types: [],
      icon: 'ph:squares-four-bold',
      description: 'allDescription'
    },
    {
      key: 'everyday',
      types: ['generalUsers'],
      icon: 'ph:paint-brush-bold',
      description: 'everydayDescription'
    },
    {
      key: 'code',
      types: ['developers'],
      icon: 'ph:code-bold',
      description: 'codeDescription'
    }
  ];
  const active = selectedUserTypes.length === 1 ? selectedUserTypes[0] : null;
  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Typography
        component="h2"
        sx={{ fontSize: 24, fontWeight: 700, color: '#28376D', mb: 0.5 }}
      >
        {t('workspace.title')}
      </Typography>
      <Typography sx={{ color: '#66708C', fontSize: 14, mb: 2 }}>
        {t('workspace.description')}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(3, minmax(0, 1fr))'
          },
          gap: 1.5
        }}
      >
        {choices.map((choice) => {
          const selected = choice.types.length
            ? active === choice.types[0]
            : active === null;
          return (
            <ButtonBase
              key={choice.key}
              aria-pressed={selected}
              onClick={() => onUserTypesChange(choice.types)}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                gap: 1.5,
                p: 2,
                borderRadius: '16px',
                border: selected ? '2px solid #4056A1' : '2px solid #E4DFD2',
                background: selected ? '#EDF0FA' : '#FFFFFF',
                color: '#28376D',
                minWidth: 0,
                alignItems: 'flex-start',
                '&.Mui-focusVisible': {
                  outline: '3px solid #D79922',
                  outlineOffset: 3
                }
              }}
            >
              <Icon
                icon={choice.icon}
                fontSize={24}
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                  {t(`workspace.${choice.key}`)}
                </Typography>
                <Typography sx={{ fontSize: 12, color: '#66708C', mt: 0.5 }}>
                  {t(`workspace.${choice.description}`)}
                </Typography>
              </Box>
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}
