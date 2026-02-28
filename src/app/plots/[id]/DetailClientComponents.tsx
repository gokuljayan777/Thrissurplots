"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageProps {
    images: string[];
}

export default function DetailClientComponents({ images }: ImageProps) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
        >
            {/* Main Image */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-[#111] border border-gold-600/30 shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={images[activeImageIndex]}
                            alt="Property Feature"
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 100vw, 65vw"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`relative h-24 md:h-32 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${idx === activeImageIndex ? "border-gold-500 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                        onMouseEnter={() => setActiveImageIndex(idx)}
                        onClick={() => setActiveImageIndex(idx)}
                    >
                        <Image
                            src={img}
                            alt="Property Thumbnail"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 25vw, 15vw"
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
