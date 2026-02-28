"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, Map, TrendingUp, Award, Clock, MapPin } from "lucide-react";

export function ProfileImage() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
        >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gold-600/30 group">
                <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop"
                    alt="Professional Handshake"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700"></div>
            </div>
        </motion.div>
    );
}

export function CompanyProfile() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
        >
            <div>
                <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Company Profile</p>
                <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
                    Building futures, one plot at a time.
                </h2>
            </div>
            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
                <p>
                    Founded on the principles of transparency and deep local market knowledge, Thrissur Plots has evolved into the region's premier destination for exclusive real estate. We don't just sell land; we curate opportunities that align perfectly with your vision and investment logic.
                </p>
                <p>
                    As Thrissur's leading land acquisition and advisory firm, our mission is to simplify the complex landscape of real estate transactions. With a dedicated team of legal experts, market analysts, and local area specialists, we provide a seamless, end-to-end buying experience tailored to both local residents and NRI investors.
                </p>
                <div className="pt-4 flex items-center gap-4">
                    <div className="h-12 w-1 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full"></div>
                    <p className="text-white font-medium italic">
                        "Our legacy is built on the trust of over two thousand happy families who have found their foundation with us."
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export function ExperienceSection() {
    return (
        <div className="w-full space-y-12">
            <div className="text-center max-w-3xl mx-auto">
                <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Our Expertise</p>
                <h2 className="text-3xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-6">
                    Decades of Land Transactions
                </h2>
                <p className="text-gray-400 font-light text-lg">
                    Handling diverse real estate portfolios requires unmatched precision and experience. Here is how we excel across different asset classes.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        icon: <TrendingUp className="w-8 h-8 text-gold-500" />,
                        title: "Investment Lands",
                        desc: "Identifying high-growth corridors with exponential ROI potential before the market catches on."
                    },
                    {
                        icon: <Map className="w-8 h-8 text-gold-500" />,
                        title: "Agricultural Estates",
                        desc: "Navigating complex zoning laws and evaluating soil and water quality for high-yield farming."
                    },
                    {
                        icon: <ShieldCheck className="w-8 h-8 text-gold-500" />,
                        title: "Commercial & Residential",
                        desc: "Securing prime spots in the city center and peaceful layouts in expanding suburban neighborhoods."
                    }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.15 }}
                        className="bg-[#111] border border-white/5 p-8 rounded-2xl hover:border-gold-500/30 transition-colors group"
                    >
                        <div className="bg-black w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/5">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-serif text-white mb-3">{item.title}</h3>
                        <p className="text-gray-400 font-light text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export function CoverageAreas() {
    const areas = ["Swaraj Round", "Peechi", "Mannuthy", "Kuttanellur", "Ayyanthole", "Punkunnam", "Ollur", "Amala Nagar"];

    return (
        <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2 space-y-6"
            >
                <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Coverage Areas</p>
                <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
                    Where We Operate
                </h2>
                <p className="text-gray-400 font-light text-lg leading-relaxed">
                    Our extensive network spans the entirety of the Thrissur district. From the bustling epicenter of the city to the tranquil borders, we have localized agents who understand the micro-markets of every neighborhood.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6">
                    {areas.map((area, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-gold-500" />
                            <span className="text-gray-300 font-medium">{area}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2"
            >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop"
                        alt="Thrissur Map Coverage"
                        fill
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 max-w-xs">
                        <div className="bg-black/80 backdrop-blur-md border border-gold-500/30 p-4 rounded-xl">
                            <p className="text-white font-serif font-bold text-lg">Thrissur District</p>
                            <p className="text-gold-400 text-sm">100% Coverage by our experts</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export function TrustElements() {
    return (
        <div className="w-full space-y-12">
            <div className="text-center max-w-3xl mx-auto">
                <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Why Trust Us</p>
                <h2 className="text-3xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-6">
                    Our Pillars of Trust
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        icon: <ShieldCheck className="w-6 h-6" />,
                        title: "100% Clear Titles",
                        desc: "Rigorous legal checks, encumbrance verification, and zero litigation history."
                    },
                    {
                        icon: <CheckCircle2 className="w-6 h-6" />,
                        title: "Transparent Pricing",
                        desc: "No hidden charges or surprise commissions. What you see is the absolute truth."
                    },
                    {
                        icon: <Award className="w-6 h-6" />,
                        title: "Verified Sellers",
                        desc: "Direct connections to land owners ensuring legitimate and secure transfers."
                    },
                    {
                        icon: <Clock className="w-6 h-6" />,
                        title: "End-to-End Support",
                        desc: "From initial site visit to final registration, we handle all the paperwork."
                    }
                ].map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="flex flex-col items-center text-center space-y-4 p-8 bg-[#111] border border-[#222] rounded-2xl hover:border-gold-500/40 hover:bg-[#151515] transition-all duration-300 group shadow-lg hover:shadow-gold-900/10 hover:-translate-y-1"
                    >
                        <div className="w-16 h-16 rounded-full bg-[#0a0a0a] border border-white/5 flex items-center justify-center text-gold-500 mb-2 group-hover:scale-110 group-hover:bg-gold-500/10 group-hover:border-gold-500/30 group-hover:shadow-[0_0_15px_rgba(229,161,45,0.2)] transition-all duration-300">
                            {item.icon}
                        </div>
                        <h3 className="text-white font-serif font-semibold text-lg group-hover:text-gold-400 transition-colors duration-300">{item.title}</h3>
                        <p className="text-gray-400 text-sm font-light leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export function StatsCounter() {
    const stats = [
        { number: "15+", label: "Years Experience" },
        { number: "500+", label: "Acres Sold" },
        { number: "100%", label: "Clear Titles" },
        { number: "2k+", label: "Happy Families" }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-16 pt-16 border-t border-white/5">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="text-center"
                >
                    <div className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-600 font-bold mb-3 drop-shadow-md">
                        {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-gray-400 uppercase tracking-widest font-semibold">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
