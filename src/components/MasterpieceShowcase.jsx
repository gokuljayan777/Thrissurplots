"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Star, ArrowRight, ShieldCheck, Gem, Landmark } from "lucide-react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const MasterpieceCard = ({ item, index, total }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and fade effects
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.95, 1, 0.95]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const rotateX = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [5, 0, -5]);

  return (
    <div ref={containerRef} className="h-[80vh] w-full flex items-center justify-center relative overflow-hidden px-4 md:px-0">
      {/* Background Image Layer with Parallax */}
      <motion.div 
        style={{ scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover brightness-[0.3] grayscale-[0.2]"
          sizes="100vw"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
      </motion.div>

      {/* Content Container */}
      <motion.div
        style={{ y, opacity, scale, rotateX, perspective: 1000 }}
        className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Side: Visual Frame */}
        <div className="relative group hidden lg:block">
          <div className="absolute -inset-4 bg-gold-500/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="50vw"
            />
            {/* Corner Decorative Elements */}
            <div className="absolute top-6 left-6 z-20">
               <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                 <ShieldCheck className="w-4 h-4 text-gold-400" />
                 <span className="text-[10px] uppercase font-bold tracking-widest text-white/90">Verified Title</span>
               </div>
            </div>
          </div>
          
          {/* Floating Stats */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="absolute -right-8 top-1/4 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl z-20"
          >
            <div className="flex items-center gap-3 mb-2 font-serif">
              <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-gold-500">{item.rating}</span>
              <div className="flex text-gold-500">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{item.reviews} Elite Reviews</p>
          </motion.div>
        </div>

        {/* Right Side: Luxury Details */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gold-500" />
            <span className="text-gold-400 uppercase tracking-[0.3em] text-xs font-bold">{item.category}</span>
          </div>

          <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {item.title}
          </h3>

          <div className="flex items-center gap-3 text-white/60 mb-6 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm self-start">
            <MapPin className="w-4 h-4 text-gold-500" />
            <span className="text-xs font-light uppercase tracking-widest">{item.location}</span>
          </div>

          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed mb-8 max-w-lg border-l-2 border-gold-500/20 pl-6">
            {item.desc}
          </p>

          <div className="flex items-end gap-x-8 mb-8">
            <div className="flex flex-col">
              <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Exclusively From</span>
              <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 font-sans">
                ₹{item.price}
              </span>
            </div>
            
            <div className="hidden sm:flex gap-4 pb-1">
               <div className="flex flex-col items-center gap-1">
                 <Gem className="w-5 h-5 text-gold-500" />
                 <span className="text-[8px] uppercase font-bold text-white/40 tracking-tighter">Premium</span>
               </div>
               <div className="flex flex-col items-center gap-1">
                 <Landmark className="w-5 h-5 text-gold-500" />
                 <span className="text-[8px] uppercase font-bold text-white/40 tracking-tighter">Verified</span>
               </div>
            </div>
          </div>

          <MagneticButton strength={25} className="self-start">
            <Link
              href="/plots"
              className="group relative inline-flex items-center gap-4 px-10 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-gold-500 hover:text-black shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_50px_rgba(229,161,45,0.3)] active:scale-95"
            >
              Experience Luxury <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
        </div>
      </motion.div>
      
      {/* Scroll Navigation Reference */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 items-center z-30">
        <span className="text-[10px] uppercase font-bold text-white/20 rotate-90 mb-4 tracking-[0.5em]">Sequence</span>
        <div className="flex flex-col gap-3">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className={`w-1 transition-all duration-500 ${i === index ? "h-12 bg-gold-500" : "h-4 bg-white/10"}`} 
            />
          ))}
        </div>
        <span className="text-gold-500 font-serif text-xl font-bold mt-4">0{index + 1}</span>
      </div>
    </div>
  );
};

export default function MasterpieceShowcase({ items }) {
  return (
    <section className="relative bg-black">
      {/* Ambient noise/grid for texture */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      {/* Continuity Gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />

      {items.map((item, index) => (
        <MasterpieceCard key={index} item={item} index={index} total={items.length} />
      ))}
      
      {/* Final Section Fade */}
      <div className="absolute bottom-0 inset-x-0 h-60 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
}
