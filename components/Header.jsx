"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy Viewport Section Observer
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/services")) {
        setActiveSection("/#services");
      } else {
        setActiveSection(pathname);
      }
      return;
    }

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 220; // sticky header buffer offset

      const homeSections = [
        { id: "about", href: "/about" },
        { id: "services", href: "/#services" },
        { id: "projects", href: "/projects" },
        { id: "estimate-calculator", href: "/#estimate-calculator" },
        { id: "contact", href: "/contact" }
      ];

      let matched = "";
      for (const section of homeSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            matched = section.href;
            break;
          }
        }
      }

      // Hide pill when on top folds
      if (window.scrollY < 350) {
        setActiveSection("");
      } else {
        setActiveSection(matched);
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  // Close menus on page change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const navItems = siteConfig.navigation;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white/95 backdrop-blur-md shadow-[0_4px_30px_rgba(197,168,128,0.08)] border-b border-gold/20"
            : "py-5 bg-white border-b border-gold/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="relative block h-14 w-48 sm:h-18 sm:w-60 transition-all duration-300">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.companyName}
                  fill
                  sizes="(max-width: 768px) 192px, 240px"
                  style={{ objectFit: "contain", objectPosition: "left" }}
                  priority
                  className="transition-all duration-300"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Tabslide Pill Style */}
            <nav className="hidden lg:flex items-center bg-bg-light/60 border border-neutral-200/40 p-1 rounded-full font-sans relative z-10">
              {navItems.map((item) => {
                const isServicesActive = item.label === "Services" && activeSection === "/#services";
                const isNormalActive = item.href === activeSection;
                const isActive = isServicesActive || isNormalActive;

                if (item.children) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-full transition-colors flex items-center relative cursor-pointer outline-none ${
                          isActive ? "text-white" : "text-dark hover:text-gold"
                        }`}
                      >
                        <span className="relative z-10 flex items-center">
                          {item.label}
                          <ChevronDown className={`ml-1 w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="activeHeaderPill"
                            className="absolute inset-0 bg-gold rounded-full -z-10 shadow-sm"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>

                      {/* Dropdown Mega Menu */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 mt-3 w-80 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden py-2 z-20"
                          >
                            <div className="grid grid-cols-1 divide-y divide-neutral-50">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="px-5 py-3 text-xs font-semibold text-dark hover:text-gold hover:bg-bg-light transition-all flex items-center justify-between"
                                >
                                  {child.label}
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-0 hover:opacity-100 transition-opacity"></span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-full transition-colors relative block cursor-pointer outline-none ${
                      isActive ? "text-white" : "text-dark hover:text-gold"
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeHeaderPill"
                        className="absolute inset-0 bg-gold rounded-full -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Button & Contact */}
            <div className="hidden lg:flex items-center space-x-6">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center text-sm font-semibold text-dark hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 mr-2 text-gold" />
                <span>{siteConfig.phone}</span>
              </a>
              <Link
                href="/#estimate-calculator"
                className="btn-part-away-dark bg-gold text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
              >
                <span>Get Free Estimate</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex flex-col justify-center items-center group focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                <div className="space-y-1.5 w-6">
                  <span
                    className={`block h-0.5 w-6 bg-dark group-hover:bg-gold transition-all duration-300 transform origin-center ${
                      isOpen ? "rotate-45 translate-y-[8px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-dark group-hover:bg-gold transition-all duration-300 ${
                      isOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-dark group-hover:bg-gold transition-all duration-300 transform origin-center ${
                      isOpen ? "-rotate-45 -translate-y-[8px]" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-neutral-100 shadow-lg overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {navItems.map((item) => {
                  if (item.children) {
                    return (
                      <MobileAccordion key={item.label} item={item} />
                    );
                  }

                  const isServicesActive = item.label === "Services" && activeSection === "/#services";
                  const isNormalActive = item.href === activeSection;
                  const isActive = isServicesActive || isNormalActive;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`block px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${
                        isActive
                          ? "bg-gold-light/20 text-gold"
                          : "text-dark hover:bg-bg-light hover:text-gold"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-neutral-100 flex flex-col gap-4">
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center px-3 text-sm font-semibold text-dark hover:text-gold"
                  >
                    <Phone className="w-4 h-4 mr-2 text-gold" />
                    <span>{siteConfig.phone}</span>
                  </a>
                  <Link
                    href="/#estimate-calculator"
                    className="btn-part-away-dark block w-full text-center bg-gold text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <span>Get Free Estimate</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Spacer to prevent content from going under sticky header */}
      <div className="h-[65px] sm:h-[80px]" />
    </>
  );
}

// Separate component for mobile accordion to manage its own state
function MobileAccordion({ item }) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <div className="border border-neutral-50 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-dark hover:bg-bg-light hover:text-gold transition-colors"
      >
        <span>{item.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-bg-light/50 pl-4 border-l-2 border-gold/30"
          >
            <div className="py-2 space-y-1">
              {item.children.map((child) => {
                const isChildActive = pathname === child.href;
                return (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={`block px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                      isChildActive
                        ? "text-gold font-bold"
                        : "text-neutral-600 hover:text-gold"
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
