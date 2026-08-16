'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const fabrics = [
  {
    name: 'Japanese Selvedge Denim',
    origin: 'Okayama, Japan',
    weight: '12.5 oz',
    description:
      'Woven on vintage shuttle looms producing a tighter, denser weave that develops a unique patina over time.',
    color: '#2C3E50',
  },
  {
    name: 'Italian Stretch Twill',
    origin: 'Biella, Italy',
    weight: '280 GSM',
    description:
      'A 4-way stretch fabric with a refined matte finish, engineered for unrestricted movement without sacrificing structure.',
    color: '#34495E',
  },
  {
    name: 'Belgian Linen',
    origin: 'Kortrijk, Belgium',
    weight: '180 GSM',
    description:
      'Stone-washed European flax that softens with each wear while maintaining its characteristic cool drape.',
    color: '#BDC3A7',
  },
];

export default function PremiumFabricSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    sectionRef?.current
      ?.querySelectorAll('.reveal-up, .reveal-left')
      ?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Top split */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center mb-20 lg:mb-28">
          {/* Left text */}
          <div className="lg:w-5/12 reveal-left">
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-6">
              The Material
            </span>
            <h2 className="section-heading mb-8">
              Fabric that
              <br />
              <span className="italic text-muted-foreground">speaks first.</span>
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-8 text-base">
              We source from the world&apos;s finest mills — Japanese denim weavers, Italian
              tailors, Belgian linen farmers. Every thread is chosen with the same obsession we
              apply to the cut.
            </p>
            <div className="space-y-4">
              {[
                'Premium raw materials only',
                'Tested for 200+ wash cycles',
                'Colorfastness guaranteed',
                'Shrink-resistant treatment',
              ]?.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gold flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-gold-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-body text-sm text-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="lg:w-7/12 reveal-up">
            <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
              <AppImage
                src="https://images.unsplash.com/photo-1701887875568-5b73491937fd"
                alt="Premium fabric close-up — rich textile texture in warm natural light, bright airy studio with clean white background"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />

              {/* Floating stat card */}
              <div className="absolute bottom-8 left-8 glass-dark p-6 luxury-border max-w-[200px]">
                <p className="font-display font-bold text-4xl text-white leading-none">12+</p>
                <p className="font-body text-xs text-white/60 uppercase tracking-widest mt-2">
                  Premium Fabric Sources
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fabric cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal-up">
          {fabrics?.map((fabric, i) => (
            <div
              key={fabric?.name}
              className="border border-border p-8 hover:border-gold transition-all duration-300 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Color swatch */}
              <div
                className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: fabric?.color }}
              />

              <h3 className="font-display font-bold text-lg mb-1">{fabric?.name}</h3>
              <p className="font-display text-xs font-semibold tracking-widest uppercase text-gold mb-4">
                {fabric?.origin} · {fabric?.weight}
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {fabric?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
