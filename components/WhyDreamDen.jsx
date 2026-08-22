"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollTypewriter from "./ScrollTypewriter";
import { 
  ShieldCheck, 
  MessageSquareDiff, 
  ListTodo, 
  Paintbrush, 
  Briefcase, 
  Eye 
} from "lucide-react";

export default function WhyDreamDen() {
  const cards = [
    {
      title: "Quality Craftsmanship",
      desc: "We work with seasoned licensed carpenters, master plumbers, and ESA electricians to maintain precise standards.",
      icon: ShieldCheck
    },
    {
      title: "Transparent Communication",
      desc: "Weekly reports, scheduled site meetings, and continuous client touchpoints prevent guessing or delays.",
      icon: MessageSquareDiff
    },
    {
      title: "Detailed Planning",
      desc: "We map out scope, permits, schedules, and materials before breaking ground to avoid surprises.",
      icon: ListTodo
    },
    {
      title: "Design-Focused Approach",
      desc: "We integrate custom millwork, smart spatial layouts, and premium light plans to elevate aesthetics.",
      icon: Paintbrush
    },
    {
      title: "Professional Management",
      desc: "Our project managers coordinate labor logs, civic permits, and site cleaning routines end-to-end.",
      icon: Briefcase
    },
    {
      title: "Built Around Your Vision",
      desc: "We customize layouts and source unique materials specifically to fit your lifestyle requirements.",
      icon: Eye
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  // Automatically cycle through cards every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [cards.length]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="why-dreamden" className="py-24 bg-bg-light relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-3">Our Core Principles</span>
          <ScrollTypewriter 
            text="Why Homeowners Choose DreamDen"
            className="text-dark font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-dark font-semibold text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            We merge design sophistication with organized building management to deliver an exceptional homeowner experience.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isActive = idx === activeIdx;

            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isActive ? 1.04 : 0.96,
                  borderColor: isActive ? "rgba(188, 167, 113, 0.5)" : "rgba(229, 229, 229, 0.4)",
                  boxShadow: isActive ? "0px 12px 30px rgba(188, 167, 113, 0.18)" : "0px 4px 6px rgba(0, 0, 0, 0.01)"
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white p-6 rounded-2xl border relative overflow-hidden transition-colors duration-300"
              >
                {/* Gold Glow Radial Background */}
                {isActive && (
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
                )}

                {/* Thin Top Accent */}
                <div className={`absolute top-0 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive ? "w-full" : "w-0"}`} />
                
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${isActive ? "bg-gold text-white" : "bg-gold-light/20 text-gold"}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className={`font-serif text-lg font-bold transition-colors duration-200 ${isActive ? "text-gold" : "text-dark"}`}>
                    {card.title}
                  </h3>
                  <p className="text-neutral-700 text-xs sm:text-sm font-semibold leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
