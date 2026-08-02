'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  discount: number;
  image: string;
  tag?: string;
  colSpan?: string;
  rowSpan?: string;
}

// BENTO GRID AUDIT:
// Array has 4 cards: [ObsidianJeans, UtilityCargo, SlateFormal, LinenEase]
// Row 1: [col-1..2: ObsidianJeans cs-2 rs-2] [col-3: UtilityCargo cs-1 rs-1]
// Row 2: [col-3: SlateFormal cs-1 rs-1]
// Row 3: [col-1..3: LinenEase cs-3 rs-1]
// Placed 4/4 cards ✓

const featuredProducts: Product[] = [
  {
    id: 'obsidian-jeans',
    name: 'Obsidian Slim Jeans',
    category: 'Jeans',
    price: 2999,
    mrp: 4999,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    tag: 'Best Seller',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-2',
  },
  {
    id: 'utility-cargo',
    name: 'Utility Cargo Pants',
    category: 'Cargo',
    price: 3499,
    mrp: 5499,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    tag: 'New',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
  },
  {
    id: 'slate-formal',
    name: 'Slate Formal Trousers',
    category: 'Formal',
    price: 2499,
    mrp: 3999,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4d42?w=600&q=80',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
  },
  {
    id: 'linen-ease',
    name: 'Linen Ease Trousers',
    category: 'Linen',
    price: 2799,
    mrp: 4499,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200&q=80',
    tag: 'Limited',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-1',
  },
];

function ProductCard({ product, large = false }: { product: Product; large?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="product-card group relative overflow-hidden bg-accent"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform',
      }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${large ? 'h-[500px] lg:h-[600px]' : 'h-[280px] lg:h-[320px]'}`}>
        <AppImage
          src={product.image}
          alt={`${product.name} — premium men's ${product.category.toLowerCase()} in dark moody studio, atmospheric lighting`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={large ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        {product.tag && (
          <div className="absolute top-4 left-4 z-10">
            <span className="tag-label bg-gold text-gold-foreground px-3 py-1 text-[10px]">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-4 right-4 z-10 w-10 h-10 glass-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:border-gold"
        >
          <Icon
            name="HeartIcon"
            size={18}
            variant={wishlisted ? 'solid' : 'outline'}
            className={wishlisted ? 'text-gold' : 'text-white'}
          />
        </button>

        {/* Quick Add (visible on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-10" style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <Link
            href="/product-page"
            className="btn-primary w-full text-center block text-xs"
          >
            View Product
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">
              {product.category}
            </p>
            <h3 className="font-display font-bold text-sm lg:text-base leading-tight">
              {product.name}
            </h3>
          </div>
          <Link href="/product-page" aria-label="View product details">
            <Icon name="ArrowUpRightIcon" size={18} className="text-muted-foreground hover:text-gold transition-colors" />
          </Link>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="price-tag text-base font-bold">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-xs text-muted-foreground line-through font-body">₹{product.mrp.toLocaleString('en-IN')}</span>
          <span className="tag-label bg-green-50 text-green-700 text-[10px] px-2 py-0.5">{product.discount}% OFF</span>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.reveal-up, .reveal-left');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="featured" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 lg:mb-16 gap-6">
          <div className="reveal-up stagger-1">
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-3">
              Featured
            </span>
            <h2 className="section-heading">
              Crafted for<br />
              <span className="italic text-muted-foreground">the bold.</span>
            </h2>
          </div>
          <div className="reveal-up stagger-2 flex flex-col items-start lg:items-end gap-3">
            <p className="font-body text-muted-foreground max-w-xs text-sm leading-relaxed lg:text-right">
              Each piece is engineered with premium fabrics sourced from the finest mills.
            </p>
            <Link
              href="/collections"
              className="font-display text-sm font-semibold tracking-widest uppercase animated-underline hover:text-gold transition-colors"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Bento Grid
            Row 1: [col-1..2: ObsidianJeans cs-2 rs-2] [col-3: UtilityCargo cs-1 rs-1]
            Row 2: [col-3: SlateFormal cs-1 rs-1]
            Row 3: [col-1..3: LinenEase cs-3 rs-1]
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
          {/* Card 1 — col-span-2 row-span-2 */}
          <div className={`${featuredProducts[0].colSpan} ${featuredProducts[0].rowSpan} reveal-up stagger-1`}>
            <ProductCard product={featuredProducts[0]} large />
          </div>

          {/* Card 2 — col-span-1 row-span-1 */}
          <div className={`${featuredProducts[1].colSpan} ${featuredProducts[1].rowSpan} reveal-up stagger-2`}>
            <ProductCard product={featuredProducts[1]} />
          </div>

          {/* Card 3 — col-span-1 row-span-1 */}
          <div className={`${featuredProducts[2].colSpan} ${featuredProducts[2].rowSpan} reveal-up stagger-3`}>
            <ProductCard product={featuredProducts[2]} />
          </div>

          {/* Card 4 — col-span-3 row-span-1 */}
          <div className={`${featuredProducts[3].colSpan} ${featuredProducts[3].rowSpan} reveal-up stagger-4`}>
            <div className="product-card group relative overflow-hidden bg-accent h-[280px]">
              <AppImage
                src={featuredProducts[3].image}
                alt={`${featuredProducts[3].name} — premium linen men's trousers, bright airy natural light studio, clean minimal background`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-2">
                  {featuredProducts[3].category}
                </span>
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-white mb-3">
                  {featuredProducts[3].name}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="price-tag text-white text-lg">₹{featuredProducts[3].price.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-white/50 line-through">₹{featuredProducts[3].mrp.toLocaleString('en-IN')}</span>
                  <span className="tag-label bg-gold text-gold-foreground text-[10px] px-2 py-1">
                    {featuredProducts[3].discount}% OFF
                  </span>
                  <Link
                    href="/product-page"
                    className="ml-auto btn-gold text-xs px-6 py-3"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Trust Bar */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 reveal-up stagger-5">
          {[
            { icon: '🚚', text: 'Free Delivery Across India' },
            { icon: '↩', text: '7-Day Easy Returns' },
            { icon: '💳', text: 'Cash on Delivery Available' },
            { icon: '⚡', text: 'Ships within 24 Hours' },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 p-4 border border-border hover:border-gold transition-colors duration-300"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-body text-xs font-medium text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}