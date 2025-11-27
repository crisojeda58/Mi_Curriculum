"use client";

import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightBackgroundProps {
  spotlightColor?: string;
  className?: string;
}

export function SpotlightBackground({
  spotlightColor = "14, 165, 233", // Default blue
  className,
}: SpotlightBackgroundProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const backgroundImage = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(${spotlightColor}, 0.10), transparent 80%)`;

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed inset-0 z-50 transition duration-300",
        className
      )}
      style={{
        backgroundImage,
      }}
    />
  );
}
