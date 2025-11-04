import Navbar from "@/components/Navbar";
import InvestmentSection from "@/components/InvestmentSection";
import HirePurchaseSection from "@/components/HirePurchaseSection";
import JourneySection from "@/components/JourneySection";
import HeroSection from "@/components/HeroSection";
import ContactCTA from "./Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>

      <section id="investments">
        <InvestmentSection />
      </section>

      <section id="hire-purchase">
        <HirePurchaseSection />
      </section>

      <section id="about">
        <JourneySection />
      </section>

      <section id="contact">
        <ContactCTA />
      </section>
    </>
  );
}
