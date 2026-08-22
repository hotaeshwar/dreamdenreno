"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react";

// Official WhatsApp SVG Logo Icon
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.012 2c-5.506 0-9.988 4.47-9.988 9.951 0 1.763.46 3.426 1.332 4.908L2.05 22l5.304-1.378a9.907 9.907 0 0 0 4.658 1.168h.004c5.506 0 9.988-4.47 9.988-9.951 0-2.656-1.04-5.15-2.925-7.03C17.18 3.033 14.683 2 12.012 2zm0 1.697c2.203 0 4.274.852 5.834 2.402a8.19 8.19 0 0 1 2.41 5.852c0 4.543-3.712 8.232-8.24 8.232a8.156 8.156 0 0 1-4.167-1.144l-.298-.176-3.1 1.012.828-3.003-.198-.314A8.17 8.17 0 0 1 3.715 11.95c0-4.544 3.712-8.232 8.24-8.232zm-2.003 4.195c-.218 0-.46.066-.67.147-.282.11-.645.32-.82.607-.27.447-.39 1.15-.09 1.77.2.42.7 1.145 1.55 1.882 1.01.875 2.03 1.48 2.85 1.777.62.227 1.18.176 1.59.102.47-.087 1.05-.447 1.19-.884.14-.437.14-.813.1-.892-.04-.08-.15-.125-.33-.217-.18-.092-1.06-.523-1.22-.582-.16-.06-.28-.09-.4.09-.12.18-.46.582-.57.702-.11.12-.22.13-.4.04-.18-.092-.76-.28-1.45-.89-.54-.482-.9-1.082-.98-1.256-.11-.184-.01-.283.08-.376.08-.083.18-.21.27-.315.09-.105.12-.178.18-.297.06-.118.03-.223-.01-.315-.05-.092-.41-1.002-.57-1.378-.15-.368-.32-.315-.44-.315z" />
  </svg>
);

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "16476171301";
  const chatUrl = `https://wa.me/${phoneNumber}`;

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[49] flex flex-col items-end font-sans select-none">
      
      {/* Chatbot Window Popup */}
      {isOpen && (
        <div className="w-[300px] sm:w-[340px] bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden flex flex-col mb-4 transition-all duration-300">
          
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Brand Logo in header */}
              <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 overflow-hidden border border-white/20">
                <Image 
                  src="/images/logo.png" 
                  alt="DreamDen Logo" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider leading-none">DreamDen Support</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-100 font-medium">Online & Ready</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body simulating active WhatsApp message */}
          <div className="p-4 bg-[#ece5dd] min-h-[140px] flex flex-col justify-start space-y-4">
            <div className="bg-white rounded-xl rounded-tl-none p-3.5 shadow-sm max-w-[90%] self-start relative">
              {/* Micro caret */}
              <div className="absolute -left-2 top-0 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
              <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                Hi there! 👋 Thanks for visiting DreamDen. 
                Let us know what you want to build or renovate today, and we'll connect you with an expert project manager.
              </p>
              <span className="text-[9px] text-neutral-400 font-bold block text-right mt-1.5">Just now</span>
            </div>
          </div>

          {/* CTA Send Button Action */}
          <div className="p-3.5 bg-white border-t border-neutral-100 flex items-center justify-center">
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Start Chatting</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      )}

      {/* WhatsApp Floating Toggle Circle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer relative"
          aria-label="Toggle WhatsApp chat window"
        >
          <WhatsAppIcon className="w-8 h-8" />
          {/* Pulsing indicator dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
        </button>
      )}

    </div>
  );
}
