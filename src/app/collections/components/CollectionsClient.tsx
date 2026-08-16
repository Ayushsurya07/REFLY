'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import CollectionsBanner from './CollectionsBanner';
import ProductGrid from './ProductGrid';
import FilterSidebar from './FilterSidebar';

export type Category = 'all' | 'cargos' | 'linen' | 'cotton-pants' | 'shorts' | 'formal';
export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'discount';

export interface FilterState {
  sizes: string[];
  priceMin: number;
  priceMax: number;
  fits: string[];
  subcategories: string[];
  inStockOnly: boolean;
}

export default function CollectionsClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  useEffect(() => {
    if (categoryParam) {
      let cat = categoryParam.toLowerCase();
      if (cat === 'cargo') cat = 'cargos';
      const validCategories: Category[] = [
        'all',
        'cargos',
        'linen',
        'cotton-pants',
        'shorts',
        'formal',
      ];
      if (validCategories.includes(cat as Category)) {
        setActiveCategory(cat as Category);
      }
    }
  }, [categoryParam]);

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    priceMin: 0,
    priceMax: 10000,
    fits: [],
    subcategories: [],
    inStockOnly: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCategoryChange = (c: Category) => {
    setActiveCategory(c);
    setFilters((prev) => ({ ...prev, subcategories: [] }));
  };

  const activeFilterCount =
    filters.sizes.length +
    filters.fits.length +
    (filters.subcategories ? filters.subcategories.length : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceMax < 10000 || filters.priceMin > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Header />
      <main className="pt-20">
        {/* Banner */}
        <CollectionsBanner activeCategory={activeCategory} />

        {/* Category Tabs */}
        <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />

        {/* Layout */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className={`flex items-center gap-2.5 font-display text-xs font-semibold tracking-widest uppercase border px-5 py-3.5 transition-all duration-200 cursor-pointer ${
                sidebarOpen
                  ? 'bg-foreground text-background border-foreground shadow-md'
                  : 'border-border hover:border-foreground bg-background text-foreground'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 4h18M7 12h10M11 20h2"
                />
              </svg>
              <span>{sidebarOpen ? 'Hide Filters' : 'Filters'}</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 text-[10px] px-1.5 py-0.5 font-bold bg-gold text-black rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-4">
              <span className="font-body text-sm text-muted-foreground hidden lg:block">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products"
                className="font-display text-xs font-semibold tracking-wide uppercase border border-border px-4 py-3 bg-background hover:border-foreground transition-colors outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              activeCategory={activeCategory}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              <ProductGrid category={activeCategory} sortBy={sortBy} filters={filters} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Cargos', value: 'cargos' },
  { label: 'Linen', value: 'linen' },
  { label: 'Cotton Pants', value: 'cotton-pants' },
  { label: 'Shorts', value: 'shorts' },
  { label: 'Formal', value: 'formal' },
];

function CategoryTabs({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div className="border-b border-border sticky top-16 lg:top-20 z-40 bg-white/95 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex gap-0 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onChange(cat.value)}
              className={`flex-shrink-0 px-6 py-4 font-display text-xs font-semibold tracking-widest uppercase transition-all duration-200 border-b-2 ${
                active === cat.value
                  ? 'border-gold text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
