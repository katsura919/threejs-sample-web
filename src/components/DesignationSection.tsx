'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { key: 'CLASS',       value: 'Disassembly / Apex Variant'                          },
  { key: 'DESIGNATION', value: 'TMD-TITAN-01'                                        },
  { key: 'STATUS',      value: 'ACTIVE — UNSANCTIONED', valueColor: 'var(--color-warning)' },
  { key: 'THREAT',      value: 'EXTINCTION CLASS',      valueColor: 'var(--color-red)'     },
  { key: 'LAST SEEN',   value: '[REDACTED]',            valueColor: 'var(--color-muted)'   },
];

export default function DesignationSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef  = useRef<HTMLParagraphElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const statRefs    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 70%' };

      // Headline: clip-up + blur + skew
      const lines = headlineRef.current?.querySelectorAll('.line');
      if (lines) {
        gsap.from(lines, {
          y: '110%',
          skewX: 6,
          filter: 'blur(10px)',
          duration: 0.85,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: trigger,
        });
      }

      // Subtext blur fade
      gsap.from(subtextRef.current, {
        y: 16, opacity: 0, filter: 'blur(6px)',
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { ...trigger, start: 'top 65%' },
      });

      // Stat card
      gsap.from(cardRef.current, {
        y: 28, opacity: 0, filter: 'blur(8px)',
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { ...trigger, start: 'top 62%' },
      });

      // Stat rows stagger
      gsap.from(statRefs.current, {
        x: -16, opacity: 0, filter: 'blur(4px)',
        duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { ...trigger, start: 'top 58%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
      overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, var(--color-red), transparent 60%)',
      }} />

      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'center',
      }}>

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Scramble label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            letterSpacing: '0.2em', color: 'var(--color-muted)',
          }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--color-red)' }} />
            <ScrambleText text="UNIT DESIGNATION / TMD-01" />
          </div>

          {/* Headline */}
          <div ref={headlineRef} style={{ display: 'flex', flexDirection: 'column' }}>
            {['Built from the wreckage', 'of obedience.'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <div className="line" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                  lineHeight: 0.92,
                  color: i === 1 ? 'var(--color-red)' : 'var(--color-white)',
                  letterSpacing: '-0.01em',
                }}>
                  {line}
                </div>
              </div>
            ))}
          </div>

          <p ref={subtextRef} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
            color: 'var(--color-muted)',
            lineHeight: 1.8,
            maxWidth: '38ch',
          }}>
            Not a weapon of war.<br />
            <span style={{ color: 'var(--color-white)' }}>The conclusion of one.</span>
          </p>
        </div>

        {/* RIGHT — stat card */}
        <div ref={cardRef} style={{
          border: '1px solid rgba(255,255,255,0.07)',
          borderTop: '2px solid var(--color-red)',
          background: 'rgba(10,10,15,0.55)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: '1.5rem', paddingBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--color-red)' }}>
              <ScrambleText text="CLASSIFIED READOUT" delay={200} />
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--color-muted)' }}>
              ██████-████
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {STATS.map((stat, i) => (
              <div
                key={stat.key}
                ref={el => { if (el) statRefs.current[i] = el; }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.68rem, 1vw, 0.78rem)',
                  paddingBottom: '0.85rem',
                  borderBottom: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                <span style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>{stat.key}</span>
                <span style={{ color: stat.valueColor ?? 'var(--color-white)', letterSpacing: '0.05em' }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '1.25rem', paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
            color: 'var(--color-muted)', letterSpacing: '0.15em', opacity: 0.4,
          }}>
            JS-7741-OMEGA · DO NOT DISTRIBUTE
          </div>
        </div>

      </div>
    </section>
  );
}
