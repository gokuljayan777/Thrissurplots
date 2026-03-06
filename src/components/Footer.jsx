import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin, ArrowRight } from "lucide-react";
import FooterFavorites from "@/components/FooterFavorites";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20 pb-0 bg-primary border-t border-border-subtle">
      {/* Top glowing accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[800px] h-[300px] rounded-full blur-[100px]" style={{ background: 'rgba(229,161,45,0.03)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-10 pb-16">

          {/* Column 1: Brand & Info */}
          <div className="flex flex-col items-start lg:pr-6">
            <Link href="/" className="group mb-6 flex flex-col items-start">
              <div className="relative w-28 h-28 opacity-90 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/logo.png"
                  alt="Thrissur Plots Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-gold-500 mt-2 tracking-[0.2em] uppercase font-serif group-hover:text-gold-400 transition-colors">
                Premium Lands
              </span>
            </Link>
            <p className="text-text-muted text-sm font-light leading-relaxed mb-8">
              Curating exclusive land portfolios in Kerala's Cultural Capital. Transparency, legal rigor, and unmatched advisory for modern investors.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full flex items-center justify-center border border-border-strong text-text-muted hover:border-gold-500/50 hover:text-gold-500 hover:bg-gold-500/10 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-lg font-serif text-text-main uppercase tracking-widest mb-6 relative inline-block">
              Navigation
              <span className="absolute -bottom-2 left-0 w-1/2 h-[1px] bg-gold-500/50" />
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Exclusive Plots", path: "/plots" },
                { name: "Our Services", path: "/services" },
                { name: "Why Thrissur", path: "/why-thrissur" },
                { name: "Contact", path: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="group flex items-center text-sm font-light text-text-muted hover:text-gold-500 transition-colors">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold-500" />
                    <span className="group-hover:-translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Saved Favorites */}
          <div>
            <FooterFavorites />
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-serif text-text-main uppercase tracking-widest mb-6 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-1/2 h-[1px] bg-gold-500/50" />
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-border-strong group-hover:border-gold-500/30 group-hover:bg-gold-500/10 transition-all flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gold-500" />
                </div>
                <span className="text-sm font-light text-text-muted leading-relaxed pt-1">
                  Swaraj Round North, Thrissur<br />Kerala 680001
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-border-strong group-hover:border-gold-500/30 group-hover:bg-gold-500/10 transition-all flex-shrink-0">
                  <Phone className="w-4 h-4 text-gold-500" />
                </div>
                <a href="tel:+919876543210" className="text-sm font-light text-text-muted hover:text-gold-500 transition-colors pt-1">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-border-strong group-hover:border-gold-500/30 group-hover:bg-gold-500/10 transition-all flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold-500" />
                </div>
                <a href="mailto:info@thrissurplots.com" className="text-sm font-light text-text-muted hover:text-gold-500 transition-colors pt-1">
                  info@thrissurplots.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-border-subtle py-6 relative z-10 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light text-text-muted tracking-wide">
            &copy; {new Date().getFullYear()} Thrissur Plots. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-text-muted font-light tracking-wide">
            <Link href="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-gold-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
