"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Maximize2, MoveRight } from "lucide-react";


export default function PlotCard({ plot }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col bg-secondary border border-border-subtle rounded-xl overflow-hidden hover:border-gold-500/40 transition-shadow duration-500 shadow-sm hover:shadow-xl h-full"
      >
        {/* Image Container */}
        <div className="relative w-full h-64 overflow-hidden bg-primary">
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-x-0 top-[-15%] bottom-[-15%] w-full h-[130%]"
          >
            <motion.div
              className="w-full h-full relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={plot.imageUrl}
                alt={plot.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </motion.div>

          {/* Purpose Badge & Status */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-black/70 backdrop-blur-md border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm">
              {plot.type}
            </div>
          </div>

          {plot.status === "Sold" && (
            <div className="absolute top-4 right-4 bg-red-900/80 backdrop-blur-md text-red-200 border border-red-500/50 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm shadow-md">
              Sold Layout
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-6 flex flex-col flex-grow relative z-10 bg-gradient-to-t from-primary to-secondary">
          <h3 className="text-xl font-serif text-text-main font-semibold leading-tight mb-2 transition-colors">
            {plot.title}
          </h3>

          <div className="flex items-start text-text-muted text-sm mb-4 font-sans font-light">
            <MapPin className="w-4 h-4 mr-1.5 mt-0.5 text-gold-600 flex-shrink-0" />
            <span className="truncate">{plot.location}</span>
          </div>

          {/* Specs Row */}
          <div className="flex items-center justify-between py-4 border-y border-border-subtle mb-6">
            <div className="flex items-center text-sm text-text-muted">
              <Maximize2 className="w-4 h-4 mr-2 text-gold-500" />
              <span className="font-sans font-bold tracking-wide">{plot.area}</span>
            </div>
            <div className="text-right">
              <span className="block text-xs uppercase tracking-wider text-text-muted font-semibold mb-0.5">
                Value
              </span>
              <span className="text-lg font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 dark:from-gold-300 dark:to-gold-500 whitespace-nowrap">
                {plot.price}
              </span>
            </div>
          </div>

          {/* Features Preview - optional display of 2 features */}
          {plot.features && plot.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {plot.features.slice(0, 2).map((feature, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-secondary border border-border-strong text-text-muted px-2 py-1 rounded-sm shadow-sm"
                >
                  {feature}
                </span>
              ))}
              {plot.features.length > 2 && (
                <span className="text-xs text-gold-600 font-medium px-1 py-1">
                  +{plot.features.length - 2} more
                </span>
              )}
            </div>
          )}

          <div className="mt-auto">
            <Link href={`/plots/${plot.id}`} className="block w-full">
              <button className="w-full flex items-center justify-center space-x-2 py-3 border border-gold-600/60 text-gold-600 dark:text-gold-400 hover:bg-gold-500/10 hover:border-gold-500 font-bold uppercase tracking-widest text-sm rounded-sm transition-all duration-300 shadow-sm">
                <span>View Details</span>
                <motion.div
                  variants={{
                    initial: { x: 0 },
                    hover: { x: 4 }
                  }}
                  initial="initial"
                  whileHover="hover"
                >
                  <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
