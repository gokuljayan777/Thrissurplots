"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Check,
  X,
  Search,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
  LayoutGrid,
  List,
} from "lucide-react";
import PlotCard from "@/components/PlotCard";
import { mockProperties } from "@/lib/data/mockData";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Image from "next/image";
import Link from "next/link";

/* ─── Helpers ─── */
const parsePrice = (priceStr) => {
  const match = priceStr.match(/[\d.]+/);
  if (!match) return 0;
  const value = parseFloat(match[0]);
  if (priceStr.toLowerCase().includes("crore") || priceStr.toLowerCase().includes("cr")) return value * 10000000;
  if (priceStr.toLowerCase().includes("lakh") || priceStr.toLowerCase().includes("l")) return value * 100000;
  return value;
};

const parseAreaToCents = (areaStr) => {
  const match = areaStr.match(/[\d.]+/);
  if (!match) return 0;
  const value = parseFloat(match[0]);
  if (areaStr.toLowerCase().includes("acre")) return value * 100;
  return value;
};

const formatArea = (cents) => {
  if (cents >= 100) {
    const acres = cents / 100;
    return `${acres % 1 === 0 ? acres : acres.toFixed(2)} Acre${acres > 1 ? "s" : ""}`;
  }
  return `${cents} Cent${cents > 1 ? "s" : ""}`;
};

/* ─── Trust bar items ─── */
const trustItems = [
  { icon: ShieldCheck, label: "100% Clear Titles" },
  { icon: TrendingUp, label: "High ROI Locations" },
  { icon: Award, label: "DTCP Approved Plots" },
  { icon: MapPin, label: "Prime Thrissur Areas" },
  { icon: Sparkles, label: "Verified Listings Only" },
];

/* ─── Quick filter chips ─── */
const quickFilters = ["All", "Residential", "Commercial", "Agricultural", "Investment"];

export default function PlotsPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isDesktopFiltersOpen, setIsDesktopFiltersOpen] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  // Filter states
  const [searchLocation, setSearchLocation] = useState("");
  const [priceCategory, setPriceCategory] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState([]);
  const [quickFilter, setQuickFilter] = useState("All");
  const [minArea, setMinArea] = useState(0);
  const [maxArea, setMaxArea] = useState(500);
  const [roadAccess, setRoadAccess] = useState("");

  // Sort states
  const [sortBy, setSortBy] = useState("latest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef(null);

  const sortOptions = [
    { label: "Latest", value: "latest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
  ];

  // Close sort dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePurpose = (purpose) => {
    setSelectedPurpose((prev) =>
      prev.includes(purpose) ? prev.filter((p) => p !== purpose) : [...prev, purpose]
    );
  };

  const clearFilters = () => {
    setSearchLocation("");
    setPriceCategory("");
    setSelectedPurpose([]);
    setMinArea(0);
    setMaxArea(500);
    setRoadAccess("");
    setQuickFilter("All");
  };

  const searchOptions = useMemo(() => {
    const locs = mockProperties.map((p) => p.location.split(",")[0].trim());
    const titles = mockProperties.map((p) => p.title.trim());
    return Array.from(new Set([...locs, ...titles]));
  }, []);

  // Filter Logic
  const { filteredProperties, otherProperties } = useMemo(() => {
    const effectivePurpose =
      quickFilter !== "All" ? [quickFilter] : selectedPurpose;

    const hasFilters =
      searchLocation ||
      effectivePurpose.length > 0 ||
      roadAccess ||
      priceCategory ||
      minArea > 0 ||
      maxArea < 500;

    let exactMatches = [];
    const others = [];

    if (!hasFilters) {
      exactMatches = [...mockProperties];
    } else {
      mockProperties.forEach((p) => {
        let matches = true;

        if (searchLocation) {
          const lowerSearch = searchLocation.toLowerCase();
          if (!p.location.toLowerCase().includes(lowerSearch) && !p.title.toLowerCase().includes(lowerSearch)) {
            matches = false;
          }
        }

        if (matches && effectivePurpose.length > 0) {
          if (!effectivePurpose.includes(p.type)) matches = false;
        }

        if (matches && roadAccess) {
          const features = p.features.map((f) => f.toLowerCase());
          if (roadAccess === "highway" && !features.some((f) => f.includes("highway"))) matches = false;
          else if (roadAccess === "tar" && !features.some((f) => f.includes("tar"))) matches = false;
          else if (roadAccess === "panchayat" && !features.some((f) => f.includes("panchayat"))) matches = false;
        }

        if (matches && priceCategory) {
          const priceVal = parsePrice(p.price);
          let minP = 0, maxP = Infinity;
          switch (priceCategory) {
            case "Under 50 Lakh": maxP = 50 * 100000; break;
            case "50 Lakh - 1 Crore": minP = 50 * 100000; maxP = 1 * 10000000; break;
            case "1 Crore - 2 Crore": minP = 1 * 10000000; maxP = 2 * 10000000; break;
            case "2 Crore - 3 Crore": minP = 2 * 10000000; maxP = 3 * 10000000; break;
            case "3 Crore - 5 Crore": minP = 3 * 10000000; maxP = 5 * 10000000; break;
            case "Above 5 Crore": minP = 5 * 10000000; break;
          }
          if (priceVal < minP || priceVal > maxP) matches = false;
        }

        if (matches && (minArea > 0 || maxArea < 500)) {
          const areaVal = parseAreaToCents(p.area);
          if (areaVal < minArea || areaVal > maxArea) matches = false;
        }

        if (matches) exactMatches.push(p);
        else others.push(p);
      });
    }

    const sortFn = (a, b) => {
      if (sortBy === "price-low") return parsePrice(a.price) - parsePrice(b.price);
      if (sortBy === "price-high") return parsePrice(b.price) - parsePrice(a.price);
      return 0;
    };
    if (sortBy !== "latest") { exactMatches.sort(sortFn); others.sort(sortFn); }

    return { filteredProperties: exactMatches, otherProperties: others };
  }, [searchLocation, selectedPurpose, quickFilter, roadAccess, priceCategory, minArea, maxArea, sortBy]);

  const activeSortLabel = sortOptions.find((o) => o.value === sortBy)?.label || "Sort By";
  const activeFiltersCount = [
    searchLocation, priceCategory, roadAccess,
    ...(quickFilter !== "All" ? [quickFilter] : selectedPurpose),
    minArea > 0 ? "minArea" : null,
    maxArea < 500 ? "maxArea" : null,
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col w-full min-h-screen bg-primary text-text-main transition-colors duration-300">

      {/* ══════════════════════════
          CINEMATIC HERO
      ══════════════════════════ */}
      <section className="relative w-full h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2600&auto=format&fit=crop"
            alt="Premium Plots Thrissur"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-black/60 to-black" />
        {/* Dot pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
          backgroundSize: "36px 36px"
        }} />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 backdrop-blur-sm px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">{mockProperties.length} Verified Listings Available</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05] mb-4">
              Exclusive{" "}
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
                Premium
              </span>{" "}
              Plots
            </h1>
            <p className="text-white/65 text-lg max-w-2xl font-sans font-light">
              Discover the finest hand-picked land parcels in the cultural capital. Verified documents, prime locations, and high appreciation potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          TRUST BAR
      ══════════════════════════ */}
      <div className="w-full bg-secondary border-b border-border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-center md:justify-between gap-4">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-text-muted">
                <item.icon className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          QUICK FILTER CHIPS
      ══════════════════════════ */}
      <div className="w-full border-b border-border-subtle sticky top-[72px] z-30 bg-primary/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <span className="text-text-muted text-xs uppercase tracking-widest font-semibold whitespace-nowrap">Filter By:</span>
          {quickFilters.map((f) => (
            <button
              key={f}
              onClick={() => setQuickFilter(f)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${quickFilter === f
                ? "bg-gold-500 text-black border-gold-500 shadow-[0_0_12px_rgba(229,161,45,0.4)]"
                : "border-border-strong text-text-muted hover:border-gold-500/50 hover:text-text-main"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════
          MAIN CONTENT
      ══════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16 w-full">

        {/* Top action bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Mobile Filters Toggle */}
            <button
              className="lg:hidden flex items-center gap-2 bg-secondary border border-border-strong hover:border-gold-500/50 text-text-main transition-all px-4 py-2.5 rounded-xl text-sm font-semibold"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            >
              <Filter className="w-4 h-4 text-gold-500" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold-500 text-black text-xs font-bold flex items-center justify-center">{activeFiltersCount}</span>
              )}
            </button>

            {/* Desktop Filters Toggle */}
            {!isDesktopFiltersOpen && (
              <button
                className="hidden lg:flex items-center gap-2 bg-secondary border border-border-strong hover:border-gold-500/50 transition-all px-4 py-2.5 rounded-xl text-sm font-semibold text-text-main"
                onClick={() => setIsDesktopFiltersOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4 text-gold-500" />
                Show Filters
              </button>
            )}

            {/* Result count */}
            <span className="text-text-muted text-sm font-light">
              <span className="text-text-main font-bold font-sans">{filteredProperties.length}</span> plots found
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* View mode toggle */}
            <div className="hidden sm:flex border border-border-strong rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2.5 transition-colors ${viewMode === "grid" ? "bg-gold-500 text-black" : "bg-secondary text-text-muted hover:text-text-main"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2.5 transition-colors ${viewMode === "list" ? "bg-gold-500 text-black" : "bg-secondary text-text-muted hover:text-text-main"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort dropdown */}
            <div className="relative flex-1 sm:flex-none sm:w-52 z-20" ref={sortDropdownRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex items-center justify-between bg-secondary border border-border-strong hover:border-gold-500/50 text-sm text-text-main px-4 py-2.5 rounded-xl transition-colors"
              >
                <span className="font-medium">{activeSortLabel}</span>
                <ChevronDown className={`w-4 h-4 text-gold-500 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-2 w-full bg-primary border border-border-strong rounded-xl overflow-hidden shadow-2xl z-50"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${sortBy === option.value ? "bg-gold-500/10 text-gold-500 font-semibold" : "text-text-muted hover:bg-secondary hover:text-text-main"}`}
                      >
                        <span>{option.label}</span>
                        {sortBy === option.value && <Check className="w-4 h-4 text-gold-500" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Desktop Sidebar */}
          <AnimatePresence>
            {isDesktopFiltersOpen && (
              <motion.aside
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "320px" }}
                exit={{ opacity: 0, width: 0, overflow: "hidden" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block sticky top-40 h-[calc(100vh-12rem)] overflow-y-auto flex-shrink-0"
                style={{ scrollbarWidth: "none" }}
              >
                <FilterSidebarContent
                  searchLocation={searchLocation}
                  setSearchLocation={setSearchLocation}
                  searchOptions={searchOptions}
                  priceCategory={priceCategory}
                  setPriceCategory={setPriceCategory}
                  roadAccess={roadAccess}
                  setRoadAccess={setRoadAccess}
                  selectedPurpose={selectedPurpose}
                  togglePurpose={togglePurpose}
                  minArea={minArea}
                  setMinArea={setMinArea}
                  maxArea={maxArea}
                  setMaxArea={setMaxArea}
                  clearFilters={clearFilters}
                  onClose={() => setIsDesktopFiltersOpen(false)}
                  isDesktop
                  activeFiltersCount={activeFiltersCount}
                />
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Mobile Drawer */}
          <AnimatePresence>
            {isMobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                />
                <motion.div
                  initial={{ opacity: 0, x: "-100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "-100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-primary shadow-2xl border-r border-border-strong p-6 overflow-y-auto lg:hidden"
                >
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-border-subtle">
                    <h2 className="text-xl font-serif text-gold-500 flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5" /> Refine Search
                    </h2>
                    <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-text-muted hover:text-text-main hover:bg-secondary rounded-full transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSidebarContent
                    searchLocation={searchLocation}
                    setSearchLocation={setSearchLocation}
                    searchOptions={searchOptions}
                    priceCategory={priceCategory}
                    setPriceCategory={setPriceCategory}
                    roadAccess={roadAccess}
                    setRoadAccess={setRoadAccess}
                    selectedPurpose={selectedPurpose}
                    togglePurpose={togglePurpose}
                    minArea={minArea}
                    setMinArea={setMinArea}
                    maxArea={maxArea}
                    setMaxArea={setMaxArea}
                    clearFilters={clearFilters}
                    onClose={() => setIsMobileFiltersOpen(false)}
                    isDesktop={false}
                    activeFiltersCount={activeFiltersCount}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Listings */}
          <motion.main layout className="flex-1 min-w-0 relative z-10">
            {filteredProperties.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === "list" ? "grid-cols-1" : `grid-cols-1 md:grid-cols-2 ${isDesktopFiltersOpen ? "xl:grid-cols-2" : "xl:grid-cols-3 lg:grid-cols-3"}`}`}>
                <AnimatePresence mode="popLayout">
                  {filteredProperties.map((plot) => (
                    <motion.div
                      key={plot.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PlotCard plot={plot} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-24 px-8 text-center bg-secondary rounded-3xl border border-border-subtle relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: "radial-gradient(circle, #e5a12d 1px, transparent 1px)",
                  backgroundSize: "28px 28px"
                }} />
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-6">
                    <Filter className="w-8 h-8 text-gold-500" />
                  </div>
                  <h3 className="text-2xl font-serif text-text-main mb-3">No exact matches found</h3>
                  <p className="text-text-muted font-light max-w-md mb-8 text-base">
                    We couldn&apos;t find plots matching your current filters. Try adjusting the criteria or browse all our listings.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold uppercase tracking-wide py-3 px-8 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(229,161,45,0.3)]"
                  >
                    Clear All Filters <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Other listings */}
            {otherProperties.length > 0 && (
              <div className="mt-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-grow h-px bg-gradient-to-r from-gold-500/20 to-transparent" />
                  <h2 className="text-xl font-serif text-gold-400 font-semibold whitespace-nowrap px-2">You May Also Like</h2>
                  <div className="flex-grow h-px bg-gradient-to-l from-gold-500/20 to-transparent" />
                </div>
                <div className={`grid gap-6 grid-cols-1 md:grid-cols-2 ${isDesktopFiltersOpen ? "xl:grid-cols-2" : "xl:grid-cols-3 lg:grid-cols-3"}`}>
                  {otherProperties.map((plot) => (
                    <PlotCard key={`other-${plot.id}`} plot={plot} />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {(filteredProperties.length > 0 || otherProperties.length > 0) && (
              <div className="mt-14 flex justify-center">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      className={`w-11 h-11 flex items-center justify-center rounded-xl font-semibold font-sans transition-all text-sm ${n === 1 ? "bg-gold-500 text-black shadow-[0_0_15px_rgba(229,161,45,0.4)]" : "bg-secondary border border-border-strong text-text-muted hover:border-gold-500/50 hover:text-text-main"}`}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="px-2 text-text-muted font-light">...</span>
                  <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-secondary border border-border-strong text-text-muted hover:border-gold-500/50 text-sm">8</button>
                </div>
              </div>
            )}
          </motion.main>
        </div>
      </div>

      {/* ══════════════════════════
          BOTTOM CTA STRIP
      ══════════════════════════ */}
      <section className="relative py-24 px-6 bg-black overflow-hidden mt-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=2000&auto=format&fit=crop"
            alt="CTA background"
            fill
            className="object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60 z-0" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[600px] h-[300px] rounded-full bg-gold-500/8 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <p className="text-gold-500 uppercase tracking-widest text-sm font-semibold mb-3">Can&apos;t find the perfect plot?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
              Let Our Experts <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Find It For You</span>
            </h2>
            <p className="text-white/60 font-light text-lg max-w-lg">
              Describe your ideal plot and our team will match you with verified listings within 24 hours — completely free of charge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 flex-shrink-0"
          >
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_25px_rgba(229,161,45,0.4)] text-sm uppercase tracking-wide">
              <Phone className="w-4 h-4" /> Request Callback
            </Link>
            <Link href="https://wa.me/919876543210" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold py-4 px-8 rounded-xl transition-all text-sm uppercase tracking-wide">
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

/* ─── Filter Sidebar ─── */
function FilterSidebarContent({
  searchLocation, setSearchLocation, searchOptions,
  priceCategory, setPriceCategory,
  roadAccess, setRoadAccess,
  selectedPurpose, togglePurpose,
  minArea, setMinArea, maxArea, setMaxArea,
  clearFilters, onClose, isDesktop, activeFiltersCount,
}) {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const locationFilterRef = useRef(null);
  const priceDropdownRef = useRef(null);

  const priceOptions = [
    { label: "Under 50 Lakh" },
    { label: "50 Lakh - 1 Crore" },
    { label: "1 Crore - 2 Crore" },
    { label: "2 Crore - 3 Crore" },
    { label: "3 Crore - 5 Crore" },
    { label: "Above 5 Crore" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (locationFilterRef.current && !locationFilterRef.current.contains(event.target)) setIsLocationDropdownOpen(false);
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) setIsPriceDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSearchOptions = useMemo(() => {
    if (!searchLocation) return searchOptions;
    return searchOptions.filter((opt) => opt.toLowerCase().includes(searchLocation.toLowerCase()));
  }, [searchLocation, searchOptions]);

  return (
    <div className="bg-secondary border border-border-subtle rounded-2xl p-6 shadow-xl relative transition-colors duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-gold-500">
          <SlidersHorizontal className="w-5 h-5" />
          <h2 className="font-serif text-lg tracking-wide">Refine Search</h2>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-gold-500 text-black text-xs font-bold flex items-center justify-center">{activeFiltersCount}</span>
          )}
        </div>
        {isDesktop && (
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-main hover:bg-secondary/80 rounded-full transition-colors" title="Close">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-7">

        {/* Location */}
        <div className="relative" ref={locationFilterRef}>
          <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-widest">Location / Name</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500" />
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => { setSearchLocation(e.target.value); setIsLocationDropdownOpen(true); }}
              onFocus={() => setIsLocationDropdownOpen(true)}
              placeholder="Location or property name..."
              className="w-full bg-primary border border-border-strong rounded-xl py-3 pl-10 pr-3 text-sm text-text-main placeholder-text-muted outline-none focus:border-gold-500/50 transition-colors"
            />
          </div>
          <AnimatePresence>
            {isLocationDropdownOpen && filteredSearchOptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute z-50 left-0 right-0 top-full mt-1 max-h-44 overflow-y-auto bg-primary border border-border-strong rounded-xl shadow-2xl"
              >
                {filteredSearchOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSearchLocation(opt); setIsLocationDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gold-500/10 hover:text-gold-400 transition-colors text-sm text-text-muted border-b border-border-subtle last:border-none flex items-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" /> {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className="relative" ref={priceDropdownRef}>
          <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-widest">Price Range</label>
          <button
            type="button"
            onClick={() => setIsPriceDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between bg-primary border border-border-strong rounded-xl p-3 text-sm text-text-main outline-none focus:border-gold-500/50 transition-colors"
          >
            <span className={priceCategory ? "text-text-main font-medium" : "text-text-muted"}>{priceCategory || "Select Range"}</span>
            <ChevronDown className={`w-4 h-4 text-gold-500 transition-transform ${isPriceDropdownOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {isPriceDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute z-50 left-0 w-full top-full mt-1 bg-primary border border-border-strong rounded-xl shadow-2xl overflow-hidden"
              >
                {priceOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => { setPriceCategory(opt.label); setIsPriceDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm border-b border-border-subtle last:border-none flex items-center justify-between transition-colors ${priceCategory === opt.label ? "bg-gold-500/10 text-gold-500 font-semibold" : "text-text-muted hover:bg-gold-500/5 hover:text-gold-400"}`}
                  >
                    <span>{opt.label}</span>
                    {priceCategory === opt.label && <Check className="w-4 h-4 text-gold-500" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Area slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-widest">Plot Size</label>
            <span className="text-gold-500 text-xs font-bold font-sans">
              {formatArea(minArea)} – {maxArea >= 500 ? "5+ Acres" : formatArea(maxArea)}
            </span>
          </div>
          {/* Histogram */}
          <div className="flex items-end justify-between h-12 gap-[2px] px-1 mb-3">
            {[2, 5, 8, 12, 20, 35, 45, 60, 40, 25, 15, 10, 8, 5, 3, 2, 1, 1, 1, 2].map((height, i) => {
              const barMin = (i / 20) * 500;
              const barMax = ((i + 1) / 20) * 500;
              const inRange = maxArea >= barMin && minArea <= barMax;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.02 }}
                  className={`flex-1 rounded-t-sm transition-colors duration-300 ${inRange ? "bg-gold-500/80" : "bg-black/10 dark:bg-white/10"}`}
                />
              );
            })}
          </div>
          <Slider
            range
            min={0}
            max={500}
            step={5}
            value={[minArea, maxArea]}
            onChange={(val) => { if (Array.isArray(val)) { setMinArea(val[0]); setMaxArea(val[1]); } }}
            styles={{
              track: { backgroundColor: "#e5a12d", height: 4 },
              rail: { backgroundColor: "#333", height: 4 },
              handle: { borderColor: "#e5a12d", height: 18, width: 18, marginTop: -7, backgroundColor: "#fff", opacity: 1, boxShadow: "0 0 10px rgba(229,161,45,0.6)" },
            }}
          />
        </div>

        {/* Purpose */}
        <div>
          <label className="block text-xs font-bold text-text-muted mb-3 uppercase tracking-widest">Purpose</label>
          <div className="grid grid-cols-2 gap-2">
            {["Residential", "Commercial", "Agricultural", "Investment"].map((purpose) => {
              const checked = selectedPurpose.includes(purpose);
              return (
                <button
                  key={purpose}
                  onClick={() => togglePurpose(purpose)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${checked ? "bg-gold-500/15 border-gold-500/50 text-gold-400" : "border-border-strong text-text-muted hover:border-gold-500/30 hover:text-text-main"}`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 ${checked ? "bg-gold-500 border-gold-500" : "border-border-strong"}`}>
                    {checked && <Check className="w-3 h-3 text-black" />}
                  </div>
                  {purpose}
                </button>
              );
            })}
          </div>
        </div>

        {/* Road Access */}
        <div>
          <label className="block text-xs font-bold text-text-muted mb-3 uppercase tracking-widest">Road Access</label>
          <div className="grid grid-cols-2 gap-2">
            {[{ val: "", label: "Any" }, { val: "highway", label: "Highway" }, { val: "tar", label: "Tar Road" }, { val: "panchayat", label: "Panchayat" }].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setRoadAccess(opt.val)}
                className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${roadAccess === opt.val ? "bg-gold-500/15 border-gold-500/50 text-gold-400" : "border-border-strong text-text-muted hover:border-gold-500/30 hover:text-text-main"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Clear filters */}
      {activeFiltersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 pt-5 border-t border-border-subtle"
        >
          <button
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 text-sm text-text-muted hover:text-gold-400 uppercase tracking-widest font-semibold transition-colors"
          >
            <X className="w-4 h-4" /> Clear All Filters ({activeFiltersCount})
          </button>
        </motion.div>
      )}
    </div>
  );
}
