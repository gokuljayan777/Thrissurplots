"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  // Track mouse position relative to the card center (-1 to 1)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add smooth spring physics to the tracking
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map the relative mouse position to rotation angles (e.g. -7.5deg to 7.5deg)
  const rotateX = useTransform(mouseYSpring, [-1, 1], [7.5, -7.5]);
  const rotateY = useTransform(mouseXSpring, [-1, 1], [-7.5, 7.5]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    // Calculate the mouse position relative to the center of the card
    const width = rect.width;
    const height = rect.height;

    // Clamp variables between -1 and 1
    const mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
    const mouseY = ((e.clientY - rect.top) / height) * 2 - 1;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    // Reset to center
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`cursor-pointer ${className}`}
    >
      <div
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full"
      >
        {children}
      </div>


    </motion.div>
  );
}
