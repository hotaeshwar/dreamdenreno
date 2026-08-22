import React from "react";
import Link from "next/link";
import Projects from "@/components/Projects";
import { ChevronRight, Home } from "lucide-react";

export const metadata = {
  title: "Our Work Showcase | DreamDen Before & After Portfolio",
  description: "Explore our real-world renovation projects across the GTA. Interact with before/after sliders to see custom kitchens, basements, and custom homes.",
};

export default function ProjectsPage() {
  return (
    <article className="min-h-screen bg-white font-sans text-dark pb-12">
      {/* Banner */}
      <div className="relative h-[250px] flex items-center justify-center bg-dark">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark-light to-dark" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gold" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4">
          <nav className="flex justify-center items-center gap-1.5 text-xs text-neutral-400 font-bold uppercase tracking-wider">
            <Link href="/" className="hover:text-gold flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-gold">Portfolio</span>
          </nav>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-white">
            Our Before & After Portfolio
          </h1>
        </div>
      </div>

      <Projects />
    </article>
  );
}
