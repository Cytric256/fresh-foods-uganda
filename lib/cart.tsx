"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "./data";

export type CartItem = { productId: string; name: string; price: number; qty: number; unit: string; image: string };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
};

const CartContext = createContext<CartCtx | null>(null);
const KEY = "ffu_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setItems(JSON.parse(raw)); } catch {}
  }, []);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  function add(p: Product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === p.id);
      if (existing) return prev.map((i) => (i.productId === p.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { productId: p.id, name: p.name, price: p.price, qty, unit: p.unit, image: p.image }];
    });
  }
  function remove(id: string) { setItems((prev) => prev.filter((i) => i.productId !== id)); }
  function setQty(id: string, qty: number) { if (qty <= 0) return remove(id); setItems((prev) => prev.map((i) => (i.productId === id ? { ...i, qty } : i))); }
  function clear() { setItems([]); }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return <CartContext.Provider value={{ items, add, remove, setQty, clear, subtotal, count }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}