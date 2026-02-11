import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Medicine } from '../types';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (medicine: Medicine, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isInitialized: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('prescriptly_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
        setItems([]);
      }
    }
    setIsInitialized(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('prescriptly_cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // Clear cart when user logs out
  useEffect(() => {
    if (!loading && !currentUser) {
      setItems([]);
    }
  }, [currentUser, loading]);

  const addToCart = (medicine: Medicine, quantity: number = 1) => {
    if (!currentUser) return; // Prevent adding if not logged in

    setItems(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        return prev.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...medicine, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    ));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, itemCount, subtotal, isInitialized }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};