import { Box, Button, Stack, Typography } from '@mui/material';
import FocusTrap from '@mui/material/Unstable_TrapFocus';
import { Icon } from '@iconify/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

export default function ToolWorkspace({
  title,
  children,
  startExpanded = false
}: {
  title: string;
  children: ReactNode;
  startExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(startExpanded);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => setExpanded(startExpanded), [startExpanded]);
  useEffect(() => {
    if (!expanded) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = (event: KeyboardEvent) => {
      // A nested PDF preview dialog handles its own Escape key.
      if (
        event.key === 'Escape' &&
        document.querySelectorAll('[role="dialog"]').length <= 1
      ) {
        setExpanded(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', close);
    };
  }, [expanded]);
  return (
    <FocusTrap
      open={expanded}
      isEnabled={() => document.querySelectorAll('[role="dialog"]').length <= 1}
    >
      <Box
        id="tool"
        role={expanded ? 'dialog' : 'region'}
        aria-modal={expanded ? true : undefined}
        aria-label={`${title} workspace`}
        tabIndex={-1}
        sx={{
          minWidth: 0,
          ...(expanded
            ? {
                position: 'fixed',
                inset: 0,
                zIndex: 10001,
                overflow: 'auto',
                background: '#FAFAF8',
                px: { xs: 2, md: 4 },
                pb: 4,
                '--tool-panel-height': 'max(320px, 55vh)'
              }
            : {})
        }}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          gap={1.5}
          sx={{
            py: 1.5,
            mb: 1,
            position: 'sticky',
            top: expanded ? 0 : 102,
            zIndex: 2,
            background: '#FAFAF8',
            ...(expanded
              ? {
                  borderBottom: '1px solid #E4DFD2'
                }
              : {})
          }}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#28376D' }}>
            {title} workspace
          </Typography>
          <Button
            ref={toggle}
            size="small"
            variant="outlined"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            startIcon={
              <Icon
                icon={expanded ? 'ph:arrows-in-bold' : 'ph:arrows-out-bold'}
              />
            }
          >
            {expanded ? 'Exit full screen' : 'Expand workspace'}
          </Button>
        </Stack>
        {children}
      </Box>
    </FocusTrap>
  );
}
