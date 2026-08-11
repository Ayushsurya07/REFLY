'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { PRODUCTS_LIST } from '@/lib/productsData';
import { useCart } from '@/contexts/CartContext';

export default function WishlistPage() {
  const { addToCart } = useCart();
  const wishlistProducts = PRODUCTS_LIST.slice(0, 3); // Demo wishlist items

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />

      <main className="pt-28 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-2">
              Saved Fits
            </span>
            <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight uppercase">
              My Wishlist ({wishlistProducts.length})
            </h1>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="bg-white border border-border p-4 group">
                <div className="aspect-product relative overflow-hidden bg-muted mb-4">
                  <AppImage
                    src={product.images[0]?.src || ''}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="400px"
                  />
                  <button
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 z-10 w-9 h-9 bg-white flex items-center justify-center text-foreground hover:text-red-600 transition-colors shadow-sm"
                  >
                    <Icon name="XMarkIcon" size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  <span className="font-display text-[10px] font-semibold tracking-widest uppercase text-muted-foreground block capitalize">
                    {product.category} · {product.fit}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-display font-bold text-base hover:text-gold transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="price-tag text-base font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] font-display font-semibold text-green-700 bg-green-50 px-1.5 py-0.5">{product.discount}% OFF</span>
                  </div>
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        variant: product.colors[0]?.name || 'Standard',
                        size: product.sizes[0]?.label || '32',
                        price: product.price,
                        mrp: product.mrp,
                        image: product.images[0]?.src || '',
                      })
                    }
                    className="btn-primary w-full py-3 text-xs mt-3 block text-center"
                  >
                    Move to Bag →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
