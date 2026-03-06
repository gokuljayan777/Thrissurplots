"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  HandCoins,
  FileText,
  Compass,
  Globe,
  ShieldCheck,
  Users,
  Clock,
  CheckCircle2,
  TrendingUp,
  Landmark,
  Phone,
  MessageCircle,
  ChevronDown,
  Star,
  Zap,
  Building2,
} from "lucide-react";

/* ─── All Services ─── */
const services = [
  {
    id: "buying",
    Icon: MapPin,
    title: "Premium Land Buying",
    tagline: "Find Your Perfect Plot",
    description: "Discover exclusive residential and commercial plots in highly sought-after locations across Thrissur. We handle market research, price negotiation, and legal due diligence — delivering the perfect foundation for your vision.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
    features: ["Curated Listing Access", "Price Negotiation", "Site Visit Coordination", "Legal Pre-check"],
  },
  {
    id: "selling",
    Icon: HandCoins,
    title: "Strategic Land Selling",
    tagline: "Maximize Your Return",
    description: "Maximize your property's value with targeted marketing and our extensive buyer network. We connect your land with serious, high-net-worth buyers and manage the entire transaction from valuation to registration.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop",
    features: ["Market Valuation", "Buyer Network Access", "Negotiation Support", "End-to-End Closing"],
  },
  {
    id: "investment",
    Icon: TrendingUp,
    title: "Investment Consultation",
    tagline: "Data-Driven Growth Advisory",
    description: "Data-driven advisory for high-yield real estate portfolios. We identify emerging growth corridors in Thrissur to ensure exponential ROI on your land assets — residential, commercial, or agricultural.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    features: ["ROI Analysis", "Growth Corridor Mapping", "Portfolio Strategy", "Market Intelligence"],
  },
  {
    id: "documentation",
    Icon: FileText,
    title: "Documentation & Legal",
    tagline: "Zero Paperwork Hassle",
    description: "Complete peace of mind. Our legal experts manage encumbrance certificates, title verifications, patta transfers, DTCP approvals, and full registration formalities — with zero hassle on your part.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop",
    features: ["Encumbrance Verification", "Title Clearance", "Patta Transfer", "SRO Registration"],
  },
  {
    id: "site-visit",
    Icon: Compass,
    title: "Site Visit Assistance",
    tagline: "See Before You Sign",
    description: "Experience the land before you buy. We arrange guided, chauffeured tours to short-listed properties, providing on-ground insights into neighbourhood dynamics, road access, utilities, and terrain.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
    features: ["Chauffeured Visits", "Expert Commentary", "Vastu Assessment", "Photo & Video Reports"],
  },
  {
    id: "nri",
    Icon: Globe,
    title: "NRI Advisory Desk",
    tagline: "Trusted Remote Investment",
    description: "A dedicated service for Kerala's global diaspora. Virtual property tours, POA drafting, FEMA-compliant transactions, and a single point of contact who manages everything on your behalf from abroad.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop",
    features: ["Virtual Tours", "POA Assistance", "FEMA Compliance", "Remote Documentation"],
  },
];

/* ─── Process steps ─── */
const processSteps = [
  { num: "01", Icon: Phone, title: "Initial Consultation", desc: "A free 30-minute call to understand your requirements, budget, and long-term vision." },
  { num: "02", Icon: MapPin, title: "Property Shortlisting", desc: "We curate a personalised list of verified plots matching your exact criteria within 48 hours." },
  { num: "03", Icon: Compass, title: "Guided Site Visits", desc: "Chauffeured visits to your top picks with on-ground expert commentary and vastu insights." },
  { num: "04", Icon: ShieldCheck, title: "Legal Due Diligence", desc: "Our legal team runs exhaustive title, encumbrance, and DTCP checks — full clearance guaranteed." },
  { num: "05", Icon: FileText, title: "Negotiation & Agreement", desc: "We negotiate the best price and draft a legally sound sale agreement protecting both parties." },
  { num: "06", Icon: CheckCircle2, title: "Registration & Handover", desc: "We liaise with the SRO and hand you a fully registered title deed — stress-free." },
];

/* ─── Why us stats ─── */
const whyStats = [
  { value: "12+", label: "Years Experience", Icon: Clock },
  { value: "1,800+", label: "Happy Clients", Icon: Users },
  { value: "100%", label: "Legal Clearance", Icon: ShieldCheck },
  { value: "₹500Cr+", label: "Transactions Managed", Icon: Landmark },
];

/* ─── Highlights ─── */
const highlights = [
  { Icon: ShieldCheck, title: "100% Clear Titles", desc: "Every plot undergoes rigorous legal verification with zero litigation history." },
  { Icon: Clock, title: "48-Hour Turnaround", desc: "Shortlists, legal reports, and site visit bookings done in under 48 hours." },
  { Icon: Globe, title: "NRI-Friendly", desc: "Remote POA, virtual tours, and FEMA-compliant transactions for diaspora investors." },
  { Icon: TrendingUp, title: "Proven ROI", desc: "Our plots average 18–35% appreciation annually across Thrissur corridors." },
];

/* ─── Testimonials ─── */
const testimonials = [
  { name: "Arun Menon", role: "Residential Buyer", text: "Their land buying service was flawless — from shortlisting to registration in under 3 weeks.", avatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 5 },
  { name: "Priya Nair", role: "NRI Investor, Dubai", text: "The NRI advisory desk handled everything remotely. I never had to fly down for a single document.", avatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5 },
  { name: "Suresh Kumar", role: "Commercial Buyer", text: "Investment consultation was data-backed and accurate. My plot has already appreciated 40% in 18 months.", avatar: "https://randomuser.me/api/portraits/men/55.jpg", rating: 5 },
];

/* ─── FAQ ─── */
const faqs = [
  { q: "How quickly can I see shortlisted plots?", a: "Within 48 hours of your initial consultation, we present a curated digital portfolio. Site visits can be arranged within 72 hours in most cases." },
  { q: "Do you charge any fee for consultation?", a: "The initial consultation is completely free. Our commission is only collected upon successful plot registration — no upfront fees." },
  { q: "Can NRI clients complete purchase remotely?", a: "Yes. We support virtual tours, video walkthrough reports, POA drafting, and remote document signing with online notarization support." },
  { q: "What does legal due diligence cover?", a: "We verify encumbrance certificates (EC), title deeds, patta, sketch, DTCP approval, building setbacks, and any litigation history on the property." },
];

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
export function ServicesHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop"
          alt="Premium Services"
          fill
          className="object-cover opacity-25"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black z-0" />
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "36px 36px"
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Premium Real Estate Solutions</span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05]"
          >
            Our{" "}
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
              Bespoke
            </span>{" "}
            Services
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-sans font-light mb-12"
        >
          From the first consultation to the final registration — we handle every detail so you can focus on what matters. World-class service, local expertise, zero compromise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {whyStats.map((s, i) => {
            const StatIcon = s.Icon;
            return (
              <div key={i} className="bg-black/50 backdrop-blur-md border border-white/10 px-5 py-3 rounded-xl text-center min-w-[120px]">
                <p className="text-xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">{s.value}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-[10px] uppercase tracking-widest">Explore Services</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-gold-500/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICES DETAIL — Bento layout
══════════════════════════════════════════ */
export function ServicesDetail() {
  const featured = services[0];
  const FeaturedIcon = featured.Icon;

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "repeating-linear-gradient(45deg, #e5a12d 0, #e5a12d 1px, transparent 0, transparent 50%)",
        backgroundSize: "20px 20px"
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
          >
            Six Ways We Serve You
          </motion.h2>
        </div>

        <div className="space-y-8">
          {/* Featured hero card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[500px] md:h-[560px] rounded-3xl overflow-hidden group border border-white/10 hover:border-gold-500/50 transition-colors duration-500 shadow-2xl"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-10 md:p-16 flex flex-col justify-center max-w-xl">
              <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 px-3 py-1 rounded-full mb-6 w-fit">
                <Zap className="w-3 h-3 text-gold-400" />
                <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Most Popular</span>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <FeaturedIcon className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest">{featured.tagline}</p>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">{featured.title}</h3>
                </div>
              </div>
              <p className="text-white/75 font-light leading-relaxed text-lg mb-8">{featured.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.features.map((f, i) => (
                  <span key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
                    <CheckCircle2 className="w-3 h-3 text-gold-400" /> {f}
                  </span>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold uppercase tracking-wide py-3.5 px-8 rounded-xl text-sm transition-all w-fit shadow-[0_0_20px_rgba(229,161,45,0.4)]">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
          </motion.div>

          {/* 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.slice(1, 3).map((service, i) => {
              const Icon = service.Icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="relative h-[420px] rounded-3xl overflow-hidden group border border-white/10 hover:border-gold-500/50 transition-colors duration-500 shadow-xl"
                >
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                          <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest">{service.tagline}</p>
                          <h3 className="text-xl md:text-2xl font-serif font-bold text-white">{service.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-300 font-light leading-relaxed text-sm mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">{service.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {service.features.map((f, j) => (
                          <span key={j} className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full">{f}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-gold-400 font-semibold text-sm uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-150">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 group-hover:via-gold-400/50 to-transparent transition-colors duration-500" />
                </motion.div>
              );
            })}
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(3).map((service, i) => {
              const Icon = service.Icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  className="relative h-[400px] rounded-3xl overflow-hidden group border border-white/10 hover:border-gold-500/50 transition-colors duration-500 shadow-xl"
                >
                  <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25" />
                  <div className="absolute inset-0 p-7 flex flex-col justify-end">
                    <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="w-11 h-11 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-gold-400" />
                      </div>
                      <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">{service.tagline}</p>
                      <h3 className="text-xl font-serif font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-300 font-light text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">{service.description}</p>
                      <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 group-hover:via-gold-400/50 to-transparent transition-colors duration-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   OUR PROCESS — 6 Steps
══════════════════════════════════════════ */
export function OurProcess() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] rounded-full bg-gold-500/[0.04] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
          >
            Our End-to-End Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-muted mt-4 max-w-xl mx-auto font-light"
          >
            Six streamlined steps — from the first call to final handover — ensuring every client experience is seamless, transparent, and stress-free.
          </motion.p>
        </div>

        <div className="gsap-process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, i) => {
            const StepIcon = step.Icon;
            return (
              <div
                key={i}
                className="gsap-process-step relative bg-primary border border-border-subtle hover:border-gold-500/40 rounded-2xl p-8 group transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-[80px] font-serif text-gold-500/[0.15] leading-none select-none pointer-events-none">{step.num}</div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-secondary border border-border-strong flex items-center justify-center mb-6 group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-all">
                    <StepIcon className="w-7 h-7 text-gold-500" />
                  </div>
                  <span className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2 block">Step {step.num}</span>
                  <h3 className="text-lg font-serif font-semibold text-text-main mb-3 group-hover:text-gold-400 transition-colors">{step.title}</h3>
                  <p className="text-text-muted text-sm font-light leading-relaxed">{step.desc}</p>
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
   WHY CHOOSE US
══════════════════════════════════════════ */
export function WhyChooseUs() {
  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 relative overflow-hidden border-t border-white/10" style={{ background: '#00022e' }}>
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-gold-500/[0.03] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Our Advantage</p>
            <h2 className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-6">
              Why 1,800+ Clients<br />Chose Us
            </h2>
            <p className="text-white/50 font-light text-lg leading-relaxed mb-10">
              We don&apos;t just list properties — we build trust. Every interaction with Thrissur Plots is backed by transparency, legal rigor, and genuine care for your financial future.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {whyStats.map((s, i) => {
                const StatIcon = s.Icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(229,161,45,0.15)' }}
                  >
                    <StatIcon className="w-5 h-5 text-gold-500 mb-3" />
                    <p className="text-3xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 mb-1">{s.value}</p>
                    <p className="text-white/40 text-xs uppercase tracking-wider font-semibold">{s.label}</p>
                  </motion.div>
                );
              })}
            </div>

            <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold uppercase tracking-wide py-3.5 px-8 rounded-xl transition-all text-sm shadow-[0_0_20px_rgba(229,161,45,0.25)]">
              Start Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {highlights.map((h, i) => {
              const HIcon = h.Icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-6 group transition-all duration-500 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:border-gold-500/30 transition-colors" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(229,161,45,0.2)' }}>
                    <HIcon className="w-5 h-5 text-gold-500" />
                  </div>
                  <h3 className="font-serif font-semibold text-white mb-2 group-hover:text-gold-400 transition-colors">{h.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{h.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIAL STRIP
══════════════════════════════════════════ */
export function TestimonialStrip() {
  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 bg-secondary border-y border-border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
          >
            Client Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
          >
            Real Results. Real People.
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
   FAQ SECTION
══════════════════════════════════════════ */
export function ServicesFAQ() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-14 md:py-28 px-4 sm:px-6 bg-primary relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-gold-500/[0.04] blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
          >
            Have Questions?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
          >
            Frequently Asked
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-border-subtle hover:border-gold-500/30 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <span className="font-serif font-semibold text-text-main pr-4">{faq.q}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center transition-all duration-300 ${active === i ? "bg-gold-500 border-gold-500 rotate-180" : ""}`}>
                  <ChevronDown className={`w-4 h-4 transition-colors ${active === i ? "text-black" : "text-gold-500"}`} />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-6 text-text-muted font-light leading-relaxed text-sm">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FINAL CTA
══════════════════════════════════════════ */
export function ServicesCTA() {
  return (
    <section className="relative py-16 md:py-32 px-4 sm:px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
          alt="CTA background"
          fill
          className="object-cover opacity-15"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black z-0" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
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
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Free Consultation — No Commitment</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 mb-6 leading-[1.1]">
            Ready to Secure<br />Your Legacy?
          </h2>
          <p className="text-white/60 font-light text-lg mb-12 max-w-xl mx-auto">
            Speak directly with our local land experts. Whether buying, selling, or investing — one conversation changes everything.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_30px_rgba(229,161,45,0.4)] hover:shadow-[0_0_40px_rgba(229,161,45,0.6)] text-sm uppercase tracking-wide">
              <Phone className="w-4 h-4" /> Schedule Free Consultation
            </Link>
            <Link href="https://wa.me/919876543210" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold py-4 px-10 rounded-xl transition-all text-sm uppercase tracking-wide">
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </Link>
          </div>
          <p className="mt-8 text-white/30 text-xs">Available 7 days a week · Response within 30 minutes</p>
        </motion.div>
      </div>
    </section>
  );
}


