'use client';
import React, { useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'fadeout'>('loading');
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      width: string;
      height: string;
      animation: string;
      animationDelay: string;
    }>
  >([]);

  useEffect(() => {
    setParticles(
      [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 3}s`,
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase('fadeout');
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`loading-screen transition-opacity duration-600 ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {/* Grain */}
      <div className="grain-overlay" />

      {/* Logo */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        <div
          className="w-20 h-20 flex items-center justify-center"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          <AppImage
            src="/assets/images/6391F31B-6325-43A2-8883-0AEF80565846-1785440876904.png"
            alt="Refly logo — premium men's fashion brand mark"
            width={80}
            height={80}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        <div className="loading-logo-text tracking-[0.4em]">REFLY</div>

        <div className="flex flex-col items-center gap-3">
          <div className="loading-bar">
            <div
              className="loading-bar-fill"
              style={{
                width: `${Math.min(progress, 100)}%`,
                transition: 'width 0.1s ease',
                animation: 'none',
              }}
            />
          </div>
          <span className="font-display text-xs text-white/30 tracking-[0.3em] uppercase">
            Move Different
          </span>
        </div>
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute bg-gold rounded-full opacity-40"
            style={{
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              animation: p.animation,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
