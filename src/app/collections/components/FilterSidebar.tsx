'use client';
import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { FilterState } from './CollectionsClient';

const SIZES = ['28', '30', '32', '34', '36', '38', '40', '42'];
const FITS = ['Slim', 'Regular', 'Relaxed', 'Tapered'];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({ filters, onChange, isOpen, onClose }: FilterSidebarProps) {
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

  const clearAll = () => onChange({ sizes: [], priceMin: 0, priceMax: 10000, fits: [], inStockOnly: false });

  const SidebarContent = () => (
    <div className="space-y-8">
      {/* Clear */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-base tracking-wide uppercase">Filters</h2>
        <button
          onClick={clearAll}
          className="font-display text-xs text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase"
        >
          Clear All
        </button>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-display font-semibold text-xs tracking-widest uppercase mb-4">Availability</h3>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div
            className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
              filters.inStockOnly ? 'bg-primary border-primary' : 'border-border group-hover:border-foreground'
            }`}
            onClick={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
          >
            {filters.inStockOnly && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="font-body text-sm">In Stock Only</span>
        </label>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-display font-semibold text-xs tracking-widest uppercase mb-4">Price Range</h3>
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
        <h3 className="font-display font-semibold text-xs tracking-widest uppercase mb-4">Waist Size</h3>
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
                  filters.fits.includes(fit) ? 'bg-primary border-primary' : 'border-border group-hover:border-foreground'
                }`}
                onClick={() => toggleFit(fit)}
              >
                {filters.fits.includes(fit) && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
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
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-36">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto p-6 lg:hidden">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display font-bold text-lg">Filters</span>
              <button onClick={onClose} aria-label="Close filters">
                <Icon name="XMarkIcon" size={24} />
              </button>
            </div>
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}