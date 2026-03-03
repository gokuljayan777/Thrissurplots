import {
  ServicesHero,
  ServicesDetail,
  OurProcess,
  WhyChooseUs,
  TestimonialStrip,
  ServicesFAQ,
  ServicesCTA,
} from "./ServicesClientComponents";

export const metadata = {
  title: "Our Services | Thrissur Plots — Premium Real Estate Solutions",
  description:
    "Comprehensive real estate solutions in Thrissur. From premium land buying and strategic selling to investment consultation, documentation support, NRI advisory, and guided site visits.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full bg-primary text-text-main font-sans transition-colors duration-300">

      {/* 1. Cinematic Hero with live stats */}
      <ServicesHero />

      {/* 2. Bento-style service cards (1 featured + 2-col + 3-col) */}
      <ServicesDetail />

      {/* 3. End-to-End Process — 6 steps */}
      <OurProcess />

      {/* 4. Why Choose Us — stats + highlight grid */}
      <WhyChooseUs />

      {/* 5. Testimonial strip */}
      <TestimonialStrip />

      {/* 6. FAQ Accordion */}
      <ServicesFAQ />

      {/* 7. Cinematic Final CTA */}
      <ServicesCTA />
    </div>
  );
}
