"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  Phone,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  FileText,
  Handshake,
  TrendingUp,
  Shield,
  Award,
  Users,
  ChevronUp,
  Building2,
  Leaf,
  Home as HomeIcon,
  TreePine,
  Flame,
  Train,
  Landmark,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockProperties } from "@/lib/data/mockData";
import AnimatedStats from "@/components/AnimatedStats";
import CategoryCoverflow from "@/components/CategoryCoverflow";
import PropertyStacking from "@/components/PropertyStacking";
import IntroLoader from "@/components/IntroLoader";

const propertyStackItems = [
  {
    title: "The Emerald Heights",
    category: "Residential Plot",
    location: "Kuttanellur, Thrissur",
    price: "45 Lakhs",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
    desc: "A premium residential layout located in the heart of the city's fastest-growing educational hub. Perfect for families seeking peace and connectivity.",
  },
  {
    title: "Golden Trade Plaza",
    category: "Commercial Land",
    location: "Swaraj Round, Thrissur",
    price: "2.5 Crores",
    rating: 5.0,
    reviews: 86,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    desc: "Prime commercial frontage in Thrissur's beating heart. Unmatched footfall and visibility for luxury retail and banking headquarters.",
  },
  {
    title: "River Mist Retreat",
    category: "Eco/Farm Land",
    location: "Peechi, Thrissur",
    price: "1.2 Crores",
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=2000&auto=format&fit=crop",
    desc: "Lush green acres bordering the serene backwaters. Ideal for eco-resorts, organic farming, or a private luxury farmhouse getaway.",
  },
  {
    title: "Skyline Vantage",
    category: "Premium Villa Plot",
    location: "Puzhakkal, Thrissur",
    price: "85 Lakhs",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop",
    desc: "Elevated plots along the NH-66 corridor, offering panoramic views and world-class gated community infrastructure.",
  }
];

/* ─── Blog data ─── */
const blogPosts = [
  {
    slug: "why-thrissur-is-keralas-next-real-estate-hotspot",
    title: "Why Thrissur is Kerala's Next Real Estate Hotspot",
    excerpt:
      "An in-depth look at the infrastructure projects and demographic shifts driving unprecedented land value appreciation in the Cultural Capital.",
    date: "Oct 12, 2025",
    category: "Market Trends",
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "guide-to-buying-agricultural-land-in-kerala",
    title: "The Ultimate Guide to Buying Agricultural Land",
    excerpt:
      "Navigating the legalities, zoning laws, and soil testing requirements when investing in high-yield farm lands around Peechi and Mannuthy.",
    date: "Sep 28, 2025",
    category: "Investment Guide",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "commercial-vs-residential-where-to-invest",
    title: "Commercial vs. Residential: Where to Invest in 2026?",
    excerpt:
      "A comparative ROI analysis of commercial plots near Swaraj Round versus residential layouts in the expanding suburban corridors.",
    date: "Sep 15, 2025",
    category: "Analysis",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
  },
];

/* ─── Review data ─── */
const reviews = [
  {
    name: "Arun Menon",
    role: "Homebuyer, Thrissur",
    review:
      "Thrissur Plots made my land-buying journey effortless. Their guidance on documentation and location selection was outstanding.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Investor, Kochi",
    review:
      "Exceptional service! I found a prime investment plot within days. The team's market knowledge is truly impressive.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Suresh Kumar",
    role: "Commercial Buyer, Palakkad",
    review:
      "Professional, transparent, and prompt. They helped me secure a commercial plot in Mannuthy at the right price.",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
  },
  {
    name: "Anjali Thomas",
    role: "Plot Owner, Thrissur",
    review:
      "I was worried about legal complexities, but the team walked me through every step. Highly trustworthy and reliable.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "Vishnu Prasad",
    role: "NRI Investor, Dubai",
    review:
      "As an NRI, I needed someone I could trust remotely. Thrissur Plots exceeded every expectation. Smooth transaction!",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 5,
  },
  {
    name: "Deepa Rajan",
    role: "First-time Buyer, Thrissur",
    review:
      "The best decision I made was reaching out to them. Found a beautiful residential plot close to the city in my budget.",
    avatar: "https://randomuser.me/api/portraits/women/83.jpg",
    rating: 5,
  },
];

/* ─── FAQ data ─── */
const faqs = [
  {
    q: "What types of plots do you offer in Thrissur?",
    a: "We offer a curated selection of residential, commercial, agricultural, and investment plots across prime Thrissur locations including Swaraj Round, Mannuthy, Kuttanellur, Peechi, and other high-appreciation areas.",
  },
  {
    q: "How do I verify the legal status of a plot?",
    a: "Every plot in our portfolio undergoes rigorous legal due diligence. We verify title deeds, encumbrance certificates, land conversion orders, and DTCP approvals. Our legal team accompanies you through every step.",
  },
  {
    q: "Can NRI investors purchase land in Kerala?",
    a: "Yes, NRIs with Indian citizenship can purchase non-agricultural land in Kerala. We have a dedicated NRI desk with remote documentation support, virtual tours, and power-of-attorney assistance.",
  },
  {
    q: "What is the typical purchase process?",
    a: "Our process has 4 simple steps: Site Visit → Legal Verification → Token Advance → Registration & Handover. Our team assists at every stage, including bank liaison for loans.",
  },
  {
    q: "Do you offer home loan assistance?",
    a: "Yes. We partner with leading banks and NBFCs to offer preferred loan rates on our approved plots. Our team facilitates the entire loan processing on your behalf.",
  },
];

/* ─── Stats ─── */

/* ─── Property categories ─── */
const categories = [
  {
    icon: HomeIcon,
    title: "Residential",
    desc: "Serene layouts in premium neighbourhoods, designed for your dream home.",
    href: "/plots?type=Residential",
    color: "from-blue-900/30 to-blue-800/10",
  },
  {
    icon: Building2,
    title: "Commercial",
    desc: "High-footfall prime plots near business hubs for maximum ROI.",
    href: "/plots?type=Commercial",
    color: "from-amber-900/30 to-amber-800/10",
  },
  {
    icon: Leaf,
    title: "Agricultural",
    desc: "Fertile farm lands with river frontage and eco resort potential.",
    href: "/plots?type=Agricultural",
    color: "from-green-900/30 to-green-800/10",
  },
  {
    icon: TrendingUp,
    title: "Investment",
    desc: "High-appreciation plots in fast-developing corridors of Thrissur.",
    href: "/plots?type=Investment",
    color: "from-purple-900/30 to-purple-800/10",
  },
];

/* ─── How it works ─── */
const steps = [
  {
    num: "01",
    icon: Search,
    title: "Browse & Shortlist",
    desc: "Explore our curated portfolio. Filter by location, size, budget, and purpose to find plots that match your vision.",
  },
  {
    num: "02",
    icon: FileText,
    title: "Legal Verification",
    desc: "Our legal team performs exhaustive title clearance, encumbrance checks, and DTCP verification on every plot.",
  },
  {
    num: "03",
    icon: Handshake,
    title: "Site Visit & Negotiation",
    desc: "Schedule a guided site visit. Our experts help you negotiate the best price and advise on vastu alignment.",
  },
  {
    num: "04",
    icon: CheckCircle2,
    title: "Smooth Registration",
    desc: "We manage all paperwork, liaise with SRO, and hand over a fully registered title deed — stress-free.",
  },
];

/* ─── Ticker items ─── */
const tickerItems = [
  { icon: Award, label: "500+ Premium Plots" },
  { icon: CheckCircle2, label: "100% Legal Clearance" },
  { icon: MapPin, label: "Prime Thrissur Locations" },
  { icon: Shield, label: "12+ Years of Trust" },
  { icon: Users, label: "NRI-Friendly Services" },
  { icon: FileText, label: "DTCP Approved Layouts" },
  { icon: Leaf, label: "Eco & Farm Land Specialists" },
  { icon: TrendingUp, label: "Same-Day Site Visit" },
];

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const [priceCategory, setPriceCategory] = useState("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const locationFilterRef = useRef(null);
  const priceDropdownRef = useRef(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ["0%", "30%"]);

  // CTA background parallax using Framer Motion
  const ctaRef = useRef(null);
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });
  const ctaBgY = useTransform(ctaScroll, [0, 1], ["-10%", "10%"]);

  const priceOptions = [
    { label: "Under 50 Lakh" },
    { label: "50 Lakh - 1 Crore" },
    { label: "1 Crore - 2 Crore" },
    { label: "2 Crore - 3 Crore" },
    { label: "3 Crore - 5 Crore" },
    { label: "Above 5 Crore" },
  ];

  const searchOptions = useMemo(() => {
    const locs = mockProperties.map((p) => p.location.split(",")[0].trim());
    return Array.from(new Set(locs));
  }, []);

  const filteredSearchOptions = useMemo(() => {
    if (!searchLocation) return searchOptions;
    return searchOptions.filter((opt) =>
      opt.toLowerCase().includes(searchLocation.toLowerCase()),
    );
  }, [searchLocation, searchOptions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (locationFilterRef.current && !locationFilterRef.current.contains(event.target)) {
        setIsLocationDropdownOpen(false);
      }
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
        setIsPriceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroLoader key="intro" onFinish={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <main className="flex flex-col w-full bg-primary transition-colors duration-300">

        {/* ══════════════════════════════════════════
          HERO — Cinematic, Full-Screen
      ══════════════════════════════════════════ */}
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black">

          {/* Background Layers Wrapper */}
          <div className="absolute inset-0 overflow-hidden z-0">
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
            >
              <source
                src="https://media.istockphoto.com/id/1985845951/video/golden-morning-sunbeams-shine-through-rotating-wind-turbine.mp4?s=mp4-640x640-is&k=20&c=I_K_odsga_6HWD1XzR0MLaykDtDvzTOdnCqeMfXDiLU="
                type="video/mp4"
              />
            </video>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

            {/* Subtle dot grid pattern */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
          </div>

          {/* Hero Content */}
          <div
            className="relative z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center mt-20 lg:mt-0"
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Kerala&apos;s Most Trusted Land Experts</span>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
              }}
              className="max-w-6xl"
            >
              <div className="overflow-hidden mb-6 pb-2">
                <motion.h1
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] drop-shadow-lg"
                >
                  Discover{" "}
                  <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
                    Premium
                  </span>{" "}
                  Lands<br className="hidden md:block" /> in the Cultural Capital.
                </motion.h1>
              </div>

              <div className="overflow-hidden mb-12 pt-1">
                <motion.p
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto font-sans font-light"
                >
                  Exclusive residential plots, commercial spaces, and investment
                  opportunities curated for those who demand the best in Thrissur.
                </motion.p>
              </div>
            </motion.div>

            {/* Quick Search Bar */}
            <motion.div
              id="hero-search-bar"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-5xl bg-white/90 dark:bg-black border border-white/20 dark:border-gold-500/30 p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-20 relative"
            >
              <p className="text-black dark:text-white/30 text-xs uppercase tracking-widest mb-3 text-left px-2 font-bold">Find Your Perfect Plot</p>
              <form
                className="flex flex-col md:flex-row gap-3 items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Location */}
                <div className="w-full md:w-5/12 group text-left" ref={locationFilterRef}>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 z-10">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={searchLocation}
                      onChange={(e) => { setSearchLocation(e.target.value); setIsLocationDropdownOpen(true); }}
                      onFocus={() => setIsLocationDropdownOpen(true)}
                      placeholder="Location, Area, or Property Name"
                      className="w-full bg-black/[0.03] dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-black dark:text-white font-semibold placeholder-black/70 dark:placeholder-white/20 outline-none focus:border-gold-500/50 focus:bg-black/[0.05] dark:focus:bg-white/[0.02] transition-all font-sans"
                      autoComplete="off"
                    />
                  </div>
                  <AnimatePresence>
                    {isLocationDropdownOpen && filteredSearchOptions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-50 left-4 md:left-6 w-[calc(100%-2rem)] md:w-[calc(41.666%-1.5rem)] top-full mt-2 max-h-[350px] overflow-x-hidden overflow-y-auto overscroll-contain bg-primary dark:bg-black border border-border-strong rounded-xl shadow-2xl"
                      >
                        {filteredSearchOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => { setSearchLocation(opt); setIsLocationDropdownOpen(false); }}
                            className="w-full text-left px-5 py-3 hover:bg-black/5 dark:hover:bg-white/5 hover:text-gold-500 dark:hover:text-gold-400 transition-colors text-sm text-text-muted border-b border-border-subtle last:border-none"
                          >
                            {opt}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Price Range */}
                <div className="w-full md:w-4/12 group text-left relative" ref={priceDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsPriceDropdownOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between bg-black/[0.03] dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-4 pr-4 text-black dark:text-white font-semibold outline-none focus:border-gold-500/50 transition-all font-sans"
                  >
                    <span className={priceCategory ? "text-black dark:text-white font-semibold" : "text-black/80 dark:text-white/20 font-semibold"}>
                      {priceCategory || "Price Range"}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gold-600 dark:text-gold-500 transition-transform ${isPriceDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isPriceDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-50 left-0 w-full top-full mt-2 max-h-[350px] overflow-y-auto overscroll-contain bg-primary dark:bg-black border border-border-strong rounded-xl shadow-2xl"
                      >
                        {priceOptions.map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => { setPriceCategory(opt.label); setIsPriceDropdownOpen(false); }}
                            className={`w-full text-left px-5 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm border-b border-border-subtle last:border-none ${priceCategory === opt.label ? "text-gold-500" : "text-text-muted hover:text-gold-500"}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Search Button */}
                <div className="w-full md:w-3/12">
                  <Link
                    href={`/plots?${new URLSearchParams({ ...(searchLocation && { location: searchLocation }), ...(priceCategory && { priceCategory }) }).toString()}`}
                    className="w-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold uppercase tracking-wide py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(229,161,45,0.3)] hover:shadow-[0_0_30px_rgba(229,161,45,0.5)]"
                  >
                    <Search className="w-5 h-5" />
                    <span>Search Plots</span>
                  </Link>
                </div>
              </form>
            </motion.div>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Link href="https://wa.me/919876543210" className="group relative overflow-hidden flex items-center justify-center bg-[#075E54] text-white font-semibold tracking-wide py-3 px-6 rounded-xl shadow-[0_4px_14px_rgba(7,94,84,0.4)] transition-all">
                <div className="absolute inset-y-0 left-0 w-0 bg-[#128C7E] transition-all duration-500 ease-out group-hover:w-full z-0" />
                <span className="relative z-10 flex items-center gap-2"><MessageCircle className="w-5 h-5" />WhatsApp</span>
              </Link>
              <Link href="tel:+919876543210" className="group relative overflow-hidden flex items-center justify-center bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold tracking-wide py-3 px-6 rounded-xl shadow-[0_4px_14px_rgba(229,161,45,0.4)] transition-all">
                <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-gold-400 to-gold-300 transition-all duration-500 ease-out group-hover:w-full z-0" />
                <span className="relative z-10 flex items-center gap-2"><Phone className="w-5 h-5" />Call Now</span>
              </Link>
              <Link href="/contact" className="group relative overflow-hidden flex items-center justify-center border border-gold-500 text-gold-400 font-semibold tracking-wide py-3 px-6 rounded-xl transition-all">
                <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-500 ease-out group-hover:w-full z-0" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Enquire Now</span>
              </Link>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
              <span className="text-white/30 text-[10px] uppercase tracking-widest">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-px h-12 bg-gradient-to-b from-gold-500/60 to-transparent"
              />
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════
            MARQUEE TICKER — pinned to bottom of hero
        ══════════════════════════════════════════ */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-20" style={{ background: "linear-gradient(90deg, #b7872a 0%, #e5c46a 40%, #b7872a 100%)", borderTop: "1px solid rgba(255,255,255,0.2)", borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
            {/* Left + Right fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to right, #b7872a, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: "linear-gradient(to left, #b7872a, transparent)" }} />

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap py-3"
            >
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2 shrink-0">
                  {/* Separator diamond */}
                  <span className="text-black/40 mx-5 text-xs select-none" aria-hidden>◆</span>
                  {/* Icon */}
                  <item.icon className="w-3.5 h-3.5 text-black/70 shrink-0" strokeWidth={2} />
                  {/* Label */}
                  <span
                    className="text-black text-xs tracking-[0.18em] uppercase"
                    style={{ fontWeight: 700, letterSpacing: "0.18em", fontFamily: "var(--font-sans)" }}
                  >
                    {item.label}
                  </span>
                </span>
              ))}
            </motion.div>
          </div>

        </div>

        {/* ══════════════════════════════════════════
          STATS ROW
      ══════════════════════════════════════════ */}
        <AnimatedStats />

        {/* ══════════════════════════════════════════
          PROPERTY CATEGORIES
      ══════════════════════════════════════════ */}
        <section className="py-12 md:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: '#00022e' }}>
          {/* Background pattern */}
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
                Browse by Type
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 tracking-wide"
              >
                Find Your Category
              </motion.h2>
            </div>

            <div className="mt-12">
              <CategoryCoverflow categories={categories} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          EXPLORE PROPERTIES - SYNCED STACKING
      ══════════════════════════════════════════ */}
        <section id="explore-properties" className="bg-white py-20 border-t border-black/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold-600 uppercase tracking-widest text-sm font-semibold mb-3"
            >
              Curated Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-600 to-gold-800 tracking-wide"
            >
              Explore Masterpieces
            </motion.h2>
          </div>
          <PropertyStacking items={propertyStackItems} />
        </section>

        {/* ══════════════════════════════════════════
          SECURE PARADISE CTA
      ══════════════════════════════════════════ */}
        <section ref={ctaRef} className="relative w-full overflow-hidden min-h-[560px] flex items-center bg-black">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div style={{ y: ctaBgY }} className="absolute inset-[-20%] w-[140%] h-[140%]">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
                alt="Green open plot land"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </div>
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to right, #00022e 0%, rgba(0,2,46,0.92) 55%, transparent 100%)' }} />
          {/* accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 z-20 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />

          <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-28">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-4">Exclusive Offer</p>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight font-serif">
                Secure Your Piece<br /> of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Paradise</span>
              </h2>
              <p className="text-white/70 text-lg font-light mb-10 max-w-[480px] leading-relaxed font-sans">
                Join over 1,800 satisfied landowners and legacy builders. End-to-end documentation support, vastu guidance, and verified legal titles — guaranteed.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold uppercase tracking-wider py-4 px-8 rounded-lg transition-all shadow-[0_0_20px_rgba(229,161,45,0.3)] hover:shadow-[0_0_30px_rgba(229,161,45,0.5)] text-sm">
                  Request Callback
                </Link>
                <Link href="/plots" className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-wider py-4 px-8 rounded-lg transition-all text-sm">
                  View All Plots
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
        <section className="py-14 md:py-28 px-4 sm:px-6 bg-primary transition-colors duration-300 relative overflow-hidden">
          {/* Radial glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'rgba(229,161,45,0.07)' }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
              >
                Simple Process
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 tracking-wide"
              >
                How It Works
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-text-muted mt-4 max-w-xl mx-auto font-light"
              >
                Our proven 4-step process ensures every transaction is transparent, legally sound, and completely stress-free.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {steps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center z-10 group">
                  {/* Connecting Line (Desktop) - Animates immediately after this step appears, drawing to the next step */}
                  {i < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: i * 1.2 + 0.6, ease: "linear" }}
                      style={{ originX: 0 }}
                      className="hidden lg:block absolute top-[2.5rem] left-[calc(50%+2.5rem)] w-[calc(100%-1.1rem)] h-[2px] bg-gradient-to-r from-gold-500/80 to-gold-500/80 z-0"
                    />
                  )}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center w-full z-10"
                  >
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:border-gold-500/50 transition-colors shadow-xl" style={{ background: '#00022e', border: '1px solid rgba(229,161,45,0.25)' }}>
                        <step.icon className="w-8 h-8 text-gold-500" />
                      </div>
                      <span className="absolute -top-3 -right-3 text-xs font-bold font-sans text-gold-500 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#00022e', border: '1px solid rgba(229,161,45,0.4)' }}>
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-text-main mb-3">{step.title}</h3>
                    <p className="text-text-main/70 dark:text-text-muted text-sm font-light leading-relaxed">{step.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-16 text-center"
            >
              <Link
                href="/plots"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold uppercase tracking-wide py-4 px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(229,161,45,0.2)] hover:shadow-[0_0_30px_rgba(229,161,45,0.4)]"
              >
                Start Browsing Plots <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>



        {/* ══════════════════════════════════════════
          TESTIMONIALS — Marquee Style
      ══════════════════════════════════════════ */}
        <section className="py-14 md:py-24 px-4 sm:px-6 overflow-hidden relative" style={{ background: '#00022e' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
              >
                Testimonials
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 tracking-wide"
              >
                What Our Clients Say
              </motion.h2>
            </div>

            {/* Dual Marquee Container */}
            <div className="relative w-full overflow-hidden mb-12 py-4">
              {/* Edge Fade Masks */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#00022e] to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#00022e] to-transparent pointer-events-none" />

              {/* Top Row (Moves Right) */}
              <div className="mb-6">
                <motion.div
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  className="flex w-max gap-6 px-3 hover:[animation-play-state:paused]"
                >
                  {[...reviews.slice(0, 3), ...reviews.slice(0, 3), ...reviews.slice(0, 3), ...reviews.slice(0, 3)].map((r, i) => (
                    <div key={`top-${i}`} className="w-80 flex-shrink-0 bg-secondary border border-border-subtle rounded-2xl p-6 flex flex-col gap-4">
                      <div className="flex gap-1">
                        {Array.from({ length: r.rating }).map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-gold-500 text-gold-500" />
                        ))}
                      </div>
                      <p className="text-text-main font-light text-sm leading-relaxed italic flex-grow">&ldquo;{r.review}&rdquo;</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold-500/30 flex-shrink-0">
                          <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-text-main font-semibold text-sm">{r.name}</p>
                          <p className="text-text-muted text-xs">{r.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom Row (Moves Left) */}
              <div>
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="flex w-max gap-6 px-3 hover:[animation-play-state:paused]"
                >
                  {[...reviews.slice(3, 6), ...reviews.slice(3, 6), ...reviews.slice(3, 6), ...reviews.slice(3, 6)].map((r, i) => (
                    <div key={`bottom-${i}`} className="w-80 flex-shrink-0 bg-secondary border border-border-subtle rounded-2xl p-6 flex flex-col gap-4">
                      <div className="flex gap-1">
                        {Array.from({ length: r.rating }).map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-gold-500 text-gold-500" />
                        ))}
                      </div>
                      <p className="text-text-main font-light text-sm leading-relaxed italic flex-grow">&ldquo;{r.review}&rdquo;</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold-500/30 flex-shrink-0">
                          <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-text-main font-semibold text-sm">{r.name}</p>
                          <p className="text-text-muted text-xs">{r.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          BLOG HIGHLIGHTS
      ══════════════════════════════════════════ */}
        <section className="py-12 md:py-24 px-4 sm:px-6 bg-secondary border-t border-border-subtle transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
                >
                  Insights
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 tracking-wide"
                >
                  From Our Blog
                </motion.h2>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-400 font-semibold text-sm uppercase tracking-widest transition-colors group">
                All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex flex-col bg-primary border border-border-subtle hover:border-gold-600/40 rounded-2xl overflow-hidden group transition-colors duration-500"
                >
                  <Link href={`/blog/${post.slug}`} className="block relative h-52 overflow-hidden">
                    <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
                      <Image src={post.imageUrl} alt={post.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                    </motion.div>
                    <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md border border-gold-600/30 dark:border-gold-500/30 text-gold-600 dark:text-gold-400 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm">
                      {post.category}
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-text-muted text-sm mb-3">{post.date}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-serif text-text-main font-bold leading-snug mb-3 group-hover:text-gold-500 transition-colors">{post.title}</h3>
                    </Link>
                    <p className="text-text-muted font-light text-sm leading-relaxed mb-6 flex-grow line-clamp-2">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-text-main group-hover:text-gold-500 transition-colors">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
        <section className="py-14 md:py-28 px-4 sm:px-6 bg-primary border-t border-border-subtle transition-colors duration-300 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-gold-500/[0.04] blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3"
              >
                Got Questions?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 tracking-wide"
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
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <span className="font-serif font-semibold text-text-main pr-4">{faq.q}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center transition-all duration-300 ${activeFaq === i ? "bg-gold-500 border-gold-500 rotate-180" : ""}`}>
                      <ChevronDown className={`w-4 h-4 transition-colors ${activeFaq === i ? "text-black" : "text-gold-500"}`} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {activeFaq === i && (
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

        {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
        <section className="relative py-16 md:py-32 px-4 sm:px-6 bg-black overflow-hidden">
          {/* Ambient background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
              alt="Luxury Background"
              fill
              className="object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-0" />
          {/* Gold radial */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <div className="w-[800px] h-[400px] rounded-full bg-gold-500/10 blur-3xl" />
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
                <Award className="w-4 h-4 text-gold-400" />
                <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Join 1,800+ Satisfied Clients</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 mb-6 leading-[1.1]">
                Ready to Find Your<br />Dream Plot?
              </h2>
              <p className="text-white/60 font-light text-lg mb-12 max-w-xl mx-auto">
                Let our experts guide you to the perfect land in Thrissur. We&apos;re just a message away — available 7 days a week.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_30px_rgba(229,161,45,0.4)] hover:shadow-[0_0_40px_rgba(229,161,45,0.6)] text-sm uppercase tracking-wide"
                >
                  Contact Us Now <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/plots"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white hover:text-white font-semibold py-4 px-10 rounded-xl transition-all text-sm uppercase tracking-wide"
                >
                  Browse Plots
                </Link>
              </div>

              <p className="mt-8 text-white/30 text-xs">No commitment required · Free consultation · Site visit in 24 hrs</p>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}
