import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Forgot Password",
  description: "Reset your password.",
  url: "/forgot-password",
  noindex: true,
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
