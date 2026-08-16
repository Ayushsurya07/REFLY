'use client';

import React from 'react';

function SkeletonCard() {
  return (
    <div className="overflow-hidden animate-pulse">
      <div className="aspect-product bg-white/[0.06] relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>
      <div className="pt-4 space-y-2">
        <div className="h-3 bg-white/[0.06] w-2/3 rounded-sm" />
        <div className="h-4 bg-white/[0.06] w-4/5 rounded-sm" />
        <div className="flex items-center gap-2 pt-1">
          <div className="h-4 bg-white/[0.06] w-16 rounded-sm" />
          <div className="h-3 bg-white/[0.06] w-12 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export default function ProductSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
