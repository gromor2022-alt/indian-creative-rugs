import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "Indian Creative Rugs | Handmade Luxury Rugs from India",
  absoluteTitle: true,
  description: "Hand-knotted and hand-tufted rugs made in Bhadohi, India since 1980. Persian, Heritage, Vintage and Modern designs, custom sizes and worldwide delivery.",
  url: "/",
});

import Hero from "../components/Hero";
import CollectionsGrid from "@/components/CollectionsGrid";
import BestSellers from "../components/BestSellers";
import Intro from "../components/Intro";
import WhyChoose from "../components/WhyChoose";
import LeadTime from "../components/LeadTime";
import ICRScrollEffects from "@/components/ICRScrollEffects";
import FestiveSalePopup from "@/components/FestiveSalePopup";

import { getFeaturedProducts } from "@/lib/getFeaturedProducts";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-[#F7EADF]">
      <FestiveSalePopup />
      <Hero />
      <ICRScrollEffects />
      <CollectionsGrid />
      <BestSellers products={featuredProducts} />
      <LeadTime />
      <WhyChoose />
      <Intro />
    </main>
  );
}
