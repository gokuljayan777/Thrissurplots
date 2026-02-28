"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Building2, Star, ArrowRight, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FeaturedPlots from "@/components/FeaturedPlots";

/* ─── Blog data (first 3 from the blog page) ─── */
const blogPosts = [
  {
    slug: "why-thrissur-is-keralas-next-real-estate-hotspot",
    title: "Why Thrissur is Kerala's Next Real Estate Hotspot",
    excerpt:
      "An in-depth look at the infrastructure projects and demographic shifts driving unprecedented land value appreciation in the Cultural Capital.",
    date: "Oct 12, 2025",
    category: "Market Trends",
    imageUrl:
      "https://images.unsplash.com/photo-1579589882956-2e8c1ab16cff?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "guide-to-buying-agricultural-land-in-kerala",
    title: "The Ultimate Guide to Buying Agricultural Land",
    excerpt:
      "Navigating the legalities, zoning laws, and soil testing requirements when investing in high-yield farm lands around Peechi and Mannuthy.",
    date: "Sep 28, 2025",
    category: "Investment Guide",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
  },
  {
    slug: "commercial-vs-residential-where-to-invest",
    title: "Commercial vs. Residential: Where to Invest in 2026?",
    excerpt:
      "A comparative ROI analysis of commercial plots near Swaraj Round versus residential layouts in the expanding suburban corridors.",
    date: "Sep 15, 2025",
    category: "Analysis",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
  },
];

/* ─── Review data (6 clients) ─── */
const reviews = [
  {
    name: "Arun Menon",
    role: "Homebuyer, Thrissur",
    review:
      "Thrissur Plots made my land-buying journey effortless. Their guidance on documentation and location selection was outstanding.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Investor, Kochi",
    review:
      "Exceptional service! I found a prime investment plot within days. The team's market knowledge is truly impressive.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Suresh Kumar",
    role: "Commercial Buyer, Palakkad",
    review:
      "Professional, transparent, and prompt. They helped me secure a commercial plot in Mannuthy at the right price.",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
  },
  {
    name: "Anjali Thomas",
    role: "Plot Owner, Thrissur",
    review:
      "I was worried about legal complexities, but the team walked me through every step. Highly trustworthy and reliable.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "Vishnu Prasad",
    role: "NRI Investor, Dubai",
    review:
      "As an NRI, I needed someone I could trust remotely. Thrissur Plots exceeded every expectation. Smooth transaction!",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    rating: 5,
  },
  {
    name: "Deepa Rajan",
    role: "First-time Buyer, Thrissur",
    review:
      "The best decision I made was reaching out to them. Found a beautiful residential plot close to the city in my budget.",
    avatar: "https://randomuser.me/api/portraits/women/83.jpg",
    rating: 5,
  },
];

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-[#050505]">
      {/* ════════════════ HERO ════════════════ */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2600&auto=format&fit=crop"
            alt="Premium Real Estate Kerala Landscape"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#050505]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center mt-20 lg:mt-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
            }}
            className="max-w-4xl"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
              className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg"
            >
              Discover{" "}
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
                Premium
              </span>{" "}
              Lands in the Cultural Capital.
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
              }}
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-sans font-light"
            >
              Exclusive residential plots, commercial spaces, and investment opportunities in Thrissur.
            </motion.p>
          </motion.div>

          {/* Quick Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-5xl bg-black/60 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]"
          >
            <form className="flex flex-col md:flex-row gap-4 items-center" onSubmit={(e) => e.preventDefault()}>
              {/* Location */}
              <div className="w-full md:w-5/12 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:text-gold-400 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Location / Area in Thrissur"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-400 outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all font-sans"
                />
              </div>

              {/* Purpose */}
              <div className="w-full md:w-4/12 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 group-focus-within:text-gold-400 transition-colors">
                  <Building2 className="w-5 h-5" />
                </div>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-gold-500/50 focus:bg-white/10 transition-all font-sans appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-500 bg-black">Purpose</option>
                  <option value="residential" className="bg-[#111]">Residential</option>
                  <option value="commercial" className="bg-[#111]">Commercial</option>
                  <option value="agricultural" className="bg-[#111]">Agricultural</option>
                  <option value="investment" className="bg-[#111]">Investment</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Search Button */}
              <div className="w-full md:w-3/12">
                <Link
                  href="/plots"
                  className="w-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold uppercase tracking-wide py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(229,161,45,0.3)] hover:shadow-[0_0_30px_rgba(229,161,45,0.5)] transform hover:-translate-y-0.5"
                >
                  <Search className="w-5 h-5" />
                  <span>Search Plots</span>
                </Link>
              </div>
            </form>
          </motion.div>

          {/* Contact CTAs in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="https://wa.me/919876543210"
              className="group relative overflow-hidden flex items-center justify-center bg-[#075E54] text-white font-semibold tracking-wide py-3 px-6 rounded-xl shadow-[0_4px_14px_rgba(7,94,84,0.4)] transition-all"
            >
              <div className="absolute inset-y-0 left-0 w-0 bg-[#128C7E] transition-all duration-500 ease-out group-hover:w-full z-0"></div>
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </span>
            </Link>

            <Link
              href="tel:+919876543210"
              className="group relative overflow-hidden flex items-center justify-center bg-gradient-to-r from-gold-500 to-gold-600 text-black font-semibold tracking-wide py-3 px-6 rounded-xl shadow-[0_4px_14px_rgba(229,161,45,0.4)] transition-all"
            >
              <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-gold-400 to-gold-300 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
              <span className="relative z-10 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </span>
            </Link>
            <Link
              href="/contact"
              className="group relative overflow-hidden flex items-center justify-center border border-gold-500 text-gold-400 font-semibold tracking-wide py-3 px-6 rounded-xl transition-all"
            >
              <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Enquire
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ════ FEATURED PLOTS ════ */}
      <FeaturedPlots />

      {/* ════════════════ VIDEO HIGHLIGHTS ════════════════ */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Discover</p>
            <h2 className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-4">
              Thrissur Culture & Places
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto font-light">
              Experience the vibrant traditions, historic landmarks, and scenic beauty that make Thrissur the Cultural Capital of Kerala.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto rounded-3xl flex overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] relative aspect-video"
          >
            {/* Note to User: Replace this src with an actual YouTube video id of Thrissur highlights */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&loop=1"
              title="Thrissur Culture Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ REVIEWS ════════════════ */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto font-light">
              Real stories from happy landowners and investors across Kerala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="bg-[#111] border border-[#222] hover:border-gold-600/40 rounded-2xl p-8 flex flex-col gap-5 transition-colors duration-500"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 font-light leading-relaxed italic flex-grow">
                  &ldquo;{r.review}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold-500/30 flex-shrink-0">
                    <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-gray-500 text-xs">{r.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ BLOG HIGHLIGHTS ════════════════ */}
      <section className="py-24 px-6 bg-[#070707] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Insights</p>
            <h2 className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-4">
              From Our Blog
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto font-light">
              Stay updated with market trends, investment guides, and real estate insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="flex flex-col bg-[#111] border border-[#222] hover:border-gold-600/40 rounded-2xl overflow-hidden group transition-colors duration-500"
              >
                <Link href={`/blog/${post.slug}`} className="block relative h-52 overflow-hidden">
                  <motion.div className="w-full h-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </motion.div>
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm">
                    {post.category}
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-500 text-sm mb-3">{post.date}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-serif text-white font-bold leading-snug mb-3 group-hover:text-gold-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 font-light text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-gold-400 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 font-semibold tracking-wide py-3 px-8 rounded-xl transition-all"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ CONTACT CTA ════════════════ */}
      <section className="py-28 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-4">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-6">
              Ready to Find Your Dream Plot?
            </h2>
            <p className="text-gray-400 font-light text-lg mb-10 max-w-xl mx-auto">
              Let our experts guide you to the perfect land in Thrissur. We&apos;re just a message away.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(229,161,45,0.3)] hover:shadow-[0_0_30px_rgba(229,161,45,0.5)] transform hover:-translate-y-0.5"
            >
              Contact Us Now
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
