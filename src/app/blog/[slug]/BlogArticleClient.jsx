"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft, Clock, Eye, Calendar, Share2, Bookmark,
    Twitter, Link2, MessageCircle, ChevronRight, ArrowRight,
    TrendingUp, Compass, BarChart2, FileText, Home, Map, Check
} from "lucide-react";

/* ── Re-import post data for related articles ── */
const allPosts = [
    {
        slug: "why-thrissur-is-keralas-next-real-estate-hotspot",
        title: "Why Thrissur is Kerala's Next Real Estate Hotspot",
        excerpt: "An in-depth look at the infrastructure projects, demographic shifts, and cultural prestige driving unprecedented land value appreciation in the Cultural Capital.",
        date: "Oct 12, 2025", readTime: "8 min read", views: "4.2K", category: "Market Trends", Icon: TrendingUp,
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "guide-to-buying-agricultural-land-in-kerala",
        title: "The Ultimate Guide to Buying Agricultural Land",
        excerpt: "Navigating the legalities, zoning laws, and soil testing requirements when investing in high-yield farm lands around Peechi, Mannuthy, and beyond.",
        date: "Sep 28, 2025", readTime: "6 min read", views: "3.1K", category: "Investment Guide", Icon: Compass,
        imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "commercial-vs-residential-where-to-invest",
        title: "Commercial vs. Residential: Where to Invest in 2026?",
        excerpt: "A comparative ROI analysis of commercial plots near Swaraj Round versus residential layouts in expanding suburban corridors like Kuttanellur.",
        date: "Sep 15, 2025", readTime: "7 min read", views: "5.8K", category: "Analysis", Icon: BarChart2,
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "understanding-clear-titles-and-documents",
        title: "Understanding Clear Titles and Property Documents",
        excerpt: "Protect your investment. Learn the essential checklist for verifying Encumbrance Certificates, Title Deeds, and Patta in Kerala before you sign.",
        date: "Aug 30, 2025", readTime: "10 min read", views: "6.7K", category: "Documentation", Icon: FileText,
        imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "top-5-upcoming-residential-areas-thrissur",
        title: "Top 5 Upcoming Residential Corridors in Thrissur",
        excerpt: "We analyze the micro-markets showing the highest promise for families.",
        date: "Aug 12, 2025", readTime: "5 min read", views: "2.9K", category: "Market Trends", Icon: Home,
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop",
    },
    {
        slug: "how-nh-66-bypass-affects-land-prices",
        title: "The Impact of NH 66 Expansion on Land Prices",
        excerpt: "Tracking the dramatic surge in real estate queries along the National Highway 66 stretch.",
        date: "Jul 22, 2025", readTime: "6 min read", views: "3.4K", category: "Infrastructure", Icon: Map,
        imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop",
    },
];

const tocSections = [
    { id: "intro", label: "Introduction" },
    { id: "infrastructure", label: "Infrastructure Boom" },
    { id: "zoning", label: "Zoning & Documentation" },
    { id: "checklist", label: "Investment Checklist" },
    { id: "conclusion", label: "Conclusion" },
];

/* ── Reading Progress Bar ── */
function ArticleProgressBar() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);
    return (
        <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] bg-black/20">
            <motion.div
                className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 shadow-[0_0_8px_rgba(229,161,45,0.8)]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

/* ── Share Button ── */
function ShareButton({ title, slug }) {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : "";

    const copyLink = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs font-semibold uppercase tracking-widest mr-1">Share</span>
            <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center text-text-muted hover:border-[#1d9bf0]/50 hover:text-[#1d9bf0] hover:bg-[#1d9bf0]/10 transition-all"
                aria-label="Share on Twitter"
            >
                <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
                href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center text-text-muted hover:border-green-500/50 hover:text-green-500 hover:bg-green-500/10 transition-all"
                aria-label="Share on WhatsApp"
            >
                <MessageCircle className="w-3.5 h-3.5" />
            </a>
            <button
                onClick={copyLink}
                className="w-9 h-9 rounded-full border border-border-strong flex items-center justify-center text-text-muted hover:border-gold-500/50 hover:text-gold-400 hover:bg-gold-500/10 transition-all"
                aria-label="Copy link"
            >
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                        </motion.span>
                    ) : (
                        <motion.span key="link" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Link2 className="w-3.5 h-3.5" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>
        </div>
    );
}

/* ── Table of Contents Sidebar ── */
function TableOfContents({ activeSection }) {
    return (
        <div className="sticky top-28">
            <div className="bg-secondary border border-border-strong rounded-2xl p-6 mb-6">
                <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest block mb-4">In This Article</span>
                <ul className="space-y-3">
                    {tocSections.map((section) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className={`flex items-center gap-2.5 text-sm transition-all group ${activeSection === section.id
                                    ? "text-gold-400 font-semibold"
                                    : "text-text-muted hover:text-text-main"
                                    }`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${activeSection === section.id ? "bg-gold-400" : "bg-border-strong group-hover:bg-gold-500/50"
                                    }`} />
                                {section.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Quick Facts Box */}
            <div className="bg-gradient-to-b from-gold-500/10 to-transparent border border-gold-500/20 rounded-2xl p-6">
                <span className="text-gold-500 text-[10px] font-bold uppercase tracking-widest block mb-4">Quick Facts</span>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-text-muted">NH-66 Land Growth</span>
                        <span className="text-gold-400 font-bold">+18% YoY</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-text-muted">Avg. Plot Price</span>
                        <span className="text-gold-400 font-bold">₹48 L</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-text-muted">NRI Interest Share</span>
                        <span className="text-gold-400 font-bold">34%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-text-muted">Commercial Yield</span>
                        <span className="text-gold-400 font-bold">7.2% PA</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Related Posts ── */
function RelatedPosts({ currentSlug }) {
    const related = allPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
    return (
        <section className="mt-20 pt-16 border-t border-border-subtle">
            <div className="mb-10">
                <span className="text-gold-500 text-xs font-bold uppercase tracking-widest block mb-2">Continue Reading</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-text-main">Related Articles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((post, i) => {
                    const PIcon = post.Icon;
                    return (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col bg-secondary border border-border-strong rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
                        >
                            <Link href={`/blog/${post.slug}`} className="relative h-44 overflow-hidden block">
                                <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] bg-black/70 backdrop-blur-md text-gold-400 font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold-500/20">
                                    <PIcon className="w-3 h-3" />{post.category}
                                </div>
                                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-500" />
                            </Link>
                            <div className="p-5 flex flex-col flex-grow">
                                <Link href={`/blog/${post.slug}`}>
                                    <h3 className="text-base font-serif font-bold text-text-main leading-snug line-clamp-2 mb-2 group-hover:text-gold-400 transition-colors">{post.title}</h3>
                                </Link>
                                <p className="text-text-muted text-xs font-light leading-relaxed line-clamp-2 flex-grow mb-4">{post.excerpt}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                                    <div className="flex items-center gap-2 text-text-muted text-[11px]">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                                    </div>
                                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-gold-400 text-xs font-semibold group-hover:gap-2 transition-all">
                                        Read <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}

/* ── MAIN ARTICLE CLIENT ── */
export default function BlogArticleClient({ title, slug, imageUrl }) {
    const [activeSection, setActiveSection] = useState("intro");
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("tp_bookmarks") || "[]");
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsBookmarked(stored.includes(slug));
        } catch { }
    }, [slug]);

    const toggleBookmark = () => {
        setIsBookmarked((prev) => {
            const stored = JSON.parse(localStorage.getItem("tp_bookmarks") || "[]");
            const next = prev ? stored.filter((s) => s !== slug) : [...stored, slug];
            localStorage.setItem("tp_bookmarks", JSON.stringify(next));
            return !prev;
        });
    };

    // Observe sections for ToC highlighting
    useEffect(() => {
        const observers = tocSections.map(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { rootMargin: "-40% 0px -50% 0px" }
            );
            obs.observe(el);
            return obs;
        });
        return () => observers.forEach((obs) => obs?.disconnect());
    }, []);

    return (
        <>
            <ArticleProgressBar />

            <div className="min-h-screen bg-primary text-text-main font-sans transition-colors duration-300">
                {/* ── Cinematic Hero ── */}
                <div className="relative w-full h-[55vh] min-h-[400px] overflow-hidden bg-black">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover opacity-60"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-black/50 to-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                    {/* Back link */}
                    <div className="absolute top-8 left-0 right-0 max-w-7xl mx-auto px-6">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-gold-400 text-sm font-semibold uppercase tracking-wider transition-colors backdrop-blur-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                    </div>

                    {/* Title area */}
                    <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-[2px] bg-gold-500" />
                                <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Market Insights</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight max-w-4xl">
                                {title}
                            </h1>
                        </motion.div>
                    </div>
                </div>

                {/* ── Article Body ── */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Meta bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-8 border-b border-border-subtle"
                    >
                        <div className="flex items-center gap-6 text-text-muted text-sm">
                            <span className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full border-[1.5px] border-gold-500/40 overflow-hidden shadow-[0_0_10px_rgba(229,161,45,0.2)]">
                                    <Image
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
                                        alt="Rajesh Nair"
                                        fill
                                        className="object-cover"
                                        sizes="40px"
                                    />
                                </div>
                                <div>
                                    <p className="text-text-main font-semibold text-sm leading-none mb-1">Rajesh Nair</p>
                                    <p className="text-gold-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Real Estate Expert</p>
                                </div>
                            </span>
                            <div className="w-px h-8 bg-border-subtle" />
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Oct 12, 2025</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8 min read</span>
                            <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> 4.2K views</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <ShareButton title={title} slug={slug} />
                            <button
                                onClick={toggleBookmark}
                                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong hover:border-gold-500/50 hover:bg-gold-500/10 transition-all text-sm font-medium text-text-muted hover:text-gold-400"
                            >
                                <Bookmark className={`w-4 h-4 transition-colors ${isBookmarked ? "text-gold-400 fill-gold-400" : ""}`} />
                                {isBookmarked ? "Saved" : "Save"}
                            </button>
                        </div>
                    </motion.div>

                    {/* ── Two-Column Layout ── */}
                    <div className="flex gap-10 xl:gap-16">
                        {/* Sidebar ToC */}
                        <aside className="hidden xl:block w-56 flex-shrink-0">
                            <TableOfContents activeSection={activeSection} />
                        </aside>

                        {/* Main content */}
                        <article className="flex-1 min-w-0">
                            {/* Pull quote */}
                            <div id="intro" className="border-l-4 border-gold-500 pl-6 bg-gradient-to-r from-gold-500/10 to-transparent py-5 pr-4 rounded-r-xl mb-10">
                                <p className="text-xl md:text-2xl text-text-main font-medium leading-relaxed">
                                    Thrissur is undergoing a rapid metamorphosis. What was once seen purely as a quiet cultural haven is now fiercely emerging as one of the most lucrative real estate investment hubs in South India.
                                </p>
                            </div>

                            <div className="space-y-7 text-lg font-light leading-relaxed text-text-muted">
                                <p>
                                    The expansion of infrastructure networks, specifically the widening of National Highway 66 and the development of state-of-the-art commercial micro-markets, has catalyzed land value appreciation across the district. For strategic investors, understanding these micro-market dynamics is the key to maximizing ROI over the next decade.
                                </p>

                                <h3 id="infrastructure" className="text-2xl md:text-3xl font-serif text-gold-500 font-bold mt-12 mb-4 scroll-mt-28">
                                    The Infrastructure Boom
                                </h3>

                                <p>
                                    When assessing land value, connectivity remains paramount. The seamless integration of road networks linking the commercial heart of Swaraj Round to rapidly expanding suburban corridors like Kuttanellur, Mannuthy, and Puzhakkal has drastically reduced commute times.
                                </p>

                                <p>
                                    This decentralization of commercial activity means that{" "}
                                    <Link href="#" className="text-gold-500 border-b border-gold-500/40 hover:border-gold-500 hover:text-text-main transition-colors pb-0.5">
                                        residential plots
                                    </Link>{" "}
                                    previously considered &quot;outskirts&quot; are now prime real estate, attracting massive interest from non-resident Indians (NRIs) seeking secure footholds in their home state.
                                </p>

                                {/* Inline stat block */}
                                <div className="grid grid-cols-3 gap-4 my-10 not-prose">
                                    {[
                                        { value: "+18%", label: "YoY land value", sublabel: "NH-66 corridor" },
                                        { value: "34%", label: "NRI buyer share", sublabel: "Q1 2026 data" },
                                        { value: "7.2%", label: "Avg rental yield", sublabel: "Commercial plots" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-secondary border border-border-strong rounded-2xl p-5 text-center">
                                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 font-sans">{stat.value}</p>
                                            <p className="text-text-main text-sm font-medium mt-1">{stat.label}</p>
                                            <p className="text-text-muted text-xs mt-0.5">{stat.sublabel}</p>
                                        </div>
                                    ))}
                                </div>

                                <h3 id="zoning" className="text-2xl md:text-3xl font-serif text-gold-500 font-bold mt-12 mb-4 scroll-mt-28">
                                    Zoning and Documentation
                                </h3>

                                <p>
                                    Despite the boom, investing blindly carries risks. The importance of verified documentation cannot be overstated. From securing an Encumbrance Certificate (EC) covering the last 30 years to ensuring clear demarcation in the village records (Patta), every buyer must engage in rigorous due diligence.
                                </p>

                                <div id="checklist" className="bg-secondary border border-border-strong rounded-2xl p-8 my-10 scroll-mt-28">
                                    <h4 className="text-text-main font-bold text-xl mb-5 font-serif flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 text-xs">✓</span>
                                        Investment Checklist
                                    </h4>
                                    <ul className="space-y-3 text-text-muted">
                                        {[
                                            "Verify the title deeds and previous ownership history (minimum 30 years).",
                                            "Ensure the land falls under appropriate residential or commercial zoning — avoid protected agricultural/wetlands.",
                                            "Confirm access to basic utilities and the width of the approach road (min. 10 ft for individual plots).",
                                            "Obtain an Encumbrance Certificate (EC) from the Sub-Registrar's Office.",
                                            "Cross-check Patta (village records) for correct survey number and boundaries.",
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="w-5 h-5 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                                                </span>
                                                <span className="text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div id="conclusion">
                                    <p>
                                        At Thrissur Plots, we simplify this complex landscape. Our curated portfolio consists only of 100% legally clear, pre-vetted properties, ensuring that your capital is deployed safely and profitably. Connect with our team of experts to explore available plots that match your investment profile.
                                    </p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-16 bg-gradient-to-r from-gold-500/10 via-gold-500/5 to-transparent border border-gold-500/20 rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">Ready to Invest?</p>
                                    <h3 className="text-xl font-serif font-bold text-text-main">Browse our verified plot listings</h3>
                                    <p className="text-text-muted text-sm mt-1.5">100% clear titles · DTCP approved · Expert guidance</p>
                                </div>
                                <Link
                                    href="/plots"
                                    className="flex-shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold py-3.5 px-7 rounded-xl text-sm uppercase tracking-wide shadow-[0_0_20px_rgba(229,161,45,0.3)] hover:shadow-[0_0_35px_rgba(229,161,45,0.5)] transition-all whitespace-nowrap"
                                >
                                    View Plots <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Related posts */}
                            <RelatedPosts currentSlug={slug} />
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}
