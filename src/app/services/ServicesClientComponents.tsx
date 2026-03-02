"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin, HandCoins, Building2, FileText, Compass } from "lucide-react";

export function ServicesGrid() {
    const services = [
        {
            id: "buying",
            icon: <MapPin className="w-8 h-8 text-gold-500" />,
            title: "Premium Land Buying",
            description: "Discover exclusive residential and commercial plots in highly sought-after locations. We handle the market research, price negotiation, and secure the perfect foundation for your vision.",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
            colSpan: "md:col-span-2 lg:col-span-2",
        },
        {
            id: "selling",
            icon: <HandCoins className="w-8 h-8 text-gold-500" />,
            title: "Strategic Land Selling",
            description: "Maximize your property's value. We leverage our extensive network and targeted marketing to connect your land with serious, high-net-worth buyers.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
            colSpan: "md:col-span-1 lg:col-span-1",
        },
        {
            id: "investment",
            icon: <Building2 className="w-8 h-8 text-gold-500" />,
            title: "Investment Consultation",
            description: "Data-driven advisory for high-yield real estate portfolios. We identify emerging growth corridors in Thrissur to ensure exponential ROI on your land assets.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
            colSpan: "md:col-span-1 lg:col-span-1",
        },
        {
            id: "documentation",
            icon: <FileText className="w-8 h-8 text-gold-500" />,
            title: "Documentation Support",
            description: "Absolute peace of mind. Our legal experts manage encumbrance certificates, title verifications, patta transfers, and complete registration formalities with zero hassle.",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1000&auto=format&fit=crop",
            colSpan: "md:col-span-1 lg:col-span-1",
        },
        {
            id: "site-visit",
            icon: <Compass className="w-8 h-8 text-gold-500" />,
            title: "Site Visit Assistance",
            description: "Experience the land before you buy. We arrange guided, chauffeured tours to short-listed properties, providing on-ground insights into neighborhood dynamics and terrain.",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
            colSpan: "md:col-span-2 lg:col-span-1",
        }
    ];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15 }
                }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            {services.map((service) => (
                <motion.div
                    key={service.id}
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className={`relative w-full h-[400px] md:h-[450px] rounded-3xl overflow-hidden group border border-white/10 hover:border-gold-500/50 transition-colors duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${service.colSpan}`}
                >
                    {/* Background Image with Parallax-style scale */}
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlays for readability and premium feel */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-primary opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />

                    {/* Content Container */}
                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">

                        {/* Interactive Wrapper that slides up on hover */}
                        <div className="transform transition-transform duration-500 ease-out translate-y-8 group-hover:translate-y-0">

                            {/* Icon & Title */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 group-hover:border-gold-500/30 group-hover:bg-gold-500/10 transition-colors duration-500">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors duration-300 drop-shadow-lg">
                                    {service.title}
                                </h3>
                            </div>

                            {/* Description (Fades in on hover) */}
                            <p className="text-gray-300 font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                                {service.description}
                            </p>

                            {/* Action Button */}
                            <div className="flex items-center gap-2 text-gold-500 font-semibold tracking-wide text-sm uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-4 group-hover:translate-y-0">
                                <span>Learn More</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                            </div>

                        </div>
                    </div>

                    {/* Premium top subtle highlight line */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 group-hover:via-gold-400/50 to-transparent transition-colors duration-500" />
                </motion.div>
            ))}
        </motion.div>
    );
}
