"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mockProperties } from "@/lib/data/mockData";

export function ContactForm() {
  const [searchLocation, setSearchLocation] = useState("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const locationFilterRef = useRef(null);

  // Extract unique location names for autocomplete
  const locationOptions = useMemo(() => {
    const locs = mockProperties.map((p) => p.location.split(",")[0].trim());
    return Array.from(new Set(locs));
  }, []);

  const filteredLocationOptions = useMemo(() => {
    if (!searchLocation) return locationOptions;
    return locationOptions.filter((loc) =>
      loc.toLowerCase().includes(searchLocation.toLowerCase()),
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

  return (
    <form className="space-y-8">
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
          className="peer w-full bg-transparent border-b border-border-strong py-3 text-text-main focus:outline-none focus:border-gold-500 transition-colors z-10 relative bg-transparent"
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

      <div className="relative group pt-4">
        <textarea
          id="message"
          rows={4}
          placeholder=" "
          className="peer w-full bg-transparent border-b border-border-strong py-3 text-text-main focus:outline-none focus:border-gold-500 transition-colors resize-none"
          required
        ></textarea>
        <label
          htmlFor="message"
          className="absolute left-0 top-6 text-text-muted text-sm uppercase tracking-wider transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gold-500 peer-placeholder-shown:text-sm peer-placeholder-shown:top-6 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-main"
        >
          Your Message / Subject
        </label>
      </div>

      {/* Site Visit Checkbox */}
      <label className="flex items-start space-x-3 cursor-pointer group mt-6">
        <div className="mt-0.5 w-5 h-5 rounded border border-border-strong bg-transparent flex justify-center items-center group-hover:border-gold-500 relative">
          <input
            type="checkbox"
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
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className="text-sm text-text-muted group-hover:text-text-main transition-colors">
          I would like to schedule a site visit with an expert.
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="button"
        className="w-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-black font-bold uppercase tracking-widest py-5 px-6 rounded-lg transition-all shadow-[0_0_20px_rgba(229,161,45,0.2)] hover:shadow-[0_0_30px_rgba(229,161,45,0.4)] transform hover:-translate-y-0.5 mt-8 flex justify-center items-center space-x-2"
      >
        <span>Send Message</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
}
