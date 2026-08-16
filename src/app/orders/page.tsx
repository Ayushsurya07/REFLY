'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface OrderItem {
  id: string;
  product_name: string;
  variant: string | null;
  size: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_url: string | null;
}

interface Order {
  id: string;
  order_number: string;
  order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  total_amount: number;
  shipping_method: string;
  created_at: string;
  order_items: OrderItem[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  pending:    { label: 'Pending',    color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  confirmed:  { label: 'Confirmed',  color: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500' },
  processing: { label: 'Processing', color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  shipped:    { label: 'Shipped',    color: 'bg-amber-100 text-amber-700',   dot: 'bg-amber-500' },
  delivered:  { label: 'Delivered',  color: 'bg-green-100 text-green-700',   dot: 'bg-green-600 animate-none' },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-600',       dot: 'bg-red-500' },
  refunded:   { label: 'Refunded',   color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
};

const ACTIVE_STATUSES = ['confirmed', 'processing', 'shipped'];

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'in-transit' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading, router]);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setOrders((data as Order[]) || []);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, [user, supabase]);

  useEffect(() => { if (user) fetchOrders(); }, [user, fetchOrders]);

  const filtered = orders.filter((o) => {
    if (searchQuery && !o.order_number.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeTab === 'in-transit' && !ACTIVE_STATUSES.includes(o.order_status)) return false;
    if (activeTab === 'delivered' && o.order_status !== 'delivered') return false;
    return true;
  });

  if (authLoading || (loading && user)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />

      <main className="pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-gold block mb-2">
                Order Dashboard
              </span>
              <h1 className="font-display font-bold text-3xl lg:text-4xl tracking-tight uppercase">
                Track My Orders
              </h1>
            </div>
            <div className="w-full md:w-80 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search order number…"
                className="input-luxury w-full text-xs py-3 pr-10"
              />
              <Icon name="MagnifyingGlassIcon" size={16} className="absolute right-3 top-3.5 text-muted-foreground" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border mb-8 gap-8">
            {[
              { id: 'all', label: `All Orders (${orders.length})` },
              { id: 'in-transit', label: 'In Transit' },
              { id: 'delivered', label: 'Delivered' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`font-display text-xs font-semibold tracking-wider uppercase pb-3 border-b-2 transition-colors ${
                  activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white border border-border">
              <Icon name="ShoppingBagIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">No Orders Found</h3>
              <p className="font-body text-xs text-muted-foreground mb-6">
                {orders.length === 0
                  ? "You haven't placed any orders yet."
                  : 'No orders match your current filter.'}
              </p>
              <Link href="/collections" className="btn-primary text-xs px-8 py-3">
                Explore Collections →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((order) => {
                const cfg = STATUS_CONFIG[order.order_status] || STATUS_CONFIG.pending;
                const isExpanded = expandedOrder === order.id;
                return (
                  <div key={order.id} className="bg-white border border-border overflow-hidden">
                    {/* Order summary row */}
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/30 transition-colors"
                    >
                      <div>
                        <p className="font-display font-bold text-sm">#{order.order_number}</p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">
                          {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          {' · '}{order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`tag-label px-3 py-1 text-xs font-semibold uppercase ${cfg.color}`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                        <span className="font-display font-bold text-sm hidden sm:block">
                          ₹{Number(order.total_amount).toLocaleString('en-IN')}
                        </span>
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="border-t border-border px-6 py-5 space-y-4">
                        {order.order_items && order.order_items.length > 0 && (
                          <div className="space-y-3">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-muted">
                                  {item.image_url ? (
                                    <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Icon name="ShoppingBagIcon" size={20} className="text-muted-foreground" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-display font-semibold text-sm">{item.product_name}</h4>
                                  <p className="text-xs text-muted-foreground font-body mt-0.5">
                                    {[item.variant, item.size && `Size: ${item.size}`, `Qty: ${item.quantity}`].filter(Boolean).join(' · ')}
                                  </p>
                                </div>
                                <p className="font-display font-bold text-sm flex-shrink-0">
                                  ₹{Number(item.total_price).toLocaleString('en-IN')}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="pt-3 border-t border-border flex items-center justify-between">
                          <p className="font-body text-xs text-muted-foreground">Order Total</p>
                          <p className="font-display font-bold text-base">₹{Number(order.total_amount).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
