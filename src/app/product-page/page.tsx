import React from 'react';
import type { Metadata } from 'next';
import ProductPageClient from './components/ProductPageClient';

export const metadata: Metadata = {
  title: "Obsidian Slim Jeans — Premium Men's Jeans | Refly",
  description:
    'Refly Obsidian Slim Jeans crafted from Japanese selvedge denim. Precision cut, premium fit. ₹2,999. Free delivery across India. Easy 7-day returns.',
  alternates: { canonical: 'https://refly.in/product-page' },
};

export default function ProductPage() {
  return <ProductPageClient />;
}
