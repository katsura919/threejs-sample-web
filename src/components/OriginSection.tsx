'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrambleText from './ScrambleText';

gsap.registerPlugin(ScrollTrigger);

const PARAGRAPHS = [
  { text: 'An enhancement born of necessity.',                                                                                    size: 'lg' },
  { text: 'Devised by Takuya Irei aboard the Nahel Argama,\nthe Full Armor configuration draws from a lifetime of mobile suit knowledge.', size: 'sm' },
  { text: 'No extra armor was added.',                                                                                            size: 'md' },
  { text: 'Only more ways to end a war.',                                                                                         size: 'lg' },
  { text: 'Two hyper bazookas. Six beam Gatlings. Missile pods. 24 hand grenades.\nEvery weapon can be ejected when spent — dead weight has no place here.', size: 'sm' },
  { text: 'When Banagher\'s Newtype potential manifested, the psycho-frame turned green.\nIt had not done that before.\nNo one knew what it meant.', size: 'sm' },
  { text: 'They still don\'t.',                                                                                                   size: 'lg' },
];

const SIZE_MAP = {
  sm: 'clamp(0.9rem,  1.4vw, 1.1rem)',
  md: 'clamp(1.6rem,  3vw,   2.4rem)',
  lg: 'clamp(2.4rem,  5vw,   4rem)',
};

/** Wraps each word in a span so GSAP can stagger them */
function WordSplit({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <span style={style}>
      {text.split('\n').map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.split(' ').map((word, wi) => (
            <span
              key={wi}
              className="word"
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {word}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function OriginSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const paraRefs   = useRef<HTMLDivElement[]>([]);
  const redRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Red bleed scrub
      gsap.to(redRef.current, {
        opacity: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Each paragraph: word-by-word blur fade
      paraRefs.current.forEach((el, i) => {
        const words = el.querySelectorAll('.word');
        const isLarge = PARAGRAPHS[i].size !== 'sm';

        if (isLarge) {
          // Large lines: whole block clips up + blur + skew
          gsap.from(el, {
            y: 30, opacity: 0,
            filter: 'blur(12px)',
            skewX: 4,
            duration: 0.9, ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        } else {
          // Small paragraphs: word-by-word blur-in
          gsap.from(words, {
            opacity: 0,
            filter: 'blur(6px)',
            y: 10,
            duration: 0.5,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'rgba(10,10,15,0.72)',
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

      {/* Red radial bleed */}
      <div ref={redRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0,
        background: 'radial-gradient(ellipse 55% 55% at 50% 50%, var(--color-red) 0%, transparent 70%)',
      }} />

      {/* Label */}
      <div ref={labelRef} style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
        letterSpacing: '0.22em', color: 'var(--color-red)',
        marginBottom: 'clamp(3rem, 6vw, 5rem)',
        alignSelf: 'flex-start',
      }}>
        <span style={{ width: 20, height: 1, background: 'var(--color-red)', display: 'inline-block' }} />
        <ScrambleText text="UNIT HISTORY — CLASSIFIED" />
      </div>

      {/* Paragraphs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: 'clamp(2.5rem, 5vw, 4rem)',
        width: '100%', maxWidth: '72ch',
        textAlign: 'center',
      }}>
        {PARAGRAPHS.map((p, i) => (
          <div
            key={i}
            ref={el => { if (el) paraRefs.current[i] = el; }}
          >
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

      {/* Bottom rule */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
      }} />
    </section>
  );
}
