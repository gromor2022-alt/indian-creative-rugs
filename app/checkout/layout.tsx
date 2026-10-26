import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Checkout",
  description: "Complete your order.",
  url: "/checkout",
  noindex: true,
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
