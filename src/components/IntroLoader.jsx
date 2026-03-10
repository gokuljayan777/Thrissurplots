"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function IntroLoader({ onFinish }) {
    const [showSubtext, setShowSubtext] = useState(false);

    useEffect(() => {
        // Show subtext after logo starts fading in
        const timer = setTimeout(() => setShowSubtext(true), 600);
        // Finish loading after the full sequence
        const finishTimer = setTimeout(() => onFinish(), 2800);

        return () => {
            clearTimeout(timer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#00022e] overflow-hidden"
        >
            <div className="relative flex flex-col items-center">
                {/* Logo Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-24 h-24 md:w-32 md:h-32 mb-6"
                >
                    <Image
                        src="/logo.png"
                        alt="Thrissur Plots Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </motion.div>

                {/* Subtext */}
                <AnimatePresence>
                    {showSubtext && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="overflow-hidden"
                        >
                            <motion.span
                                initial={{ letterSpacing: "0.5em", opacity: 0 }}
                                animate={{ letterSpacing: "0.2em", opacity: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-gold-400 text-xs md:text-sm uppercase font-serif tracking-[0.2em]"
                            >
                                Premium Lands
                            </motion.span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative Golden Line */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "60px", opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mt-4"
                />
            </div>

            {/* Screen wipe/curtain effect (overlaying background blocks) */}
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "100%" }}
                exit={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 bg-white dark:bg-black pointer-events-none"
            />
        </motion.div>
    );
}
