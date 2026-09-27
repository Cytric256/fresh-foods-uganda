import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { StoreProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Fresh Foods Uganda — Fresh local foods delivered",
  description:
    "Order fresh fruits, vegetables, matooke, cassava, sweet potatoes, greens and eggs. Delivery across Uganda. Prices in UGX.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}