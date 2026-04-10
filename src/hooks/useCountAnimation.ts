import { useEffect, useRef, useState } from 'react';

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface CountAnimationOptions {
  target: number;
  duration?: number;
  delay?: number;
  disabled?: boolean;
}

export function useCountAnimation({ target, duration = 2000, delay = 500, disabled = false }: CountAnimationOptions): number {
  const [count, setCount] = useState(disabled ? target : 0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (disabled) {
      setCount(target);
      return;
    }

    const timeout = setTimeout(() => {
      startRef.current = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        setCount(Math.round(easedProgress * target));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay, disabled]);

  return count;
}
