import Hero from "../components/Hero";
import BestSellers from "../components/BestSellers";
import Intro from "../components/Intro";
import LuxuryBanner from "../components/LuxuryBanner";
import WhyChoose from "../components/WhyChoose";
import BhadohiStory from "../components/BhadohiStory";
import AllRugs from "../components/AllRugs";
import LeadTime from "../components/LeadTime";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f2eb]">
      <Hero />
      <BestSellers />
      <AllRugs />
      <LeadTime />	
      <LuxuryBanner />
      <WhyChoose />
      <BhadohiStory />
      <Intro />
    </main>
  );
}
