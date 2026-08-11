import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ProductGallery from '@/app/product-page/components/ProductGallery';
import ProductInfo from '@/app/product-page/components/ProductInfo';
import ProductTabs from '@/app/product-page/components/ProductTabs';
import RelatedProducts from '@/app/product-page/components/RelatedProducts';
import { getProductById } from '@/lib/productsData';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  return {
    title: `${product.name} | REFLY`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-body text-muted-foreground mb-8">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <span>/</span>
            <a href="/collections" className="hover:text-foreground transition-colors">Collections</a>
            <span>/</span>
            <a href={`/collections?category=${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors capitalize">{product.category}</a>
            <span>/</span>
            <span className="text-foreground font-semibold">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} />
            </div>
            <div className="lg:col-span-5">
              <ProductInfo product={product as any} />
            </div>
          </div>

          <ProductTabs product={product as any} />
          <RelatedProducts currentId={product.id} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
