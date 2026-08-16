'use client';
import React, { useState, useRef, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-28 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1cb6b7c0c-1776022491521.png"
          alt="Premium fashion store interior — dark moody atmosphere, deep shadows, dramatic lighting, minimalist luxury retail environment"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center reveal-up">
          <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-6">
            Join the Movement
          </span>
          <h2 className="section-heading text-white mb-6">
            First access.
            <br />
            <span className="italic text-white/40">Exclusive drops.</span>
          </h2>
          <p className="font-body text-white/60 mb-10 leading-relaxed">
            Get early access to new collections, exclusive member discounts, and style guides. No
            spam. Unsubscribe anytime.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                aria-label="Email address for newsletter"
                className="flex-1 px-5 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm outline-none focus:border-gold transition-colors backdrop-blur-sm"
              />

              <button type="submit" className="btn-gold px-8 py-4 flex-shrink-0">
                Subscribe
              </button>
            </form>
          ) : (
            <div className="p-6 border border-gold/30 bg-gold/10 max-w-md mx-auto">
              <p className="font-display font-bold text-white text-lg mb-1">Welcome to Refly.</p>
              <p className="font-body text-white/60 text-sm">
                You&apos;re on the list. Expect something special soon.
              </p>
            </div>
          )}

          <p className="font-body text-xs text-white/30 mt-4">
            Join 12,000+ members · No spam · ₹500 off your first order
          </p>
        </div>
      </div>
    </section>
  );
}
