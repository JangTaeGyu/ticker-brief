import Hero from "@/components/Hero";
import SampleComparison from "@/components/SampleComparison";
import Comparison from "@/components/Comparison";
import BetaPricing from "@/components/BetaPricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <SampleComparison />
      <Comparison />
      <BetaPricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
