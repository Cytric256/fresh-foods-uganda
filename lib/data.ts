export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  image: string;
  available: boolean;
  featured: boolean;
};

export const categories = ["Fruits", "Vegetables", "Matooke", "Roots & Tubers", "Greens", "Eggs"];

export const seedProducts: Product[] = [
  { id: "p1", name: "Sweet Bananas (Ndiizi)", category: "Fruits", description: "Fresh ripe ndiizi bananas, sweet and ready to eat. Sourced from Masaka.", price: 6000, unit: "bunch", stock: 40, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800", available: true, featured: true },
  { id: "p2", name: "Matooke (Bogoya)", category: "Matooke", description: "Premium bogoya matooke, perfect for a family meal. Sold per bunch.", price: 15000, unit: "bunch", stock: 25, image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800", available: true, featured: true },
  { id: "p3", name: "Fresh Tomatoes", category: "Vegetables", description: "Juicy red tomatoes from Mbale. Great for sauces and salads.", price: 4000, unit: "kg", stock: 60, image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800", available: true, featured: true },
  { id: "p4", name: "Cassava (Muwogo)", category: "Roots & Tubers", description: "Fresh cassava roots, sweet variety. Sold per kg.", price: 2500, unit: "kg", stock: 80, image: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?w=800", available: true, featured: false },
  { id: "p5", name: "Sweet Potatoes", category: "Roots & Tubers", description: "Orange-fleshed sweet potatoes, rich in vitamin A.", price: 3000, unit: "kg", stock: 50, image: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=800", available: true, featured: true },
  { id: "p6", name: "Fresh Spinach (Dodo)", category: "Greens", description: "Tender dodo greens, freshly harvested.", price: 2000, unit: "bunch", stock: 100, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800", available: true, featured: false },
  { id: "p7", name: "Local Eggs", category: "Eggs", description: "Farm-fresh local eggs. Sold per tray of 30.", price: 14000, unit: "tray", stock: 30, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800", available: true, featured: true },
  { id: "p8", name: "Sweet Pineapple", category: "Fruits", description: "Sweet Kayunga pineapple, large size.", price: 5000, unit: "piece", stock: 45, image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800", available: true, featured: false },
  { id: "p9", name: "Avocado (Ovakedo)", category: "Fruits", description: "Creamy local avocados, perfectly ripe.", price: 8000, unit: "kg", stock: 35, image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800", available: true, featured: true },
  { id: "p10", name: "Red Onions", category: "Vegetables", description: "Red onions, good for stews and salads.", price: 4500, unit: "kg", stock: 55, image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=800", available: true, featured: false },
];

export type DeliveryZone = { id: string; name: string; fee: number };

export const seedZones: DeliveryZone[] = [
  { id: "z1", name: "Kampala Central", fee: 5000 },
  { id: "z2", name: "Kampala Suburbs (Ntinda, Naalya, Kira)", fee: 8000 },
  { id: "z3", name: "Wakiso (Entebbe Rd, Gayaza)", fee: 12000 },
  { id: "z4", name: "Mukono / Seeta", fee: 15000 },
  { id: "z5", name: "Jinja", fee: 25000 },
  { id: "z6", name: "Mbarara", fee: 35000 },
  { id: "z7", name: "Gulu", fee: 40000 },
  { id: "z8", name: "Pickup at Shop (Free)", fee: 0 },
];

export type BookingItem = { productId: string; name: string; price: number; qty: number; unit: string };

export type Booking = {
  id: string;
  ref: string;
  name: string;
  phone: string;
  email: string;
  type: "delivery" | "pickup";
  zone: string;
  address?: string;
  date: string;
  time: string;
  notes?: string;
  payment: string;
  items: BookingItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: "Pending" | "Confirmed" | "Delivered" | "Cancelled";
  createdAt: string;
};

export type Question = {
  id: string;
  name: string;
  email: string;
  phone: string;
  question: string;
  answer?: string;
  published: boolean;
  createdAt: string;
};

export const seedQuestions: Question[] = [
  { id: "q1", name: "Sarah N.", email: "sarah@example.com", phone: "+256700000000", question: "Do you deliver matooke to Ntinda on Sundays?", answer: "Yes! We deliver every day including Sundays. Orders before 10 AM arrive the same day.", published: true, createdAt: new Date().toISOString() },
  { id: "q2", name: "Peter O.", email: "peter@example.com", phone: "+256701234567", question: "Can I buy a full sack of cassava at wholesale price?", answer: "Absolutely. Contact us on WhatsApp for bulk pricing.", published: true, createdAt: new Date().toISOString() },
];

export type Settings = {
  businessName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
};

export const seedSettings: Settings = {
  businessName: "Fresh Foods Uganda",
  phone: "+256 700 123 456",
  whatsapp: "+256700123456",
  email: "hello@freshfoodsuganda.com",
  address: "Nakasero Market, Kampala, Uganda",
  hours: "Mon–Sat: 7 AM – 8 PM · Sun: 8 AM – 4 PM",
};

export const paymentMethods = [
  { id: "cod", label: "Cash on Delivery" },
  { id: "mtn", label: "MTN Mobile Money" },
  { id: "airtel", label: "Airtel Money" },
  { id: "bank", label: "Bank Transfer" },
];