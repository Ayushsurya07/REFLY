'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

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

const initialCartItems: CartItem[] = [
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const addToCart = (newItem: Omit<CartItem, 'qty'> & { qty?: number }) => {
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
    setCartItems((prev) =>
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

  const clearCart = () => setCartItems([]);

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
