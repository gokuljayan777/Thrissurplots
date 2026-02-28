"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Maximize2, MoveRight } from "lucide-react";
import { Property } from "@/lib/data/mockData";

interface PlotCardProps {
    plot: Property;
}

export default function PlotCard({ plot }: PlotCardProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="group relative flex flex-col bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden hover:border-gold-600/50 transition-colors duration-500 shadow-lg hover:shadow-[0_8px_30px_rgba(229,161,45,0.15)]"
        >
            {/* Image Container */}
            <div className="relative w-full h-64 overflow-hidden bg-[#111]">
                <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Image
                        src={plot.imageUrl}
                        alt={plot.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
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
            <div className="p-6 flex flex-col flex-grow relative z-10 bg-gradient-to-t from-[#050505] to-[#0a0a0a]">

                <h3 className="text-xl font-serif text-white font-semibold leading-tight mb-2 group-hover:text-gold-400 transition-colors">
                    {plot.title}
                </h3>

                <div className="flex items-start text-gray-400 text-sm mb-4 font-sans font-light">
                    <MapPin className="w-4 h-4 mr-1.5 mt-0.5 text-gold-600 flex-shrink-0" />
                    <span className="truncate">{plot.location}</span>
                </div>

                {/* Specs Row */}
                <div className="flex items-center justify-between py-4 border-y border-white/5 mb-6">
                    <div className="flex items-center text-sm text-gray-300">
                        <Maximize2 className="w-4 h-4 mr-2 text-gold-500" />
                        <span className="font-medium tracking-wide">{plot.area}</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-0.5">Value</span>
                        <span className="text-lg font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                            {plot.price}
                        </span>
                    </div>
                </div>

                {/* Features Preview - optional display of 2 features */}
                {plot.features && plot.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {plot.features.slice(0, 2).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2 py-1 rounded-sm">
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
                        <button className="w-full flex items-center justify-center space-x-2 py-3 border border-gold-600/50 text-gold-400 hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-400 hover:text-black hover:border-transparent font-semibold uppercase tracking-wider text-sm rounded-sm transition-all duration-300 shadow-[0_0_0_rgba(229,161,45,0)] hover:shadow-[0_0_15px_rgba(229,161,45,0.4)]">
                            <span>View Details</span>
                            <MoveRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>

            </div>
        </motion.div>
    );
}
