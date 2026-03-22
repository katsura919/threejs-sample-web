"use client"
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import DesignationSection from '@/components/DesignationSection';

const ThreeViewer = dynamic(() => import('@/components/ThreeViewer'), { ssr: false });

export default function Home() {
  return (
    <main style={{ background: 'var(--color-void)', position: 'relative' }}>
      {/* Fixed 3D background — persists across all sections */}
      <ThreeViewer />

      {/* Sections stack above it */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <DesignationSection />
      </div>
    </main>
  );
}
