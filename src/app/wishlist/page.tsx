'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { createClient } from '@/lib/supabase/client';

interface WishlistItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_mrp: number;
  image_url: string | null;
  variant: string | null;
  created_at: string;
}

export default function WishlistPage() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const supabase = React.useMemo(() => createClient(), []);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setWishlist(data || []);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleRemove = async (id: string) => {
    setRemoving(id);
    try {
      await supabase.from('wishlist').delete().eq('id', id);
      setWishlist((prev) => prev.filter((w) => w.id !== id));
    } catch {
      /* silent */
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />

      <main className="pt-28 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-2">
              Saved Fits
            </span>
            <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight uppercase">
              My Wishlist {!loading && `(${wishlist.length})`}
            </h1>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <span className="w-8 h-8 border-2 border-border border-t-gold rounded-full animate-spin" />
            </div>
          )}

          {/* Not signed in */}
          {!loading && !user && (
            <div className="text-center py-20">
              <Icon name="HeartIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display font-bold text-xl mb-2">Sign in to view your wishlist</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">
                Create an account or sign in to save and manage your favourite products.
              </p>
              <Link href="/login" className="btn-primary text-xs px-8 py-3">
                Sign In →
              </Link>
            </div>
          )}

          {/* Empty wishlist */}
          {!loading && user && wishlist.length === 0 && (
            <div className="text-center py-20 bg-white border border-border">
              <Icon name="HeartIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display font-bold text-xl mb-2">Your Wishlist is Empty</h2>
              <p className="font-body text-sm text-muted-foreground mb-6">
                Browse our collections and heart products to save them here.
              </p>
              <Link href="/collections" className="btn-primary text-xs px-8 py-3">
                Explore Collections →
              </Link>
            </div>
          )}

          {/* Grid */}
          {!loading && user && wishlist.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-white border border-border p-4 group">
                  <div className="aspect-product relative overflow-hidden bg-muted mb-4">
                    {item.image_url ? (
                      <AppImage
                        src={item.image_url}
                        alt={item.product_name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="400px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="ShoppingBagIcon" size={32} className="text-muted-foreground" />
                      </div>
                    )}
                    <button
                      aria-label="Remove from wishlist"
                      onClick={() => handleRemove(item.id)}
                      disabled={removing === item.id}
                      className="absolute top-3 right-3 z-10 w-9 h-9 bg-white flex items-center justify-center text-foreground hover:text-red-600 transition-colors shadow-sm disabled:opacity-40"
                    >
                      {removing === item.id ? (
                        <span className="w-4 h-4 border border-border border-t-foreground rounded-full animate-spin" />
                      ) : (
                        <Icon name="XMarkIcon" size={16} />
                      )}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {item.variant && (
                      <span className="font-display text-[10px] font-semibold tracking-widest uppercase text-muted-foreground block capitalize">
                        {item.variant}
                      </span>
                    )}
                    <Link href={`/products/${item.product_id}`}>
                      <h3 className="font-display font-bold text-base hover:text-gold transition-colors">
                        {item.product_name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="price-tag text-base font-bold">
                        ₹{Number(item.product_price).toLocaleString('en-IN')}
                      </span>
                      {item.product_mrp > item.product_price && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{Number(item.product_mrp).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.product_id,
                          name: item.product_name,
                          variant: item.variant || 'Standard',
                          size: '32',
                          price: item.product_price,
                          mrp: item.product_mrp,
                          image: item.image_url || '',
                        })
                      }
                      className="btn-primary w-full py-3 text-xs mt-3 block text-center"
                    >
                      Move to Bag →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
