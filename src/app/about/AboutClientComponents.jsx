"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Map,
  TrendingUp,
  Award,
  Clock,
  MapPin,
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
  ExternalLink,
  Sparkles
} from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";

/* ─── DATA STRATEGY ─── */
const expertiseItems = [
  { 
    icon: Building2, 
    title: "Advisory", 
    desc: "Predicting the next 'IT Corridor' before it hits the news.", 
    statLabel: "Total Volume", 
    stat: "₹500Cr+" 
  },
  { 
    icon: ShieldCheck, 
    title: "Verification", 
    desc: "Our legal desk is the tightest in Thrissur. Period.", 
    statLabel: "Success Rate", 
    stat: "100%" 
  },
  { 
    icon: Globe, 
    title: "Global Reach", 
    desc: "Remote buying for NRIs made as easy as local purchases.", 
    statLabel: "NRI Base", 
    stat: "800+" 
  },
];

const milestones = [
  { year: "2012", title: "The Inception", desc: "Small team, massive vision in Thrissur." },
  { year: "2015", title: "Scale Phase", desc: "First 100 acres of verified land transacted." },
  { year: "2019", title: "NRI Gateway", desc: "Launched dedicated desk for global Malayalis." },
  { year: "2023", title: "Digital First", desc: "Launched AI-driven plot valuation tools." },
  { year: "2026", title: "Future Soil", desc: "Introducing sustainable managed farmsteads." },
];

/* ─── 0. ELITE BACKGROUND ENGINE ─── */
const BackgroundGlows = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-white">
    {/* Sophisticated Grain Overlay */}
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://res.cloudinary.com/dzv9idfvq/image/upload/v1615407330/noise_v9v7v9.png')] invert" />
    
    <motion.div 
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
        x: [0, 50, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gold-200/20 blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
        x: [0, -30, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gold-100/30 blur-[150px]" 
    />
  </div>
);

/* ─── 1. CINEMATIC PERSPECTIVE HERO ─── */
export function AboutHero() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const maskSize = useTransform(scrollYProgress, [0, 1], ["100%", "40%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.4]);

  return (
    <section ref={container} className="relative h-[200vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* The "Masked" Perspective Layer */}
        <motion.div 
          style={{ clipPath: `circle(${maskSize} at 50% 50%)` }}
          className="absolute inset-0 z-0"
        >
          <motion.div style={{ scale: imgScale }} className="relative h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2800"
              alt="Elite Territory"
              fill
              className="object-cover brightness-[0.7] contrast-[1.1]"
              priority
            />
            <div className="absolute inset-0 bg-neutral-900/20" />
          </motion.div>
        </motion.div>

        {/* Cinematic Content Layer */}
        <motion.div 
          style={{ x: "-50%", y: "-50%", opacity: textOpacity, scale: textScale }}
          className="absolute top-1/2 left-1/2 z-10 text-center w-full px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="h-px w-12 bg-gold-500" />
            <span className="text-gold-500 uppercase tracking-[0.5em] text-[10px] font-black">Legacy Preserved</span>
            <span className="h-px w-12 bg-gold-500" />
          </motion.div>

          <h1 className="text-[12vw] md:text-[10vw] font-serif leading-[0.8] text-white tracking-tighter drop-shadow-2xl">
            Curating <br /> <span className="italic font-light">Elegance.</span>
          </h1>
        </motion.div>

        <motion.div
          style={{ 
            opacity: useTransform(scrollYProgress, [0.4, 0.7], [0, 1]),
            y: useTransform(scrollYProgress, [0.4, 0.7], [20, 0])
          }}
          className="relative z-10 max-w-4xl px-6 text-center"
        >
          <p className="text-white text-lg md:text-3xl font-light leading-relaxed font-serif italic drop-shadow-2xl">
            "We transform the landscape of Thrissur into a canvas of opportunity. Every plot we curate is a testament to legal precision and architectural vision, crafted for those who seek to build not just a structure, but a legacy that endures for generations. Our commitment is to the soil of our heritage and the transparency of every transaction."
          </p>
        </motion.div>

        {/* Scroll Callout */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 overflow-hidden">
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gold-600/60 uppercase tracking-widest text-[9px] font-bold">The Evolution</span>
            <div className="h-10 w-px bg-gradient-to-b from-gold-500 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. CORE VALUES / STORY ─── */
export function CoreValues() {
  return (
    <section className="py-24 bg-white text-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-gold-600 font-bold tracking-widest text-sm uppercase">Our Pedigree</h2>
              <h3 className="text-4xl md:text-5xl font-serif italic">Where tradition meets legal precision.</h3>
            </div>
            <p className="text-neutral-500 text-lg leading-relaxed font-light">
              In a market often clouded by uncertainty, Thrissur Plots was founded to provide a "Safe Harbor" for investors.
              We've spent 12 years mapping the DNA of Thrissur's soil, ensuring every square foot we sell is legally bulletproof.
            </p>
            <div className="grid grid-cols-2 gap-8 py-6 border-y border-neutral-100">
              <div>
                <p className="text-3xl font-serif text-gold-600"><AnimatedNumber value="1.8k+" /></p>
                <p className="text-neutral-400 text-xs uppercase tracking-widest mt-1">Families Settled</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-gold-600"><AnimatedNumber value="100%" /></p>
                <p className="text-neutral-400 text-xs uppercase tracking-widest mt-1">Title Clarity</p>
              </div>
            </div>
            <Link href="/plots" className="group flex items-center gap-4 text-gold-700 font-semibold tracking-wide uppercase text-sm">
              Explore our current holdings
              <div className="w-10 h-10 rounded-full border border-gold-400/30 flex items-center justify-center group-hover:bg-gold-600 group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-100 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop"
                fill
                alt="Greenery"
                className="object-cover"
              />
            </div>
            <motion.div
              whileHover={{ y: -10 }}
              className="absolute -bottom-10 -left-10 hidden xl:block bg-white/80 backdrop-blur-xl border border-neutral-100 p-8 rounded-2xl max-w-xs shadow-2xl"
            >
              <Heart className="text-gold-600 mb-4 w-8 h-8" />
              <p className="text-sm italic font-serif leading-relaxed text-neutral-800">
                "Our promise is simple: If we wouldn't buy the land for our own family, we won't sell it to yours."
              </p>
            </motion.div>
          </div>
        </div>

        {/* Expertise Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          {expertiseItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15 }}
              className="p-10 rounded-3xl bg-neutral-50 border border-neutral-100 flex flex-col items-start space-y-6 group transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold-50 flex items-center justify-center text-gold-600 group-hover:bg-gold-600 group-hover:text-white transition-all duration-500">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif text-neutral-900">{item.title}</h3>
              <p className="text-neutral-500 font-light leading-relaxed">{item.desc}</p>
              <div className="mt-auto pt-6 border-t border-neutral-100 w-full">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">{item.statLabel}</p>
                <p className="text-2xl font-mono text-gold-700">{item.stat}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. LIQUID HORIZONTAL JOURNEY ─── */
export function TheJourney() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* The Liquid Line (Static Background) */}
        <svg className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 opacity-10 pointer-events-none">
          <path d="M 0 50 Q 250 10 500 50 T 1000 50 T 1500 50 T 2000 50" fill="none" stroke="black" strokeWidth="2" />
        </svg>

        {/* The Active "Line of Trust" */}
        <motion.svg 
          style={{ pathLength }}
          className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 z-10 pointer-events-none"
        >
          <motion.path 
            d="M 0 50 Q 250 10 500 50 T 1000 50 T 1500 50 T 2000 50" 
            fill="none" 
            stroke="#b68d40" 
            strokeWidth="3" 
            strokeDasharray="0 1"
          />
        </motion.svg>

        <motion.div style={{ x }} className="flex gap-24 px-[15vw] items-center whitespace-nowrap">
          {milestones.map((m, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start min-w-[450px] relative group"
            >
              {/* Year Backdrop */}
              <h4 className="text-[200px] font-serif leading-none text-neutral-100 font-black group-hover:text-gold-50 transition-colors duration-500">
                {m.year}
              </h4>
              
              {/* Milestone Card */}
              <div className="mt-[-60px] ml-16 p-10 bg-white border border-neutral-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-[320px] rounded-2xl relative z-20 overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
                <h5 className="text-xl font-bold text-neutral-900 mb-3 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gold-600" />
                  {m.title}
                </h5>
                <p className="text-neutral-500 leading-relaxed font-light text-sm whitespace-normal italic">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Luxury End Cap */}
          <div className="min-w-[400px] flex flex-col items-center justify-center text-center">
             <motion.div 
               animate={{ scale: [1, 1.1, 1] }} 
               transition={{ duration: 4, repeat: Infinity }}
               className="w-32 h-32 rounded-full border-2 border-gold-200 flex items-center justify-center"
             >
               <Sparkles className="text-gold-500 w-12 h-12" />
             </motion.div>
             <h4 className="mt-8 text-2xl font-serif italic text-neutral-400">To be continued...</h4>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 4. FINAL CALL ─── */
export function FinalCTA() {
  return (
    <section className="relative py-40 overflow-hidden text-center bg-white">
      <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-12">
        <h2 className="text-7xl md:text-8xl font-serif text-neutral-900 tracking-tighter leading-tight">
          Ready to <br /> <span className="italic text-gold-600 underline decoration-gold-600/30 underline-offset-8">Legacy?</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link 
            href="/contact"
            className="px-12 py-6 bg-gold-600 text-white font-bold uppercase tracking-widest rounded-full shadow-2xl hover:bg-gold-700 transition-all hover:scale-105"
          >
            Book Consultation
          </Link>
          <a 
            href="https://wa.me/91XXXXXXXXXX"
            className="px-12 py-6 border border-neutral-200 text-neutral-900 font-bold uppercase tracking-widest rounded-full hover:bg-neutral-50 transition-all"
          >
            WhatsApp Support
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ASSEMBLY ─── */
export default function ClientAboutPage() {
  return (
    <main className="relative bg-white min-h-screen">
      <BackgroundGlows />
      
      <AboutHero />
      <CoreValues />
      <TheJourney />
      <FinalCTA />
    </main>
  );
}