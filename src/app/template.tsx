"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Cinematic Wipe Overlay */}
            <motion.div
                className="fixed inset-0 z-[100] bg-[#050505] pointer-events-none flex flex-col items-center justify-center"
                initial={{ transform: "translateY(0%)" }}
                animate={{ transform: "translateY(-100%)" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
                <motion.div
                    className="text-gold-400 font-serif text-3xl tracking-widest uppercase mb-2"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Premium Lands
                </motion.div>
                <motion.div
                    className="w-12 h-px bg-gold-600/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </motion.div>

            {/* Content Reveal Blur-Up */}
            <motion.div
                initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex-grow flex flex-col"
            >
                {children}
            </motion.div>
        </>
    );
}
