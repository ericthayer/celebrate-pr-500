import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  symbol: string;
  opacity: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

const CODE_SYMBOLS = [
  '{}', '()', '[]', '//', '=>', '&&', '||', '++',
  '--', '!==', '===', '<<', '>>', 'git', 'PR', '∆',
  '</', '/>', '**', '%%', '##', '~~',
];

const COLORS = [
  'rgba(0,212,255,',
  'rgba(0,230,118,',
  'rgba(255,107,53,',
  'rgba(255,215,0,',
];

function createParticle(canvas: HTMLCanvasElement): Particle {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 200,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(Math.random() * 0.6 + 0.2),
    symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
    opacity: Math.random() * 0.25 + 0.05,
    size: Math.random() * 10 + 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
  };
}

interface ParticleFieldProps {
  paused?: boolean;
}

export default function ParticleField({ paused = false }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(paused);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = reducedMotion ? 0 : 40;
    particlesRef.current = Array.from({ length: COUNT }, () => {
      const p = createParticle(canvas);
      p.y = Math.random() * canvas.height;
      return p;
    });

    const draw = () => {
      if (!pausedRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((p) => {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.font = `${p.size}px "Roboto Mono", monospace`;
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fillText(p.symbol, 0, 0);
          ctx.restore();

          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotationSpeed;

          if (p.y < -50) {
            const fresh = createParticle(canvas);
            Object.assign(p, fresh);
          }
        });
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      aria-hidden="true"
      sx={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
