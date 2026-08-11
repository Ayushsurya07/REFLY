'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';

export const productData = {
  id: 'obsidian-slim',
  name: 'Obsidian Slim Jeans',
  sku: 'RFY-JNS-001',
  category: 'Jeans',
  fit: 'Slim',
  price: 2999,
  mrp: 4999,
  discount: 40,
  gstRate: 18,
  hsnCode: '6203',
  rating: 4.9,
  reviewCount: 247,
  inStock: true,
  description: 'The Obsidian Slim Jeans represent the pinnacle of our denim craft. Woven from 12.5oz Japanese selvedge denim on vintage shuttle looms, each pair develops a unique character over time. The precision slim cut follows the natural line of the body without restriction.',
  colors: [
  { name: 'Jet Black', hex: '#1a1a1a', available: true },
  { name: 'Raw Indigo', hex: '#1a3a5c', available: true },
  { name: 'Washed Grey', hex: '#6b6b6b', available: false }],

  sizes: [
  { label: '28', available: true },
  { label: '30', available: true },
  { label: '32', available: true },
  { label: '34', available: true },
  { label: '36', available: true },
  { label: '38', available: false },
  { label: '40', available: false },
  { label: '42', available: false }],

  images: [
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_128850d4f-1773219576817.png", alt: 'Obsidian Slim Jeans front view — dark moody studio, deep shadows, dramatic lighting, premium denim texture' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_128850d4f-1773219576817.png", alt: 'Obsidian Slim Jeans side profile — atmospheric black studio, directional lighting highlighting fabric structure' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_1ef3e4a32-1773219583809.png", alt: 'Obsidian Slim Jeans detail close-up — selvedge denim weave texture in intimate studio lighting' },
  { src: "https://img.rocket.new/generatedImages/rocket_gen_img_128850d4f-1773219576817.png", alt: 'Obsidian Slim Jeans back view — clean minimal studio, precise tailoring showcase' }],

  fabric: {
    composition: '98% Japanese Cotton, 2% Elastane',
    weight: '12.5 oz',
    origin: 'Woven in Okayama, Japan',
    finish: 'Selvedge, Stone-washed',
    stretch: 'Minimal 2-way stretch'
  },
  care: [
  'Machine wash cold (30°C)',
  'Wash inside out to preserve color',
  'Do not bleach',
  'Tumble dry low or hang dry',
  'Iron on medium heat if needed',
  'Do not dry clean'],

  shipping: {
    freeAbove: 999,
    standardDays: '3-5 business days',
    expressDays: '1-2 business days',
    expressPrice: 99,
    cod: true,
    codCharge: 50
  },
  offer: 'Buy 2 Get 10% OFF · Buy 3 Get 20% OFF'
};

export default function ProductPageClient() {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Breadcrumb */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-4">
          <nav className="flex items-center gap-2 text-xs font-body text-muted-foreground" aria-label="Breadcrumb">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <span>/</span>
            <a href="/collections" className="hover:text-foreground transition-colors">Collections</a>
            <span>/</span>
            <a href={`/collections?category=${productData?.category?.toLowerCase()}`} className="hover:text-foreground transition-colors capitalize">{productData?.category}</a>
            <span>/</span>
            <span className="text-foreground">{productData?.name}</span>
          </nav>
        </div>

        {/* Product Layout */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <ProductGallery images={productData?.images} />
            <ProductInfo product={productData} />
          </div>
        </div>

        {/* Tabs: Description, Fabric, Care, Shipping */}
        <ProductTabs product={productData} />

        {/* Related Products */}
        <RelatedProducts />
      </main>
      <Footer />
    </div>);

}