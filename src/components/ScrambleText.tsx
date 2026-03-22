'use client';

import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789█▓▒░!@#';

interface Props {
  text: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function ScrambleText({ text, style, delay = 0 }: Props) {
  const ref    = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      let frame = 0;
      const total = 40;

      const tick = () => {
        frame++;
        el.textContent = text
          .split('')
          .map((char, i) => {
            if (char === ' ' || char === '/' || char === '—') return char;
            if (frame / total > i / text.length) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        if (frame < total) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          el.textContent = text;
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      setTimeout(run, delay);
    }, { threshold: 0.1 });

    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, delay]);

  return <span ref={ref} style={style}>{text}</span>;
}
