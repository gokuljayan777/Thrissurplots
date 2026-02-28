"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Full-width Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1681283685652-326e0e0f34de?q=80&w=2000&auto=format&fit=crop"
                    alt="Thrissur Skyline"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                {/* Heavy dark overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#050505]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 text-center px-6 max-w-4xl pt-20"
            >
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-widest uppercase mb-6 drop-shadow-2xl">
                    Invest in the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400">Cultural Capital</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light font-serif italic max-w-2xl mx-auto">
                    "Where enduring heritage meets exponential growth."
                </p>
            </motion.div>
        </section>
    );
}

interface SectionProps {
    alignment: "left" | "right";
    imageUrl: string;
    title: string;
    content: string[];
}

export function Section({ alignment, imageUrl, title, content }: SectionProps) {
    const isLeft = alignment === "left";

    return (
        <div className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>

            {/* Image Block */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2"
            >
                <div className="relative aspect-[4/3] w-full max-w-xl mx-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Subtle gold gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 border border-gold-600/20 rounded-3xl pointer-events-none group-hover:border-gold-500/50 transition-colors duration-700"></div>
                </div>
            </motion.div>

            {/* Text Block */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="w-full lg:w-1/2 space-y-6"
            >
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-8">
                    {title}
                </h2>
                {content.map((paragraph, idx) => (
                    <p key={idx} className="text-lg text-gray-400 font-light leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </motion.div>

        </div>
    );
}

export function KeyPlacesGrid() {
    const places = [
        { name: "Swaraj Round", desc: "The commercial mega-hub and heart of the city." },
        { name: "Kuttanellur", desc: "Rapidly expanding residential and educational corridor." },
        { name: "Puzhakkal", desc: "The new transit and luxury lifestyle destination." },
        { name: "Mannuthy", desc: "Strategic highway access driving commercial value." }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#0a0a0a] border border-[#222] rounded-3xl p-10 md:p-16 relative overflow-hidden my-20"
        >
            {/* Decorative background grid */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 mb-12">
                    Top Investment Hubs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {places.map((place, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="bg-[#111] border border-[#333] p-8 rounded-2xl hover:border-gold-500/50 transition-all shadow-lg hover:shadow-[0_10px_30px_rgba(229,161,45,0.1)] group text-center"
                        >
                            <div className="w-12 h-1 bg-gold-600 rounded-full mx-auto mb-6 group-hover:bg-gold-400 transition-colors"></div>
                            <h3 className="text-xl font-serif text-white font-semibold mb-3 group-hover:text-gold-400 transition-colors">
                                {place.name}
                            </h3>
                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                {place.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
