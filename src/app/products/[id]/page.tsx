import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ProductGallery from '@/app/product-page/components/ProductGallery';
import ProductInfo from '@/app/product-page/components/ProductInfo';
import ProductTabs from '@/app/product-page/components/ProductTabs';
import RelatedProducts from '@/app/product-page/components/RelatedProducts';
import { getProductById, PRODUCTS_LIST } from '@/lib/productsData';

// Pre-generate all product routes at build time to eliminate per-request data lookups
export async function generateStaticParams() {
  return PRODUCTS_LIST.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = getProductById(id);
    if (!product) return { title: 'Product Not Found | REFLY' };
    return {
      title: `${product.name} | REFLY`,
      description: product.description || "Refly Premium Men's Bottom Wear",
    };
  } catch {
    return {
      title: 'Product | REFLY',
      description: "Refly Premium Men's Bottom Wear",
    };
  }
}

function ProductPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 animate-pulse">
      <div className="lg:col-span-7">
        <div className="aspect-[4/5] bg-white/[0.06]" />
        <div className="flex gap-3 mt-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-20 h-20 bg-white/[0.04]" />
          ))}
        </div>
      </div>
      <div className="lg:col-span-5 space-y-4 pt-4">
        <div className="h-3 bg-white/[0.06] w-1/3" />
        <div className="h-8 bg-white/[0.06] w-4/5" />
        <div className="h-4 bg-white/[0.06] w-1/4" />
        <div className="h-16 bg-white/[0.06]" />
        <div className="h-12 bg-white/[0.06] w-full" />
        <div className="h-12 bg-white/[0.06] w-full" />
      </div>
    </div>
  );
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);

  // Unknown product → show proper 404 page rather than crashing or rendering stale data
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-body text-muted-foreground mb-8"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/collections" className="hover:text-foreground transition-colors">
              Collections
            </Link>
            <span aria-hidden="true">/</span>
            <a
              href={`/collections?category=${product.category.toLowerCase()}`}
              className="hover:text-foreground transition-colors capitalize"
            >
              {product.category}
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-foreground font-semibold" aria-current="page">
              {product.name}
            </span>
          </nav>

          <Suspense fallback={<ProductPageSkeleton />}>
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
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
