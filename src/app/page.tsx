"use client"
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import DesignationSection from '@/components/DesignationSection';
import AnatomySection from '@/components/AnatomySection';
import OriginSection from '@/components/OriginSection';
import { Ripple } from '@/components/ui/ripple';

const ThreeViewer = dynamic(() => import('@/components/ThreeViewer'), { ssr: false });

export default function Home() {
  return (
    <main style={{ background: 'transparent', position: 'relative' }}>
      {/* Ripple background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, transform: 'translateX(10%)' }}>
        <Ripple mainCircleSize={600} numCircles={10} />
      </div>

      {/* Fixed 3D background — persists across all sections */}
      <ThreeViewer />

      {/* Sections stack above it */}
      <div style={{ position: 'relative', pointerEvents: 'none' }}>
        <HeroSection />
        <DesignationSection />
        <AnatomySection />
        <OriginSection />
      </div>
    </main>
  );
}
