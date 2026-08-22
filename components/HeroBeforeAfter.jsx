"use client";

import React from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { motion } from "framer-motion";
import ScrollTypewriter from "./ScrollTypewriter";

export default function HeroBeforeAfter() {
  return (
    <section id="before-after-experience" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-3">Interactive Showcase</span>
          <ScrollTypewriter 
            text="See the DreamDen Difference"
            className="text-dark font-serif text-3xl sm:text-4xl font-bold mb-4 text-center"
          />
          <p className="text-dark font-semibold text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Transforming dated spaces into luxury open-concept living. Discover master-crafted home renovations, custom kitchen remodels, and premium interior redesigns.
          </p>
        </div>

        {/* Slider Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <BeforeAfterSlider
            beforeImage="/images/hero/hero-before.jpg"
            afterImage="/images/hero/hero-after.jpg"
            beforeLabel="Dated Original Layout"
            afterLabel="Canadian Luxury Open Concept"
          />
        </motion.div>

      </div>
    </section>
  );
}
