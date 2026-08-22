"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import ScrollTypewriter from "./ScrollTypewriter";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Projects" },
    { id: "full-home", label: "Full Home" },
    { id: "basement", label: "Basements" },
    { id: "kitchen", label: "Kitchens" },
    { id: "bathroom", label: "Bathrooms" },
    { id: "custom-home", label: "Custom Homes" },
    { id: "commercial", label: "Commercial" }
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-3">Portfolio Showroom</span>
          <ScrollTypewriter 
            text="From Dated to Dream"
            className="text-dark font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-dark font-semibold text-base sm:text-lg leading-relaxed">
            Explore our featured project showroom displaying our completed high-end residential and commercial builds.
          </p>
        </div>

        {/* Sliding Tab Filter Buttons */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex flex-wrap justify-center bg-bg-light border border-neutral-200/50 p-1.5 rounded-full shadow-sm max-w-full overflow-x-auto gap-1">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer outline-none shrink-0 ${
                    isActive ? "text-white" : "text-neutral-600 hover:text-dark"
                  }`}
                >
                  <span className="relative z-10">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-gold rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid with Animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Embedded Auto-Scanning Sweep Slider */}
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  beforeLabel={project.beforeLabel}
                  afterLabel={project.afterLabel}
                />

                {/* Project Context */}
                <div className="px-1 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="text-dark font-serif text-lg font-bold">{project.title}</h3>
                    <p className="text-neutral-700 text-xs sm:text-sm font-semibold leading-relaxed max-w-md">
                      {project.description}
                    </p>
                  </div>
                  {/* Location label removed */}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
