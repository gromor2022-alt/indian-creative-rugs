import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Contact Us",
  description: "Contact Indian Creative Rugs about bespoke rugs, design guidance or an existing order by email, phone or WhatsApp.",
  url: "/contact",
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
