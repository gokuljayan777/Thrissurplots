"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mockProperties } from "@/lib/data/mockData";
import PlotCard from "@/components/PlotCard";

export default function FeaturedPlots() {
  const featuredPlots = mockProperties;

  return (
    <section className="py-24 bg-primary border-t border-border-strong relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-gold-900/50 dark:via-gold-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="overflow-hidden mb-4 pb-2">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400 tracking-wide"
            >
              Exclusive Properties
            </motion.h2>
          </div>
          <div className="overflow-hidden pt-1">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-text-muted text-lg font-sans font-light max-w-2xl mx-auto"
            >
              Handpicked premium plots in Thrissur, offering unparalleled
              lifestyle and investment value.
            </motion.p>
          </div>
        </div>

        {/* Single Row Marquee */}
        <div className="relative w-full overflow-hidden mb-12 py-4">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-6 px-3 hover:[animation-play-state:paused]"
          >
            {[...featuredPlots, ...featuredPlots].map((plot, i) => (
              <div key={`${plot.id}-${i}`} className="w-[320px] md:w-[400px] shrink-0">
                <PlotCard plot={plot} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link href="/plots" className="inline-block relative group">
            <span className="relative z-10 text-gold-400 font-semibold uppercase tracking-widest text-sm transition-colors group-hover:text-gold-300">
              View All Listings
            </span>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gold-600/50 scale-x-100 group-hover:scale-x-0 transition-transform origin-left duration-300"></div>
            <div className="absolute bottom-0 right-0 w-full h-px bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-right duration-300"></div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
