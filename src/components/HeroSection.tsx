'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphingText } from '@/components/ui/morphing-text';

gsap.registerPlugin(ScrollTrigger);

const MORPH_TEXTS = ['FULL ARMOR', 'UNICORN', 'DESTROY MODE', 'RX-0[N]'];

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
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

      // ── Outro: scrub elements out as section scrolls away ──
      const outro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      outro
        .to(badgeRef.current,    { x: -40, opacity: 0, filter: 'blur(6px)', ease: 'power2.in' }, 0)
        .to(unitRef.current,     { x:  40, opacity: 0, filter: 'blur(6px)', ease: 'power2.in' }, 0)
        .to(titleRef.current,    { y: -30, opacity: 0, filter: 'blur(14px)', ease: 'power2.in' }, 0.05)
        .to(dividerRef.current,  { scaleX: 0, transformOrigin: 'left center', ease: 'power2.in' }, 0.1)
        .to(subtitleRef.current, { y: -16, opacity: 0, filter: 'blur(6px)', ease: 'power2.in' }, 0.1)
        .to(scrollRef.current,   { opacity: 0, ease: 'power2.in' }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
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
              background: ` transparent)`,
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
              The RX-0 Full Armor Unicorn Gundam is a variant of the <br></br> RX-0 Unicorn Gundam and is piloted by
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
