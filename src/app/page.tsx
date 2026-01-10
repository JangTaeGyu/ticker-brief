import Hero from "@/components/Hero";
import SampleComparison from "@/components/SampleComparison";
import Comparison from "@/components/Comparison";
import BetaPricing from "@/components/BetaPricing";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <SampleComparison />
      <Comparison />
      <BetaPricing />
      <FAQ />
    </main>
  );
}
