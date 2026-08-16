'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Category, SortOption, FilterState } from './CollectionsClient';

interface Product {
  id: string;
  name: string;
  category: Category;
  subcategory?: string;
  price: number;
  mrp: number;
  discount: number;
  image: string;
  tag?: string;
  inStock: boolean;
  colors: string[];
  fit: string;
}

const allProducts: Product[] = [
  // CARGOS
  {
    id: 'zip-cargos',
    name: 'Tactical Zip Cargo Pants',
    category: 'cargos',
    subcategory: 'Zip cargos',
    price: 3499,
    mrp: 5499,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    tag: 'New',
    inStock: true,
    colors: ['#4a4a3a', '#2d2d2d'],
    fit: 'Relaxed',
  },
  {
    id: 'patch-pocket-cargo',
    name: 'Utility Patch Pocket Cargo',
    category: 'cargos',
    subcategory: 'patch pocket cargo',
    price: 3999,
    mrp: 5999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
    inStock: true,
    colors: ['#000000', '#3a3a2a'],
    fit: 'Tapered',
  },
  {
    id: 'elastic-cargo',
    name: 'Elastic Comfort Cargo',
    category: 'cargos',
    subcategory: 'elastic cargo',
    price: 2999,
    mrp: 4499,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
    inStock: true,
    colors: ['#2c3e50', '#1a1a1a'],
    fit: 'Regular',
  },
  {
    id: 'cargo-shorts-item',
    name: 'Rugged Cargo Shorts',
    category: 'cargos',
    subcategory: 'cargo shorts',
    price: 1999,
    mrp: 2999,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    inStock: true,
    colors: ['#4a4a3a', '#1a1a1a'],
    fit: 'Relaxed',
  },
  {
    id: 'loose-fit-cargo',
    name: 'Loose Fit Combat Cargo',
    category: 'cargos',
    subcategory: 'loose fit cargo',
    price: 3799,
    mrp: 5799,
    discount: 34,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
    tag: 'Best Seller',
    inStock: true,
    colors: ['#2d2d2d', '#3a3a2a'],
    fit: 'Relaxed',
  },

  // LINEN
  {
    id: 'linen-loose-fit',
    name: 'Linen Loose Fit Trousers',
    category: 'linen',
    subcategory: 'lenin loose fit',
    price: 2799,
    mrp: 4499,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
    tag: 'Limited',
    inStock: true,
    colors: ['#d4c5a9', '#c8b99a'],
    fit: 'Relaxed',
  },
  {
    id: 'linen-chinos',
    name: 'Tailored Linen Chinos',
    category: 'linen',
    subcategory: 'Lenin chinos',
    price: 2999,
    mrp: 4999,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80',
    inStock: true,
    colors: ['#e8dcc8', '#b8a898'],
    fit: 'Slim',
  },
  {
    id: 'linen-shorts-item',
    name: 'Resort Linen Shorts',
    category: 'linen',
    subcategory: 'Lenin shorts',
    price: 1899,
    mrp: 2999,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80',
    inStock: true,
    colors: ['#c8b99a', '#8b7355'],
    fit: 'Regular',
  },
  {
    id: 'zip-pocket-linen',
    name: 'Zip Pocket Linen Pants',
    category: 'linen',
    subcategory: 'zip pocket lenin',
    price: 3199,
    mrp: 4999,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
    inStock: true,
    colors: ['#d4c5a9', '#1a1a1a'],
    fit: 'Regular',
  },

  // COTTON PANTS
  {
    id: 'cotton-chinos',
    name: 'Classic Cotton Chinos',
    category: 'cotton-pants',
    subcategory: 'Cotton chinos',
    price: 2299,
    mrp: 3799,
    discount: 39,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80',
    inStock: true,
    colors: ['#c8a882', '#8b6914'],
    fit: 'Regular',
  },
  {
    id: 'china-bold',
    name: 'China Bold Heavy Twill',
    category: 'cotton-pants',
    subcategory: 'China bold',
    price: 2799,
    mrp: 4299,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&q=80',
    tag: 'Hot',
    inStock: true,
    colors: ['#2f4f4f', '#1a1a1a'],
    fit: 'Slim',
  },
  {
    id: 'cotton-shorts-item',
    name: 'Relaxed Cotton Shorts',
    category: 'cotton-pants',
    subcategory: 'Cotton shorts',
    price: 1699,
    mrp: 2599,
    discount: 34,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80',
    inStock: true,
    colors: ['#c8a882', '#2c3e50'],
    fit: 'Relaxed',
  },

  // SHORTS
  {
    id: 'poly-shorts',
    name: 'Performance Polyester Shorts',
    category: 'shorts',
    subcategory: 'Polyester shorts',
    price: 1499,
    mrp: 2499,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
    tag: 'New',
    inStock: true,
    colors: ['#1a1a1a', '#2c2c2c'],
    fit: 'Tapered',
  },
  {
    id: 'shorts-cargo',
    name: 'Heavy Duty Cargo Shorts',
    category: 'shorts',
    subcategory: 'Cargo shorts',
    price: 1799,
    mrp: 2799,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
    inStock: true,
    colors: ['#4a4a3a', '#2d2d2d'],
    fit: 'Relaxed',
  },
  {
    id: 'shorts-linen',
    name: 'Breezy Linen Drawstring Shorts',
    category: 'shorts',
    subcategory: 'Linen shorts',
    price: 1699,
    mrp: 2699,
    discount: 37,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80',
    inStock: true,
    colors: ['#c8b99a', '#8b7355'],
    fit: 'Regular',
  },
  {
    id: 'shorts-cotton',
    name: 'Everyday Cotton Shorts',
    category: 'shorts',
    subcategory: 'Cotton shorts',
    price: 1399,
    mrp: 2199,
    discount: 36,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80',
    inStock: true,
    colors: ['#808080', '#1a1a1a'],
    fit: 'Regular',
  },

  // FORMAL
  {
    id: 'slate-formal',
    name: 'Slate Formal Trousers',
    category: 'formal',
    subcategory: 'Formal trousers',
    price: 2499,
    mrp: 3999,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4d42?w=600&q=80',
    inStock: true,
    colors: ['#708090', '#2f2f2f'],
    fit: 'Slim',
  },
  {
    id: 'midnight-formal',
    name: 'Midnight Formal Pants',
    category: 'formal',
    subcategory: 'Slim fit formal',
    price: 2799,
    mrp: 4499,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80',
    inStock: true,
    colors: ['#0d0d0d', '#1a1a2e'],
    fit: 'Regular',
  },
];

interface ProductGridProps {
  category: Category;
  sortBy: SortOption;
  filters: FilterState;
}

function CollectionProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-background"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
      }}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: hovered
          ? 'transform 0.1s ease'
          : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        willChange: 'transform',
      }}
    >
      {/* Image Container */}
      <div className="aspect-product relative overflow-hidden bg-muted">
        <AppImage
          src={product.image}
          alt={`${product.name} — premium men's ${product.category} in dark moody studio lighting, atmospheric fashion photography`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.tag && (
            <span className="tag-label bg-gold text-gold-foreground text-[10px] px-2 py-1">
              {product.tag}
            </span>
          )}
          {!product.inStock && (
            <span className="tag-label bg-foreground text-primary-foreground text-[10px] px-2 py-1">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
        >
          <Icon
            name="HeartIcon"
            size={16}
            variant={wishlisted ? 'solid' : 'outline'}
            className={wishlisted ? 'text-gold' : 'text-foreground'}
          />
        </button>

        {/* Quick Add */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 z-10"
          style={{
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Link
            href={`/products/${product.id}`}
            className={`btn-primary w-full text-center block text-xs py-3 ${!product.inStock ? 'opacity-50 pointer-events-none' : ''}`}
          >
            {product.inStock ? 'Quick View' : 'Notify Me'}
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-4 pb-6">
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1 min-w-0 pr-2">
            <p className="font-display text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">
              {product.subcategory || product.category} · {product.fit}
            </p>
            <Link href={`/products/${product.id}`}>
              <h3 className="font-display font-bold text-sm leading-tight hover:text-gold transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
          <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
            <Icon
              name="ArrowUpRightIcon"
              size={16}
              className="text-muted-foreground hover:text-gold transition-colors flex-shrink-0 mt-1"
            />
          </Link>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1.5 my-2">
          {product.colors.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full border border-border/50"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-2">
          <span className="price-tag text-sm font-bold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-muted-foreground line-through font-body">
            ₹{product.mrp.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] font-display font-semibold text-green-700 bg-green-50 px-1.5 py-0.5">
            {product.discount}% OFF
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid({ category, sortBy, filters }: ProductGridProps) {
  const filtered = allProducts
    .filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (filters.subcategories && filters.subcategories.length > 0) {
        if (!p.subcategory) return false;
        const pSubLower = p.subcategory.toLowerCase().trim();
        const matchesSub = filters.subcategories.some((s) => s.toLowerCase().trim() === pSubLower);
        if (!matchesSub) return false;
      }
      if (filters.inStockOnly && !p.inStock) return false;
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (filters.sizes.length > 0) return true; // sizes handled server-side in real app
      if (filters.fits.length > 0 && !filters.fits.includes(p.fit)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'discount':
          return b.discount - a.discount;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="font-display font-bold text-xl text-muted-foreground">No products found</p>
        <p className="font-body text-sm text-muted-foreground">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-body text-sm text-muted-foreground mb-6">{filtered.length} products</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filtered.map((product) => (
          <CollectionProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
