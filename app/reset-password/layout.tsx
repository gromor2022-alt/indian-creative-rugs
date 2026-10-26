import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Reset Password",
  description: "Choose a new password.",
  url: "/reset-password",
  noindex: true,
});

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
