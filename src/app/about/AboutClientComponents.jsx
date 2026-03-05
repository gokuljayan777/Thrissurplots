"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Map,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  Users,
  Building2,
  Star,
  Phone,
  MessageCircle,
  ArrowRight,
  Leaf,
  Heart,
  Eye,
  Zap,
  Globe,
} from "lucide-react";

/* ─── Values data ─── */
const values = [
  {
    icon: ShieldCheck,
    title: "Unwavering Integrity",
    desc: "Every transaction is conducted with complete transparency — no hidden fees, no dual agency, no compromises.",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Eye,
    title: "Deep Local Insight",
    desc: "12+ years of Thrissur market intelligence. We know every micro-market, price trend, and growth corridor.",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: Heart,
    title: "Client-First Always",
    desc: "We earn a client for life, not just a commission. Our post-sale support continues long after registration.",
    color: "from-rose-500/20 to-rose-500/5",
  },
  {
    icon: Zap,
    title: "Speed & Precision",
    desc: "Same-day site visits, 48-hour legal reports, fast-tracked registrations. We move at your pace.",
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    icon: Globe,
    title: "NRI Expertise",
    desc: "Dedicated NRI desk with remote documentation, virtual tours, POA assistance, and FEMA-compliant advice.",
    color: "from-teal-500/20 to-teal-500/5",
  },
  {
    icon: Leaf,
    title: "Sustainable Vision",
    desc: "We promote eco-responsible land use, from reforestation-eligible plots to vastu-aligned green layouts.",
    color: "from-green-500/20 to-green-500/5",
  },
];

/* ─── Timeline / Journey ─── */
const timeline = [
  {
    year: "2012",
    title: "The Founding",
    desc: "Started with a single office in Swaraj Round, Thrissur with a mission to make premium land affordable and accessible to all.",
  },
  {
    year: "2015",
    title: "First 500 Transactions",
    desc: "Closed our 500th plot sale, establishing ourselves as Thrissur's fastest-growing real estate consultancy.",
  },
  {
    year: "2018",
    title: "NRI Desk Launch",
    desc: "Launched dedicated NRI services for Kerala diaspora in UAE, UK, and USA — enabling remote, trusted land investment.",
  },
  {
    year: "2021",
    title: "Digital Transformation",
    desc: "Built Kerala's first end-to-end digital plot listing platform, enabling virtual site tours and e-signing of documents.",
  },
  {
    year: "2024",
    title: "1,800+ Families Served",
    desc: "Crossed the milestone of 1,800 satisfied families, with a referral rate of over 70% — testament to our trust.",
  },
  {
    year: "2026",
    title: "Expanding Horizons",
    desc: "Launching premium managed farm plots and commercial development advisory services across Thrissur district.",
  },
];

/* ─── expertise cards ─── */
const expertiseItems = [
  {
    icon: TrendingUp,
    title: "Investment Land Advisory",
    desc: "Identifying high-growth corridors with exponential ROI potential before the market catches on.",
    stat: "₹500Cr+",
    statLabel: "Transactions Managed",
  },
  {
    icon: Map,
    title: "Agricultural Estates",
    desc: "Navigating complex zoning laws and evaluating soil and water quality for high-yield farming investments.",
    stat: "150+",
    statLabel: "Farm Acres Transacted",
  },
  {
    icon: Building2,
    title: "Commercial & Residential",
    desc: "Securing prime spots in the city center and peaceful layouts in expanding suburban neighborhoods.",
    stat: "98%",
    statLabel: "Legal Clearance Rate",
  },
];

/* ─── Trust pillars ─── */
const trustPillars = [
  {
    icon: ShieldCheck,
    title: "100% Clear Titles",
    desc: "Rigorous legal checks, encumbrance verification, and zero litigation history on every plot.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Pricing",
    desc: "No hidden charges or surprise commissions. What you see is the absolute truth.",
  },
  {
    icon: Award,
    title: "Verified Sellers",
    desc: "Direct connections to landowners ensuring legitimate and fully secure property transfers.",
  },
  {
    icon: Clock,
    title: "End-to-End Support",
    desc: "From initial site visit to final registration, we handle every document and deadline.",
  },
];

/* ─── Coverage areas ─── */
const areas = [
  "Swaraj Round", "Peechi", "Mannuthy", "Kuttanellur",
  "Ayyanthole", "Punkunnam", "Ollur", "Amala Nagar",
  "Chalakudy", "Irinjalakuda", "Koratty", "Guruvayur Road",
];

/* ─── Team members ─── */
const team = [
  {
    name: "Rajesh Nair",
    role: "Founder & Managing Director",
    bio: "20+ years in Thrissur real estate. Known for ethical practice and deep market intelligence.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Anitha Krishnan",
    role: "Head of Legal & Compliance",
    bio: "Retired sub-registrar with 25 years of SRO experience. Guarantees airtight documentation.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Subin Mathew",
    role: "NRI Relations Manager",
    bio: "Former expatriate, fluent in the challenges of remote land investment. Trusted by 400+ NRI clients.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Divya George",
    role: "Market Research Analyst",
    bio: "IIM Kozhikode alumna. Identifies emerging corridors before prices spike using macro-economic data.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];

/* ─── Stats ─── */
const stats = [
  { number: "12+", label: "Years of Experience" },
  { number: "500+", label: "Premium Plots" },
  { number: "1,800+", label: "Happy Families" },
  { number: "100%", label: "Legal Clearance" },
];

/* ─── Cinematic Hero ─── */
export function AboutHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Parallax Bg */}
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 top-[-15%] bottom-[-15%] h-[130%] z-0">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2600&auto=format&fit=crop"
          alt="About Thrissur Plots"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
      {/* Dot pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "36px 36px"
      }} />

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Est. 2012 · Thrissur, Kerala</span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05]"
          >
            Building a{" "}
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
              Heritage
            </span>{" "}
            <br className="hidden md:block" />
            in Real Estate
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-sans font-light"
        >
          Over a decade of trusted guidance, legal precision, and deep local knowledge — transforming land acquisition into a legacy you&apos;re proud of.
        </motion.p>

        {/* Floating stat badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {stats.map((s, i) => (
            <div key={i} className="bg-black/50 backdrop-blur-md border border-white/10 px-5 py-3 rounded-xl text-center">
              <p className="text-xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">{s.number}</p>
              <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-gold-500/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ─── Company Story ─── */
export function CompanyStory() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold-500/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image with floating card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-gold-600/20 group">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop"
                alt="Our Story"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/70 backdrop-blur-md border border-gold-500/20 rounded-2xl p-4">
                  <p className="text-gold-400 text-xs uppercase tracking-widest mb-1">Our Promise</p>
                  <p className="text-white font-serif font-semibold text-lg leading-snug">&ldquo;Every plot.  Every document. Zero compromise.&rdquo;</p>
                </div>
              </div>
            </div>

            {/* Floating years badge */}
            <div className="hidden sm:flex absolute -top-6 -right-6 w-28 h-28 bg-gold-500 rounded-3xl flex-col items-center justify-center shadow-[0_0_30px_rgba(229,161,45,0.4)] rotate-3">
              <span className="text-3xl font-bold font-sans text-black leading-none">12+</span>
              <span className="text-black text-xs font-semibold mt-1 uppercase tracking-wide">Years</span>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-serif italic text-text-main leading-tight">
                Building futures,<br /> one plot at a time.
              </h2>
            </div>

            <div className="space-y-5 text-text-muted font-light leading-relaxed text-lg">
              <p>
                Founded on the principles of transparency and deep local market knowledge, Thrissur Plots has evolved into the region&apos;s premier destination for exclusive real estate. We don&apos;t just sell land — we curate opportunities that align perfectly with your vision and investment logic.
              </p>
              <p>
                As Thrissur&apos;s leading land acquisition and advisory firm, our mission is to simplify the complex landscape of real estate transactions. With a dedicated team of legal experts, market analysts, and local area specialists, we provide a seamless, end-to-end buying experience tailored for both local residents and NRI investors.
              </p>
            </div>

            {/* Quote */}
            <div className="flex items-start gap-4 bg-secondary border border-border-subtle rounded-2xl p-6">
              <div className="h-full w-1 self-stretch bg-gradient-to-b from-gold-500 to-gold-400 rounded-full flex-shrink-0" />
              <p className="text-text-main font-serif italic text-lg">
                &ldquo;Our legacy is built on the trust of over two thousand happy families who have found their foundation with us.&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/plots" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold uppercase tracking-wide py-3.5 px-8 rounded-xl transition-all text-sm">
                View Our Plots <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 border border-border-strong hover:border-gold-500/50 text-text-main hover:text-gold-500 font-semibold uppercase tracking-wide py-3.5 px-8 rounded-xl transition-all text-sm">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Row ─── */
export function StatsRow() {
  return (
    <section className="py-16 px-6 bg-secondary border-y border-border-subtle transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 mb-2">{s.number}</p>
              <p className="text-text-muted text-sm uppercase tracking-widest font-semibold">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Journey Timeline ─── */
export function JourneyTimeline() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 bg-primary relative overflow-hidden">
      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
          >
            Our Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
          >
            A Decade of Milestones
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-px bg-gradient-to-b from-gold-500/50 via-gold-500/20 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
              >
                {/* Content card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"} pl-16 md:pl-0`}>
                  <div className={`bg-secondary border border-border-subtle hover:border-gold-500/30 rounded-2xl p-6 transition-colors group`}>
                    <span className="text-gold-500 font-bold font-sans text-sm uppercase tracking-widest mb-2 block">{item.year}</span>
                    <h3 className="font-serif text-text-main font-semibold text-lg mb-2 group-hover:text-gold-400 transition-colors">{item.title}</h3>
                    <p className="text-text-muted text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Year bubble on line */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                  className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-gold-500 border-4 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(229,161,45,0.5)] flex-shrink-0"
                />

                {/* Empty side for alternating layout */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Expertise Cards ─── */
export function ExpertiseSection() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: '#00022e' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "repeating-linear-gradient(45deg, #e5a12d 0, #e5a12d 1px, transparent 0, transparent 50%)",
        backgroundSize: "20px 20px"
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
          >
            Our Expertise
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
          >
            Decades of Land Transactions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 mt-4 max-w-xl mx-auto font-light"
          >
            Handling diverse real estate portfolios requires unmatched precision. Here is how we excel across different asset classes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertiseItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl p-8 group transition-all duration-500 hover:shadow-[0_8px_30px_rgba(229,161,45,0.15)] relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(229,161,45,0.15)' }}
            >
              <div className="absolute top-0 right-0 text-[120px] font-serif text-gold-500/[0.04] leading-none pointer-events-none select-none">{String(i + 1).padStart(2, "0")}</div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:border-gold-500/30 transition-all" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(229,161,45,0.2)' }}>
                  <item.icon className="w-7 h-7 text-gold-500" />
                </div>
                <h3 className="text-xl font-serif text-white font-semibold mb-3 group-hover:text-gold-400 transition-colors">{item.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed mb-6">{item.desc}</p>
                <div className="pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-3xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{item.stat}</span>
                  <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{item.statLabel}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Our Values ─── */
export function OurValues() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] rounded-full bg-gold-500/[0.04] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
          >
            What Drives Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
          >
            Our Core Values
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-secondary border border-border-subtle hover:border-gold-500/30 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(229,161,45,0.08)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary border border-border-strong flex items-center justify-center mb-6 group-hover:border-gold-500/30 transition-colors">
                  <v.icon className="w-6 h-6 text-gold-500" />
                </div>
                <h3 className="font-serif text-text-main font-semibold text-lg mb-3 group-hover:text-gold-400 transition-colors">{v.title}</h3>
                <p className="text-text-muted text-sm font-light leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Meet The Team ─── */
export function MeetTheTeam() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 relative overflow-hidden" style={{ background: '#00022e' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
          >
            The People Behind
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
          >
            Meet Our Expert Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 mt-4 max-w-xl mx-auto font-light"
          >
            Every client deserves access to the finest experts. Our team combines decades of local experience, legal precision, and market acumen.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-primary border border-border-subtle hover:border-gold-500/40 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(229,161,45,0.1)]"
            >
              {/* Team photo */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-semibold text-text-main text-lg mb-1 group-hover:text-gold-400 transition-colors">{member.name}</h3>
                <p className="text-gold-500 text-xs uppercase tracking-widest font-semibold mb-3">{member.role}</p>
                <p className="text-text-muted text-sm font-light leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Trust Pillars ─── */
export function TrustPillars() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 bg-primary relative overflow-hidden border-t border-border-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
          >
            Why Trust Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
          >
            Our Pillars of Trust
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center space-y-4 p-8 bg-secondary border border-border-strong rounded-2xl hover:border-gold-600/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-full bg-primary border border-border-subtle flex items-center justify-center text-gold-500 group-hover:scale-110 group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all duration-300">
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className="text-text-main font-serif font-semibold text-lg group-hover:text-gold-400 transition-colors">{p.title}</h3>
              <p className="text-text-muted text-sm font-light leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Coverage Areas ─── */
export function CoverageSection() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold">Coverage Areas</p>
            <h2 className="text-4xl md:text-5xl font-serif italic text-text-main leading-tight">Where We Operate</h2>
            <p className="text-text-muted font-light text-lg leading-relaxed">
              Our extensive network spans the entirety of the Thrissur district. From the bustling epicenter to the tranquil outskirts — we have localized agents who understand the micro-markets of every neighbourhood.
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-4">
              {areas.map((area, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 group"
                >
                  <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <span className="text-text-main font-medium text-sm group-hover:text-gold-400 transition-colors">{area}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-border-strong shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop"
                alt="Thrissur Coverage Map"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/70 backdrop-blur-md border border-gold-500/20 p-4 rounded-2xl">
                  <p className="text-white font-serif font-semibold text-lg">Thrissur District</p>
                  <p className="text-gold-400 text-sm">100% coverage by our local experts</p>
                </div>
              </div>
              {/* Pulse dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-500" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
export function AboutCTA() {
  return (
    <section className="relative py-16 md:py-32 px-4 sm:px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Contact CTA"
          fill
          className="object-cover opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-0" />
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-[700px] h-[350px] rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 px-4 py-2 rounded-full mb-8">
            <Star className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Start Your Journey</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 mb-6 leading-[1.1]">
            Ready to Find Your<br />Perfect Plot?
          </h2>
          <p className="text-white/60 font-light text-lg mb-12 max-w-xl mx-auto">
            Let our experts guide you every step of the way. Whether you&apos;re a first-time buyer or a seasoned investor, we make land ownership simple, safe, and rewarding.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_30px_rgba(229,161,45,0.4)] hover:shadow-[0_0_40px_rgba(229,161,45,0.6)] text-sm uppercase tracking-wide">
              <Phone className="w-4 h-4" /> Talk to an Expert
            </Link>
            <Link href="https://wa.me/919876543210" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold py-4 px-10 rounded-xl transition-all text-sm uppercase tracking-wide">
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </Link>
          </div>
          <p className="mt-8 text-white/30 text-xs">Free consultation · No commitment · 7 days a week</p>
        </motion.div>
      </div>
    </section>
  );
}


