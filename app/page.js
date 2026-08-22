"use client";

import React from "react";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import HeroBeforeAfter from "@/components/HeroBeforeAfter";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import OurWorkVideos from "@/components/OurWorkVideos";
import WhyDreamDen from "@/components/WhyDreamDen";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import RenovationCalculator from "@/components/RenovationCalculator";
import Contact from "@/components/Contact";
import ProgressiveScrollIndicator from "@/components/ProgressiveScrollIndicator";

// Global Scroll Entrance Animation Wrapper
const ScrollSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }} // EaseOutCubic
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollSection>
        <HeroBeforeAfter />
      </ScrollSection>
      <ScrollSection>
        <About />
      </ScrollSection>
      <ScrollSection>
        <Services />
      </ScrollSection>
      <ScrollSection>
        <Projects />
      </ScrollSection>
      <ScrollSection>
        <OurWorkVideos />
      </ScrollSection>
      <ScrollSection>
        <WhyDreamDen />
      </ScrollSection>
      <ScrollSection>
        <Process />
      </ScrollSection>
      <ScrollSection>
        <Testimonials />
      </ScrollSection>
      <ScrollSection>
        <RenovationCalculator />
      </ScrollSection>
      <ScrollSection>
        <Contact />
      </ScrollSection>
    </>
  );
}
