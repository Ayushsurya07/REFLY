'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { Category, FilterState } from './CollectionsClient';

const SIZES = ['28', '30', '32', '34', '36', '38', '40', '42'];
const FITS = ['Slim', 'Regular', 'Relaxed', 'Tapered'];

export const SUBCATEGORIES: Record<string, string[]> = {
  cargos: ['Zip cargos', 'patch pocket cargo', 'elastic cargo', 'cargo shorts', 'loose fit cargo'],
  linen: ['lenin loose fit', 'Lenin chinos', 'Lenin shorts', 'zip pocket lenin'],
  'cotton-pants': ['Cotton chinos', 'China bold', 'Cotton shorts'],
  shorts: ['Polyester shorts', 'Cargo shorts', 'Linen shorts', 'Cotton shorts'],
  formal: ['Formal trousers', 'Slim fit formal'],
};

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  activeCategory: Category;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  filters,
  onChange,
  activeCategory,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  if (!isOpen) return null;

  const toggleSize = (size: string) => {
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes });
  };

  const toggleFit = (fit: string) => {
    const fits = filters.fits.includes(fit)
      ? filters.fits.filter((f) => f !== fit)
      : [...filters.fits, fit];
    onChange({ ...filters, fits });
  };

  const toggleSubcategory = (subcat: string) => {
    const currentSubs = filters.subcategories || [];
    const subcategories = currentSubs.includes(subcat)
      ? currentSubs.filter((s) => s !== subcat)
      : [...currentSubs, subcat];
    onChange({ ...filters, subcategories });
  };

  const clearAll = () =>
    onChange({
      sizes: [],
      priceMin: 0,
      priceMax: 10000,
      fits: [],
      subcategories: [],
      inStockOnly: false,
    });

  const currentSubcategories = activeCategory !== 'all' ? SUBCATEGORIES[activeCategory] || [] : [];

  const SidebarContent = () => (
    <div className="space-y-8">
      {/* Header with Clear All button */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="font-display font-bold text-base tracking-wide uppercase">Filters</h2>
        <button
          onClick={clearAll}
          className="font-display text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
        >
          Clear All
        </button>
      </div>

      {/* Subcategories (only displayed when activeCategory !== 'all') */}
      {activeCategory !== 'all' && currentSubcategories.length > 0 && (
        <div className="border-b border-border pb-6">
          <h3 className="font-display font-semibold text-xs tracking-widest uppercase mb-4 text-gold">
            Subcategories
          </h3>
          <div className="space-y-2.5">
            {currentSubcategories.map((subcat) => (
              <label key={subcat} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-5 h-5 border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                    (filters.subcategories || []).includes(subcat)
                      ? 'bg-gold border-gold'
                      : 'border-border group-hover:border-foreground'
                  }`}
                  onClick={() => toggleSubcategory(subcat)}
                >
                  {(filters.subcategories || []).includes(subcat) && (
                    <svg
                      className="w-3 h-3 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="font-body text-sm capitalize">{subcat}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div>
        <h3 className="font-display font-semibold text-xs tracking-widest uppercase mb-4">
          Availability
        </h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
              filters.inStockOnly
                ? 'bg-primary border-primary'
                : 'border-border group-hover:border-foreground'
            }`}
            onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
          >
            {filters.inStockOnly && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <span className="font-body text-sm">In Stock Only</span>
        </label>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-display font-semibold text-xs tracking-widest uppercase mb-4">
          Price Range
        </h3>
        <div className="flex items-center justify-between mb-3">
          <span className="font-body text-sm">₹{filters.priceMin.toLocaleString('en-IN')}</span>
          <span className="font-body text-sm">₹{filters.priceMax.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min={0}
          max={10000}
          step={500}
          value={filters.priceMax}
          onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
          aria-label="Maximum price filter"
          className="w-full accent-gold h-1 cursor-pointer"
        />
        <div className="flex justify-between mt-1">
          <span className="font-body text-xs text-muted-foreground">₹0</span>
          <span className="font-body text-xs text-muted-foreground">₹10,000</span>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-display font-semibold text-xs tracking-widest uppercase mb-4">
          Waist Size
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`size-btn ${filters.sizes.includes(size) ? 'selected' : ''}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Fit */}
      <div>
        <h3 className="font-display font-semibold text-xs tracking-widest uppercase mb-4">Fit</h3>
        <div className="space-y-2">
          {FITS.map((fit) => (
            <label key={fit} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-5 h-5 border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                  filters.fits.includes(fit)
                    ? 'bg-primary border-primary'
                    : 'border-border group-hover:border-foreground'
                }`}
                onClick={() => toggleFit(fit)}
              >
                {filters.fits.includes(fit) && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="font-body text-sm">{fit}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop collapsible sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-36 bg-background border border-border p-6 shadow-sm">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile drawer */}
      <div className="lg:hidden">
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
        <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto p-6 shadow-xl">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
