'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
  {
    id: 1,
    name: 'Arjun Mehta',
    city: 'Mumbai',
    role: 'Creative Director',
    rating: 5,
    text: "The Obsidian Slim Jeans are unlike anything I've worn from an Indian brand. The fit is surgical, the fabric breaks in beautifully. Worth every rupee.",
    product: 'Obsidian Slim Jeans',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_138db166c-1773219578233.png',
  },
  {
    id: 2,
    name: 'Vikram Nair',
    city: 'Bangalore',
    role: 'Tech Entrepreneur',
    rating: 5,
    text: 'Ordered the Cargo Pants and received them next day. The quality rivals international brands at a fraction of the cost. Refly is the real deal.',
    product: 'Utility Cargo Pants',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cff5f65e-1773238201810.png',
  },
  {
    id: 3,
    name: 'Rahul Sharma',
    city: 'Delhi',
    role: 'Architect',
    rating: 5,
    text: 'The linen trousers are perfect for Delhi summers. Breathable, sharp, and they hold their shape all day. The packaging was premium too.',
    product: 'Linen Ease Trousers',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f5329f29-1783593094688.png',
  },
  {
    id: 4,
    name: 'Karthik Iyer',
    city: 'Chennai',
    role: 'Investment Banker',
    rating: 5,
    text: "Finally a formal trouser from India that doesn't look like it came from a mall. The Slate Formal is my go-to for client meetings now.",
    product: 'Slate Formal Trousers',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d18a329f-1772153757102.png',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'star-filled' : 'star-empty'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-muted">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6 reveal-up">
          <div>
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-3">
              Reviews
            </span>
            <h2 className="section-heading">
              Worn by
              <br />
              <span className="italic text-muted-foreground">thousands.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 reveal-up">
            <div className="text-center">
              <p className="font-display font-bold text-4xl">4.9</p>
              <StarRating rating={5} />
              <p className="font-body text-xs text-muted-foreground mt-1">500+ reviews</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 reveal-up">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`p-8 border transition-all duration-500 cursor-pointer ${
                active === i
                  ? 'border-gold bg-white shadow-lg'
                  : 'border-border bg-white/60 hover:border-gold/50'
              }`}
              onClick={() => setActive(i)}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-gold mb-4 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-body text-sm leading-relaxed text-foreground">{t.text}</p>
              </div>

              {/* Rating + Product */}
              <div className="flex items-center justify-between mb-6">
                <StarRating rating={t.rating} />
                <span className="font-display text-xs font-semibold tracking-wide text-gold uppercase">
                  {t.product}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={t.avatar}
                    alt={`${t.name} — customer from ${t.city}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">
                    {t.role} · {t.city}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="font-body text-xs text-muted-foreground">
                    Verified Purchase ✓
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-8 reveal-up">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View testimonial ${i + 1}`}
              className={`transition-all duration-300 ${
                active === i ? 'w-8 h-1 bg-gold' : 'w-2 h-1 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
