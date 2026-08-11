'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function AccountProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />

      <main className="pt-28 pb-20">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-10 border-b border-border pb-6">
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-2">
              User Profile
            </span>
            <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight uppercase">
              My Account
            </h1>
          </div>

          <div className="bg-white border border-border p-8 space-y-6">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <div className="w-16 h-16 bg-black text-white font-display font-bold text-xl flex items-center justify-center rounded-full">
                {(user?.user_metadata?.full_name || user?.email || 'U').substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="font-display font-bold text-xl">{user?.user_metadata?.full_name || 'Valued Customer'}</h2>
                <p className="font-body text-xs text-muted-foreground">{user?.email || 'Guest User'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/orders" className="p-6 border border-border hover:border-gold transition-colors space-y-2">
                <Icon name="TruckIcon" size={24} className="text-gold" />
                <h3 className="font-display font-bold text-base uppercase">My Orders</h3>
                <p className="font-body text-xs text-muted-foreground">Track shipments, view history & invoices.</p>
              </Link>

              <Link href="/wishlist" className="p-6 border border-border hover:border-gold transition-colors space-y-2">
                <Icon name="HeartIcon" size={24} className="text-gold" />
                <h3 className="font-display font-bold text-base uppercase">Saved Fits (Wishlist)</h3>
                <p className="font-body text-xs text-muted-foreground">View and purchase your bookmarked products.</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
