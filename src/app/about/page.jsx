import {
  AboutHero,
  CompanyStory,
  StatsRow,
  JourneyTimeline,
  ExpertiseSection,
  OurValues,
  MeetTheTeam,
  TrustPillars,
  CoverageSection,
  AboutCTA,
} from "./AboutClientComponents";

export const metadata = {
  title: "About Us | Thrissur's Local Land Experts",
  description:
    "With over a decade of experience, Thrissur Plots is your trusted partner for premium residential, commercial, and agricultural lands in the Cultural Capital of Kerala.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-primary text-text-main font-sans transition-colors duration-300">
      {/* 1. Cinematic Parallax Hero */}
      <AboutHero />

      {/* 2. Company Story — Image + Text */}
      <CompanyStory />

      {/* 3. Stats Row — 4 key numbers */}
      <StatsRow />

      {/* 4. Journey Timeline */}
      <JourneyTimeline />

      {/* 5. Expertise Cards with embedded stats */}
      <ExpertiseSection />

      {/* 6. Our Core Values — 6-card animated grid */}
      <OurValues />

      {/* 7. Meet the Team */}
      <MeetTheTeam />

      {/* 8. Pillars of Trust */}
      <TrustPillars />

      {/* 9. Coverage Areas — list + map image */}
      <CoverageSection />

      {/* 10. Cinematic Final CTA */}
      <AboutCTA />
    </div>
  );
}
