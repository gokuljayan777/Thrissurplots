"use client";

import { motion, useInView } from "framer-motion";
import { Award, Building2, Shield, Users } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";

const stats = [
    { value: 500, suffix: "+", label: "Premium Plots", icon: Building2 },
    { value: 12, suffix: "+", label: "Years of Trust", icon: Award },
    { value: 1800, suffix: "+", label: "Happy Clients", icon: Users },
    { value: 98, suffix: "%", label: "Legal Clearance", icon: Shield },
];


export default function AnimatedStats() {
    return (
        <section className="py-16 px-6 bg-primary border-b border-border-subtle transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="text-center group"
                        >
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/20 mb-4 group-hover:bg-gold-500/20 transition-colors">
                                <stat.icon className="w-6 h-6 text-gold-500" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600 mb-1 leading-none">
                                <AnimatedNumber value={`${stat.value}${stat.suffix}`} />
                            </h3>
                            <p className="text-text-main/80 dark:text-text-muted text-sm font-sans font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
