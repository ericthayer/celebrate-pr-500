import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useCountAnimation } from '../../hooks/useCountAnimation';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface HeroNumberProps {
  paused?: boolean;
}

export default function HeroNumber({ paused = false }: HeroNumberProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const count = useCountAnimation({
    target: 500,
    duration: 2200,
    delay: 600,
    disabled: reducedMotion || paused,
  });

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        my: { xs: 2, md: 3 },
        overflow: 'visible',
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: { xs: 260, sm: 360, md: 480 },
          height: { xs: 260, sm: 360, md: 480 },
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)`,
          animation: reducedMotion ? 'none' : 'pulse-glow 3s ease-in-out infinite',
          filter: 'blur(20px)',
        }}
      />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: { xs: 200, sm: 280, md: 380 },
          height: { xs: 200, sm: 280, md: 380 },
          borderRadius: '50%',
          border: `1px solid rgba(0,212,255,0.12)`,
          animation: reducedMotion ? 'none' : 'spin-slow 20s linear infinite',
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          width: { xs: 230, sm: 320, md: 430 },
          height: { xs: 230, sm: 320, md: 430 },
          borderRadius: '50%',
          border: `1px dashed rgba(0,212,255,0.08)`,
          animation: reducedMotion ? 'none' : 'spin-slow 30s linear infinite reverse',
        }}
      />

      <Typography
        component="div"
        aria-label="500"
        sx={{
          fontSize: { xs: '9rem', sm: '14rem', md: '18rem', lg: '22rem' },
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: '-0.04em',
          fontVariantNumeric: 'tabular-nums',
          background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 40%, ${theme.palette.success.main} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none',
          filter: `drop-shadow(0 0 30px rgba(0,212,255,0.4))`,
          animation: reducedMotion ? 'none' : 'pulse-glow 3s ease-in-out infinite',
          position: 'relative',
          zIndex: 1,
          userSelect: 'none',
          px: 1,
          overflow: 'visible',
        }}
      >
        {count}
      </Typography>
    </Box>
  );
}
