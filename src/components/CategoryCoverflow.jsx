"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function CategoryCoverflow({ categories }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % categories.length);
    }, [categories.length]);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
    }, [categories.length]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "ArrowRight") nextSlide();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Optional: Auto-play
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isHovered, nextSlide]);

    // Calculate the relative position of a card
    const getCardStyle = (index) => {
        const diff = (index - activeIndex + categories.length) % categories.length;
        const isCenter = diff === 0;

        let x = 0;
        let z = 0;
        let rotateY = 0;
        let opacity = 1;
        let scale = 1;
        let zIndex = 0;

        if (isCenter) {
            x = 0;
            z = 0;
            rotateY = 0;
            opacity = 1;
            scale = 1.1;
            zIndex = 10;
        } else if (diff === 1 || diff === -3) {
            // Right
            x = 240;
            z = -150;
            rotateY = -35;
            opacity = 0.35;
            scale = 0.8;
            zIndex = 5;
        } else if (diff === categories.length - 1) {
            // Left
            x = -240;
            z = -150;
            rotateY = 35;
            opacity = 0.35;
            scale = 0.8;
            zIndex = 5;
        } else {
            // Back
            x = 0;
            z = -200;
            rotateY = 0;
            opacity = 0;
            scale = 0.7;
            zIndex = 1;
        }

        return { x, z, rotateY, opacity, scale, zIndex };
    };

    return (
        <div
            className="relative w-full max-w-5xl mx-auto h-[500px] flex items-center justify-center -mt-8"
            style={{ perspective: "1500px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Radial Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <motion.div
                    className="w-[500px] h-[500px] rounded-full blur-[120px]"
                    style={{ background: "radial-gradient(circle, rgba(229, 161, 45, 0.08) 0%, transparent 70%)" }}
                />
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Cards Container */}
            <div className="relative w-full h-[380px] flex items-center justify-center transform-gpu" style={{ transformStyle: "preserve-3d" }}>
                <AnimatePresence initial={false}>
                    {categories.map((cat, i) => {
                        const style = getCardStyle(i);
                        const isCenter = style.x === 0 && style.z === 0;

                        return (
                            <motion.div
                                key={cat.title}
                                initial={false}
                                animate={{
                                    x: style.x,
                                    z: style.z,
                                    rotateY: style.rotateY,
                                    opacity: style.opacity,
                                    scale: style.scale,
                                    zIndex: style.zIndex,
                                    filter: isCenter ? "blur(0px)" : "blur(2px)",
                                }}
                                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                className="absolute w-[280px] h-[360px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={() => setActiveIndex(i)}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div
                                    className={`w-full h-full rounded-2xl p-8 flex flex-col transition-all duration-500 overflow-hidden ${isCenter
                                            ? "bg-white border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
                                            : "bg-white/10 border border-white/5 backdrop-blur-sm grayscale-[0.5]"
                                        }`}
                                >
                                    <div className="relative z-10 flex-col h-full flex">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm ${isCenter
                                                ? "bg-gold-500/10 border border-gold-500/20 text-gold-600"
                                                : "bg-white/5 text-white/30"
                                            }`}>
                                            <cat.icon className="w-7 h-7" />
                                        </div>

                                        <h3 className={`text-2xl font-serif font-bold mb-3 ${isCenter ? "text-slate-900" : "text-white/40"
                                            }`}>
                                            {cat.title}
                                        </h3>

                                        <p className={`text-sm font-medium leading-relaxed mb-6 ${isCenter ? "text-slate-600" : "text-white/20"
                                            }`}>
                                            {cat.desc}
                                        </p>

                                        <div className="mt-auto">
                                            <Link
                                                href={cat.href}
                                                onClick={(e) => {
                                                    if (!isCenter) e.preventDefault();
                                                }}
                                                className={`inline-flex items-center gap-2 font-bold uppercase tracking-wide text-xs ${isCenter
                                                        ? "text-gold-600 hover:text-gold-500"
                                                        : "text-gold-500/70"
                                                    }`}
                                            >
                                                Explore <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center text-white/40 text-sm font-serif italic tracking-wide">
                Swipe left/right or click to select a category.
            </div>
        </div>
    );
}
