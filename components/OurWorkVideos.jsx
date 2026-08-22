"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import ScrollTypewriter from "./ScrollTypewriter";

// Inline Custom SVG for Instagram Brand Icon
const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <defs>
      <linearGradient id="reels-insta-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#reels-insta-gradient)"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#reels-insta-gradient)"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#reels-insta-gradient)"/>
  </svg>
);

export default function OurWorkVideos() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videoReels = [
    {
      id: "wall-completed",
      title: "Accent Wall Craftsmanship",
      desc: "Custom carpentry and feature wall installation",
      src: "/videos/wall-completed.mp4"
    },
    {
      id: "home-transformation",
      title: "Luxury GTA Remodel Walkthrough",
      desc: "Full interior spatial transformation review",
      src: "/videos/home-transformation.mp4"
    },
    {
      id: "stoney-creek",
      title: "Stoney Creek Custom Build",
      desc: "Architectural custom home frame and framing details",
      src: "/videos/stoney-creek.mp4"
    },
    {
      id: "legal-basement",
      title: "Legal Basement Suite Buildout",
      desc: "Turnkey basement apartment construction",
      src: "/videos/legal-basement.mp4"
    }
  ];

  return (
    <section id="our-work-videos" className="py-24 bg-bg-light relative overflow-hidden font-sans border-t border-neutral-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-3">Reels Showroom</span>
          <ScrollTypewriter 
            text="Our Work In Action"
            className="text-dark font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-dark font-semibold text-base sm:text-lg leading-relaxed">
            Take a look behind the scenes of our ongoing construction and recently completed custom remodels.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoReels.map((reel) => (
            <motion.div
              key={reel.id}
              onClick={() => setActiveVideo(reel)}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-2xl border border-gold/20 shadow-lg overflow-hidden group cursor-pointer aspect-[9/16] w-full relative bg-neutral-900"
            >
              {/* Video Preview Container */}
              <video
                src={reel.src}
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover pointer-events-none"
              />
              
              {/* Soft vignette overlay on hover */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Slim Instagram CTA Link */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/dreamdendevelopments?igsh=MTZ2NmVrajczY2RzNw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-300 hover:border-[#dc2743] hover:bg-[#dc2743]/5 text-neutral-600 hover:text-[#dc2743] text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer group"
          >
            <Instagram className="w-5 h-5 group-hover:scale-110 transition-all" />
            <span>View More of Our Work</span>
          </a>
        </div>

        {/* 3D Modal Overlay */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="fixed inset-0 bg-dark/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            >
              {/* Modal Card content */}
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-w-sm w-full aspect-[9/16] flex flex-col justify-between"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-white hover:text-dark transition-all cursor-pointer shadow"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Video Tag (Full controls and audio) */}
                <video
                  src={activeVideo.src}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
