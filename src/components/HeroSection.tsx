'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MorphingText } from '@/components/ui/morphing-text';

const MORPH_TEXTS = ['FULL ARMOR', 'UNICORN', 'DESTROY MODE', 'RX-0[N]'];

export default function HeroSection() {
  const badgeRef    = useRef<HTMLDivElement>(null);
  const unitRef     = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Badge + unit ID slide in from their edges
      tl.from(badgeRef.current, { x: -32, opacity: 0, duration: 0.7 }, 0.3);
      tl.from(unitRef.current,  { x:  32, opacity: 0, duration: 0.7 }, 0.3);

      // Title block fades in
      tl.from(titleRef.current, { y: 24, opacity: 0, filter: 'blur(12px)', duration: 0.9 }, 0.5);

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
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      {/* ── Edge vignette ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
          radial-gradient(ellipse 80% 80% at 60% 50%, transparent 30%, rgba(10,10,15,0.65) 100%),
          linear-gradient(to right, rgba(10,10,15,0.75) 0%, transparent 45%)
        `,
        }}
      />

      {/* ── UI Layer ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(1.5rem, 4vw, 3rem)",
          pointerEvents: "none",
          marginBottom: "200px",
        }}
      >
        {/* TOP ROW */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Classified badge */}
          <div
            ref={badgeRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "var(--color-red)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--color-red)",
                boxShadow: "0 0 10px var(--color-red)",
                flexShrink: 0,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            CLASSIFIED — NT-D SYSTEM ACTIVE
          </div>

          {/* Unit ID */}
          <div
            ref={unitRef}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "var(--color-muted)",
              textAlign: "right",
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: "var(--color-white)" }}>
              UNIT / RX-0 FA-UNICORN
            </div>
            <div>
              PILOT —{" "}
              <span style={{ color: "var(--color-warning)" }}>
                BANAGHER LINKS
              </span>
            </div>
            <div>
              PSYCHOFRAME —{" "}
              <span style={{ color: "var(--color-red)" }}>
                RESONANT · GREEN
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM LEFT — Title block */}
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: "70%" }}
        >
          {/* Morphing title */}
          <div ref={titleRef}>
            <MorphingText
              texts={MORPH_TEXTS}
              className="!text-left !mx-0 !max-w-none morphing-hero"
            />
          </div>

          {/* Divider */}
          <div
            ref={dividerRef}
            style={{
              height: 1,
              background: `linear-gradient(to right, var(--color-red), transparent)`,
              marginTop: "1.5rem",
              marginBottom: "1.25rem",
              width: "80%",
            }}
          />

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)",
              color: "var(--color-muted)",
              letterSpacing: "0.04em",
              lineHeight: 1.9,
            }}
          >
            <span style={{ color: "var(--color-white)", fontStyle: "italic" }}>
              The RX-0 Full Armor Unicorn Gundam (aka Full Armor Unicorn,
              Unicorn) is a variant of the RX-0 Unicorn Gundam and is piloted by
              Banagher Links.
            </span>
          </p>
        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .morphing-hero {
          font-family: var(--font-display) !important;
          font-size: clamp(4rem, 12vw, 11rem) !important;
          font-weight: 700 !important;
          line-height: 0.9 !important;
          letter-spacing: -0.01em !important;
          color: var(--color-white) !important;
          height: clamp(4rem, 12vw, 11rem) !important;
        }
      `}</style>
    </section>
  );
}
