'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import CollectionsBento from './CollectionsBento';
import PremiumFabricSection from './PremiumFabricSection';
import TestimonialsSection from './TestimonialsSection';
import WholesaleSection from './WholesaleSection';

export default function HomepageClient() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let rafId: number;

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);
      } catch {
        // Lenis not available, fall back to native scroll
      }
    };

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-black" suppressHydrationWarning />;
  }

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!loaded}
      >
        <div className="grain-overlay" />
        <CustomCursor />
        <Header />
        <main>
          <HeroSection />
          <FeaturedProducts />
          <CollectionsBento />
          <PremiumFabricSection />
          <TestimonialsSection />
          <WholesaleSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
