'use client';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  size: string;
  price: number;
  mrp: number;
  qty: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (id: string, delta: number, size?: string) => void;
  subtotal: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const userId = user?.id || null;
  const isLoadedRef = useRef(false);

  // Sync cart items whenever user auth state changes
  useEffect(() => {
    try {
      if (userId) {
        const userCartKey = `refly_cart_${userId}`;
        const savedUserCart = localStorage.getItem(userCartKey);
        const legacyCart = localStorage.getItem('refly_cart');

        if (savedUserCart) {
          setCartItems(JSON.parse(savedUserCart));
        } else if (legacyCart) {
          const parsed = JSON.parse(legacyCart);
          setCartItems(parsed);
          localStorage.setItem(userCartKey, JSON.stringify(parsed));
          localStorage.removeItem('refly_cart');
        } else {
          setCartItems([]);
        }
      } else {
        // Signed-out: hide active cart in UI (does not erase stored user cart)
        setCartItems([]);
      }
    } catch {
      setCartItems([]);
    }
    isLoadedRef.current = true;
  }, [userId]);

  // Save to user-specific localStorage whenever cartItems changes for logged-in user
  useEffect(() => {
    if (!isLoadedRef.current) return;
    try {
      if (userId) {
        const userCartKey = `refly_cart_${userId}`;
        localStorage.setItem(userCartKey, JSON.stringify(cartItems));
      }
    } catch {
      // Ignore quota error
    }
  }, [cartItems, userId]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const addToCart = (newItem: Omit<CartItem, 'qty'> & { qty?: number }) => {
    if (!user) {
      const currentPath =
        typeof window !== 'undefined'
          ? window.location.pathname + window.location.search
          : '/collections';
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    const qtyToAdd = newItem.qty || 1;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += qtyToAdd;
        return updated;
      }
      return [...prev, { ...newItem, qty: qtyToAdd }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string, size?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && (!size || item.size === size)))
    );
  };

  const updateQuantity = (id: string, delta: number, size?: string) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id && (!size || item.size === size)) {
              const newQty = item.qty + delta;
              return newQty > 0 ? { ...item, qty: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      if (userId) {
        localStorage.removeItem(`refly_cart_${userId}`);
      }
      localStorage.removeItem('refly_cart');
    } catch {
      // Ignore quota/access errors
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
