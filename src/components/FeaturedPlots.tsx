"use client";

import { motion } from "framer-motion";
import { mockProperties } from "@/lib/data/mockData";
import PlotCard from "@/components/PlotCard";

export default function FeaturedPlots() {
    const featuredPlots = mockProperties.slice(0, 3); // taking first 3 for featured

    return (
        <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-gold-900/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400 tracking-wide mb-4"
                    >
                        Exclusive Properties
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-lg font-sans font-light max-w-2xl mx-auto"
                    >
                        Handpicked premium plots in Thrissur, offering unparalleled lifestyle and investment value.
                    </motion.p>
                </div>

                {/* Grid Container */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2, // Stagger effect
                            },
                        },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {featuredPlots.map((plot) => (
                        <PlotCard key={plot.id} plot={plot} />
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <a href="/plots" className="inline-block relative group">
                        <span className="relative z-10 text-gold-400 font-semibold uppercase tracking-widest text-sm transition-colors group-hover:text-gold-300">
                            View All Listings
                        </span>
                        <div className="absolute bottom-0 left-0 w-full h-px bg-gold-600/50 scale-x-100 group-hover:scale-x-0 transition-transform origin-left duration-300"></div>
                        <div className="absolute bottom-0 right-0 w-full h-px bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300"></div>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
