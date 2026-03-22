'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const COMBAT_LOG = [
  {
    index:    '001',
    location: 'INDUSTRIAL 7 — SIDE 4',
    outcome:  'NEUTRALIZED',
    detail:   'First contact. Unit deployed under duress. NT-D unconfirmed. FA configuration not yet installed.',
    status:   'CLOSED',
    statusColor: 'var(--color-muted)',
  },
  {
    index:    '002',
    location: 'PALAU ASTEROID BASE',
    outcome:  'DECISIVE',
    detail:   'Full Armor configuration deployed. Two hyper bazookas active. Psycho-frame output exceeded projections.',
    status:   'CLOSED',
    statusColor: 'var(--color-muted)',
  },
  {
    index:    '003',
    location: 'TORRINGTON BASE — EARTH',
    outcome:  'SUSTAINED',
    detail:   'Atmospheric engagement. Beam Gatling units expended and ejected. I-field shields absorbed heavy ordinance.',
    status:   'CLOSED',
    statusColor: 'var(--color-muted)',
  },
  {
    index:    '004',
    location: 'RIDDHE INTERCEPTION — DEBRIS BELT',
    outcome:  'INCONCLUSIVE',
    detail:   'Confrontation with RX-0[N2] Banshee Norn. Green resonance first confirmed. NT-D override attempted — resisted.',
    status:   'ANOMALY',
    statusColor: 'var(--color-warning)',
  },
  {
    index:    '005',
    location: 'LAPLACE DEBRIS BELT',
    outcome:  'TRANSCENDENT',
    detail:   'Full psycho-frame resonance. All armament ejected. Unit entered state with no prior documentation.',
    status:   'SEALED',
    statusColor: 'var(--color-red)',
  },
];

export default function CombatLogSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const rowRefs     = useRef<HTMLDivElement[]>([]);
  const lineRefs    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 70%' };

      // Headline clip-up
      const lines = headlineRef.current?.querySelectorAll('.line');
      if (lines) {
        gsap.from(lines, {
          y: '110%', skewX: 6, filter: 'blur(10px)',
          duration: 0.85, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: trigger,
        });
      }

      // Divider lines draw across
      gsap.from(lineRefs.current, {
        scaleX: 0, transformOrigin: 'left center',
        duration: 0.6, stagger: 0.12, ease: 'power2.inOut',
        scrollTrigger: { ...trigger, start: 'top 60%' },
      });

      // Log rows stagger up
      gsap.from(rowRefs.current, {
        y: 24, opacity: 0, filter: 'blur(6px)',
        duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { ...trigger, start: 'top 60%' },
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
      overflow: 'hidden',
    }}>

      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, var(--color-red), transparent 60%)',
      }} />

      {/* Section label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
        letterSpacing: '0.2em', color: 'var(--color-muted)',
        marginBottom: '2.5rem',
      }}>
        <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--color-red)' }} />
        <ScrambleText text="COMBAT LOG / CLASSIFIED — 5 ENTRIES" />
      </div>

      {/* Headline */}
      <div ref={headlineRef} style={{ marginBottom: 'clamp(3rem, 5vw, 5rem)' }}>
        {['Every engagement.', 'Documented.'].map((line, i) => (
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

      {/* Log entries */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {COMBAT_LOG.map((entry, i) => (
          <div key={entry.index}>
            <div
              ref={el => { if (el) rowRefs.current[i] = el; }}
              style={{
                display: 'grid',
                gridTemplateColumns: '3.5rem 1fr auto',
                gap: 'clamp(1rem, 2vw, 2.5rem)',
                alignItems: 'start',
                padding: 'clamp(1.25rem, 2.5vw, 2rem) 0',
              }}
            >
              {/* Index */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--color-red)',
                letterSpacing: '0.15em',
                paddingTop: '0.2rem',
              }}>
                {entry.index}
              </span>

              {/* Main content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                  letterSpacing: '0.14em',
                  color: 'var(--color-white)',
                }}>
                  <ScrambleText text={entry.location} delay={i * 80} />
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.8rem, 1.1vw, 0.88rem)',
                  color: 'var(--color-muted)',
                  lineHeight: 1.7,
                  maxWidth: '60ch',
                }}>
                  {entry.detail}
                </p>
              </div>

              {/* Status / outcome */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem', paddingTop: '0.1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  color: 'var(--color-white)',
                }}>
                  {entry.outcome}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.14em',
                  color: entry.statusColor,
                }}>
                  {entry.status}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div
              ref={el => { if (el) lineRefs.current[i] = el; }}
              style={{
                height: 1,
                background: i === COMBAT_LOG.length - 1
                  ? 'linear-gradient(to right, var(--color-red), transparent)'
                  : 'rgba(255,255,255,0.06)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom rule */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
      }} />
    </section>
  );
}
