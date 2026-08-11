'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

// BENTO GRID AUDIT:
// Array has 7 cards: [Jeans, Cargo, Formal, Linen, Chinos, Joggers, Shorts]
// Row 1: [col-1..2: Jeans cs-2 rs-2] [col-3: Cargo cs-1 rs-1]
// Row 2: [col-3: Formal cs-1 rs-1]
// Row 3: [col-1: Linen cs-1 rs-1] [col-2: Chinos cs-1 rs-1] [col-3: Joggers cs-1 rs-1]
// Row 4: [col-1..3: Shorts cs-3 rs-1]
// Placed 7/7 cards ✓

const categories = [
  {
    id: 'cargos',
    name: 'Cargos',
    tagline: 'Tactical Utility',
    count: 18,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-2',
    height: 'h-[420px] lg:h-full',
  },
  {
    id: 'linen',
    name: 'Linen',
    tagline: 'Breathable Luxury',
    count: 12,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
    height: 'h-[240px]',
  },
  {
    id: 'formal',
    name: 'Formal',
    tagline: 'Boardroom Ready',
    count: 15,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4d42?w=600&q=80',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
    height: 'h-[240px]',
  },
  {
    id: 'cotton-pants',
    name: 'Cotton Pants',
    tagline: 'Classic Twill & Bold Fits',
    count: 20,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500&q=80',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
    height: 'h-[240px]',
  },
  {
    id: 'shorts',
    name: 'Shorts',
    tagline: 'Summer Essentials',
    count: 14,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=1200&q=80',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-1',
    height: 'h-[240px]',
  },
];

export default function CollectionsBento() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.05 }
    );
    sectionRef?.current?.querySelectorAll('.reveal-up')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-black">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 lg:mb-16 gap-6 reveal-up">
          <div>
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-3">
              Collections
            </span>
            <h2 className="section-heading text-white">
              Every style.<br />
              <span className="italic text-white/40">One brand.</span>
            </h2>
          </div>
          <Link
            href="/collections"
            className="font-display text-sm font-semibold tracking-widest uppercase text-white/60 hover:text-gold transition-colors animated-underline"
          >
            View All Collections →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          {categories?.map((cat, i) => (
            <div
              key={cat?.id}
              className={`${cat?.colSpan} ${cat?.rowSpan} reveal-up`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Link href={`/collections?category=${cat.id}`} className="block h-full">
                <div className={`relative overflow-hidden group ${cat?.height} ${cat?.rowSpan === 'lg:row-span-2' ? 'lg:h-full' : ''}`}>
                  <AppImage
                    src={cat?.image}
                    alt={`${cat?.name} collection — premium men's ${cat?.name?.toLowerCase()} in dramatic dark studio lighting, atmospheric shadows`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    sizes={cat?.colSpan === 'lg:col-span-2' ? '(max-width: 768px) 100vw, 66vw' : cat?.colSpan === 'lg:col-span-3' ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
                    style={{ transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-1">
                          {cat?.tagline}
                        </p>
                        <h3 className={`font-display font-bold text-white leading-none ${
                          cat?.rowSpan === 'lg:row-span-2' ? 'text-4xl lg:text-5xl' : 'text-2xl lg:text-3xl'
                        }`}>
                          {cat?.name}
                        </h3>
                        <p className="font-body text-xs text-white/50 mt-2 tracking-widest uppercase">
                          {cat?.count} styles
                        </p>
                      </div>
                      <div className="w-10 h-10 border border-white/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M7 7h10v10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}