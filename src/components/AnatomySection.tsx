'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const CALLOUTS = [
  {
    id:    'BEAM MAGNUM',
    index: '01',
    body:  'One shot equals four standard beam rifles.\nFive rounds per E-pac. Reloads from rear skirt armor.',
  },
  {
    id:    'I-FIELD SHIELDS',
    index: '02',
    body:  'Three four-petal shields. Near 360° of I-field coverage.\nDeflects mega-particle beams. Guided by psycho-frame.',
  },
  {
    id:    'BEAM GATLING GUN',
    index: '03',
    body:  'Six total — paired on each shield underside.\nOriginally Neo Zeon armament. Adapted via Anaheim standard.',
  },
  {
    id:    'NT-D SYSTEM',
    index: '04',
    body:  'Newtype-Destroyer protocol. Hijacks enemy psycommu weapons.\nPsycho-frame resonates green at full Newtype output.',
  },
];

export default function AnatomySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<HTMLDivElement[]>([]);
  const lineRefs    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const baseTrigger = { trigger: sectionRef.current, start: 'top 70%' };

      // Headline: clip-up + blur + skew
      const lines = headlineRef.current?.querySelectorAll('.line');
      if (lines) {
        gsap.from(lines, {
          y: '110%', skewX: 6, filter: 'blur(10px)',
          duration: 0.85, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: baseTrigger,
        });
      }

      // Accent lines draw across
      gsap.from(lineRefs.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.5, stagger: 0.12, ease: 'power2.inOut',
        scrollTrigger: { ...baseTrigger, start: 'top 60%' },
      });

      // Cards stagger in with blur
      gsap.from(cardRefs.current, {
        y: 36, opacity: 0, filter: 'blur(8px)',
        duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { ...baseTrigger, start: 'top 60%' },
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
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
    }}>

      {/* Top rule */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, var(--color-red), transparent 60%)',
      }} />

      {/* Section label */}
      <div ref={labelRef} style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
        letterSpacing: '0.2em', color: 'var(--color-muted)',
        marginBottom: '2rem',
      }}>
        <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--color-red)' }} />
        <ScrambleText text="UNIT ANATOMY / WEAPONS ARRAY" />
      </div>

      {/* Headline */}
      <div ref={headlineRef} style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        {['Armed for every', 'scenario.'].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <div className="line" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6.5vw, 6rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              color: i === 1 ? 'var(--color-red)' : 'var(--color-white)',
            }}>
              {line}
            </div>
          </div>
        ))}
      </div>

      {/* Callout grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(1px, 0.1vw, 2px)',
      }}>
        {CALLOUTS.map((c, i) => (
          <div
            key={c.id}
            ref={el => { if (el) cardRefs.current[i] = el; }}
            style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(10,10,15,0.45)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* Top row: index + accent line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-red)',
                letterSpacing: '0.15em',
                flexShrink: 0,
              }}>
                {c.index}
              </span>
              <div
                ref={el => { if (el) lineRefs.current[i] = el; }}
                style={{
                  flex: 1,
                  height: 1,
                  background: 'linear-gradient(to right, var(--color-red), rgba(193,18,31,0.2))',
                }}
              />
            </div>

            {/* Label */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)',
              letterSpacing: '0.18em',
              color: 'var(--color-white)',
            }}>
              <ScrambleText text={c.id} delay={i * 120} />
            </div>

            {/* Body */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)',
              color: 'var(--color-muted)',
              lineHeight: 1.75,
              whiteSpace: 'pre-line',
            }}>
              {c.body}
            </p>

            {/* Pulse dot */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--color-red)',
                boxShadow: '0 0 8px var(--color-red)',
                animation: `pulse ${1.5 + i * 0.3}s ease-in-out infinite`,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'var(--color-muted)',
                opacity: 0.6,
              }}>
                MONITORING
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--color-red); }
          50%       { opacity: 0.25; box-shadow: none; }
        }
      `}</style>
    </section>
  );
}
