'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CartItem {
  id: string;
  name: string;
  variant: string;
  size: string;
  price: number;
  mrp: number;
  qty: number;
  image: string;
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Obsidian Slim Jeans',
    variant: 'Jet Black',
    size: 'W32',
    price: 2999,
    mrp: 4999,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80',
  },
  {
    id: '2',
    name: 'Utility Cargo Pants',
    variant: 'Olive Drab',
    size: 'W34',
    price: 3499,
    mrp: 5499,
    qty: 1,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&q=80',
  },
];

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const gst = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + gst;

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'REFLY10') setCouponApplied(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-drawer flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="font-display font-bold text-lg tracking-wide uppercase">Your Bag</h2>
            <p className="text-xs text-muted-foreground font-body mt-0.5">{items.length} items</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>

        {/* Delivery Banner */}
        <div className="px-6 py-3 bg-muted border-b border-border">
          <p className="text-xs text-center font-body text-foreground">
            🚚 <span className="font-semibold">Free Delivery</span> across India · COD Available
          </p>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <Icon name="ShoppingBagIcon" size={48} className="text-muted-foreground" />
              <p className="font-display font-medium text-muted-foreground">Your bag is empty</p>
              <button onClick={onClose} className="btn-primary text-xs px-6 py-3">
                Shop Now
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-muted">
                  <AppImage
                    src={item.image}
                    alt={`${item.name} — ${item.variant} fashion product image`}
                    width={80}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-semibold text-sm leading-tight">{item.name}</h3>
                      <p className="text-xs text-muted-foreground font-body mt-1">
                        {item.variant} · {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      className="text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0"
                    >
                      <Icon name="XMarkIcon" size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <span className="font-display font-bold text-sm">₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-muted-foreground line-through font-body">₹{item.mrp.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center gap-3 border border-border">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Icon name="MinusIcon" size={14} />
                      </button>
                      <span className="font-display font-semibold text-sm w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Icon name="PlusIcon" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="input-luxury flex-1 text-sm"
                aria-label="Coupon code"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 bg-primary text-primary-foreground font-display text-xs font-semibold tracking-widest uppercase hover:bg-hover transition-colors"
              >
                Apply
              </button>
            </div>
            {couponApplied && (
              <p className="text-xs text-green-600 font-body mt-2">✓ REFLY10 applied — 10% off!</p>
            )}
          </div>
        )}

        {/* Summary */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border space-y-2">
            <div className="flex justify-between text-sm font-body">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm font-body text-green-600">
                <span>Discount</span>
                <span>−₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-body">
              <span className="text-muted-foreground">GST (18%)</span>
              <span>₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm font-body text-muted-foreground">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between font-display font-bold text-base pt-2 border-t border-border">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-muted-foreground font-body">Inclusive of all taxes</p>
          </div>
        )}

        {/* CTA */}
        {items.length > 0 && (
          <div className="px-6 pb-6 pt-2 space-y-3">
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-primary w-full text-center block"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={onClose}
              className="w-full text-center text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}