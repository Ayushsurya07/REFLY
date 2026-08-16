'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const STATS = [
  { value: '100+', label: 'Premium Products' },
  { value: '12K+', label: 'Happy Customers' },
  { value: 'Pan India', label: 'Delivery' },
  { value: '7-Day', label: 'Easy Returns' },
];

const HEADLINE_WORDS = ['MOVE', 'DIFFERENT.'];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const imgX = useTransform(springX, [-1, 1], [-8, 8]);
  const imgY = useTransform(springY, [-1, 1], [-5, 5]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setTextVisible(true), 400);

    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100dvh', minHeight: '600px' }}
      aria-label="Hero section"
    >
      {/* ── Ken Burns Background ── */}
      <motion.div
        ref={imageRef}
        className="absolute inset-0"
        style={{ x: imgX, y: imgY, scale: 1.08 }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/WhatsApp_Image_2026-07-31_at_02.24.28-1785445846847.jpeg"
          alt="REFLY premium men's jeans campaign — model wearing dark denim in cinematic studio lighting"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: 'center 20%' }}
          loading="eager"
        />
      </motion.div>

      {/* ── Gradient Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35 pointer-events-none" />

      {/* ── Mouse Radial Glow ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)`,
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-30 h-full flex flex-col justify-center max-w-[1600px] mx-auto px-6 lg:px-16 pt-16 pb-36 lg:pb-40">
        <div className="max-w-3xl">

          {/* Label */}
          <AnimatePresence>
            {textVisible && (
              <motion.div
                className="flex items-center gap-3 mb-4 lg:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-8 h-px" style={{ background: '#D4AF37' }} />
                <span
                  className="text-xs font-semibold tracking-[0.35em] uppercase"
                  style={{ color: '#D4AF37', fontFamily: 'var(--font-display)' }}
                >
                  NEW DROP • 2026 COLLECTION
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* REFLY */}
          <AnimatePresence>
            {textVisible && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1
                  className="leading-none mb-1"
                  style={{
                    fontFamily: "'Blue Fonte Sans', sans-serif",
                    fontSize: 'clamp(4rem, 12vw, 10rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  REFLY
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BUILT DIFFERENT. — word by word */}
          <div
            className="flex flex-wrap gap-x-4 mb-5 lg:mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
              lineHeight: 1,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
            }}
          >
            {HEADLINE_WORDS.map((word, i) => (
              <AnimatePresence key={word}>
                {textVisible && (
                  <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.25 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ color: '#8B1A1A', display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Subheading */}
          <AnimatePresence>
            {textVisible && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6 lg:mb-8 leading-relaxed"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
                  color: 'rgba(255,255,255,0.68)',
                  maxWidth: '520px',
                }}
              >
                Premium men&apos;s bottoms engineered for those who refuse to blend in.
                <br />
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9em' }}>
                  Jeans • Cargos • Formal Pants • Linen Pants • Shorts — Delivered Across India.
                </span>
              </motion.p>
            )}
          </AnimatePresence>

          {/* CTA Buttons */}
          <AnimatePresence>
            {textVisible && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 relative z-30"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Primary CTA */}
                <MagneticButton href="/collections" primary>
                  <span>SHOP COLLECTION</span>
                  <svg
                    className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MagneticButton>

                {/* Secondary CTA */}
                <MagneticButton href="#wholesale">
                  WHOLESALE INQUIRY
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Glassmorphism Stats Bar ── */}
      <AnimatePresence>
        {textVisible && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-4 mb-6 lg:mx-12 lg:mb-8">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="flex flex-col items-center justify-center py-5 px-6 text-center relative border-r border-white/15 max-lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(4n)]:border-r-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      className="font-bold leading-none mb-1"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
                        color: '#D4AF37',
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-xs uppercase tracking-[0.2em]"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll Indicator ── */}
      <AnimatePresence>
        {textVisible && (
          <motion.div
            className="absolute bottom-32 right-10 hidden lg:flex flex-col items-center gap-2 z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <span
              className="uppercase tracking-[0.3em] mb-3"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.3)',
                writingMode: 'vertical-rl',
              }}
            >
              Scroll
            </span>
            <motion.div
              className="w-px bg-gradient-to-b from-white/30 to-transparent"
              style={{ height: 64 }}
              animate={{ scaleY: [0, 1, 0], originY: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Magnetic Button Component ── */
interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function MagneticButton({ href, children, primary, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative z-40 pointer-events-auto"
    >
      <Link
        ref={ref}
        href={href}
        onClick={handleClick}
        className="group inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 relative z-40 cursor-pointer"
        style={{
          fontFamily: 'var(--font-display)',
          ...(primary
            ? {
                background: 'linear-gradient(135deg, #C0392B 0%, #E74C3C 50%, #FF6B4A 100%)',
                color: '#FFFFFF',
                border: '1px solid transparent',
                boxShadow: '0 4px 20px rgba(192, 57, 43, 0.4)',
              }
            : {
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.4)',
              }),
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}
