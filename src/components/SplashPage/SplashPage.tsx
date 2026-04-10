import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import MergeIcon from '@mui/icons-material/MergeType';
import PauseIcon from '@mui/icons-material/PauseCircleOutline';
import PlayIcon from '@mui/icons-material/PlayCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GitHubIcon from '@mui/icons-material/GitHub';
import CelebrationIcon from '@mui/icons-material/Celebration';
import GroupIcon from '@mui/icons-material/Group';
import ParticleField from '../ParticleField/ParticleField';
import HeroNumber from '../HeroNumber/HeroNumber';
import GitBranchViz from '../GitBranchViz/GitBranchViz';
import ConfettiEffect from '../ConfettiEffect/ConfettiEffect';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const STATS = [
  { icon: <GroupIcon fontSize="small" />, label: 'Contributors', value: '39' },
  { icon: <CodeIcon fontSize="small" />, label: 'Code Reviews', value: '764' },
  { icon: <MergeIcon fontSize="small" />, label: 'Commits Merged', value: '382' },
  { icon: <RocketLaunchIcon fontSize="small" />, label: 'Releases', value: '240' },
];  

const CODE_SNIPPETS = [
  { text: 'git merge --ff-only feat/pr-500', top: '12%', left: '3%', delay: '0.5s', duration: '18s' },
  { text: '$ npm run build ✓', top: '65%', right: '3%', delay: '0.8s', duration: '19s' },
  { text: '✓ All checks passed', top: '35%', left: '2%', delay: '2s', duration: '20s' },
  { text: 'git push -u origin feat/cb-toolbar', top: '20%', right: '4%', delay: '1.2s', duration: '22s' },
  { text: 'Approved by 2 codeowners', top: '75%', left: '1%', delay: '1.5s', duration: '24s' },
  { text: '$ npm run chromatic', top: '82%', right: '35%', delay: '0.3s', duration: '21s' },
];

export default function SplashPage() {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const handlePauseToggle = useCallback(() => setPaused((p) => !p), []);

  return (
    <Box
      component="main"
      sx={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 30% 70%, rgba(0,230,118,0.04) 0%, transparent 50%),
          #050b14
        `,
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <ParticleField paused={paused} />
      <ConfettiEffect />

      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse 70% 70% at center, black 30%, transparent 80%)',
        }}
      />

      <Box
        component="a"
        href="https://design.cobank.net"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="CoBank Design System"
        sx={{
          position: 'fixed',
          top: 12,
          left: 16,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 0.75,
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.08)',
          bgcolor: 'rgba(13,26,43,0.7)',
          backdropFilter: 'blur(8px)',
          transition: 'border-color 200ms, background 200ms, box-shadow 200ms',
          '&:hover': {
            borderColor: 'rgba(102,179,96,0.5)',
            bgcolor: 'rgba(13,26,43,0.9)',
            boxShadow: '0 0 16px rgba(102,179,96,0.2)',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        }}
      >
        <Box
          component="img"
          src="/icon-cobank.svg"
          alt="CoBank"
          width={32}
          height={33}
          sx={{ display: 'block' }}
        />
      </Box>

      <Tooltip title={paused ? 'Resume animations' : 'Pause animations'} placement="left">
        <IconButton
          onClick={handlePauseToggle}
          aria-label={paused ? 'Resume animations' : 'Pause animations'}
          size="small"
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            zIndex: 100,
            color: 'text.secondary',
            bgcolor: 'rgba(13,26,43,0.8)',
            border: '1px solid',
            borderColor: 'divider',
            backdropFilter: 'blur(8px)',
            transition: 'color 200ms, border-color 200ms',
            '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
          }}
        >
          {paused ? <PlayIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
        </IconButton>
      </Tooltip>

      {!reducedMotion && CODE_SNIPPETS.map((snippet, i) => (
        <Box
          key={i}
          aria-hidden="true"
          sx={{
            position: 'fixed',
            top: snippet.top,
            left: snippet.left ?? 'auto',
            right: snippet.right ?? 'auto',
            fontFamily: 'monospace',
            fontSize: { xs: '9px', sm: '10px', md: '11px' },
            color: i % 2 === 0 ? 'rgba(0,212,255,0.3)' : 'rgba(0,230,118,0.25)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 1,
            animation: paused ? 'none' : `float-up ${snippet.duration} ${snippet.delay} ease-in-out infinite`,
          }}
        >
          {snippet.text}
        </Box>
      ))}

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          gap: 0,
        }}
      >
        <Chip
          icon={<MergeIcon />}
          label="Team Achievement Unlocked"
          size="small"
          sx={{
            bgcolor: 'rgba(0,212,255,0.1)',
            color: 'primary.main',
            border: '1px solid',
            borderColor: 'rgba(0,212,255,0.3)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            fontSize: '0.7rem',
            mb: 1,
            animation: reducedMotion ? 'none' : 'slide-up 0.6s ease forwards',
            opacity: reducedMotion ? 1 : 0,
            '& .MuiChip-icon': { color: 'primary.main' },
          }}
        />

        <HeroNumber paused={paused} />

        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '1.6rem', sm: '2.2rem', md: '2.8rem' },
            fontWeight: 800,
            textAlign: 'center',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: `linear-gradient(90deg, ${theme.palette.text.primary} 0%, rgba(255,255,255,0.7) 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mt: -1,
            animation: reducedMotion ? 'none' : 'slide-up 0.6s 0.8s ease forwards',
            opacity: reducedMotion ? 1 : 0,
          }}
        >
          Pull Requests
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            mt: 2,
            mb: 1,
            maxWidth: 540,
            fontSize: { xs: '1rem', sm: '1.125rem' },
            animation: reducedMotion ? 'none' : 'slide-up 0.6s 1.0s ease forwards',
            opacity: reducedMotion ? 1 : 0,
          }}
        >
          Five hundred created pull requests — a testament to our team's dedication,
          collaboration, and relentless pursuit of great software
        </Typography>

        <Box
          sx={{
            width: '100%',
            mt: 3,
            mb: 2,
            animation: reducedMotion ? 'none' : 'slide-up 0.6s 1.4s ease forwards',
            opacity: reducedMotion ? 1 : 0,
          }}
        >
          <GitBranchViz />
        </Box>

        <Divider
          sx={{
            width: '100%',
            maxWidth: 480,
            borderColor: 'divider',
            my: 1,
            animation: reducedMotion ? 'none' : 'fade-in 0.6s 1.6s ease forwards',
            opacity: reducedMotion ? 1 : 0,
          }}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: 2,
            width: '100%',
            maxWidth: 560,
            mt: 2,
            animation: reducedMotion ? 'none' : 'slide-up 0.6s 1.8s ease forwards',
            opacity: reducedMotion ? 1 : 0,
          }}
        >
          {STATS.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                p: { xs: 1.5, sm: 2 },
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'rgba(13,26,43,0.6)',
                backdropFilter: 'blur(8px)',
                transition: 'border-color 200ms, background 200ms',
                cursor: 'default',
                '&:hover': {
                  borderColor: 'rgba(0,212,255,0.4)',
                  bgcolor: 'rgba(0,212,255,0.05)',
                },
              }}
            >
              <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
                {stat.icon}
              </Box>
              <Typography
                variant="h5"
                component="span"
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                  fontVariantNumeric: 'tabular-nums',
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  lineHeight: 1.2,
                  fontSize: '0.65rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
            animation: reducedMotion ? 'none' : 'slide-up 0.6s 2.0s ease forwards',
            opacity: reducedMotion ? 1 : 0,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<GitHubIcon />}
            href="https://github.com/cobank-acb/shd-agrikit-ui-lib"
            target="_blank"
            rel="noopener noreferrer"
            component="a"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '0.9rem',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
              color: '#050b14',
              boxShadow: `0 0 24px rgba(0,212,255,0.35)`,
              transition: 'box-shadow 200ms, transform 150ms',
              textDecoration: 'none',
              '&:hover': {
                boxShadow: `0 0 40px rgba(0,212,255,0.55)`,
                transform: 'translateY(-2px)',
                background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.success.light})`,
              },
              '&:active': { transform: 'translateY(0)' },
            }}
          >
            View Repo
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<CelebrationIcon />}
            href="https://teams.microsoft.com/l/chat/19:0a106740780744bebdd05ab1aff16578@thread.v2/conversations?context=%7B%22contextType%22%3A%22chat%22%7D"
            target="_blank"
            rel="noopener noreferrer"
            component="a"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '0.9rem',
              borderColor: 'rgba(0,212,255,0.4)',
              color: 'primary.main',
              transition: 'border-color 200ms, box-shadow 200ms, transform 150ms',
              textDecoration: 'none',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: `0 0 20px rgba(0,212,255,0.2)`,
                transform: 'translateY(-2px)',
                bgcolor: 'rgba(0,212,255,0.05)',
              },
              '&:active': { transform: 'translateY(0)' },
            }}
          >
            Celebrate Team
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{
            mt: 4,
            color: 'text.secondary',
            opacity: 0.5,
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            animation: reducedMotion ? 'none' : 'fade-in 1s 2.5s ease forwards',
          }}
        >
          {'// keep shipping '}
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '1ch',
              borderRight: `2px solid ${theme.palette.primary.main}`,
              animation: reducedMotion ? 'none' : 'blink 1s step-end infinite',
              ml: 0.5,
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
}
