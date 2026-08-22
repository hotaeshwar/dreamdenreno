"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import ScrollTypewriter from "./ScrollTypewriter";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: Left, 1: Right

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const pageFlipVariants = {
    enter: (dir) => ({
      rotateY: dir > 0 ? 180 : -180,
      opacity: 0,
      transformOrigin: "left center"
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      transformOrigin: "left center",
      transition: { 
        duration: 0.8, 
        ease: [0.645, 0.045, 0.355, 1.0]
      }
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -180 : 180,
      opacity: 0,
      transformOrigin: "left center",
      transition: { 
        duration: 0.8, 
        ease: [0.645, 0.045, 0.355, 1.0] 
      }
    })
  };

  const activeReview = testimonials[index];

  return (
    <section id="testimonials" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-3">Client Reviews</span>
          <ScrollTypewriter 
            text="What Homeowners Say"
            className="text-dark font-serif text-3xl sm:text-4xl font-bold"
          />
        </div>

        {/* Carousel Frame with 3D Perspective */}
        <div className="relative bg-bg-light rounded-2xl border border-gold/20 p-8 sm:p-12 md:p-16 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8 min-h-[380px] sm:min-h-[350px] [perspective:1200px]">
          {/* Large Quote Mark */}
          <div className="absolute top-8 left-8 text-gold/15 select-none pointer-events-none">
            <Quote className="w-24 h-24 stroke-[1.5]" />
          </div>

          <div className="flex-1 relative z-10 w-full [perspective:1200px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeReview.id}
                custom={direction}
                variants={pageFlipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="space-y-6 [transform-style:preserve-3d] backface-hidden w-full pb-16 sm:pb-0"
              >
                {/* Stars */}
                <div className="flex justify-center md:justify-start gap-1">
                  {[...Array(activeReview.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote Block */}
                <p className="text-dark font-serif text-base sm:text-lg md:text-xl font-semibold italic leading-relaxed text-center md:text-left min-h-[140px] md:min-h-[100px]">
                  "{activeReview.quote}"
                </p>

                {/* Author Details */}
                <div className="border-t border-neutral-200/80 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-dark font-bold text-sm tracking-wide">{activeReview.author}</p>
                    <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                      {activeReview.projectType} — {activeReview.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Static Controls (Stay solid during page flips) */}
            <div className="absolute bottom-0 right-0 sm:bottom-0 sm:right-0 flex gap-2 z-20">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-gold text-neutral-500 hover:text-dark hover:bg-gold-light/20 flex items-center justify-center transition-all cursor-pointer bg-white/40 backdrop-blur-sm"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-gold text-neutral-500 hover:text-dark hover:bg-gold-light/20 flex items-center justify-center transition-all cursor-pointer bg-white/40 backdrop-blur-sm"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
