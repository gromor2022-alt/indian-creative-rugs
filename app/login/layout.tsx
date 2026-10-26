import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Admin Login",
  description: "Admin login.",
  url: "/login",
  noindex: true,
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
