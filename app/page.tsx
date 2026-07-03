import Hero from "../components/Hero";
import BestSellers from "../components/BestSellers";
import Intro from "../components/Intro";
import LuxuryBanner from "../components/LuxuryBanner";
import WhyChoose from "../components/WhyChoose";
import BhadohiStory from "../components/BhadohiStory";
import AllRugs from "../components/AllRugs";
import LeadTime from "../components/LeadTime";

import { getFeaturedProducts } from "@/lib/getFeaturedProducts";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-[#f6f2eb]">
      <Hero />

      <BestSellers products={featuredProducts} />

      <AllRugs />
      <LeadTime />
      <LuxuryBanner />
      <WhyChoose />
      <BhadohiStory />
      <Intro />
    </main>
  );
}