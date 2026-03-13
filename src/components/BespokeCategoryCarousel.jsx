"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  Home,
  Building2,
  Leaf,
  TrendingUp 
} from "lucide-react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const categories = [
  {
    id: 1,
    title: "Residential",
    description: "Serene layouts in premium neighbourhoods, designed for your dream home.",
    icon: Home,
    href: "/plots?type=Residential",
  },
  {
    id: 2,
    title: "Commercial",
    description: "High-footfall prime plots near business hubs for maximum ROI.",
    icon: Building2,
    href: "/plots?type=Commercial",
  },
  {
    id: 3,
    title: "Agricultural",
    description: "Fertile farm lands with river frontage and eco resort potential.",
    icon: Leaf,
    href: "/plots?type=Agricultural",
  },
  {
    id: 4,
    title: "Investment",
    description: "High-appreciation plots in fast-developing corridors of Thrissur.",
    icon: TrendingUp,
    href: "/plots?type=Investment",
  },
];

export default function BespokeCategoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
  }, []);

  const activeCategory = categories[activeIndex];

  // Spring transition configuration
  const springTransition = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-20 px-4 flex flex-col items-center overflow-hidden">
      
      {/* Search Header Pattern (Optional enhancement) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative w-full flex items-center justify-center min-h-[500px]">
        {/* Navigation Arrows with Magnetic Effect */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 md:px-12 z-20 pointer-events-none">
          <MagneticButton strength={30} className="pointer-events-auto">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-500/30 backdrop-blur-sm transition-colors"
              aria-label="Previous Category"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </MagneticButton>

          <MagneticButton strength={30} className="pointer-events-auto">
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-500/30 backdrop-blur-sm transition-colors"
              aria-label="Next Category"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </MagneticButton>
        </div>

        {/* Carousel Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={springTransition}
            className="w-full max-w-2xl px-2"
          >
            {/* Center Glassmorphism Card */}
            <div 
              className="relative p-8 md:p-16 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden backdrop-blur-[16px] bg-white/[0.03] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              {/* Background Ambient Glow */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gold-500/5 blur-[80px] rounded-full pointer-events-none" />

              {/* Icon Section */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ ...springTransition, delay: 0.1 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center mb-6 md:mb-8 shadow-2xl"
              >
                <activeCategory.icon className="w-8 h-8 md:w-10 md:h-10 text-gold-400 drop-shadow-[0_0_10px_rgba(229,161,45,0.5)]" />
              </motion.div>

              {/* Title with Gold Gradient */}
              <motion.h3 
                className="text-3xl md:text-6xl font-serif font-bold mb-4 md:mb-6 tracking-tight"
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundImage: "linear-gradient(to right, #f7e2ab, #b8860b)",
                }}
              >
                {activeCategory.title}
              </motion.h3>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base md:text-xl text-white/50 font-light leading-relaxed mb-8 md:mb-10 max-w-sm"
              >
                {activeCategory.description}
              </motion.p>

              {/* Explore Button with Magnetic Effect */}
              <MagneticButton strength={20}>
                <Link
                  href={activeCategory.href}
                  className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-3.5 md:py-4 rounded-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all shadow-[0_10px_30px_rgba(184,134,11,0.3)] hover:shadow-[0_15px_40px_rgba(184,134,11,0.5)] active:scale-95"
                >
                  Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 flex gap-3 z-20">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex 
                  ? "w-8 bg-gold-500 shadow-[0_0_10px_rgba(229,161,45,0.8)]" 
                  : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
