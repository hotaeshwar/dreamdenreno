"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function ScrollTypewriter({ text, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [hasStarted, setHasStarted] = useState(false);

  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState("");

  // Trigger animation start state on viewport intersection
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  // Continuous loop typewriter effect
  useEffect(() => {
    if (!hasStarted) return;

    if (subIndex === text.length + 1 && !isDeleting) {
      // Pause for 3s when fully typed
      const timeout = setTimeout(() => setIsDeleting(true), 3000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      // Pause for 1.2s when fully erased before typing again
      const timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 1200);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      setTypedText(text.substring(0, subIndex + (isDeleting ? -1 : 1)));
    }, isDeleting ? 25 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, hasStarted, text]);

  // Safe Fallback: if animation has not started yet, render the full text so it is NEVER blank
  if (!hasStarted) {
    return (
      <h2 ref={ref} className={`${className} font-bold`}>
        {text}
      </h2>
    );
  }

  return (
    <h2 ref={ref} className={`${className} font-bold relative inline-block`}>
      {/* Invisible baseline to preserve layout height/width and prevent section shifting */}
      <span className="opacity-0 select-none pointer-events-none block">
        {text}
      </span>
      
      {/* Absolute positioned typing text overlay */}
      <span className="absolute inset-0 block text-inherit">
        <span>{typedText}</span>
        {typedText.length < text.length && (
          <span className="w-[2.5px] h-[1em] bg-gold ml-1.5 inline-block animate-pulse align-middle shrink-0" />
        )}
      </span>
    </h2>
  );
}
