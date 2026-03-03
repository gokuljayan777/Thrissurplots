import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import FooterFavorites from "@/components/FooterFavorites";

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-border-strong transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Info */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-block flex flex-col items-start group"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24">
                <Image
                  src="/logo.png"
                  alt="Thrissur Plots Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-gold-500 dark:text-gold-400 mt-2 tracking-widest uppercase font-serif group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors">
                Premium Lands
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-muted pr-4">
              Your trusted partner for premium lands in the Cultural Capital of
              Kerala. We specialize in exclusive residential plots, commercial
              spaces, and high-yield investment opportunities.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text-main uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/plots"
                  className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                >
                  Exclusive Plots
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Saved Favorites */}
          <FooterFavorites />

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text-main uppercase tracking-wider">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-gold-600 dark:text-gold-500 mt-0.5 flex-shrink-0 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors" />
                <span className="leading-relaxed">
                  Swaraj Round North, Thrissur
                  <br />
                  Kerala 680001
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-gold-600 dark:text-gold-500 flex-shrink-0 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-gold-600 dark:text-gold-500 flex-shrink-0 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors" />
                <a
                  href="mailto:info@thrissurplots.com"
                  className="hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
                >
                  info@thrissurplots.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-subtle py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-text-muted">
          <p>
            &copy; {new Date().getFullYear()} Thrissur Plots. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
