"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function ProgressiveScrollIndicator() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionLabel, setActiveSectionLabel] = useState("");

  const homeSections = [
    { id: "hero", label: "Home" },
    { id: "before-after-experience", label: "Showcase" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Portfolio" },
    { id: "our-work-videos", label: "Reels" },
    { id: "why-dreamden", label: "Principles" },
    { id: "process", label: "Process" },
    { id: "testimonials", label: "Reviews" },
    { id: "estimate-calculator", label: "Calculator" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const percentage = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, percentage)));
      }

      if (pathname === "/") {
        const scrollPosition = window.scrollY + 280;
        let currentLabel = "Home";

        for (const section of homeSections) {
          const el = document.getElementById(section.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              currentLabel = section.label;
              break;
            }
          }
        }
        setActiveSectionLabel(currentLabel);
      } else {
        // Formatted page name for sub-routes
        const pageName = pathname.substring(1).replace(/-/g, " ");
        setActiveSectionLabel(pageName.charAt(0).toUpperCase() + pageName.slice(1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Fixed Reading Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-gold via-amber-400 to-gold transition-all duration-150 ease-out shadow-[0_0_8px_rgba(197,168,128,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Bottom-Left Progress Gauge & Active Section Badge */}
      <div 
        onClick={scrollToTop}
        title="Scroll to Top"
        className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-50 flex items-center gap-3 select-none cursor-pointer group"
      >
        {/* Circular Gauge */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gold/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <svg className="absolute w-full h-full -rotate-90 p-1" viewBox="0 0 60 60">
            {/* Background track */}
            <circle
              cx="30"
              cy="30"
              r="25"
              className="stroke-neutral-200/50 fill-none"
              strokeWidth="3.5"
            />
            {/* Progress fill */}
            <circle
              cx="30"
              cy="30"
              r="25"
              className="stroke-gold fill-none transition-all duration-150"
              strokeWidth="3.5"
              strokeDasharray="157"
              strokeDashoffset={157 - (157 * scrollProgress) / 100}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Inner Percentage & Back to Top Icon on Hover */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span className="text-[11px] font-extrabold text-gold font-sans group-hover:hidden transition-all">
              {Math.round(scrollProgress)}%
            </span>
            <ArrowUp className="w-4 h-4 text-gold hidden group-hover:block transition-all animate-bounce" />
          </div>
        </div>

        {/* Section Name Tooltip Badge */}
        {activeSectionLabel && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark/90 text-white backdrop-blur-md border border-white/10 shadow-lg text-[10px] font-bold uppercase tracking-widest transition-opacity duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>{activeSectionLabel}</span>
          </div>
        )}
      </div>
    </>
  );
}
