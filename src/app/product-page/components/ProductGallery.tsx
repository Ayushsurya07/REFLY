'use client';
import React, { useState, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

interface GalleryImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainRef.current) return;
    const rect = mainRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  return (
    <div className="lg:sticky lg:top-24 h-fit">
      {/* Main Image */}
      <div
        ref={mainRef}
        className="relative aspect-[4/5] overflow-hidden bg-muted cursor-zoom-in mb-3"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMouseMove}
      >
        <AppImage
          src={images[activeIdx].src}
          alt={images[activeIdx].alt}
          fill
          priority={activeIdx === 0}
          className="object-cover transition-all duration-500"
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: zoom ? 'scale(1.8)' : 'scale(1)',
            transition: zoom
              ? 'transform 0.1s ease'
              : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Navigation arrows */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors z-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Zoom hint */}
        {!zoom && (
          <div className="absolute bottom-4 right-4 glass-dark px-3 py-1.5">
            <span className="font-body text-xs text-white/70">Hover to zoom</span>
          </div>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 left-4 glass-dark px-3 py-1.5">
          <span className="font-display text-xs text-white font-semibold">
            {activeIdx + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            aria-label={`View image ${i + 1}`}
            className={`aspect-square overflow-hidden relative border-2 transition-all duration-200 ${
              activeIdx === i ? 'border-gold' : 'border-transparent hover:border-border'
            }`}
          >
            <AppImage
              src={img.src}
              alt={`Product thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
