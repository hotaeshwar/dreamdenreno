"use client";

import React, { useState } from "react";
import { useToast } from "./Toast";
import { siteConfig } from "@/data/siteConfig";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import ScrollTypewriter from "./ScrollTypewriter";

export default function Contact() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "full-home-renovation",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const servicesList = [
    { value: "full-home-renovation", label: "Full Home Renovation" },
    { value: "legal-basement-apartment", label: "Legal Basement Apartment" },
    { value: "custom-homes", label: "Custom Home Build" },
    { value: "kitchen-renovation", label: "Kitchen Renovation" },
    { value: "bathroom-renovation", label: "Bathroom Renovation" },
    { value: "basement-renovation", label: "Basement Renovation" },
    { value: "home-addition", label: "Home Addition" },
    { value: "other", label: "Other Inquiry" }
  ];

  const validate = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fix the validation errors.", "error");
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      _subject: `New DreamDen Contact Inquiry - ${formData.service}`,
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
        showToast("Your inquiry has been successfully sent!", "success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "full-home-renovation",
          message: ""
        });
      } else {
        throw new Error(data.message || "Failed to submit request.");
      }
    } catch (error) {
      console.error(error);
      showToast("Could not send message. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg-light relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-gold text-xs font-bold uppercase tracking-widest block">Get In Touch</span>
              <ScrollTypewriter 
                text="Let's Build Something Exceptional"
                className="text-dark font-serif text-3xl sm:text-4xl font-bold leading-tight"
              />
              <p className="text-dark font-semibold text-base sm:text-lg leading-relaxed">
                Have a renovation project in mind? Tell us what you're planning, and our building team will help you coordinate design, budgeting, and zoning permits.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              {/* Address */}
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-gold shadow-md shrink-0 mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Office Location</h4>
                  <p className="text-dark text-sm font-semibold mt-1">{siteConfig.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-gold shadow-md shrink-0 mr-4">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Phone Direct</h4>
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-dark hover:text-gold text-sm font-semibold mt-1 inline-block transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-white border border-neutral-100 flex items-center justify-center text-gold shadow-md shrink-0 mr-4">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Email Enquiries</h4>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-dark hover:text-gold text-sm font-semibold mt-1 inline-block transition-colors break-all"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-100 shadow-xl p-6 sm:p-8">
            <h3 className="text-dark font-serif text-lg font-bold mb-6">Send An Inquiry</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-dark">
              
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  disabled={loading}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? "border-rose-300 bg-rose-50/20 focus:ring-rose-200"
                      : "border-neutral-200 focus:border-gold focus:ring-gold-light/40"
                  }`}
                />
                {errors.name && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.name}</p>}
              </div>

              {/* Grid for Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    disabled={loading}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-rose-300 bg-rose-50/20 focus:ring-rose-200"
                        : "border-neutral-200 focus:border-gold focus:ring-gold-light/40"
                    }`}
                  />
                  {errors.email && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (___) ___-____"
                    disabled={loading}
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-rose-300 bg-rose-50/20 focus:ring-rose-200"
                        : "border-neutral-200 focus:border-gold focus:ring-gold-light/40"
                    }`}
                  />
                  {errors.phone && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="contact-service" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Required Service
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold-light/40 bg-white"
                >
                  {servicesList.map((svc) => (
                    <option key={svc.value} value={svc.value}>
                      {svc.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="How can we assist you with your upcoming renovation project?"
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold-light/40 resize-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-part-away-dark w-full bg-gold disabled:bg-neutral-300 text-white py-3 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
