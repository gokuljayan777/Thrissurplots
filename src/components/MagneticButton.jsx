"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function MagneticButton({ children, strength = 40, className = "" }) {
  const ref = useRef(null);
  
  // Create motion values for x and y
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics to smooth the movement
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center (normalized -1 to 1)
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Map distance to a small movement range (magnetic strength)
    x.set(distanceX * (strength / (width / 2)));
    y.set(distanceY * (strength / (height / 2)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: mouseX,
        y: mouseY,
      }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
