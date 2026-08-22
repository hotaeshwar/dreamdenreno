"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, Info } from "lucide-react";
import EstimateForm from "./EstimateForm";

export default function EstimateModal({ isOpen, onClose, projectData }) {
  const modalRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden flex flex-col my-8"
          >
            {/* Header */}
            <div className="bg-neutral-50 border-b border-neutral-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-light/45 flex items-center justify-center text-gold">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-dark font-serif text-lg font-bold">Request Detailed Estimate</h3>
                  <p className="text-neutral-500 text-xs font-medium">Configure and send details directly to our builder team</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-200/50 hover:bg-neutral-200 text-neutral-500 hover:text-dark flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Scroll Area */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-180px)] space-y-6">
              {/* Project Setup Summary Banner */}
              <div className="bg-bg-light rounded-xl p-4 border border-neutral-200/60 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans text-dark">
                <div>
                  <p className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Project Type</p>
                  <p className="font-bold text-neutral-800 text-sm mt-0.5">{projectData.projectType}</p>
                </div>
                <div>
                  <p className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Estimated Size</p>
                  <p className="font-bold text-neutral-800 text-sm mt-0.5">{projectData.projectSize}</p>
                </div>
                <div>
                  <p className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Finish Standard</p>
                  <p className="font-bold text-neutral-800 text-sm mt-0.5">{projectData.finishLevel} Level</p>
                </div>
                <div className="col-span-2 md:col-span-3 pt-3 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">Preliminary Investment Range</p>
                    <p className="font-serif text-gold text-lg font-extrabold mt-0.5">{projectData.estimatedRange}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 max-w-xs leading-tight font-medium bg-white/70 px-3 py-1.5 rounded-lg border border-neutral-100">
                    <Info className="w-4 h-4 text-gold shrink-0" />
                    <span>Final pricing is determined by site parameters, design approvals, and materials.</span>
                  </div>
                </div>
              </div>

              {/* Estimate Request Form */}
              <EstimateForm
                projectData={projectData}
                onSuccess={() => {
                  setTimeout(() => {
                    onClose();
                  }, 1000);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
