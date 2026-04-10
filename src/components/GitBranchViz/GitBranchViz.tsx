import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function GitBranchViz() {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const cyan = theme.palette.primary.main;
  const green = theme.palette.success.main;
  const orange = theme.palette.secondary.main;

  const animDelay = (s: number) => reducedMotion ? {} : { animationDelay: `${s}s` };
  const drawAnim = reducedMotion
    ? {}
    : { animation: 'draw-line 1.5s ease-out forwards', strokeDashoffset: 1000 };

  return (
    <Box
      aria-hidden="true"
      sx={{ width: '100%', maxWidth: 480, mx: 'auto', opacity: reducedMotion ? 1 : 0, animation: reducedMotion ? 'none' : 'fade-in 0.5s ease forwards', ...animDelay(2) }}
    >
      <svg
        viewBox="0 0 480 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      >
        <defs>
          <filter id="glow-cyan">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-green">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line
          x1="40" y1="50" x2="440" y2="50"
          stroke={cyan}
          strokeWidth="2"
          strokeDasharray="1000"
          filter="url(#glow-cyan)"
          style={drawAnim}
        />

        <path
          d="M 120 50 C 120 50 140 20 160 20 L 320 20 C 340 20 360 50 360 50"
          stroke={orange}
          strokeWidth="1.5"
          strokeDasharray="1000"
          filter="url(#glow-cyan)"
          style={{ ...drawAnim, ...(reducedMotion ? {} : { animationDelay: '0.3s' }) }}
        />

        <path
          d="M 180 50 C 180 50 195 70 210 70 L 270 70 C 285 70 300 50 300 50"
          stroke={green}
          strokeWidth="1.5"
          strokeDasharray="1000"
          filter="url(#glow-green)"
          style={{ ...drawAnim, ...(reducedMotion ? {} : { animationDelay: '0.6s' }) }}
        />

        {[
          { cx: 40, cy: 50, r: 6, color: cyan, delay: 1.0 },
          { cx: 120, cy: 50, r: 5, color: orange, delay: 1.1 },
          { cx: 160, cy: 20, r: 4, color: orange, delay: 1.2 },
          { cx: 240, cy: 20, r: 4, color: orange, delay: 1.25 },
          { cx: 180, cy: 50, r: 4, color: green, delay: 1.3 },
          { cx: 240, cy: 70, r: 4, color: green, delay: 1.35 },
          { cx: 300, cy: 50, r: 4, color: green, delay: 1.4 },
          { cx: 320, cy: 20, r: 4, color: orange, delay: 1.45 },
          { cx: 360, cy: 50, r: 5, color: orange, delay: 1.5 },
          { cx: 440, cy: 50, r: 8, color: cyan, delay: 1.6 },
        ].map(({ cx, cy, r, color, delay }, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill={color}
            filter={color === cyan ? 'url(#glow-cyan)' : 'url(#glow-green)'}
            style={reducedMotion ? {} : {
              opacity: 0,
              animation: 'branch-appear 0.3s ease forwards',
              animationDelay: `${delay}s`,
            }}
          />
        ))}

        <text x="440" y="38" textAnchor="middle" fill={cyan} fontSize="10" fontFamily="monospace" opacity="0.8"
          style={reducedMotion ? {} : { opacity: 0, animation: 'fade-in 0.5s ease forwards', animationDelay: '1.8s' }}>
          #500
        </text>
        <text x="240" y="14" textAnchor="middle" fill={orange} fontSize="9" fontFamily="monospace" opacity="0.7"
          style={reducedMotion ? {} : { opacity: 0, animation: 'fade-in 0.5s ease forwards', animationDelay: '1.5s' }}>
          feat/milestone
        </text>
        <text x="240" y="84" textAnchor="middle" fill={green} fontSize="9" fontFamily="monospace" opacity="0.7"
          style={reducedMotion ? {} : { opacity: 0, animation: 'fade-in 0.5s ease forwards', animationDelay: '1.6s' }}>
          perf/celebration
        </text>
      </svg>
    </Box>
  );
}
