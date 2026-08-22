"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
}) {
  const [sliderPosition, setSliderPosition] = useState(50);

  // Auto comparison loop - slides back and forth automatically hands-free
  useEffect(() => {
    let start = null;
    const duration = 6000; // 6 seconds per sweep cycle
    let animationFrameId;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      
      // Sine wave oscillation between 15% and 85%
      const angle = (elapsed / duration) * Math.PI * 2;
      const newPos = 50 + Math.sin(angle) * 32;
      setSliderPosition(newPos);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full select-none">
      {/* Labels Outside of Image Frame */}
      <div className="flex justify-between items-center mb-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neutral-400" />
          <span>{beforeLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{afterLabel}</span>
          <span className="w-2 h-2 rounded-full bg-gold" />
        </div>
      </div>

      {/* Main Image Comparison Panel (Pure Sweep Scan) */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200 shadow-xl">
        {/* After Image (Full background) */}
        <Image
          src={afterImage}
          alt="After Renovation"
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover pointer-events-none"
          priority
        />

        {/* Before Image (Masked/Clipped overlay) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: `inset(0px ${100 - sliderPosition}% 0px 0px)`,
          }}
        >
          <Image
            src={beforeImage}
            alt="Before Renovation"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover pointer-events-none"
            priority
          />
        </div>

        {/* Vertical Divider Line (Sweeps back and forth) */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gold z-10"
          style={{ left: `${sliderPosition}%` }}
        />
      </div>
    </div>
  );
}
