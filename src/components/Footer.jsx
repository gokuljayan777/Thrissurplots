import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";

const columns = [
  {
    heading: "Explore",
    links: [
      { name: "Home", path: "/" },
      { name: "Exclusive Plots", path: "/plots" },
      { name: "Our Services", path: "/services" },
      { name: "Why Thrissur", path: "/why-thrissur" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
      { name: "Sitemap", path: "/sitemap" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { name: "+91 98765 43210", path: "tel:+919876543210", icon: Phone },
      { name: "info@thrissurplots.com", path: "mailto:info@thrissurplots.com", icon: Mail },
      { name: "Swaraj Round, Thrissur", path: "#", icon: MapPin },
    ],
  },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative" style={{ background: "#00022e" }}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Main content ────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 md:py-20">

        {/* Top row: Logo col + Link columns */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 border-b border-white/[0.08] pb-14">

          {/* LEFT — Brand */}
          <div className="lg:w-[38%] flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:pr-16">
            <Link href="/" className="inline-block">
              <div className="relative w-14 h-14 md:w-16 md:h-16">
                <Image src="/logo.png" alt="Thrissur Plots" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-white text-sm font-light leading-relaxed max-w-xs">
              Thrissur Plots empowers investors and homebuyers to discover
              exclusive land portfolios in Kerala&apos;s Cultural Capital —
              with full legal clarity and unmatched local expertise.
            </p>
            {/* Social icons */}
            <div className="flex items-center justify-center lg:justify-start gap-3 w-full">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-white/80 hover:border-gold-500/50 hover:text-gold-400 hover:bg-gold-500/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — 3 link columns */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-6">
                  {col.heading}
                </p>
                <ul className="space-y-4">
                  {col.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.path}
                          className="flex items-center gap-2 text-sm text-white hover:text-gold-400 transition-colors duration-200 font-light"
                        >
                          {Icon && <Icon className="w-3.5 h-3.5 text-gold-500/70 flex-shrink-0" />}
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/80 text-xs font-light tracking-wide">
            &copy; {new Date().getFullYear()} Thrissur Plots. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/80">
            <Link href="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-500 transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-gold-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
