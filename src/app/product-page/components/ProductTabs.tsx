'use client';
import React, { useState } from 'react';

interface ProductTabsProps {
  product: typeof import('./ProductPageClient').productData;
}

const TABS = ['Description', 'Fabric & Care', 'Shipping & Returns', 'Reviews'];

const reviews = [
  { id: 1, name: 'Arjun M.', city: 'Mumbai', rating: 5, date: 'Dec 2025', text: 'Absolutely premium quality. The Japanese denim feels incredible and the slim cut is perfect for my build. Worth every rupee.', verified: true, size: 'W32' },
  { id: 2, name: 'Vikram N.', city: 'Bangalore', rating: 5, date: 'Nov 2025', text: 'Best jeans I\'ve bought from an Indian brand. The finish is impeccable and delivery was super fast.', verified: true, size: 'W34' },
  { id: 3, name: 'Rahul S.', city: 'Delhi', rating: 4, date: 'Nov 2025', text: 'Great quality and fit. Runs slightly slim so size up if you\'re between sizes. The color is richer than the photos.', verified: true, size: 'W34' },
  { id: 4, name: 'Karthik I.', city: 'Chennai', rating: 5, date: 'Oct 2025', text: 'Refly has changed my perception of Indian fashion. These jeans are on par with international luxury brands.', verified: true, size: 'W32' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'star-filled' : 'star-empty'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('Description');

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 border-t border-border">
      {/* Tab Nav */}
      <div className="flex gap-0 border-b border-border mb-10 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-6 py-4 font-display text-xs font-semibold tracking-widest uppercase transition-all duration-200 border-b-2 ${
              activeTab === tab
                ? 'border-gold text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Description' && (
        <div className="max-w-3xl">
          <p className="font-body text-base text-foreground leading-relaxed mb-6">{product.description}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 border border-border">
              <h3 className="font-display font-bold text-sm tracking-widest uppercase mb-4">Features</h3>
              <ul className="space-y-3 font-body text-sm text-muted-foreground">
                {['5-pocket construction', 'YKK zipper hardware', 'Selvedge ID on coin pocket', 'Reinforced stress points', 'Branded leather patch', 'Contrast stitching'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 border border-border">
              <h3 className="font-display font-bold text-sm tracking-widest uppercase mb-4">Details</h3>
              <dl className="space-y-3 font-body text-sm">
                {[
                  ['Fit', product.fit],
                  ['Rise', 'Mid Rise'],
                  ['Leg Opening', '13.5"'],
                  ['Inseam (Regular)', '30"'],
                  ['HSN Code', product.hsnCode],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-border/50 pb-2">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Fabric & Care' && (
        <div className="max-w-3xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display font-bold text-sm tracking-widest uppercase mb-6">Fabric Composition</h3>
            <dl className="space-y-4 font-body text-sm">
              {Object.entries(product.fabric).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1 border-b border-border/50 pb-3">
                  <dt className="font-display font-semibold text-xs tracking-widest uppercase text-muted-foreground">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </dt>
                  <dd className="text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm tracking-widest uppercase mb-6">Care Instructions</h3>
            <ul className="space-y-3 font-body text-sm">
              {product.care.map((instruction) => (
                <li key={instruction} className="flex items-start gap-3 border-b border-border/50 pb-3">
                  <div className="w-5 h-5 bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'Shipping & Returns' && (
        <div className="max-w-3xl space-y-8">
          <div>
            <h3 className="font-display font-bold text-sm tracking-widest uppercase mb-6">Shipping</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { label: 'Standard Delivery', detail: product.shipping.standardDays, price: 'FREE above ₹999' },
                { label: 'Express Delivery', detail: product.shipping.expressDays, price: `₹${product.shipping.expressPrice}` },
                { label: 'Cash on Delivery', detail: 'All cities in India', price: `+₹${product.shipping.codCharge}` },
                { label: 'Order Tracking', detail: 'Real-time updates via SMS/WhatsApp', price: 'Included' },
              ].map((item) => (
                <div key={item.label} className="p-5 border border-border">
                  <p className="font-display font-semibold text-sm mb-1">{item.label}</p>
                  <p className="font-body text-xs text-muted-foreground mb-2">{item.detail}</p>
                  <p className="font-display font-bold text-xs text-gold">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm tracking-widest uppercase mb-6">Returns & Exchanges</h3>
            <div className="space-y-4 font-body text-sm">
              {[
                'Easy 7-day returns from delivery date',
                'Items must be unworn, unwashed, with tags attached',
                'Free pickup from your doorstep',
                'Refund processed within 5-7 business days',
                'Exchange for different size/color available',
                'Defective items replaced at no cost',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-gold rounded-full flex-shrink-0 mt-2" />
                  <span className="text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div className="max-w-4xl">
          {/* Summary */}
          <div className="flex flex-col lg:flex-row gap-10 mb-10 p-8 border border-border">
            <div className="text-center lg:text-left">
              <p className="font-display font-bold text-6xl leading-none">{product.rating}</p>
              <div className="flex gap-0.5 justify-center lg:justify-start mt-2">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-5 h-5 star-filled" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground mt-2">{product.reviewCount} verified reviews</p>
            </div>
            <div className="flex-1 space-y-2">
              {[5,4,3,2,1].map((star) => {
                const pct = star === 5 ? 78 : star === 4 ? 16 : star === 3 ? 4 : star === 2 ? 1 : 1;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="font-body text-xs w-4">{star}</span>
                    <div className="flex-1 h-1.5 bg-muted overflow-hidden">
                      <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-body text-xs text-muted-foreground w-8">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-display font-bold text-sm">{review.name}</span>
                      <span className="font-body text-xs text-muted-foreground">{review.city}</span>
                      {review.verified && (
                        <span className="font-body text-xs text-green-600">✓ Verified</span>
                      )}
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <div className="text-right">
                    <p className="font-body text-xs text-muted-foreground">{review.date}</p>
                    <p className="font-display text-xs font-semibold text-gold mt-1">Size: {review.size}</p>
                  </div>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}