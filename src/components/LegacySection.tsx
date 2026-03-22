'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const LINES = [
  { text: 'It was never meant to be a weapon.',   size: 'lg' },
  { text: 'It became a question.',                 size: 'lg' },
  { text: 'Not how powerful can a machine be.\nBut how much can a human endure.', size: 'sm' },
  { text: 'The box was opened.',                   size: 'md' },
  { text: 'What was inside was not a secret.\nIt was a possibility.\nOne the world was not ready to accept.', size: 'sm' },
  { text: 'The world did not end.',                size: 'lg' },
  { text: 'It never does.',                        size: 'lg' },
];

const SIZE_MAP = {
  sm: 'clamp(0.9rem, 1.4vw, 1.1rem)',
  md: 'clamp(1.6rem, 3vw,   2.4rem)',
  lg: 'clamp(2.4rem, 5vw,   4rem)',
};

function WordSplit({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span style={style}>
      {text.split('\n').map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.split(' ').map((word, wi) => (
            <span key={wi} className="word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
              {word}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function LegacySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const paraRefs   = useRef<HTMLDivElement[]>([]);
  const redRef     = useRef<HTMLDivElement>(null);
  const footerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Red bleed scrub
      gsap.to(redRef.current, {
        opacity: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
      });

      // Paragraphs animate in on scroll
      paraRefs.current.forEach((el, i) => {
        const isSm = LINES[i].size === 'sm';

        if (isSm) {
          const words = el.querySelectorAll('.word');
          gsap.from(words, {
            opacity: 0, filter: 'blur(6px)', y: 10,
            duration: 0.5, stagger: 0.04, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        } else {
          gsap.from(el, {
            y: 30, opacity: 0, filter: 'blur(12px)', skewX: 4,
            duration: 0.9, ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        }
      });

      // Footer badge
      gsap.from(footerRef.current, {
        opacity: 0, y: 16, filter: 'blur(6px)',
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'rgba(5,5,10,0.85)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 8vw, 12rem)',
      overflow: 'hidden',
    }}>

      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, var(--color-red), transparent)',
      }} />

      {/* Red radial */}
      <div ref={redRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(ellipse 50% 50% at 50% 80%, var(--color-red) 0%, transparent 70%)',
      }} />

      {/* Section label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        letterSpacing: '0.22em', color: 'var(--color-red)',
        marginBottom: 'clamp(3rem, 6vw, 5rem)',
        alignSelf: 'flex-start',
      }}>
        <span style={{ width: 20, height: 1, background: 'var(--color-red)', display: 'inline-block' }} />
        <ScrambleText text="UNIT LEGACY — FINAL RECORD" />
      </div>

      {/* Lines */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(2rem, 4vw, 3.5rem)',
        width: '100%', maxWidth: '72ch',
        textAlign: 'center',
      }}>
        {LINES.map((p, i) => (
          <div key={i} ref={el => { if (el) paraRefs.current[i] = el; }}>
            <WordSplit
              text={p.text}
              style={{
                fontFamily: p.size === 'sm' ? 'var(--font-body)' : 'var(--font-display)',
                fontSize: SIZE_MAP[p.size],
                lineHeight: p.size === 'sm' ? 1.85 : 1.05,
                color: p.size === 'sm' ? 'var(--color-muted)' : 'var(--color-white)',
                letterSpacing: p.size === 'sm' ? '0.02em' : '-0.01em',
              }}
            />
          </div>
        ))}
      </div>

      {/* Footer badge */}
      <div ref={footerRef} style={{
        marginTop: 'clamp(4rem, 8vw, 7rem)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
      }}>
        <div style={{ width: 1, height: 'clamp(3rem, 6vw, 5rem)', background: 'linear-gradient(to bottom, var(--color-red), transparent)' }} />
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
          letterSpacing: '0.3em', color: 'var(--color-muted)',
          textAlign: 'center', lineHeight: 2, opacity: 0.5,
        }}>
          RX-0[N] FULL ARMOR UNICORN GUNDAM<br />
          MOBILE SUIT GUNDAM UNICORN<br />
          PILOT: BANAGHER LINKS — NT-D CONFIRMED
        </div>
      </div>

    </section>
  );
}
