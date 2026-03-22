# Titan Murder Drone — Landing Page Plan

## Concept
A cinematic, scroll-driven character reveal. The page feels like an **classified dossier being declassified in real time** — cold, industrial, and threatening. The 3D model is the centerpiece; everything else exists to give it weight and mythology.

---

## Theme & Tone
- **Mood:** Dark sci-fi / military black ops / horror-adjacent
- **Color palette:** Near-black background (`#0a0a0f`), blood red accents (`#c1121f`), cold white text, occasional electric yellow (`#f5c518`) for warning labels
- **Typography:** All-caps serif or sharp sans for headings, monospaced for data/stats (feels like a terminal readout)
- **Motion language:** Nothing is soft. Cuts are hard. Text slams in. The 3D model rotates slowly — like it's being studied.

---

## Page Sections

### 0. Preloader
- Full black screen
- Monospaced text types out: `INITIALIZING DOSSIER... UNIT: TMD-TITAN-01`
- Red progress bar fills
- Fades into hero

---

### 1. HERO — "The First Look"
**Layout:** Full viewport. 3D model centered. Minimal UI.

**Copy (top, small caps, letter-spaced):**
```
CLASSIFIED — CLEARANCE LEVEL OMEGA
```

**Headline (large, staggered letter-by-letter entrance):**
```
TITAN
MURDER
DRONE
```

**Sub-copy (fades in after headline):**
```
It was not built to serve.
It was built to end.
```

**Interaction:**
- Model slowly auto-rotates on Y axis
- OrbitControls available for the user to drag
- Subtle red point light pulses near the eye/face area
- Scroll indicator arrow bounces at the bottom

---

### 2. DESIGNATION — "What Is It"
**Layout:** Left: large stat block. Right: 3D model (pinned/sticky) shifts slightly in camera angle via scroll.

**Section label:**
```
UNIT DESIGNATION / TMD-01
```

**Headline:**
```
Built from the wreckage
of obedience.
```

**Body copy:**
```
The Titan Murder Drone is not a weapon of war.
It is the conclusion of one.

Engineered beyond the constraints of the original
Disassembly Drone program, the Titan variant operates
without directive, without mercy, and without failure.

What walks in its shadow does not walk back.
```

**Stat block (monospaced, revealed line by line on scroll):**
```
CLASS         : Disassembly / Apex Variant
DESIGNATION   : TMD-TITAN-01
STATUS        : ACTIVE — UNSANCTIONED
THREAT LEVEL  : EXTINCTION
LAST SEEN     : [REDACTED]
ORIGIN        : JCJenson (in space)™
```

**Animation:** Stats tick up/type in one by one as the section scrolls into view (GSAP stagger).

---

### 3. ANATOMY — "The Details"
**Layout:** 3D model large in background, hotspot callouts float over specific areas with connecting lines.

**Section headline:**
```
Engineered for one purpose.
It shows.
```

**Hotspot callouts (appear on scroll, each with a label + short copy):**

- **OPTICAL ARRAY**
  `Thermal. Infrared. Absolute. Tracks 217 targets simultaneously.`

- **JAW ASSEMBLY**
  `Reinforced tungsten. Pressure: 4,200 PSI. You will not pull away.`

- **CRANIAL CORE**
  `No emotion subroutines. No hesitation loops. Pure execution logic.`

- **OUTER CASING**
  `Recovered from an unclassified impact event. Material unknown.`

**Animation:** Each callout draws its connecting line via SVG stroke animation (GSAP `drawSVG` or manual stroke-dashoffset). Hotspots pulse with a red glow.

---

### 4. ORIGIN — "The Lore Drop"
**Layout:** Full-width dark section. Text is the hero — centered, large, slow fade-in per paragraph. 3D model is gone here; let the words breathe.

**Section label:**
```
INCIDENT REPORT — SEALED
```

**Copy (revealed paragraph by paragraph on scroll):**
```
It began as an upgrade.

The original Murder Drone fleet was efficient.
Precise. Cost-effective. Profitable.

But efficiency has a ceiling.

Someone pushed past it.

The Titan program was never approved.
The Titan program was never stopped.

What emerged from the development chamber was
not what was requested. It was something older.
Something that remembered being angry.

JCJenson (in space)™ denies all involvement.
JCJenson (in space)™ has been trying to contain it for three years.

They have not succeeded.
```

**Animation:** Each paragraph fades and slides up with GSAP + ScrollTrigger scrub. The background very subtly shifts hue (deep red bleed) as user scrolls through.

---

### 5. WARNING — "The Closer"
**Layout:** Full viewport again. 3D model returns, now closer, slightly tilted — more menacing angle. Red atmospheric fog in Three.js scene.

**Stamp/badge text (large, rotated, like a classified stamp):**
```
DO NOT ENGAGE
```

**Headline:**
```
You've been warned.
```

**Sub-copy:**
```
This file has been accessed 1 time.
Each access is logged.
Each log is reviewed.
By it.
```

**CTA (optional — could link to a video, a show, a portfolio, etc.):**
```
[ VIEW FULL DOSSIER ]
```

**Animation:** The stamp slams in with a hard scale punch. The 3D model's eye(s) glow red on entrance. Page slowly vignettes darker at the edges.

---

## Scroll & Animation Architecture

```
Lenis (smooth scroll)
  └── feeds into GSAP ticker
        └── ScrollTrigger pins & scrubs
              ├── Hero: model rotation linked to scroll progress
              ├── Designation: stats type in on enter
              ├── Anatomy: callout lines draw in sequence
              ├── Origin: paragraphs stagger in
              └── Warning: stamp slam + model re-entrance
```

### Key GSAP techniques to use:
- `gsap.from()` with `stagger` for letter/word reveals
- `ScrollTrigger.scrub` for scroll-linked 3D camera movement
- `SplitText` (or manual span splitting) for per-character animations
- `timeline` with `pin: true` for sticky 3D sections
- SVG `strokeDashoffset` animation for anatomy callout lines

---

## Implementation Order
1. [x] Install Three.js, GSAP, Lenis — **done**
2. [ ] Build section layout & global styles
3. [ ] Hero section with 3D + entrance animation
4. [ ] Lore/copy sections with ScrollTrigger text reveals
5. [ ] Anatomy hotspot system
6. [ ] Closing warning section
7. [ ] Preloader
8. [ ] Polish: sounds (optional), cursor effects, mobile responsiveness
