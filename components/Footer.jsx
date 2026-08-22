"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

// Inline Custom SVGs for Brand Icons
const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <defs>
      <linearGradient id="footer-insta-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#footer-insta-gradient)"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#footer-insta-gradient)"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#footer-insta-gradient)"/>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialIcons = {
    instagram: Instagram
  };

  return (
    <footer className="bg-dark text-white font-sans border-t border-neutral-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <Link href="/" className="relative block h-18 w-60 sm:h-22 sm:w-72">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.companyName}
                fill
                sizes="(max-width: 768px) 240px, 288px"
                style={{ objectFit: "contain", objectPosition: "left" }}
              />
            </Link>
            <p className="text-neutral-300 text-sm leading-relaxed font-semibold">
              Crafting premium architectural transformations, legal basement suites, and custom-built estates across the Greater Toronto Area with uncompromising precision.
            </p>
            <div className="flex space-x-4">
              {Object.entries(siteConfig.socials).map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-neutral-700/60 flex items-center justify-center transition-all duration-300 hover:border-[#dc2743] hover:bg-[#dc2743]/5"
                    aria-label={`Visit our ${key}`}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block text-neutral-400 hover:text-white text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300 pb-0.5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">Services</h3>
            <ul className="space-y-3">
              {siteConfig.navigation
                .find((item) => item.label === "Services")
                ?.children.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      className="inline-block text-neutral-400 hover:text-white text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-gold hover:after:w-full after:transition-all after:duration-300 pb-0.5"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-6">
            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-gold shrink-0 mt-0.5" />
                <span className="text-neutral-400 text-sm leading-relaxed font-light">
                  {siteConfig.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center text-neutral-400 hover:text-white text-sm transition-colors group"
                >
                  <Phone className="w-5 h-5 mr-3 text-gold group-hover:scale-110 transition-transform shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center text-neutral-400 hover:text-white text-sm transition-colors group"
                >
                  <Mail className="w-5 h-5 mr-3 text-gold group-hover:scale-110 transition-transform shrink-0" />
                  <span className="break-all">{siteConfig.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower Footer */}
      <div className="bg-[#0f0f0f] border-t border-neutral-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-400 text-xs font-semibold text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.companyName}. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-xs text-neutral-500 font-light">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-neutral-800 hover:bg-gold rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-md group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
