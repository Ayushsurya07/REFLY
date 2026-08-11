'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useCart, CartItem } from '@/contexts/CartContext';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CartDrawer({ isOpen: propIsOpen, onClose: propOnClose }: CartDrawerProps) {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const isOpen = propIsOpen !== undefined ? propIsOpen : cartOpen;
  const handleClose = propOnClose || (() => setCartOpen(false));

  const items = cartItems;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const netSubtotal = Math.max(0, subtotal - discount);
  const isFreeShipping = netSubtotal >= 1500;
  const estimatedShipping = isFreeShipping ? 0 : 79;
  const total = netSubtotal + estimatedShipping;
  const includedGst = Math.round((total * 18) / 118);

  const updateQty = (id: string, delta: number, size?: string) => {
    updateQuantity(id, delta, size);
  };

  const removeItem = (id: string, size?: string) => {
    removeFromCart(id, size);
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'REFLY10') setCouponApplied(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={handleClose} />
      <div className="cart-drawer flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="font-display font-bold text-lg tracking-wide uppercase">Your Bag</h2>
            <p className="text-xs text-muted-foreground font-body mt-0.5">{items.length} items</p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close cart"
            className="w-10 h-10 flex items-center justify-center hover:bg-accent transition-colors"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>

        {/* Delivery Banner */}
        <div className="px-6 py-3 bg-muted border-b border-border">
          <p className="text-xs text-center font-body text-foreground">
            🚚 <span className="font-semibold">FREE Delivery</span> on orders above ₹1,500 · COD Available
          </p>
        </div>

        {/* Free Shipping Progress Bar */}
        {items.length > 0 && !isFreeShipping && (
          <div className="px-6 py-2.5 bg-gold/15 border-b border-gold/30 flex items-center justify-between text-xs">
            <span className="font-body text-foreground">
              Add <strong className="font-semibold text-gold">₹{(1500 - netSubtotal).toLocaleString('en-IN')}</strong> more for <strong className="font-semibold text-gold uppercase">FREE Delivery</strong>
            </span>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <Icon name="ShoppingBagIcon" size={48} className="text-muted-foreground" />
              <p className="font-display font-medium text-muted-foreground">Your bag is empty</p>
              <button onClick={handleClose} className="btn-primary text-xs px-6 py-3">
                Shop Now
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.id}-${item.size || ''}-${index}`} className="flex gap-4">
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
                      onClick={() => removeItem(item.id, item.size)}
                      aria-label="Remove item"
                      className="text-muted-foreground hover:text-foreground transition-colors ml-2 flex-shrink-0"
                    >
                      <Icon name="XMarkIcon" size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-0 border border-border">
                      <button
                        onClick={() => updateQty(item.id, -1, item.size)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 flex items-center justify-center hover:bg-muted text-xs transition-colors border-r border-border"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-display font-bold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1, item.size)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 flex items-center justify-center hover:bg-muted text-xs transition-colors border-l border-border"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="price-tag text-sm font-bold">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                      {item.mrp > item.price && (
                        <span className="text-[10px] text-muted-foreground line-through block font-body">
                          ₹{(item.mrp * item.qty).toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-border bg-muted/30">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code (REFLY10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                aria-label="Coupon code"
                className="input-luxury flex-1 text-xs py-2"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 bg-foreground text-background font-display text-xs font-semibold tracking-wider uppercase hover:bg-gold hover:text-gold-foreground transition-colors"
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
                <span>Discount (10%)</span>
                <span>−₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-body text-muted-foreground">
              <span>GST (18% Included)</span>
              <span>₹{includedGst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm font-body text-muted-foreground">
              <span>Shipping</span>
              {isFreeShipping ? (
                <span className="text-green-600 font-semibold">FREE</span>
              ) : (
                <span>₹79 <span className="text-[10px] text-muted-foreground">(₹100 COD)</span></span>
              )}
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
              onClick={handleClose}
              className="btn-primary w-full text-center block"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={handleClose}
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