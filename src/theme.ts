import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4ff',
      light: '#4ddfff',
      dark: '#0097b2',
      contrastText: '#050b14',
    },
    secondary: {
      main: '#ff6b35',
      light: '#ff9462',
      dark: '#cc4400',
      contrastText: '#fff',
    },
    success: {
      main: '#00e676',
      light: '#69ff9c',
      dark: '#00b248',
    },
    warning: {
      main: '#ffd700',
      light: '#ffe44d',
      dark: '#c7a700',
    },
    background: {
      default: '#050b14',
      paper: '#0d1a2b',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#7fa7c9',
    },
    divider: 'rgba(0, 212, 255, 0.12)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' as const },
    body1: { fontWeight: 400, lineHeight: 1.7 },
    button: { fontWeight: 700, letterSpacing: '0.08em' },
    caption: { fontFamily: '"Roboto Mono", monospace', letterSpacing: '0.04em' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        html: {
          colorScheme: 'dark',
          scrollBehavior: 'smooth',
        },
        body: {
          overflowX: 'hidden',
          background: '#050b14',
        },
        '@keyframes pulse-glow': {
          '0%, 100%': { textShadow: '0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.3), 0 0 120px rgba(0,212,255,0.15)' },
          '50%': { textShadow: '0 0 60px rgba(0,212,255,0.9), 0 0 120px rgba(0,212,255,0.5), 0 0 200px rgba(0,212,255,0.2)' },
        },
        '@keyframes float-up': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh) rotate(20deg)', opacity: 0 },
        },
        '@keyframes spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        '@keyframes confetti-fall': {
          '0%': { transform: 'translateY(-10px) rotateZ(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotateZ(720deg)', opacity: 0 },
        },
        '@keyframes draw-line': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
        '@keyframes branch-appear': {
          from: { opacity: 0, transform: 'scale(0.8)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        '@keyframes count-up': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes slide-up': {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        '@keyframes blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 700,
          letterSpacing: '0.06em',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, letterSpacing: '0.04em' },
      },
    },
  },
});

export default theme;
