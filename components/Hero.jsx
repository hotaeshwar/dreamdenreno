"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

function TypewriterHeading() {
  const phrases = [
    "Transform Your Home.",
    "Elevate Your Lifestyle.",
    "Build Your DreamDen."
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      setText(phrases[index].substring(0, subIndex + (isDeleting ? -1 : 1)));
    }, isDeleting ? 30 : 65);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, index]);

  return (
    <span className="relative inline-block">
      <span className="text-white">{text}</span>
      <span className="w-1 sm:w-1.5 h-8 sm:h-10 md:h-12 lg:h-14 bg-gold ml-1.5 inline-block animate-pulse align-middle" />
    </span>
  );
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 2.1 // Starts right as splash screen completes exit
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="hero" className="relative h-[95vh] min-h-[650px] flex items-center justify-start overflow-hidden font-sans">
      {/* Background Image with smooth Ken Burns entrance effect synchronized with Splash Screen exit */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 2.0, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/hero/hero-bg.jpg"
            alt="DreamDen Luxury Home Renovation"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        {/* Architectural Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/45 to-transparent" />
      </div>

      {/* Hero Content Left Aligned */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-neutral-950/20 backdrop-blur-[2px] p-6 sm:p-10 md:p-12 rounded-3xl border border-white/5 space-y-6 sm:space-y-8"
          >
            {/* Elegant Top Line & Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="w-12 h-0.5 bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-widest">
                BUILDING BETTER SPACES
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-[1.2] text-white min-h-[96px] sm:min-h-[120px] md:min-h-[160px]"
            >
              <TypewriterHeading />
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              variants={itemVariants}
              className="text-neutral-200 text-sm sm:text-base md:text-lg font-semibold leading-relaxed max-w-xl"
            >
              Premium home renovations, legal basement apartments, and custom homes designed and built with precision across the GTA.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-2"
            >
              <Link
                href="#services"
                className="btn-part-away-gold text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg text-center cursor-pointer"
              >
                <span>Explore Our Services</span>
              </Link>
              <Link
                href="#estimate-calculator"
                className="btn-part-away-dark bg-gold text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Free Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Down Chevron Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Link href="#before-after-experience" aria-label="Scroll down">
          <ChevronDown className="w-6 h-6 text-neutral-400 hover:text-white transition-colors cursor-pointer" />
        </Link>
      </div>
    </section>
  );
}
