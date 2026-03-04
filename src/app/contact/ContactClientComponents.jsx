"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Loader2, User, Phone, Mail,
  MapPin, MessageSquare, Home, Building2, TrendingUp, Users,
  ChevronDown, ChevronUp, X, Award, ShieldCheck, Wallet
} from "lucide-react";
import { mockProperties } from "@/lib/data/mockData";

/* ══════════════════════════════════════════
   ANIMATED COUNTER (for stats)
══════════════════════════════════════════ */
function AnimatedCounter({ value, suffix, duration = 2 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun) {
          setHasRun(true);
          const end = parseFloat(value);
          const range = end;
          const stepTime = (duration * 1000) / 60;
          let current = 0;
          const step = range / (duration * 60);
          const timer = setInterval(() => {
            current += step;
            if (current >= end) {
              setDisplay(end);
              clearInterval(timer);
            } else {
              setDisplay(parseFloat(current.toFixed(1)));
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasRun]);

  const displayValue = Number.isInteger(parseFloat(value))
    ? Math.round(display)
    : display.toFixed(1);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

/* ══════════════════════════════════════════
   STATS STRIP
══════════════════════════════════════════ */
export function ContactStats() {
  const stats = [
    { value: "500", suffix: "+", label: "Plots Sold", icon: Home },
    { value: "1800", suffix: "+", label: "Happy Clients", icon: Users },
    { value: "12", suffix: "+", label: "Years Legacy", icon: TrendingUp },
    { value: "24", suffix: "h", label: "Response Time", icon: CheckCircle2 },
  ];

  return (
    <div className="w-full bg-gold-500 py-4 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <Icon className="w-5 h-5 text-black/60 flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-black font-sans leading-none tabular-nums">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-black/60 text-xs font-medium uppercase tracking-wider">{s.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   USP CARDS
══════════════════════════════════════════ */
export function ContactUSP() {
  const usps = [
    {
      Icon: Award,
      title: "Expert Guidance",
      desc: "Our seasoned advisors walk you through every step — from site selection to registration.",
    },
    {
      Icon: ShieldCheck,
      title: "Verified Listings Only",
      desc: "Every plot is legally verified with EC, Title Deed & DTCP approval before listing.",
    },
    {
      Icon: Wallet,
      title: "Zero Hidden Fees",
      desc: "Transparent pricing, no commission surprises. What you see is exactly what you get.",
    },
  ];



  return (
    <div className="w-full py-16 px-6 bg-secondary border-b border-border-subtle">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold-500 uppercase tracking-widest text-xs font-bold text-center mb-2"
        >
          Why Reach Out to Us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-2xl md:text-3xl font-serif font-bold text-text-main text-center mb-10"
        >
          We Make It Easy to Connect
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {usps.map((u, i) => {
            const Icon = u.Icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="group bg-primary border border-border-strong hover:border-gold-500/50 rounded-2xl p-8 text-center transition-all duration-500 hover:shadow-[0_8px_30px_rgba(229,161,45,0.12)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary border border-border-strong flex items-center justify-center mb-6 group-hover:bg-gold-500/10 group-hover:border-gold-500/40 transition-all duration-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(229,161,45,0.2)]">
                    <Icon className="w-8 h-8 text-gold-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif font-bold text-text-main text-lg mb-3 group-hover:text-gold-500 transition-colors uppercase tracking-tight">
                    {u.title}
                  </h3>
                  <p className="text-text-main/80 dark:text-text-muted text-sm font-light leading-relaxed">
                    {u.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SOCIAL LINKS BAR
══════════════════════════════════════════ */
export function SocialLinksBar() {
  const socials = [
    {
      name: "WhatsApp",
      href: "https://wa.me/919876543210",
      color: "#25D366",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
        </svg>
      ),
    },
    {
      name: "Call Now",
      href: "tel:+919876543210",
      color: "#b7872a",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      name: "Email",
      href: "mailto:info@thrissurplots.com",
      color: "#6366f1",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/thrissurplots",
      color: "#E1306C",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@thrissurplots",
      color: "#FF0000",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/thrissurplots",
      color: "#1877F2",
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full py-10 px-6 bg-primary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-text-muted text-xs uppercase tracking-widest mb-6 font-semibold">
          Connect With Us On
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-border-strong bg-secondary hover:border-gold-500/30 transition-all duration-300 text-text-muted hover:text-text-main text-sm font-semibold shadow-sm"
              style={{ "--hover-color": s.color }}
            >
              <span style={{ color: s.color }}>{s.icon}</span>
              {s.name}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   CONTACT FAQ
══════════════════════════════════════════ */
export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How quickly will someone respond to my enquiry?",
      a: "Our team responds within 24 hours on weekdays. For urgent queries, use WhatsApp or call us directly — we're available 6 days a week.",
    },
    {
      q: "Can I schedule a virtual site visit?",
      a: "Yes! We offer live video walkthroughs via WhatsApp or Google Meet for NRI buyers and outstation clients. Just mention it in your message.",
    },
    {
      q: "What information should I have ready before contacting?",
      a: "It helps to know your budget range, preferred location in Thrissur, purpose (residential/investment/agricultural), and your timeline for purchase.",
    },
  ];

  return (
    <div className="w-full py-16 px-6 bg-secondary border-t border-border-subtle">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold-500 uppercase tracking-widest text-xs font-bold text-center mb-2"
        >
          Quick Answers
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-2xl md:text-3xl font-serif font-bold text-text-main text-center mb-10"
        >
          Have Questions?
        </motion.h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-border-strong hover:border-gold-500/30 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left bg-primary hover:bg-secondary transition-colors gap-4"
              >
                <span className="font-serif font-semibold text-text-main text-sm md:text-base">{faq.q}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${openIndex === i ? "bg-gold-500 border-gold-500" : "border-border-strong"}`}>
                  {openIndex === i
                    ? <ChevronUp className="w-4 h-4 text-black" />
                    : <ChevronDown className="w-4 h-4 text-gold-500" />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-6 text-text-main/80 dark:text-text-muted font-light text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SITE VISIT CTA BANNER
══════════════════════════════════════════ */
export function SiteVisitBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-black py-16 px-6">
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[200px] rounded-full bg-gold-500/15 blur-3xl" />
      </div>
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
        backgroundSize: "28px 28px"
      }} />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-400 text-xs font-bold uppercase tracking-[0.25em]">Available 6 Days a Week</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
            Schedule a Free{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 italic font-light">
              Site Visit
            </span>
          </h2>
          <p className="text-white/50 font-light text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Our experts will personally escort you to the best plots matching your requirements.
            No commitment. No pressure.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20site%20visit."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_30px_rgba(229,161,45,0.4)] hover:shadow-[0_0_50px_rgba(229,161,45,0.6)] text-sm uppercase tracking-wider"
          >
            Book Site Visit on WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   CONTACT FORM (upgraded)
══════════════════════════════════════════ */
export function ContactForm() {
  const [searchLocation, setSearchLocation] = useState("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [budget, setBudget] = useState("");
  const [siteVisit, setSiteVisit] = useState(false);
  const [formStatus, setFormStatus] = useState("idle"); // idle | submitting | success
  const [fieldsCompleted, setFieldsCompleted] = useState(0);
  const locationFilterRef = useRef(null);

  const purposes = [
    { label: "Buy", icon: Home },
    { label: "Sell", icon: Building2 },
    { label: "Invest", icon: TrendingUp },
    { label: "Consult", icon: Users },
  ];

  const budgets = [
    "Under ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₹2Cr",
    "₹2Cr – ₹5Cr", "Above ₹5Cr",
  ];

  // Extract unique location names for autocomplete
  const locationOptions = useMemo(() => {
    const locs = mockProperties.map((p) => p.location.split(",")[0].trim());
    return Array.from(new Set(locs));
  }, []);

  const filteredLocationOptions = useMemo(() => {
    if (!searchLocation) return locationOptions;
    return locationOptions.filter((loc) =>
      loc.toLowerCase().includes(searchLocation.toLowerCase())
    );
  }, [searchLocation, locationOptions]);

  // Close location dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        locationFilterRef.current &&
        !locationFilterRef.current.contains(event.target)
      ) {
        setIsLocationDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1800);
  };

  if (formStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-16 text-center gap-5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-20 h-20 rounded-full bg-gold-500/10 border-2 border-gold-500 flex items-center justify-center"
        >
          <CheckCircle2 className="w-10 h-10 text-gold-500" />
        </motion.div>
        <div>
          <h3 className="text-2xl font-serif font-bold text-text-main mb-2">Message Sent!</h3>
          <p className="text-text-muted font-light text-sm max-w-xs">
            Our team will contact you within 24 hours. For faster response, message us on WhatsApp.
          </p>
        </div>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white font-bold py-3 px-6 rounded-xl text-sm uppercase tracking-wider transition-all hover:bg-[#1fba58]"
        >
          <span>Open WhatsApp</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <button
          onClick={() => setFormStatus("idle")}
          className="text-text-muted text-xs hover:text-gold-500 transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Purpose Chips */}
      <div>
        <p className="text-text-muted text-xs uppercase tracking-widest mb-3 font-semibold">I Want To</p>
        <div className="flex flex-wrap gap-3">
          {purposes.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setPurpose(label)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300
                ${purpose === label
                  ? "bg-gold-500 border-gold-500 text-black shadow-[0_0_12px_rgba(229,161,45,0.4)]"
                  : "border-border-strong text-text-muted hover:border-gold-500/40 hover:text-gold-500"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Name + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group">
          <input
            type="text"
            id="name"
            placeholder=" "
            className="peer w-full bg-transparent border-b border-border-strong py-3 text-text-main focus:outline-none focus:border-gold-500 transition-colors"
            required
          />
          <label
            htmlFor="name"
            className="absolute left-0 top-3 text-text-muted text-sm uppercase tracking-wider transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-main"
          >
            Full Name
          </label>
        </div>

        <div className="relative group">
          <input
            type="tel"
            id="phone"
            placeholder=" "
            className="peer w-full bg-transparent border-b border-border-strong py-3 text-text-main focus:outline-none focus:border-gold-500 transition-colors"
            required
          />
          <label
            htmlFor="phone"
            className="absolute left-0 top-3 text-text-muted text-sm uppercase tracking-wider transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-main"
          >
            Phone Number
          </label>
        </div>
      </div>

      {/* Email */}
      <div className="relative group">
        <input
          type="email"
          id="email"
          placeholder=" "
          className="peer w-full bg-transparent border-b border-border-strong py-3 text-text-main focus:outline-none focus:border-gold-500 transition-colors"
          required
        />
        <label
          htmlFor="email"
          className="absolute left-0 top-3 text-text-muted text-sm uppercase tracking-wider transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-main"
        >
          Email Address
        </label>
      </div>

      {/* Location Autocomplete */}
      <div className="relative group" ref={locationFilterRef}>
        <input
          type="text"
          id="location"
          value={searchLocation}
          onChange={(e) => {
            setSearchLocation(e.target.value);
            setIsLocationDropdownOpen(true);
          }}
          onFocus={() => setIsLocationDropdownOpen(true)}
          placeholder=" "
          className="peer w-full bg-transparent border-b border-border-strong py-3 text-text-main focus:outline-none focus:border-gold-500 transition-colors z-10 relative"
          autoComplete="off"
        />
        <label
          htmlFor="location"
          className="absolute left-0 top-3 text-text-muted text-sm uppercase tracking-wider transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gold-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-main"
        >
          Preferred Location / Area
        </label>
        <AnimatePresence>
          {isLocationDropdownOpen && filteredLocationOptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute z-50 left-0 right-0 top-full mt-2 max-h-48 overflow-y-auto bg-primary border border-border-strong rounded-lg shadow-xl"
            >
              {filteredLocationOptions.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setSearchLocation(loc);
                    setIsLocationDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-secondary hover:text-gold-600 dark:hover:text-gold-400 transition-colors text-sm text-text-main border-b border-border-subtle last:border-none"
                >
                  {loc}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Budget Range */}
      <div>
        <p className="text-text-muted text-xs uppercase tracking-widest mb-3 font-semibold">Budget Range</p>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              className={`px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-wide transition-all duration-300
                ${budget === b
                  ? "bg-gold-500/10 border-gold-500/60 text-gold-500"
                  : "border-border-strong text-text-muted hover:border-gold-500/30 hover:text-text-main"
                }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="relative group pt-4">
        <textarea
          id="message"
          rows={4}
          placeholder=" "
          className="peer w-full bg-transparent border-b border-border-strong py-3 text-text-main focus:outline-none focus:border-gold-500 transition-colors resize-none"
          required
        />
        <label
          htmlFor="message"
          className="absolute left-0 top-6 text-text-muted text-sm uppercase tracking-wider transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-main"
        >
          Your Message / Subject
        </label>
      </div>

      {/* Site Visit Checkbox */}
      <label className="flex items-start space-x-3 cursor-pointer group mt-6">
        <div className="mt-0.5 w-5 h-5 rounded border border-border-strong bg-transparent flex justify-center items-center group-hover:border-gold-500 relative transition-colors">
          <input
            type="checkbox"
            checked={siteVisit}
            onChange={(e) => setSiteVisit(e.target.checked)}
            className="appearance-none absolute inset-0 cursor-pointer peer"
          />
          <svg
            className="w-4 h-4 text-gold-500 opacity-0 peer-checked:opacity-100 transition-opacity"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">
          I would like to schedule a site visit with an expert.
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formStatus === "submitting"}
        className="w-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 disabled:opacity-70 text-black font-bold uppercase tracking-widest py-5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(229,161,45,0.2)] hover:shadow-[0_0_30px_rgba(229,161,45,0.4)] transform hover:-translate-y-0.5 mt-8 flex justify-center items-center space-x-2"
      >
        {formStatus === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
