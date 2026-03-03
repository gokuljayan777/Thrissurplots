import {
  WhyHero,
  InvestmentReasons,
  CultureSection,
  InfrastructureSection,
  InvestmentHubs,
  LifestyleSection,
  InvestorTestimonials,
  WhyCTA,
} from "./WhyThrissurClientComponents";

export const metadata = {
  title: "Why Invest in Thrissur? | Culture, Growth & Real Estate",
  description:
    "Discover why Thrissur, the Cultural Capital of Kerala, is the prime destination for high-yield real estate investments — unparalleled infrastructure, heritage, lifestyle, and proven ROI.",
};

export default function WhyThrissurPage() {
  return (
    <div className="flex flex-col w-full bg-primary text-text-main font-sans transition-colors duration-300">

      {/* 1. Cinematic parallax hero */}
      <WhyHero />

      {/* 2. 6-reason investment grid with stat watermarks */}
      <InvestmentReasons />

      {/* 3. Culture & heritage editorial section */}
      <CultureSection />

      {/* 4. Infrastructure split-layout */}
      <InfrastructureSection />

      {/* 5. 6 Investment Hubs card grid */}
      <InvestmentHubs />

      {/* 6. Lifestyle — stat imagery strip */}
      <LifestyleSection />

      {/* 7. Investor testimonials */}
      <InvestorTestimonials />

      {/* 8. Cinematic final CTA */}
      <WhyCTA />

    </div>
  );
}
