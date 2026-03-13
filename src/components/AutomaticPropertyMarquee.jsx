"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PlotCard from "./PlotCard";
import { mockProperties } from "@/lib/data/mockData";

export default function AutomaticPropertyMarquee() {
  // Take exactly 6 properties for the 2 rows of 3 columns
  const gridItems = mockProperties.slice(0, 6);

  return (
    <section className="py-14 sm:py-20 bg-primary overflow-hidden relative border-t border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 flex flex-col items-center md:items-start text-center md:text-left">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gold-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-4"
        >
          Curated Portfolio
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-4xl font-serif font-bold text-black tracking-tight"
        >
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">Masterpieces</span>
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-6">
          {gridItems.map((plot, idx) => (
            <PlotCard key={plot.id} plot={plot} index={idx} />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-6 pb-4"
        >
          <Link href="/plots" className="bg-[#001738] text-white font-bold uppercase tracking-widest text-[13px] py-4 px-10 rounded-none hover:bg-[#001738]/90 transition-colors shadow-sm inline-flex items-center group">
            View All Plots
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
