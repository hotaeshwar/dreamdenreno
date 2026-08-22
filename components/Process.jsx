"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollTypewriter from "./ScrollTypewriter";
import { 
  MessageSquare, 
  Compass, 
  CheckSquare, 
  HardHat, 
  Sparkles 
} from "lucide-react";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Consultation",
      desc: "Initial meeting at your property to align on project parameters, requirements, and budgets.",
      icon: MessageSquare
    },
    {
      num: "02",
      title: "Design & Planning",
      desc: "Drafting complete architectural plans, 3D renderings, and selecting premium finishes.",
      icon: Compass
    },
    {
      num: "03",
      title: "Estimate & Approval",
      desc: "Presenting a transparent, line-item itemized quote and securing municipal city permits.",
      icon: CheckSquare
    },
    {
      num: "04",
      title: "Construction",
      desc: "Demolition, rough-ins, inspections, structural details, and turnkey installation.",
      icon: HardHat
    },
    {
      num: "05",
      title: "Final Walkthrough",
      desc: "Detailed property cleanup and a full inspection review to ensure 100% satisfaction.",
      icon: Sparkles
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  // Automatically cycle through steps every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section id="process" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-3">Workflow Execution</span>
          <ScrollTypewriter 
            text="Our Building Process"
            className="text-dark font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-dark font-semibold text-base sm:text-lg leading-relaxed">
            We structure our operations around transparency and clear milestones, ensuring your build finishes on time and on budget.
          </p>
        </div>

        {/* Timeline Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative"
        >
          {/* Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-[43px] left-8 right-8 h-0.5 bg-neutral-100 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === activeIdx;

              return (
                <motion.div 
                  key={idx}
                  animate={{
                    scale: isActive ? 1.05 : 0.95,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 relative"
                >
                  {/* Step Bubble & Connectors */}
                  <div className="relative flex items-center justify-center">
                    {/* Vertical Connector Line for Mobile */}
                    {idx < steps.length - 1 && (
                      <div className="lg:hidden absolute top-16 bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-neutral-100 z-0" />
                    )}

                    {/* Radial Glow behind active bubble */}
                    {isActive && (
                      <div className="absolute w-24 h-24 bg-gold/15 rounded-full blur-xl pointer-events-none" />
                    )}
                    
                    {/* Bubble */}
                    <div className={`w-16 h-16 rounded-full border flex items-center justify-center relative z-10 transition-all duration-300 shadow-md ${
                      isActive ? "bg-gold border-gold" : "bg-bg-light border-neutral-100"
                    }`}>
                      <Icon className={`w-6 h-6 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-neutral-400"
                      }`} />
                      <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gold text-white text-[10px] font-bold flex items-center justify-center shadow">
                        {step.num}
                      </span>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="space-y-2 pt-2 max-w-xs">
                    <h3 className={`font-serif text-base font-bold transition-colors duration-200 ${
                      isActive ? "text-gold" : "text-dark"
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-neutral-700 text-xs sm:text-sm font-semibold leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
