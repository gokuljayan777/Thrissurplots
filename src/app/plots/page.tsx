"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, ChevronDown, Check, X } from "lucide-react";
import PlotCard from "@/components/PlotCard";
import { mockProperties } from "@/lib/data/mockData";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const parsePrice = (priceStr: string) => {
    const match = priceStr.match(/[\d.]+/);
    if (!match) return 0;
    const value = parseFloat(match[0]);
    if (priceStr.toLowerCase().includes('crore') || priceStr.toLowerCase().includes('cr')) {
        return value * 10000000;
    } else if (priceStr.toLowerCase().includes('lakh') || priceStr.toLowerCase().includes('l')) {
        return value * 100000;
    }
    return value;
};

const parseAreaToCents = (areaStr: string) => {
    const match = areaStr.match(/[\d.]+/);
    if (!match) return 0;
    const value = parseFloat(match[0]);
    if (areaStr.toLowerCase().includes('acre')) {
        return value * 100; // 1 Acre = 100 Cents
    }
    return value; // Assume Cents by default
};

const formatArea = (cents: number) => {
    if (cents >= 100) {
        const acres = cents / 100;
        return `${acres % 1 === 0 ? acres : acres.toFixed(2)} Acre${acres > 1 ? 's' : ''}`;
    }
    return `${cents} Cent${cents > 1 ? 's' : ''}`;
};

export default function PlotsPage() {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isDesktopFiltersOpen, setIsDesktopFiltersOpen] = useState(true);

    // Filter states
    const [searchLocation, setSearchLocation] = useState("");
    const [priceCategory, setPriceCategory] = useState("");
    const [selectedPurpose, setSelectedPurpose] = useState<string[]>([]);
    const [minArea, setMinArea] = useState<number>(0);
    const [maxArea, setMaxArea] = useState<number>(500); // 500 cents = 5 acres
    const [roadAccess, setRoadAccess] = useState("");

    // Sort states
    const [sortBy, setSortBy] = useState("latest");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortDropdownRef = useRef<HTMLDivElement>(null);

    const sortOptions = [
        { label: "Latest", value: "latest" },
        { label: "Price: Low to High", value: "price-low" },
        { label: "Price: High to Low", value: "price-high" }
    ];

    // Close sort dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const togglePurpose = (purpose: string) => {
        setSelectedPurpose((prev) =>
            prev.includes(purpose)
                ? prev.filter((p) => p !== purpose)
                : [...prev, purpose]
        );
    };

    const clearFilters = () => {
        setSearchLocation("");
        setPriceCategory("");
        setSelectedPurpose([]);
        setMinArea(0);
        setMaxArea(500);
        setRoadAccess("");
    };

    // Extract unique location names and property titles for autocomplete
    const searchOptions = useMemo(() => {
        // Strip out the ", Thrissur" part for cleaner dropdowns, or keep entire strings
        const locs = mockProperties.map(p => p.location.split(',')[0].trim());
        const titles = mockProperties.map(p => p.title.trim());
        return Array.from(new Set([...locs, ...titles]));
    }, []);

    // Filter Logic
    const { filteredProperties, otherProperties } = useMemo(() => {
        // We duplicate mock properties just for demo grid filling if there's only 3
        const allResult = [...mockProperties, ...mockProperties.map(p => ({ ...p, id: `${p.id}-dup` }))];

        const hasFilters = searchLocation || selectedPurpose.length > 0 || roadAccess || priceCategory || minArea > 0 || maxArea < 500;

        let exactMatches: typeof mockProperties = [];
        const others: typeof mockProperties = [];

        if (!hasFilters) {
            exactMatches = [...allResult];
        } else {
            allResult.forEach(p => {
                let matches = true;

                if (searchLocation) {
                    const lowerSearch = searchLocation.toLowerCase();
                    if (!p.location.toLowerCase().includes(lowerSearch) && !p.title.toLowerCase().includes(lowerSearch)) {
                        matches = false;
                    }
                }

                if (matches && selectedPurpose.length > 0) {
                    if (!selectedPurpose.includes(p.type)) matches = false;
                }

                if (matches && roadAccess) {
                    const features = p.features.map(f => f.toLowerCase());
                    if (roadAccess === "highway" && !features.some(f => f.includes("highway"))) matches = false;
                    else if (roadAccess === "tar" && !features.some(f => f.includes("tar"))) matches = false;
                    else if (roadAccess === "panchayat" && !features.some(f => f.includes("panchayat"))) matches = false;
                }

                if (matches && priceCategory) {
                    const priceVal = parsePrice(p.price);
                    let minP = 0;
                    let maxP = Infinity;

                    switch (priceCategory) {
                        case "Under 50 Lakh":
                            maxP = 50 * 100000;
                            break;
                        case "50 Lakh - 1 Crore":
                            minP = 50 * 100000;
                            maxP = 1 * 10000000;
                            break;
                        case "1 Crore - 2 Crore":
                            minP = 1 * 10000000;
                            maxP = 2 * 10000000;
                            break;
                        case "2 Crore - 3 Crore":
                            minP = 2 * 10000000;
                            maxP = 3 * 10000000;
                            break;
                        case "3 Crore - 5 Crore":
                            minP = 3 * 10000000;
                            maxP = 5 * 10000000;
                            break;
                        case "Above 5 Crore":
                            minP = 5 * 10000000;
                            break;
                    }

                    if (priceVal < minP || priceVal > maxP) {
                        matches = false;
                    }
                }

                if (matches && (minArea > 0 || maxArea < 500)) {
                    const areaVal = parseAreaToCents(p.area);
                    if (areaVal < minArea || areaVal > maxArea) matches = false;
                }

                if (matches) {
                    exactMatches.push(p);
                } else {
                    others.push(p);
                }
            });
        }

        // Sorting
        const sortFn = (a: typeof mockProperties[0], b: typeof mockProperties[0]) => {
            if (sortBy === "price-low") return parsePrice(a.price) - parsePrice(b.price);
            if (sortBy === "price-high") return parsePrice(b.price) - parsePrice(a.price);
            return 0; // Default or "latest" logic
        };

        if (sortBy !== "latest") {
            exactMatches.sort(sortFn);
            others.sort(sortFn);
        }

        return { filteredProperties: exactMatches, otherProperties: others };
    }, [searchLocation, selectedPurpose, roadAccess, priceCategory, minArea, maxArea, sortBy]);

    const activeSortLabel = sortOptions.find(o => o.value === sortBy)?.label || "Sort By";

    return (
        <div className="min-h-screen bg-primary text-text-main pt-24 pb-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-border-subtle pb-6">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 dark:from-gold-300 dark:via-gold-500 dark:to-gold-600 mb-4 sm:mb-0">
                        Land Listings
                    </h1>

                    <div className="flex items-center space-x-4 w-full sm:w-auto">

                        {/* Mobile Filters Toggle */}
                        <button
                            className="lg:hidden flex justify-center items-center space-x-2 bg-gradient-to-r hover:from-gold-600 hover:to-gold-500 bg-secondary border border-border-strong hover:border-gold-500/50 hover:text-white transition-all px-4 py-2.5 rounded-lg text-sm w-full sm:w-auto"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="font-semibold uppercase tracking-wider">Filters</span>
                        </button>

                        {/* Desktop Filters Toggle (Visible only if desktop filters are hidden) */}
                        {!isDesktopFiltersOpen && (
                            <button
                                className="hidden lg:flex items-center space-x-2 bg-gradient-to-r hover:from-gold-600 hover:to-gold-500 bg-secondary border border-border-strong hover:border-gold-500/50 hover:text-black transition-all px-4 py-2.5 rounded-lg text-sm"
                                onClick={() => setIsDesktopFiltersOpen(true)}
                            >
                                <Filter className="w-4 h-4" />
                                <span className="font-semibold uppercase tracking-wider">Show Filters</span>
                            </button>
                        )}

                        {/* Custom Sort Dropdown */}
                        <div className="relative w-full sm:w-auto z-20" ref={sortDropdownRef}>
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="w-full sm:w-56 flex items-center justify-between bg-secondary border border-border-strong hover:border-gold-500/50 text-sm text-text-muted px-4 py-2.5 rounded-lg transition-colors outline-none"
                            >
                                <span>{activeSortLabel}</span>
                                <ChevronDown className={`w-4 h-4 text-gold-500 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full right-0 mt-2 w-full sm:w-56 bg-[#0a0a0a] border border-[#333] rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                                    >
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${sortBy === option.value ? "bg-gold-500/10 text-gold-600 dark:text-gold-400" : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main"}`}
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

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Advanced Filters Sidebar (Left Column) - Desktop */}
                    <AnimatePresence>
                        {isDesktopFiltersOpen && (
                            <motion.aside
                                initial={{ opacity: 0, width: 0, margin: 0 }}
                                animate={{ opacity: 1, width: "33.333333%", marginRight: "2rem" }}
                                exit={{ opacity: 0, width: 0, margin: 0, overflow: "hidden" }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="hidden lg:block sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto flex-shrink-0"
                                style={{ scrollbarWidth: 'none' }}
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
                                />
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {/* Mobile Filters Drawer */}
                    <AnimatePresence>
                        {isMobileFiltersOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: "-100%" }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "-100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-primary shadow-2xl border-r border-border-strong p-6 overflow-y-auto lg:hidden"
                            >
                                <div className="flex justify-between items-center mb-8 border-b border-[#222] pb-6">
                                    <h2 className="text-xl font-serif text-gold-600 dark:text-gold-400">Filters</h2>
                                    <button onClick={() => { setRoadAccess(""); setIsMobileFiltersOpen(false); }} className="text-text-muted hover:text-text-main p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
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
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Overlay */}
                    <AnimatePresence>
                        {isMobileFiltersOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileFiltersOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                            />
                        )}
                    </AnimatePresence>

                    {/* Listings Grid (Right Column) */}
                    <motion.main
                        layout
                        className="w-full flex-grow relative z-10"
                    >
                        {filteredProperties.length > 0 ? (
                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all ${isDesktopFiltersOpen ? "xl:grid-cols-2" : "xl:grid-cols-3 lg:grid-cols-3"}`}>
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
                            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-secondary/50 border border-border-subtle rounded-2xl">
                                <Filter className="w-12 h-12 text-gray-600 mb-4" />
                                <h3 className="text-xl font-serif text-text-main mb-2">No exact matches found</h3>
                                <p className="text-text-muted font-light max-w-md mb-6">We couldn&apos;t find any exact matches for your filters, but here are some other properties you might like.</p>
                                <button onClick={clearFilters} className="text-gold-600 dark:text-gold-500 hover:text-gold-400 uppercase tracking-widest font-semibold text-sm border-b border-gold-600 dark:border-gold-500 hover:border-gold-400 pb-1">
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {otherProperties.length > 0 && (
                            <div className="mt-16">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="flex-grow h-px bg-white/10"></div>
                                    <h2 className="text-2xl font-serif text-gold-400 font-bold whitespace-nowrap">Also you may like</h2>
                                    <div className="flex-grow h-px bg-white/10"></div>
                                </div>
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all ${isDesktopFiltersOpen ? "xl:grid-cols-2" : "xl:grid-cols-3 lg:grid-cols-3"}`}>
                                    {otherProperties.map((plot) => (
                                        <PlotCard key={`other-${plot.id}`} plot={plot} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pagination Placeholder (only show if there are results) */}
                        {(filteredProperties.length > 0 || otherProperties.length > 0) && (
                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center space-x-2">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gold-600 font-semibold text-black">1</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary border border-border-strong text-text-muted hover:border-gold-500 hover:text-text-main transition-colors">2</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary border border-border-strong text-text-muted hover:border-gold-500 hover:text-text-main transition-colors">3</button>
                                </div>
                            </div>
                        )}
                    </motion.main>

                </div>
            </div>
        </div>
    );
}

function FilterSidebarContent({
    searchLocation, setSearchLocation, searchOptions,
    priceCategory, setPriceCategory,
    roadAccess, setRoadAccess,
    selectedPurpose, togglePurpose,
    minArea, setMinArea,
    maxArea, setMaxArea,
    clearFilters,
    onClose,
    isDesktop
}: {
    searchLocation: string;
    setSearchLocation: (val: string) => void;
    searchOptions: string[];
    priceCategory: string;
    setPriceCategory: (val: string) => void;
    roadAccess: string;
    setRoadAccess: (val: string) => void;
    selectedPurpose: string[];
    togglePurpose: (val: string) => void;
    minArea: number;
    setMinArea: (val: number) => void;
    maxArea: number;
    setMaxArea: (val: number) => void;
    clearFilters: () => void;
    onClose: () => void;
    isDesktop: boolean;
}) {
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
    const locationFilterRef = useRef<HTMLDivElement>(null);
    const priceDropdownRef = useRef<HTMLDivElement>(null);

    const priceOptions = [
        { label: "Under 50 Lakh" },
        { label: "50 Lakh - 1 Crore" },
        { label: "1 Crore - 2 Crore" },
        { label: "2 Crore - 3 Crore" },
        { label: "3 Crore - 5 Crore" },
        { label: "Above 5 Crore" },
    ];

    // Close location dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (locationFilterRef.current && !locationFilterRef.current.contains(event.target as Node)) {
                setIsLocationDropdownOpen(false);
            }
            if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
                setIsPriceDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredSearchOptions = useMemo(() => {
        if (!searchLocation) return searchOptions;
        return searchOptions.filter((opt: string) => opt.toLowerCase().includes(searchLocation.toLowerCase()));
    }, [searchLocation, searchOptions]);

    return (
        <div className="bg-secondary border border-border-subtle rounded-2xl p-6 shadow-xl relative transition-colors duration-300">

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2 text-gold-600 dark:text-gold-400">
                    <SlidersHorizontal className="w-5 h-5" />
                    <h2 className="font-serif text-xl tracking-wide">Refine Search</h2>
                </div>
                {isDesktop && (
                    <button onClick={onClose} className="p-2 text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors" title="Minimize Filters">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <div className="space-y-8">

                {/* Location Filter */}
                <div className="relative" ref={locationFilterRef}>
                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Location / Name</label>
                    <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => {
                            setSearchLocation(e.target.value);
                            setIsLocationDropdownOpen(true);
                        }}
                        onFocus={() => setIsLocationDropdownOpen(true)}
                        placeholder="Location or Property Name..."
                        className="w-full bg-primary border border-border-strong rounded-lg p-3 text-sm text-text-main placeholder-text-muted outline-none focus:border-gold-500/50 transition-colors"
                    />
                    <AnimatePresence>
                        {isLocationDropdownOpen && filteredSearchOptions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute z-50 left-0 right-0 top-full mt-2 max-h-48 overflow-y-auto bg-primary border border-border-strong rounded-lg shadow-xl"
                            >
                                {filteredSearchOptions.map((opt: string) => (
                                    <button
                                        key={opt}
                                        onClick={() => {
                                            setSearchLocation(opt);
                                            setIsLocationDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 hover:text-gold-600 dark:hover:text-gold-400 transition-colors text-sm text-text-muted border-b border-border-subtle last:border-none"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Price Range Dropdown */}
                <div className="relative" ref={priceDropdownRef}>
                    <label className="block text-sm font-semibold text-text-main mb-3 uppercase tracking-wider">
                        Price Range
                    </label>

                    <button
                        type="button"
                        onClick={() => setIsPriceDropdownOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between bg-primary border border-border-strong rounded-lg p-3 text-sm text-text-main outline-none focus:border-gold-500/50 transition-colors"
                    >
                        <span className={priceCategory ? "text-text-main" : "text-text-muted"}>
                            {priceCategory || "Select Range"}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gold-500 transition-transform ${isPriceDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                        {isPriceDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute z-50 left-0 w-full top-full mt-2 bg-primary border border-border-strong rounded-lg shadow-xl overflow-hidden"
                            >
                                {priceOptions.map((opt) => (
                                    <button
                                        key={opt.label}
                                        onClick={() => {
                                            setPriceCategory(opt.label);
                                            setIsPriceDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm border-b border-border-subtle last:border-none ${priceCategory === opt.label ? "text-gold-600 dark:text-gold-400" : "text-text-muted hover:text-gold-600 dark:hover:text-gold-400"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Area Range (Cents to Acres) */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-2 uppercase tracking-wider flex justify-between">
                        <span>Plot Size</span>
                        <span className="text-gold-600 dark:text-gold-500 normal-case text-xs font-semibold">
                            {formatArea(minArea)} - {maxArea >= 500 ? "5+ Acres" : formatArea(maxArea)}
                        </span>
                    </label>

                    {/* Area Histogram */}
                    <div className="flex items-end justify-between h-12 gap-[2px] px-2 mb-2">
                        {/* Mock histogram data distribution */}
                        {[2, 5, 8, 12, 20, 35, 45, 60, 40, 25, 15, 10, 8, 5, 3, 2, 1, 1, 1, 2].map((height, i) => {
                            // Map the histogram bars (20 bars) to the area range (0-500)
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

                    <div className="px-2 mb-2">
                        <Slider
                            range
                            min={0}
                            max={500}
                            step={5}
                            value={[minArea, maxArea]}
                            onChange={(val: number | number[]) => {
                                if (Array.isArray(val)) {
                                    setMinArea(val[0]);
                                    setMaxArea(val[1]);
                                }
                            }}
                            styles={{
                                track: { backgroundColor: '#e5a12d', height: 4 },
                                rail: { backgroundColor: '#333', height: 4 },
                                handle: {
                                    borderColor: '#e5a12d',
                                    height: 16,
                                    width: 16,
                                    marginTop: -6,
                                    backgroundColor: '#fff',
                                    opacity: 1,
                                    boxShadow: '0 0 10px rgba(229,161,45,0.5)'
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Purpose */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-3 uppercase tracking-wider">Purpose</label>
                    <div className="space-y-3 mt-2">
                        {["Residential", "Commercial", "Agricultural"].map((purpose) => {
                            const checked = selectedPurpose.includes(purpose);
                            return (
                                <label key={purpose} className="flex items-center space-x-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${checked ? "bg-gold-500 border-gold-500" : "bg-transparent border-[#444] group-hover:border-gold-500/50"
                                        }`}>
                                        {checked && <Check className="w-3.5 h-3.5 text-black" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={checked}
                                        onChange={() => togglePurpose(purpose)}
                                    />
                                    <span className={`text-sm ${checked ? "text-text-main" : "text-text-muted group-hover:text-text-main"}`}>
                                        {purpose}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Road Access */}
                <div>
                    <label className="block text-sm font-semibold text-text-main mb-3 uppercase tracking-wider">Road Access</label>
                    <select
                        value={roadAccess}
                        onChange={(e) => setRoadAccess(e.target.value)}
                        className="w-full appearance-none bg-primary border border-border-strong text-sm text-text-muted p-3 pr-10 rounded-lg outline-none focus:border-gold-500/50 cursor-pointer transition-colors"
                    >
                        <option value="">Any Access</option>
                        <option value="highway">Highway Frontage</option>
                        <option value="tar">Tar Road Focus</option>
                        <option value="panchayat">Panchayat Road</option>
                    </select>
                </div>

            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle">
                <button
                    onClick={clearFilters}
                    className="w-full text-sm text-text-muted hover:text-gold-600 dark:hover:text-gold-400 uppercase tracking-widest font-semibold pb-1 border-b border-transparent hover:border-gold-400/50 transition-colors inline-block text-center"
                >
                    Clear All Filters
                </button>
            </div>

        </div>
    );
}
