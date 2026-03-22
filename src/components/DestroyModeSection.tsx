'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const NTD_SPECS = [
  { key: 'TRIGGER',       value: 'NEWTYPE RESONANCE DETECTED'                              },
  { key: 'PSYCHOFRAME',   value: 'FULL LUMINESCENCE — GREEN', valueColor: 'var(--color-warning)' },
  { key: 'PSYCOMMU',      value: 'ENEMY OVERRIDE — ACTIVE',   valueColor: 'var(--color-red)'     },
  { key: 'SHIELD REMOTE', value: 'ACTIVE — NO THRUSTERS REQ.'                              },
  { key: 'ARMOR STATE',   value: 'SPLIT — FRAME EXPOSED'                                   },
  { key: 'DURATION',      value: '[CLASSIFIED]',              valueColor: 'var(--color-muted)'   },
];

const FEATURES = [
  {
    index: '01',
    label: 'ARMOR SPLIT',
    body: 'White panels separate to reveal the glowing psycho-frame beneath. The transformation is not mechanical — it is responsive.',
  },
  {
    index: '02',
    label: 'PSYCOMMU HIJACK',
    body: 'In Destroy Mode, the NT-D seizes control of enemy remote weapons. Funnels, bits, quasi-psycommu — all become extensions of the pilot.',
  },
  {
    index: '03',
    label: 'GREEN RESONANCE',
    body: "Banagher's Newtype potential pushed the psycho-frame beyond documented parameters. The green luminescence has no prior record.",
  },
  {
    index: '04',
    label: 'ENHANCED OUTPUT',
    body: 'Two Base Jabber Type 94 boosters compensate for the mass of full armament. Mobility is not sacrificed. It is amplified.',
  },
];

export default function DestroyModeSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const specRefs    = useRef<HTMLDivElement[]>([]);
  const featRefs    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 70%' };

      // Green glow scrub
      gsap.to(glowRef.current, {
        opacity: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
      });

      // Headline clip-up
      const lines = headlineRef.current?.querySelectorAll('.line');
      if (lines) {
        gsap.from(lines, {
          y: '110%', skewX: 6, filter: 'blur(10px)',
          duration: 0.85, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: trigger,
        });
      }

      // Spec card
      gsap.from(cardRef.current, {
        y: 28, opacity: 0, filter: 'blur(8px)',
        duration: 0.7, ease: 'power3.out',
        scrollTrigger: { ...trigger, start: 'top 62%' },
      });

      // Spec rows
      gsap.from(specRefs.current, {
        x: -16, opacity: 0, filter: 'blur(4px)',
        duration: 0.5, stagger: 0.09, ease: 'power2.out',
        scrollTrigger: { ...trigger, start: 'top 58%' },
      });

      // Feature cards
      gsap.from(featRefs.current, {
        y: 32, opacity: 0, filter: 'blur(8px)',
        duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { ...trigger, start: 'top 55%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'rgba(10,10,15,0.6)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
      overflow: 'hidden',
    }}>

      {/* Top rule */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, #00ff88, transparent)',
        opacity: 0.25,
      }} />

      {/* Green psychoframe glow */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, #00ff88 0%, transparent 70%)',
      }} />

      {/* Section label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
        letterSpacing: '0.2em', color: '#00ff88',
        marginBottom: '2.5rem', opacity: 0.8,
      }}>
        <span style={{ display: 'inline-block', width: 20, height: 1, background: '#00ff88' }} />
        <ScrambleText text="NT-D SYSTEM / DESTROY MODE" />
      </div>

      {/* Headline + spec card row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'start',
        marginBottom: 'clamp(3rem, 6vw, 5rem)',
      }}>

        {/* LEFT — headline */}
        <div>
          <div ref={headlineRef} style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.5rem' }}>
            {['The armor breaks.', 'The light remains.'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <div className="line" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.01em',
                  color: i === 1 ? '#00ff88' : 'var(--color-white)',
                }}>
                  {line}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
            color: 'var(--color-muted)',
            lineHeight: 1.8,
            maxWidth: '38ch',
          }}>
            When the NT-D activates, the Unicorn sheds its white shell.<br />
            <span style={{ color: 'var(--color-white)' }}>
              What is underneath is not a weapon. It is a will.
            </span>
          </p>
        </div>

        {/* RIGHT — spec card */}
        <div ref={cardRef} style={{
          border: '1px solid rgba(0,255,136,0.12)',
          borderTop: '2px solid #00ff88',
          background: 'rgba(0,10,8,0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: '1.5rem', paddingBottom: '1rem',
            borderBottom: '1px solid rgba(0,255,136,0.1)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.22em', color: '#00ff88' }}>
              <ScrambleText text="NT-D READOUT / ACTIVE" delay={200} />
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--color-muted)' }}>
              ██-████-D
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {NTD_SPECS.map((spec, i) => (
              <div
                key={spec.key}
                ref={el => { if (el) specRefs.current[i] = el; }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.68rem, 1vw, 0.78rem)',
                  paddingBottom: '0.85rem',
                  borderBottom: i < NTD_SPECS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                <span style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>{spec.key}</span>
                <span style={{ color: spec.valueColor ?? 'var(--color-white)', letterSpacing: '0.05em' }}>
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'clamp(1px, 0.1vw, 2px)',
      }}>
        {FEATURES.map((f, i) => (
          <div
            key={f.index}
            ref={el => { if (el) featRefs.current[i] = el; }}
            style={{
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              border: '1px solid rgba(0,255,136,0.07)',
              background: 'rgba(0,10,8,0.35)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex', flexDirection: 'column', gap: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#00ff88', letterSpacing: '0.15em', flexShrink: 0 }}>
                {f.index}
              </span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, #00ff88, rgba(0,255,136,0.1))', opacity: 0.4 }} />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)', letterSpacing: '0.18em', color: 'var(--color-white)' }}>
              <ScrambleText text={f.label} delay={i * 100} />
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)', color: 'var(--color-muted)', lineHeight: 1.75 }}>
              {f.body}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom rule */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(0,255,136,0.15), transparent)',
      }} />
    </section>
  );
}
