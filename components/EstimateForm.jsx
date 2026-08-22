"use client";

import React, { useState } from "react";
import { useToast } from "./Toast";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, User, MapPin, Send, Loader2, ChevronRight, ArrowLeft, Check, Calculator } from "lucide-react";

export default function EstimateForm({ projectData, onSuccess }) {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contactMethod: "email",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToStep2 = () => {
    setStep(2);
    showToast("Calculator choices confirmed! Please enter your contact info.", "info");
  };

  const handleNextToStep3 = () => {
    if (validateStep2()) {
      setStep(3);
      showToast("Contact info saved. Almost done! Please enter project specifics.", "info");
    } else {
      showToast("Please correct the form errors before continuing.", "error");
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) {
      setStep(2);
      showToast("Please complete the required contact details.", "error");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      project_type: projectData.projectType,
      project_size: projectData.projectSize,
      finish_level: projectData.finishLevel,
      addons: projectData.addons.join(", "),
      timeline: projectData.timeline,
      estimated_range: projectData.estimatedRange,
      _subject: `New DreamDen Estimate Request - ${projectData.projectType}`,
      _template: "box",
      _captcha: "false"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@dreamden.ca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast("Estimate request sent! We will contact you shortly.", "success");
        if (onSuccess) onSuccess();
      } else {
        throw new Error(data.message || "Failed to submit request.");
      }
    } catch (error) {
      console.error(error);
      showToast("There was an error sending your request. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans text-dark space-y-6">
      
      {/* 3-Step Stepper Progress Bar */}
      <div className="flex items-center justify-between px-1 pb-3 border-b border-neutral-100">
        {/* Step 1 */}
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            step >= 1 ? "bg-gold text-white" : "bg-neutral-100 text-neutral-400"
          }`}>
            {step > 1 ? <Check className="w-4 h-4" /> : "1"}
          </div>
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
            step === 1 ? "text-gold" : "text-neutral-400 font-medium"
          }`}>
            Selection
          </span>
        </div>
        
        {/* Connection Line 1 */}
        <div className={`flex-grow h-[1px] mx-2 transition-colors duration-300 ${
          step >= 2 ? "bg-gold" : "bg-neutral-200"
        }`} />

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            step >= 2 ? "bg-gold text-white" : "bg-neutral-100 text-neutral-400"
          }`}>
            {step > 2 ? <Check className="w-4 h-4" /> : "2"}
          </div>
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
            step === 2 ? "text-gold" : "text-neutral-400 font-medium"
          }`}>
            Contact
          </span>
        </div>
        
        {/* Connection Line 2 */}
        <div className={`flex-grow h-[1px] mx-2 transition-colors duration-300 ${
          step >= 3 ? "bg-gold" : "bg-neutral-200"
        }`} />

        {/* Step 3 */}
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            step >= 3 ? "bg-gold text-white" : "bg-neutral-100 text-neutral-400"
          }`}>
            3
          </div>
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
            step === 3 ? "text-gold" : "text-neutral-400 font-medium"
          }`}>
            Details
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CALCULATOR SELECTIONS REVIEW */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <div className="bg-bg-light border border-neutral-200/50 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
                
                {/* Cost range header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60">
                  <div className="flex items-center gap-2 text-dark">
                    <Calculator className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">Calculated Summary</span>
                  </div>
                  <span className="text-gold font-serif text-base sm:text-lg font-bold">
                    {projectData.estimatedRange}
                  </span>
                </div>

                {/* Details layout */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
                  <div>
                    <span className="text-neutral-400 font-medium uppercase tracking-wider text-[10px]">Project Scope:</span>
                    <p className="text-neutral-800 font-bold mt-0.5">{projectData.projectType}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-medium uppercase tracking-wider text-[10px]">Finish Grade:</span>
                    <p className="text-neutral-800 font-bold mt-0.5">{projectData.finishLevel}</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-medium uppercase tracking-wider text-[10px]">Area Size:</span>
                    <p className="text-neutral-800 font-bold mt-0.5">{projectData.projectSize} SQ FT</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 font-medium uppercase tracking-wider text-[10px]">Timeline:</span>
                    <p className="text-neutral-800 font-bold mt-0.5">{projectData.timeline}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200/40">
                  <span className="text-neutral-400 font-medium uppercase tracking-wider text-[10px] block mb-1">Add-ons Selected:</span>
                  {projectData.addons && projectData.addons.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {projectData.addons.map((addon, i) => (
                        <span key={i} className="bg-white border border-neutral-200 text-neutral-600 font-bold text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-md">
                          {addon}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-neutral-500 italic text-[11px]">No extras selected</span>
                  )}
                </div>

              </div>

              {/* Confirm & Proceed Button */}
              <button
                type="button"
                onClick={handleNextToStep2}
                className="btn-part-away-dark w-full bg-gold text-white py-3 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md mt-4 cursor-pointer"
              >
                <span>Confirm & Enter Contact Info</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: CONTACT DETAILS */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              {/* Full Name */}
              <div>
                <label htmlFor="form-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    id="form-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={loading}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-rose-300 bg-rose-50/20 focus:ring-rose-200"
                        : "border-neutral-200 focus:border-gold focus:ring-gold-light/40"
                    }`}
                  />
                </div>
                {errors.name && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.name}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="form-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    id="form-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={loading}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-rose-300 bg-rose-50/20 focus:ring-rose-200"
                        : "border-neutral-200 focus:border-gold focus:ring-gold-light/40"
                    }`}
                  />
                </div>
                {errors.email && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="form-phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    id="form-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (416) 555-0148"
                    disabled={loading}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-rose-300 bg-rose-50/20 focus:ring-rose-200"
                        : "border-neutral-200 focus:border-gold focus:ring-gold-light/40"
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
              </div>

              {/* Navigation buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="sm:col-span-4 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 py-3 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextToStep3}
                  className="sm:col-span-8 btn-part-away-dark bg-gold text-white py-3 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Continue to Specifics</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PROPERTY DETAILS & SUBMIT */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              {/* Property Address */}
              <div>
                <label htmlFor="form-address" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Property Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    id="form-address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street Address, City, ON"
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold-light/40 transition-all"
                  />
                </div>
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4">
                  {["email", "phone", "text"].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={formData.contactMethod === method}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-4 h-4 text-gold focus:ring-gold-light accent-gold"
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="form-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Additional Details or Message
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us more about your project goals or specific requests..."
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold-light/40 transition-all resize-none"
                ></textarea>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="sm:col-span-4 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 py-3 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="sm:col-span-8 btn-part-away-dark bg-gold disabled:bg-neutral-300 text-white py-3 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Estimate Request</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </form>
    </div>
  );
}
