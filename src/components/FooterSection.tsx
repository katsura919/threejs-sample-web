"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "DESIGNATION", href: "#designation" },
  { label: "WEAPONS", href: "#anatomy" },
  { label: "ORIGIN", href: "#origin" },
  { label: "DESTROY MODE", href: "#destroy" },
  { label: "COMBAT LOG", href: "#combat" },
  { label: "LEGACY", href: "#legacy" },
];

const META = [
  { key: "UNIT", value: "RX-0[N] FULL ARMOR UNICORN GUNDAM" },
  { key: "SERIES", value: "Mobile Suit Gundam Unicorn" },
  { key: "PILOT", value: "Banagher Links" },
  { key: "STATUS", value: "NT-D CONFIRMED — PSYCHOFRAME GREEN" },
];

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const colRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(colRefs.current, {
        y: 24,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        background:
          "linear-gradient(to top, rgba(5,5,10,0.50) 50%, transparent 100%)",
        borderTop: "none",
        padding:
          "clamp(3rem, 7vw, 6rem) clamp(1.5rem, 6vw, 5rem) clamp(2rem, 4vw, 3rem)",
        overflow: "hidden",
      }}
    >
      {/* Main grid — left-heavy, right is open for 3D asset */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr 1fr 1fr",
          gap: "clamp(2rem, 4vw, 4rem)",
          maxWidth: "60%",
        }}
      >
        {/* COL 1 — Brand / unit ID */}
        <div
          ref={(el) => {
            if (el) colRefs.current[0] = el;
          }}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color: "var(--color-white)",
              }}
            >
              FULL
              <br />
              <span style={{ color: "var(--color-red)" }}>ARMOR</span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color: "var(--color-white)",
              }}
            >
              UNICORN
            </div>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              color: "var(--color-muted)",
              lineHeight: 1.75,
              maxWidth: "22ch",
            }}
          >
            A variant of the RX-0 Unicorn Gundam. Enhanced armament.
            Unrestricted potential.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "var(--color-red)",
              opacity: 0.7,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-red)",
                boxShadow: "0 0 8px var(--color-red)",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            NT-D ACTIVE
          </div>
        </div>

        {/* COL 2 — Navigation */}
        <div
          ref={(el) => {
            if (el) colRefs.current[1] = el;
          }}
          style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--color-red)",
              marginBottom: "0.5rem",
            }}
          >
            SECTIONS
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.12em",
                color: "var(--color-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
                pointerEvents: "auto",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-white)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-muted)")
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* COL 3 — Unit meta */}
        <div
          ref={(el) => {
            if (el) colRefs.current[2] = el;
          }}
          style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--color-red)",
              marginBottom: "0.5rem",
            }}
          >
            UNIT DATA
          </div>
          {META.map((m) => (
            <div
              key={m.key}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.15rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  color: "var(--color-muted)",
                  opacity: 0.5,
                }}
              >
                {m.key}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  color: "var(--color-white)",
                }}
              >
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* COL 4 — Classification */}
        <div
          ref={(el) => {
            if (el) colRefs.current[3] = el;
          }}
          style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "var(--color-red)",
              marginBottom: "0.5rem",
            }}
          >
            CLEARANCE
          </div>
          <div
            style={{
              border: "1px solid rgba(193,18,31,0.3)",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "var(--color-red)",
              }}
            >
              <ScrambleText text="CLASSIFIED" />
            </div>
            {[
              "FILE REF — JS-7741-OMEGA",
              "LEVEL — OMEGA",
              "DIST. — RESTRICTED",
              "COPY — DO NOT DUPLICATE",
            ].map((line) => (
              <div
                key={line}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.1em",
                  color: "var(--color-muted)",
                  opacity: 0.5,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          marginTop: "clamp(2.5rem, 5vw, 4rem)",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "60%",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "var(--color-muted)",
            opacity: 0.4,
          }}
        >
          © ANAHEIM ELECTRONICS · EARTH FEDERATION FORCES · ALL DATA SEALED
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.15em",
            color: "var(--color-muted)",
            opacity: 0.4,
          }}
        >
          RX-0[N] — U.C. 0096
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </footer>
  );
}
