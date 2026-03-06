"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/**
 * AnimatedNumber Component
 * Automatically parses numbers out of strings, animates them from 0,
 * and preserves the formatting (decimals, commas) as well as any 
 * prefix or suffix (e.g. "₹1.2L Cr+", "1,800+", "100%").
 *
 * @param {string|number} value - The text containing the number to animate
 * @param {number} duration - Animation duration in seconds (default: 2)
 * @param {boolean} once - If true, animates only once when scrolled into view (default: true)
 */
export default function AnimatedNumber({ value, duration = 2.5, once = true }) {
    const [displayValue, setDisplayValue] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    useEffect(() => {
        // 1. Parse the string to find prefix, number, and suffix
        const strValue = String(value);

        // Regex matches:
        // group 1: any non-digit prefix (lazy)
        // group 2: the number itself (digits, commas, decimals)
        // group 3: any non-digit suffix
        const match = strValue.match(/^([^\d]*)([\d.,]+)(.*)$/);

        if (!match) {
            // If no number found, just display the original string
            setDisplayValue(strValue);
            return;
        }

        const prefix = match[1] || "";
        const numStr = match[2];
        const suffix = match[3] || "";

        // 2. Figure out if we have decimals and how many
        const hasDecimal = numStr.includes(".");
        const decimalPlaces = hasDecimal ? numStr.split(".")[1].length : 0;

        // 3. Figure out if we use commas
        const hasCommas = numStr.includes(",");

        // 4. Parse the actual numeric target
        const targetNumber = parseFloat(numStr.replace(/,/g, ""));

        if (isNaN(targetNumber)) {
            setDisplayValue(strValue);
            return;
        }

        // Initialize to 0 before animation starts
        setDisplayValue(`${prefix}${0}${suffix}`);

        if (!isInView) return;

        let startTime = null;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            // Easing function (easeOutExpo for nice smooth settling)
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const currentNumber = easeOutExpo * targetNumber;

            // Format the current number
            let formattedNumber;
            if (hasDecimal) {
                formattedNumber = currentNumber.toFixed(decimalPlaces);
            } else {
                formattedNumber = Math.round(currentNumber).toString();
            }

            if (hasCommas) {
                // Add commas back (works for Indian numbering system by default 
                // using toLocaleString, or standard depending on locale)
                // A simple regex approach to add commas:
                const parts = formattedNumber.split(".");
                parts[0] = parseInt(parts[0], 10).toLocaleString("en-IN");
                formattedNumber = parts.join(".");
            }

            setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Ensure exact final value matches the original string
                setDisplayValue(strValue);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [isInView, value, duration]);

    return <span ref={ref}>{displayValue}</span>;
}
