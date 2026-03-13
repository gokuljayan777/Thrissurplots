"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  MapPin,
  Landmark,
  Sparkles,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Flame,
  Star,
  Building2,
  Leaf,
  Train,
  Wifi,
  ChevronDown,
  ArrowDown,
  Phone,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Utensils,
} from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from "@/components/ui/progressive-carousel";
import { useMediaQuery } from "@/hooks/use-media-query";

/* ─── Data ─── */
const keyStats = [
  { value: "₹1.2L Cr+", label: "Metro-Region GDP", Icon: TrendingUp },
  { value: "35%", label: "Avg. Annual Appreciation", Icon: Sparkles },
  { value: "#1", label: "Cultural Capital of Kerala", Icon: Landmark },
  { value: "3M+", label: "Population & Growing", Icon: MapPin },
];

const investmentReasons = [
  {
    Icon: TrendingUp,
    title: "Exponential GDP Growth",
    desc: "Thrissur's economy has been growing at 12% annually, outpacing the state average. Major banking headquarters, gold trade centers, and logistics corridors are all fuelling this boom.",
    stat: "12%", statLabel: "Annual GDP Growth",
  },
  {
    Icon: Train,
    title: "World-Class Connectivity",
    desc: "NH-66 bypass, upcoming metro extensions, Thrissur railway junction, and Cochin International Airport (CHI) just 30 km away make this a logistical dream for businesses and families.",
    stat: "30km", statLabel: "From Int'l Airport",
  },
  {
    Icon: GraduationCap,
    title: "Premier Education Hub",
    desc: "Home to Kerala's top institutions — Thrissur Medical College, Government Engineering College, renowned CBSE schools, and elite residential campuses for every level of education.",
    stat: "50+", statLabel: "Top Educational Institutions",
  },
  {
    Icon: HeartPulse,
    title: "Healthcare Excellence",
    desc: "World-class multi-specialty hospitals including Amala Institute, Jubilee Mission Medical Center, and Elite Mission Hospital ensure healthcare needs are met at the highest standard.",
    stat: "15+", statLabel: "Multi-Specialty Hospitals",
  },
  {
    Icon: ShoppingBag,
    title: "Cosmopolitan Lifestyle",
    desc: "Lulu Mall, City Centre, and hundreds of retail outlets make Thrissur a shopping capital for central Kerala. Fine dining, entertainment complexes, and cultural venues round out the premium lifestyle.",
    stat: "200+", statLabel: "Retail & Dining Outlets",
  },
  {
    Icon: Leaf,
    title: "Green & Serene Living",
    desc: "Unlike congested metros, Thrissur balances urban amenities with clean air, green boulevards, and a peaceful community lifestyle that attracts high-net-worth families seeking quality of life.",
    stat: "60%", statLabel: "Green Cover in Districts",
  },
];

const investmentHubs = [
  {
    name: "Swaraj Round",
    tag: "Commercial Core",
    desc: "The beating heart of the city — a premium commercial mega-hub for banks, gold traders, and luxury retail.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    roi: "High ROI",
    color: "from-yellow-500/20",
  },
  {
    name: "Kuttanellur",
    tag: "Residential Corridor",
    desc: "Rapidly expanding educational and residential zone — favoured by middle to upper-class families and NRI investors.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    roi: "Stable Growth",
    color: "from-emerald-500/20",
  },
  {
    name: "Puzhakkal",
    tag: "Luxury Destination",
    desc: "The new high-end transit and lifestyle corridor along NH 544, attracting gated communities and premium villa projects.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
    roi: "Premium Segment",
    color: "from-blue-500/20",
  },
  {
    name: "Mannuthy",
    tag: "Highway Frontage",
    desc: "National Highway access point with an emerging industrial and commercial belt — excellent for long-term holding.",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop",
    roi: "Long-Term Hold",
    color: "from-purple-500/20",
  },
  {
    name: "Ollur",
    tag: "IT & Wellness",
    desc: "Emerging IT park surroundings, wellness retreats, and premium plotted developments attracting a younger workforce.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    roi: "High Demand",
    color: "from-orange-500/20",
  },
  {
    name: "Chalakudy",
    tag: "Eco & Industrial",
    desc: "Gateway to eco-tourism, the Chalakudy river belt, and industrial zones — a unique blend of nature and commerce.",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1200&auto=format&fit=crop",
    roi: "Emerging Zone",
    color: "from-teal-500/20",
  },
];

const culturalPoints = [
  { Icon: Flame, title: "Thrissur Pooram", desc: "Asia's most spectacular elephant procession and fireworks festival — listed among the world's greatest cultural events." },
  { Icon: Landmark, title: "Vadakkumnathan Temple", desc: "A 1000-year-old architectural marvel at the city's centre — UNESCO heritage candidate and living temple of Kerala art." },
  { Icon: Star, title: "Kerala Sangeetha Nataka Academy", desc: "The state's premier institution for classical arts is headquartered here — making Thrissur the cultural anchor of Kerala." },
  { Icon: Building2, title: "Banking Capital", desc: "40%+ of Kerala's private bank headquarters are in Thrissur — a legacy financial hub with unrivalled monetary depth." },
];

const testimonials = [
  { name: "Rajesh Nair", role: "NRI Investor, UK", avatar: "https://randomuser.me/api/portraits/men/28.jpg", text: "I bought a plot in Puzhakkal 3 years ago as an NRI. It has already appreciated 62%. Thrissur was the best investment decision of my life.", rating: 5 },
  { name: "Deepa Menon", role: "Plot Owner, Abu Dhabi", avatar: "https://randomuser.me/api/portraits/women/36.jpg", text: "Thrissur offers what no other city in Kerala can — cultural stability, modern infrastructure, and premium returns. My entire extended family has invested here.", rating: 5 },
  { name: "Anoop George", role: "Commercial Buyer", avatar: "https://randomuser.me/api/portraits/men/61.jpg", text: "I purchased a commercial plot near Swaraj Round. The rental yields alone have been extraordinary. Thrissur commercial real estate is unbeatable.", rating: 5 },
];

/* ══════════════════════════════════════════
   CINEMATIC HERO
══════════════════════════════════════════ */
export function WhyHero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-black">
      {/* Parallax BG */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110 z-0">
        <Image
          src="https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=2600&auto=format&fit=crop"
          alt="Thrissur Skyline"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-0" />
      {/* Dot grid */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      <motion.div style={{ opacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Kerala&apos;s Most Coveted City for Investment</span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[88px] font-serif text-white tracking-tight leading-[1.0]"
          >
            Invest in the<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600">
              Cultural Capital
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white/70 text-xl md:text-2xl font-serif italic font-light max-w-2xl mx-auto mb-14"
        >
          &ldquo;Where enduring heritage meets exponential growth.&rdquo;
        </motion.p>

        {/* Live stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {keyStats.map((s, i) => {
            const StatIcon = s.Icon;
            return (
              <div key={i} className="bg-black/50 backdrop-blur-md border border-white/10 px-5 py-3 rounded-xl text-center min-w-[120px]">
                <p className="text-xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                  <AnimatedNumber value={s.value} />
                </p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[10px] uppercase tracking-widest">Discover Why</span>
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown className="w-5 h-5 text-gold-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   KEY REASONS — 6-card grid
══════════════════════════════════════════ */
export function InvestmentReasons() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-gold-500/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">
            The Investment Case
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
            6 Reasons Thrissur Stands Apart
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-text-muted mt-4 max-w-xl mx-auto font-light">
            No other city in Kerala combines cultural prestige, economic strength, and quality of life the way Thrissur does.
          </motion.p>
        </div>

        <div className="gsap-reasons-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentReasons.map((reason, i) => {
            const Icon = reason.Icon;
            return (
              <div
                key={i}
                className="gsap-reason-card relative bg-secondary border border-border-subtle hover:border-gold-500/40 rounded-2xl p-8 group transition-all duration-500 overflow-hidden"
              >
                {/* Watermark stat */}
                <div className="absolute top-4 right-5 text-[56px] font-serif text-gold-500/[0.15] leading-none select-none font-bold">
                  <AnimatedNumber value={reason.stat} />
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary border border-border-strong flex items-center justify-center mb-6 group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all">
                    <Icon className="w-7 h-7 text-gold-500" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-text-main mb-3 group-hover:text-gold-400 transition-colors">{reason.title}</h3>
                  <p className="text-text-muted text-sm font-light leading-relaxed mb-5">{reason.desc}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                    <span className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                      <AnimatedNumber value={reason.stat} />
                    </span>
                    <span className="text-text-muted text-xs uppercase tracking-widest font-semibold">{reason.statLabel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CULTURE & HERITAGE — Full editorial split
══════════════════════════════════════════ */
export function CultureSection() {
  return (
    <section className="py-14 md:py-24 px-4 sm:px-6 bg-secondary border-y border-border-subtle relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "repeating-linear-gradient(45deg, #e5a12d 0, #e5a12d 1px, transparent 0, transparent 50%)",
        backgroundSize: "18px 18px"
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Cultural Prestige</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-6 leading-tight">
              Where Heritage<br />Commands Premium
            </h2>
            <p className="text-text-muted font-light text-lg leading-relaxed mb-8">
              Thrissur&apos;s cultural identity isn&apos;t just a legacy — it&apos;s a premium property value driver. Cities with deep cultural roots globally command 20-40% higher land values than comparable non-heritage cities.
            </p>
            <p className="text-text-muted font-light leading-relaxed mb-10">
              The annual Thrissur Pooram draws over 1 million visitors. Vadakkumnathan Temple is a living architectural masterpiece. The Kerala Sangeetha Nataka Academy anchors the arts here. This cultural gravity is irreplaceable — and so is the land in its shadow.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {culturalPoints.map((point, i) => {
                const CIcon = point.Icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-primary border border-border-subtle rounded-xl p-4 hover:border-gold-500/30 transition-colors group"
                  >
                    <CIcon className="w-5 h-5 text-gold-500 mb-2" />
                    <h4 className="font-serif font-semibold text-sm text-text-main mb-1 group-hover:text-gold-400 transition-colors">{point.title}</h4>
                    <p className="text-text-muted text-xs font-light leading-relaxed">{point.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — stacked images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/thrissur-pooram-new.png"
                alt="Thrissur Pooram"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-gold-500 text-black text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">Thrissur Pooram</span>
                <p className="text-white/80 text-sm mt-2 font-light">Asia&apos;s most spectacular cultural festival — 1M+ visitors annually</p>
              </div>
            </div>
            {/* Floating badge */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-secondary border border-gold-500/30 rounded-2xl p-5 shadow-2xl z-10">
              <p className="text-3xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 mb-1">
                <AnimatedNumber value="1,000+" />
              </p>
              <p className="text-text-muted text-xs uppercase tracking-wide font-semibold">Years of Heritage</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   INFRASTRUCTURE SECTION
══════════════════════════════════════════ */
export function InfrastructureSection() {
  const infra = [
    { Icon: Train, title: "NH-66 Bypass", desc: "A 6-lane bypass connecting North and South Kerala through Thrissur, dramatically cutting travel times." },
    { Icon: Building2, title: "Metro Extension", desc: "Upcoming metro corridor linkage to Kochi, boosting sub-urban residential demand in fringe areas." },
    { Icon: Wifi, title: "Smart City Mission", desc: "Thrissur is a Smart City Mission beneficiary — intelligent traffic, fiber broadband, and digital governance." },
    { Icon: Landmark, title: "Airport Proximity", desc: "Cochin International Airport — India's first fully solar-powered airport — is just 30 km away." },
    { Icon: ShoppingBag, title: "Lulu Mall", desc: "Kerala's largest retail and entertainment hub anchors the city's cosmopolitan appeal and retail economy." },
    { Icon: GraduationCap, title: "KIIFB Projects", desc: "KIIFB-funded infrastructure uplift of roads, bridges, and public amenities across the district by 2026." },
  ];

  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: '#00022e' }}>
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-gold-500/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative h-[520px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop"
                alt="Thrissur Infrastructure"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-black/60 backdrop-blur-sm border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">NH-66 Corridor</span>
                <p className="text-white/80 text-sm mt-2 font-light">Kerala&apos;s most strategic highway connecting state north to south</p>
              </div>
            </div>
            {/* Floating stat */}
            <div className="hidden sm:block absolute -top-6 -right-6 rounded-2xl p-5 shadow-2xl z-10" style={{ background: '#00022e', border: '1px solid rgba(229,161,45,0.3)' }}>
              <p className="text-3xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 mb-1">
                <AnimatedNumber value="₹8,000Cr" />
              </p>
              <p className="text-white/40 text-xs uppercase tracking-wide font-semibold">Infrastructure Pipeline</p>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Infrastructure & Connectivity</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-6 leading-tight">
              Built for the<br />Next 50 Years
            </h2>
            <p className="text-white/50 font-light text-lg leading-relaxed mb-10">
              Thrissur is in the middle of an unprecedented infrastructure boom. Every road widened, every metro planned, every KIIFB project launched — is a catalyst for land value appreciation that benefits early investors.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infra.map((item, i) => {
                const IIcon = item.Icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3 p-4 rounded-xl border hover:border-gold-500/30 transition-colors group" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-gold-500/30 transition-colors" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(229,161,45,0.2)' }}>
                      <IIcon className="w-4 h-4 text-gold-500" />
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-sm text-white group-hover:text-gold-400 transition-colors">{item.title}</h4>
                      <p className="text-white/50 text-xs font-light leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   INVESTMENT HUBS — 6-card map grid
══════════════════════════════════════════ */
export function InvestmentHubs() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 bg-secondary border-y border-border-subtle relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#e5a12d 1px, transparent 1px), linear-gradient(90deg, #e5a12d 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] rounded-full bg-gold-500/[0.04] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">
            Prime Locations
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
            Top Investment Hubs
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-text-muted mt-4 max-w-xl mx-auto font-light">
            Six distinct micro-markets within Thrissur, each with unique value drivers and investment profiles.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentHubs.map((hub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative h-[320px] rounded-2xl overflow-hidden group border border-white/10 hover:border-gold-500/50 transition-all duration-500 shadow-xl"
            >
              <Image src={hub.image} alt={hub.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* ROI badge */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm border border-gold-500/30 text-gold-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                {hub.roi}
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 translate-y-3 group-hover:translate-y-0">
                  <span className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1 block">{hub.tag}</span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{hub.name}</h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{hub.desc}</p>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 group-hover:via-gold-400/50 to-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const lifestyleItems = [
  {
    label: "Educational Institutions",
    count: "50+",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200",
    desc: "Home to Kerala's top academic institutions and medical colleges.",
    sliderName: "education"
  },
  {
    label: "Healthcare Excellence",
    count: "15+",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200",
    desc: "World-class hospitals like Amala Institute for complete wellness.",
    sliderName: "health"
  },
  {
    label: "Dining & Premium Retail",
    count: "200+",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200",
    desc: "Lulu Mall and a vibrant spread of gourmet dining experiences.",
    sliderName: "retail"
  },
  {
    label: "Culture & Spiritual Heritage",
    count: "100+",
    img: "https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=1200",
    desc: "A land of temples and festivals blending heritage with modern life.",
    sliderName: "culture"
  },
];

/* ══════════════════════════════════════════
   LIFESTYLE SECTION - Progressive Carousel
══════════════════════════════════════════ */
export function LifestyleSection() {
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 bg-white relative overflow-hidden text-primary">
      <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-gold-500/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-gold-600 uppercase tracking-widest text-xs font-semibold mb-2">
            Quality of Life
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">
            A Premium Standard of Living
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-2xl mx-auto font-light text-base">
            Experience the perfect blend of modern infrastructure, cultural richness, and world-class amenities.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-secondary"
        >
          <ProgressSlider
            vertical={true}
            fastDuration={300}
            duration={3000}
            activeSlider="education"
            className="flex flex-col lg:flex-row min-h-[750px] lg:h-[500px] bg-white relative"
          >
            <SliderBtnGroup className="lg:relative lg:w-[400px] w-full z-20 flex flex-col h-auto lg:h-full bg-white border-b lg:border-b-0 lg:border-r border-gray-100 overflow-hidden divide-y divide-gray-100">
              {lifestyleItems.map((item) => (
                <SliderBtn
                  key={item.sliderName}
                  value={item.sliderName}
                  className="text-left p-4 lg:p-6 lg:pl-10 flex-1 justify-start min-h-[120px] lg:min-h-0 relative z-10 hover:bg-gray-50 transition-all duration-300 border-none group"
                  progressBarClass="left-0 top-0 bottom-0 bg-gold-500/10 w-[4px] h-full"
                >
                  <h3 className="text-xl lg:text-3xl font-bold font-sans text-gold-600 mb-0.5 lg:mb-1 leading-tight">
                    {item.count}
                  </h3>
                  <h4 className="text-gray-900 font-serif font-semibold tracking-wide text-xs lg:text-lg mb-1 lg:mb-1 line-clamp-1 group-active:text-gold-600">
                    {item.label}
                  </h4>
                  <p className="text-gray-600 text-[11px] lg:text-sm font-medium leading-relaxed pr-2 lg:pr-4 line-clamp-2 lg:line-clamp-none">
                    {item.desc}
                  </p>
                </SliderBtn>
              ))}
            </SliderBtnGroup>

            <SliderContent className="w-full h-full relative z-10">
              {lifestyleItems.map((item) => (
                <SliderWrapper
                  className="h-full w-full"
                  key={item.sliderName}
                  value={item.sliderName}
                >
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-transparent lg:to-transparent" />
                  <Image
                    className="h-full w-full object-cover"
                    src={item.img}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    alt={item.desc}
                  />
                </SliderWrapper>
              ))}
            </SliderContent>
          </ProgressSlider>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   INVESTOR TESTIMONIALS
══════════════════════════════════════════ */
export function InvestorTestimonials() {
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 bg-secondary border-y border-border-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">
            Investor Voices
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
            Those Who Invested. And Won.
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-primary border border-border-subtle hover:border-gold-500/30 rounded-2xl p-8 flex flex-col gap-5 transition-colors"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="text-text-main font-light leading-relaxed italic flex-grow">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold-500/30 flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-text-main font-semibold text-sm">{t.name}</p>
                  <p className="text-gold-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CINEMATIC FINAL CTA
══════════════════════════════════════════ */
export function WhyCTA() {
  return (
    <section className="relative py-16 md:py-36 px-4 sm:px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=2600&auto=format&fit=crop"
          alt="Thrissur CTA"
          fill
          className="object-cover opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black z-0" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[700px] h-[400px] rounded-full bg-gold-500/10 blur-3xl" />
      </div>
      {/* Dot pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "36px 36px"
      }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 px-4 py-2 rounded-full mb-8">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Plots Available Now · Limited Stock</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 mb-6 leading-[1.05]">
            Your Plot in<br />Thrissur Awaits
          </h2>
          <p className="text-white/60 font-light text-xl mb-12 max-w-2xl mx-auto">
            The city is growing. Land is finite. Every day you wait, an opportunity is taken by another investor. Secure your plot in Kerala&apos;s cultural capital today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link href="/plots" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_30px_rgba(229,161,45,0.4)] hover:shadow-[0_0_50px_rgba(229,161,45,0.6)] text-sm uppercase tracking-wide">
              <MapPin className="w-4 h-4" /> Browse Plots
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold py-4 px-10 rounded-xl transition-all text-sm uppercase tracking-wide">
              <Phone className="w-4 h-4" /> Talk to an Expert
            </Link>
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap justify-center gap-6 text-white/30 text-xs">
            {["100% Clear Titles", "DTCP Approved", "12+ Years Track Record", "1,800+ Happy Clients"].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-gold-600" /> {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


