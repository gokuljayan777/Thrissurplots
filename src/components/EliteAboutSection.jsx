"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";
import MagneticButton from "./MagneticButton";

const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative inline-block mr-2 md:mr-5 mt-1.5 md:mt-4">
      <span className="absolute opacity-10 text-neutral-900">{children}</span>
      <motion.span style={{ opacity }} className="text-neutral-900">
        {children}
      </motion.span>
    </span>
  );
};

const ScrubText = ({ text }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 30%"] // Starts revealing when top enters 80% viewport, finishes when bottom at 30%
  });

  const words = text.split(" ");
  return (
    <div ref={container} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold leading-[1.4] flex flex-wrap justify-center text-center max-w-4xl mx-auto py-10 md:py-14">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};

export default function EliteAboutSection() {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden transition-colors duration-300">
      {/* Subtle Light-Themed Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold-500/[0.05] blur-[120px] rounded-[100%] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
        mixBlendMode: "multiply"
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="flex justify-center mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-neutral-100 border border-neutral-200 px-5 py-2 rounded-full"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-pulse" />
            <span className="text-neutral-600 text-[10px] font-bold tracking-[0.2em] uppercase">The Benchmark of Trust</span>
          </motion.div>
        </div>

        {/* Scroll-Scrub Vision Statement */}
        <ScrubText text="We don't just sell plots. We curate legacy properties for discerning investors who demand absolute legal perfection and exponential growth." />

        {/* Signature Glass Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
          {/* Main Hero Card */}
          <TiltCard 
            className="lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden group h-[250px] lg:h-[380px] border border-neutral-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] bg-neutral-50"
          >
            <div className="relative h-full w-full">
              <Image 
                src="/images/plots/plot1.jpg" 
                alt="Elite Real Estate Vision" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" 
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
            
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <p className="text-3xl sm:text-5xl font-sans font-extrabold text-white mb-0.5">12+</p>
                  <h3 className="text-white font-serif text-base sm:text-xl mb-1">Years of Unwavering Trust</h3>
                  <p className="text-white/80 font-light max-w-sm text-[10px] sm:text-sm">Architecting Thrissur's real estate landscape with transparency and precision since our inception.</p>
                </div>
                {/* Embedded CTA in Main Card */}
                <MagneticButton>
                  <Link href="/about" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-gold-500 transition-colors shadow-lg flex-shrink-0">
                    <ArrowRight className="w-4 h-4 text-white hover:text-black transition-colors" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </TiltCard>

          {/* Stat Card 1 */}
          <TiltCard 
            className="rounded-3xl bg-neutral-50 border border-neutral-100 p-5 sm:p-6 relative overflow-hidden group shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 blur-[60px] rounded-full group-hover:bg-gold-500/20 transition-colors duration-700 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gold-600/10 border border-gold-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-5 h-5 text-gold-600" />
              </div>
              <h3 className="text-xl font-serif text-neutral-900 mb-2">100% Legal</h3>
              <p className="text-neutral-500 text-xs md:text-sm font-light leading-relaxed">Every individual plot undergoes a rigorous quadruple-check process by our legal desk ensuring air-tight clearance before it even reaches you.</p>
            </div>
          </TiltCard>

          {/* Stat Card 2 */}
          <TiltCard 
            className="rounded-3xl bg-neutral-50 border border-neutral-100 p-5 sm:p-6 relative overflow-hidden group shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/10 blur-[60px] rounded-full group-hover:bg-gold-500/20 transition-colors duration-700 pointer-events-none" />
            <div className="relative z-10">
              <div className="text-4xl font-sans font-extrabold text-neutral-900 mb-3">
                <AnimatedNumber value="500" />+
              </div>
              <h3 className="text-lg font-serif text-neutral-900 mb-2">Premium Portfolios</h3>
              <p className="text-neutral-500 text-xs md:text-sm font-light leading-relaxed">Exclusive access to hand-picked luxury land parcels across Thrissur's most sought-after and rapidly appreciating corridors.</p>
            </div>
          </TiltCard>
        </div>

        {/* Global Diaspora Ribbon */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="mt-6 rounded-3xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 p-[1px] overflow-hidden"
        >
          <div className="bg-neutral-50 border border-neutral-100 rounded-[20px] px-5 py-6 sm:px-8 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-5 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <div className="absolute inset-0 bg-gold-500/5 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 lg:gap-5">
              <div className="w-10 h-10 rounded-full bg-gold-600/10 border border-gold-600/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-gold-600" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-serif text-neutral-900 mb-0.5">The NRI's First Choice</h4>
                <p className="text-neutral-600 text-[10px] sm:text-sm font-light max-w-lg">Dedicated relationship managers and seamless remote processing tailored specifically for the global Malayalee diaspora.</p>
              </div>
            </div>

            <Link href="/services" className="relative z-10 flex-shrink-0 bg-neutral-900 hover:bg-neutral-800 text-white font-bold uppercase tracking-widest text-[10px] px-8 py-4 rounded-full transition-all">
              Explore Services
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
