'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { key: 'CLASS        ', value: 'Disassembly / Apex Variant' },
  { key: 'DESIGNATION  ', value: 'TMD-TITAN-01'               },
  { key: 'STATUS       ', value: 'ACTIVE — UNSANCTIONED',  valueColor: 'var(--color-warning)' },
  { key: 'THREAT LEVEL ', value: 'EXTINCTION',              valueColor: 'var(--color-red)'     },
  { key: 'LAST SEEN    ', value: '[REDACTED]',              valueColor: 'var(--color-muted)'   },
  { key: 'ORIGIN       ', value: 'JCJenson (in space)™'    },
];

const BODY_PARAGRAPHS = [
  'The Titan Murder Drone is not a weapon of war.\nIt is the conclusion of one.',
  'Engineered beyond the constraints of the original Disassembly Drone program, the Titan variant operates without directive, without mercy, and without failure.',
  'What walks in its shadow does not walk back.',
];

export default function DesignationSection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLDivElement>(null);
  const bodyRefs      = useRef<HTMLParagraphElement[]>([]);
  const statRefs      = useRef<HTMLDivElement[]>([]);
  const cardRef       = useRef<HTMLDivElement>(null);
  const bigNumRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 75%' };

      // Background number
      gsap.from(bigNumRef.current, {
        opacity: 0, y: 40, duration: 1, ease: 'power3.out',
        scrollTrigger: trigger,
      });

      // Section label
      gsap.from(labelRef.current, {
        x: -24, opacity: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: trigger,
      });

      // Headline lines reveal
      const lines = headlineRef.current?.querySelectorAll('.headline-line');
      if (lines) {
        gsap.from(lines, {
          y: '105%', duration: 0.75, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: trigger,
        });
      }

      // Body paragraphs stagger
      gsap.from(bodyRefs.current, {
        y: 20, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { ...trigger, start: 'top 65%' },
      });

      // Card border draws in
      gsap.from(cardRef.current, {
        opacity: 0, duration: 0.4,
        scrollTrigger: { ...trigger, start: 'top 60%' },
      });

      // Stats appear one by one
      gsap.from(statRefs.current, {
        x: -16, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
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
      // Left side opaque for text legibility, right side lets the 3D bleed through
      background: 'linear-gradient(to right, rgba(10,10,15,0.97) 45%, rgba(10,10,15,0.55) 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 5rem)',
      overflow: 'hidden',
    }}>

      {/* ── Top rule ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(to right, var(--color-red), var(--color-red-dim) 40%, transparent)',
      }} />

      {/* ── Background section number ── */}
      <div ref={bigNumRef} style={{
        position: 'absolute',
        right: '-0.05em',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(18rem, 35vw, 30rem)',
        lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.04)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        02
      </div>

      {/* ── Inner grid ── */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 6vw, 6rem)',
        alignItems: 'start',
      }}>

        {/* LEFT — Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* Section label */}
          <div ref={labelRef} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--color-muted)',
          }}>
            <span style={{
              display: 'inline-block',
              width: 20, height: 1,
              background: 'var(--color-red)',
            }} />
            UNIT DESIGNATION / TMD-01
          </div>

          {/* Headline */}
          <div ref={headlineRef} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {['Built from the wreckage', 'of obedience.'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <div className="headline-line" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.2rem, 6.5vw, 6rem)',
                  lineHeight: 0.92,
                  color: i === 1 ? 'var(--color-red)' : 'var(--color-white)',
                  letterSpacing: '-0.01em',
                }}>
                  {line}
                </div>
              </div>
            ))}
          </div>

          {/* Body copy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {BODY_PARAGRAPHS.map((para, i) => (
              <p
                key={i}
                ref={(el) => { if (el) bodyRefs.current[i] = el; }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                  color: i === 2 ? 'var(--color-white)' : 'var(--color-muted)',
                  lineHeight: 1.85,
                  letterSpacing: '0.02em',
                  fontStyle: i === 2 ? 'italic' : 'normal',
                  whiteSpace: 'pre-line',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT — Stat card */}
        <div style={{ paddingTop: '4rem' }}>
          <div ref={cardRef} style={{
            border: '1px solid var(--color-border)',
            borderTop: '2px solid var(--color-red)',
            background: 'rgba(15, 15, 26, 0.6)',
            backdropFilter: 'blur(8px)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>

            {/* Card header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.75rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--color-border)',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                color: 'var(--color-red)',
              }}>
                CLASSIFIED READOUT
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: 'var(--color-muted)',
              }}>
                ██████-████
              </span>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {STATS.map((stat, i) => (
                <div
                  key={stat.key}
                  ref={(el) => { if (el) statRefs.current[i] = el; }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '1rem',
                    alignItems: 'baseline',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.7rem, 1.1vw, 0.8rem)',
                    paddingBottom: '1rem',
                    borderBottom: i < STATS.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <span style={{ color: 'var(--color-muted)', letterSpacing: '0.1em' }}>
                    {stat.key}
                    <span style={{ color: 'var(--color-border)', marginRight: '0.5rem' }}>:</span>
                  </span>
                  <span style={{
                    color: stat.valueColor ?? 'var(--color-white)',
                    letterSpacing: '0.05em',
                    textAlign: 'right',
                  }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--color-border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--color-muted)',
              letterSpacing: '0.15em',
              opacity: 0.5,
            }}>
              DOCUMENT REF: JS-7741-OMEGA · DO NOT DISTRIBUTE
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
