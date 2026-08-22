"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Guaranteed smooth 0 -> 100 progress count
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= 100) {
        setProgress(100);
        clearInterval(interval);
        // Brief hold at 100% before smooth fade exit
        setTimeout(() => {
          setIsVisible(false);
        }, 250);
      } else {
        setProgress(current);
      }
    }, 18); // ~1.8s total duration from 0% to 100%

    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      clearInterval(interval);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "unset";
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, y: -10 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0A0A0C] flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Lighting Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
            {/* Logo Container with Soft Gold Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-28 w-80 sm:h-36 sm:w-96 md:h-44 md:w-[480px] drop-shadow-[0_10px_25px_rgba(212,175,55,0.25)]"
            >
              <Image
                src="/images/logo.png"
                alt="DreamDen Logo"
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, 480px"
                className="object-contain filter brightness-110"
              />
            </motion.div>

            {/* Tagline & Decorative Divider */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mt-6 flex flex-col items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <span className="text-[#D4AF37] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em]">
                  Luxury Home Renovations & Remodeling
                </span>
                <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>
            </motion.div>

            {/* Premium Buffer Loader Animation (Dual Ring + Core Percentage) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 relative flex items-center justify-center"
            >
              {/* Outer Glowing Conic Buffer Spinner Ring */}
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-transparent border-t-[#D4AF37] border-r-[#D4AF37]/50 border-b-[#B8860B]/20 border-l-transparent shadow-[0_0_25px_rgba(212,175,55,0.35)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner Reverse Buffer Ring */}
              <motion.div
                className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-transparent border-b-[#F3E5AB] border-l-[#D4AF37]/70 shadow-[0_0_12px_rgba(243,229,171,0.4)]"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />

              {/* Pulsing Glow Core */}
              <motion.div
                className="absolute w-10 h-10 rounded-full bg-[#D4AF37]/10 filter blur-sm"
                animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Center Percentage Display */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[#D4AF37] font-mono text-sm sm:text-base font-bold tracking-tight drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* Buffer Status & Pulsing Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              {/* Linear Track under buffer */}
              <div className="relative w-48 sm:w-60 h-[2px] bg-white/10 rounded-full overflow-hidden mb-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              {/* Animated Buffer Dots Label */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-neutral-400">
                  Buffering Experience
                </span>
                <div className="flex gap-1 items-center">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
