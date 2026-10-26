import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Your Cart",
  description: "Review the rugs in your cart.",
  url: "/cart",
  noindex: true,
});

import CartContent from "@/components/CartContent";

export default function CartPage() {
  return (
    <main className="bg-[#F7EADF] min-h-screen">
      <CartContent />
    </main>
  );
}