import {
  AboutHero,
  CoreValues,
  TheJourney,
  FinalCTA
} from "./AboutClientComponents";

export const metadata = {
  title: "About Us | Thrissur's Local Land Experts",
  description:
    "With over a decade of experience, Thrissur Plots is your trusted partner for premium residential, commercial, and agricultural lands in the Cultural Capital of Kerala.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-white text-neutral-900 font-sans transition-colors duration-300">
      {/* 1. Cinematic Parallax Hero */}
      <AboutHero />

      {/* 2. Core DNA & Values */}
      <CoreValues />

      {/* 3. Interactive Journey Timeline */}
      <TheJourney />

      {/* 4. Final Wow CTA */}
      <FinalCTA />
    </div>
  );
}
