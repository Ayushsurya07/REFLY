'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

interface MockOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'In Transit' | 'Delivered' | 'Processing';
  items: Array<{ name: string; variant: string; size: string; price: number; qty: number; image: string }>;
  shippingFee: number;
  total: number;
  paymentMethod: string;
}

const MOCK_ORDERS: MockOrder[] = [
  {
    id: '1',
    orderNumber: 'RFL-K9X2-89A',
    date: '10 Aug 2026',
    status: 'In Transit',
    items: [
      {
        name: 'Tactical Zip Cargo Pants',
        variant: 'Tactical Olive',
        size: 'W32',
        price: 3499,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&q=80',
      },
    ],
    shippingFee: 0,
    total: 3499,
    paymentMethod: 'UPI / Prepaid',
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'in-transit' | 'delivered'>('all');

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (searchQuery && !order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeTab === 'in-transit' && order.status !== 'In Transit') return false;
    if (activeTab === 'delivered' && order.status !== 'Delivered') return false;
    return true;
  });

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

            {/* Order Search */}
            <div className="w-full md:w-80">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Order # (e.g. RFL-K9X2)"
                  className="input-luxury w-full text-xs py-3 pr-10"
                />
                <Icon name="MagnifyingGlassIcon" size={16} className="absolute right-3 top-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-border mb-8 gap-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`font-display text-xs font-semibold tracking-wider uppercase pb-3 border-b-2 transition-colors ${
                activeTab === 'all' ? 'border-black text-black' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              All Orders ({MOCK_ORDERS.length})
            </button>
            <button
              onClick={() => setActiveTab('in-transit')}
              className={`font-display text-xs font-semibold tracking-wider uppercase pb-3 border-b-2 transition-colors ${
                activeTab === 'in-transit' ? 'border-black text-black' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              In Transit
            </button>
            <button
              onClick={() => setActiveTab('delivered')}
              className={`font-display text-xs font-semibold tracking-wider uppercase pb-3 border-b-2 transition-colors ${
                activeTab === 'delivered' ? 'border-black text-black' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Delivered
            </button>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-20 bg-white border border-border">
              <Icon name="ShoppingBagIcon" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display font-bold text-lg mb-2">No Orders Found</h3>
              <p className="font-body text-xs text-muted-foreground mb-6">
                You haven&apos;t placed any orders matching this criteria yet.
              </p>
              <Link href="/collections" className="btn-primary text-xs px-8 py-3">
                Explore Collections →
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white border border-border p-6 lg:p-8 space-y-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                    <div>
                      <span className="font-display font-bold text-base tracking-wide">#{order.orderNumber}</span>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">Placed on {order.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="tag-label bg-gold text-gold-foreground text-xs px-3 py-1 font-semibold uppercase">
                        🚚 {order.status}
                      </span>
                      <span className="font-display font-bold text-sm">₹{order.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-muted">
                          <AppImage src={item.image} alt={item.name} width={64} height={80} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-semibold text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground font-body mt-0.5">{item.variant} · {item.size} · Qty: {item.qty}</p>
                          <p className="font-display font-bold text-xs mt-1">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Timeline */}
                  <div className="pt-4 border-t border-border bg-muted/30 p-4">
                    <p className="font-display font-semibold text-xs tracking-wider uppercase mb-3 text-muted-foreground">
                      Tracking Progress
                    </p>
                    <div className="flex items-center justify-between text-xs font-body">
                      <div className="flex items-center gap-2 text-green-700 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-green-600" /> Order Placed
                      </div>
                      <div className="flex items-center gap-2 text-green-700 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-green-600" /> Dispatched
                      </div>
                      <div className="flex items-center gap-2 text-gold font-semibold">
                        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" /> Out for Delivery
                      </div>
                    </div>
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
