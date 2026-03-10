"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const PropertyText = ({ title, category, location, price, rating, reviews, desc }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Fade in as it enters the center, fade out as it leaves
    const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
    const y = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [20, 0, -20]);

    return (
        <div ref={ref} className="h-[65vh] flex flex-col justify-center px-6 lg:px-20">
            <motion.div style={{ opacity, y }}>
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gold-500/10 text-gold-600 dark:text-gold-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-gold-500/20">
                        {category}
                    </span>
                    <div className="flex items-center gap-1 text-gold-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{rating}</span>
                        <span className="text-white/40 text-[10px]">({reviews} Reviews)</span>
                    </div>
                </div>

                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4 leading-tight">
                    {title}
                </h2>

                <div className="flex items-center gap-2 text-black/60 mb-6">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    <span className="text-sm font-light uppercase tracking-widest">{location}</span>
                </div>

                <p className="text-black/60 text-sm lg:text-base font-light leading-relaxed mb-8 max-w-lg">
                    {desc}
                </p>

                <div className="flex flex-col gap-1 mb-8">
                    <span className="text-black/40 text-xs uppercase tracking-widest">Starting from</span>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-800 font-sans">
                        ₹{price}
                    </span>
                </div>

                <Link
                    href="/plots"
                    className="inline-flex items-center gap-2 group text-black font-bold uppercase tracking-widest text-xs border-b border-gold-600/50 pb-2 hover:border-gold-600 transition-all"
                >
                    Explore this property <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </div>
    );
};

export default function PropertyStacking({ items }) {
    return (
        <section className="relative bg-white">
            <div className="flex flex-col lg:flex-row">
                {/* Left Column - Sticky Stacking Cards */}
                <div className="lg:w-1/2 relative">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="sticky top-0 h-[65vh] w-full flex items-center justify-center p-4 lg:p-12"
                            style={{ zIndex: index + 1 }}
                        >
                            <div className="relative w-full h-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                    sizes="40vw"
                                    priority={index === 0}
                                />
                                {/* Overlay for depth */}
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                            {/* Bottom tag for mobile context when stacked */}
                            <div className="absolute bottom-6 left-6 block lg:hidden">
                                <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold">
                                    Property 0{index + 1}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column - Scrolling Text */}
                <div className="lg:w-1/2 bg-white border-l border-black/5">
                    {items.map((item, index) => (
                        <PropertyText
                            key={index}
                            title={item.title}
                            category={item.category}
                            location={item.location}
                            price={item.price}
                            rating={item.rating}
                            reviews={item.reviews}
                            desc={item.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
