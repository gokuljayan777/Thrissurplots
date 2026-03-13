"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Heart, Star, Zap, Gem, Clock, ArrowRight, Maximize, Compass, TreePine, Layout } from "lucide-react";

export default function PlotCard({ plot, index = 0 }) {
  // Determine badge type based on index (just to showcase variety like the image)
  const badgeType = index % 3 === 0 ? "FEATURED" : index % 3 === 1 ? "HOT DEAL" : "EXCLUSIVE";
  const badgeColor = 
    badgeType === "FEATURED" ? "bg-[#0a8a5b] text-white" : 
    badgeType === "HOT DEAL" ? "bg-[#e56a25] text-white" : 
    "bg-[#155ee8] text-white";
  const BadgeIcon = 
    badgeType === "FEATURED" ? Star : 
    badgeType === "HOT DEAL" ? Zap : 
    Gem;

  // Map arbitrary features to icons for visual consistency similar to the image
  const getFeatureIcon = (featureStr, idx) => {
    const text = featureStr.toLowerCase();
    if (text.includes('road')) return <Layout className="w-3.5 h-3.5 mr-2 text-green-600" />;
    if (text.includes('facing') || text.includes('front')) return <Compass className="w-3.5 h-3.5 mr-2 text-green-600" />;
    return <TreePine className="w-3.5 h-3.5 mr-2 text-green-600" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex flex-col bg-white rounded-none border border-gray-200 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 h-full">
        
        {/* Image Container - Square Corners, matching image */}
        <div className="relative w-full h-[240px] overflow-hidden bg-gray-100 rounded-none border-b border-gray-200">
          <Image
            src={plot.imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800"}
            alt={plot.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Top Left Badge */}
          <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-wider rounded-none shadow-sm ${badgeColor}`}>
            <BadgeIcon className="w-3 h-3 fill-current" />
            {badgeType}
          </div>

          {/* Top Right Heart Button - Square */}
          <button className="absolute top-4 right-4 w-9 h-9 bg-white text-gray-500 hover:text-red-500 rounded-none shadow-sm flex items-center justify-center transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow relative bg-white rounded-none">
          
          {/* Title & Location */}
          <div className="mb-4">
            <h3 className="text-[20px] font-bold text-[#001738] leading-tight mb-2 font-sans truncate">
              {plot.title}
            </h3>
            <div className="flex items-start text-gray-400 text-sm">
              <MapPin className="w-4 h-4 mr-1.5 mt-0.5 text-[#0a8a5b] flex-shrink-0" />
              <span className="truncate">{plot.location}</span>
            </div>
          </div>

          {/* Price & Area Row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[24px] sm:text-[30px] font-bold text-[#004e4a] tracking-tight font-sans leading-none">
              {plot.price}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 bg-[#f3fbf8] border-2 border-[#d1e9e0] px-3 sm:px-4 py-1.5 sm:py-2 rounded-none shadow-sm group-hover:border-[#0a8a5b]/40 transition-all duration-300">
              <Maximize className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0a8a5b]" />
              <span className="text-[#0a8a5b] text-[11px] sm:text-[13px] font-bold uppercase tracking-wide font-sans">
                {plot.area}
              </span>
            </div>
          </div>
          <span className="text-gray-400 text-[11px] font-medium uppercase tracking-widest mb-5 block">Total Property Value</span>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200 mb-6" />

          {/* Footer Bottom Setup */}
          <div className="mt-auto pt-4 flex items-center justify-between">
            <Link href={`/plots/${plot.id}`} className="group/link flex items-center text-[#001738] font-bold text-[15px] tracking-wide lowercase hover:text-[#0a8a5b] transition-colors">
              view plot <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-1" />
            </Link>
            
            <div className="flex items-center text-gray-400 text-[13px]">
              <Clock className="w-3.5 h-3.5 mr-1 text-gray-300" />
              <span className="lowercase">{plot.status === "Available" ? "available" : plot.status === "Sold" ? "sold out" : "ready to build"}</span>
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
