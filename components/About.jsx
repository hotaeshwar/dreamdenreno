"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import ScrollTypewriter from "./ScrollTypewriter";

function AnimatedStat({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end)) {
      setCount(target);
      return;
    }

    const duration = 1200; // 1.2s total count duration
    const stepTime = Math.max(Math.floor(duration / end), 15);
    const increment = Math.ceil(end / 40); // larger steps for higher numbers

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, hasStarted]);

  return (
    <motion.span
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true, amount: 0.1 }}
    >
      {typeof count === "number" ? count.toLocaleString() : count}
      {suffix}
    </motion.span>
  );
}

export default function About() {
  const stats = [
    { target: "10", suffix: "+", label: "Years Experience" },
    { target: "100", suffix: "+", label: "Projects Completed" },
    { target: "100", suffix: "%", label: "Client Satisfaction" },
    { target: "Tarion", suffix: "", label: "Registered Builder" }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  };

  return (
    <section id="about" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Architectural Image Layout */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 group"
          >
            <Image
              src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80"
              alt="DreamDen Luxury Space Design"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            {/* Elegant overlay frame */}
            <div className="absolute inset-4 border border-white/25 rounded-xl pointer-events-none" />
          </motion.div>

          {/* Right Side: Content & Statistics */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="text-gold text-xs font-bold uppercase tracking-widest block">About DreamDen</span>
              <ScrollTypewriter 
                text="Spaces Designed for the Way You Live"
                className="text-dark font-serif text-3xl sm:text-4xl font-bold leading-tight"
              />
              <p className="text-dark font-semibold text-base sm:text-lg leading-relaxed">
                At DreamDen, we specialize in high-end residential upgrades, custom home builds, and code-registered basement suites across Ontario. We take pride in delivering state-of-the-art craftsmanship, transparent cost accounting, and architectural design-driven solutions.
              </p>
            </motion.div>

            {/* Specializations list */}
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {[
                "Complete home transformations",
                "Legal basement suites",
                "Architectural custom homes",
                "Premium cabinetry & finishes",
                "Transparent project tracking",
                "Certified Tarion Builder structural protection"
              ].map((item, idx) => (
                <motion.li 
                  key={idx} 
                  variants={itemVariants}
                  className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-neutral-600"
                >
                  <span className="w-5 h-5 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Stats Block - Glow Card Background */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-dark text-white border border-neutral-800 shadow-[0_0_50px_rgba(188,167,113,0.12)] overflow-hidden mt-8"
            >
              {/* Radial glow decoration */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
                {stats.map((stat, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="text-center sm:text-left"
                  >
                    <p className="font-serif text-2xl sm:text-3xl font-extrabold text-gold">
                      <AnimatedStat target={stat.target} suffix={stat.suffix} />
                    </p>
                    <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mt-1.5 leading-tight">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
