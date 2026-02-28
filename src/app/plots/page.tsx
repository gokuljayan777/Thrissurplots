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
    if (priceStr.toLowerCase().includes('crore')) {
        return value * 10000000;
    } else if (priceStr.toLowerCase().includes('lakh')) {
        return value * 100000;
    }
    return value;
};

export default function PlotsPage() {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isDesktopFiltersOpen, setIsDesktopFiltersOpen] = useState(true);

    // Filter states
    const [searchLocation, setSearchLocation] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedPurpose, setSelectedPurpose] = useState<string[]>([]);
    const [plotSizeUnit, setPlotSizeUnit] = useState<"Cents" | "Acres">("Cents");
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
        setMinPrice("");
        setMaxPrice("");
        setSelectedPurpose([]);
        setPlotSizeUnit("Cents");
        setRoadAccess("");
    };

    // Extract unique location names for autocomplete
    const locationOptions = useMemo(() => {
        // Strip out the ", Thrissur" part for cleaner dropdowns, or keep entire strings
        const locs = mockProperties.map(p => p.location.split(',')[0].trim());
        return Array.from(new Set(locs));
    }, []);

    // Filter Logic
    const filteredProperties = useMemo(() => {
        // We duplicate mock properties just for demo grid filling if there's only 3
        let result = [...mockProperties, ...mockProperties.map(p => ({ ...p, id: `${p.id}-dup` }))];

        if (searchLocation) {
            const lowerSearch = searchLocation.toLowerCase();
            result = result.filter(p => p.location.toLowerCase().includes(lowerSearch) || p.title.toLowerCase().includes(lowerSearch));
        }

        if (selectedPurpose.length > 0) {
            result = result.filter(p => selectedPurpose.includes(p.type));
        }

        if (roadAccess) {
            result = result.filter(p => {
                const features = p.features.map(f => f.toLowerCase());
                if (roadAccess === "highway") return features.some(f => f.includes("highway"));
                if (roadAccess === "tar") return features.some(f => f.includes("tar"));
                if (roadAccess === "panchayat") return features.some(f => f.includes("panchayat"));
                return true;
            });
        }

        const minP = parseFloat(minPrice);
        const maxP = parseFloat(maxPrice);
        if (!isNaN(minP) || !isNaN(maxP)) {
            result = result.filter(p => {
                const priceVal = parsePrice(p.price);
                // Assume inputs are in Lakhs for simplicity if value < 1000, else exact
                // To keep it simple, let's treat input as pure numbers comparing directly if large, or multiply by 100000 if small
                const normalizedMin = (minP && minP < 1000) ? minP * 100000 : minP;
                const normalizedMax = (maxP && maxP < 1000) ? maxP * 100000 : maxP;

                if (!isNaN(minP) && priceVal < normalizedMin) return false;
                if (!isNaN(maxP) && priceVal > normalizedMax) return false;
                return true;
            });
        }

        // Sorting
        if (sortBy === "price-low") {
            result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (sortBy === "price-high") {
            result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        }

        return result;
    }, [searchLocation, selectedPurpose, roadAccess, minPrice, maxPrice, sortBy]);

    const activeSortLabel = sortOptions.find(o => o.value === sortBy)?.label || "Sort By";

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">

                {/* Top Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/5 pb-6">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 mb-4 sm:mb-0">
                        Land Listings
                    </h1>

                    <div className="flex items-center space-x-4 w-full sm:w-auto">

                        {/* Mobile Filters Toggle */}
                        <button
                            className="lg:hidden flex justify-center items-center space-x-2 bg-gradient-to-r hover:from-gold-600 hover:to-gold-500 bg-[#111] border border-[#333] hover:border-gold-500/50 hover:text-black transition-all px-4 py-2.5 rounded-lg text-sm w-full sm:w-auto"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="font-semibold uppercase tracking-wider">Filters</span>
                        </button>

                        {/* Desktop Filters Toggle (Visible only if desktop filters are hidden) */}
                        {!isDesktopFiltersOpen && (
                            <button
                                className="hidden lg:flex items-center space-x-2 bg-gradient-to-r hover:from-gold-600 hover:to-gold-500 bg-[#111] border border-[#333] hover:border-gold-500/50 hover:text-black transition-all px-4 py-2.5 rounded-lg text-sm"
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
                                className="w-full sm:w-56 flex items-center justify-between bg-[#111] border border-[#333] hover:border-gold-500/50 text-sm text-gray-300 px-4 py-2.5 rounded-lg transition-colors outline-none"
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
                                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${sortBy === option.value ? "bg-gold-500/10 text-gold-400" : "text-gray-400 hover:bg-[#111] hover:text-white"}`}
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
                                    locationOptions={locationOptions}
                                    minPrice={minPrice}
                                    setMinPrice={setMinPrice}
                                    maxPrice={maxPrice}
                                    setMaxPrice={setMaxPrice}
                                    roadAccess={roadAccess}
                                    setRoadAccess={setRoadAccess}
                                    selectedPurpose={selectedPurpose}
                                    togglePurpose={togglePurpose}
                                    plotSizeUnit={plotSizeUnit}
                                    setPlotSizeUnit={setPlotSizeUnit}
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
                                className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-[#0a0a0a] shadow-[10px_0_30px_rgba(0,0,0,0.8)] border-r border-[#222] p-6 overflow-y-auto lg:hidden"
                            >
                                <div className="flex justify-between items-center mb-8 border-b border-[#222] pb-6">
                                    <h2 className="text-xl font-serif text-gold-400">Filters</h2>
                                    <button onClick={() => setIsMobileFiltersOpen(false)} className="text-gray-400 hover:text-white p-2 hover:bg-[#111] rounded-full transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <FilterSidebarContent
                                    searchLocation={searchLocation}
                                    setSearchLocation={setSearchLocation}
                                    locationOptions={locationOptions}
                                    minPrice={minPrice}
                                    setMinPrice={setMinPrice}
                                    maxPrice={maxPrice}
                                    setMaxPrice={setMaxPrice}
                                    roadAccess={roadAccess}
                                    setRoadAccess={setRoadAccess}
                                    selectedPurpose={selectedPurpose}
                                    togglePurpose={togglePurpose}
                                    plotSizeUnit={plotSizeUnit}
                                    setPlotSizeUnit={setPlotSizeUnit}
                                    clearFilters={clearFilters}
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
                            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#111]/50 border border-white/5 rounded-2xl">
                                <Filter className="w-12 h-12 text-gray-600 mb-4" />
                                <h3 className="text-xl font-serif text-white mb-2">No properties found</h3>
                                <p className="text-gray-400 font-light max-w-md mb-6">We couldn't find any plots matching your current filter criteria. Try adjusting your filters to see more results.</p>
                                <button onClick={clearFilters} className="text-gold-500 hover:text-gold-400 uppercase tracking-widest font-semibold text-sm border-b border-gold-500 hover:border-gold-400 pb-1">
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Pagination Placeholder (only show if there are results) */}
                        {filteredProperties.length > 0 && (
                            <div className="mt-12 flex justify-center">
                                <div className="flex items-center space-x-2">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gold-600 font-semibold text-black">1</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#111] border border-[#333] text-gray-400 hover:border-gold-500 hover:text-white transition-colors">2</button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#111] border border-[#333] text-gray-400 hover:border-gold-500 hover:text-white transition-colors">3</button>
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
    searchLocation, setSearchLocation, locationOptions,
    minPrice, setMinPrice,
    maxPrice, setMaxPrice,
    roadAccess, setRoadAccess,
    selectedPurpose, togglePurpose,
    plotSizeUnit, setPlotSizeUnit,
    clearFilters,
    onClose,
    isDesktop
}: any) {
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const locationFilterRef = useRef<HTMLDivElement>(null);

    // Close location dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (locationFilterRef.current && !locationFilterRef.current.contains(event.target as Node)) {
                setIsLocationDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredLocationOptions = useMemo(() => {
        if (!searchLocation) return locationOptions;
        return locationOptions.filter((loc: string) => loc.toLowerCase().includes(searchLocation.toLowerCase()));
    }, [searchLocation, locationOptions]);

    return (
        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 shadow-xl relative">

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2 text-gold-400">
                    <SlidersHorizontal className="w-5 h-5" />
                    <h2 className="font-serif text-xl tracking-wide">Refine Search</h2>
                </div>
                {isDesktop && (
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-[#222] rounded-full transition-colors" title="Minimize Filters">
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
                        placeholder="Search area..."
                        className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-gold-500/50 transition-colors"
                    />
                    <AnimatePresence>
                        {isLocationDropdownOpen && filteredLocationOptions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute z-50 left-0 right-0 top-full mt-2 max-h-48 overflow-y-auto bg-[#0a0a0a] border border-[#333] rounded-lg shadow-xl"
                            >
                                {filteredLocationOptions.map((loc: string) => (
                                    <button
                                        key={loc}
                                        onClick={() => {
                                            setSearchLocation(loc);
                                            setIsLocationDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-[#1a1a1a] hover:text-gold-400 transition-colors text-sm text-gray-300 border-b border-[#222] last:border-none"
                                    >
                                        {loc}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider flex justify-between">
                        <span>Price Range</span>
                        <span className="text-gray-500 normal-case text-xs font-normal">(in Lakhs)</span>
                    </label>

                    <div className="mb-6 px-2 mt-4">
                        <Slider
                            range
                            min={0}
                            max={500}
                            step={10}
                            value={[
                                minPrice ? Number(minPrice) : 0,
                                maxPrice ? Number(maxPrice) : 500
                            ]}
                            onChange={(val: any) => {
                                setMinPrice(val[0].toString());
                                setMaxPrice(val[1].toString());
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

                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min ₹"
                            className="w-1/2 bg-[#0a0a0a] border border-[#333] rounded-lg p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-gold-500/50 transition-colors"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max ₹"
                            className="w-1/2 bg-[#0a0a0a] border border-[#333] rounded-lg p-3 text-sm text-white placeholder-gray-500 outline-none focus:border-gold-500/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Plot Size Unit Toggle */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Plot Size Focus</label>
                    <div className="flex p-1 bg-[#0a0a0a] rounded-lg border border-[#333]">
                        {["Cents", "Acres"].map((unit) => (
                            <button
                                key={unit}
                                onClick={() => setPlotSizeUnit(unit as any)}
                                className={`flex-1 text-xs py-2 rounded-md font-medium transition-colors ${plotSizeUnit === unit
                                    ? "bg-[#222] text-gold-400 shadow-sm border border-gold-500/20"
                                    : "text-gray-500 hover:text-gray-300"
                                    }`}
                            >
                                {unit}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Purpose */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Purpose</label>
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
                                    <span className={`text-sm ${checked ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}>
                                        {purpose}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Road Access */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Road Access</label>
                    <select
                        value={roadAccess}
                        onChange={(e) => setRoadAccess(e.target.value)}
                        className="w-full appearance-none bg-[#0a0a0a] border border-[#333] text-sm text-gray-400 p-3 pr-10 rounded-lg outline-none focus:border-gold-500/50 cursor-pointer"
                    >
                        <option value="">Any Access</option>
                        <option value="highway">Highway Frontage</option>
                        <option value="tar">Tar Road Focus</option>
                        <option value="panchayat">Panchayat Road</option>
                    </select>
                </div>

            </div>

            <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
                <button
                    onClick={clearFilters}
                    className="w-full text-sm text-gray-500 hover:text-gold-400 uppercase tracking-widest font-semibold pb-1 border-b border-transparent hover:border-gold-400/50 transition-colors inline-block text-center"
                >
                    Clear All Filters
                </button>
            </div>

        </div>
    );
}
