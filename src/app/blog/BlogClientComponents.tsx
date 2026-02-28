"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogGrid() {
    const posts = [
        {
            slug: "why-thrissur-is-keralas-next-real-estate-hotspot",
            title: "Why Thrissur is Kerala's Next Real Estate Hotspot",
            excerpt: "An in-depth look at the infrastructure projects and demographic shifts driving unprecedented land value appreciation in the Cultural Capital.",
            date: "Oct 12, 2025",
            category: "Market Trends",
            imageUrl: "https://images.unsplash.com/photo-1579589882956-2e8c1ab16cff?q=80&w=2000&auto=format&fit=crop"
        },
        {
            slug: "guide-to-buying-agricultural-land-in-kerala",
            title: "The Ultimate Guide to Buying Agricultural Land",
            excerpt: "Navigating the legalities, zoning laws, and soil testing requirements when investing in high-yield farm lands around Peechi and Mannuthy.",
            date: "Sep 28, 2025",
            category: "Investment Guide",
            imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
        },
        {
            slug: "commercial-vs-residential-where-to-invest",
            title: "Commercial vs. Residential: Where to Invest in 2026?",
            excerpt: "A comparative ROI analysis of commercial plots near Swaraj Round versus residential layouts in the expanding suburban corridors.",
            date: "Sep 15, 2025",
            category: "Analysis",
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
        },
        {
            slug: "understanding-clear-titles-and-documents",
            title: "Understanding Clear Titles and Property Documents",
            excerpt: "Protect your investment. Learn the essential checklist for verifying Encumbrance Certificates, Title Deeds, and Patta in Kerala.",
            date: "Aug 30, 2025",
            category: "Legal & Documentation",
            imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop"
        },
        {
            slug: "top-5-upcoming-residential-areas-thrissur",
            title: "Top 5 Upcoming Residential Corridors in Thrissur",
            excerpt: "We analyze the micro-markets showing the highest promise for families looking to settle in peaceful yet connected neighborhoods.",
            date: "Aug 12, 2025",
            category: "Local Insights",
            imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop"
        },
        {
            slug: "how-nh-66-bypass-affects-land-prices",
            title: "The Impact of NH 66 Expansion on Land Prices",
            excerpt: "Tracking the dramatic surge in real estate queries along the National Highway 66 stretch and what it means for early investors.",
            date: "Jul 22, 2025",
            category: "Infrastructure",
            imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
        }
    ];

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {posts.map((post, idx) => (
                <motion.article
                    key={idx}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                    className="flex flex-col bg-[#111] border border-[#222] rounded-2xl overflow-hidden group hover:border-gold-600/40 transition-colors duration-500 shadow-lg"
                >
                    {/* Image Container */}
                    <Link href={`/blog/${post.slug}`} className="block relative h-64 overflow-hidden bg-[#0a0a0a]">
                        <motion.div
                            className="w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </motion.div>

                        {/* Category Badge */}
                        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm">
                            {post.category}
                        </div>
                    </Link>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow relative z-10">
                        <div className="text-gray-500 text-sm mb-3 font-medium">
                            {post.date}
                        </div>

                        <Link href={`/blog/${post.slug}`} className="group-hover:text-gold-400 transition-colors duration-300">
                            <h2 className="text-xl md:text-2xl font-serif text-white font-bold leading-snug mb-4">
                                {post.title}
                            </h2>
                        </Link>

                        <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                            {post.excerpt}
                        </p>

                        {/* Read More CTA */}
                        <Link
                            href={`/blog/${post.slug}`}
                            className="mt-auto flex items-center space-x-2 text-sm font-semibold uppercase tracking-wider text-white group-hover:text-gold-400 transition-colors w-max"
                        >
                            <span>Read Article</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </motion.article>
            ))}
        </motion.div>
    );
};
