"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Plots", href: "/plots" },
    { name: "Services", href: "/services" },
    { name: "Why Thrissur", href: "/why-thrissur" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-black/90 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-gold-900/30"
                    : "bg-transparent py-4"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-50 group flex flex-col items-center">
                        <div className="relative w-14 h-14 md:w-16 md:h-16">
                            <Image src="/logo.png" alt="Thrissur Plots Logo" fill className="object-contain" priority />
                        </div>
                        <span className="text-[10px] text-gold-400 tracking-widest uppercase mt-1 font-serif group-hover:text-gold-300 transition-colors">Premium Lands</span>
                    </Link>

                    {/* Desktop Links */}
                    <ul className="hidden lg:flex items-center space-x-8">
                        {NAV_LINKS.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`relative text-sm font-medium uppercase tracking-wider transition-colors hover:text-gold-400 group ${pathname === link.href ? "text-gold-400" : "text-gray-200"
                                        }`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full ${pathname === link.href ? "w-full" : ""
                                            }`}
                                    ></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button Desktop */}
                    <div className="hidden lg:block">
                        <Link href="/contact" passHref>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-gold-500 to-gold-400 text-black font-semibold px-6 py-2.5 rounded-sm uppercase tracking-wide text-sm shadow-[0_0_15px_rgba(229,161,45,0.3)] hover:shadow-[0_0_25px_rgba(229,161,45,0.5)] transition-shadow"
                            >
                                Enquire Now
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        title="Mobile Menu"
                        className="lg:hidden relative z-50 text-gold-400 p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-8 h-8" />
                        ) : (
                            <Menu className="w-8 h-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" />
                        )}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center h-screen overflow-hidden"
                    >
                        {/* Subtle decorative elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>

                        <ul className="flex flex-col space-y-8 text-center mt-12 w-full px-6">
                            {NAV_LINKS.map((link, i) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-3xl font-serif transition-colors ${pathname === link.href ? "text-gold-400" : "text-white"
                                            } hover:text-gold-300`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: NAV_LINKS.length * 0.1 }}
                                className="pt-8"
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="inline-block w-full max-w-xs bg-gold-500 text-black font-semibold py-4 rounded-sm uppercase tracking-wider text-lg"
                                >
                                    Enquire Now
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
