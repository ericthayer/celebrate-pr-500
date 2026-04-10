import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  size: number;
  delay: string;
  duration: string;
  shape: 'rect' | 'circle' | 'triangle';
  rotate: number;
}

const CONFETTI_COLORS = [
  '#00d4ff', '#00e676', '#ff6b35', '#ffd700',
  '#4ddfff', '#69ff9c', '#ff9462', '#ffe44d',
];

export default function ConfettiEffect() {
  const reducedMotion = useReducedMotion();

  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 8 + 6,
      delay: `${Math.random() * 2}s`,
      duration: `${Math.random() * 2 + 2}s`,
      shape: (['rect', 'circle', 'triangle'] as const)[Math.floor(Math.random() * 3)],
      rotate: Math.random() * 360,
    }));
  }, []);

  if (reducedMotion) return null;

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {pieces.map((piece) => (
        <Box
          key={piece.id}
          sx={{
            position: 'absolute',
            top: '-20px',
            left: piece.left,
            width: piece.size,
            height: piece.shape === 'rect' ? piece.size * 0.6 : piece.size,
            backgroundColor: piece.shape !== 'triangle' ? piece.color : 'transparent',
            borderRadius: piece.shape === 'circle' ? '50%' : piece.shape === 'rect' ? '1px' : 0,
            ...(piece.shape === 'triangle' && {
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${piece.size / 2}px solid transparent`,
              borderRight: `${piece.size / 2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
            }),
            transform: `rotate(${piece.rotate}deg)`,
            animation: `confetti-fall ${piece.duration} ${piece.delay} ease-in forwards`,
            opacity: 1,
          }}
        />
      ))}
    </Box>
  );
}
