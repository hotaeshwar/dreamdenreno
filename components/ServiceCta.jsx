"use client";

import React, { useState, useMemo } from "react";
import { renovationPricing } from "@/data/renovationPricing";
import EstimateModal from "./EstimateModal";
import { ArrowRight, Sparkles } from "lucide-react";

// Mapping slug to pricing key helper
const slugToTypeMap = {
  "full-home-renovation": "full-home",
  "legal-basement-apartment": "legal-basement",
  "custom-homes": "custom-home",
  "kitchen-renovation": "kitchen",
  "bathroom-renovation": "bathroom",
  "basement-renovation": "basement",
  "home-addition": "addition",
  "interior-exterior-renovation": "other"
};

const formatNumber = (val) => {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ServiceCta({ serviceName, serviceSlug }) {
  const [isOpen, setIsOpen] = useState(false);

  const projectDetails = useMemo(() => {
    const typeKey = slugToTypeMap[serviceSlug] || "other";
    const typeConfig = renovationPricing.projectTypes[typeKey];
    
    // Pick average size defaults
    const sizeMap = {
      "full-home": 1500,
      "legal-basement": 800,
      "custom-home": 2500,
      "kitchen": 200,
      "bathroom": 100,
      "basement": 800,
      "addition": 500,
      "other": 500
    };
    
    const size = sizeMap[typeKey] || 1000;
    const base = typeConfig?.basePrice || 50000;
    const rate = typeConfig?.pricePerSqFt || 100;
    
    // Subtotal
    const sub = base + (rate * size);
    
    // Premium finish multiplier (1.6)
    const total = sub * 1.6;
    
    const low = Math.round((total * 0.92) / 1000) * 1000;
    const high = Math.round((total * 1.15) / 1000) * 1000;

    const sizeText = typeKey === "custom-home" ? "2,500 sq ft" : `${size} sq ft approx`;

    return {
      projectType: serviceName,
      projectSize: sizeText,
      finishLevel: "Premium",
      addons: ["Lighting", "Flooring", "Painting"],
      timeline: "Flexible",
      estimatedRange: `$${formatNumber(low)} – $${formatNumber(high)}`
    };
  }, [serviceName, serviceSlug]);

  return (
    <div className="bg-dark text-white rounded-2xl p-8 sm:p-12 border border-neutral-800 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Consultation Phase</span>
        </div>
        
        <h3 className="text-white font-serif text-2xl sm:text-3xl font-bold">
          Ready to Discuss Your {serviceName}?
        </h3>
        
        <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-semibold">
          Work with DreamDen's licensed project estimators to evaluate floor layouts, city bylaws, building codes, and material selections for your project.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="btn-part-away-dark w-full sm:w-auto bg-gold text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Detailed Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <a
            href="/#contact"
            className="btn-part-away-gold w-full sm:w-auto text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md border border-white/10 cursor-pointer"
          >
            <span>Send Quick Message</span>
          </a>
        </div>
      </div>

      <EstimateModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        projectData={projectDetails}
      />
    </div>
  );
}
