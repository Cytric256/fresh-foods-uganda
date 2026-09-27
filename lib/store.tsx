"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  Product, Booking, Question, DeliveryZone, Settings,
  seedProducts, seedQuestions, seedZones, seedSettings,
} from "./data";

type StoreCtx = {
  products: Product[];
  bookings: Booking[];
  questions: Question[];
  zones: DeliveryZone[];
  settings: Settings;
  isAdmin: boolean;
  login: (pw: string) => boolean;
  logout: () => void;
  saveProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addBooking: (b: Booking) => void;
  updateBookingStatus: (id: string, status: Booking["status"]) => void;
  addQuestion: (q: Question) => void;
  answerQuestion: (id: string, answer: string, published: boolean) => void;
  saveZone: (z: DeliveryZone) => void;
  deleteZone: (id: string) => void;
  updateSettings: (s: Settings) => void;
};

const StoreContext = createContext<StoreCtx | null>(null);

const KEYS = {
  products: "ffu_products_v1",
  bookings: "ffu_bookings_v1",
  questions: "ffu_questions_v1",
  zones: "ffu_zones_v1",
  settings: "ffu_settings_v1",
  admin: "ffu_admin_v1",
};

const ADMIN_PASSWORD = "freshfoods2024";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [questions, setQuestions] = useState<Question[]>(seedQuestions);
  const [zones, setZones] = useState<DeliveryZone[]>(seedZones);
  const [settings, setSettings] = useState<Settings>(seedSettings);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setProducts(load(KEYS.products, seedProducts));
    setBookings(load(KEYS.bookings, []));
    setQuestions(load(KEYS.questions, seedQuestions));
    setZones(load(KEYS.zones, seedZones));
    setSettings(load(KEYS.settings, seedSettings));
    setIsAdmin(localStorage.getItem(KEYS.admin) === "1");
  }, []);

  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(KEYS.products, JSON.stringify(products)); }, [products]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(KEYS.bookings, JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(KEYS.questions, JSON.stringify(questions)); }, [questions]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(KEYS.zones, JSON.stringify(zones)); }, [zones]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(KEYS.settings, JSON.stringify(settings)); }, [settings]);

  const value: StoreCtx = {
    products, bookings, questions, zones, settings, isAdmin,
    login: (pw) => {
      if (pw === ADMIN_PASSWORD) { setIsAdmin(true); localStorage.setItem(KEYS.admin, "1"); return true; }
      return false;
    },
    logout: () => { setIsAdmin(false); localStorage.removeItem(KEYS.admin); },
    saveProduct: (p) => setProducts((prev) => {
      const i = prev.findIndex((x) => x.id === p.id);
      if (i >= 0) { const c = [...prev]; c[i] = p; return c; }
      return [...prev, p];
    }),
    deleteProduct: (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),
    addBooking: (b) => setBookings((prev) => [b, ...prev]),
    updateBookingStatus: (id, status) => setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b))),
    addQuestion: (q) => setQuestions((prev) => [q, ...prev]),
    answerQuestion: (id, answer, published) => setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, answer, published } : q))),
    saveZone: (z) => setZones((prev) => {
      const i = prev.findIndex((x) => x.id === z.id);
      if (i >= 0) { const c = [...prev]; c[i] = z; return c; }
      return [...prev, z];
    }),
    deleteZone: (id) => setZones((prev) => prev.filter((z) => z.id !== id)),
    updateSettings: (s) => setSettings(s),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}