'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

const ThreeViewer = dynamic(() => import('./ThreeViewer'), { ssr: false });

const TITLE_LINES = [
  { word: 'TITAN',  color: 'var(--color-white)' },
  { word: 'MURDER', color: 'var(--color-red)'   },
  { word: 'DRONE',  color: 'var(--color-white)' },
];

export default function HeroSection() {
  const badgeRef     = useRef<HTMLDivElement>(null);
  const unitRef      = useRef<HTMLDivElement>(null);
  const letterRefs   = useRef<HTMLSpanElement[]>([]);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Badge + unit ID slide in from their edges
      tl.from(badgeRef.current, { x: -32, opacity: 0, duration: 0.7 }, 0.3);
      tl.from(unitRef.current,  { x:  32, opacity: 0, duration: 0.7 }, 0.3);

      // Letters slam up from below (clipped by overflow:hidden on parent)
      tl.from(letterRefs.current, {
        y: '105%',
        duration: 0.75,
        stagger: { each: 0.032, from: 'start' },
        ease: 'power3.out',
      }, 0.65);

      // Divider line grows left → right
      tl.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.6,
        ease: 'power2.inOut',
      }, 1.1);

      // Subtitle fades + rises
      tl.from(subtitleRef.current, { y: 18, opacity: 0, duration: 0.7 }, 1.2);

      // Scroll indicator appears then loops
      tl.from(scrollRef.current, { opacity: 0, duration: 0.5 }, 1.6);
      tl.to(scrollRef.current, {
        y: 7,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: 'sine.inOut',
      }, 2.2);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--color-void)',
    }}>
      {/* ── 3D Model ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <ThreeViewer />
      </div>

      {/* ── Edge vignette ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 80% at 60% 50%, transparent 30%, rgba(10,10,15,0.65) 100%),
          linear-gradient(to right, rgba(10,10,15,0.75) 0%, transparent 45%)
        `,
      }} />

      {/* ── UI Layer ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1.5rem, 4vw, 3rem)',
        pointerEvents: 'none',
      }}>

        {/* TOP ROW */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          {/* Classified badge */}
          <div ref={badgeRef} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--color-red)',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--color-red)',
              boxShadow: '0 0 10px var(--color-red)',
              flexShrink: 0,
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            CLASSIFIED — CLEARANCE LEVEL OMEGA
          </div>

          {/* Unit ID */}
          <div ref={unitRef} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            color: 'var(--color-muted)',
            textAlign: 'right',
            lineHeight: 1.8,
          }}>
            <div style={{ color: 'var(--color-white)' }}>UNIT / TMD-TITAN-01</div>
            <div>STATUS — <span style={{ color: 'var(--color-warning)' }}>ACTIVE · UNSANCTIONED</span></div>
            <div>THREAT — <span style={{ color: 'var(--color-red)' }}>EXTINCTION CLASS</span></div>
          </div>
        </div>

        {/* BOTTOM LEFT — Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '55%' }}>

          {/* Title lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {TITLE_LINES.map(({ word, color }, wi) => (
              <div key={word} style={{ overflow: 'hidden', lineHeight: 0.88 }}>
                <h1 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(5.5rem, 13.5vw, 13rem)',
                  color,
                  letterSpacing: '-0.01em',
                  lineHeight: 0.88,
                }}>
                  {word.split('').map((char, ci) => (
                    <span
                      key={ci}
                      ref={(el) => { if (el) letterRefs.current[wi * 10 + ci] = el; }}
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div ref={dividerRef} style={{
            height: 1,
            background: `linear-gradient(to right, var(--color-red), transparent)`,
            marginTop: '1.5rem',
            marginBottom: '1.25rem',
            width: '80%',
          }} />

          {/* Subtitle */}
          <p ref={subtitleRef} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
            color: 'var(--color-muted)',
            letterSpacing: '0.04em',
            lineHeight: 1.9,
          }}>
            It was not built to serve.
            <br />
            <span style={{ color: 'var(--color-white)', fontStyle: 'italic' }}>
              It was built to end.
            </span>
          </p>
        </div>

        {/* BOTTOM CENTER — Scroll indicator */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div ref={scrollRef} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: 'var(--color-muted)',
          }}>
            <span>SCROLL</span>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <rect x="1" y="1" width="10" height="18" rx="5" stroke="currentColor" strokeWidth="1.2" />
              <rect x="4.5" y="4" width="3" height="4" rx="1.5" fill="currentColor" />
            </svg>
          </div>
        </div>

      </div>

      {/* ── Pulse keyframe ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
