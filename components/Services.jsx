"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Home, 
  FileText, 
  Hammer, 
  Layers, 
  Sparkles, 
  Layout, 
  Maximize, 
  Compass, 
  ArrowRight 
} from "lucide-react";
import { services } from "@/data/services";
import ScrollTypewriter from "./ScrollTypewriter";

const iconMap = {
  Home,
  FileText,
  Hammer,
  Layers,
  Sparkles,
  Layout,
  Maximize,
  Compass
};

export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  };

  return (
    <section id="services" className="py-24 bg-bg-light relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-3">Our Core Offerings</span>
          <ScrollTypewriter 
            text="Renovation Services Built Around You"
            className="text-dark font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          />
          <p className="text-dark font-semibold text-base sm:text-lg leading-relaxed">
            From complete home updates and legal basement suites to bespoke custom home building, we deliver unmatched quality across the GTA.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            return (
              <motion.div
                key={service.slug}
                variants={cardVariants}
                className="bg-white rounded-2xl border border-neutral-100/60 shadow-lg overflow-hidden group hover:border-gold/30 hover:shadow-[0_15px_35px_rgba(197,168,128,0.18)] transition-all duration-300 flex flex-col justify-between relative"
                whileHover={{ y: -8 }}
              >
                {/* Ambient gold glow on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(197,168,128,0.07),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div>
                  {/* Card Image Cover */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3 relative">
                    {/* Top gold Accent border */}
                    <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
                    
                    <h3 className="text-dark text-sm font-bold uppercase tracking-wider group-hover:text-gold transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-neutral-700 text-xs sm:text-sm font-semibold leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="px-5 pb-5 pt-2 border-t border-neutral-50">
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gold hover:text-gold-hover group/link"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
