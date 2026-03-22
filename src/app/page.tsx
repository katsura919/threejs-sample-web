"use client"
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import DesignationSection from '@/components/DesignationSection';
import AnatomySection from '@/components/AnatomySection';
import OriginSection from '@/components/OriginSection';

const ThreeViewer = dynamic(() => import('@/components/ThreeViewer'), { ssr: false });

export default function Home() {
  return (
    <main style={{ background: 'transparent', position: 'relative' }}>
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
