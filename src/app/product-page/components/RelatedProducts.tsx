'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const relatedProducts = [
  { id: 'indigo-raw', name: 'Indigo Raw Denim', category: 'Jeans', price: 3499, mrp: 5499, discount: 36, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80' },
  { id: 'utility-cargo', name: 'Utility Cargo Pants', category: 'Cargo', price: 3499, mrp: 5499, discount: 36, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80' },
  { id: 'slate-formal', name: 'Slate Formal Trousers', category: 'Formal', price: 2499, mrp: 3999, discount: 38, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4d42?w=600&q=80' },
  { id: 'linen-ease', name: 'Linen Ease Trousers', category: 'Linen', price: 2799, mrp: 4499, discount: 38, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80' },
];

export default function RelatedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="py-16 border-t border-border bg-muted/30">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-2">
              You May Also Like
            </span>
            <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight">Related Products</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="w-10 h-10 border border-border flex items-center justify-center hover:border-foreground transition-colors"
            >
              <Icon name="ChevronLeftIcon" size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="w-10 h-10 border border-border flex items-center justify-center hover:border-foreground transition-colors"
            >
              <Icon name="ChevronRightIcon" size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
        >
          {relatedProducts.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64 lg:w-72 group">
              <div className="aspect-product relative overflow-hidden bg-muted mb-4">
                <AppImage
                  src={product.image}
                  alt={`${product.name} — premium men's ${product.category.toLowerCase()} dark moody studio fashion photography`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="288px"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div
                  className="absolute bottom-0 left-0 right-0 p-3"
                  style={{ transform: 'translateY(100%)', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(100%)'; }}
                >
                  <Link href="/product-page" className="btn-primary w-full text-center block text-xs py-3">
                    View Product
                  </Link>
                </div>
              </div>
              <p className="font-display text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{product.category}</p>
              <Link href="/product-page">
                <h3 className="font-display font-bold text-sm hover:text-gold transition-colors">{product.name}</h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="price-tag text-sm font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                <span className="text-[10px] font-display font-semibold text-green-700">{product.discount}% OFF</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}