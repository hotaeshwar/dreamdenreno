"use client";

import React, { useState, useEffect, useMemo } from "react";
import { renovationPricing } from "@/data/renovationPricing";
import EstimateModal from "./EstimateModal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  FileText, 
  Hammer, 
  Layers, 
  Sparkles, 
  Layout, 
  Maximize, 
  Compass, 
  Check, 
  ArrowRight,
  TrendingUp,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import ScrollTypewriter from "./ScrollTypewriter";

const iconMap = {
  "full-home": Home,
  "legal-basement": FileText,
  "custom-home": Hammer,
  "kitchen": Layers,
  "bathroom": Sparkles,
  "basement": Layout,
  "addition": Maximize,
  "commercial-bar": Compass,
  "other": Compass
};

const formatNumber = (val) => {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Counting animation helper component
function AnimatedPrice({ value }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = displayValue;
    const endValue = value;
    const duration = 350; // Milliseconds

    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * (endValue - startValue) + startValue);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>${formatNumber(displayValue)}</span>;
}

export default function RenovationCalculator() {
  const [calcStep, setCalcStep] = useState(1);
  const [projectType, setProjectType] = useState("full-home");
  const [sizeId, setSizeId] = useState("1000-2000");
  const [customSqFt, setCustomSqFt] = useState(2500); // Default for custom home
  const [finishLevel, setFinishLevel] = useState("premium");
  const [selectedAddons, setSelectedAddons] = useState(["cabinets", "flooring", "lighting", "painting"]);
  const [timeline, setTimeline] = useState("1-3-months");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset/Adjust size selections based on project type
  useEffect(() => {
    if (projectType === "custom-home") {
      setCustomSqFt(2500);
    } else {
      // Default standard size based on project type average
      const defaults = {
        "kitchen": "under-500",
        "bathroom": "under-500",
        "basement": "500-1000",
        "addition": "500-1000",
        "legal-basement": "500-1000",
        "commercial-bar": "1000-2000"
      };
      setSizeId(defaults[projectType] || "1000-2000");
    }
  }, [projectType]);

  // Calculate Square Footage
  const activeSqFt = useMemo(() => {
    if (projectType === "custom-home") {
      return Number(customSqFt) || 1500;
    }
    const selectedSize = renovationPricing.sizes.find(s => s.id === sizeId);
    return selectedSize ? selectedSize.avgValue : 1000;
  }, [projectType, sizeId, customSqFt]);

  // Pricing calculations
  const totals = useMemo(() => {
    const typeConfig = renovationPricing.projectTypes[projectType];
    const finishConfig = renovationPricing.finishLevels[finishLevel];
    
    if (!typeConfig || !finishConfig) return { min: 0, max: 0 };

    // Calculate base sqft price
    const subtotal = typeConfig.basePrice + (typeConfig.pricePerSqFt * activeSqFt);
    
    // Apply finish multiplier
    let finalBase = subtotal * finishConfig.multiplier;

    // Sum up add-ons
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = renovationPricing.addons[addonId];
      return sum + (addon ? addon.price : 0);
    }, 0);

    let total = finalBase + addonsTotal;

    // Enforce base minimum price limit
    if (total < typeConfig.minPrice) {
      total = typeConfig.minPrice;
    }

    // Apply ranges
    const low = Math.round((total * 0.92) / 1000) * 1000;
    const high = Math.round((total * 1.15) / 1000) * 1000;

    return { min: low, max: high };
  }, [projectType, activeSqFt, finishLevel, selectedAddons]);

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(a => a !== addonId) : [...prev, addonId]
    );
  };

  const selectedProjectDetails = useMemo(() => {
    const typeName = renovationPricing.projectTypes[projectType]?.name || projectType;
    const sizeLabel = projectType === "custom-home" 
      ? `${activeSqFt} sq ft`
      : renovationPricing.sizes.find(s => s.id === sizeId)?.label || sizeId;
    const finishLabel = renovationPricing.finishLevels[finishLevel]?.name || finishLevel;
    const addOnList = selectedAddons.map(id => renovationPricing.addons[id]?.name).filter(Boolean);
    const timelineLabel = renovationPricing.timelines.find(t => t.id === timeline)?.label || timeline;

    return {
      projectType: typeName,
      projectSize: sizeLabel,
      finishLevel: finishLabel,
      addons: addOnList,
      timeline: timelineLabel,
      estimatedRange: `$${formatNumber(totals.min)} – $${formatNumber(totals.max)}`
    };
  }, [projectType, sizeId, activeSqFt, finishLevel, selectedAddons, timeline, totals]);

  // Stepper helper navigations
  const handlePrev = () => setCalcStep(prev => Math.max(prev - 1, 1));
  const handleNext = () => setCalcStep(prev => Math.min(prev + 1, 5));

  const stepsList = [
    { num: 1, label: "Scope" },
    { num: 2, label: "Size" },
    { num: 3, label: "Grade" },
    { num: 4, label: "Extras" },
    { num: 5, label: "Timeline" }
  ];

  return (
    <section id="estimate-calculator" className="py-24 bg-bg-light relative overflow-hidden font-sans">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-3">Instant Pricing Estimator</span>
          <ScrollTypewriter 
            text="What's Your Renovation Vision?"
            className="text-dark font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-dark font-semibold text-base sm:text-lg leading-relaxed">
            Tell us what you're planning and get an instant preliminary investment estimate designed around your selections.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Multi-step Form Selections */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-100 shadow-xl p-6 sm:p-8 flex flex-col min-h-[460px]">
            
            {/* Step Selector Horizontal Bar */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-5 mb-8 overflow-x-auto gap-2">
              {[
                { num: "01", label: "Scope" },
                { num: "02", label: "Area Size" },
                { num: "03", label: "Finish Grade" },
                { num: "04", label: "Add-ons" },
                { num: "05", label: "Timeline" }
              ].map((step, idx) => {
                const stepNum = idx + 1;
                const isActive = calcStep === stepNum;
                const isCompleted = calcStep > stepNum;

                return (
                  <button
                    key={stepNum}
                    onClick={() => setCalcStep(stepNum)}
                    className="flex items-center gap-2 outline-none group cursor-pointer shrink-0"
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive ? "bg-gold text-white shadow-md scale-105" : isCompleted ? "bg-gold-light text-gold" : "bg-neutral-100 text-neutral-400"
                    }`}>
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.num}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden md:inline transition-colors ${
                      isActive ? "text-gold" : "text-neutral-400 font-medium"
                    }`}>
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Stepper Selection Content */}
            <div className="flex-grow flex flex-col justify-between">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: PROJECT TYPE */}
                {calcStep === 1 && (
                  <motion.div
                    key="step-type"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-dark font-serif text-lg font-bold mb-1">Select Project Type</h3>
                      <p className="text-neutral-600 text-xs font-semibold">What type of project are we looking to construct?</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(renovationPricing.projectTypes).map(([key, value]) => {
                        const IconComponent = iconMap[key] || Home;
                        const isSelected = projectType === key;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setProjectType(key);
                              setTimeout(() => handleNext(), 150); // Auto-advance
                            }}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer group ${
                              isSelected
                                ? "border-gold bg-gold-light/10 text-gold shadow-md shadow-gold/5"
                                : "border-neutral-100 hover:border-gold/45 text-neutral-600 hover:text-dark hover:bg-bg-light/40"
                            }`}
                          >
                            <IconComponent className={`w-6 h-6 mb-2.5 transition-transform duration-300 group-hover:scale-110 ${
                              isSelected ? "text-gold" : "text-neutral-400 group-hover:text-gold"
                            }`} />
                            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-tight">{value.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SIZE */}
                {calcStep === 2 && (
                  <motion.div
                    key="step-size"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-dark font-serif text-lg font-bold mb-1">Approximate Area Size</h3>
                      <p className="text-neutral-400 text-xs font-light">What is the approximate size of the project footprint?</p>
                    </div>

                    {projectType === "custom-home" ? (
                      <div className="bg-bg-light/60 p-6 rounded-xl border border-neutral-200/50 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wide">Enter Custom Area (sq ft)</span>
                          <div className="flex items-center">
                            <input
                              type="number"
                              min="1500"
                              max="10000"
                              value={customSqFt}
                              onChange={(e) => {
                                const val = Math.max(1000, Math.min(15000, Number(e.target.value)));
                                setCustomSqFt(val);
                              }}
                              className="w-24 px-3 py-1 bg-white border border-neutral-300 rounded-lg text-right font-bold text-dark text-sm focus:outline-none focus:border-gold"
                            />
                            <span className="ml-1.5 text-xs text-neutral-400 font-semibold">sq ft</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="1500"
                          max="10000"
                          step="100"
                          value={customSqFt}
                          onChange={(e) => setCustomSqFt(Number(e.target.value))}
                          className="w-full accent-gold cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase">
                          <span>1,500 sq ft</span>
                          <span>5,000 sq ft</span>
                          <span>10,000 sq ft</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2.5">
                        {renovationPricing.sizes.map((size) => {
                          const isSelected = sizeId === size.id;
                          return (
                            <button
                              key={size.id}
                              onClick={() => {
                                setSizeId(size.id);
                                setTimeout(() => handleNext(), 150); // Auto-advance
                              }}
                              className={`px-5 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-gold border-gold text-white shadow-md shadow-gold/20"
                                  : "border-neutral-200 hover:border-gold text-neutral-600 hover:text-dark"
                              }`}
                            >
                              {size.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 3: FINISH STANDARD */}
                {calcStep === 3 && (
                  <motion.div
                    key="step-finish"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-dark font-serif text-lg font-bold mb-1">Select Finish Standard</h3>
                      <p className="text-neutral-400 text-xs font-light">Choose the materials and build standard grades you want.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(renovationPricing.finishLevels).map(([key, value]) => {
                        const isSelected = finishLevel === key;
                        return (
                          <button
                            key={key}
                            onClick={() => {
                              setFinishLevel(key);
                              setTimeout(() => handleNext(), 150); // Auto-advance
                            }}
                            className={`text-left p-5 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                              isSelected
                                ? "border-gold bg-gold-light/10 shadow-md"
                                : "border-neutral-100 hover:border-gold/30 hover:bg-bg-light/30"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-dark">{value.name}</span>
                              {isSelected && (
                                <span className="w-5 h-5 rounded-full bg-gold text-white flex items-center justify-center">
                                  <Check className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </div>
                            <p className="text-neutral-500 text-xs font-light leading-relaxed mb-4">{value.description}</p>
                            <span className="text-gold text-[10px] font-bold uppercase tracking-widest">Multiplier: x{value.multiplier}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: ADDITIONAL REQUIREMENTS */}
                {calcStep === 4 && (
                  <motion.div
                    key="step-addons"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-dark font-serif text-lg font-bold mb-1">Additional Requirements</h3>
                      <p className="text-neutral-400 text-xs font-light">Select any structural or utility add-ons needed.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(renovationPricing.addons).map(([key, value]) => {
                        const isSelected = selectedAddons.includes(key);
                        return (
                          <button
                            key={key}
                            onClick={() => toggleAddon(key)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "border-gold bg-gold-light/5 text-dark"
                                : "border-neutral-100 hover:border-gold/30 text-neutral-600 hover:text-dark hover:bg-bg-light/30"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all shrink-0 ${
                              isSelected ? "bg-gold border-gold text-white" : "border-neutral-300 bg-white"
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider">{value.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: DESIRED TIMELINE */}
                {calcStep === 5 && (
                  <motion.div
                    key="step-timeline"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-dark font-serif text-lg font-bold mb-1">Desired Timeline</h3>
                      <p className="text-neutral-400 text-xs font-light">When are you hoping to begin or finish construction?</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {renovationPricing.timelines.map((time) => {
                        const isSelected = timeline === time.id;
                        return (
                          <button
                            key={time.id}
                            onClick={() => setTimeline(time.id)}
                            className={`px-5 py-3 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              isSelected
                                ? "bg-gold border-gold text-white shadow-md shadow-gold/20"
                                : "border-neutral-200 hover:border-gold text-neutral-600 hover:text-dark"
                            }`}
                          >
                            {time.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between border-t border-neutral-100 pt-6 mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={calcStep === 1}
                className="px-4 py-2 border border-neutral-200 rounded-lg text-xs font-bold uppercase tracking-wide text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={calcStep === 5}
                className="px-4 py-2 bg-gold hover:bg-gold-hover text-white rounded-lg text-xs font-bold uppercase tracking-wide disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Sticky Live Results */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-dark text-white rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-8 relative">
              {/* Gold Ambient Accent */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

              <div className="border-b border-neutral-800 pb-5 mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-gold text-xs font-bold uppercase tracking-widest">Investment Estimate</h3>
                  <p className="text-neutral-400 text-xs mt-0.5">Real-time preliminary cost range</p>
                </div>
                <TrendingUp className="w-5 h-5 text-gold" />
              </div>

              {/* Price Ranges */}
              <div className="space-y-1 mb-8">
                <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider">Estimated Investment</p>
                <div className="text-2xl sm:text-3xl font-serif text-white font-black flex items-center flex-wrap gap-x-2">
                  <AnimatedPrice value={totals.min} />
                  <span className="text-neutral-600 font-light font-sans text-xl">—</span>
                  <AnimatedPrice value={totals.max} />
                </div>
                <p className="text-neutral-400 text-[10px] font-light leading-relaxed pt-2 border-t border-neutral-900 mt-2">
                  *Preliminary Estimate. Final quotes depend on structural specifications, site assessments, material selections, and municipal approvals.
                </p>
              </div>

              {/* Selected Options Summary */}
              <div className="border-t border-neutral-800 pt-5 space-y-3.5 mb-8">
                <h4 className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider">Project Specifications</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-medium">Project:</span>
                    <span className="text-neutral-200 font-bold uppercase tracking-wider text-[10px] text-right">{selectedProjectDetails.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-medium">Area Scope:</span>
                    <span className="text-neutral-200 font-bold text-right">{selectedProjectDetails.projectSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-medium">Finish Grade:</span>
                    <span className="text-neutral-200 font-bold text-right">{selectedProjectDetails.finishLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-medium">Add-ons:</span>
                    <span className="text-neutral-200 font-bold text-right max-w-[150px] truncate">{selectedAddons.length} selected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-medium">Timeline:</span>
                    <span className="text-neutral-200 font-bold text-right">{selectedProjectDetails.timeline}</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-part-away-dark w-full bg-gold text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md flex items-center justify-center gap-2 border border-transparent cursor-pointer"
              >
                <span>Request My Detailed Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Small note */}
            <div className="bg-white rounded-xl border border-neutral-100 p-4 shadow-sm text-xs font-medium text-neutral-500 leading-normal flex items-start gap-3">
              <span className="text-gold mt-0.5">ℹ</span>
              <span>Our estimates are formulated from historical GTA construction index files and local labor/material schedules.</span>
            </div>
          </div>

        </div>
      </div>

      {/* Linked Request Form Modal */}
      <EstimateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectData={selectedProjectDetails}
      />
    </section>
  );
}
