'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  clearCart: () => void; // 🎯 নতুন যোগ করা হলো
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('reez_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setTimeout(() => {
          setCartItems(parsedCart);
        }, 0);
      } catch (e) {
        console.error('Failed to parse cart data', e);
      }
    }
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id,
      );
      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedItems = [...prevItems, { product, quantity: 1 }];
      }

      localStorage.setItem('reez_cart', JSON.stringify(updatedItems));
      return updatedItems;
    });

    toast.success(`${product.title} cart-e add kora hoyeche!`);
  };

  // 🎯 কার্ট সম্পূর্ণ খালি করার ফাংশন
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('reez_cart');
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, clearCart, cartCount }}
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
