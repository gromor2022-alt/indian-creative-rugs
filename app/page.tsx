import Hero from "../components/Hero";
import CollectionsGrid from "@/components/CollectionsGrid";
import BestSellers from "../components/BestSellers";
import Intro from "../components/Intro";
import WhyChoose from "../components/WhyChoose";
import LeadTime from "../components/LeadTime";


import { getFeaturedProducts } from "@/lib/getFeaturedProducts";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-[#F7EADF]">
      <Hero />
      <CollectionsGrid />
      <BestSellers products={featuredProducts} />
      <LeadTime />
      <WhyChoose />
      <Intro />
    </main>
  );
}