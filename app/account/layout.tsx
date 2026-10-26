import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "My Account",
  description: "Manage your Indian Creative Rugs account.",
  url: "/account",
  noindex: true,
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
