"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCart, CartItem } from "@/hooks/useCart";

interface CartContextType {
  items: CartItem[];
  count: number;
  isLoaded: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (ticker: string) => void;
  isInCart: (ticker: string) => boolean;
  toggleItem: (item: CartItem) => void;
  clearCart: () => void;
  getTickers: () => string[];
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
