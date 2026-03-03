"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowDown, Mail, Calendar, TrendingUp, Compass,
  BookOpen, Clock, ChevronRight, Zap, Map, FileText, Home,
  BarChart2, Shield, Search, Star, Bookmark, Share2, Eye
} from "lucide-react";

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const categories = [
  { label: "All", count: 12 },
  { label: "Market Trends", count: 4 },
  { label: "Investment Guide", count: 3 },
  { label: "Analysis", count: 2 },
  { label: "Documentation", count: 2 },
  { label: "Infrastructure", count: 1 },
];

const posts = [
  {
    slug: "why-thrissur-is-keralas-next-real-estate-hotspot",
    title: "Why Thrissur is Kerala's Next Real Estate Hotspot",
    excerpt: "An in-depth look at the infrastructure projects, demographic shifts, and cultural prestige driving unprecedented land value appreciation in the Cultural Capital.",
    date: "Oct 12, 2025",
    readTime: "8 min read",
    views: "4.2K",
    category: "Market Trends",
    Icon: TrendingUp,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "guide-to-buying-agricultural-land-in-kerala",
    title: "The Ultimate Guide to Buying Agricultural Land",
    excerpt: "Navigating the legalities, zoning laws, and soil testing requirements when investing in high-yield farm lands around Peechi, Mannuthy, and beyond.",
    date: "Sep 28, 2025",
    readTime: "6 min read",
    views: "3.1K",
    category: "Investment Guide",
    Icon: Compass,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "commercial-vs-residential-where-to-invest",
    title: "Commercial vs. Residential: Where to Invest in 2026?",
    excerpt: "A comparative ROI analysis of commercial plots near Swaraj Round versus residential layouts in expanding suburban corridors like Kuttanellur.",
    date: "Sep 15, 2025",
    readTime: "7 min read",
    views: "5.8K",
    category: "Analysis",
    Icon: BarChart2,
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "understanding-clear-titles-and-documents",
    title: "Understanding Clear Titles and Property Documents",
    excerpt: "Protect your investment. Learn the essential checklist for verifying Encumbrance Certificates, Title Deeds, and Patta in Kerala before you sign.",
    date: "Aug 30, 2025",
    readTime: "10 min read",
    views: "6.7K",
    category: "Documentation",
    Icon: FileText,
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "top-5-upcoming-residential-areas-thrissur",
    title: "Top 5 Upcoming Residential Corridors in Thrissur",
    excerpt: "We analyze the micro-markets showing the highest promise for families looking to settle in peaceful yet highly connected suburban neighborhoods.",
    date: "Aug 12, 2025",
    readTime: "5 min read",
    views: "2.9K",
    category: "Market Trends",
    Icon: Home,
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "how-nh-66-bypass-affects-land-prices",
    title: "The Impact of NH 66 Expansion on Land Prices",
    excerpt: "Tracking the dramatic surge in real estate queries along the National Highway 66 stretch and what it means for early investors in Thrissur.",
    date: "Jul 22, 2025",
    readTime: "6 min read",
    views: "3.4K",
    category: "Infrastructure",
    Icon: Map,
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop",
  },
];

const trendingTopics = [
  "Plot Investment 2026", "NH-66 Corridor", "NRI Buyers",
  "Agricultural Land", "DTCP Approved", "Gated Community",
  "Rental Yield", "Patta Transfer", "Vastu Plots", "Smart City",
];

const stats = [
  { value: "12+", label: "Articles Published", Icon: BookOpen },
  { value: "18K+", label: "Monthly Readers", Icon: Eye },
  { value: "4.9★", label: "Avg. Insight Rating", Icon: Star },
  { value: "100%", label: "Expert-Authored", Icon: Shield },
];

/* ══════════════════════════════════════════
   HERO — Full Cinematic
══════════════════════════════════════════ */
export function BlogHero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={heroRef} className="relative w-full h-[85vh] min-h-[600px] flex items-end justify-start overflow-hidden bg-black">
      {/* Parallax BG */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110 z-0">
        <Image
          src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2800&auto=format&fit=crop"
          alt="The Ledger — Thrissur Real Estate Blog"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>
      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-0" />
      {/* Diagonal line pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{
        backgroundImage: "repeating-linear-gradient(-45deg, #e5a12d 0, #e5a12d 1px, transparent 0, transparent 8px)",
        backgroundSize: "12px 12px"
      }} />

      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-40 w-full"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-[2px] bg-gold-500" />
            <span className="text-gold-400 text-sm font-bold tracking-[0.3em] uppercase">The Ledger · Market Intelligence</span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-[96px] font-serif text-white tracking-tight leading-[0.95]"
            >
              Market<br />
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600">
                Insights.
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="text-white/60 text-xl font-light max-w-xl mb-12 leading-relaxed"
          >
            Data-driven intelligence on Thrissur&apos;s real estate landscape. Expert-authored analysis for discerning investors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href={`/blog/${posts[0].slug}`} className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold py-3.5 px-8 rounded-xl text-sm uppercase tracking-wide shadow-[0_0_30px_rgba(229,161,45,0.4)] hover:shadow-[0_0_50px_rgba(229,161,45,0.6)] transition-all">
              Read Latest <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-white/40 text-sm font-light">12 articles published · Updated weekly</span>
          </motion.div>
        </div>

        {/* Floating featured card — bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="hidden lg:block absolute bottom-24 right-6 w-80 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="relative h-36 overflow-hidden">
            <Image src={posts[0].imageUrl} alt={posts[0].title} fill className="object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          </div>
          <div className="p-5">
            <span className="text-gold-400 text-[10px] font-bold uppercase tracking-widest">Featured · {posts[0].category}</span>
            <p className="text-white text-sm font-serif font-semibold mt-1 leading-snug line-clamp-2">{posts[0].title}</p>
            <div className="flex items-center gap-3 mt-3 text-white/40 text-xs">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{posts[0].readTime}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{posts[0].views}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[9px] uppercase tracking-[0.3em]">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4 text-gold-500" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-primary to-transparent z-10" />
    </section>
  );
}

/* ══════════════════════════════════════════
   STATS STRIP
══════════════════════════════════════════ */
export function BlogStats() {
  return (
    <section className="bg-secondary border-y border-border-subtle py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {stats.map((s, i) => {
          const Icon = s.Icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary border border-border-strong flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <p className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">{s.value}</p>
                <p className="text-text-muted text-xs uppercase tracking-wider font-semibold">{s.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAGAZINE GRID — Featured + Sidebar
══════════════════════════════════════════ */
export function BlogGrid({ activeCategory }) {
  const filtered = activeCategory === "All"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featured = filtered[0];
  const secondary = filtered.slice(1, 3);
  const rest = filtered.slice(3);

  if (!featured) return (
    <div className="text-center py-24 text-text-muted">No articles in this category yet.</div>
  );

  const FIcon = featured.Icon;

  return (
    <div className="space-y-12">
      {/* ── Bento Top Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Large featured */}
        <motion.article
          key={featured.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3 group relative h-[480px] rounded-3xl overflow-hidden border border-white/5 hover:border-gold-500/40 transition-colors duration-500 shadow-2xl"
        >
          <Image src={featured.imageUrl} alt={featured.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 60vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Gold top bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold-500 via-gold-300 to-transparent" />

          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold-500/90 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Featured</span>
              <span className="text-white/50 text-xs flex items-center gap-1"><FIcon className="w-3 h-3 text-gold-400" /> {featured.category}</span>
            </div>
            <Link href={`/blog/${featured.slug}`}>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-[1.15] mb-4 group-hover:text-gold-200 transition-colors">{featured.title}</h2>
            </Link>
            <p className="text-white/60 font-light text-sm leading-relaxed mb-6 line-clamp-2">{featured.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-white/40 text-xs">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{featured.views}</span>
              </div>
              <Link href={`/blog/${featured.slug}`} className="flex items-center gap-2 text-gold-400 text-sm font-semibold uppercase tracking-wider group-hover:gap-3 transition-all">
                Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.article>

        {/* Stacked pair */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {(secondary.length > 0 ? secondary : posts.slice(1, 3)).map((post, i) => {
            const PIcon = post.Icon;
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group flex-1 relative h-[220px] rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/40 transition-colors duration-500 shadow-xl"
              >
                <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="40vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1"><PIcon className="w-3 h-3" /> {post.category}</span>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-serif font-bold text-white leading-snug line-clamp-2 group-hover:text-gold-200 transition-colors">{post.title}</h3>
                  </Link>
                  <div className="flex items-center gap-3 text-white/40 text-[11px] mt-2">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ── Standard 3-Column Grid ── */}
      {rest.length > 0 && (
        <>
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-border-subtle" />
            <span className="text-text-muted text-xs font-bold uppercase tracking-widest px-4">More Articles</span>
            <div className="h-[1px] flex-1 bg-border-subtle" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, idx) => {
              const GIcon = post.Icon;
              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group flex flex-col bg-secondary border border-border-strong rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-500 shadow-lg hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
                >
                  {/* Image */}
                  <Link href={`/blog/${post.slug}`} className="relative h-52 overflow-hidden block">
                    <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[10px] bg-black/70 backdrop-blur-md text-gold-400 font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-gold-500/20">
                      <GIcon className="w-3 h-3" />{post.category}
                    </div>
                    {/* top accent */}
                    <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-500" />
                  </Link>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-grow">
                    <Link href={`/blog/${post.slug}`} className="block mb-3">
                      <h3 className="text-xl font-serif font-bold text-text-main leading-snug line-clamp-2 group-hover:text-gold-400 transition-colors">{post.title}</h3>
                    </Link>
                    <p className="text-text-muted text-sm font-light leading-relaxed line-clamp-3 flex-grow mb-6">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-5 border-t border-border-subtle">
                      <div className="text-text-muted text-xs flex items-center gap-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="w-9 h-9 rounded-full border border-border-strong group-hover:border-gold-500/50 group-hover:bg-gold-500/10 flex items-center justify-center transition-all">
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-gold-400 group-hover:-rotate-45 transition-all" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   TRENDING TOPICS CLOUD
══════════════════════════════════════════ */
export function TrendingTopics() {
  return (
    <section className="py-20 px-6 bg-secondary border-t border-border-subtle relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#e5a12d 1px, transparent 1px), linear-gradient(90deg, #e5a12d 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <span className="text-gold-500 text-xs font-bold uppercase tracking-widest block mb-3">Trending Topics</span>
          <h2 className="text-3xl md:text-4xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
            What Investors Are Reading
          </h2>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3">
          {trendingTopics.map((topic, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2.5 rounded-full border border-border-strong bg-primary text-text-muted text-sm font-medium hover:border-gold-500/50 hover:text-gold-400 hover:bg-gold-500/5 transition-all cursor-pointer"
            >
              #{topic}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   NEWSLETTER CTA
══════════════════════════════════════════ */
export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    setTimeout(() => { setStatus("success"); setEmail(""); }, 1500);
  };

  return (
    <section className="relative py-32 px-6 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=2000&auto=format&fit=crop" alt="Newsletter" fill className="object-cover opacity-10" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[300px] rounded-full bg-gold-500/10 blur-3xl" />
      </div>
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "32px 32px"
      }} />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-8">
            <Mail className="w-7 h-7 text-gold-500" />
          </div>
          <span className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] block mb-3">Join The Inner Circle</span>
          <h2 className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 mb-5">
            Intelligence, Delivered.
          </h2>
          <p className="text-white/50 font-light text-lg mb-10 leading-relaxed">
            Monthly market reports, plot alerts, and expert ROI analysis — sent directly to your inbox before we publish publicly.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status !== "idle"}
              className="flex-1 bg-white/5 border border-white/10 focus:border-gold-500 rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={status !== "idle"}
              className={`px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all whitespace-nowrap
                ${status === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-gradient-to-r from-gold-500 to-gold-400 text-black hover:shadow-[0_0_20px_rgba(229,161,45,0.4)] disabled:opacity-60"
                }`}
            >
              {status === "idle" ? "Subscribe Free" : status === "submitting" ? "Adding..." : "✓ Subscribed!"}
            </button>
          </form>
          <p className="text-white/20 text-xs mt-5 uppercase tracking-widest">No spam · Unsubscribe anytime · 100% free</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FULL BLOG PAGE — exported as component  
   Used by page.jsx (the category filter lives here)
══════════════════════════════════════════ */
export function BlogPageContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      {/* ── Hero ── */}
      <BlogHero />

      {/* ── Stats Strip ── */}
      <BlogStats />

      {/* ── Category Filter + Grid ── */}
      <section className="py-24 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #e5a12d 0, #e5a12d 1px, transparent 0, transparent 50%)",
          backgroundSize: "28px 28px"
        }} />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-gold-500/[0.03] blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-2">
                Editorial
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-serif font-bold text-text-main">
                Latest Publications
              </motion.h2>
            </div>

            {/* Category filter chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border
                    ${activeCategory === cat.label
                      ? "bg-gold-500 border-gold-500 text-black shadow-[0_0_12px_rgba(229,161,45,0.4)]"
                      : "border-border-strong text-text-muted hover:border-gold-500/40 hover:text-gold-400"
                    }`}
                >
                  {cat.label} <span className="opacity-60 ml-1 font-normal">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid with AnimatePresence for category switching */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <BlogGrid activeCategory={activeCategory} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Trending Topics ── */}
      <TrendingTopics />

      {/* ── Newsletter ── */}
      <NewsletterCTA />
    </>
  );
}
