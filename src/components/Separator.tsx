import { alpha, Divider } from '@mui/material';

type SeparatorProps = {
  backgroundColor?: string;
  margin: string;
};

export default function Separator({ backgroundColor, margin }: SeparatorProps) {
  return (
    <Divider
      orientation="horizontal"
      variant="fullWidth"
      className="my-4"
      sx={(theme) => ({
        background:
          backgroundColor ??
          `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, transparent)`,
        height: '2px',
        border: 'none',
        opacity: backgroundColor ? 1 : 0.85,
        marginTop: margin,
        marginBottom: margin,
        boxShadow: backgroundColor
          ? 'none'
          : `0 0 12px ${alpha(theme.palette.secondary.main, 0.25)}`
      })}
    />
  );
}
