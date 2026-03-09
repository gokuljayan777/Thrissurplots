"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const SliderContext = createContext();

export const ProgressSlider = ({
    children,
    duration = 5000,
    fastDuration = 400,
    activeSlider,
    className,
    vertical = false,
}) => {
    const [activeRef, setActiveRef] = useState(activeSlider);
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isFastForward, setIsFastForward] = useState(false);

    const contextValue = {
        activeRef,
        setActiveRef,
        progress,
        setProgress,
        isHovered,
        setIsHovered,
        isFastForward,
        setIsFastForward,
        duration,
        fastDuration,
        vertical,
    };

    return (
        <SliderContext.Provider value={contextValue}>
            <div className={`relative ${className}`}>{children}</div>
        </SliderContext.Provider>
    );
};

export const SliderBtnGroup = ({ children, className }) => {
    const {
        activeRef,
        setActiveRef,
        progress,
        setProgress,
        isHovered,
        setIsHovered,
        isFastForward,
        setIsFastForward,
        duration,
        fastDuration,
    } = useContext(SliderContext);

    const childrenArray = React.useMemo(() => React.Children.toArray(children), [children]);

    // Handle progress increment
    useEffect(() => {
        let interval;
        if (!isHovered && !isFastForward) {
            interval = setInterval(() => {
                setProgress((prev) => (prev >= 100 ? 100 : prev + 100 / (duration / 100)));
            }, 100);
        } else if (isFastForward) {
            interval = setInterval(() => {
                setProgress((prev) => (prev >= 100 ? 100 : prev + 100 / (fastDuration / 100)));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isHovered, isFastForward, duration, fastDuration, setProgress]);

    // Handle slide switching when progress hits 100%
    useEffect(() => {
        if (progress >= 100) {
            const timeout = setTimeout(() => {
                setProgress(0);
                setIsFastForward(false);

                const currentIndex = childrenArray.findIndex(
                    (child) => child.props.value === activeRef
                );

                if (currentIndex !== -1) {
                    const nextIndex = (currentIndex + 1) % childrenArray.length;
                    setActiveRef(childrenArray[nextIndex].props.value);
                }
            }, 150); // Small buffer to show 100% state
            return () => clearTimeout(timeout);
        }
    }, [progress, activeRef, childrenArray, setProgress, setActiveRef, setIsFastForward]);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={className}
        >
            {children}
        </div>
    );
};

export const SliderBtn = ({
    children,
    value,
    className,
    progressBarClass,
}) => {
    const {
        activeRef,
        setActiveRef,
        progress,
        setProgress,
        setIsFastForward,
        vertical,
    } = useContext(SliderContext);

    const isActive = activeRef === value;

    const handleClick = () => {
        if (!isActive) {
            setIsFastForward(true);
            setActiveRef(value);
            setProgress(0);
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`relative flex flex-col items-start justify-center transition-opacity duration-300 w-full ${isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                } ${className}`}
        >
            <div className={`absolute select-none pointer-events-none ${progressBarClass}`}>
                <motion.div
                    className="bg-gold-500 h-full w-full"
                    initial={
                        vertical ? { height: "0%" } : { width: "0%" }
                    }
                    animate={
                        isActive
                            ? vertical
                                ? { height: `${progress}%` }
                                : { width: `${progress}%` }
                            : vertical
                                ? { height: "0%" }
                                : { width: "0%" }
                    }
                    transition={{ duration: 0.1 }}
                />
            </div>
            <div className="relative z-10 w-full text-left">{children}</div>
        </button>
    );
};

export const SliderContent = ({ children, className }) => {
    return <div className={`relative overflow-hidden flex w-full h-full ${className}`}>{children}</div>;
};

export const SliderWrapper = ({ children, value, className }) => {
    const { activeRef } = useContext(SliderContext);

    return (
        <AnimatePresence mode="wait">
            {activeRef === value && (
                <motion.div
                    key={value}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`absolute inset-0 w-full h-full ${className}`}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
