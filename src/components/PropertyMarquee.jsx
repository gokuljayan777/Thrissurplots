"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2, ArrowRight, Star } from "lucide-react";

const MarqueeCard = ({ item }) => {
  return (
    <div className="flex-shrink-0 w-[350px] md:w-[450px] group">
      <div className="relative h-[500px] rounded-[2rem] overflow-hidden bg-white border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-all duration-700">
        
        {/* Image Section with Parallax Hover */}
        <div className="relative h-[60%] w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 350px, 450px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Top Badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
              {item.category}
            </span>
          </div>

          <div className="absolute top-6 right-6">
            <div className="bg-gold-500/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[10px] font-bold">{item.rating}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col h-[40%] bg-white">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gold-600" />
            <span className="text-xs font-light text-black/40 uppercase tracking-widest">{item.location}</span>
          </div>
          
          <h3 className="text-2xl font-serif font-bold text-black mb-4 leading-tight group-hover:text-gold-600 transition-colors">
            {item.title}
          </h3>

          <div className="mt-auto flex items-end justify-between border-t border-black/5 pt-6">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-black/30 font-bold mb-1">Starting Price</span>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-600 to-gold-400 font-sans">
                ₹{item.price}
              </span>
            </div>

            <Link href="/plots" className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-500">
              <ArrowRight className="w-5 h-5 text-black group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PropertyMarquee({ items }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate horizontal translation based on scroll
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-40%"]);

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 flex justify-between items-end">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold-600 uppercase tracking-[0.3em] text-xs font-bold mb-4"
          >
            Curated Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-black leading-[1.1] tracking-tight"
          >
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">Masterpieces</span>
          </motion.h2>
        </div>
        
        <div className="hidden md:flex flex-col items-end text-right">
           <span className="text-[10px] uppercase font-bold text-black/30 tracking-[0.4em] mb-2">Scroll to Discover</span>
           <div className="w-32 h-px bg-gradient-to-r from-transparent to-gold-500" />
        </div>
      </div>

      {/* Marquee Row */}
      <div className="relative flex items-center">
        <motion.div style={{ x }} className="flex gap-8 px-4 md:px-0">
          {/* We repeat the items to ensure the marquee space is filled if needed, 
              though with scroll-triggered x it depends on scroll height */}
          {items.map((item, idx) => (
            <MarqueeCard key={`p1-${idx}`} item={item} />
          ))}
          {items.map((item, idx) => (
            <MarqueeCard key={`p2-${idx}`} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Subtle Background Text */}
      <div className="absolute -bottom-10 left-0 w-full whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
        <span className="text-[200px] font-serif font-bold text-black tracking-tighter">
          &nbsp;PREMIUM&nbsp;LANDS&nbsp;THRISSUR&nbsp;PREMIUM&nbsp;LANDS&nbsp;
        </span>
      </div>
    </section>
  );
}
